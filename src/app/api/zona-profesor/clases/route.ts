export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createLessonSchema = z.object({
  studentId: z.string().min(1, "El estudiante es obligatorio"),
  scheduledAt: z.string().min(1, "La fecha es obligatoria"),
  durationMinutes: z.number().int().positive().optional().default(60),
  zoomLink: z.string().url().optional(),
  focus: z.string().optional(),
  packId: z.string().optional(),
});

export async function GET(request: NextRequest) {
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

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: Record<string, unknown> = { teacherId: session.user.id };

  if (status) {
    where.status = status;
  }

  if (from || to) {
    const scheduledAt: Record<string, Date> = {};
    if (from) scheduledAt.gte = new Date(from);
    if (to) scheduledAt.lte = new Date(to);
    where.scheduledAt = scheduledAt;
  }

  const lessons = await prisma.lesson.findMany({
    where,
    orderBy: { scheduledAt: "desc" },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ ok: true, lessons });
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

  const parsed = createLessonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos de clase invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { studentId, scheduledAt, durationMinutes, zoomLink, focus, packId } = parsed.data;

  const scheduledDate = new Date(scheduledAt);
  if (isNaN(scheduledDate.getTime())) {
    return NextResponse.json(
      { ok: false, error: "INVALID_DATE", message: "Fecha invalida" },
      { status: 400 }
    );
  }

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

  const lesson = await prisma.lesson.create({
    data: {
      studentId,
      teacherId: session.user.id,
      scheduledAt: scheduledDate,
      durationMinutes,
      zoomLink: zoomLink || null,
      focus: focus || null,
      packId: packId || null,
      status: "SCHEDULED",
    },
  });

  return NextResponse.json({ ok: true, lesson }, { status: 201 });
}
