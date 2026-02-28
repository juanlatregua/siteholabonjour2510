export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPackSchema = z.object({
  studentId: z.string().min(1, "El estudiante es obligatorio"),
  hoursTotal: z.number().positive("Las horas deben ser positivas"),
  price: z.number().nonnegative("El precio no puede ser negativo"),
  levelRange: z.string().min(1, "El rango de nivel es obligatorio"),
  expiresAt: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  const packs = await prisma.pack.findMany({
    where: {
      student: { coachId: session.user.id },
    },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ok: true, packs });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo invalido" },
      { status: 400 }
    );
  }

  const parsed = createPackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos de pack invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { studentId, hoursTotal, price, levelRange, expiresAt } = parsed.data;

  // Verify the student belongs to this teacher
  const student = await prisma.user.findFirst({
    where: { id: studentId, coachId: session.user.id },
  });

  if (!student) {
    return NextResponse.json(
      { ok: false, error: "STUDENT_NOT_FOUND", message: "Estudiante no encontrado" },
      { status: 404 }
    );
  }

  const pack = await prisma.pack.create({
    data: {
      studentId,
      hoursTotal,
      hoursUsed: 0,
      price,
      levelRange,
      status: "ACTIVE",
      purchasedAt: new Date(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json({ ok: true, pack }, { status: 201 });
}
