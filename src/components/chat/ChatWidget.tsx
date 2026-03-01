"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

type ConciergeGender = "femme" | "homme";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CONCIERGE_IMAGES: Record<ConciergeGender, string> = {
  femme: "/images/concierge-femme.png",
  homme: "/images/concierge-homme.png",
};

const CONCIERGE_NAMES: Record<ConciergeGender, string> = {
  femme: "La Concierge",
  homme: "Le Concierge",
};

const WELCOME_MESSAGES: Record<ConciergeGender, Message> = {
  femme: {
    id: "welcome",
    role: "assistant",
    content:
      "Bonjour ! Soy tu Concierge de HolaBonjour.\n\nPuedo ayudarte con:\n\u2022 Encontrar el curso perfecto para tu nivel\n\u2022 Informaci\u00f3n sobre DELF/DALF\n\u2022 Descubrir nuestros recursos gratuitos\n\u2022 Ense\u00f1arte una expresi\u00f3n en fran\u00e7ais\n\nQu\u2019est-ce que je peux faire pour toi ?",
    timestamp: new Date(),
  },
  homme: {
    id: "welcome",
    role: "assistant",
    content:
      "Bonjour ! Soy tu Concierge de HolaBonjour.\n\nPuedo ayudarte con:\n\u2022 Encontrar el curso perfecto para tu nivel\n\u2022 Informaci\u00f3n sobre DELF/DALF\n\u2022 Descubrir nuestros recursos gratuitos\n\u2022 Ense\u00f1arte una expresi\u00f3n en fran\u00e7ais\n\nQu\u2019est-ce que je peux faire pour toi ?",
    timestamp: new Date(),
  },
};

const STORAGE_KEY_GENDER = "hb-chat-gender";

const QUICK_REPLIES = [
  { label: "Cursos y precios", emoji: "\uD83C\uDF93" },
  { label: "Hacer test de nivel", emoji: "\uD83D\uDCDD" },
  { label: "Expresi\u00f3n del d\u00eda", emoji: "\uD83C\uDDEB\uD83C\uDDF7" },
  { label: "Hablar por WhatsApp", emoji: "\uD83D\uDCF1" },
];

const WHATSAPP_URL =
  "https://wa.me/34624178122?text=Hola%20HolaBonjour%20%F0%9F%87%AB%F0%9F%87%B7";

