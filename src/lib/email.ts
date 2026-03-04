// lib/email.ts — Emails transaccionales HolaBonjour via SendGrid
import sgMail from "@sendgrid/mail";

const NO_CLICK_TRACKING = {
  clickTracking: { enable: false, enableText: false },
};

const BRAND_HOME_URL = "https://www.holabonjour.es";

function wrapEmailHtml(content: string) {
  return `
    <div style="background:#f8fafc; padding:24px 12px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:22px;">
        <div style="margin-bottom:14px;">
          <a href="${BRAND_HOME_URL}" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
            <strong style="font-size:20px; color:#1e40af;">HolaBonjour</strong>
          </a>
        </div>
        <div style="font-family:Arial, sans-serif; color:#0f172a; font-size:15px; line-height:1.45;">
          ${content}
        </div>
        <hr style="margin:18px 0 12px 0; border:0; border-top:1px solid #e2e8f0;" />
        <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#64748b;">
          HolaBonjour · Academia de francés online · Málaga ·
          <a href="mailto:hola@holabonjour.es" style="color:#2563eb; text-decoration:none;">hola@holabonjour.es</a>
        </p>
      </div>
    </div>
  `;
}

function getEmailConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error("Missing SENDGRID_API_KEY");
  const from = process.env.SENDGRID_FROM || process.env.EMAIL_FROM || "hola@holabonjour.es";
  sgMail.setApiKey(apiKey);
  return { from };
}

export async function sendPaymentConfirmationEmail(data: {
  toEmail: string;
  customerName: string;
  levelRange: string;
  totalEur: string;
}) {
  const { from } = getEmailConfig();
  const subject = `Pago confirmado — Pack clases ${data.levelRange}`;

  const text = `Hola ${data.customerName},\n\nPago de ${data.totalEur} EUR confirmado.\nPack: 4 clases de 55 min (${data.levelRange}) por Zoom.\n\nAccede a tu zona de alumno: ${BRAND_HOME_URL}/zona-alumno\n\nEquipo HolaBonjour`;

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
    <p><a href="${BRAND_HOME_URL}/zona-alumno" style="display:inline-block; background:#2563eb; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ir a mi zona de alumno</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sgMail.send({
    trackingSettings: NO_CLICK_TRACKING,
    to: data.toEmail,
    from: { email: from, name: "HolaBonjour" },
    subject,
    text,
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
  const { from } = getEmailConfig();
  const subject = `Recordatorio: clase de francés mañana ${data.date}`;

  const zoomLine = data.zoomLink ? `Enlace Zoom: ${data.zoomLink}` : "Te enviaremos el enlace de Zoom antes de la clase.";
  const text = `Hola ${data.customerName},\n\nRecordatorio: tu clase es mañana ${data.date} a las ${data.time}.\n${zoomLine}\n\nAnulación: 48h antes.\n\nÀ demain !\nEquipo HolaBonjour`;

  const zoomHtml = data.zoomLink
    ? `<p><a href="${data.zoomLink}" style="display:inline-block; background:#2563eb; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Unirse a la clase por Zoom</a></p>`
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

  await sgMail.send({
    trackingSettings: NO_CLICK_TRACKING,
    to: data.toEmail,
    from: { email: from, name: "HolaBonjour" },
    subject,
    text,
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
}) {
  const { from } = getEmailConfig();
  const staffTo = process.env.STAFF_NOTIFICATION_TO || from;
  const subject = `Nueva reserva: ${data.customerName} — ${data.levelRange} (${data.totalEur} EUR)`;

  const text = `Nueva reserva.\n\nAlumno: ${data.customerName}\nEmail: ${data.customerEmail}\nTeléfono: ${data.customerPhone || "-"}\nNivel: ${data.levelRange}\nImporte: ${data.totalEur} EUR\nPack ID: ${data.packId}`;

  const html = `
    <h2>Nueva reserva</h2>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${data.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Teléfono</td><td>${data.customerPhone || "-"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.levelRange}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
    </table>
    <p><a href="${BRAND_HOME_URL}/zona-profesor" style="display:inline-block; background:#2563eb; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Abrir zona profesor</a></p>
  `;

  await sgMail.send({
    trackingSettings: NO_CLICK_TRACKING,
    to: staffTo,
    from: { email: from, name: "HolaBonjour" },
    subject,
    text,
    html,
  });
}

export async function sendLateCancellationEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
}) {
  const { from } = getEmailConfig();
  const subject = `Clase anulada fuera de plazo — ${data.date}`;

  const text = `Hola ${data.customerName},\n\nLa clase del ${data.date} fue anulada con menos de 48h. Se descuenta del bono.\nExcepción: justificante médico en 24h.\n\nEquipo HolaBonjour`;

  const html = `
    <h2>Clase anulada fuera de plazo</h2>
    <p>Hola ${data.customerName},</p>
    <p>La clase del <strong>${data.date}</strong> fue anulada con menos de 48h.</p>
    <p>Se descuenta del bono. Excepción: justificante médico en 24h (responde a este email).</p>
    <p>Equipo HolaBonjour</p>
  `;

  await sgMail.send({
    trackingSettings: NO_CLICK_TRACKING,
    to: data.toEmail,
    from: { email: from, name: "HolaBonjour" },
    subject,
    text,
    html: wrapEmailHtml(html),
  });
}
