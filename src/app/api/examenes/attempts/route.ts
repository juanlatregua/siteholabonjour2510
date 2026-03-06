import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST — Create a new exam attempt
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { examenId, nivel } = body;

    if (!examenId || !nivel) {
      return NextResponse.json(
        { error: "Faltan campos: examenId, nivel" },
        { status: 400 },
      );
    }

    const attempt = await prisma.examAttempt.create({
      data: {
        userId: session.user.id,
        examenId,
        nivel,
        status: "in_progress",
      },
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (err) {
    console.error("[exam-attempts] POST error:", err);
    return NextResponse.json({ error: "Error al crear intento" }, { status: 500 });
  }
}

// GET — List my exam attempts
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const attempts = await prisma.examAttempt.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(attempts);
  } catch (err) {
    console.error("[exam-attempts] GET error:", err);
    return NextResponse.json({ error: "Error al obtener intentos" }, { status: 500 });
  }
}
