import type { Metadata } from "next";
import { quizWeeks } from "@/data/quizzes/quizzes";
import LeMarcheQuiz from "./LeMarcheQuiz";
import WeeklyCountdown from "@/components/le-marche/WeeklyCountdown";

export const metadata: Metadata = {
  title: "Le Marche — Quiz semanal de cultura francesa | HolaBonjour",
  description:
    "Pon a prueba tus conocimientos de cultura francesa con nuestro quiz semanal.",
};

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export default function LeMarche() {
  const now = new Date();
  const currentWeek = getISOWeekNumber(now);

  // Cycle through available quizzes based on current week
  const quizIndex = (currentWeek - 1) % quizWeeks.length;
  const currentQuiz = quizWeeks[quizIndex];

  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Le Marche
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Cada semana, un nuevo quiz sobre la cultura francesa. Compite con
          otros participantes y sube en el ranking.
        </p>

        <div className="mt-6">
          <WeeklyCountdown />
        </div>

        <div className="mt-4 text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--vie-cream, #f5f0eb)",
              color: "var(--vie-navy, #1e3a5f)",
            }}
          >
            Semana {currentQuiz.weekNumber} &mdash; {currentQuiz.theme}
          </span>
          <h2
            className="mt-2 text-xl font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--vie-navy, #1e3a5f)",
            }}
          >
            {currentQuiz.title}
          </h2>
        </div>

        <div className="mt-8">
          <LeMarcheQuiz
            questions={currentQuiz.questions}
            weekNumber={currentQuiz.weekNumber}
          />
        </div>

        {/* Links */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/le-marche/classement"
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: "var(--vie-sage, #8fbc8f)",
              color: "white",
            }}
          >
            Ver ranking
          </a>
          <a
            href="/le-marche/historique"
            className="rounded-lg border px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              borderColor: "var(--vie-sage, #8fbc8f)",
              color: "var(--vie-navy, #1e3a5f)",
            }}
          >
            Quiz anteriores
          </a>
        </div>
      </div>
    </div>
  );
}
