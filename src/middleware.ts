import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const PUBLIC_PATHS = [
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

const AUTH_PATHS = ["/iniciar-sesion", "/verificar-email", "/error"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Public pages, static files, public APIs → allow
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
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
    pathname.startsWith("/api/booking") ||
    pathname.startsWith("/api/webhook") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string })?.role;

  // Auth pages
  if (AUTH_PATHS.some((p) => pathname === p)) {
    if (isLoggedIn) {
      const dest = role === "TEACHER" || role === "ADMIN"
        ? "/zona-profesor" : "/zona-alumno";
      return NextResponse.redirect(new URL(dest, req.nextUrl));
    }
    return NextResponse.next();
  }

  // Not logged in → redirect to login
  if (!isLoggedIn) {
    const signInUrl = new URL("/iniciar-sesion", req.nextUrl);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Teacher zone: must be TEACHER or ADMIN
  if (pathname.startsWith("/zona-profesor") || pathname.startsWith("/api/zona-profesor")) {
    if (role !== "TEACHER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/zona-alumno", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
