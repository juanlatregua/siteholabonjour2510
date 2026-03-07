export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createExamenSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  nivel: z.enum(["A2", "B1", "B2", "C1", "C2"]),
  diploma: z.enum(["DELF", "DALF"]),
  numero: z.number().int().positive(),
  esPago: z.boolean().default(true),
  precio: z.number().int().nonnegative().nullable().optional(),
  secciones: z.any(),
  status: z.enum(["DRAFT", "REVIEW"]).default("DRAFT"),
});

export async function GET() {
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

  const examenes = await prisma.examenModelo.findMany({
    where: { creadoPor: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      titulo: true,
      nivel: true,
      diploma: true,
      numero: true,
      status: true,
      esPago: true,
      precio: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ ok: true, examenes });
}

export async function POST(request: NextRequest) {
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const parsed = createExamenSchema.safeParse(body);
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

  const { titulo, nivel, diploma, numero, esPago, precio, secciones, status } =
    parsed.data;

  const examen = await prisma.examenModelo.create({
    data: {
      titulo,
      nivel,
      diploma,
      numero,
      esPago,
      precio: precio ?? null,
      secciones: secciones ?? [],
      status,
      creadoPor: session.user.id,
    },
  });

  // If submitted for review, send email notification
  if (status === "REVIEW") {
    try {
      const { sendExamReviewEmail } = await import("@/lib/email");
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { name: true },
      });
      await sendExamReviewEmail({
        profesorName: user?.name || "Profesor",
        titulo,
        nivel,
        previewUrl: `${process.env.NEXTAUTH_URL || "https://www.holabonjour.es"}/zona-profesor/examenes/${examen.id}/preview`,
      });
    } catch (e) {
      console.error("Error sending review email:", e);
    }
  }

  return NextResponse.json({ ok: true, examen }, { status: 201 });
}
