import type { Metadata } from "next";
import { scenarios } from "@/data/scenarios/scenarios";
import ScenarioCard from "@/components/le-jeu/ScenarioCard";

export const metadata: Metadata = {
  title: "Le Jeu — Escape rooms en frances | HolaBonjour",
  description: "Practica frances con escape rooms interactivos.",
};

export default function LeJeuPage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Le Jeu
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Practica frances con escape rooms interactivos. Cada escenario
          combina dialogos reales, puzzles linguisticos y una historia que
          resolver.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["A2", "B1", "B2", "C1"].map((level) => (
            <span
              key={level}
              className="inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "var(--vie-cream)",
                color: "var(--vie-navy)",
                border: "1px solid var(--vie-gold-light)",
              }}
            >
              {level}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.slug} scenario={scenario} />
          ))}
        </div>

        {/* Info section */}
        <section
          className="mt-12 rounded-xl p-6"
          style={{ background: "var(--vie-cream)" }}
        >
          <h2
            className="text-lg font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--vie-navy)",
            }}
          >
            Como funcionan los escape rooms?
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--vie-gold)" }}
              >
                1
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <strong>Lee el dialogo:</strong> Cada escena presenta una
                conversacion en frances con posibilidad de ver la traduccion.
              </p>
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--vie-gold)" }}
              >
                2
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <strong>Resuelve puzzles:</strong> Completa huecos, elige la
                respuesta correcta u ordena palabras para avanzar.
              </p>
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--vie-gold)" }}
              >
                3
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <strong>Gana puntos:</strong> Cada respuesta correcta suma
                puntos. Intenta completar el escenario con la mayor
                puntuacion.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
