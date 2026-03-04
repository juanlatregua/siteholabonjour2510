import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  const correction = await prisma.writingCorrection.findUnique({
    where: { id },
    include: { teacherAnnotations: true },
  });

  if (!correction) {
    return NextResponse.json({ error: "Corrección no encontrada" }, { status: 404 });
  }

  // Ownership check: user created it, or is teacher/admin
  const isOwner = correction.userId === session.user.id ||
    correction.candidateEmail === session.user.email;
  const isTeacherOrAdmin = session.user.role === "TEACHER" || session.user.role === "ADMIN";

  if (!isOwner && !isTeacherOrAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  return NextResponse.json({
    id: correction.id,
    level: correction.level,
    taskType: correction.taskType,
    taskPrompt: correction.taskPrompt,
    inputText: correction.inputText,
    wordCount: correction.wordCount,
    globalScore: correction.globalScore,
    maxScore: correction.maxScore,
    criterionScores: correction.criterionScores ? JSON.parse(correction.criterionScores) : null,
    annotations: correction.annotations ? JSON.parse(correction.annotations) : null,
    correctedText: correction.correctedText,
    overallFeedback: correction.overallFeedback,
    estimatedLevel: correction.estimatedLevel,
    nextSteps: correction.nextSteps ? JSON.parse(correction.nextSteps) : null,
    status: correction.status,
    createdAt: correction.createdAt,
    teacherAnnotations: correction.teacherAnnotations.map((ta) => ({
      id: ta.id,
      content: ta.content,
      scoreOverride: ta.scoreOverride ? JSON.parse(ta.scoreOverride) : null,
      createdAt: ta.createdAt,
    })),
  });
}