const STORAGE_KEY_MESSAGES = "hb-chat-messages";
const STORAGE_KEY_SESSION = "hb-chat-session";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Format message content: bold, newlines, links, prices, WhatsApp */
function formatContent(text: string): string {
  const html = text
    // escape html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // bold **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // links
    .replace(
      /(https?:\/\/[^\s)<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#e8b865;text-decoration:underline">$1</a>',
    )
    // prices (XX€)
    .replace(
      /(\d+(?:[.,]\d+)?\s*\u20AC)/g,
      '<span style="color:#e8b865;font-weight:600">$1</span>',
    )
    // WhatsApp mentions
    .replace(
      /WhatsApp/g,
      `<a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:4px;background:#25d366;color:#fff;padding:2px 8px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">WhatsApp</a>`,
    )
    // newlines
    .replace(/\n/g, "<br/>");
  return html;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  /* ----- state ----- */
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [gender, setGender] = useState<ConciergeGender | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  /* ----- refs ----- */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ----- mobile detection ----- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ----- restore session from sessionStorage ----- */
  useEffect(() => {
    try {
      const storedGender = sessionStorage.getItem(STORAGE_KEY_GENDER) as ConciergeGender | null;
      const stored = sessionStorage.getItem(STORAGE_KEY_MESSAGES);
      const storedSession = sessionStorage.getItem(STORAGE_KEY_SESSION);
      if (storedGender && (storedGender === "femme" || storedGender === "homme")) {
        setGender(storedGender);
        if (stored) {
          const parsed: Message[] = JSON.parse(stored).map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
          if (parsed.length > 0) {
            setMessages(parsed);
            setShowQuickReplies(parsed.length <= 1);
          }
        } else {
          setMessages([WELCOME_MESSAGES[storedGender]]);
        }
      }
      if (storedSession) setSessionId(storedSession);
    } catch {
      /* ignore */
    }
  }, []);

  /* ----- persist messages to sessionStorage ----- */
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      try {
        sessionStorage.setItem(STORAGE_KEY_SESSION, sessionId);
      } catch {
        /* ignore */
      }
    }
  }, [sessionId]);

  /* ----- auto-scroll ----- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  /* ----- body scroll lock on mobile ----- */
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, isMobile]);

  /* ----- focus trap & escape ----- */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      // focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ----- focus input when opening ----- */
  useEffect(() => {
    if (isOpen && !isMobile) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, isMobile]);

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const handleOpen = useCallback(() => {
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  const handleSelectGender = useCallback((g: ConciergeGender) => {
    setGender(g);
    setMessages([WELCOME_MESSAGES[g]]);
    setShowQuickReplies(true);
    try {
      sessionStorage.setItem(STORAGE_KEY_GENDER, g);
    } catch { /* ignore */ }
  }, []);

  const handleClear = useCallback(() => {
    setGender(null);
    setMessages([]);
    setShowQuickReplies(true);
    setRateLimited(false);
    setSessionId(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY_MESSAGES);
      sessionStorage.removeItem(STORAGE_KEY_SESSION);
      sessionStorage.removeItem(STORAGE_KEY_GENDER);
    } catch {
      /* ignore */
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming || rateLimited) return;

      setShowQuickReplies(false);

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);

      try {
        const body = {
          messages: [...messages, userMsg]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
          sessionId,
        };

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        // capture session id
        const newSessionId = res.headers.get("X-Session-Id");
        if (newSessionId) setSessionId(newSessionId);

        if (res.status === 429) {
          const errText = await res.text();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? {
                    ...m,
                    content:
                      errText ||
                      "Has alcanzado el l\u00edmite de mensajes. Cont\u00e1ctanos por WhatsApp para seguir hablando.",
                  }
                : m,
            ),
          );
          setRateLimited(true);
          setIsStreaming(false);
          return;
        }

        if (!res.ok || !res.body) {
          throw new Error("Stream failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const current = accumulated;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: current } : m,
            ),
          );
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content:
                    "D\u00e9sol\u00e9, hubo un error. Int\u00e9ntalo de nuevo o escr\u00edbenos por WhatsApp.",
                }
              : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, rateLimited, messages, sessionId],
  );

  const handleQuickReply = useCallback(
    (label: string) => {
      if (label === "Hacer test de nivel") {
        window.location.href = "/test-de-nivel";
        return;
      }
      if (label === "Hablar por WhatsApp") {
        window.open(WHATSAPP_URL, "_blank", "noopener");
        return;
      }
      sendMessage(label);
    },
    [sendMessage],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [sendMessage, input],
  );

  /* ---------------------------------------------------------------- */
  /*  Timestamp formatter                                              */
  /* ---------------------------------------------------------------- */
  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ---- Floating trigger button ---- */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Abrir Le Concierge - Asistente virtual"
          style={{
            position: "fixed",
            bottom: 24,
            right: 88,
            zIndex: 900,
            width: 62,
            height: 62,
            borderRadius: "50%",
            border: "3px solid #e8b865",
            cursor: "pointer",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(232,184,101,0.35)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            animation: "chatPulse 3s ease-in-out infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow =
              "0 6px 28px rgba(232,184,101,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(232,184,101,0.35)";
          }}
        >
          <Image
            src={gender ? CONCIERGE_IMAGES[gender] : CONCIERGE_IMAGES.femme}
            alt="Le Concierge"
            width={56}
            height={56}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </button>
      )}

      {/* ---- Chat panel ---- */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Le Concierge - Asistente virtual"
          style={{
            position: "fixed",
            bottom: isMobile ? 0 : 88,
            right: isMobile ? 0 : 24,
            width: isMobile ? "100vw" : 380,
            height: isMobile ? "100dvh" : 520,
            zIndex: 950,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #1a1a2e, #16213e)",
            border: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: isMobile ? 0 : 20,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isMobile
              ? "none"
              : "0 20px 60px rgba(0,0,0,0.4)",
            overflow: "hidden",
            animation: isClosing
              ? "chatSlideDown 0.25s ease forwards"
              : "chatSlideUp 0.3s ease forwards",
          }}
        >
          {/* ---- Header ---- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Mini concierge avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "2px solid #e8b865",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={gender ? CONCIERGE_IMAGES[gender] : CONCIERGE_IMAGES.femme}
                  alt={gender ? CONCIERGE_NAMES[gender] : "Le Concierge"}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      color: "#e8b865",
                    }}
                  >
                    {gender ? CONCIERGE_NAMES[gender] : "Le Concierge"}
                  </span>{" "}
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
                    &middot; HolaBonjour
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#e8b865",
                      display: "inline-block",
                      animation: "chatPulse 2s ease-in-out infinite",
                    }}
                  />
                  En ligne
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Clear conversation */}
              <button
                onClick={handleClear}
                aria-label="Borrar conversaci\u00f3n"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 8,
                  color: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "none";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>

              {/* Close */}
              <button
                onClick={handleClose}
                aria-label="Cerrar chat"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 8,
                  color: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "none";
                }}
              >
                {isMobile ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ---- Gender selection screen ---- */}
          {!gender && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 20px",
                gap: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "#e8b865",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Bienvenue !
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Elige a tu concierge para empezar:
              </p>
              <div style={{ display: "flex", gap: 20 }}>
                {(["femme", "homme"] as ConciergeGender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => handleSelectGender(g)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "2px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(232,184,101,0.5)";
                      e.currentTarget.style.background = "rgba(232,184,101,0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "3px solid #e8b865",
                      }}
                    >
                      <Image
                        src={CONCIERGE_IMAGES[g]}
                        alt={CONCIERGE_NAMES[g]}
                        width={90}
                        height={90}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        color: "#e8b865",
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {CONCIERGE_NAMES[g]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ---- Messages area ---- */}
          {gender && (
          <div
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "chatFadeUp 0.3s ease forwards",
                  animationDelay: `${Math.min(idx * 0.05, 0.3)}s`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.85)",
                    ...(msg.role === "assistant"
                      ? {
                          background: "rgba(255,255,255,0.06)",
                          borderLeft: "2px solid #e8b865",
                          borderRadius: "4px 16px 16px 16px",
                        }
                      : {
                          background: "rgba(232,184,101,0.15)",
                          border: "1px solid rgba(232,184,101,0.2)",
                          borderRadius: "16px 4px 16px 16px",
                        }),
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatContent(msg.content),
                    }}
                  />
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 6,
                      textAlign: msg.role === "user" ? "right" : "left",
                    }}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isStreaming &&
              messages[messages.length - 1]?.content === "" && (
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.06)",
                    borderLeft: "2px solid #e8b865",
                    borderRadius: "4px 16px 16px 16px",
                    width: "fit-content",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#e8b865",
                        display: "inline-block",
                        animation: "chatDotWave 1.2s ease-in-out infinite",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}

            {/* Quick replies */}
            {showQuickReplies && !isStreaming && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {QUICK_REPLIES.map((qr, i) => (
                  <button
                    key={qr.label}
                    onClick={() => handleQuickReply(qr.label)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "10px 12px",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition:
                        "background 0.2s, border-color 0.2s, color 0.2s",
                      animation: "chatFadeUp 0.4s ease forwards",
                      animationDelay: `${0.3 + i * 0.08}s`,
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(232,184,101,0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(232,184,101,0.3)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>
                      {qr.emoji}
                    </span>
                    <span>{qr.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          )}

          {/* ---- Input area ---- */}
          {gender && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.04)",
              padding: "12px 12px",
              paddingBottom: isMobile
                ? "calc(12px + env(safe-area-inset-bottom, 0px))"
                : 12,
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming || rateLimited}
              placeholder={
                rateLimited
                  ? "Chat desactivado \u2014 cont\u00e1ctanos por WhatsApp"
                  : "Pose ta question... / Pregunta lo que quieras..."
              }
              rows={1}
              aria-label="Escribe tu mensaje"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
                lineHeight: 1.4,
                resize: "none",
                maxHeight: 100,
                fontFamily: "inherit",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
              }}
            />

            <button
              onClick={() => sendMessage(input)}
              disabled={isStreaming || rateLimited || !input.trim()}
              aria-label="Enviar mensaje"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "none",
                background:
                  isStreaming || rateLimited || !input.trim()
                    ? "rgba(232,184,101,0.3)"
                    : "#e8b865",
                color: "#1a1a2e",
                cursor:
                  isStreaming || rateLimited || !input.trim()
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isStreaming && !rateLimited && input.trim()) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          )}
        </div>
      )}

      {/* ---- Keyframe animations ---- */}
      <style>{`
        @keyframes chatSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes chatSlideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(20px);
            opacity: 0;
          }
        }
        @keyframes chatFadeUp {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes chatDotWave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes chatPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
