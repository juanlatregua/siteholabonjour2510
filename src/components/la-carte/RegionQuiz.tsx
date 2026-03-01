"use client";

import React, { useState, useCallback } from "react";
import type { RegionQuizQuestion } from "@/data/regions/regions";
import Button from "@/components/ui/Button";

interface RegionQuizProps {
  quiz: RegionQuizQuestion[];
  regionName: string;
  onComplete?: () => void;
}

const STORAGE_KEY = "hb_passport_stamps";

export default function RegionQuiz({ quiz, regionName, onComplete }: RegionQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = quiz.slice(0, 3);
  const current = questions[currentIdx];

  const saveToPassport = useCallback(
    (slug: string) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing: string[] = raw ? JSON.parse(raw) : [];
        if (!existing.includes(slug)) {
          existing.push(slug);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        }
      } catch {
        // ignore storage errors
      }
    },
    [],
  );

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedIdx(idx);
  }

  function handleCheck() {
    if (selectedIdx === null) return;
    setAnswered(true);
    if (selectedIdx === current.correctIdx) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedIdx(null);
      setAnswered(false);
    } else {
      setFinished(true);
      // Derive slug from regionName
      const slug = regionName
        .toLowerCase()
        .replace(/['']/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      saveToPassport(slug);
      onComplete?.();
    }
  }

  if (finished) {
    return (
      <div className="vie-card p-6 text-center">
        <p className="text-3xl">
          {correctCount === questions.length ? "\uD83C\uDF1F" : "\uD83C\uDF93"}
        </p>
        <h3
          className="mt-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
        >
          Quiz terminado
        </h3>
        <p className="mt-1 text-gray-600">
          {correctCount}/{questions.length} respuestas correctas
        </p>
        {correctCount === questions.length ? (
          <p className="mt-2 text-sm font-semibold" style={{ color: "var(--vie-gold)" }}>
            Parfait ! Region anadida a tu pasaporte.
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Region anadida a tu pasaporte. Sigue practicando!
          </p>
        )}
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="vie-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="text-base font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
        >
          Quiz: {regionName}
        </h3>
        <span className="text-xs text-gray-500">
          {currentIdx + 1}/{questions.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="mb-4 flex gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: i <= currentIdx ? "var(--vie-gold)" : "#e5e7eb",
            }}
          />
        ))}
      </div>

      <p className="text-sm font-medium text-gray-800">{current.question}</p>

      <div className="mt-4 space-y-2">
        {current.options.map((opt, idx) => {
          let bg = "white";
          let border = "1px solid #e5e7eb";
          let textColor = "#374151";

          if (answered) {
            if (idx === current.correctIdx) {
              bg = "#dcfce7";
              border = "1px solid #22c55e";
              textColor = "#166534";
            } else if (idx === selectedIdx && idx !== current.correctIdx) {
              bg = "#fee2e2";
              border = "1px solid #ef4444";
              textColor = "#991b1b";
            }
          } else if (idx === selectedIdx) {
            bg = "var(--vie-cream)";
            border = "2px solid var(--vie-gold)";
          }

          return (
            <button
              key={idx}
              className="w-full rounded-lg px-4 py-2.5 text-left text-sm transition-all"
              style={{ background: bg, border, color: textColor }}
              onClick={() => handleSelect(idx)}
              disabled={answered}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex justify-end">
        {!answered ? (
          <Button
            variant="primary"
            size="sm"
            disabled={selectedIdx === null}
            onClick={handleCheck}
          >
            Comprobar
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? "Siguiente" : "Finalizar"}
          </Button>
        )}
      </div>
    </div>
  );
}
