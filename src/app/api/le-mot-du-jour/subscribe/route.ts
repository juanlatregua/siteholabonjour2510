export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo invalido" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", message: "Email invalido" },
      { status: 400 }
    );
  }

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email: parsed.data.email },
  });

  if (existing) {
    if (!existing.active) {
      await prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { active: true },
      });
    }
    return NextResponse.json({ ok: true, message: "Ya estas suscrito" });
  }

  await prisma.newsletterSubscriber.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
    },
  });

  return NextResponse.json({ ok: true, message: "Suscripcion exitosa" });
}
