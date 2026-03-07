import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

// GET /api/debug/auth-check
// Diagnostic to check auth system health
export async function GET(req: Request) {
  const checks: Record<string, unknown> = {};

  // 1. Env vars present
  checks.env = {
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
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

  // 4. JWT token from request (if any cookie present)
  try {
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req: req as never, secret });
    checks.currentSession = token
      ? { authenticated: true, role: token.role, userId: token.userId, email: token.email }
      : { authenticated: false };
  } catch (err: unknown) {
    checks.currentSession = { error: err instanceof Error ? err.message : String(err) };
  }

  // 5. Cookie header (what cookies are being sent)
  const cookieHeader = req.headers.get("cookie") || "(none)";
  const cookieNames = cookieHeader === "(none)"
    ? []
    : cookieHeader.split(";").map((c) => c.trim().split("=")[0]);
  checks.cookies = {
    names: cookieNames,
    hasAuthSession: cookieNames.some((n) => n.includes("authjs.session-token") || n.includes("next-auth.session-token")),
  };

  // 6. Request info
  checks.request = {
    protocol: new URL(req.url).protocol,
    host: req.headers.get("host"),
    xForwardedProto: req.headers.get("x-forwarded-proto"),
    xForwardedHost: req.headers.get("x-forwarded-host"),
  };

  return NextResponse.json(checks, { status: 200 });
}
