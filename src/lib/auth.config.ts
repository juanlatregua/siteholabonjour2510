// auth.config.ts — Edge-compatible auth config (no Prisma, no Node.js deps)
// Shared between middleware and full auth.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/iniciar-sesion",
    verifyRequest: "/verificar-email",
    error: "/error",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "STUDENT";
        token.userId = user.id!;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role: string }).role = token.role as string;
        (session.user as { id: string }).id = token.userId as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
