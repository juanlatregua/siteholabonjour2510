"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

interface ExamAttempt {
  id: string;
  nivel: string;
  finishedAt: Date | null;
  scoreCO: number | null;
  scoreCE: number | null;
  scorePE: number | null;
  scorePO: number | null;
  totalScore: number | null;
  passed: boolean | null;
  aiAnalysis: string | null;
}

interface AiAnalysis {
  probabilityOfPassing: number;
  estimatedLevel: string;
  strengths: string[];
  weaknesses: string[];
  studyPlan: string[];
  personalizedMessage: string;
}

export default function ExamHistoryRow({
  attempt,
  mobileAiOnly,
}: {
  attempt: ExamAttempt;
  mobileAiOnly?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  let analysis: AiAnalysis | null = null;
  if (attempt.aiAnalysis) {
    try {
      analysis = JSON.parse(attempt.aiAnalysis);
    } catch { /* ignore */ }
  }

  // Mobile AI-only mode: just show the expandable AI section
  if (mobileAiOnly) {
    if (!analysis) return null;
    return (
      <>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-medium text-[#395D9F] hover:underline"
        >
          {expanded ? "Ocultar diagnóstico IA" : "Ver diagnóstico IA"}
        </button>
        {expanded && <AiAnalysisPanel analysis={analysis} />}
      </>
    );
  }

  // Desktop table row
  const scoreCell = (score: number | null) => (
    <td className="px-3 py-2.5 text-center tabular-nums">
      {score !== null ? score : <span className="text-gray-300">—</span>}
    </td>
  );

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50/50">
        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
          {attempt.finishedAt
            ? format(attempt.finishedAt, "d MMM yyyy", { locale: es })
            : "—"}
        </td>
        <td className="px-3 py-2.5">
          <span className="inline-flex items-center rounded-full bg-[#395D9F]/10 px-2 py-0.5 text-xs font-bold text-[#395D9F]">
            {attempt.nivel}
          </span>
        </td>
        {scoreCell(attempt.scoreCO)}
        {scoreCell(attempt.scoreCE)}
        {scoreCell(attempt.scorePE)}
        {scoreCell(attempt.scorePO)}
        <td className="px-3 py-2.5 text-center font-bold tabular-nums">
          {attempt.totalScore ?? "—"}<span className="text-gray-400 font-normal">/100</span>
        </td>
        <td className="px-3 py-2.5 text-center">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
            attempt.passed
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}>
            {attempt.passed ? "Réussi" : "Non réussi"}
          </span>
        </td>
        <td className="px-3 py-2.5 text-right">
          {analysis && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium text-[#395D9F] hover:underline whitespace-nowrap"
            >
              {expanded ? "Ocultar" : "Diagnóstico IA"}
            </button>
          )}
        </td>
      </tr>
      {expanded && analysis && (
        <tr>
          <td colSpan={9} className="px-3 py-0">
            <AiAnalysisPanel analysis={analysis} />
          </td>
        </tr>
      )}
    </>
  );
}

function AiAnalysisPanel({ analysis }: { analysis: AiAnalysis }) {
  const probColor =
    analysis.probabilityOfPassing > 70 ? "text-green-600" :
    analysis.probabilityOfPassing > 40 ? "text-amber-500" : "text-red-500";

  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 my-2 text-sm">
      <div className="flex items-center gap-4 mb-3">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Probabilité de réussite
          </span>
          <div className={`text-2xl font-bold ${probColor}`}>
            {analysis.probabilityOfPassing}%
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Niveau estimé
          </span>
          <div className="text-lg font-bold text-[#395D9F]">
            {analysis.estimatedLevel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Points forts</p>
          {analysis.strengths.map((s, i) => (
            <p key={i} className="text-gray-700 text-xs leading-relaxed">✓ {s}</p>
          ))}
        </div>
        <div>
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Points à améliorer</p>
          {analysis.weaknesses.map((w, i) => (
            <p key={i} className="text-gray-700 text-xs leading-relaxed">⚠ {w}</p>
          ))}
        </div>
      </div>

      {analysis.studyPlan.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-bold text-[#395D9F] uppercase tracking-wider mb-1">Plan d&apos;étude</p>
          <ol className="list-decimal list-inside text-xs text-gray-700 space-y-0.5">
            {analysis.studyPlan.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {analysis.personalizedMessage && (
        <p className="text-xs text-gray-600 italic border-l-2 border-[#395D9F] pl-2 mt-2">
          {analysis.personalizedMessage}
        </p>
      )}
    </div>
  );
}
