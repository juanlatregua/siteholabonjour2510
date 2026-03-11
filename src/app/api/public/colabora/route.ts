export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/azure-mail";
import { getSignedUrlFromBucket } from "@/lib/supabase";

const colaboraSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  email: z.string().email("Email inválido").max(200),
  telefono: z.string().min(1, "El teléfono es obligatorio").max(20),
  nivelFrances: z.string().min(1, "Selecciona tu nivel de francés").max(20),
  nivelFrancesOtro: z.string().max(100).optional(),
  titulacion: z.string().min(1, "Selecciona tu titulación").max(100),
  titulacionDetalle: z.string().min(1, "Especifica tu titulación y centro").max(500),
  experiencia: z.number().int().min(1, "Se requiere al menos 1 año de experiencia"),
  disponibilidad: z.number().int().min(4, "La disponibilidad mínima es de 4 horas semanales"),
  linkedinUrl: z.string().url("La URL debe empezar por http:// o https://").max(500).optional().or(z.literal("")),
  archivos: z.array(z.object({ name: z.string().max(200), path: z.string().max(500) })).max(5).optional(),
  motivacion: z.string().min(200, "Por favor escribe al menos 200 caracteres contando tu motivación y experiencia relevante.").max(5000),
  especialidades: z.array(z.string().max(50)).max(10).optional(),
  especialidadOtro: z.string().max(200).optional(),
  otrosIdiomas: z.string().max(200).optional(),
  comoNosConociste: z.string().max(200).optional(),
});

const BRAND_HOME_URL = "https://www.holabonjour.es";

function wrapEmailHtml(content: string) {
  return `
    <div style="background:#f8fafc; padding:24px 12px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:22px;">
        <div style="margin-bottom:14px;">
          <a href="${BRAND_HOME_URL}" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
            <strong style="font-size:20px; color:#395D9F;">HolaBonjour</strong>
          </a>
        </div>
        <div style="font-family:Arial, sans-serif; color:#0f172a; font-size:15px; line-height:1.45;">
          ${content}
        </div>
        <hr style="margin:18px 0 12px 0; border:0; border-top:1px solid #e2e8f0;" />
        <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#64748b;">
          HolaBonjour · Academia de francés online · Málaga ·
          <a href="mailto:info@holabonjour.es" style="color:#E50046; text-decoration:none;">info@holabonjour.es</a>
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const parsed = colaboraSchema.safeParse(body);
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

  const d = parsed.data;
  const subject = `[Candidatura Profesor FLE] ${d.nombre}`;

  // Generate signed URLs for uploaded files (valid 7 days)
  let fileLinksHtml = "";
  if (d.archivos && d.archivos.length > 0) {
    const links: string[] = [];
    for (const archivo of d.archivos) {
      try {
        const url = await getSignedUrlFromBucket(archivo.path, "candidaturas", 7 * 24 * 3600);
        links.push(`<a href="${url}" style="color:#395D9F;">${archivo.name}</a>`);
      } catch {
        links.push(`${archivo.name} (error al generar enlace)`);
      }
    }
    fileLinksHtml = links.join("<br/>");
  }

  // Staff notification email
  const staffHtml = `
    <h2>Nueva candidatura de profesor/a FLE</h2>
    <table style="border-collapse:collapse; margin:12px 0; font-size:14px;">
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Nombre</td><td style="padding:6px 0;">${d.nombre}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${d.email}" style="color:#E50046;">${d.email}</a></td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Teléfono</td><td style="padding:6px 0;">${d.telefono}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Nivel francés</td><td style="padding:6px 0;">${d.nivelFrances}${d.nivelFrancesOtro ? ` — ${d.nivelFrancesOtro}` : ""}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Titulación</td><td style="padding:6px 0;">${d.titulacion}<br/><em>${d.titulacionDetalle}</em></td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Experiencia</td><td style="padding:6px 0;">${d.experiencia} año${d.experiencia !== 1 ? "s" : ""}</td></tr>
      <tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Disponibilidad</td><td style="padding:6px 0;">${d.disponibilidad} h/semana</td></tr>
      ${d.linkedinUrl ? `<tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">LinkedIn/Portfolio</td><td style="padding:6px 0;"><a href="${d.linkedinUrl}" style="color:#395D9F;">${d.linkedinUrl}</a></td></tr>` : ""}
      ${fileLinksHtml ? `<tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Documentación</td><td style="padding:6px 0;">${fileLinksHtml}</td></tr>` : ""}
      ${d.especialidades && d.especialidades.length > 0 ? `<tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Especialidades</td><td style="padding:6px 0;">${d.especialidades.join(", ")}${d.especialidadOtro ? `, ${d.especialidadOtro}` : ""}</td></tr>` : ""}
      ${d.otrosIdiomas ? `<tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Otros idiomas</td><td style="padding:6px 0;">${d.otrosIdiomas}</td></tr>` : ""}
      ${d.comoNosConociste ? `<tr><td style="padding:6px 16px 6px 0; font-weight:600; color:#5f6b78; vertical-align:top;">Cómo nos conoció</td><td style="padding:6px 0;">${d.comoNosConociste}</td></tr>` : ""}
    </table>
    <h3 style="margin-top:16px;">Carta de motivación</h3>
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; white-space:pre-wrap; font-size:14px; line-height:1.6;">
${d.motivacion}
    </div>
  `;

  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.EMAIL_FROM || "info@holabonjour.es";

  // Ack email to candidate
  const ackHtml = `
    <h2>Hemos recibido tu candidatura</h2>
    <p>Hola ${d.nombre.split(" ")[0]},</p>
    <p>Gracias por tu interés en colaborar con HolaBonjour como profesor/a de FLE.</p>
    <p>Hemos recibido tu candidatura correctamente. Revisaremos tu perfil y nos pondremos en contacto contigo en un plazo de <strong>7 días laborables</strong>.</p>
    <p>Si tienes alguna duda mientras tanto, puedes escribirnos a <a href="mailto:info@holabonjour.es" style="color:#E50046; font-weight:600;">info@holabonjour.es</a> con el asunto "Consulta profesor FLE".</p>
    <p>Un saludo cordial,<br/>Equipo HolaBonjour</p>
  `;

  try {
    // Send both emails in parallel
    await Promise.all([
      sendMail({
        to: staffTo,
        subject,
        html: wrapEmailHtml(staffHtml),
      }),
      sendMail({
        to: d.email,
        subject,
        html: wrapEmailHtml(ackHtml),
      }),
    ]);
  } catch (err) {
    console.error("[colabora] Email send failed:", err);
    return NextResponse.json(
      { ok: false, error: "EMAIL_FAILED", message: "Error al enviar. Inténtalo de nuevo o escríbenos a info@holabonjour.es." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
