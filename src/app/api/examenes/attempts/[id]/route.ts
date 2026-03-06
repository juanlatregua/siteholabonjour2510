import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET — Get a specific attempt
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const attempt = await prisma.examAttempt.findUnique({
      where: { id },
      include: { corrections: true },
    });

    if (!attempt || attempt.userId !== session.user.id) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json(attempt);
  } catch (err) {
    console.error("[exam-attempts] GET by id error:", err);
    return NextResponse.json({ error: "Error al obtener intento" }, { status: 500 });
  }
}

// PATCH — Update attempt (finish exam, save scores)
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();

    const attempt = await prisma.examAttempt.findUnique({
      where: { id },
    });

    if (!attempt || attempt.userId !== session.user.id) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    const { scoreCO, scoreCE, scorePE, scorePO, totalScore, passed, answers } =
      body;

    // Validate scores are between 0 and 25
    const scoreFields = { scoreCO, scoreCE, scorePE, scorePO } as Record<string, unknown>;
    for (const [field, value] of Object.entries(scoreFields)) {
      if (value !== undefined && (typeof value !== "number" || value < 0 || value > 25)) {
        return NextResponse.json(
          { error: `${field} debe estar entre 0 y 25` },
          { status: 400 },
        );
      }
    }

    const updated = await prisma.examAttempt.update({
      where: { id },
      data: {
        finishedAt: new Date(),
        status: "finished",
        ...(scoreCO !== undefined && { scoreCO }),
        ...(scoreCE !== undefined && { scoreCE }),
        ...(scorePE !== undefined && { scorePE }),
        ...(scorePO !== undefined && { scorePO }),
        ...(totalScore !== undefined && { totalScore }),
        ...(passed !== undefined && { passed }),
        ...(answers !== undefined && {
          answers: JSON.stringify(answers),
        }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[exam-attempts] PATCH error:", err);
    return NextResponse.json({ error: "Error al actualizar intento" }, { status: 500 });
  }
}
