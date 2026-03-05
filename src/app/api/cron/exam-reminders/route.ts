import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/azure-mail";

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const in3Days = new Date(now);
  in3Days.setDate(in3Days.getDate() + 3);
  const in7Days = new Date(now);
  in7Days.setDate(in7Days.getDate() + 7);

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

  // Find unsent reminders that are due
  const reminders = await prisma.examReminder.findMany({
    where: {
      sentAt: null,
      OR: [
        // Registration opening tomorrow
        {
          reminderType: "REGISTRATION_OPEN",
          examSession: {
            registrationStart: {
              gte: startOfDay(tomorrow),
              lte: endOfDay(tomorrow),
            },
          },
        },
        // Registration closing in 3 days
        {
          reminderType: "REGISTRATION_CLOSING",
          examSession: {
            registrationEnd: {
              gte: startOfDay(in3Days),
              lte: endOfDay(in3Days),
            },
          },
        },
        // Exam in 7 days
        {
          reminderType: "EXAM_WEEK",
          examSession: {
            writtenExamDate: {
              gte: startOfDay(in7Days),
              lte: endOfDay(in7Days),
            },
          },
        },
      ],
    },
    include: {
      examSession: true,
    },
  });

  if (reminders.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  // Get user emails
  const userIds = [...new Set(reminders.map((r) => r.userId))];
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true, name: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  let sent = 0;

  for (const reminder of reminders) {
    const user = userMap.get(reminder.userId);
    if (!user) continue;

    const exam = reminder.examSession;
    const dateStr = (d: Date | null) =>
      d ? d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—";

    let subject = "";
    let message = "";

    switch (reminder.reminderType) {
      case "REGISTRATION_OPEN":
        subject = `Matrícula abierta: ${exam.examType} ${exam.level} en ${exam.city}`;
        message = `La matrícula para el examen ${exam.examType} ${exam.level} en ${exam.center} (${exam.city}) se abre mañana, ${dateStr(exam.registrationStart)}. Plazo hasta ${dateStr(exam.registrationEnd)}.`;
        break;
      case "REGISTRATION_CLOSING":
        subject = `Último día: matrícula ${exam.examType} ${exam.level} en ${exam.city}`;
        message = `La matrícula para el examen ${exam.examType} ${exam.level} en ${exam.center} (${exam.city}) cierra en 3 días (${dateStr(exam.registrationEnd)}). ¡No te quedes sin plaza!`;
        break;
      case "EXAM_WEEK":
        subject = `Tu examen ${exam.examType} ${exam.level} es la semana que viene`;
        message = `Tu examen ${exam.examType} ${exam.level} en ${exam.center} (${exam.city}) es el ${dateStr(exam.writtenExamDate)}. ¡Mucho ánimo y bonne chance !`;
        break;
    }

    try {
      await sendMail({
        to: user.email,
        subject,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#395D9F;">${subject}</h2>
          <p>Hola ${user.name?.split(" ")[0] || ""}!</p>
          <p>${message}</p>
          ${exam.fee ? `<p><strong>Precio:</strong> ${exam.fee} €</p>` : ""}
          <p><a href="https://www.holabonjour.es/calendario-examenes" style="display:inline-block;background:#E50046;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Ver calendario de exámenes</a></p>
          <p style="font-size:12px;color:#64748b;margin-top:20px;">HolaBonjour · Academia de francés online</p>
        </div>`,
      });

      await prisma.examReminder.update({
        where: { id: reminder.id },
        data: { sentAt: new Date() },
      });
      sent++;
    } catch (err) {
      console.error(`[exam-reminders] Error sending to ${user.email}:`, err);
    }
  }

  return NextResponse.json({ sent, total: reminders.length });
}
