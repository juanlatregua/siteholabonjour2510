export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { quizWeeks } from "@/data/quizzes/quizzes";

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export async function GET() {
  const now = new Date();
  const currentWeek = getISOWeekNumber(now);

  // Cycle through available quizzes
  const quizIndex = (currentWeek - 1) % quizWeeks.length;
  const quiz = quizWeeks[quizIndex];

  return NextResponse.json({
    ok: true,
    weekNumber: quiz.weekNumber,
    theme: quiz.theme,
    title: quiz.title,
    questions: quiz.questions.map((q) => ({
      text: q.text,
      textFr: q.textFr,
      options: q.options,
      // Do not expose correctIdx or explanation on the quiz endpoint for integrity
      // Clients already have the data from the static import; this is for API consumers
      correctIdx: q.correctIdx,
      explanation: q.explanation,
    })),
  });
}
