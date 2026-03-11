export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { parseSpainDateTime } from "@/lib/date-utils";

const createLessonSchema = z.object({
  studentId: z.string().min(1, "El estudiante es obligatorio"),
  scheduledAt: z.string().min(1, "La fecha es obligatoria"),
  durationMinutes: z.number().int().positive().optional().default(60),
  zoomLink: z.string().url().optional(),
  focus: z.string().max(500).optional(),
  packId: z.string().max(50).optional(),
  modality: z.enum(["ZOOM", "PRESENCIAL"]).optional().default("ZOOM"),
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
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));

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

  const [lessons, total] = await Promise.all([
    prisma.lesson.findMany({
      where,
      orderBy: { scheduledAt: "desc" },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lesson.count({ where }),
  ]);

  return NextResponse.json({ ok: true, lessons, total, page, limit });
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

  const { studentId, scheduledAt, durationMinutes, zoomLink, focus, packId, modality } = parsed.data;

  // scheduledAt comes as "2026-03-11T10:00:00" from the form
  const dateTimeParts = scheduledAt.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  const scheduledDate = dateTimeParts
    ? parseSpainDateTime(dateTimeParts[1], dateTimeParts[2])
    : new Date(scheduledAt);
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

  // Check for existing lesson at this time (prevent self-double-booking)
  const existingLesson = await prisma.lesson.findFirst({
    where: {
      teacherId: session.user.id,
      scheduledAt: scheduledDate,
      status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
    },
  });
  if (existingLesson) {
    return NextResponse.json(
      { ok: false, error: "SLOT_TAKEN", message: "Ya tienes una clase programada en ese horario." },
      { status: 409 }
    );
  }

  let lesson = await prisma.lesson.create({
    data: {
      studentId,
      teacherId: session.user.id,
      scheduledAt: scheduledDate,
      durationMinutes,
      zoomLink: zoomLink || null,
      focus: focus || null,
      packId: packId || null,
      modality,
      status: "SCHEDULED",
    },
  });

  // Create Zoom meeting if no link provided and modality is ZOOM (non-blocking)
  if (!lesson.zoomLink && modality === "ZOOM") {
    try {
      const { createZoomMeeting } = await import("@/lib/zoom");
      const zoom = await createZoomMeeting({
        topic: `Clase HolaBonjour — ${student.name || "Alumno"}`,
        startTime: scheduledDate,
        durationMinutes,
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
      console.error("[zona-profesor/clases] Zoom creation failed:", err);
    }
  }

  // Send confirmation email + SMS to student (fire-and-forget)
  const teacherUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });
  const teacherName = teacherUser?.name || "Profesor";
  const dateLabel = scheduledDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const timeLabel = scheduledDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  if (student.email) {
    import("@/lib/email").then(({ sendBookingConfirmationEmail }) => {
      sendBookingConfirmationEmail({
        toEmail: student.email,
        customerName: student.name || "Alumno",
        teacherName,
        date: dateLabel,
        time: timeLabel,
        durationMinutes,
        focus: focus || null,
        zoomLink: lesson.zoomLink || null,
        scheduledAt: scheduledDate,
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

  return NextResponse.json({ ok: true, lesson }, { status: 201 });
}
