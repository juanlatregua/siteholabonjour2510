import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: list conversations for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ studentId: userId }, { teacherId: userId }],
    },
    orderBy: { lastMessageAt: "desc" },
    include: {
      student: { select: { id: true, name: true, image: true } },
      teacher: { select: { id: true, name: true, image: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, createdAt: true, senderId: true },
      },
    },
  });

  // Add unread count for each conversation
  const withUnread = await Promise.all(
    conversations.map(async (conv) => {
      const unreadCount = await prisma.message.count({
        where: {
          conversationId: conv.id,
          senderId: { not: userId },
          readAt: null,
        },
      });
      return {
        id: conv.id,
        student: conv.student,
        teacher: conv.teacher,
        lastMessage: conv.messages[0] || null,
        lastMessageAt: conv.lastMessageAt,
        unreadCount,
      };
    })
  );

  return NextResponse.json(withUnread);
}

// POST: create or get conversation (upsert)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { studentId, teacherId } = await req.json();

  if (!studentId || !teacherId) {
    return NextResponse.json({ error: "studentId and teacherId required" }, { status: 400 });
  }

  // Verify current user is a participant
  const userId = session.user.id;
  if (userId !== studentId && userId !== teacherId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const conversation = await prisma.conversation.upsert({
    where: {
      studentId_teacherId: { studentId, teacherId },
    },
    create: { studentId, teacherId },
    update: {},
    include: {
      student: { select: { id: true, name: true, image: true } },
      teacher: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(conversation);
}
