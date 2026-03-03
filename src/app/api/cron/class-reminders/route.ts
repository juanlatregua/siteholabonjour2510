import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/sms";
import { smsRecordatorioClase } from "@/lib/sms-templates";
import { sendClassReminderEmail } from "@/lib/email";

// Vercel cron: runs daily at 10:00 UTC (12:00 Madrid)
// Sends reminders for classes happening tomorrow

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends CRON_SECRET header)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Start and end of tomorrow
  const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const endOfTomorrow = new Date(startOfTomorrow);
  endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

  try {
    const sessions = await prisma.classSession.findMany({
      where: {
        date: { gte: startOfTomorrow, lt: endOfTomorrow },
        status: "SCHEDULED",
      },
      include: {
        booking: {
          include: { student: true },
        },
      },
    });

    let sent = 0;

    for (const session of sessions) {
      const student = session.booking.student;
      const dateLabel = startOfTomorrow.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      // Send SMS/WhatsApp
      if (student.phone) {
        await sendNotification({
          to: student.phone,
          body: smsRecordatorioClase({
            nombre: student.name.split(" ")[0],
            fecha: dateLabel,
            hora: session.startTime,
          }),
        });
      }

      // Send email
      await sendClassReminderEmail({
        toEmail: student.email,
        customerName: student.name,
        date: dateLabel,
        time: session.startTime,
        zoomLink: session.zoomLink || undefined,
      });

      sent++;
    }

    return NextResponse.json({ ok: true, reminders: sent });
  } catch (err) {
    console.error("[cron/class-reminders] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
