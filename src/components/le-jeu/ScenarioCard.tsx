import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Scenario } from "@/data/scenarios/scenarios";

interface ScenarioCardProps {
  scenario: Scenario;
}

const levelVariants: Record<string, "info" | "success" | "warning" | "danger"> = {
  A2: "info",
  B1: "success",
  B2: "warning",
  C1: "danger",
};

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const totalPuzzles = scenario.scenes.reduce(
    (acc, scene) => acc + scene.puzzles.length,
    0,
  );

  return (
    <Link href={`/le-jeu/${scenario.slug}`} className="block">
      <div className="vie-card p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-lg font-semibold leading-snug"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--vie-navy)",
            }}
          >
            {scenario.title}
          </h3>
          <Badge variant={levelVariants[scenario.level] ?? "info"}>
            {scenario.level}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {scenario.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            ~{scenario.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {scenario.scenes.length} escenas
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {totalPuzzles} puzzles
          </span>
        </div>
      </div>
    </Link>
  );
}
