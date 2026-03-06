import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { EmailConfig } from "next-auth/providers";
import { prisma } from "@/lib/prisma";
import { TEACHER_EMAILS } from "@/lib/constants";
import { sendMail } from "@/lib/azure-mail";

// Custom email provider using Azure Graph (no nodemailer dependency)
function AzureEmailProvider(): EmailConfig {
  return {
    id: "email",
    type: "email",
    name: "Email",
    from: process.env.EMAIL_FROM || "HolaBonjour <hola@holabonjour.es>",
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest({ identifier: email, url }) {
      const brandUrl = process.env.NEXTAUTH_URL || "https://holabonjour.es";
      try {
        await sendMail({
          to: email,
          subject: "Accede a HolaBonjour — Tu enlace de acceso",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
              <div style="margin-bottom:16px;">
                <a href="${brandUrl}" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
                  <strong style="font-size:20px;color:#395D9F;">HolaBonjour</strong>
                </a>
              </div>
              <h2 style="color:#1e2d4a;margin-bottom:8px;">Tu enlace de acceso</h2>
              <p style="color:#334155;font-size:15px;line-height:1.5;">
                Haz clic en el siguiente botón para acceder a tu cuenta:
              </p>
              <p style="margin:24px 0;">
                <a href="${url}" style="display:inline-block;background:#E50046;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                  Acceder a mi cuenta
                </a>
              </p>
              <p style="color:#64748b;font-size:13px;line-height:1.4;">
                Si no solicitaste este enlace, puedes ignorar este email. El enlace caduca en 24 horas.
              </p>
              <hr style="margin:24px 0 12px;border:0;border-top:1px solid #e2e8f0;" />
              <p style="color:#94a3b8;font-size:12px;">
                HolaBonjour · Academia de francés online · Málaga ·
                <a href="mailto:hola@holabonjour.es" style="color:#E50046;text-decoration:none;">hola@holabonjour.es</a>
              </p>
            </div>
          `,
        });
      } catch (err) {
        console.error("[auth] sendVerificationRequest FAILED:", err);
        throw err;
      }
    },
    options: {},
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as never,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/iniciar-sesion",
    verifyRequest: "/verificar-email",
    error: "/error",
  },
  providers: [
    // Magic link for students — sent via Azure Graph (no SMTP/nodemailer)
    AzureEmailProvider(),
    // Password credentials for teachers only
    Credentials({
      id: "teacher-credentials",
      name: "Acceso docente",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase().trim();
        if (!TEACHER_EMAILS.includes(email as typeof TEACHER_EMAILS[number])) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) return null;

        const bcrypt = await import("bcryptjs");
        const envKey = `TEACHER_PASSWORD_HASH_${email.split("@")[0].toUpperCase().replace(/[^A-Z]/g, "")}`;
        const storedHash = process.env[envKey];
        if (!storedHash) return null;

        const valid = await bcrypt.compare(credentials.password as string, storedHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id!;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.userId;
      }
      return session;
    },
    async signIn({ user }) {
      if (user.id) {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (dbUser && !dbUser.active) return false;
      }
      return true;
    },
  },
});
