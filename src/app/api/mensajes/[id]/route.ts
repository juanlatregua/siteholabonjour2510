import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET: messages for a conversation (last 50)
export async function GET(req: NextRequest, context: RouteContext) {
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

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "desc" },
    take: 50,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(messages.reverse());
}

// POST: send a message
export async function POST(req: NextRequest, context: RouteContext) {
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

  const { content } = await req.json();

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      conversationId: id,
      senderId: userId,
      content: content.trim(),
    },
    include: {
      sender: { select: { id: true, name: true, image: true } },
    },
  });

  // Update lastMessageAt
  await prisma.conversation.update({
    where: { id },
    data: { lastMessageAt: new Date() },
  });

  // Fire-and-forget push notification to the other party
  const recipientId =
    conversation.studentId === userId ? conversation.teacherId : conversation.studentId;

  try {
    const { sendPushToUser } = await import("@/lib/web-push");
    const senderName = session.user.name || "Alguien";
    sendPushToUser(recipientId, {
      title: `Mensaje de ${senderName}`,
      body: content.trim().slice(0, 100),
      url: conversation.studentId === userId
        ? `/zona-profesor/mensajes/${id}`
        : `/zona-alumno/mensajes/${id}`,
    }).catch(() => {});
  } catch {
    // web-push not configured
  }

  return NextResponse.json(message);
}
