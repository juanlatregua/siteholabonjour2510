import React from "react";

export interface QuizQuestionData {
  text: string;
  textFr?: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

interface QuizResultProps {
  score: number;
  total: number;
  timeMs: number;
  questions: QuizQuestionData[];
  userAnswers: number[];
}

export default function QuizResult({ score, total, timeMs, questions, userAnswers }: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);
  const totalSec = Math.floor(timeMs / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  const getMessage = () => {
    if (percentage === 100) return "Parfait ! Puntuacion perfecta.";
    if (percentage >= 80) return "Très bien ! Gran resultado.";
    if (percentage >= 60) return "Pas mal ! Buen trabajo.";
    if (percentage >= 40) return "Courage ! Puedes mejorar.";
    return "Ne lâche pas ! Sigue intentandolo.";
  };

  // Stroke calculations for the score circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="vie-card p-6">
      {/* Score circle */}
      <div className="flex flex-col items-center">
        <div className="relative h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={percentage >= 60 ? "#16a34a" : percentage >= 40 ? "#eab308" : "#dc2626"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
            >
              {score}/{total}
            </span>
            <span className="text-xs text-gray-500">{percentage}%</span>
          </div>
        </div>

        <p
          className="mt-4 text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
        >
          {getMessage()}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Tiempo: {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
      </div>

      {/* Per-question breakdown */}
      <div className="mt-8">
        <h3
          className="mb-4 text-base font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
        >
          Detalle de respuestas
        </h3>
        <div className="flex flex-col gap-4">
          {questions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.correctIdx;
            return (
              <div
                key={idx}
                className="rounded-lg border-l-4 p-4"
                style={{
                  borderLeftColor: isCorrect ? "#16a34a" : "#dc2626",
                  backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-sm font-bold">
                    {isCorrect ? "\u2713" : "\u2717"}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "var(--vie-navy, #1e3a5f)" }}>
                      {idx + 1}. {q.text}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      Tu respuesta:{" "}
                      <span className={isCorrect ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                        {q.options[userAnswers[idx]]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <>
                        <p className="mt-0.5 text-xs text-gray-600">
                          Correcta:{" "}
                          <span className="font-semibold text-green-700">
                            {q.options[q.correctIdx]}
                          </span>
                        </p>
                        <p className="mt-2 text-xs text-gray-500">{q.explanation}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
