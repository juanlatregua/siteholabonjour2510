import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, type PackLevel, PACK_PRICES } from "@/lib/stripe";
import { formatPhoneSpain } from "@/lib/sms";

const VALID_LEVELS = new Set<string>(["A1", "A2", "B1", "B2", "C1", "C2"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { level, dayOfWeek, timeSlot, name, email, phone } = body;

    // Validate
    if (!level || !VALID_LEVELS.has(level)) {
      return NextResponse.json({ error: "Nivel no válido." }, { status: 400 });
    }
    if (typeof dayOfWeek !== "number" || dayOfWeek < 1 || dayOfWeek > 5) {
      return NextResponse.json({ error: "Día no válido." }, { status: 400 });
    }
    if (!timeSlot || typeof timeSlot !== "string") {
      return NextResponse.json({ error: "Hora no válida." }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nombre requerido." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email no válido." }, { status: 400 });
    }

    const packLevel = level as PackLevel;
    const pack = PACK_PRICES[packLevel];

    // Upsert student
    const student = await prisma.student.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        name: name.trim(),
        phone: phone ? formatPhoneSpain(phone) : undefined,
        level: packLevel,
      },
      create: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? formatPhoneSpain(phone) : null,
        level: packLevel,
      },
    });

    // Find or create time slot
    const endHour = parseInt(timeSlot.split(":")[0]) + 0;
    const endTime = `${String(endHour).padStart(2, "0")}:55`;

    const slot = await prisma.timeSlot.upsert({
      where: { dayOfWeek_startTime: { dayOfWeek, startTime: timeSlot } },
      update: {},
      create: {
        dayOfWeek,
        startTime: timeSlot,
        endTime,
        available: true,
      },
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        studentId: student.id,
        timeSlotId: slot.id,
        level: packLevel,
        sessionsTotal: pack.sessions,
        sessionsUsed: 0,
        status: "PENDING_PAYMENT",
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amountCents: pack.totalCents,
        currency: "eur",
        status: "PENDING",
      },
    });

    // Create Stripe Checkout session
    const session = await createCheckoutSession({
      bookingId: booking.id,
      level: packLevel,
      customerEmail: student.email,
      customerName: student.name,
      idempotencyKey: `booking-${booking.id}`,
    });

    // Update payment with Stripe session ID
    await prisma.payment.update({
      where: { bookingId: booking.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("[booking/create] Error:", err);
    return NextResponse.json(
      { error: "Error interno. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
