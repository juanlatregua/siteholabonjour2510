export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const anthropic = new Anthropic();

const ANALYSIS_TOOL: Anthropic.Tool = {
  name: "submit_exam_analysis",
  description: "Submit the structured analysis of the FEI exam attempt",
  input_schema: {
    type: "object" as const,
    properties: {
      probabilityOfPassing: {
        type: "number",
        description: "Estimated probability of passing the real exam (0-100)",
      },
      estimatedLevel: {
        type: "string",
        description: "Estimated current CEFR level (A1, A2, B1, B2, C1, C2)",
      },
      strengths: {
        type: "array",
        items: { type: "string" },
        description: "2-3 key strengths identified, in Spanish",
      },
      weaknesses: {
        type: "array",
        items: { type: "string" },
        description: "2-3 key weaknesses identified, in Spanish",
      },
      sectionAnalysis: {
        type: "object",
        properties: {
          CO: {
            type: "object",
            properties: {
              score: { type: "number" },
              max: { type: "number" },
              verdict: { type: "string" },
              tip: { type: "string" },
            },
            required: ["score", "max", "verdict", "tip"],
          },
          CE: {
            type: "object",
            properties: {
              score: { type: "number" },
              max: { type: "number" },
              verdict: { type: "string" },
              tip: { type: "string" },
            },
            required: ["score", "max", "verdict", "tip"],
          },
          PE: {
            type: "object",
            properties: {
              score: { type: "number" },
              max: { type: "number" },
              verdict: { type: "string" },
              tip: { type: "string" },
            },
            required: ["score", "max", "verdict", "tip"],
          },
          PO: {
            type: "object",
            properties: {
              score: { type: "number" },
              max: { type: "number" },
              verdict: { type: "string" },
              tip: { type: "string" },
            },
            required: ["score", "max", "verdict", "tip"],
          },
        },
        required: ["CO", "CE", "PE", "PO"],
      },
      urgencyLevel: {
        type: "string",
        enum: ["low", "medium", "high", "critical"],
        description: "How urgently the student needs help",
      },
      personalizedMessage: {
        type: "string",
        description: "Motivational feedback in Spanish, 2-3 sentences",
      },
      recommendedAction: {
        type: "string",
        enum: ["pack", "diagnostic", "correction", "retry"],
        description: "Primary recommended next action",
      },
      studyPlan: {
        type: "array",
        items: { type: "string" },
        description: "3-5 concrete study steps in Spanish",
      },
    },
    required: [
      "probabilityOfPassing",
      "estimatedLevel",
      "strengths",
      "weaknesses",
      "sectionAnalysis",
      "urgencyLevel",
      "personalizedMessage",
      "recommendedAction",
      "studyPlan",
    ],
  },
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Auth required" }, { status: 401 });
    }

    const { attemptId } = await req.json();
    if (!attemptId) {
      return NextResponse.json({ error: "attemptId required" }, { status: 400 });
    }

    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Return cached analysis if already computed
    if (attempt.aiAnalysis) {
      return NextResponse.json({
        ok: true,
        analysis: JSON.parse(attempt.aiAnalysis),
      });
    }

    if (attempt.status !== "finished" || attempt.totalScore === null) {
      return NextResponse.json({ error: "Exam not finished" }, { status: 400 });
    }

    // Build prompt
    const systemPrompt = `Eres un experto en exámenes FEI (France Éducation International) DELF/DALF con más de 15 años de experiencia preparando alumnos hispanohablantes.

Analiza los resultados de este simulacro y proporciona un diagnóstico preciso y útil. Sé honesto pero motivador. Tus consejos deben ser específicos y accionables.

Contexto:
- Los exámenes DELF/DALF tienen 4 secciones: CO (comprensión oral), CE (comprensión escrita), PE (producción escrita), PO (producción oral)
- Cada sección vale 25 puntos, total 100
- Mínimo 5/25 por sección y 50/100 global para aprobar
- PE y PO son evaluadas manualmente, así que pueden no tener puntuación aún
- El alumno estudia con HolaBonjour, academia de francés online en España`;

    const userMessage = `Resultados del simulacro ${attempt.nivel}:

- Nivel objetivo: ${attempt.nivel}
- Puntuación total: ${attempt.totalScore}/100
- Resultado: ${attempt.passed ? "APROBADO" : "SUSPENSO"}
- CO (comprensión oral): ${attempt.scoreCO !== null ? `${attempt.scoreCO}/25` : "sin datos"}
- CE (comprensión escrita): ${attempt.scoreCE !== null ? `${attempt.scoreCE}/25` : "sin datos"}
- PE (producción escrita): ${attempt.scorePE !== null ? `${attempt.scorePE}/25` : "en attente (evaluación manual)"}
- PO (producción oral): ${attempt.scorePO !== null ? `${attempt.scorePO}/25` : "en attente (evaluación manual)"}

Analiza estos resultados y proporciona tu diagnóstico estructurado.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: systemPrompt,
      tools: [ANALYSIS_TOOL],
      tool_choice: { type: "tool", name: "submit_exam_analysis" },
      messages: [{ role: "user", content: userMessage }],
    });

    // Parse tool response
    const toolBlock = response.content.find((b) => b.type === "tool_use");
    if (!toolBlock || toolBlock.type !== "tool_use") {
      return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
    }

    const analysis = toolBlock.input as Record<string, unknown>;

    // Store in DB
    await prisma.examAttempt.update({
      where: { id: attemptId },
      data: {
        aiAnalysis: JSON.stringify(analysis),
        aiAnalyzedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, analysis });
  } catch (err) {
    console.error("[api/examenes/analyze]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
