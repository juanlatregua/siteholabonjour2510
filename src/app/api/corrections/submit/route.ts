export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { isValidLevel, isValidTaskType, type CEFRLevel, getRubric } from "@/lib/correction/rubrics";
import { buildSystemPrompt, buildCorrectionToolSchema } from "@/lib/correction/prompt-builder";
import { parseToolUseResponse, validateAndNormalize, countWords } from "@/lib/correction/scoring";
import { getQuotaStatus, decrementQuota } from "@/lib/correction/quota";
import { auth } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per IP per hour
  const ip = getClientIp(req);
  if (!checkRateLimit("corrections-submit", ip, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Demasiadas correcciones. Inténtalo en una hora." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const { email, level, taskType, taskPrompt, inputText, attemptId } = body;

    // Validate required fields
    if (!email || !level || !taskType || !inputText) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: email, level, taskType, inputText" },
        { status: 400 },
      );
    }

    if (!isValidLevel(level)) {
      return NextResponse.json(
        { error: "Nivel no válido. Usa: A1, A2, B1, B2, C1, C2" },
        { status: 400 },
      );
    }

    if (!isValidTaskType(level as CEFRLevel, taskType)) {
      return NextResponse.json(
        { error: "Tipo de tarea no válido para este nivel" },
        { status: 400 },
      );
    }

    // Word count validation
    const rubric = getRubric(level as CEFRLevel);
    const wordCount = countWords(inputText);
    if (wordCount < 10) {
      return NextResponse.json(
        { error: "El texto es demasiado corto (mínimo 10 palabras)" },
        { status: 400 },
      );
    }

    // Get session for userId if logged in
    const session = await auth();
    const userId = session?.user?.id;

    // Check quota
    const quota = await getQuotaStatus(email, userId || undefined);
    if (!quota.canSubmit) {
      return NextResponse.json(
        { error: quota.reason, quotaExhausted: true },
        { status: 403 },
      );
    }

    // Create correction record
    const correction = await prisma.writingCorrection.create({
      data: {
        userId,
        candidateEmail: email,
        level,
        taskType,
        taskPrompt: taskPrompt || null,
        inputText,
        wordCount,
        status: "PROCESSING",
        ...(attemptId && { attemptId }),
      },
    });

    // Build Claude request
    const systemPrompt = buildSystemPrompt(level as CEFRLevel, taskType);
    const tool = buildCorrectionToolSchema(rubric);

    const taskLabel = rubric.taskTypes.find((t) => t.id === taskType)?.labelFr || taskType;
    const userMessage = taskPrompt
      ? `Consigne : ${taskPrompt}\n\nTexte de l'apprenant (${wordCount} mots, niveau visé : ${level}, exercice : ${taskLabel}) :\n\n${inputText}`
      : `Texte de l'apprenant (${wordCount} mots, niveau visé : ${level}, exercice : ${taskLabel}) :\n\n${inputText}`;

    const startMs = Date.now();

    const response = await anthropic.messages.create({
      model: process.env.CHAT_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      tools: [tool],
      tool_choice: { type: "tool", name: "submit_correction" },
      messages: [{ role: "user", content: userMessage }],
    });

    const latencyMs = Date.now() - startMs;

    // Parse tool use response
    const toolInput = parseToolUseResponse(response.content);
    if (!toolInput) {
      await prisma.writingCorrection.update({
        where: { id: correction.id },
        data: { status: "ERROR" },
      });
      return NextResponse.json(
        { error: "Error al procesar la respuesta de IA" },
        { status: 500 },
      );
    }

    // Validate and normalize scores
    const parsed = validateAndNormalize(toolInput, level as CEFRLevel);

    // Decrement quota
    await decrementQuota(email, userId || undefined);

    // Update correction record
    const updated = await prisma.writingCorrection.update({
      where: { id: correction.id },
      data: {
        globalScore: parsed.globalScore,
        maxScore: parsed.maxScore,
        criterionScores: JSON.stringify(parsed.criterionScores),
        annotations: JSON.stringify(parsed.annotations),
        correctedText: parsed.correctedText,
        overallFeedback: parsed.overallFeedback,
        estimatedLevel: parsed.estimatedLevel,
        nextSteps: JSON.stringify(parsed.nextSteps),
        modelUsed: response.model,
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
        latencyMs,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      id: updated.id,
      globalScore: parsed.globalScore,
      maxScore: parsed.maxScore,
      criterionScores: parsed.criterionScores,
      annotations: parsed.annotations,
      correctedText: parsed.correctedText,
      overallFeedback: parsed.overallFeedback,
      estimatedLevel: parsed.estimatedLevel,
      nextSteps: parsed.nextSteps,
      wordCount,
      level,
      taskType,
    });
  } catch (error: unknown) {
    console.error("[corrections/submit] Error:", error);

    // Provide more specific error messages
    const errMsg = error instanceof Error ? error.message : String(error);
    let userMessage = "Error interno del servidor. Inténtalo de nuevo.";
    if (errMsg.includes("timeout") || errMsg.includes("ETIMEDOUT") || errMsg.includes("ECONNRESET")) {
      userMessage = "La corrección tardó demasiado. Inténtalo de nuevo con un texto más corto.";
    } else if (errMsg.includes("authentication") || errMsg.includes("api_key") || errMsg.includes("401")) {
      userMessage = "Error de configuración del servicio de IA. Contacta con info@holabonjour.es.";
    } else if (errMsg.includes("rate_limit") || errMsg.includes("429")) {
      userMessage = "Demasiadas solicitudes simultáneas. Espera unos segundos e inténtalo de nuevo.";
    }

    return NextResponse.json(
      { error: userMessage },
      { status: 500 },
    );
  }
}
