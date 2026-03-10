import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { EmailConfig } from "next-auth/providers";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/azure-mail";
import { authConfig } from "@/lib/auth.config";

function AzureEmailProvider(): EmailConfig {
  return {
    id: "email",
    type: "email",
    name: "Email",
    from: process.env.EMAIL_FROM || "HolaBonjour <info@holabonjour.es>",
    maxAge: 10 * 60, // 10 minutes
    async sendVerificationRequest({ identifier: email, url }) {
      const brandUrl = process.env.NEXTAUTH_URL || "https://holabonjour.es";
      try {
        await sendMail({
          to: email,
          subject: "Accede a tu cuenta HolaBonjour",
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
                Si no solicitaste este enlace, puedes ignorar este email.
                El enlace caduca en 10 minutos.
              </p>
              <hr style="margin:24px 0 12px;border:0;border-top:1px solid #e2e8f0;" />
              <p style="color:#94a3b8;font-size:12px;">
                HolaBonjour · Academia de francés online · Málaga ·
                <a href="mailto:info@holabonjour.es" style="color:#E50046;text-decoration:none;">info@holabonjour.es</a>
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
  ...authConfig,
  adapter: PrismaAdapter(prisma) as never,
  providers: [
    // Magic link for students — sent via Azure Graph
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
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const email = (credentials.email as string).toLowerCase().trim();

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) return null;

          const bcrypt = await import("bcryptjs");

          // Primary: hash from DB. Fallback: env var (legacy, remove after backfill).
          let storedHash = user.passwordHash ?? null;
          if (!storedHash) {
            const envKey = `TEACHER_PASSWORD_HASH_${email.split("@")[0].toUpperCase().replace(/[^A-Z]/g, "")}`;
            storedHash = process.env[envKey] ?? null;
          }
          if (!storedHash) {
            console.error(`[auth] No passwordHash for ${email}`);
            return null;
          }

          const valid = await bcrypt.compare(credentials.password as string, storedHash);
          if (!valid) return null;

          return { id: user.id, email: user.email, name: user.name, role: user.role };
        } catch (err) {
          console.error("[auth] authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async redirect({ url, baseUrl }) {
      // Same domain with specific path → respect it (e.g. /zona-profesor)
      if (url.startsWith(baseUrl)) {
        const path = url.replace(baseUrl, "");
        if (path && path !== "/" && !path.startsWith("/iniciar-sesion") && !path.startsWith("/verificar-email")) {
          return url;
        }
      }
      // Relative path with specific destination → respect it
      if (url.startsWith("/") && url !== "/") {
        return `${baseUrl}${url}`;
      }
      // Default fallback → zona-alumno
      return `${baseUrl}/zona-alumno`;
    },
    async signIn({ user }) {
      try {
        if (user.id) {
          const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
          if (dbUser && !dbUser.active) return false;
        }
        return true;
      } catch (err) {
        console.error("[auth] signIn callback error:", err);
        return true;
      }
    },
  },
});
