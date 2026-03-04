import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, getLevelRange, PACK_PRICES, type PackLevel } from "@/lib/stripe";
import { formatPhoneSpain } from "@/lib/sms";

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { level, name, email, phone } = body;

    if (!level || !VALID_LEVELS.has(level)) {
      return NextResponse.json({ error: "Nivel no válido." }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nombre requerido." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email no válido." }, { status: 400 });
    }

    const packLevel = level as PackLevel;
    const levelRange = getLevelRange(packLevel);
    const packPrice = PACK_PRICES[levelRange];

    // Upsert user (student)
    const emailNorm = email.trim().toLowerCase();
    let user = await prisma.user.findUnique({ where: { email: emailNorm } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: emailNorm,
          name: name.trim(),
          phone: phone ? formatPhoneSpain(phone) : null,
          level: packLevel,
          role: "STUDENT",
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: name.trim(),
          phone: phone ? formatPhoneSpain(phone) : user.phone,
          level: packLevel,
        },
      });
    }

    // Create pack
    const pack = await prisma.pack.create({
      data: {
        studentId: user.id,
        hoursTotal: 4,
        hoursUsed: 0,
        price: packPrice.totalEur,
        levelRange,
        status: "PENDING",
      },
    });

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        studentId: user.id,
        packId: pack.id,
        amount: packPrice.totalEur,
        method: "STRIPE",
        status: "PENDING",
      },
    });

    // Create Stripe Checkout session
    const session = await createCheckoutSession({
      packId: pack.id,
      levelRange,
      customerEmail: user.email,
      customerName: user.name || undefined,
      idempotencyKey: `pack-${pack.id}`,
    });

    // Store Stripe session ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("[booking/checkout] Error:", err);
    return NextResponse.json({ error: "Error interno. Inténtalo de nuevo." }, { status: 500 });
  }
}
