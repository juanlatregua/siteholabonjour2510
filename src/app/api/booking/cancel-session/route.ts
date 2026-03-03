import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/sms";
import { smsAnulacionTardia } from "@/lib/sms-templates";
import { sendLateCancellationEmail } from "@/lib/email";

const CANCELLATION_HOURS = 48;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId requerido." }, { status: 400 });
    }

    const session = await prisma.classSession.findUnique({
      where: { id: sessionId },
      include: {
        booking: { include: { student: true } },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Sesión no encontrada." }, { status: 404 });
    }

    if (session.status !== "SCHEDULED") {
      return NextResponse.json({ error: "Esta sesión no se puede anular." }, { status: 400 });
    }

    const now = new Date();
    const hoursUntilClass = (session.date.getTime() - now.getTime()) / (1000 * 60 * 60);
    const isLate = hoursUntilClass < CANCELLATION_HOURS;

    // Determine cancellation type
    const newStatus = isLate ? "CANCELLED_LATE" : "CANCELLED_ON_TIME";

    // Update session
    await prisma.classSession.update({
      where: { id: sessionId },
      data: {
        status: newStatus,
        cancelledAt: now,
      },
    });

    // If late cancellation, count it as a used session
    if (isLate) {
      await prisma.booking.update({
        where: { id: session.bookingId },
        data: { sessionsUsed: { increment: 1 } },
      });

      const student = session.booking.student;
      const dateLabel = session.date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      });

      // Notify student of late cancellation
      const notifications = [];

      if (student.phone) {
        notifications.push(
          sendNotification({
            to: student.phone,
            body: smsAnulacionTardia({
              nombre: student.name.split(" ")[0],
              fecha: dateLabel,
            }),
          }),
        );
      }

      notifications.push(
        sendLateCancellationEmail({
          toEmail: student.email,
          customerName: student.name,
          date: dateLabel,
        }),
      );

      await Promise.allSettled(notifications);
    }

    return NextResponse.json({
      ok: true,
      isLate,
      status: newStatus,
      message: isLate
        ? "Anulación tardía. La clase se descuenta del bono (salvo justificante médico en 24h)."
        : "Clase anulada correctamente.",
    });
  } catch (err) {
    console.error("[booking/cancel-session] Error:", err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
