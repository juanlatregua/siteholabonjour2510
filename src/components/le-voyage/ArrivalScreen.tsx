"use client";

import Link from "next/link";
import GlassCard from "@/components/cinematic/GlassCard";
import PassportStamp from "@/components/cinematic/PassportStamp";
import type { AssessmentResult, PublicAssessment } from "@/lib/assessment/types";

interface ArrivalScreenProps {
  result: AssessmentResult;
  assessment: PublicAssessment;
  onRestart: () => void;
}

export default function ArrivalScreen({
  result,
  onRestart,
}: ArrivalScreenProps) {
  const whatsappText = encodeURIComponent(
    `He completado Le Voyage y mi nivel es ${result.estimatedLevel}`,
  );
  const whatsappHref = `https://wa.me/34685070304?text=${whatsappText}`;

  return (
    <section className="min-h-screen bg-[#0a0e17] px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Passport stamp hero */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            animationDuration: "0.8s",
            animationFillMode: "both",
            animationName: "arrival-fade-in",
            animationTimingFunction: "ease-out",
          }}
        >
          <PassportStamp
            level={result.estimatedLevel}
            score={result.percentage}
          />

          <h2
            className="mt-6 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bienvenue a destination !
          </h2>
          <p className="mt-2 text-[#f1f5f9]/60">
            Tu nivel estimado es{" "}
            <span className="font-semibold text-[#e8b865]">
              {result.estimatedLevel}
            </span>{" "}
            con una puntuacion de{" "}
            <span className="font-semibold text-[#e8b865]">
              {result.totalScore}/{result.maxScore}
            </span>{" "}
            ({result.percentage}%)
          </p>
        </div>

        {/* Score header card */}
        <div
          style={{
            animationDelay: "200ms",
            animationDuration: "0.6s",
            animationFillMode: "both",
            animationName: "arrival-fade-in",
            animationTimingFunction: "ease-out",
          }}
        >
          <GlassCard>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Resultado global
                </h3>
                <span className="rounded-full border border-[#e8b865]/30 bg-[#e8b865]/10 px-3 py-1 text-sm font-semibold text-[#e8b865]">
                  {result.estimatedLevel}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#f1f5f9]/60">
                Examen recomendado:{" "}
                <strong className="text-[#f1f5f9]/90">
                  {result.recommendedExam}
                </strong>
              </p>
              <p className="text-sm text-[#f1f5f9]/60">
                {result.recommendedCourse}
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Section breakdown */}
        <div
          style={{
            animationDelay: "400ms",
            animationDuration: "0.6s",
            animationFillMode: "both",
            animationName: "arrival-fade-in",
            animationTimingFunction: "ease-out",
          }}
        >
          <GlassCard>
            <div className="p-5 sm:p-6">
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Desglose por seccion
              </h3>

              <div className="mt-4 space-y-3">
                {result.sectionScores.map((section) => (
                  <div
                    key={section.sectionId}
                    className="rounded-lg bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#f1f5f9]/80">
                        {section.sectionTitle}
                      </span>
                      <span className="text-sm font-semibold text-[#e8b865]">
                        {section.score}/{section.maxScore} ({section.percentage}
                        %)
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#e8b865] to-[#d4a555] transition-all duration-1000"
                        style={{ width: `${section.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recommendations */}
        <div
          style={{
            animationDelay: "600ms",
            animationDuration: "0.6s",
            animationFillMode: "both",
            animationName: "arrival-fade-in",
            animationTimingFunction: "ease-out",
          }}
        >
          <GlassCard>
            <div className="p-5 sm:p-6">
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Recomendaciones
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#f1f5f9]/70">
                {result.sectionScores
                  .filter((s) => s.percentage < 60)
                  .map((s) => (
                    <li
                      key={s.sectionId}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b865]" />
                      Refuerza tu {s.sectionTitle.toLowerCase()} — obtuviste{" "}
                      {s.percentage}% en esta seccion.
                    </li>
                  ))}
                {result.sectionScores.every((s) => s.percentage >= 60) && (
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    Buen rendimiento en todas las secciones. Sigue practicando
                    para consolidar tu nivel.
                  </li>
                )}
              </ul>
            </div>
          </GlassCard>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
          style={{
            animationDelay: "800ms",
            animationDuration: "0.6s",
            animationFillMode: "both",
            animationName: "arrival-fade-in",
            animationTimingFunction: "ease-out",
          }}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1fb855]"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar por WhatsApp
          </a>

          <Link
            href={`/preparacion-delf-dalf?nivel=${result.estimatedLevel}`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-5 py-2.5 text-sm font-semibold text-[#0a0e17] transition hover:bg-[#d4a555]"
          >
            Ver plan recomendado
          </Link>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-[#f1f5f9] transition hover:bg-white/5"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes arrival-fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
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
