import type { Metadata } from "next";
import { quizWeeks } from "@/data/quizzes/quizzes";

export const metadata: Metadata = {
  title: "Historique des quiz — Le Marche | HolaBonjour",
  description: "Consulta los quiz anteriores de cultura francesa de Le Marche.",
};

export default function HistoriquePage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Historique
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Todos los quiz semanales disponibles. Elige uno para poner a prueba
          tus conocimientos.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {quizWeeks.map((week) => (
            <a
              key={week.weekNumber}
              href={`/le-marche?semana=${week.weekNumber}`}
              className="vie-card block p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--vie-sage, #8fbc8f)" }}
                >
                  {week.weekNumber}
                </span>
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--vie-sage, #8fbc8f)" }}
                  >
                    {week.theme}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--vie-navy, #1e3a5f)",
                    }}
                  >
                    {week.title}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {week.questions.length} preguntas
              </p>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/le-marche"
            className="text-sm font-medium underline"
            style={{ color: "var(--vie-sage, #8fbc8f)" }}
          >
            Volver al quiz actual
          </a>
        </div>
      </div>
    </div>
  );
}
