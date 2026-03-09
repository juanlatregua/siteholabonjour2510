import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLevelRange, PACK_PRICES, type PackLevel } from "@/lib/stripe";
import { formatPhoneSpain } from "@/lib/sms";
import { getTeacherBySlugOrDefault } from "@/lib/teacher";
import { z } from "zod";

const VALID_LEVELS = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

const manualSchema = z.object({
  level: z.string().min(1).max(2).refine((v) => VALID_LEVELS.has(v), "Nivel no válido"),
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
  selectedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  selectedTime: z.string().regex(/^\d{2}:\d{2}$/),
  method: z.enum(["BIZUM", "TRANSFER"]),
  reference: z.string().max(100).optional(),
  producto: z.enum(["diagnostico", ""]).optional(),
  preparateurSlug: z.string().max(100).optional(),
  // Honeypot: must be empty (bots fill hidden fields)
  website: z.string().max(0, "").optional(),
});

// ── IP-based rate limit: max 10 requests per IP per 15 min ──
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX = 10;

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  entry.count++;
  return entry.count <= RATE_MAX;
}

// Cleanup stale entries periodically (prevent memory leak in long-running instances)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRequests) {
    if (now > entry.resetAt) ipRequests.delete(ip);
  }
}, 5 * 60 * 1000);

export async function POST(req: NextRequest) {
  // IP rate limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";

  if (!checkIpRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = manualSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos no válidos.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot triggered — silently reject (looks like success to bot)
    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: "Reserva registrada." });
    }

    const {
      level, name, email, phone, selectedDate, selectedTime,
      method, reference, producto, preparateurSlug,
    } = parsed.data;

    const isDiagnostico = producto === "diagnostico";
    const packLevel = level as PackLevel;
    const levelRange = isDiagnostico ? "diagnostico" : getLevelRange(packLevel);
    const packPrice = PACK_PRICES[levelRange];

    if (!packPrice) {
      return NextResponse.json({ error: "Producto no válido." }, { status: 400 });
    }

    const { teacher } = await getTeacherBySlugOrDefault(preparateurSlug);

    // Validate slot
    const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`);
    if (isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      return NextResponse.json({ error: "Horario no válido." }, { status: 400 });
    }

    const dayOfWeek = scheduledAt.getDay();
    const availability = await prisma.availability.findFirst({
      where: { teacherId: teacher.id, dayOfWeek, startTime: selectedTime, active: true },
    });
    if (!availability) {
      return NextResponse.json({ error: "Este horario no está disponible." }, { status: 409 });
    }

    const existingLesson = await prisma.lesson.findFirst({
      where: {
        teacherId: teacher.id,
        scheduledAt,
        status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
      },
    });
    if (existingLesson) {
      return NextResponse.json({ error: "Este horario ya está reservado." }, { status: 409 });
    }

    // Upsert user
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

    // Create pack (PENDING until payment confirmed)
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
    await prisma.payment.create({
      data: {
        studentId: user.id,
        packId: pack.id,
        amount: packPrice.totalEur,
        method,
        status: "PENDING",
        reference: reference || null,
      },
    });

    // Create lesson PENDING_PAYMENT
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

    // Email staff (fire-and-forget)
    import("@/lib/email").then(({ sendManualPaymentPendingEmail }) => {
      sendManualPaymentPendingEmail({
        customerName: name.trim(),
        customerEmail: emailNorm,
        method,
        reference,
        totalEur: packPrice.totalEur.toFixed(2),
        levelRange,
      }).catch(() => {});
    });

    return NextResponse.json({
      ok: true,
      message: method === "BIZUM"
        ? "Reserva registrada. Confirmaremos tu Bizum en menos de 24h."
        : "Reserva registrada. Confirmaremos tu transferencia en menos de 24h.",
    });
  } catch (err) {
    console.error("[booking/manual] Error:", err);
    return NextResponse.json({ error: "Error interno. Inténtalo de nuevo." }, { status: 500 });
  }
}
