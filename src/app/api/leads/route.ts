import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/azure-mail";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    objetivo?: string;
    source?: string;
    message?: string;
    phone?: string;
  };

  const { name, email, objetivo, source, message, phone } = body;

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, message: "Nombre y email son obligatorios." },
      { status: 400 },
    );
  }

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
