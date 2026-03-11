export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendHoursReturnedEmail } from "@/lib/email";

const devolverHoraSchema = z.object({
  cantidad: z.number().min(0.5).max(10).default(1),
  motivo: z.string().min(1, "El motivo es obligatorio").max(500),
});

export async function POST(
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

  const pack = await prisma.pack.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true, coachId: true } },
    },
  });

  if (!pack) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Pack no encontrado" },
      { status: 404 }
    );
  }

  if (pack.student.coachId !== session.user.id) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "No tienes permiso sobre este pack" },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const parsed = devolverHoraSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos inválidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { cantidad, motivo } = parsed.data;

  if (pack.hoursUsed < cantidad) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_OPERATION",
        message: `No se pueden devolver ${cantidad} hora(s): solo hay ${pack.hoursUsed} hora(s) usadas`,
      },
      { status: 400 }
    );
  }

  const newHoursUsed = pack.hoursUsed - cantidad;
  const newStatus = pack.status === "EXHAUSTED" && newHoursUsed < pack.hoursTotal
    ? "ACTIVE"
    : pack.status;

  const updatedPack = await prisma.pack.update({
    where: { id },
    data: {
      hoursUsed: { decrement: cantidad },
      status: newStatus,
    },
  });

  const hoursRemaining = updatedPack.hoursTotal - updatedPack.hoursUsed;

  // Notify student
  if (pack.student.email) {
    sendHoursReturnedEmail({
      toEmail: pack.student.email,
      customerName: pack.student.name || "alumno/a",
      hours: cantidad,
      motivo,
      hoursRemaining,
    }).catch(() => { /* non-blocking */ });
  }

  return NextResponse.json({
    ok: true,
    pack: updatedPack,
    hoursRemaining,
  });
}
