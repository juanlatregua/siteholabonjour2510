import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken, decode } from "next-auth/jwt";
import { auth } from "@/lib/auth";

// GET /api/debug/auth-check
// Diagnostic to check auth system health
export async function GET(req: Request) {
  const checks: Record<string, unknown> = {};

  // 1. Env vars present
  checks.env = {
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_SECRET_LENGTH: process.env.NEXTAUTH_SECRET?.length,
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "(not set)",
    DATABASE_URL: !!process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: !!process.env.VERCEL,
  };

  // 2. Database connection
  try {
    const userCount = await prisma.user.count();
    checks.database = { ok: true, userCount };
  } catch (err: unknown) {
    checks.database = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  // 3. Verification tokens in DB
  try {
    const tokenCount = await prisma.verificationToken.count();
    const latest = await prisma.verificationToken.findFirst({
      orderBy: { expires: "desc" },
      select: { identifier: true, expires: true },
    });
    checks.verificationTokens = { count: tokenCount, latest };
  } catch (err: unknown) {
    checks.verificationTokens = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  // 4. auth() — the official NextAuth v5 session check
  try {
    const session = await auth();
    checks.authSession = session
      ? { ok: true, user: session.user }
      : { ok: false, session: null };
  } catch (err: unknown) {
    checks.authSession = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  // 5. getToken() — manual JWT decode
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  try {
    const token = await getToken({ req: req as never, secret });
    checks.getToken = token
      ? { ok: true, role: token.role, userId: token.userId, email: token.email }
      : { ok: false, returned: null };
  } catch (err: unknown) {
    checks.getToken = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  // 6. Manual JWT decode — try both secure and non-secure cookie names
  const cookieHeader = req.headers.get("cookie") || "";
  const cookieMap: Record<string, string> = {};
  cookieHeader.split(";").forEach((c) => {
    const [name, ...rest] = c.trim().split("=");
    if (name) cookieMap[name] = rest.join("=");
  });

  const secureCookieName = "__Secure-authjs.session-token";
  const nonSecureCookieName = "authjs.session-token";
  const rawJwt = cookieMap[secureCookieName] || cookieMap[nonSecureCookieName] || null;

  checks.manualDecode = { rawJwtPresent: !!rawJwt, rawJwtLength: rawJwt?.length };
  if (rawJwt && secret) {
    // Try with secure salt
    try {
      const decoded = await decode({ token: rawJwt, secret, salt: secureCookieName });
      checks.manualDecode = { ...checks.manualDecode as object, secureSalt: decoded ? "OK" : "null" };
    } catch (err: unknown) {
      checks.manualDecode = { ...checks.manualDecode as object, secureSaltError: err instanceof Error ? err.message : String(err) };
    }
    // Try with non-secure salt
    try {
      const decoded = await decode({ token: rawJwt, secret, salt: nonSecureCookieName });
      checks.manualDecode = { ...checks.manualDecode as object, nonSecureSalt: decoded ? "OK" : "null" };
    } catch (err: unknown) {
      checks.manualDecode = { ...checks.manualDecode as object, nonSecureSaltError: err instanceof Error ? err.message : String(err) };
    }
  }

  // 7. Cookie names
  const cookieNames = Object.keys(cookieMap);
  checks.cookies = {
    names: cookieNames,
    hasSecureSession: cookieNames.includes(secureCookieName),
    hasNonSecureSession: cookieNames.includes(nonSecureCookieName),
  };

  // 8. Request info
  checks.request = {
    url: req.url,
    protocol: new URL(req.url).protocol,
    host: req.headers.get("host"),
    xForwardedProto: req.headers.get("x-forwarded-proto"),
  };

  return NextResponse.json(checks, { status: 200 });
}
