import React from "react";
import { redirect } from "next/navigation";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import ChatThread from "@/components/zona/ChatThread";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChatProfesorPage({ params }: Props) {
  const session = await requireTeacher();
  const { id } = await params;
  const userId = session.user.id;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, image: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        take: 50,
        include: {
          sender: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });

  if (!conversation || conversation.teacherId !== userId) {
    redirect("/zona-profesor/mensajes");
  }

  const serializedMessages = conversation.messages.map((m) => ({
    id: m.id,
    content: m.content,
    senderId: m.senderId,
    createdAt: m.createdAt.toISOString(),
    sender: m.sender,
  }));

  return (
    <ChatThread
      conversationId={id}
      currentUserId={userId}
      otherPersonName={conversation.student.name || "Alumno"}
      initialMessages={serializedMessages}
      backHref="/zona-profesor/mensajes"
    />
  );
}
