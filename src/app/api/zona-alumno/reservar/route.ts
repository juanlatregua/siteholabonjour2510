export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bookingSchema = z.object({
  teacherId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  focus: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
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

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos de reserva invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { teacherId, date, time, focus, notes } = parsed.data;

  // Verify teacher exists and is active
  const teacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: { in: ["TEACHER", "ADMIN"] },
      active: true,
    },
  });

  if (!teacher) {
    return NextResponse.json(
      { ok: false, error: "TEACHER_NOT_FOUND", message: "Profesor no encontrado" },
      { status: 404 }
    );
  }

  // Build scheduledAt from date + time
  const scheduledAt = new Date(`${date}T${time}:00`);
  if (isNaN(scheduledAt.getTime())) {
    return NextResponse.json(
      { ok: false, error: "INVALID_DATE", message: "Fecha/hora invalida" },
      { status: 400 }
    );
  }

  // Must be in the future
  if (scheduledAt <= new Date()) {
    return NextResponse.json(
      { ok: false, error: "PAST_DATE", message: "No se puede reservar en el pasado" },
      { status: 400 }
    );
  }

  // Check teacher availability for this day/time
  const dayOfWeek = scheduledAt.getDay(); // 0=Sun
  const timeStr = time;

  const availability = await prisma.availability.findFirst({
    where: {
      teacherId,
      dayOfWeek,
      startTime: timeStr,
      active: true,
    },
  });

  if (!availability) {
    return NextResponse.json(
      {
        ok: false,
        error: "SLOT_UNAVAILABLE",
        message: "Este horario no esta disponible",
      },
      { status: 409 }
    );
  }

  // Check no existing lesson at this time for the teacher
  const existingLesson = await prisma.lesson.findFirst({
    where: {
      teacherId,
      scheduledAt,
      status: { in: ["SCHEDULED"] },
    },
  });

  if (existingLesson) {
    return NextResponse.json(
      {
        ok: false,
        error: "SLOT_TAKEN",
        message: "Este horario ya esta reservado",
      },
      { status: 409 }
    );
  }

  // Find student's active pack
  const activePack = await prisma.pack.findFirst({
    where: { studentId: session.user.id, status: "ACTIVE" },
    orderBy: { purchasedAt: "desc" },
  });

  // Create the lesson
  const lesson = await prisma.lesson.create({
    data: {
      studentId: session.user.id,
      teacherId,
      packId: activePack?.id ?? null,
      scheduledAt,
      durationMinutes: 60,
      status: "SCHEDULED",
      focus: focus || null,
      notes: notes || null,
    },
  });

  return NextResponse.json({ ok: true, lesson }, { status: 201 });
}
