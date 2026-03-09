import { NextResponse } from "next/server";

/**
 * Validates that a cron request has the correct CRON_SECRET.
 * Fails closed: if CRON_SECRET is not configured, denies all requests.
 */
export function validateCronAuth(request: Request):
  | { ok: true }
  | { ok: false; response: NextResponse } {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    console.error("[CRON] CRON_SECRET not configured — cron disabled for security");
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Cron disabled — CRON_SECRET not configured" },
        { status: 503 },
      ),
    };
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}
