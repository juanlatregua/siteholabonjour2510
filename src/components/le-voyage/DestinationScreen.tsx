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
}

const DESTINATIONS: Destination[] = [
  {
    city: "Paris",
    levels: ["A1", "A2"],
    description:
      "Premiers pas dans la langue. Ideal pour les debutants qui decouvrent le francais.",
    emoji: "\uD83C\uDDEB\uD83C\uDDF7",
  },
  {
    city: "Lyon",
    levels: ["B1"],
    description:
      "Conversations du quotidien. Tu comprends l'essentiel et tu te debrouilles.",
    emoji: "\uD83C\uDF77",
  },
  {
    city: "Bordeaux",
    levels: ["B2"],
    description:
      "Discussions approfondies. Tu argumentes et tu t'exprimes avec aisance.",
    emoji: "\uD83C\uDFF0",
  },
  {
    city: "Marseille",
    levels: ["C1", "C2"],
    description:
      "Maitrise avancee. Tu manies la langue avec precision et nuance.",
    emoji: "\u2600\uFE0F",
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
    <section className="flex min-h-screen items-center justify-center bg-[#0a0e17] px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <RevealText delay={0}>Choisissez votre destination</RevealText>
          </h2>
          <p className="mt-3 text-[#f1f5f9]/60">
            <RevealText delay={200}>
              Cada ciudad corresponde a un nivel. Elige segun donde creas que
              estas.
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
                      <span className="rounded-full border border-[#e8b865]/30 bg-[#e8b865]/10 px-2.5 py-1 text-xs font-semibold text-[#e8b865]">
                        {dest.levels.join("-")}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#f1f5f9]/60">
                      {dest.description}
                    </p>

                    <div className="mt-5">
                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={() => onSelect(assessment)}
                          className="w-full rounded-xl bg-[#e8b865] px-4 py-2.5 text-sm font-semibold text-[#0a0e17] transition hover:bg-[#d4a555]"
                        >
                          Embarquer
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
