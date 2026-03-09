import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotification, formatPhoneSpain } from "@/lib/sms";
import { smsResenaRequest } from "@/lib/sms-templates";
import { validateCronAuth } from "@/lib/cron-auth";

// Vercel cron: daily at 20:00 UTC — sends review requests for yesterday's completed lessons

export async function GET(req: NextRequest) {
  const authCheck = validateCronAuth(req);
  if (!authCheck.ok) return authCheck.response;

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  const endOfYesterday = new Date(startOfYesterday);
  endOfYesterday.setDate(endOfYesterday.getDate() + 1);

  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        scheduledAt: { gte: startOfYesterday, lt: endOfYesterday },
        status: "COMPLETED",
        review: null,
      },
      include: {
        student: { select: { id: true, name: true, phone: true } },
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "https://holabonjour.es";
    let sent = 0;

    for (const lesson of lessons) {
      const review = await prisma.review.create({
        data: {
          lessonId: lesson.id,
          studentId: lesson.student.id,
          studentName: lesson.student.name,
        },
      });

      const linkOpinion = `${baseUrl}/opinion/${review.token}`;
      const nombre = (lesson.student.name || "").split(" ")[0] || "Alumno";

      if (lesson.student.phone) {
        await sendNotification({
          to: formatPhoneSpain(lesson.student.phone),
          body: smsResenaRequest({ nombre, linkOpinion }),
        });
      }

      sent++;
    }

    return NextResponse.json({ ok: true, sent });
  } catch (err) {
    console.error("[cron/review-request]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
