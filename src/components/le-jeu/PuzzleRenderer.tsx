"use client";

import React, { useState, useCallback } from "react";
import type { Puzzle } from "@/data/scenarios/scenarios";
import Button from "@/components/ui/Button";

interface PuzzleRendererProps {
  puzzle: Puzzle;
  onSolve: (correct: boolean) => void;
}

export default function PuzzleRenderer({ puzzle, onSolve }: PuzzleRendererProps) {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Fill-blank state
  const [blankInput, setBlankInput] = useState("");

  // Multiple-choice state
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Reorder state
  const [reorderSequence, setReorderSequence] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    puzzle.shuffledOrder ?? [],
  );

  const checkAnswer = useCallback(() => {
    let correct = false;

    if (puzzle.type === "fill-blank") {
      correct =
        blankInput.trim().toLowerCase() ===
        (puzzle.blankAnswer ?? "").toLowerCase();
    } else if (puzzle.type === "multiple-choice") {
      correct = selectedIdx === puzzle.correctIdx;
    } else if (puzzle.type === "reorder") {
      correct =
        JSON.stringify(reorderSequence) ===
        JSON.stringify(puzzle.correctOrder);
    }

    setIsCorrect(correct);
    setAnswered(true);
    onSolve(correct);
  }, [puzzle, blankInput, selectedIdx, reorderSequence, onSolve]);

  function addWord(word: string, idx: number) {
    setReorderSequence((s) => [...s, word]);
    setAvailableWords((a) => a.filter((_, i) => i !== idx));
  }

  function removeWord(word: string, idx: number) {
    setAvailableWords((a) => [...a, word]);
    setReorderSequence((s) => s.filter((_, i) => i !== idx));
  }

  const canSubmit =
    (puzzle.type === "fill-blank" && blankInput.trim().length > 0) ||
    (puzzle.type === "multiple-choice" && selectedIdx !== null) ||
    (puzzle.type === "reorder" && reorderSequence.length > 0);

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        borderColor: answered
          ? isCorrect
            ? "#22c55e"
            : "#ef4444"
          : "#e5e7eb",
        background: answered
          ? isCorrect
            ? "#f0fdf4"
            : "#fef2f2"
          : "white",
      }}
    >
      <p
        className="text-sm font-medium"
        style={{ color: "var(--vie-navy)" }}
      >
        {puzzle.prompt}
      </p>

      {/* Hint button */}
      {puzzle.hint && !answered && (
        <div className="mt-2">
          {showHint ? (
            <p className="text-xs italic text-gray-500">
              Pista: {puzzle.hint}
            </p>
          ) : (
            <button
              className="text-xs underline"
              style={{ color: "var(--vie-bleu)" }}
              onClick={() => setShowHint(true)}
            >
              Ver pista
            </button>
          )}
        </div>
      )}

      {/* === FILL-BLANK === */}
      {puzzle.type === "fill-blank" && (
        <div className="mt-3">
          <input
            type="text"
            value={blankInput}
            onChange={(e) => setBlankInput(e.target.value)}
            disabled={answered}
            placeholder="Escribe tu respuesta..."
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: answered
                ? isCorrect
                  ? "#22c55e"
                  : "#ef4444"
                : "#d1d5db",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmit && !answered) {
                checkAnswer();
              }
            }}
          />
          {answered && !isCorrect && (
            <p className="mt-1 text-xs text-green-700">
              Respuesta correcta: <strong>{puzzle.blankAnswer}</strong>
            </p>
          )}
        </div>
      )}

      {/* === MULTIPLE-CHOICE === */}
      {puzzle.type === "multiple-choice" && puzzle.options && (
        <div className="mt-3 space-y-2">
          {puzzle.options.map((opt, idx) => {
            let bg = "white";
            let border = "1px solid #e5e7eb";
            let textColor = "#374151";

            if (answered) {
              if (idx === puzzle.correctIdx) {
                bg = "#dcfce7";
                border = "1px solid #22c55e";
                textColor = "#166534";
              } else if (idx === selectedIdx && idx !== puzzle.correctIdx) {
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
                onClick={() => !answered && setSelectedIdx(idx)}
                disabled={answered}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* === REORDER === */}
      {puzzle.type === "reorder" && (
        <div className="mt-3">
          {/* Built sequence */}
          <div
            className="flex min-h-[40px] flex-wrap gap-1.5 rounded-lg border-2 border-dashed p-2"
            style={{ borderColor: "var(--vie-gold-light)" }}
          >
            {reorderSequence.length === 0 && (
              <span className="text-xs text-gray-400 italic">
                Haz clic en las palabras para ordenarlas...
              </span>
            )}
            {reorderSequence.map((word, idx) => (
              <button
                key={`seq-${idx}`}
                className="rounded-md px-2.5 py-1 text-sm font-medium transition-colors"
                style={{
                  background: "var(--vie-bleu)",
                  color: "white",
                }}
                onClick={() => !answered && removeWord(word, idx)}
                disabled={answered}
              >
                {word}
              </button>
            ))}
          </div>

          {/* Available words */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {availableWords.map((word, idx) => (
              <button
                key={`avail-${idx}`}
                className="rounded-md border px-2.5 py-1 text-sm font-medium transition-colors"
                style={{
                  borderColor: "#d1d5db",
                  color: "var(--vie-navy)",
                  background: "var(--vie-cream)",
                }}
                onClick={() => !answered && addWord(word, idx)}
                disabled={answered}
              >
                {word}
              </button>
            ))}
          </div>

          {answered && !isCorrect && puzzle.correctOrder && (
            <p className="mt-2 text-xs text-green-700">
              Orden correcto:{" "}
              <strong>{puzzle.correctOrder.join(" ")}</strong>
            </p>
          )}
        </div>
      )}

      {/* Check / Explanation */}
      <div className="mt-4">
        {!answered ? (
          <Button
            variant="primary"
            size="sm"
            disabled={!canSubmit}
            onClick={checkAnswer}
          >
            Comprobar
          </Button>
        ) : (
          <div className="space-y-2">
            <p
              className="text-sm font-semibold"
              style={{ color: isCorrect ? "#166534" : "#991b1b" }}
            >
              {isCorrect ? "Correct !" : "Pas tout a fait..."}
            </p>
            <p className="text-xs leading-relaxed text-gray-600">
              {puzzle.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
