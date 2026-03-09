import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, getLevelRange, PACK_PRICES, type PackLevel } from "@/lib/stripe";
import { formatPhoneSpain } from "@/lib/sms";
import { getTeacherBySlugOrDefault } from "@/lib/teacher";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

const checkoutSchema = z.object({
  level: z.string().min(1).max(2).refine((v) => VALID_LEVELS.has(v), "Nivel no válido"),
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
  selectedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  selectedTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  producto: z.enum(["diagnostico", ""]).optional(),
  preparateurSlug: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limit: 10 requests per IP per 15 min
  const ip = getClientIp(req);
  if (!checkRateLimit("booking-checkout", ip, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos no válidos.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { level, name, email, phone, selectedDate, selectedTime, producto, preparateurSlug } = parsed.data;

    const isDiagnostico = producto === "diagnostico";
    const packLevel = level as PackLevel;
    const levelRange = isDiagnostico ? "diagnostico" : getLevelRange(packLevel);
    const packPrice = PACK_PRICES[levelRange];

    if (!packPrice) {
      return NextResponse.json({ error: "Producto no válido." }, { status: 400 });
    }

    // Resolve teacher from slug or default
    const { teacher, profile } = await getTeacherBySlugOrDefault(preparateurSlug);

    // Validate slot if date/time provided
    if (selectedDate && selectedTime) {
      // Check availability exists for this day/time
      const slotDate = new Date(`${selectedDate}T${selectedTime}:00`);
      if (isNaN(slotDate.getTime()) || slotDate <= new Date()) {
        return NextResponse.json({ error: "Horario no válido." }, { status: 400 });
      }

      const dayOfWeek = slotDate.getDay();
      const availability = await prisma.availability.findFirst({
        where: {
          teacherId: teacher.id,
          dayOfWeek,
          startTime: selectedTime,
          active: true,
        },
      });

      if (!availability) {
        return NextResponse.json({ error: "Este horario no está disponible." }, { status: 409 });
      }

      // Check no existing lesson at this time
      const existingLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: teacher.id,
          scheduledAt: slotDate,
          status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
        },
      });

      if (existingLesson) {
        return NextResponse.json({ error: "Este horario ya está reservado." }, { status: 409 });
      }
    }

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
        hoursTotal: isDiagnostico ? 1 : 4,
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

    // Create PENDING_PAYMENT lesson if slot selected (race-safe)
    if (selectedDate && selectedTime) {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`);
      try {
        await prisma.lesson.create({
          data: {
            studentId: user.id,
            teacherId: teacher.id,
            packId: pack.id,
            scheduledAt,
            durationMinutes: isDiagnostico ? 30 : 60,
            status: "PENDING_PAYMENT",
            focus: isDiagnostico ? "Sesión diagnóstico DELF/DALF" : null,
          },
        });
      } catch (err: unknown) {
        if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2002") {
          return NextResponse.json(
            { error: "Este horario ya no está disponible. Por favor elige otro." },
            { status: 409 },
          );
        }
        throw err;
      }
    }

    // Create Stripe Checkout session
    const session = await createCheckoutSession({
      packId: pack.id,
      levelRange,
      customerEmail: user.email,
      customerName: user.name || undefined,
      idempotencyKey: `pack-${pack.id}`,
      selectedDate,
      selectedTime,
      producto: isDiagnostico ? "diagnostico" : undefined,
      preparateurSlug: profile?.slug || undefined,
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
