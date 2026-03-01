export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const weekNumberStr = searchParams.get("weekNumber");

  const where: Record<string, unknown> = {};

  if (weekNumberStr) {
    const weekNumber = parseInt(weekNumberStr, 10);
    if (isNaN(weekNumber) || weekNumber < 1) {
      return NextResponse.json(
        { ok: false, error: "INVALID_WEEK", message: "Numero de semana invalido" },
        { status: 400 }
      );
    }

    // Find the quiz for this week number
    const quiz = await prisma.quiz.findFirst({
      where: { weekNumber },
      orderBy: { year: "desc" },
    });

    if (!quiz) {
      return NextResponse.json({ ok: true, results: [] });
    }

    where.quizId = quiz.id;
  }

  const results = await prisma.quizResult.findMany({
    where,
    orderBy: [{ score: "desc" }, { timeMs: "asc" }],
    take: 10,
    select: {
      id: true,
      name: true,
      score: true,
      timeMs: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ ok: true, results });
}
