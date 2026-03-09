export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updatePaymentSchema = z.object({
  status: z.enum(["CONFIRMED", "REJECTED"], {
    error: "Estado debe ser CONFIRMED o REJECTED",
  }),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  const { id } = await params;

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true, phone: true, coachId: true } },
      pack: true,
    },
  });

  if (!payment) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Pago no encontrado" },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo invalido" },
      { status: 400 }
    );
  }

  const parsed = updatePaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  if (parsed.data.status === "CONFIRMED") {
    // Idempotency: reject if already confirmed
    if (payment.status === "CONFIRMED") {
      return NextResponse.json(
        { ok: false, error: "ALREADY_CONFIRMED", message: "Este pago ya fue confirmado" },
        { status: 409 }
      );
    }

    // Update payment
    const updated = await prisma.payment.update({
      where: { id },
      data: { status: "CONFIRMED", confirmedAt: new Date() },
    });

    // Activate pack
    if (payment.packId) {
      await prisma.pack.update({
        where: { id: payment.packId },
        data: { status: "ACTIVE", purchasedAt: new Date() },
      });

      // Confirm PENDING_PAYMENT lessons → SCHEDULED
      const pendingLessons = await prisma.lesson.findMany({
        where: { packId: payment.packId, status: "PENDING_PAYMENT" },
      });

      for (const lesson of pendingLessons) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { status: "SCHEDULED" },
        });

        // Create Zoom meeting if lesson has no link
        if (!lesson.zoomLink) {
          try {
            const { createZoomMeeting } = await import("@/lib/zoom");
            const zoom = await createZoomMeeting({
              topic: `Clase HolaBonjour — ${payment.student.name || "Alumno"}`,
              startTime: lesson.scheduledAt,
              durationMinutes: lesson.durationMinutes,
            });
            await prisma.lesson.update({
              where: { id: lesson.id },
              data: {
                zoomLink: zoom.joinUrl,
                zoomMeetingId: zoom.meetingId,
                zoomStartUrl: zoom.startUrl,
              },
            });
          } catch (err) {
            console.error("[pagos] Zoom creation failed:", err);
          }
        }
      }
    }

    // Generate invoice (non-blocking)
    import("@/lib/factura").then(({ createAndStoreInvoice }) => {
      createAndStoreInvoice(payment.id).catch((err: unknown) =>
        console.error("[pagos] Invoice generation failed:", err)
      );
    });

    // Email + SMS confirmation to student (fire-and-forget)
    const levelRange = payment.pack?.levelRange || "Pack";
    const totalEur = payment.amount.toFixed(2);

    Promise.allSettled([
      import("@/lib/email").then(({ sendPaymentConfirmationEmail }) =>
        sendPaymentConfirmationEmail({
          toEmail: payment.student.email,
          customerName: payment.student.name || "Alumno",
          levelRange,
          totalEur,
        })
      ),
      payment.student.phone
        ? import("@/lib/sms").then(({ sendNotification }) =>
            import("@/lib/sms-templates").then(({ smsPagoConfirmado }) =>
              sendNotification({
                to: payment.student.phone!,
                body: smsPagoConfirmado({
                  nombre: (payment.student.name || "").split(" ")[0] || "Alumno",
                  nivel: levelRange,
                  importe: totalEur,
                }),
              })
            )
          )
        : Promise.resolve(),
    ]).catch(() => {});

    return NextResponse.json({ ok: true, payment: updated });
  }

  if (parsed.data.status === "REJECTED") {
    const updated = await prisma.payment.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    // Cancel pack
    if (payment.packId) {
      await prisma.pack.update({
        where: { id: payment.packId },
        data: { status: "CANCELLED" },
      });

      // Delete PENDING_PAYMENT lessons
      await prisma.lesson.deleteMany({
        where: { packId: payment.packId, status: "PENDING_PAYMENT" },
      });
    }

    // Notify student (fire-and-forget)
    import("@/lib/email").then(({ sendPaymentRejectedEmail }) => {
      sendPaymentRejectedEmail({
        toEmail: payment.student.email,
        customerName: payment.student.name || "Alumno",
      }).catch(() => {});
    });

    return NextResponse.json({ ok: true, payment: updated });
  }

  return NextResponse.json({ ok: false, error: "INVALID_STATUS" }, { status: 400 });
}
