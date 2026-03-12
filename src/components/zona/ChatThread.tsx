"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Link from "next/link";
import { FiArrowLeft, FiSend } from "react-icons/fi";

interface MessageItem {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: { id: string; name: string | null; image: string | null };
}

interface ChatThreadProps {
  conversationId: string;
  currentUserId: string;
  otherPersonName: string;
  initialMessages: MessageItem[];
  backHref: string;
}

export default function ChatThread({
  conversationId,
  currentUserId,
  otherPersonName,
  initialMessages,
  backHref,
}: ChatThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark as read on mount
  useEffect(() => {
    fetch(`/api/mensajes/${conversationId}/read`, { method: "POST" }).catch(() => {});
  }, [conversationId]);

  // Poll every 15s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/mensajes/${conversationId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
          // Mark new messages as read
          fetch(`/api/mensajes/${conversationId}/read`, { method: "POST" }).catch(() => {});
        }
      } catch {
        // silent
      }
    }, 15_000);
    return () => clearInterval(interval);
  }, [conversationId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const content = input.trim();
    if (!content || sending) return;

    setSending(true);
    setInput("");

    try {
      const res = await fetch(`/api/mensajes/${conversationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages((prev) => [...prev, newMsg]);
      }
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <Link
          href={backHref}
          className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <FiArrowLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-lg font-semibold text-gray-900">{otherPersonName}</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            Envía el primer mensaje para iniciar la conversación.
          </p>
        )}
        <div className="space-y-3">
          {messages.map((msg) => {
            const isMine = msg.senderId === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isMine
                      ? "bg-[#1e2d4a] text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      isMine ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    {format(new Date(msg.createdAt), "HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-200 pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#395D9F] focus:bg-white"
          maxLength={2000}
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="flex items-center justify-center rounded-xl bg-[#1e2d4a] px-4 py-2.5 text-white transition-colors hover:bg-[#395D9F] disabled:opacity-50"
        >
          <FiSend className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
