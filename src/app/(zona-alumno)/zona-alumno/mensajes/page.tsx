import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import MensajesClient from "@/components/zona/MensajesClient";

export default async function MensajesAlumnoPage() {
  const session = await requireStudent();
  const userId = session.user.id;

  const conversations = await prisma.conversation.findMany({
    where: { studentId: userId },
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

  const serialized = await Promise.all(
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
        lastMessage: conv.messages[0]
          ? {
              content: conv.messages[0].content,
              createdAt: conv.messages[0].createdAt.toISOString(),
              senderId: conv.messages[0].senderId,
            }
          : null,
        lastMessageAt: conv.lastMessageAt.toISOString(),
        unreadCount,
      };
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mensajes</h2>
        <p className="mt-1 text-sm text-gray-500">
          Conversaciones con tus profesores.
        </p>
      </div>
      <MensajesClient
        basePath="/zona-alumno/mensajes"
        currentUserId={userId}
        initialConversations={serialized}
      />
    </div>
  );
}
