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
      status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
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

  if (!activePack) {
    return NextResponse.json(
      {
        ok: false,
        error: "NO_ACTIVE_PACK",
        message: "Necesitas un pack activo para reservar clases.",
      },
      { status: 400 }
    );
  }

  // Validate pack has remaining hours
  if (activePack.hoursUsed + 1 > activePack.hoursTotal) {
    return NextResponse.json(
      {
        ok: false,
        error: "PACK_EXHAUSTED",
        message: "Tu pack no tiene horas disponibles. Contrata un nuevo pack para seguir reservando.",
      },
      { status: 400 }
    );
  }

  // Create lesson + increment pack hours atomically
  let lesson;
  try {
    lesson = await prisma.$transaction(async (tx) => {
      // Re-check pack hours inside transaction
      const freshPack = await tx.pack.findUniqueOrThrow({ where: { id: activePack.id } });
      if (freshPack.hoursUsed + 1 > freshPack.hoursTotal) {
        throw new Error("PACK_EXHAUSTED");
      }

      const newLesson = await tx.lesson.create({
        data: {
          studentId: session.user.id,
          teacherId,
          packId: activePack.id,
          scheduledAt,
          durationMinutes: 60,
          status: "SCHEDULED",
          focus: focus || null,
          notes: notes || null,
        },
      });

      await tx.pack.update({
        where: { id: activePack.id },
        data: { hoursUsed: { increment: 1 } },
      });

      return newLesson;
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "PACK_EXHAUSTED") {
      return NextResponse.json(
        { ok: false, error: "PACK_EXHAUSTED", message: "Tu pack no tiene horas disponibles." },
        { status: 400 },
      );
    }
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2002") {
      return NextResponse.json(
        { ok: false, error: "SLOT_TAKEN", message: "Este horario ya no está disponible." },
        { status: 409 },
      );
    }
    throw err;
  }

  // Create Zoom meeting (non-blocking — class still created if Zoom fails)
  try {
    const { createZoomMeeting } = await import("@/lib/zoom");
    const studentData = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true },
    });
    const zoom = await createZoomMeeting({
      topic: `Clase HolaBonjour — ${studentData?.name || "Alumno"}`,
      startTime: scheduledAt,
      durationMinutes: 60,
    });
    lesson = await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        zoomLink: zoom.joinUrl,
        zoomMeetingId: zoom.meetingId,
        zoomStartUrl: zoom.startUrl,
      },
    });
  } catch (err) {
    console.error("[reservar] Zoom meeting creation failed:", err);
  }

  // Send confirmation email (fire-and-forget)
  const student = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, name: true },
  });

  if (student?.email) {
    import("@/lib/email").then(({ sendClassReminderEmail }) => {
      sendClassReminderEmail({
        toEmail: student.email,
        customerName: student.name || "Alumno",
        date,
        time,
        zoomLink: lesson.zoomLink || undefined,
      }).catch(() => {});
    });
  }

  return NextResponse.json({ ok: true, lesson }, { status: 201 });
}
