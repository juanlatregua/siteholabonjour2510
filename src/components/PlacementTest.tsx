"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  evaluatePlacement,
  placementQuestions,
  type PlacementQuestion,
  type PlacementResult,
} from "@/lib/delf-dalf";

type AnswersState = Record<string, number>;

const QuestionCard = ({
  question,
  selectedScore,
  onSelect,
}: {
  question: PlacementQuestion;
  selectedScore: number | undefined;
  onSelect: (score: number) => void;
}) => {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-[#0f5da0]">{question.skill}</p>
      <h3 className="mt-2 text-base font-semibold text-gray-900">{question.prompt}</h3>
      <p className="mt-1 text-xs text-gray-500">Referencia: {question.officialReference}</p>

      <div className="mt-4 space-y-2">
        {question.options.map((option) => {
          const checked = selectedScore === option.score;

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                checked ? "border-[#0f5da0] bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                className="mt-1"
                name={question.id}
                checked={checked}
                onChange={() => onSelect(option.score)}
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
};

const PlacementTest = () => {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<PlacementResult | null>(null);

  const answeredCount = useMemo(
    () => placementQuestions.filter((question) => typeof answers[question.id] === "number").length,
    [answers],
  );

  const handleSelect = (questionId: string, score: number) => {
    setAnswers((current) => ({ ...current, [questionId]: score }));
    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (answeredCount !== placementQuestions.length) {
      setError("Completa todas las preguntas para obtener un resultado fiable.");
      return;
    }

    setResult(evaluatePlacement(answers));
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {placementQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedScore={answers[question.id]}
            onSelect={(score) => handleSelect(question.id, score)}
          />
        ))}

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-[#0f5da0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4d84]"
        >
          Ver mi nivel estimado
        </button>
      </form>

      {result && (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Resultado orientativo</p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-900">
            Nivel estimado: {result.estimatedLevel} ({result.examFamily})
          </h3>
          <p className="mt-2 text-sm text-emerald-800">
            Puntuación: {result.score}/{result.maxScore}. Examen recomendado: {result.recommendation.exam}.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            {result.recommendation.focus.map((focusLine) => (
              <li key={focusLine}>{focusLine}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-emerald-900">{result.recommendation.outcome}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/cursos/preparacion-delf-dalf?nivel=${result.estimatedLevel}`}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Ver plan recomendado
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
            >
              Hablar con un asesor académico
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default PlacementTest;
