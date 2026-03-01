export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const resultSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email invalido"),
  score: z.number().int().nonnegative(),
  timeMs: z.number().int().positive(),
  weekNumber: z.number().int().positive(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo invalido" },
      { status: 400 }
    );
  }

  const parsed = resultSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { name, email, score, timeMs, weekNumber } = parsed.data;
  const year = new Date().getFullYear();

  // Find or create the Quiz record for this week/year
  let quiz = await prisma.quiz.findFirst({
    where: { weekNumber, year },
  });

  if (!quiz) {
    quiz = await prisma.quiz.create({
      data: {
        weekNumber,
        year,
        theme: "",
        title: `Semana ${weekNumber}`,
        publishedAt: new Date(),
      },
    });
  }

  // Create the result
  const result = await prisma.quizResult.create({
    data: {
      quizId: quiz.id,
      name,
      email,
      score,
      timeMs,
    },
  });

  return NextResponse.json({ ok: true, result }, { status: 201 });
}
