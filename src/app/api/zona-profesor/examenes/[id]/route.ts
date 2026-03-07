export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateExamenSchema = z.object({
  titulo: z.string().min(1).optional(),
  nivel: z.enum(["A2", "B1", "B2", "C1", "C2"]).optional(),
  diploma: z.enum(["DELF", "DALF"]).optional(),
  numero: z.number().int().positive().optional(),
  esPago: z.boolean().optional(),
  precio: z.number().int().nonnegative().nullable().optional(),
  secciones: z.any().optional(),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED"]).optional(),
});

export async function GET(
  _request: NextRequest,
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
  const examen = await prisma.examenModelo.findUnique({ where: { id } });
  if (!examen) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Examen no encontrado" },
      { status: 404 }
    );
  }
  if (examen.creadoPor !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  return NextResponse.json({ ok: true, examen });
}

export async function PUT(
  request: NextRequest,
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
  const existing = await prisma.examenModelo.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Examen no encontrado" },
      { status: 404 }
    );
  }
  if (existing.creadoPor !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
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

  const parsed = updateExamenSchema.safeParse(body);
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

  const data = parsed.data;
  const previousStatus = existing.status;

  const examen = await prisma.examenModelo.update({
    where: { id },
    data,
  });

  // Send email when status changes to REVIEW
  if (data.status === "REVIEW" && previousStatus !== "REVIEW") {
    try {
      const { sendExamReviewEmail } = await import("@/lib/email");
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true },
      });
      await sendExamReviewEmail({
        profesorName: user?.name || "Profesor",
        titulo: examen.titulo,
        nivel: examen.nivel,
        previewUrl: `${process.env.NEXTAUTH_URL || "https://www.holabonjour.es"}/zona-profesor/examenes/${examen.id}/preview`,
      });
    } catch (e) {
      console.error("Error sending review email:", e);
    }
  }

  return NextResponse.json({ ok: true, examen });
}

export async function DELETE(
  _request: NextRequest,
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
  const existing = await prisma.examenModelo.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { ok: false, error: "NOT_FOUND", message: "Examen no encontrado" },
      { status: 404 }
    );
  }
  if (existing.creadoPor !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  if (existing.status !== "DRAFT") {
    return NextResponse.json(
      {
        ok: false,
        error: "CANNOT_DELETE",
        message: "Solo se pueden eliminar exámenes en borrador",
      },
      { status: 400 }
    );
  }

  await prisma.examenModelo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
