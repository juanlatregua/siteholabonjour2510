"use client";

import { useState } from "react";
import ScoreGauge from "./ScoreGauge";
import CriterionBreakdown from "./CriterionBreakdown";
import AnnotatedText from "./AnnotatedText";
import CorrectedTextDiff from "./CorrectedTextDiff";

interface CorrectionResultProps {
  result: {
    globalScore: number;
    maxScore: number;
    criterionScores: Record<
      string,
      { score: number; max: number; comment: string }
    >;
    annotations: Array<{
      start: number;
      end: number;
      type: string;
      original: string;
      correction: string;
      explanation: string;
    }>;
    correctedText: string;
    overallFeedback: string;
    estimatedLevel: string;
    nextSteps: string[];
    wordCount: number;
    level: string;
    taskType: string;
  };
  inputText: string;
}

type Tab = "annotations" | "corrected";

const CRITERION_NAMES: Record<string, string> = {
  respect_consigne: "Cumplimiento de la consigna",
  correction_sociolinguistique: "Adecuación sociolingüística",
  lexique: "Léxico / Vocabulario",
  morphosyntaxe: "Gramática",
  coherence: "Coherencia y cohesión",
  capacite_argumenter: "Capacidad de argumentar",
  capacite_traiter: "Tratamiento de la información",
};

export default function CorrectionResult({
  result,
  inputText,
}: CorrectionResultProps) {
  const [activeTab, setActiveTab] = useState<Tab>("annotations");

  const percentage =
    result.maxScore > 0
      ? Math.round((result.globalScore / result.maxScore) * 100)
      : 0;
  const levelLabel =
    percentage >= 70 ? "Aprobado" : percentage >= 50 ? "Justo" : "Insuficiente";
  const levelColor =
    percentage >= 70
      ? "text-green-600"
      : percentage >= 50
        ? "text-amber-600"
        : "text-red-600";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Score header */}
      <div className="flex items-center gap-6 pb-4 border-b mb-4">
        <div className="relative">
          <ScoreGauge score={result.globalScore} max={result.maxScore} />
        </div>
        <div>
          <p className={`text-lg font-bold ${levelColor}`}>{levelLabel}</p>
          <p className="text-sm text-gray-500">
            Nivel estimado:{" "}
            <span className="font-semibold text-[#395D9F]">
              {result.estimatedLevel}
            </span>
          </p>
          <p className="text-xs text-gray-400">
            {result.wordCount} palabras · {result.annotations.length} errores
          </p>
        </div>
      </div>

      {/* Criterion scores */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Desglose por criterio
        </h3>
        <CriterionBreakdown
          criterionScores={result.criterionScores}
          criterionNames={CRITERION_NAMES}
        />
      </div>

      {/* Tab buttons */}
      <div className="flex gap-1 border-b mb-4">
        <button
          onClick={() => setActiveTab("annotations")}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "annotations"
              ? "border-[#395D9F] text-[#395D9F]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Texto anotado
        </button>
        <button
          onClick={() => setActiveTab("corrected")}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "corrected"
              ? "border-[#395D9F] text-[#395D9F]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Ver texto corregido
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 mb-4">
        {activeTab === "annotations" ? (
          <AnnotatedText text={inputText} annotations={result.annotations} />
        ) : (
          <CorrectedTextDiff
            original={inputText}
            corrected={result.correctedText}
          />
        )}
      </div>

      {/* Feedback */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-[#395D9F] mb-1">
          Feedback general
        </h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {result.overallFeedback}
        </p>
      </div>

      {/* Next steps */}
      {result.nextSteps && result.nextSteps.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Próximos pasos
          </h3>
          <ul className="space-y-1">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-[#395D9F] font-bold">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="border-t pt-4">
        <a
          href="/contratar"
          className="block w-full text-center bg-[#E50046] text-white font-semibold py-3 rounded-lg hover:bg-[#c7003b] transition-colors"
        >
          Contrata un pack → correcciones ilimitadas + clases + profe
        </a>
      </div>
    </div>
  );
}
