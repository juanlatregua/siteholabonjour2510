import { NextRequest, NextResponse } from "next/server";
import { getQuotaStatus } from "@/lib/correction/quota";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Parámetro email requerido" },
      { status: 400 },
    );
  }

  const session = await auth();
  const userId = session?.user?.id;

  const quota = await getQuotaStatus(email, userId || undefined);

  return NextResponse.json(quota);
}
