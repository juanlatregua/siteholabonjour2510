// lib/azure-mail.ts — Send emails via Resend
// Migrated from Azure Graph API to Resend (2026-03-07)
// Interface unchanged: sendMail({ to, subject, html })

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const from = process.env.EMAIL_FROM || "HolaBonjour <info@holabonjour.es>";

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
