import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: total unread count for current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const count = await prisma.message.count({
    where: {
      conversation: {
        OR: [{ studentId: userId }, { teacherId: userId }],
      },
      senderId: { not: userId },
      readAt: null,
    },
  });

  return NextResponse.json({ count });
}
