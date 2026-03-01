"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Scenario } from "@/data/scenarios/scenarios";

interface GameCompleteProps {
  scenario: Scenario;
  score: number;
  maxScore: number;
}

function getPerformanceMessage(pct: number): { message: string; emoji: string } {
  if (pct === 100) return { message: "Parfait ! Maîtrise totale !", emoji: "\uD83C\uDF1F" };
  if (pct >= 80) return { message: "Excellent ! Très bien joué !", emoji: "\uD83C\uDF89" };
  if (pct >= 60) return { message: "Bien joué ! Continue comme ça !", emoji: "\uD83D\uDC4F" };
  if (pct >= 40) return { message: "Pas mal ! Tu progresses !", emoji: "\uD83D\uDCAA" };
  return { message: "Courage ! Réessaye pour t'améliorer !", emoji: "\uD83D\uDCDA" };
}

export default function GameComplete({ scenario, score, maxScore }: GameCompleteProps) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const { message, emoji } = getPerformanceMessage(pct);

  return (
    <div className="mx-auto max-w-lg text-center">
      {/* Celebration animation */}
      <div
        className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full"
        style={{
          background: "var(--vie-gold-light)",
          animation: "celebrationPulse 2s ease-in-out infinite",
        }}
      >
        <span className="text-5xl">{emoji}</span>
      </div>

      <h2
        className="text-2xl font-bold sm:text-3xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
      >
        Scenario termine !
      </h2>

      <p className="mt-2 text-gray-600">{scenario.title}</p>

      <Badge variant={pct >= 60 ? "success" : "warning"} className="mt-3">
        {scenario.level}
      </Badge>

      {/* Score display */}
      <div
        className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl px-8 py-5"
        style={{ background: "var(--vie-cream)" }}
      >
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Puntuacion
        </p>
        <p
          className="mt-1 text-4xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--vie-gold)",
          }}
        >
          {score}
          <span className="text-lg text-gray-400">/{maxScore}</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">{pct}% de aciertos</p>
      </div>

      <p
        className="mt-4 text-lg font-semibold"
        style={{ color: "var(--vie-navy)" }}
      >
        {message}
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
        >
          Reiniciar escenario
        </Button>
        <Link href="/le-jeu">
          <Button variant="outline">Volver a Le Jeu</Button>
        </Link>
      </div>

      {/* Inline keyframes for celebration animation */}
      <style>{`
        @keyframes celebrationPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(201,168,76,0); }
        }
      `}</style>
    </div>
  );
}
