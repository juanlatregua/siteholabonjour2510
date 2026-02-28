"use client";

import React, { useState } from "react";
import QuizCard from "@/components/le-marche/QuizCard";
import QuizResult from "@/components/le-marche/QuizResult";
import type { QuizQuestionData } from "@/components/le-marche/QuizResult";

interface LeMarcheQuizProps {
  questions: QuizQuestionData[];
  weekNumber: number;
}

export default function LeMarcheQuiz({ questions, weekNumber }: LeMarcheQuizProps) {
  const [phase, setPhase] = useState<"form" | "quiz" | "result">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState<{
    score: number;
    timeMs: number;
    userAnswers: number[];
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("El nombre es obligatorio");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Introduce un email valido");
      return;
    }

    setPhase("quiz");
  };

  const handleComplete = async (score: number, timeMs: number, userAnswers: number[]) => {
    setResult({ score, timeMs, userAnswers });
    setSubmitting(true);

    try {
      await fetch("/api/le-marche/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, score, timeMs, weekNumber }),
      });
    } catch {
      // Silently fail -- result is shown regardless
    } finally {
      setSubmitting(false);
      setPhase("result");
    }
  };

  if (phase === "form") {
    return (
      <div className="vie-card p-6">
        <h3
          className="text-center text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
        >
          Antes de empezar...
        </h3>
        <p className="mt-1 text-center text-sm text-gray-500">
          Introduce tu nombre y email para participar en el ranking.
        </p>

        <form onSubmit={handleStart} className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="quiz-name"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--vie-navy, #1e3a5f)" }}
            >
              Nombre
            </label>
            <input
              id="quiz-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              style={{ borderColor: "var(--vie-cream, #e5e0db)" }}
            />
          </div>

          <div>
            <label
              htmlFor="quiz-email"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--vie-navy, #1e3a5f)" }}
            >
              Email
            </label>
            <input
              id="quiz-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              style={{ borderColor: "var(--vie-cream, #e5e0db)" }}
            />
          </div>

          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--vie-sage, #8fbc8f)" }}
          >
            Empezar quiz
          </button>
        </form>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <QuizCard
        questions={questions}
        weekNumber={weekNumber}
        onComplete={handleComplete}
      />
    );
  }

  // phase === "result"
  if (!result) return null;

  return (
    <div>
      {submitting && (
        <p className="mb-4 text-center text-sm text-gray-500">Guardando resultado...</p>
      )}
      <QuizResult
        score={result.score}
        total={questions.length}
        timeMs={result.timeMs}
        questions={questions}
        userAnswers={result.userAnswers}
      />
    </div>
  );
}
