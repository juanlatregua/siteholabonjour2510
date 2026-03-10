export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  sendCancellationRequestStudentEmail,
  sendCancellationRequestTeacherEmail,
} from "@/lib/email";

const CANCELLATION_WINDOW_MS = 48 * 60 * 60 * 1000; // 48 hours

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true } },
      teacher: { select: { id: true, name: true, email: true } },
    },
  });

  if (!lesson) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Clase no encontrada" },
      { status: 404 }
    );
  }

  // Verify the class belongs to the student
  if (lesson.studentId !== session.user.id) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "No tienes permiso" },
      { status: 403 }
    );
  }

  if (lesson.status !== "SCHEDULED") {
    return NextResponse.json(
      { ok: false, error: "INVALID_STATUS", message: "Solo se pueden cancelar clases programadas" },
      { status: 400 }
    );
  }

  // Check if already requested
  if (lesson.cancellationRequestedAt) {
    return NextResponse.json(
      { ok: false, error: "ALREADY_REQUESTED", message: "Ya has solicitado la cancelación de esta clase" },
      { status: 409 }
    );
  }

  const msUntilClass = lesson.scheduledAt.getTime() - Date.now();
  const isLate = msUntilClass < CANCELLATION_WINDOW_MS;

  // Mark cancellation as requested
  await prisma.lesson.update({
    where: { id },
    data: { cancellationRequestedAt: new Date() },
  });

  const dateStr = format(lesson.scheduledAt, "EEEE d 'de' MMMM", { locale: es });
  const timeStr = format(lesson.scheduledAt, "HH:mm");

  // Notify student
  sendCancellationRequestStudentEmail({
    toEmail: lesson.student.email,
    customerName: lesson.student.name || "Alumno",
    date: dateStr,
    isLate,
  }).catch(() => {});

  // Notify teacher
  if (lesson.teacher.email) {
    sendCancellationRequestTeacherEmail({
      toEmail: lesson.teacher.email,
      teacherName: lesson.teacher.name || "Profesor",
      studentName: lesson.student.name || "Alumno",
      date: dateStr,
      time: timeStr,
      isLate,
      lessonId: lesson.id,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, isLate });
}
