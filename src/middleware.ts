import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/",
  "/prueba-nivel",
  "/preparacion-delf-dalf",
  "/contratar",
  "/contact",
  "/courses",
  "/home",
  "/home-legacy",
  "/test",
  "/test-de-nivel",
  "/contacto",
  "/cursos",
  "/empresas",
  "/opiniones",
  "/preguntas-frecuentes",
  "/aviso-legal",
  "/politica-de-privacidad",
  "/politica-de-cookies",
  "/recursos",
  "/le-marche",
  "/la-carte",
  "/le-cinema",
  "/la-cuisine",
  "/le-mot-du-jour",
  "/le-jeu",
  "/tarifas",
  "/frances-empresas",
  "/blog",
  "/sobre-nosotros",
];

const AUTH_PATHS = ["/iniciar-sesion", "/verificar-email", "/error"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public pages, static files, API auth routes, and assessment API
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    AUTH_PATHS.some((p) => pathname === p) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/assessments") ||
    pathname.startsWith("/api/leads") ||
    pathname.startsWith("/api/le-marche") ||
    pathname.startsWith("/api/le-mot-du-jour") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect unauthenticated users
  if (!token) {
    const signInUrl = new URL("/iniciar-sesion", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Teacher zone: must be TEACHER or ADMIN
  if (
    pathname.startsWith("/zona-profesor") ||
    pathname.startsWith("/api/zona-profesor")
  ) {
    if (token.role !== "TEACHER" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
