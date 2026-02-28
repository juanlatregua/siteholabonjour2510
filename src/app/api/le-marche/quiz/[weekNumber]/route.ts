export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { quizWeeks } from "@/data/quizzes/quizzes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ weekNumber: string }> }
) {
  const { weekNumber: weekStr } = await params;
  const weekNumber = parseInt(weekStr, 10);

  if (isNaN(weekNumber) || weekNumber < 1) {
    return NextResponse.json(
      { ok: false, error: "INVALID_WEEK", message: "Numero de semana invalido" },
      { status: 400 }
    );
  }

  const quiz = quizWeeks.find((q) => q.weekNumber === weekNumber);

  if (!quiz) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Quiz no encontrado para esta semana" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    weekNumber: quiz.weekNumber,
    theme: quiz.theme,
    title: quiz.title,
    questions: quiz.questions.map((q) => ({
      text: q.text,
      textFr: q.textFr,
      options: q.options,
      correctIdx: q.correctIdx,
      explanation: q.explanation,
    })),
  });
}
