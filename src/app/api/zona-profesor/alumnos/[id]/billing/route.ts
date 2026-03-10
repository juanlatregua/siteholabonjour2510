export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  billingType: z.string().nullable().optional(),
  billingNif: z.string().nullable().optional(),
  billingRazonSocial: z.string().nullable().optional(),
  billingDireccion: z.string().nullable().optional(),
  billingCiudad: z.string().nullable().optional(),
  billingCP: z.string().nullable().optional(),
  billingPais: z.string().nullable().optional(),
  billingContacto: z.string().nullable().optional(),
  billingEmail: z.string().email().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  // Verify student belongs to teacher
  const student = await prisma.user.findUnique({
    where: { id },
    select: { id: true, coachId: true },
  });

  if (!student) {
    return NextResponse.json(
      { error: "Alumno no encontrado" },
      { status: 404 }
    );
  }
  if (student.coachId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id },
    data: parsed.data,
    select: {
      id: true,
      billingType: true,
      billingNif: true,
      billingRazonSocial: true,
      billingDireccion: true,
      billingCiudad: true,
      billingCP: true,
      billingPais: true,
      billingContacto: true,
      billingEmail: true,
    },
  });

  return NextResponse.json({ ok: true, billing: updated });
}
