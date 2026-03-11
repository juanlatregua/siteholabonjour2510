import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendPaymentConfirmationEmail, sendNewBookingStaffEmail } from "@/lib/email";
import { sendNotification } from "@/lib/sms";
import { smsPagoConfirmado } from "@/lib/sms-templates";
import { addPaidCorrections } from "@/lib/correction/quota";
import { getDefaultTeacher } from "@/lib/teacher";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = verifyWebhookSignature(body, signature) as Stripe.Event;
  } catch (err) {
    console.error("[stripe-webhook] Signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // Idempotency: atomically insert event ID — if it already exists, skip
    try {
      await prisma.stripeEvent.create({ data: { id: event.id } });
    } catch {
      // Unique constraint violation = already processed
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    // Handle correction pack purchases
    if (session.metadata?.type === "correction_pack") {
      const email = session.metadata.customerEmail;
      const count = parseInt(session.metadata.correctionCount || "0", 10);

      if (email && count > 0) {
        try {
          await addPaidCorrections(email, count);
          console.log(`[stripe-webhook] Added ${count} corrections for ${email}`);
        } catch (err) {
          console.error("[stripe-webhook] Error adding corrections:", err);
          return NextResponse.json({ error: "Processing error" }, { status: 500 });
        }
      }

      return NextResponse.json({ received: true });
    }

    const packId = session.metadata?.packId;

    if (!packId) {
      console.warn("[stripe-webhook] No packId in metadata");
      return NextResponse.json({ received: true });
    }

    try {
      // Update payment
      const payment = await prisma.payment.findFirst({
        where: { stripeSessionId: session.id },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "CONFIRMED",
            stripePaymentId: session.payment_intent as string,
            confirmedAt: new Date(),
          },
        });
      }

      // Activate pack
      const pack = await prisma.pack.update({
        where: { id: packId },
        data: { status: "ACTIVE", purchasedAt: new Date() },
      });

      // Confirm PENDING_PAYMENT lesson → SCHEDULED
      const pendingLesson = await prisma.lesson.findFirst({
        where: { packId, status: "PENDING_PAYMENT" },
      });

      let confirmedLesson: { id: string; scheduledAt: Date; durationMinutes: number; zoomLink: string | null; studentId: string } | null = null;

      if (pendingLesson) {
        confirmedLesson = await prisma.lesson.update({
          where: { id: pendingLesson.id },
          data: { status: "SCHEDULED" },
        });
        console.log(`[stripe-webhook] Confirmed lesson ${pendingLesson.id} for pack ${packId}`);
      } else if (session.metadata?.selectedDate && session.metadata?.selectedTime) {
        // Fallback: create lesson from metadata if PENDING_PAYMENT was cleaned up
        try {
          const teacher = await getDefaultTeacher();
          const scheduledAt = new Date(
            `${session.metadata.selectedDate}T${session.metadata.selectedTime}:00`
          );
          const isDiagnostico = session.metadata.producto === "diagnostico";

          confirmedLesson = await prisma.lesson.create({
            data: {
              studentId: pack.studentId,
              teacherId: teacher.id,
              packId: pack.id,
              scheduledAt,
              durationMinutes: isDiagnostico ? 30 : 60,
              status: "SCHEDULED",
              focus: isDiagnostico ? "Sesión diagnóstico DELF/DALF" : null,
            },
          });
          console.log(`[stripe-webhook] Created fallback lesson for pack ${packId}`);
        } catch (lessonErr) {
          console.error("[stripe-webhook] Fallback lesson creation failed:", lessonErr);
        }
      }

      // Create Zoom meeting if lesson has no link yet
      if (confirmedLesson && !confirmedLesson.zoomLink) {
        try {
          const { createZoomMeeting } = await import("@/lib/zoom");
          const studentUser = await prisma.user.findUnique({
            where: { id: confirmedLesson.studentId },
            select: { name: true },
          });
          const zoom = await createZoomMeeting({
            topic: `Clase HolaBonjour — ${studentUser?.name || "Alumno"}`,
            startTime: confirmedLesson.scheduledAt,
            durationMinutes: confirmedLesson.durationMinutes,
          });
          await prisma.lesson.update({
            where: { id: confirmedLesson.id },
            data: {
              zoomLink: zoom.joinUrl,
              zoomMeetingId: zoom.meetingId,
              zoomStartUrl: zoom.startUrl,
            },
          });
          console.log(`[stripe-webhook] Zoom meeting created for lesson ${confirmedLesson.id}`);
        } catch (zoomErr) {
          console.error("[stripe-webhook] Zoom creation failed:", zoomErr);
        }
      }

      // Generate invoice (non-blocking)
      if (payment) {
        import("@/lib/factura").then(({ createAndStoreInvoice }) => {
          createAndStoreInvoice(payment.id).catch((err: unknown) =>
            console.error("[stripe-webhook] Invoice generation failed:", err)
          );
        });
      }

      const user = await prisma.user.findUnique({ where: { id: pack.studentId } });
      if (!user) return NextResponse.json({ received: true });

      const totalEur = pack.price.toFixed(2);

      // Fetch confirmed lesson for .ics attachment
      const lessonForIcs = confirmedLesson
        ? await prisma.lesson.findUnique({ where: { id: confirmedLesson.id } })
        : null;

      // Fire-and-forget notifications
      const notifications: Promise<unknown>[] = [
        sendPaymentConfirmationEmail({
          toEmail: user.email,
          customerName: user.name || "Alumno",
          levelRange: pack.levelRange,
          totalEur,
          lessonScheduledAt: lessonForIcs?.scheduledAt ?? undefined,
          lessonDurationMinutes: lessonForIcs?.durationMinutes ?? undefined,
          zoomLink: lessonForIcs?.zoomLink,
        }),
        sendNewBookingStaffEmail({
          customerName: user.name || "Alumno",
          customerEmail: user.email,
          customerPhone: user.phone || undefined,
          levelRange: pack.levelRange,
          totalEur,
          packId: pack.id,
        }),
        user.phone
          ? sendNotification({
              to: user.phone,
              body: smsPagoConfirmado({
                nombre: (user.name || "").split(" ")[0] || "Alumno",
                nivel: pack.levelRange,
                importe: totalEur,
              }),
            })
          : Promise.resolve(),
      ];

      // Send booking confirmation + teacher email if a lesson was confirmed
      if (lessonForIcs) {
        const teacherData = await prisma.user.findUnique({
          where: { id: lessonForIcs.teacherId },
          select: { name: true, email: true },
        });
        const dateLabel = lessonForIcs.scheduledAt.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
        const timeLabel = lessonForIcs.scheduledAt.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

        const { sendBookingConfirmationEmail, sendNewLessonTeacherEmail } = await import("@/lib/email");
        const { smsClaseConfirmada } = await import("@/lib/sms-templates");

        notifications.push(
          sendBookingConfirmationEmail({
            toEmail: user.email,
            customerName: user.name || "Alumno",
            teacherName: teacherData?.name || "Profesor",
            date: dateLabel,
            time: timeLabel,
            durationMinutes: lessonForIcs.durationMinutes,
            zoomLink: lessonForIcs.zoomLink,
            scheduledAt: lessonForIcs.scheduledAt,
          })
        );

        if (teacherData?.email) {
          const freshPack = await prisma.pack.findUnique({ where: { id: pack.id } });
          notifications.push(
            sendNewLessonTeacherEmail({
              toEmail: teacherData.email,
              teacherName: teacherData.name || "Profesor",
              studentName: user.name || "Alumno",
              studentEmail: user.email,
              studentPhone: user.phone,
              levelRange: pack.levelRange,
              hoursRemaining: freshPack ? freshPack.hoursTotal - freshPack.hoursUsed : 0,
              date: dateLabel,
              time: timeLabel,
              durationMinutes: lessonForIcs.durationMinutes,
              zoomStartUrl: lessonForIcs.zoomStartUrl,
              zoomJoinUrl: lessonForIcs.zoomLink,
              scheduledAt: lessonForIcs.scheduledAt,
            })
          );
        }

        if (user.phone) {
          notifications.push(
            sendNotification({
              to: user.phone,
              body: smsClaseConfirmada({
                nombre: (user.name || "").split(" ")[0] || "Alumno",
                fecha: dateLabel,
                hora: timeLabel,
                profesor: (teacherData?.name || "Profesor").split(" ")[0],
              }),
            })
          );
        }
      }

      Promise.allSettled(notifications).then((results) => {
        results.forEach((r, i) => {
          if (r.status === "rejected") {
            console.error(`[stripe-webhook] Notification #${i} failed:`, r.reason);
          }
        });
      });
    } catch (err) {
      console.error("[stripe-webhook] Error:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
