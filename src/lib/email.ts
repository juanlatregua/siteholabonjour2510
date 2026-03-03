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
          <a href="mailto:info@holabonjour.es" style="color:#2563eb; text-decoration:none;">info@holabonjour.es</a>
        </p>
      </div>
    </div>
  `;
}

function getEmailConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) throw new Error("Missing SENDGRID_API_KEY");
  const from = process.env.SENDGRID_FROM;
  if (!from) throw new Error("Missing SENDGRID_FROM");
  sgMail.setApiKey(apiKey);
  return { from };
}

export async function sendBookingConfirmationEmail(data: {
  toEmail: string;
  customerName: string;
  level: string;
  sessions: number;
  totalEur: string;
  bookingId: string;
}) {
  const { from } = getEmailConfig();

  const subject = `Reserva confirmada — Pack ${data.sessions} clases ${data.level}`;

  const text = `Hola ${data.customerName},

Tu reserva ha sido confirmada.

Nivel: ${data.level}
Pack: ${data.sessions} clases de 55 min por Zoom
Importe: ${data.totalEur} EUR

Recibirás los datos de acceso a Zoom por email antes de tu primera clase.

Recuerda: las clases se anulan con 48h de antelación. Si no, se descuenta del bono (salvo justificante médico en 24h).

Consulta tu zona de alumno: ${BRAND_HOME_URL}/zona-alumno

Gracias,
Equipo HolaBonjour`;

  const html = `
    <h2>Reserva confirmada</h2>
    <p>Hola ${data.customerName},</p>
    <p>Tu reserva ha sido confirmada. Aquí tienes el resumen:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.level}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Pack</td><td>${data.sessions} clases de 55 min por Zoom</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
    </table>
    <p>Recibirás los datos de acceso a Zoom por email antes de tu primera clase.</p>
    <p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
      <strong>Política de anulación:</strong> Las clases se anulan con al menos 48h de antelación.
      Si no se anula a tiempo, la clase se descuenta del bono. Excepción: justificante médico presentado en las 24h siguientes.
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno" style="display:inline-block; background:#2563eb; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ir a mi zona de alumno</a></p>
    <p>Gracias por confiar en nosotros.<br/>Equipo HolaBonjour</p>
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

export async function sendPaymentConfirmationEmail(data: {
  toEmail: string;
  customerName: string;
  level: string;
  totalEur: string;
  bookingId: string;
}) {
  const { from } = getEmailConfig();

  const subject = `Pago confirmado — Pack clases ${data.level}`;

  const text = `Hola ${data.customerName},

Hemos recibido tu pago correctamente.

Nivel: ${data.level}
Importe: ${data.totalEur} EUR

Consulta tu zona de alumno: ${BRAND_HOME_URL}/zona-alumno

Gracias,
Equipo HolaBonjour`;

  const html = `
    <h2>Pago confirmado</h2>
    <p>Hola ${data.customerName},</p>
    <p>Hemos recibido tu pago correctamente.</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.level}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
    </table>
    <p><a href="${BRAND_HOME_URL}/zona-alumno" style="display:inline-block; background:#059669; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ir a mi zona de alumno</a></p>
    <p>Gracias por confiar en nosotros.<br/>Equipo HolaBonjour</p>
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

  const zoomLine = data.zoomLink
    ? `Enlace Zoom: ${data.zoomLink}`
    : "Te enviaremos el enlace de Zoom antes de la clase.";

  const text = `Hola ${data.customerName},

Recordatorio: tu clase de francés es mañana.

Fecha: ${data.date}
Hora: ${data.time}
${zoomLine}

Recuerda: si necesitas anular, hazlo con al menos 48h de antelación.

Gracias,
Equipo HolaBonjour`;

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
    <p style="font-size:13px; color:#6b7280;">Recuerda: si necesitas anular, hazlo con al menos 48h de antelación.</p>
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
  level: string;
  totalEur: string;
  bookingId: string;
}) {
  const { from } = getEmailConfig();

  const staffTo = process.env.STAFF_NOTIFICATION_TO || process.env.SENDGRID_FROM;
  if (!staffTo) throw new Error("Missing STAFF_NOTIFICATION_TO");

  const subject = `Nueva reserva: ${data.customerName} — ${data.level} (${data.totalEur} EUR)`;

  const text = `Nueva reserva desde la web.

Alumno: ${data.customerName}
Email: ${data.customerEmail}
Teléfono: ${data.customerPhone || "-"}
Nivel: ${data.level}
Importe: ${data.totalEur} EUR
Booking ID: ${data.bookingId}

Gestionar en zona profesor: ${BRAND_HOME_URL}/zona-profesor`;

  const html = `
    <h2>Nueva reserva</h2>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${data.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Teléfono</td><td>${data.customerPhone || "-"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Nivel</td><td>${data.level}</td></tr>
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

  const text = `Hola ${data.customerName},

La clase del ${data.date} ha sido anulada con menos de 48h de antelación.

Según nuestra política, la clase se descuenta del bono.

Excepción: si presentas un justificante médico en las 24h siguientes, la clase no se descontará.

Puedes enviarlo respondiendo a este email.

Equipo HolaBonjour`;

  const html = `
    <h2>Clase anulada fuera de plazo</h2>
    <p>Hola ${data.customerName},</p>
    <p>La clase del <strong>${data.date}</strong> ha sido anulada con menos de 48h de antelación.</p>
    <p>Según nuestra política, la clase se descuenta del bono.</p>
    <p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
      <strong>Excepción:</strong> Si presentas un justificante médico en las 24h siguientes, la clase no se descontará.
      Puedes enviarlo respondiendo a este email.
    </p>
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
