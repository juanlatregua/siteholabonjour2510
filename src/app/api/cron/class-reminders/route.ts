import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/sms";
import { smsRecordatorioClase } from "@/lib/sms-templates";
import { sendClassReminderEmail, sendClassReminderTeacherEmail } from "@/lib/email";
import { validateCronAuth } from "@/lib/cron-auth";

// Vercel cron: daily at 10:00 UTC — sends reminders for tomorrow's lessons

export async function GET(req: NextRequest) {
  const authCheck = validateCronAuth(req);
  if (!authCheck.ok) return authCheck.response;

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const endOfTomorrow = new Date(startOfTomorrow);
  endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        scheduledAt: { gte: startOfTomorrow, lt: endOfTomorrow },
        status: "SCHEDULED",
      },
      include: {
        student: true,
        teacher: { select: { id: true, name: true, email: true } },
      },
    });

    let sent = 0;
    for (const lesson of lessons) {
      const student = lesson.student;
      const teacher = lesson.teacher;
      const dateLabel = startOfTomorrow.toLocaleDateString("es-ES", {
        weekday: "long", day: "numeric", month: "long",
      });
      const timeLabel = lesson.scheduledAt.toLocaleTimeString("es-ES", {
        hour: "2-digit", minute: "2-digit",
      });

      // SMS to student
      if (student.phone) {
        await sendNotification({
          to: student.phone,
          body: smsRecordatorioClase({
            nombre: (student.name || "").split(" ")[0] || "Alumno",
            fecha: dateLabel,
            hora: timeLabel,
          }),
        });
      }

      // Email to student
      await sendClassReminderEmail({
        toEmail: student.email,
        customerName: student.name || "Alumno",
        date: dateLabel,
        time: timeLabel,
        zoomLink: lesson.zoomLink || undefined,
        scheduledAt: lesson.scheduledAt,
        durationMinutes: lesson.durationMinutes,
      });

      // Email to teacher
      if (teacher.email) {
        await sendClassReminderTeacherEmail({
          toEmail: teacher.email,
          teacherName: teacher.name || "Profesor",
          studentName: student.name || "Alumno",
          date: dateLabel,
          time: timeLabel,
          zoomStartUrl: lesson.zoomStartUrl,
        });
      }

      sent++;
    }

    return NextResponse.json({ ok: true, reminders: sent });
  } catch (err) {
    console.error("[cron/class-reminders]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
