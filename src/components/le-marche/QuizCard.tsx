"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface QuizQuestion {
  text: string;
  textFr?: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  weekNumber: number;
  onComplete: (score: number, timeMs: number, userAnswers: number[]) => void;
}

export default function QuizCard({ questions, weekNumber, onComplete }: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);

  const total = questions.length;
  const current = questions[currentIdx];
  const isLast = currentIdx === total - 1;

  // Timer
  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSelect = useCallback(
    (idx: number) => {
      if (showFeedback) return;
      setSelectedIdx(idx);
      setShowFeedback(true);
      if (idx === current.correctIdx) {
        setScore((prev) => prev + 1);
      }
    },
    [showFeedback, current.correctIdx]
  );

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;

    const newAnswers = [...userAnswers, selectedIdx];
    setUserAnswers(newAnswers);

    if (isLast) {
      const timeMs = Date.now() - startTimeRef.current;
      onComplete(
        newAnswers.reduce(
          (acc, ans, i) => acc + (ans === questions[i].correctIdx ? 1 : 0),
          0
        ),
        timeMs,
        newAnswers
      );
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setShowFeedback(false);
    }
  }, [selectedIdx, userAnswers, isLast, score, current.correctIdx, onComplete, questions]);

  const progressPercent = ((currentIdx + 1) / total) * 100;

  return (
    <div className="vie-card overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 w-full" style={{ backgroundColor: "var(--vie-cream, #f5f0eb)" }}>
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: "var(--vie-sage, #8fbc8f)",
          }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Semana {weekNumber} &mdash; Pregunta {currentIdx + 1} / {total}
          </span>
          <span>{formatTime(elapsedMs)}</span>
        </div>

        {/* Question */}
        <h3
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
        >
          {current.text}
        </h3>
        {current.textFr && (
          <p className="mt-1 text-sm italic text-gray-500">{current.textFr}</p>
        )}

        {/* Options */}
        <div className="mt-6 flex flex-col gap-3">
          {current.options.map((option, idx) => {
            let bgColor = "";
            let borderColor = "var(--vie-cream, #e5e0db)";
            let textColor = "var(--vie-navy, #1e3a5f)";

            if (showFeedback) {
              if (idx === current.correctIdx) {
                bgColor = "#dcfce7";
                borderColor = "#16a34a";
                textColor = "#15803d";
              } else if (idx === selectedIdx && idx !== current.correctIdx) {
                bgColor = "#fee2e2";
                borderColor = "#dc2626";
                textColor = "#991b1b";
              }
            } else if (idx === selectedIdx) {
              borderColor = "var(--vie-sage, #8fbc8f)";
              bgColor = "var(--vie-cream, #f5f0eb)";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
                className="rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all"
                style={{
                  backgroundColor: bgColor || "transparent",
                  borderColor,
                  color: textColor,
                  cursor: showFeedback ? "default" : "pointer",
                  opacity: showFeedback && idx !== current.correctIdx && idx !== selectedIdx ? 0.5 : 1,
                }}
              >
                <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation on feedback */}
        {showFeedback && (
          <div
            className="mt-4 rounded-lg p-4 text-sm"
            style={{
              backgroundColor: "var(--vie-cream, #f5f0eb)",
              color: "var(--vie-navy, #1e3a5f)",
            }}
          >
            <p className="font-semibold">
              {selectedIdx === current.correctIdx ? "Correct !" : "Pas tout a fait..."}
            </p>
            <p className="mt-1">{current.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showFeedback && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="rounded-lg px-6 py-2 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--vie-sage, #8fbc8f)" }}
            >
              {isLast ? "Ver resultados" : "Siguiente"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
