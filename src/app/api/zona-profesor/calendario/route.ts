export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  const { searchParams } = request.nextUrl;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: Record<string, unknown> = { teacherId: session.user.id };

  if (from || to) {
    const scheduledAt: Record<string, Date> = {};
    if (from) scheduledAt.gte = new Date(from);
    if (to) scheduledAt.lte = new Date(to);
    where.scheduledAt = scheduledAt;
  }

  const lessons = await prisma.lesson.findMany({
    where,
    orderBy: { scheduledAt: "asc" },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json({ ok: true, lessons });
}
