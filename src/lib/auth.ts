import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { prisma } from "@/lib/prisma";
import { TEACHER_EMAILS } from "@/lib/constants";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as never,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/iniciar-sesion",
    verifyRequest: "/verificar-email",
    error: "/error",
  },
  providers: [
    // Magic link for students (and teachers)
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT || 465),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "HolaBonjour <noreply@holabonjour.es>",
    }),
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
