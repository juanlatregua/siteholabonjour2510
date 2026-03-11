export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSlotSchema = z.object({
  studentId: z.string().min(1),
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  modality: z.enum(["ZOOM", "PRESENCIAL"]).optional().default("ZOOM"),
  notes: z.string().max(500).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  const slots = await prisma.recurringSlot.findMany({
    where: { teacherId: session.user.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ ok: true, slots });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = createSlotSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { studentId, dayOfWeek, startTime, modality, notes } = parsed.data;

  // Verify student belongs to this teacher
  const student = await prisma.user.findFirst({
    where: { id: studentId, coachId: session.user.id },
  });
  if (!student) {
    return NextResponse.json(
      { ok: false, error: "STUDENT_NOT_FOUND", message: "Estudiante no encontrado" },
      { status: 404 }
    );
  }

  // Check uniqueness (teacher+day+time)
  const existing = await prisma.recurringSlot.findUnique({
    where: {
      teacherId_dayOfWeek_startTime: {
        teacherId: session.user.id,
        dayOfWeek,
        startTime,
      },
    },
  });
  if (existing) {
    return NextResponse.json(
      { ok: false, error: "SLOT_EXISTS", message: "Ya tienes un horario reservado en ese tramo." },
      { status: 409 }
    );
  }

  const slot = await prisma.recurringSlot.create({
    data: {
      teacherId: session.user.id,
      studentId,
      dayOfWeek,
      startTime,
      modality,
      notes: notes || null,
    },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ ok: true, slot }, { status: 201 });
}
