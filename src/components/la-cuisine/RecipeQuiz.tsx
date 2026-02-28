"use client";

import { useState } from "react";
import type { RecipeQuizQuestion } from "@/data/recipes/recipes";

export default function RecipeQuiz({
  quiz,
  recipeTitle,
}: {
  quiz: RecipeQuizQuestion[];
  recipeTitle: string;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quiz[currentQ];

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correctIdx) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="vie-card rounded-xl p-6 text-center">
        <h3
          className="text-lg font-bold"
          style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
        >
          Quiz completado
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Has acertado{" "}
          <span className="font-bold" style={{ color: "var(--vie-wine)" }}>
            {score}
          </span>{" "}
          de {quiz.length} preguntas sobre{" "}
          <span className="font-semibold">{recipeTitle}</span>.
        </p>
        <button
          onClick={handleRestart}
          className="mt-4 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: "var(--vie-navy)" }}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="vie-card rounded-xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--vie-navy)" }}
        >
          Pregunta {currentQ + 1} de {quiz.length}
        </span>
        <span className="text-xs text-gray-400">
          {score} correcta{score !== 1 ? "s" : ""}
        </span>
      </div>

      <h4
        className="mb-4 text-sm font-semibold"
        style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
      >
        {question.question}
      </h4>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let bgColor = "white";
          let borderColor = "var(--vie-gold-light)";
          let textColor = "var(--vie-navy)";

          if (selected !== null) {
            if (idx === question.correctIdx) {
              bgColor = "#dcfce7";
              borderColor = "#22c55e";
              textColor = "#166534";
            } else if (idx === selected && idx !== question.correctIdx) {
              bgColor = "#fee2e2";
              borderColor = "#ef4444";
              textColor = "#991b1b";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className="w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                color: textColor,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNext}
            className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--vie-wine)" }}
          >
            {currentQ + 1 >= quiz.length ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      )}
    </div>
  );
}
