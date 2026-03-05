import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendPaymentConfirmationEmail, sendNewBookingStaffEmail } from "@/lib/email";
import { sendNotification } from "@/lib/sms";
import { smsPagoConfirmado } from "@/lib/sms-templates";
import { addPaidCorrections } from "@/lib/correction/quota";
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

      const user = await prisma.user.findUnique({ where: { id: pack.studentId } });
      if (!user) return NextResponse.json({ received: true });

      const totalEur = pack.price.toFixed(2);

      // Fire-and-forget notifications
      Promise.allSettled([
        sendPaymentConfirmationEmail({
          toEmail: user.email,
          customerName: user.name || "Alumno",
          levelRange: pack.levelRange,
          totalEur,
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
      ]).catch((err) => console.error("[stripe-webhook] Notification error:", err));
    } catch (err) {
      console.error("[stripe-webhook] Error:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
