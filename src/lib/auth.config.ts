// auth.config.ts — Edge-compatible auth config (no Prisma, no Node.js deps)
// Used by middleware to verify JWT sessions without importing the DB adapter.
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
    authorized({ auth, request: { nextUrl } }) {
      // This callback is used by the middleware auth() wrapper
      // Return true to allow, false to redirect to signIn
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Public paths — always allow
      const publicPaths = [
        "/", "/prueba-nivel", "/preparacion-delf-dalf", "/contratar",
        "/contact", "/courses", "/home", "/home-legacy", "/test",
        "/test-de-nivel", "/contacto", "/cursos", "/empresas",
        "/opiniones", "/preguntas-frecuentes", "/aviso-legal",
        "/politica-de-privacidad", "/politica-de-cookies", "/recursos",
        "/le-marche", "/la-carte", "/le-cinema", "/la-cuisine",
        "/le-mot-du-jour", "/le-jeu", "/tarifas", "/frances-empresas",
        "/blog", "/sobre-nosotros", "/correccion-ia", "/examen-delf-a1",
        "/examen-delf-a2", "/examenes", "/calendario-examenes",
        "/preparateurs", "/unirse",
      ];
      if (publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
        return true;
      }

      // API routes that are public
      if (
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/api/assessments") ||
        pathname.startsWith("/api/leads") ||
        pathname.startsWith("/api/le-marche") ||
        pathname.startsWith("/api/le-mot-du-jour") ||
        pathname.startsWith("/api/corrections") ||
        pathname.startsWith("/api/exams") ||
        pathname.startsWith("/api/examenes") ||
        pathname.startsWith("/api/debug") ||
        pathname.startsWith("/api/public") ||
        pathname.startsWith("/api/webhook") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/assets") ||
        pathname.includes(".")
      ) {
        return true;
      }

      // Auth pages
      const authPaths = ["/iniciar-sesion", "/verificar-email", "/error"];
      if (authPaths.some((p) => pathname === p)) {
        // Logged-in user on auth page → redirect to zone
        if (isLoggedIn) {
          const role = (auth?.user as { role?: string })?.role;
          const dest = role === "TEACHER" || role === "ADMIN"
            ? "/zona-profesor" : "/zona-alumno";
          return Response.redirect(new URL(dest, nextUrl));
        }
        return true; // allow auth page for unauthenticated
      }

      // Protected routes require login
      return isLoggedIn;
    },
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
  providers: [], // Providers added in full auth.ts
} satisfies NextAuthConfig;
