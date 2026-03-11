export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPhoneSpain } from "@/lib/sms";
import { z } from "zod";

const createStudentSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(100),
  email: z.string().email("Email invalido").max(200),
  level: z.string().max(5).optional(),
  route: z.string().max(50).optional(),
  phone: z.string().max(20).optional(),
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

  const students = await prisma.user.findMany({
    where: { coachId: session.user.id, role: "STUDENT" },
    include: {
      studentPacks: {
        where: { status: "ACTIVE" },
      },
      studentLessons: {
        where: {
          status: "SCHEDULED",
          scheduledAt: { gte: new Date() },
        },
        orderBy: { scheduledAt: "asc" },
        take: 3,
      },
    },
    orderBy: { name: "asc" },
    take: 200, // Safety limit
  });

  return NextResponse.json({ ok: true, students });
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
      { ok: false, error: "INVALID_JSON", message: "Cuerpo invalido" },
      { status: 400 }
    );
  }

  const parsed = createStudentSchema.safeParse(body);
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

  const { name, email, level, route, phone } = parsed.data;

  // Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    // Already assigned to this teacher
    if (existing.coachId === session.user.id) {
      return NextResponse.json(
        { ok: false, error: "ALREADY_ASSIGNED", message: "Este alumno ya está asignado a tu cuenta" },
        { status: 409 }
      );
    }

    // User exists (e.g. from booking flow) — adopt and update profile
    const student = await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: existing.name || name,
        role: "STUDENT",
        level: level || existing.level || null,
        route: route || existing.route || null,
        phone: phone ? formatPhoneSpain(phone) : existing.phone || null,
        coachId: session.user.id,
      },
    });

    return NextResponse.json({ ok: true, student, adopted: true }, { status: 200 });
  }

  const student = await prisma.user.create({
    data: {
      name,
      email,
      role: "STUDENT",
      level: level || null,
      route: route || null,
      phone: phone ? formatPhoneSpain(phone) : null,
      coachId: session.user.id,
    },
  });

  return NextResponse.json({ ok: true, student }, { status: 201 });
}
