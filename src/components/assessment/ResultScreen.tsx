"use client";

import Link from "next/link";
import AnimatedGauge from "./AnimatedGauge";
import CertificatePDF from "./CertificatePDF";
import ShareButtons from "./ShareButtons";
import Badge from "@/components/ui/Badge";
import type { AssessmentResult, PublicAssessment } from "@/lib/assessment/types";

interface ResultScreenProps {
  result: AssessmentResult;
  assessment: PublicAssessment;
  onRestart: () => void;
}

export default function ResultScreen({ result, assessment, onRestart }: ResultScreenProps) {
  const levelColorMap: Record<string, string> = {
    A1: "#22c55e",
    A2: "#16a34a",
    B1: "#0f5da0",
    B2: "#0b3c6f",
    C1: "#7c3aed",
    C2: "#6d28d9",
  };

  const gaugeColor = levelColorMap[result.estimatedLevel] ?? "#0f5da0";

  return (
    <section className="space-y-6">
      {/* Score header */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-[0_6px_18px_rgba(5,150,105,0.1)]">
        <p className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
          Resultado final
        </p>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative">
            <AnimatedGauge percentage={result.percentage} color={gaugeColor} label="Puntuacion" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-900">
              {result.totalScore}/{result.maxScore} puntos
            </h3>
            <p className="mt-2 text-lg">
              Nivel estimado: <Badge variant="info">{result.estimatedLevel}</Badge>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Examen recomendado: <strong>{result.recommendedExam}</strong>
            </p>
            <p className="text-sm text-slate-600">{result.recommendedCourse}</p>
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="text-lg font-semibold text-slate-900">Desglose por seccion</h4>
        <div className="mt-4 space-y-3">
          {result.sectionScores.map((section) => (
            <div key={section.sectionId} className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{section.sectionTitle}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {section.score}/{section.maxScore} ({section.percentage}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-[#0f5da0] transition-all duration-1000"
                  style={{ width: `${section.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
        <h4 className="text-lg font-semibold text-[#0b3c6f]">Recomendaciones</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {result.sectionScores
            .filter((s) => s.percentage < 60)
            .map((s) => (
              <li key={s.sectionId} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                Refuerza tu {s.sectionTitle.toLowerCase()} — obtuviste {s.percentage}% en esta
                seccion.
              </li>
            ))}
          {result.sectionScores.every((s) => s.percentage >= 60) && (
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              Buen rendimiento en todas las secciones. Sigue practicando para consolidar tu nivel.
            </li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={`/preparacion-delf-dalf?nivel=${result.estimatedLevel}`}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Ver plan recomendado
        </Link>
        <CertificatePDF result={result} assessmentTitle={assessment.title} />
        <ShareButtons result={result} />
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Empezar otro intento
        </button>
      </div>
    </section>
  );
}
