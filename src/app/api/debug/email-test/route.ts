import { NextResponse } from "next/server";
import { sendMail } from "@/lib/azure-mail";

// GET /api/debug/email-test?to=your@email.com
// Quick diagnostic to check if Resend email is working
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to");

  if (!to) {
    return NextResponse.json({ error: "Falta ?to=email" }, { status: 400 });
  }

  const env = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM || "(not set)",
  };

  try {
    await sendMail({
      to,
      subject: "HolaBonjour — Test de email",
      html: "<p>Si ves este email, Resend funciona correctamente.</p>",
    });
    return NextResponse.json({ ok: true, env, message: `Email enviado a ${to}` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, env, error: message }, { status: 500 });
  }
}
