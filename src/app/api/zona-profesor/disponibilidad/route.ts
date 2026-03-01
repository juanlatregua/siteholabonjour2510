export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const slotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato de hora invalido (HH:MM)"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato de hora invalido (HH:MM)"),
  active: z.boolean(),
});

const upsertSchema = z.object({
  slots: z.array(slotSchema),
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

  const slots = await prisma.availability.findMany({
    where: { teacherId: session.user.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ ok: true, slots });
}

export async function PUT(request: Request) {
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

  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Datos de disponibilidad invalidos",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const results = await Promise.all(
    parsed.data.slots.map((slot) =>
      prisma.availability.upsert({
        where: {
          teacherId_dayOfWeek_startTime: {
            teacherId: session.user.id,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
          },
        },
        update: {
          endTime: slot.endTime,
          active: slot.active,
        },
        create: {
          teacherId: session.user.id,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
          active: slot.active,
        },
      })
    )
  );

  return NextResponse.json({ ok: true, slots: results });
}
