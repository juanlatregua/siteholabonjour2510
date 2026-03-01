"use client";

import React, { useState } from "react";
import type { DialogLine } from "@/data/scenarios/scenarios";

interface DialogBoxProps {
  dialog: DialogLine[];
}

export default function DialogBox({ dialog }: DialogBoxProps) {
  const [showTranslations, setShowTranslations] = useState(false);

  return (
    <div>
      <div className="mb-3 flex items-center justify-end">
        <button
          className="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            background: showTranslations ? "var(--vie-gold)" : "var(--vie-cream)",
            color: showTranslations ? "white" : "var(--vie-navy)",
          }}
          onClick={() => setShowTranslations((v) => !v)}
        >
          {showTranslations ? "Ocultar traduccion" : "Ver traduccion"}
        </button>
      </div>

      <div className="space-y-3">
        {dialog.map((line, idx) => {
          const isUser = line.speaker === "Vous";
          return (
            <div
              key={idx}
              className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: isUser ? "var(--vie-bleu)" : "var(--vie-navy)",
                  color: "white",
                  fontFamily: "var(--font-display)",
                }}
              >
                {line.speaker[0].toUpperCase()}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                  isUser ? "rounded-tr-sm" : "rounded-tl-sm"
                }`}
                style={{
                  background: isUser ? "var(--vie-bleu)" : "white",
                  color: isUser ? "white" : "var(--vie-navy)",
                  border: isUser ? "none" : "1px solid #e5e7eb",
                }}
              >
                <p className="text-xs font-semibold opacity-70">
                  {line.speaker}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed">{line.text}</p>
                {showTranslations && (
                  <p
                    className="mt-1 text-xs italic leading-relaxed"
                    style={{
                      opacity: 0.7,
                      borderTop: isUser
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1px solid #e5e7eb",
                      paddingTop: "4px",
                    }}
                  >
                    {line.translation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
