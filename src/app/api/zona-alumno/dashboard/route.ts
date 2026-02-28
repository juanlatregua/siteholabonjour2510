export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const [nextLesson, activePack, recentMaterials, recentPayments, teachers] =
    await Promise.all([
      prisma.lesson.findFirst({
        where: {
          studentId: userId,
          status: "SCHEDULED",
          scheduledAt: { gte: new Date() },
        },
        orderBy: { scheduledAt: "asc" },
        include: {
          teacher: { select: { id: true, name: true, image: true } },
        },
      }),
      prisma.pack.findFirst({
        where: { studentId: userId, status: "ACTIVE" },
        orderBy: { purchasedAt: "desc" },
      }),
      prisma.material.findMany({
        where: { studentId: userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.payment.findMany({
        where: { studentId: userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.user.findMany({
        where: { role: { in: ["TEACHER", "ADMIN"] }, active: true },
        select: { id: true, name: true },
      }),
    ]);

  return NextResponse.json({
    ok: true,
    nextLesson,
    activePack,
    recentMaterials,
    recentPayments,
    teachers,
  });
}
