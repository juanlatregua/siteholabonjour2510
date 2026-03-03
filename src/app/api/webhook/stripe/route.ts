import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationEmail, sendPaymentConfirmationEmail, sendNewBookingStaffEmail } from "@/lib/email";
import { sendNotification } from "@/lib/sms";
import { smsPagoConfirmado } from "@/lib/sms-templates";
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
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.warn("[stripe-webhook] No bookingId in metadata");
      return NextResponse.json({ received: true });
    }

    try {
      // Update payment status
      const payment = await prisma.payment.update({
        where: { stripeSessionId: session.id },
        data: {
          status: "PAID",
          stripePaymentId: session.payment_intent as string,
          paidAt: new Date(),
        },
      });

      // Activate the booking
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "ACTIVE" },
        include: { student: true },
      });

      const totalEur = (payment.amountCents / 100).toFixed(2);

      // Send notifications (fire-and-forget, don't block webhook)
      Promise.allSettled([
        sendPaymentConfirmationEmail({
          toEmail: booking.student.email,
          customerName: booking.student.name,
          level: booking.level,
          totalEur,
          bookingId: booking.id,
        }),
        sendBookingConfirmationEmail({
          toEmail: booking.student.email,
          customerName: booking.student.name,
          level: booking.level,
          sessions: booking.sessionsTotal,
          totalEur,
          bookingId: booking.id,
        }),
        sendNewBookingStaffEmail({
          customerName: booking.student.name,
          customerEmail: booking.student.email,
          customerPhone: booking.student.phone || undefined,
          level: booking.level,
          totalEur,
          bookingId: booking.id,
        }),
        booking.student.phone
          ? sendNotification({
              to: booking.student.phone,
              body: smsPagoConfirmado({
                nombre: booking.student.name.split(" ")[0],
                nivel: booking.level,
                importe: totalEur,
              }),
            })
          : Promise.resolve(),
      ]).catch((err) => console.error("[stripe-webhook] Notification error:", err));
    } catch (err) {
      console.error("[stripe-webhook] Error processing payment:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
