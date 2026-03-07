import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TEACHER_EMAILS } from "@/lib/constants";

// GET /api/debug/auth-teacher?email=isabelleguitton@holabonjour.es
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email")?.toLowerCase().trim();

  if (!email) {
    return NextResponse.json({ error: "Falta ?email=" }, { status: 400 });
  }

  const checks: Record<string, unknown> = {};

  // 1. Is email in TEACHER_EMAILS?
  checks.inTeacherEmails = TEACHER_EMAILS.includes(email as typeof TEACHER_EMAILS[number]);
  checks.teacherEmailsList = TEACHER_EMAILS;

  // 2. Does user exist in DB?
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true, active: true },
    });
    checks.dbUser = user || "NOT FOUND";
  } catch (err: unknown) {
    checks.dbUser = { error: err instanceof Error ? err.message : String(err) };
  }

  // 3. Is password hash env var set?
  const envKey = `TEACHER_PASSWORD_HASH_${email.split("@")[0].toUpperCase().replace(/[^A-Z]/g, "")}`;
  checks.envKey = envKey;
  checks.envVarSet = !!process.env[envKey];
  checks.envVarLength = process.env[envKey]?.length;
  checks.envVarPrefix = process.env[envKey]?.substring(0, 7); // "$2b$10$" expected

  return NextResponse.json(checks);
}
