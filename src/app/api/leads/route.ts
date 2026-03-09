import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/azure-mail";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
  objetivo: z.string().max(200).optional(),
  source: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "JSON no válido." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Datos no válidos.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, phone, objetivo, message, source } = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        objetivo: objetivo || null,
        message: message || null,
        source: source || null,
      },
    });

    // Notify staff (fire-and-forget)
    sendMail({
      to: "info@holabonjour.es",
      subject: `Nuevo lead: ${name} — ${objetivo || "sin objetivo"}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;padding:20px;">
        <h2 style="color:#395D9F;">Nuevo lead en holabonjour.es</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
        ${objetivo ? `<p><strong>Objetivo:</strong> ${objetivo}</p>` : ""}
        ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ""}
        <p><strong>Origen:</strong> ${source || "web"}</p>
        <p style="font-size:12px;color:#64748b;margin-top:20px;">HolaBonjour · Lead automático</p>
      </div>`,
    }).catch((err) => console.error("[leads] Email notification failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Error saving lead:", err);
    return NextResponse.json(
      { ok: false, message: "Error interno." },
      { status: 500 },
    );
  }
}
