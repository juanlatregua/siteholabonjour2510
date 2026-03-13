export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/azure-mail";
import { scanDiplomas } from "@/lib/diploma-scanner";

const schema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  nationality: z.string().max(100).optional(),
  location: z.string().min(1).max(200),
  yearsExperience: z.number().int().min(1).max(50),
  levels: z.array(z.string()).min(1),
  specialties: z.array(z.string()).min(1),
  bio: z.string().min(100).max(2000),
  diplomaUrls: z.array(z.string()).min(1).max(10),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Check for duplicate email
  const existing = await prisma.preparateurApplication.findFirst({
    where: { email: d.email, status: { in: ["PENDING", "APPROVED"] } },
  });
  if (existing) {
    return NextResponse.json(
      { ok: false, message: "Ya existe una candidatura con este email." },
      { status: 409 }
    );
  }

  // Create application
  const application = await prisma.preparateurApplication.create({
    data: {
      name: d.fullName,
      email: d.email,
      nationality: d.nationality || null,
      location: d.location,
      experience: d.yearsExperience,
      levels: d.levels,
      especialidades: d.specialties,
      motivacion: d.bio,
      diplomaUrls: d.diplomaUrls,
      hourlyRate: 0,
    },
  });

  // Fire-and-forget: scan diplomas with AI
  scanDiplomas(d.diplomaUrls, d.fullName)
    .then(async (scanResult) => {
      await prisma.preparateurApplication.update({
        where: { id: application.id },
        data: { diplomaScan: JSON.parse(JSON.stringify(scanResult)) },
      });
    })
    .catch((err) => {
      console.error("[aplicar] Diploma scan failed:", err);
    });

  // Send emails
  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.EMAIL_FROM || "info@holabonjour.es";

  const staffHtml = wrapEmail(`
    <h2>Nueva candidatura de profesor FLE</h2>
    <table style="border-collapse:collapse; margin:12px 0; font-size:14px;">
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Nombre</td><td>${d.fullName}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Email</td><td><a href="mailto:${d.email}" style="color:#E50046;">${d.email}</a></td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Nacionalidad</td><td>${d.nationality || "—"}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Ubicación</td><td>${d.location}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Experiencia</td><td>${d.yearsExperience} año${d.yearsExperience !== 1 ? "s" : ""}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Niveles</td><td>${d.levels.join(", ")}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Especialidades</td><td>${d.specialties.join(", ")}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78;">Diplomas</td><td>${d.diplomaUrls.length} archivo(s) — verificación IA en curso</td></tr>
    </table>
    <h3>Bio</h3>
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; white-space:pre-wrap; font-size:14px;">${d.bio}</div>
    <p style="margin-top:16px;"><a href="https://holabonjour.es/zona-profesor/candidaturas" style="display:inline-block; padding:10px 20px; background:#1e2d4a; color:#fff; border-radius:8px; text-decoration:none; font-weight:600;">Revisar en el panel</a></p>
  `);

  const ackHtml = wrapEmail(`
    <h2>Hemos recibido tu candidatura</h2>
    <p>Hola ${d.fullName.split(" ")[0]},</p>
    <p>Gracias por tu interés en ser parte de HolaBonjour como profesor/a de FLE verificado.</p>
    <p>Estamos analizando tus diplomas y revisando tu perfil. Te responderemos en un máximo de <strong>48 horas</strong>.</p>
    <p>Un saludo cordial,<br/>Equipo HolaBonjour</p>
  `);

  try {
    await Promise.all([
      sendMail({ to: staffTo, subject: `[Candidatura Profesor] ${d.fullName}`, html: staffHtml }),
      sendMail({ to: d.email, subject: "Tu candidatura en HolaBonjour", html: ackHtml }),
    ]);
  } catch (err) {
    console.error("[aplicar] Email failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function wrapEmail(content: string) {
  return `
    <div style="background:#f8fafc; padding:24px 12px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:22px;">
        <div style="margin-bottom:14px;">
          <a href="https://holabonjour.es" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
            <strong style="font-size:20px; color:#395D9F;">HolaBonjour</strong>
          </a>
        </div>
        <div style="font-family:Arial, sans-serif; color:#0f172a; font-size:15px; line-height:1.45;">
          ${content}
        </div>
        <hr style="margin:18px 0 12px 0; border:0; border-top:1px solid #e2e8f0;" />
        <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#64748b;">
          HolaBonjour &middot; Plataforma para profesores de francés &middot;
          <a href="mailto:info@holabonjour.es" style="color:#E50046; text-decoration:none;">info@holabonjour.es</a>
        </p>
      </div>
    </div>
  `;
}
