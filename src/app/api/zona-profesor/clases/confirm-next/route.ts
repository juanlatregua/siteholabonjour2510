export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { addDays } from "date-fns";

const schema = z.object({
  lessonId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 1. Fetch completed lesson
  const lesson = await prisma.lesson.findUnique({
    where: { id: parsed.data.lessonId },
    include: {
      student: { select: { id: true, name: true, email: true, phone: true } },
    },
  });

  if (!lesson || lesson.teacherId !== session.user.id) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Clase no encontrada" },
      { status: 404 }
    );
  }

  if (lesson.status !== "COMPLETED") {
    return NextResponse.json(
      { ok: false, error: "NOT_COMPLETED", message: "La clase debe estar completada" },
      { status: 400 }
    );
  }

  // 2. Find active RecurringSlot for this student + day + time
  const lessonDay = lesson.scheduledAt.getDay();
  const lessonTime = `${String(lesson.scheduledAt.getHours()).padStart(2, "0")}:${String(lesson.scheduledAt.getMinutes()).padStart(2, "0")}`;

  const recurringSlot = await prisma.recurringSlot.findFirst({
    where: {
      teacherId: session.user.id,
      studentId: lesson.studentId,
      dayOfWeek: lessonDay,
      startTime: lessonTime,
      active: true,
    },
  });

  if (!recurringSlot) {
    return NextResponse.json(
      { ok: false, error: "NO_RECURRING_SLOT", message: "No hay horario reservado para esta combinación alumno/día/hora" },
      { status: 404 }
    );
  }

  // 3. Calculate next date (+7 days from lesson, skip if in the past)
  let nextDate = addDays(lesson.scheduledAt, 7);
  const now = new Date();
  while (nextDate < now) {
    nextDate = addDays(nextDate, 7);
  }

  // 4. Check no double-booking
  const existingLesson = await prisma.lesson.findFirst({
    where: {
      teacherId: session.user.id,
      scheduledAt: nextDate,
      status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
    },
  });

  if (existingLesson) {
    return NextResponse.json(
      { ok: false, error: "SLOT_TAKEN", message: `Ya tienes una clase programada el ${nextDate.toLocaleDateString("es-ES")} a las ${lessonTime}` },
      { status: 409 }
    );
  }

  // 5. Create the new lesson
  let newLesson = await prisma.lesson.create({
    data: {
      studentId: lesson.studentId,
      teacherId: session.user.id,
      scheduledAt: nextDate,
      durationMinutes: lesson.durationMinutes,
      modality: recurringSlot.modality,
      recurringSlotId: recurringSlot.id,
      packId: lesson.packId,
      status: "SCHEDULED",
    },
  });

  // 6. Create Zoom meeting if ZOOM modality
  if (recurringSlot.modality === "ZOOM") {
    try {
      const { createZoomMeeting } = await import("@/lib/zoom");
      const zoom = await createZoomMeeting({
        topic: `Clase HolaBonjour — ${lesson.student.name || "Alumno"}`,
        startTime: nextDate,
        durationMinutes: lesson.durationMinutes,
      });
      newLesson = await prisma.lesson.update({
        where: { id: newLesson.id },
        data: {
          zoomLink: zoom.joinUrl,
          zoomMeetingId: zoom.meetingId,
          zoomStartUrl: zoom.startUrl,
        },
      });
    } catch (err) {
      console.error("[confirm-next] Zoom creation failed:", err);
    }
  }

  // 7. Send confirmation (fire-and-forget)
  const teacherUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });
  const teacherName = teacherUser?.name || "Profesor";
  const dateLabel = nextDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const timeLabel = nextDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  const student = lesson.student;

  if (student.email) {
    import("@/lib/email").then(({ sendBookingConfirmationEmail }) => {
      sendBookingConfirmationEmail({
        toEmail: student.email,
        customerName: student.name || "Alumno",
        teacherName,
        date: dateLabel,
        time: timeLabel,
        durationMinutes: lesson.durationMinutes,
        focus: null,
        zoomLink: newLesson.zoomLink || null,
        scheduledAt: nextDate,
      }).catch(() => {});
    });
  }

  if (student.phone) {
    import("@/lib/sms").then(({ sendNotification }) => {
      import("@/lib/sms-templates").then(({ smsClaseConfirmada }) => {
        sendNotification({
          to: student.phone!,
          body: smsClaseConfirmada({
            nombre: (student.name || "").split(" ")[0] || "Alumno",
            fecha: dateLabel,
            hora: timeLabel,
            profesor: teacherName.split(" ")[0],
          }),
        }).catch(() => {});
      });
    });
  }

  return NextResponse.json({ ok: true, lesson: newLesson }, { status: 201 });
}
