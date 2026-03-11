// lib/email.ts — Transactional emails via Microsoft Graph API (Azure AD)
import { sendMail, type MailAttachment } from "@/lib/azure-mail";
import { generateLessonICS } from "@/lib/ics";

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
  lessonScheduledAt?: Date;
  lessonDurationMinutes?: number;
  zoomLink?: string | null;
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

  const attachments: MailAttachment[] = [];
  if (data.lessonScheduledAt) {
    const icsContent = generateLessonICS({
      studentName: data.customerName,
      scheduledAt: data.lessonScheduledAt,
      durationMinutes: data.lessonDurationMinutes || 60,
      zoomLink: data.zoomLink,
    });
    attachments.push({
      name: "clase-holabonjour.ics",
      contentType: "text/calendar",
      contentBytes: Buffer.from(icsContent, "utf-8").toString("base64"),
    });
  }

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
    attachments: attachments.length ? attachments : undefined,
  });
}

export async function sendBookingConfirmationEmail(data: {
  toEmail: string;
  customerName: string;
  teacherName: string;
  date: string;
  time: string;
  durationMinutes: number;
  focus?: string | null;
  zoomLink?: string | null;
  scheduledAt: Date;
}) {
  const subject = `Clase confirmada — ${data.date} a las ${data.time}`;

  const zoomHtml = data.zoomLink
    ? `<p><a href="${data.zoomLink}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Unirse a Zoom</a></p>`
    : `<p style="font-size:13px; color:#5f6b78;">Te enviaremos el enlace de Zoom antes de la clase.</p>`;

  const focusHtml = data.focus
    ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Tema</td><td>${data.focus}</td></tr>`
    : "";

  const html = `
    <h2>Clase confirmada</h2>
    <p>Hola ${data.customerName},</p>
    <p>Tu clase de francés ha sido confirmada:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Fecha</td><td>${data.date}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Hora</td><td>${data.time}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Duración</td><td>${data.durationMinutes} min</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Profesor</td><td>${data.teacherName}</td></tr>
      ${focusHtml}
    </table>
    ${zoomHtml}
    <p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
      <strong>Política de anulación:</strong> 48h de antelación. Excepción: justificante médico en 24h.
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/clases" style="display:inline-block; background:#395D9F; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver mi clase</a></p>
    <p>À bientôt !<br/>Equipo HolaBonjour</p>
  `;

  const icsContent = generateLessonICS({
    studentName: data.customerName,
    scheduledAt: data.scheduledAt,
    durationMinutes: data.durationMinutes,
    zoomLink: data.zoomLink,
  });
  const attachments: MailAttachment[] = [
    {
      name: "clase-holabonjour.ics",
      contentType: "text/calendar",
      contentBytes: Buffer.from(icsContent, "utf-8").toString("base64"),
    },
  ];

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
    attachments,
  });
}

export async function sendNewLessonTeacherEmail(data: {
  toEmail: string;
  teacherName: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string | null;
  levelRange: string;
  hoursRemaining: number;
  date: string;
  time: string;
  durationMinutes: number;
  focus?: string | null;
  zoomStartUrl?: string | null;
  zoomJoinUrl?: string | null;
  scheduledAt: Date;
}) {
  const subject = `Nueva reserva — ${data.studentName} — ${data.date} a las ${data.time}`;

  const focusHtml = data.focus
    ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Tema</td><td>${data.focus}</td></tr>`
    : "";

  const zoomHtml = data.zoomStartUrl
    ? `<p><a href="${data.zoomStartUrl}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Iniciar clase</a></p>`
    : "";

  const html = `
    <h2>Nueva reserva</h2>
    <p>Hola ${data.teacherName.split(" ")[0]},</p>
    <p>Tienes una nueva clase programada:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.studentName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Email</td><td>${data.studentEmail}</td></tr>
      ${data.studentPhone ? `<tr><td style="padding:4px 12px 4px 0; font-weight:600;">Teléfono</td><td>${data.studentPhone}</td></tr>` : ""}
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Pack</td><td>${data.levelRange}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Horas restantes</td><td>${data.hoursRemaining}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Fecha</td><td>${data.date}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Hora</td><td>${data.time}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Duración</td><td>${data.durationMinutes} min</td></tr>
      ${focusHtml}
    </table>
    ${zoomHtml}
    <p><a href="${BRAND_HOME_URL}/zona-profesor/clases" style="display:inline-block; background:#395D9F; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver en mi zona</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  const icsContent = generateLessonICS({
    studentName: data.studentName,
    scheduledAt: data.scheduledAt,
    durationMinutes: data.durationMinutes,
    zoomLink: data.zoomJoinUrl,
  });
  const attachments: MailAttachment[] = [
    {
      name: "clase-holabonjour.ics",
      contentType: "text/calendar",
      contentBytes: Buffer.from(icsContent, "utf-8").toString("base64"),
    },
  ];

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
    attachments,
  });
}

export async function sendClassReminderEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
  time: string;
  zoomLink?: string;
  scheduledAt?: Date;
  durationMinutes?: number;
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
    <p style="font-size:13px; color:#5f6b78;">Anulación: al menos 48h antes.</p>
    <p>À demain !<br/>Equipo HolaBonjour</p>
  `;

  const attachments: MailAttachment[] = [];
  if (data.scheduledAt) {
    const icsContent = generateLessonICS({
      studentName: data.customerName,
      scheduledAt: data.scheduledAt,
      durationMinutes: data.durationMinutes || 60,
      zoomLink: data.zoomLink,
    });
    attachments.push({
      name: "clase-holabonjour.ics",
      contentType: "text/calendar",
      contentBytes: Buffer.from(icsContent, "utf-8").toString("base64"),
    });
  }

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
    attachments: attachments.length ? attachments : undefined,
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

export async function sendExamFollowupEmail(data: {
  toEmail: string;
  customerName: string;
  nivel: string;
  totalScore: number;
  passed: boolean;
  probabilityOfPassing?: number;
  personalizedMessage?: string;
  recommendedAction?: string;
  studyPlan?: string[];
}) {
  const diploma = ["C1", "C2"].includes(data.nivel) ? "DALF" : "DELF";
  const subject = `Tes résultats ${diploma} ${data.nivel} — prochaines étapes`;

  const badge = data.passed
    ? '<span style="display:inline-block; background:#ecfdf5; color:#0E9F6E; border:1px solid #a7f3d0; border-radius:20px; padding:4px 14px; font-size:13px; font-weight:700;">DIPLÔME OBTENU</span>'
    : '<span style="display:inline-block; background:rgba(229,0,70,0.06); color:#E50046; border:1px solid rgba(229,0,70,0.2); border-radius:20px; padding:4px 14px; font-size:13px; font-weight:700;">NON OBTENU</span>';

  const aiSection = data.probabilityOfPassing !== undefined
    ? `
      <div style="margin:16px 0; padding:12px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px;">
        <p style="margin:0 0 8px 0; font-weight:600; color:#1e2d4a;">Probabilité de réussite : ${data.probabilityOfPassing}%</p>
        ${data.personalizedMessage ? `<p style="margin:0; font-style:italic; color:#4a5568;">${data.personalizedMessage}</p>` : ""}
      </div>
      ${data.studyPlan?.length ? `
        <div style="margin:16px 0;">
          <p style="font-weight:600; color:#1e2d4a; margin:0 0 8px 0;">Plan d'étude recommandé :</p>
          <ol style="margin:0; padding-left:20px; color:#4a5568; font-size:14px; line-height:1.6;">
            ${data.studyPlan.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      ` : ""}
    `
    : "";

  let ctaHtml: string;
  if (!data.passed && (data.recommendedAction === "diagnostic" || (data.probabilityOfPassing !== undefined && data.probabilityOfPassing < 40))) {
    ctaHtml = `<p><a href="${BRAND_HOME_URL}/contratar?producto=diagnostico&nivel=${data.nivel}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Réserver une session diagnostic — 25 €</a></p>`;
  } else if (!data.passed) {
    ctaHtml = `<p><a href="${BRAND_HOME_URL}/contratar?nivel=${data.nivel}" style="display:inline-block; background:#395D9F; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Voir les packs de préparation</a></p>`;
  } else {
    ctaHtml = `<p><a href="${BRAND_HOME_URL}/correccion-ia" style="display:inline-block; background:#0E9F6E; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Perfectionner avec la correction IA</a></p>`;
  }

  const html = `
    <h2>Tes résultats ${diploma} ${data.nivel}</h2>
    <p>Bonjour ${data.customerName},</p>
    <p>Voici le résumé de ton simulacre :</p>
    <div style="text-align:center; margin:16px 0;">
      <span style="font-size:32px; font-weight:700; color:${data.passed ? "#0E9F6E" : "#E50046"};">${data.totalScore}</span>
      <span style="font-size:16px; color:#5f6b78;"> / 100</span>
      <br/>${badge}
    </div>
    ${aiSection}
    ${ctaHtml}
    <p style="margin-top:16px;"><a href="${BRAND_HOME_URL}/examenes" style="color:#395D9F; font-size:13px; text-decoration:none;">Réessayer le simulacre →</a></p>
    <p>Bon courage !<br/>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendInvoiceEmail(data: {
  toEmail: string;
  customerName: string;
  concept: string;
  totalEur: string;
  invoiceNumber: string;
  pdfBuffer: Buffer;
}) {
  const subject = `Tu recibo de HolaBonjour — ${data.concept}`;

  const html = `
    <h2>Tu recibo</h2>
    <p>Hola ${data.customerName},</p>
    <p>Adjuntamos el recibo de tu compra:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Concepto</td><td>${data.concept}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Importe</td><td>${data.totalEur} EUR</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Recibo</td><td>${data.invoiceNumber}</td></tr>
    </table>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/pagos" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver mis pagos</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  const attachments: MailAttachment[] = [
    {
      name: `recibo-${data.invoiceNumber}.pdf`,
      contentType: "application/pdf",
      contentBytes: data.pdfBuffer.toString("base64"),
    },
  ];

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
    attachments,
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

export async function sendClassReminderTeacherEmail(data: {
  toEmail: string;
  teacherName: string;
  studentName: string;
  date: string;
  time: string;
  zoomStartUrl?: string | null;
}) {
  const subject = `Mañana: clase con ${data.studentName} a las ${data.time}`;

  const zoomHtml = data.zoomStartUrl
    ? `<p><a href="${data.zoomStartUrl}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Iniciar clase</a></p>`
    : "";

  const html = `
    <h2>Recordatorio de clase</h2>
    <p>Hola ${data.teacherName.split(" ")[0]},</p>
    <p>Tienes una clase <strong>mañana</strong>:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Alumno</td><td>${data.studentName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Fecha</td><td>${data.date}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Hora</td><td>${data.time}</td></tr>
    </table>
    ${zoomHtml}
    <p><a href="${BRAND_HOME_URL}/zona-profesor/clases" style="display:inline-block; background:#395D9F; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver en mi zona</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendCancellationRequestStudentEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
  isLate: boolean;
}) {
  const subject = `Solicitud de cancelación enviada — ${data.date}`;

  const lateWarning = data.isLate
    ? `<p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
        <strong>Atención:</strong> Según la política de cancelación (48h), la hora se descontará del pack salvo justificante médico en 24h.
      </p>`
    : "";

  const html = `
    <h2>Solicitud de cancelación enviada</h2>
    <p>Hola ${data.customerName},</p>
    <p>Hemos enviado tu solicitud de cancelación para la clase del <strong>${data.date}</strong> al profesor.</p>
    <p>Te informaremos cuando el profesor confirme la cancelación.</p>
    ${lateWarning}
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendCancellationRequestTeacherEmail(data: {
  toEmail: string;
  teacherName: string;
  studentName: string;
  date: string;
  time: string;
  isLate: boolean;
  lessonId: string;
}) {
  const subject = `Solicitud de cancelación — ${data.studentName} — ${data.date} a las ${data.time}`;

  const policyNote = data.isLate
    ? `<p style="padding:10px; background:#fef3c7; border:1px solid #fbbf24; border-radius:8px; font-size:13px;">
        <strong>Cancelación con menos de 48h.</strong> Según la política, la hora se descuenta del pack. Puedes devolverla si lo consideras oportuno.
      </p>`
    : `<p style="padding:10px; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; font-size:13px;">
        El alumno solicita cancelar con más de 48h. Si cancelas, la hora se devuelve al pack.
      </p>`;

  const html = `
    <h2>Solicitud de cancelación</h2>
    <p>Hola ${data.teacherName.split(" ")[0]},</p>
    <p><strong>${data.studentName}</strong> solicita cancelar su clase:</p>
    <table style="border-collapse:collapse; margin:12px 0;">
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Fecha</td><td>${data.date}</td></tr>
      <tr><td style="padding:4px 12px 4px 0; font-weight:600;">Hora</td><td>${data.time}</td></tr>
    </table>
    ${policyNote}
    <p><a href="${BRAND_HOME_URL}/zona-profesor/clases/${data.lessonId}" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Gestionar en mi zona</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendCancellationConfirmedEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
  hoursRemaining: number;
}) {
  const subject = `Clase cancelada — hora devuelta a tu pack`;

  const html = `
    <h2>Clase cancelada</h2>
    <p>Hola ${data.customerName},</p>
    <p>La clase del <strong>${data.date}</strong> ha sido cancelada. La hora ha sido devuelta a tu pack.</p>
    <p style="padding:10px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; font-size:13px;">
      <strong>Horas restantes en tu pack:</strong> ${data.hoursRemaining}
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/reservar" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Reservar otra clase</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendPostClassEmail(data: {
  toEmail: string;
  customerName: string;
  recordingUrl?: string;
  hoursRemaining?: number | null;
}) {
  const subject = "Merci pour ta classe ! — HolaBonjour";

  const recordingHtml = data.recordingUrl
    ? `<p><a href="${data.recordingUrl}" style="display:inline-block; background:#7c3aed; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver grabación de la clase</a></p>`
    : `<p style="font-size:13px; color:#5f6b78;">La grabación estará disponible pronto. Te enviaremos un email cuando esté lista.</p>`;

  const hoursHtml = data.hoursRemaining != null
    ? `<p style="padding:10px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; font-size:13px;">
        <strong>Horas restantes en tu pack:</strong> ${data.hoursRemaining}
      </p>`
    : "";

  const html = `
    <h2>Merci pour ta classe !</h2>
    <p>Hola ${data.customerName},</p>
    <p>Gracias por tu clase de hoy. Esperamos que haya sido productiva.</p>
    ${recordingHtml}
    ${hoursHtml}
    <p><a href="${BRAND_HOME_URL}/zona-alumno/reservar" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Reservar siguiente clase</a></p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/recursos" style="color:#395D9F; font-size:13px; text-decoration:none;">Ver materiales y recursos</a></p>
    <p>À bientôt !<br/>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendRecordingReadyEmail(data: {
  toEmail: string;
  customerName: string;
  recordingUrl: string;
}) {
  const subject = "Tu grabación está lista — HolaBonjour";

  const html = `
    <h2>Tu grabación está lista</h2>
    <p>Hola ${data.customerName},</p>
    <p>La grabación de tu clase ya está disponible:</p>
    <p><a href="${data.recordingUrl}" style="display:inline-block; background:#7c3aed; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver grabación</a></p>
    <p style="font-size:13px; color:#5f6b78;">También puedes acceder desde tu zona de alumno.</p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendCancellationRejectedEmail(data: {
  toEmail: string;
  customerName: string;
  date: string;
}) {
  const subject = "Solicitud de cancelación rechazada — HolaBonjour";

  const html = `
    <h2>Solicitud de cancelación rechazada</h2>
    <p>Hola ${data.customerName},</p>
    <p>Tu profesor ha revisado tu solicitud de cancelación para la clase del <strong>${data.date}</strong> y ha decidido mantener la clase programada.</p>
    <p>Si tienes alguna duda, no dudes en ponerte en contacto con nosotros.</p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/clases" style="display:inline-block; background:#395D9F; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Ver mis clases</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}

export async function sendHoursReturnedEmail(data: {
  toEmail: string;
  customerName: string;
  hours: number;
  motivo: string;
  hoursRemaining: number;
}) {
  const subject = "Hora(s) devuelta(s) a tu pack — HolaBonjour";

  const html = `
    <h2>Hora(s) devuelta(s)</h2>
    <p>Hola ${data.customerName},</p>
    <p>Tu profesor te ha devuelto <strong>${data.hours} hora(s)</strong> a tu pack.</p>
    <p><strong>Motivo:</strong> ${data.motivo}</p>
    <p style="padding:10px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; font-size:13px;">
      <strong>Horas restantes en tu pack:</strong> ${data.hoursRemaining}
    </p>
    <p><a href="${BRAND_HOME_URL}/zona-alumno/reservar" style="display:inline-block; background:#E50046; color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Reservar clase</a></p>
    <p>Equipo HolaBonjour</p>
  `;

  await sendMail({
    to: data.toEmail,
    subject,
    html: wrapEmailHtml(html),
  });
}
