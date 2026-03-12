import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// POST: mark messages as read
export async function POST(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const userId = session.user.id;

  // Verify the user is a participant
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    select: { studentId: true, teacherId: true },
  });

  if (!conversation || (conversation.studentId !== userId && conversation.teacherId !== userId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Mark all unread messages from the OTHER user as read
  await prisma.message.updateMany({
    where: {
      conversationId: id,
      senderId: { not: userId },
      readAt: null,
    },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
