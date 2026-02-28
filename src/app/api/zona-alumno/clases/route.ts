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

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") || "ALL";

  const statusFilter =
    status === "ALL"
      ? {}
      : status === "SCHEDULED"
        ? { status: "SCHEDULED" }
        : status === "COMPLETED"
          ? { status: "COMPLETED" }
          : status === "CANCELLED"
            ? { status: "CANCELLED" }
            : {};

  const lessons = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      ...statusFilter,
    },
    orderBy: { scheduledAt: "desc" },
    include: {
      teacher: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json({ ok: true, lessons });
}
