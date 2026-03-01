import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    objetivo?: string;
    source?: string;
    message?: string;
    phone?: string;
  };

  const { name, email, objetivo, source, message, phone } = body;

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, message: "Nombre y email son obligatorios." },
      { status: 400 },
    );
  }

  // For now, log the lead. In production, this would go to Supabase or Prisma.
  console.log("[LEAD]", {
    name,
    email,
    phone,
    objetivo,
    message,
    source,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
