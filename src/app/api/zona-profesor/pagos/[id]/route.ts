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
    include: { student: { select: { coachId: true } } },
  });

  if (!payment) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Pago no encontrado" },
      { status: 404 }
    );
  }

  if (payment.student.coachId !== session.user.id) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "No tienes permiso para editar este pago" },
      { status: 403 }
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

  const data: Record<string, unknown> = { status: parsed.data.status };
  if (parsed.data.status === "CONFIRMED") {
    data.confirmedAt = new Date();
  }

  const updated = await prisma.payment.update({
    where: { id },
    data,
  });

  return NextResponse.json({ ok: true, payment: updated });
}
