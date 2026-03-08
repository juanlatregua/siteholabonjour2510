import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLevelRange, PACK_PRICES, type PackLevel } from "@/lib/stripe";
import { formatPhoneSpain } from "@/lib/sms";
import { getTeacherBySlugOrDefault } from "@/lib/teacher";
import { z } from "zod";

const manualSchema = z.object({
  level: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  selectedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  selectedTime: z.string().regex(/^\d{2}:\d{2}$/),
  method: z.enum(["BIZUM", "TRANSFER"]),
  reference: z.string().optional(),
  producto: z.string().optional(),
  preparateurSlug: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = manualSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos no válidos.", details: parsed.error.flatten() },
        { status: 400 }
      );
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
