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

export const PACK_PRICES: Record<string, { levelRange: string; sessions: number; totalEur: number; perSessionEur: number }> = {
  "A1-B2": { levelRange: "A1-B2", sessions: 4, totalEur: 150, perSessionEur: 37.5 },
  "C1-C2": { levelRange: "C1-C2", sessions: 4, totalEur: 200, perSessionEur: 50 },
  "diagnostico": { levelRange: "diagnostico", sessions: 1, totalEur: 25, perSessionEur: 25 },
};

export function getLevelRange(level: PackLevel): string {
  return ["C1", "C2"].includes(level) ? "C1-C2" : "A1-B2";
}

export async function createCheckoutSession(params: {
  packId: string;
  levelRange: string;
  customerEmail: string;
  customerName?: string;
  idempotencyKey?: string;
  selectedDate?: string;
  selectedTime?: string;
  producto?: string;
  preparateurSlug?: string;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.holabonjour.es";
  const pack = PACK_PRICES[params.levelRange];
  if (!pack) throw new Error(`Invalid levelRange: ${params.levelRange}`);

  const totalCents = Math.round(pack.totalEur * 100);

  const isDiagnostico = params.producto === "diagnostico";
  const productName = isDiagnostico
    ? "Sesión diagnóstico DELF/DALF · 30 min"
    : `Pack 4 clases de francés · ${params.levelRange}`;
  const productDescription = isDiagnostico
    ? "1 sesión individual de 30 min por Zoom — diagnóstico de nivel y plan de preparación"
    : `4 sesiones individuales de 55 min por Zoom (${pack.perSessionEur.toFixed(2)} €/sesión)`;

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: totalCents,
            product_data: {
              name: productName,
              description: productDescription,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        packId: params.packId,
        levelRange: params.levelRange,
        customerName: params.customerName || "",
        ...(params.selectedDate && { selectedDate: params.selectedDate }),
        ...(params.selectedTime && { selectedTime: params.selectedTime }),
        ...(params.producto && { producto: params.producto }),
        ...(params.preparateurSlug && { preparateurSlug: params.preparateurSlug }),
      },
      success_url: `${baseUrl}/confirmacion?pack=${params.packId}`,
      cancel_url: `${baseUrl}/contratar`,
    },
    params.idempotencyKey
      ? { idempotencyKey: params.idempotencyKey }
      : undefined,
  );

  return session;
}

// ── Correction Packs ──

export const CORRECTION_PACK_PRICES: Record<string, { count: number; totalEur: number }> = {
  "10-corrections": { count: 10, totalEur: 19 },
  "1-correction": { count: 1, totalEur: 2.90 },
};

export async function createCorrectionCheckoutSession(params: {
  packKey: string;
  customerEmail: string;
  idempotencyKey?: string;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.holabonjour.es";
  const pack = CORRECTION_PACK_PRICES[params.packKey];
  if (!pack) throw new Error(`Invalid correction pack: ${params.packKey}`);

  const totalCents = Math.round(pack.totalEur * 100);

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: totalCents,
            product_data: {
              name: `Pack ${pack.count} corrección${pack.count > 1 ? "es" : ""} IA`,
              description: `${pack.count} corrección${pack.count > 1 ? "es" : ""} de expresión escrita con IA (rúbricas DELF/DALF)`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "correction_pack",
        packKey: params.packKey,
        correctionCount: String(pack.count),
        customerEmail: params.customerEmail,
      },
      success_url: `${baseUrl}/correccion-ia?purchased=true`,
      cancel_url: `${baseUrl}/correccion-ia`,
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
