"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";

interface ConversationItem {
  id: string;
  student: { id: string; name: string | null; image: string | null };
  teacher: { id: string; name: string | null; image: string | null };
  lastMessage: { content: string; createdAt: string; senderId: string } | null;
  lastMessageAt: string;
  unreadCount: number;
}

interface MensajesClientProps {
  basePath: string; // "/zona-alumno/mensajes" or "/zona-profesor/mensajes"
  currentUserId: string;
  initialConversations: ConversationItem[];
}

export default function MensajesClient({
  basePath,
  currentUserId,
  initialConversations,
}: MensajesClientProps) {
  const [conversations, setConversations] = useState(initialConversations);

  // Polling every 30s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/mensajes");
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        }
      } catch {
        // silent
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-300">
          <svg className="mx-auto h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Sin conversaciones</h3>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Tus conversaciones con profesores y alumnos aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => {
        const otherPerson =
          conv.student.id === currentUserId ? conv.teacher : conv.student;
        const initials = otherPerson.name
          ? otherPerson.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "?";

        return (
          <Link
            key={conv.id}
            href={`${basePath}/${conv.id}`}
            className={`flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-gray-50 ${
              conv.unreadCount > 0
                ? "border-blue-200 bg-blue-50/30"
                : "border-gray-200 bg-white"
            }`}
          >
            {otherPerson.image ? (
              <img
                src={otherPerson.image}
                alt={otherPerson.name || ""}
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1e2d4a] text-xs font-semibold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${conv.unreadCount > 0 ? "font-bold" : "font-medium"} text-gray-900 truncate`}>
                  {otherPerson.name || "Sin nombre"}
                </p>
                {conv.lastMessage && (
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(conv.lastMessage.createdAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                )}
              </div>
              {conv.lastMessage && (
                <p className={`mt-0.5 text-sm truncate ${conv.unreadCount > 0 ? "font-medium text-gray-700" : "text-gray-500"}`}>
                  {conv.lastMessage.senderId === currentUserId ? "Tú: " : ""}
                  {conv.lastMessage.content}
                </p>
              )}
            </div>
            {conv.unreadCount > 0 && (
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E50046] text-[10px] font-bold text-white">
                {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
