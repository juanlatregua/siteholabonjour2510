import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export function getStripe() {
  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY no configurada.");
  }
  if (!/^sk_(test|live)_[^\s]{12,}$/.test(String(stripeSecretKey).trim())) {
    throw new Error("STRIPE_SECRET_KEY no valida.");
  }
  return new Stripe(stripeSecretKey);
}

export type PackLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const PACK_PRICES: Record<PackLevel, { sessions: number; totalCents: number; perSessionCents: number }> = {
  A1: { sessions: 4, totalCents: 15000, perSessionCents: 3750 },
  A2: { sessions: 4, totalCents: 15000, perSessionCents: 3750 },
  B1: { sessions: 4, totalCents: 15000, perSessionCents: 3750 },
  B2: { sessions: 4, totalCents: 15000, perSessionCents: 3750 },
  C1: { sessions: 4, totalCents: 20000, perSessionCents: 5000 },
  C2: { sessions: 4, totalCents: 20000, perSessionCents: 5000 },
};

export async function createCheckoutSession(params: {
  bookingId: string;
  level: PackLevel;
  customerEmail: string;
  customerName?: string;
  idempotencyKey?: string;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.holabonjour.es";
  const pack = PACK_PRICES[params.level];

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: pack.totalCents,
            product_data: {
              name: `Pack 4 clases de francés · Nivel ${params.level}`,
              description: `4 sesiones individuales de 55 min por Zoom (${(pack.perSessionCents / 100).toFixed(2)} €/sesión)`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: params.bookingId,
        level: params.level,
        customerName: params.customerName || "",
      },
      success_url: `${baseUrl}/confirmacion?booking=${params.bookingId}`,
      cancel_url: `${baseUrl}/contratar?nivel=${params.level}`,
    },
    params.idempotencyKey
      ? { idempotencyKey: params.idempotencyKey }
      : undefined,
  );

  return session;
}

export function verifyWebhookSignature(payload: string | Buffer, signature: string) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET no configurada.");
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
