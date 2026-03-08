// lib/email.ts — Transactional emails via Microsoft Graph API (Azure AD)
import { sendMail } from "@/lib/azure-mail";

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

export async function sendPaymentConfirmationEmail(data: {
  toEmail: string;
  customerName: string;
  levelRange: string;
  totalEur: string;
}) {
  const subject = `Pago confirmado — Pack clases ${data.levelRange}`;

  const html = `
    <h2>Pago confirmado</h2>
    <p>Hola ${data.customerName},</p>
    <p>Hemos recibido tu pago correctamente.</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Pack</td><td>4 clases de 55 min (${data.levelRange})</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
    </table>
    <p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
      <strong>Política de anulación:</strong> 48h de antelación. Excepción: justificante médico en 24h.
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ir a mi zona de alumno</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendClassReminderEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
  time: string;
  zoomLink?: string;
}) {
  const subject = `Recordatorio: clase de francés mañana ${data.date}`;

  const zoomHtml = data.zoomLink
    ? `<p><a href="${data.zoomLink}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Unirse a la clase por Zoom</a></p>`
    : `<p>Te enviaremos el enlace de Zoom antes de la clase.</p>`;

  const html = `
    <h2>Recordatorio de clase</h2>
    <p>Hola ${data.customerName},</p>
    <p>Tu clase de francés es <strong>mañana</strong>:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Fecha</td><td>${data.date}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Hora</td><td>${data.time}</td></tr>
    </table>
    ${zoomHtml}
    <p style="font-size:13px; color:#6b7280;">Anulación: al menos 48h antes.</p>
    <p>À demain !<br/>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendNewBookingStaffEmail(data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  levelRange: string;
  totalEur: string;
  packId: string;
  zoomJoinUrl?: string;
  zoomStartUrl?: string;
}) {
  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.EMAIL_FROM || "info@holabonjour.es";
  const subject = `Nueva reserva: ${data.customerName} — ${data.levelRange} (${data.totalEur} EUR)`;

  const zoomHtml = data.zoomStartUrl
    ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Zoom (host)</td><td><a href="${data.zoomStartUrl}" style="color:#E50046;">Iniciar reunión</a></td></tr>
       <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Zoom (alumno)</td><td><a href="${data.zoomJoinUrl}" style="color:#395D9F;">${data.zoomJoinUrl}</a></td></tr>`
    : "";

  const html = `
    <h2>Nueva reserva</h2>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${data.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Teléfono</td><td>${data.customerPhone || "-"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.levelRange}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
      ${zoomHtml}
    </table>
    <p><a href="${BRAND_HOME_URL}/zona-profesor" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Abrir zona profesor</a></p>
  `;

  await sendMail({
    to: staffTo,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendManualPaymentPendingEmail(data: {
  customerName: string;
  customerEmail: string;
  method: string;
  reference?: string;
  totalEur: string;
  levelRange: string;
}) {
  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.EMAIL_FROM || "info@holabonjour.es";
  const subject = `Pago manual pendiente: ${data.customerName} — ${data.method} (${data.totalEur} EUR)`;

  const html = `
    <h2>Nuevo pago manual pendiente</h2>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${data.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Método</td><td>${data.method}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Referencia</td><td>${data.reference || "-"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.levelRange}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
    </table>
    <p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
      <strong>Acción requerida:</strong> Confirma el pago desde la zona profesor → Pagos.
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-profesor/pagos" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ir a Pagos</a></p>
  `;

  await sendMail({
    to: staffTo,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendPaymentRejectedEmail(data: {
  toEmail: string;
  customerName: string;
  reason?: string;
}) {
  const subject = "Pago no verificado — HolaBonjour";
  const html = `
    <h2>Pago no verificado</h2>
    <p>Hola ${data.customerName},</p>
    <p>No hemos podido verificar tu pago. ${data.reason || "Por favor, contacta con nosotros para más información."}</p>
    <p><a href="mailto:info@holabonjour.es" style="color:#E50046; font-weight:600;">info@holabonjour.es</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendExamReviewEmail(data: {
  profesorName: string;
  titulo: string;
  nivel: string;
  previewUrl: string;
}) {
  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.EMAIL_FROM || "info@holabonjour.es";
  const subject = `Nuevo modelo de examen para revisión — ${data.nivel} "${data.titulo}"`;

  const html = `
    <h2>Nuevo modelo de examen para revisión</h2>
    <p><strong>${data.profesorName}</strong> ha enviado un modelo de examen para revisión:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Título</td><td>${data.titulo}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.nivel}</td></tr>
    </table>
    <p><a href="${data.previewUrl}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver preview del examen</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: staffTo,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendLateCancellationEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
}) {
  const subject = `Clase anulada fuera de plazo — ${data.date}`;

  const html = `
    <h2>Clase anulada fuera de plazo</h2>
    <p>Hola ${data.customerName},</p>
    <p>La clase del <strong>${data.date}</strong> fue anulada con menos de 48h.</p>
    <p>Se descuenta del bono. Excepción: justificante médico en 24h (responde a este email).</p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}
