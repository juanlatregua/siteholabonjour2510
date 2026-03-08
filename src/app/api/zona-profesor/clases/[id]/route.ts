export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { sendLateCancellationEmail } from "@/lib/email";
import { sendSMS } from "@/lib/sms";
import { smsAnulacionTardia } from "@/lib/sms-templates";

const CANCELLATION_WINDOW_MS = 48 * 60 * 60 * 1000; // 48 hours

const updateLessonSchema = z.object({
  status: z.string().optional(),
  notes: z.string().optional(),
  studentFeedback: z.string().optional(),
  zoomLink: z.string().optional(),
  focus: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true, phone: true } },
    },
  });
  if (!lesson) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Clase no encontrada" },
      { status: 404 }
    );
  }

  if (lesson.teacherId !== session.user.id) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "No tienes permiso para editar esta clase" },
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

  const parsed = updateLessonSchema.safeParse(body);
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

  const data: Record<string, unknown> = {};
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  if (parsed.data.notes !== undefined) data.notes = parsed.data.notes;
  if (parsed.data.studentFeedback !== undefined) data.studentFeedback = parsed.data.studentFeedback;
  if (parsed.data.zoomLink !== undefined) data.zoomLink = parsed.data.zoomLink;
  if (parsed.data.focus !== undefined) data.focus = parsed.data.focus;

  const newStatus = parsed.data.status;
  const oldStatus = lesson.status;
  const statusChanged = newStatus !== undefined && newStatus !== oldStatus;
  const hoursDelta = lesson.durationMinutes / 60;

  // Determine if this is a late cancellation (<48h before class)
  const isCancelling = statusChanged && (newStatus === "CANCELLED" || newStatus === "NO_SHOW");
  const msUntilClass = lesson.scheduledAt.getTime() - Date.now();
  const isLateCancellation = isCancelling && msUntilClass < CANCELLATION_WINDOW_MS;

  // Use a transaction to update lesson and pack.hoursUsed atomically
  const updated = await prisma.$transaction(async (tx) => {
    const updatedLesson = await tx.lesson.update({
      where: { id },
      data,
    });

    // Adjust pack.hoursUsed when status transitions to/from COMPLETED
    if (statusChanged && lesson.packId) {
      if (newStatus === "COMPLETED" && oldStatus !== "COMPLETED") {
        await tx.pack.update({
          where: { id: lesson.packId },
          data: { hoursUsed: { increment: hoursDelta } },
        });
      } else if (oldStatus === "COMPLETED" && newStatus !== "COMPLETED") {
        await tx.pack.update({
          where: { id: lesson.packId },
          data: { hoursUsed: { decrement: hoursDelta } },
        });
      }

      // Late cancellation / no-show: deduct hours from pack (class counts)
      if (isLateCancellation && oldStatus !== "COMPLETED") {
        await tx.pack.update({
          where: { id: lesson.packId },
          data: { hoursUsed: { increment: hoursDelta } },
        });
      }
    }

    return updatedLesson;
  });

  // Delete Zoom meeting if lesson is cancelled and has a zoomMeetingId
  if (isCancelling && lesson.zoomMeetingId) {
    import("@/lib/zoom").then(({ deleteZoomMeeting }) => {
      deleteZoomMeeting(lesson.zoomMeetingId!).catch((err) =>
        console.error("[clases] Zoom delete failed:", err)
      );
    });
  }

  // Send notifications for late cancellation (fire-and-forget, don't block response)
  if (isLateCancellation && lesson.student) {
    const dateStr = format(lesson.scheduledAt, "EEEE d 'de' MMMM, HH:mm", { locale: es });

    // Email notification
    sendLateCancellationEmail({
      toEmail: lesson.student.email || "",
      customerName: lesson.student.name || "alumno/a",
      date: dateStr,
    }).catch(() => { /* non-blocking */ });

    // SMS notification
    if (lesson.student.phone) {
      const phone = lesson.student.phone.startsWith("+")
        ? lesson.student.phone
        : `+34${lesson.student.phone.replace(/\s/g, "")}`;
      sendSMS({
        to: phone,
        body: smsAnulacionTardia({
          nombre: lesson.student.name || "alumno/a",
          fecha: dateStr,
        }),
      }).catch(() => { /* non-blocking */ });
    }
  }

  return NextResponse.json({
    ok: true,
    lesson: updated,
    lateCancellation: isLateCancellation || false,
  });
}
