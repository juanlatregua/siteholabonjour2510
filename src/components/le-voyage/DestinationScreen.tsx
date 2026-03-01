"use client";

import GlassCard from "@/components/cinematic/GlassCard";
import RevealText from "@/components/cinematic/RevealText";
import type { CEFRLevel, PublicAssessment } from "@/lib/assessment/types";

interface DestinationScreenProps {
  assessments: PublicAssessment[];
  onSelect: (assessment: PublicAssessment) => void;
}

interface Destination {
  city: string;
  levels: CEFRLevel[];
  description: string;
  emoji: string;
  accent: string;
  badgeBg: string;
  badgeBorder: string;
}

const DESTINATIONS: Destination[] = [
  {
    city: "Paris",
    levels: ["A1", "A2"],
    description:
      "Tu primer viaje. Gramática, vocabulario y comprensión desde cero hasta las alturas.",
    emoji: "\uD83C\uDDEB\uD83C\uDDF7",
    accent: "#e8b865",
    badgeBg: "rgba(232,184,101,0.1)",
    badgeBorder: "rgba(232,184,101,0.3)",
  },
  {
    city: "Lyon",
    levels: ["B1"],
    description:
      "Preparación específica para las pruebas DELF B1. Conversación, comprensión y expresión.",
    emoji: "\uD83C\uDF77",
    accent: "#c77dba",
    badgeBg: "rgba(199,125,186,0.1)",
    badgeBorder: "rgba(199,125,186,0.3)",
  },
  {
    city: "Bordeaux",
    levels: ["B2"],
    description:
      "Nivel avanzado. Argumentación, textos complejos y expresión fluida.",
    emoji: "\uD83C\uDFF0",
    accent: "#6ec6ca",
    badgeBg: "rgba(110,198,202,0.1)",
    badgeBorder: "rgba(110,198,202,0.3)",
  },
  {
    city: "Marseille",
    levels: ["C1", "C2"],
    description:
      "Dominio total. Matices, registros formales y precisión nativa.",
    emoji: "\u2600\uFE0F",
    accent: "#f0a500",
    badgeBg: "rgba(240,165,0,0.1)",
    badgeBorder: "rgba(240,165,0,0.3)",
  },
];

const findAssessmentForDestination = (
  assessments: PublicAssessment[],
  levels: CEFRLevel[],
): PublicAssessment | null => {
  return (
    assessments.find((a) => levels.includes(a.targetLevel)) ?? null
  );
};

export default function DestinationScreen({
  assessments,
  onSelect,
}: DestinationScreenProps) {
  return (
    <section
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <p
            className="text-lg text-[#f1f5f9]/60"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bienvenue, <span style={{ color: "#e8b865" }}>voyageur</span>
          </p>
          <h2
            className="mt-2 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <RevealText delay={0}>
              Choisissez votre{" "}
              <span style={{ fontWeight: 700, fontStyle: "italic" }}>
                destination
              </span>
            </RevealText>
          </h2>
          <p className="mt-3 text-[#f1f5f9]/60">
            <RevealText delay={200}>
              Cada ciudad es un nivel. ¿No sabes cuál elegir? Empieza por Paris.
            </RevealText>
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {DESTINATIONS.map((dest, index) => {
            const assessment = findAssessmentForDestination(
              assessments,
              dest.levels,
            );
            const isAvailable = assessment !== null;

            return (
              <div
                key={dest.city}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: "0.6s",
                  animationFillMode: "both",
                  animationName: "cin-fade-up",
                  animationTimingFunction: "ease-out",
                }}
              >
                <GlassCard>
                  <div className="flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <h3
                        className="text-xl font-bold text-white"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {dest.emoji} {dest.city}
                      </h3>
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{
                          color: dest.accent,
                          backgroundColor: dest.badgeBg,
                          border: `1px solid ${dest.badgeBorder}`,
                        }}
                      >
                        {dest.levels.join("-")}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f1f5f9]/60">
                      {dest.description}
                    </p>

                    {isAvailable && assessment.totalQuestions > 0 && (
                      <p
                        className="mt-2 text-xs"
                        style={{ color: dest.accent, opacity: 0.7 }}
                      >
                        {assessment.totalQuestions} preguntas
                      </p>
                    )}

                    <div className="mt-5">
                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={() => onSelect(assessment)}
                          className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:brightness-110"
                          style={{
                            backgroundColor: dest.accent,
                            color: "#1a1a2e",
                          }}
                        >
                          Commencer le voyage
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#f1f5f9]/40"
                        >
                          Prochainement
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframes for staggered entrance animation */}
      <style>{`
        @keyframes cin-fade-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
