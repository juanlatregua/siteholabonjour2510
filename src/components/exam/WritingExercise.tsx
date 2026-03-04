"use client";

import { useState } from "react";

interface WritingExerciseProps {
  value: string;
  onChange: (value: string) => void;
  showCorrection: boolean;
  correctionResult: CorrectionResultData | null;
  onCorrect: () => void;
  correcting: boolean;
  minWords?: number;
  instruction?: string;
}

interface CorrectionResultData {
  globalScore: number;
  maxScore: number;
  correctedText: string;
  overallFeedback: string;
  nextSteps: string[];
  annotations: Array<{
    original: string;
    correction: string;
    explanation: string;
    type: string;
  }>;
}

export default function WritingExercise({
  value,
  onChange,
  showCorrection,
  correctionResult,
  onCorrect,
  correcting,
  minWords = 40,
  instruction,
}: WritingExerciseProps) {
  const [showCorrected, setShowCorrected] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      {instruction && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Consigne :</strong> {instruction}{" "}
            <strong>({minWords} mots minimum)</strong>
          </p>
        </div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={showCorrection}
          rows={8}
          placeholder="Écrivez votre texte ici..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-[#395D9F] transition-colors resize-none"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              wordCount >= minWords
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {wordCount} mot{wordCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {!showCorrection && wordCount >= minWords && (
        <button
          onClick={onCorrect}
          disabled={correcting}
          className="w-full py-3 rounded-lg font-semibold text-white bg-[#E50046] hover:bg-[#c70040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {correcting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Correction en cours...
            </span>
          ) : (
            "Corriger avec l'IA"
          )}
        </button>
      )}

      {correctionResult && (
        <div className="space-y-4">
          {/* Score */}
          <div className="bg-white border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#395D9F]">
              {correctionResult.globalScore}/{correctionResult.maxScore}
            </div>
            <p className="text-xs text-gray-500 mt-1">Production écrite</p>
          </div>

          {/* Errors */}
          {correctionResult.annotations.length > 0 && (
            <div className="bg-white border rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 text-sm mb-3">
                Erreurs identifiées ({correctionResult.annotations.length})
              </h4>
              <div className="space-y-2">
                {correctionResult.annotations.map((a, i) => (
                  <div key={i} className="flex gap-2 text-xs bg-gray-50 rounded-lg p-2">
                    <span className="shrink-0 px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-mono">
                      {a.type}
                    </span>
                    <div>
                      <span className="line-through text-red-600">{a.original}</span>
                      {" → "}
                      <span className="text-green-700 font-medium">{a.correction}</span>
                      <p className="text-gray-500 mt-0.5">{a.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Corrected text toggle */}
          <div className="bg-white border rounded-xl p-4">
            <button
              onClick={() => setShowCorrected(!showCorrected)}
              className="text-sm font-semibold text-[#395D9F] hover:underline"
            >
              {showCorrected ? "Masquer" : "Voir"} le texte corrigé
            </button>
            {showCorrected && (
              <p className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border-t pt-3">
                {correctionResult.correctedText}
              </p>
            )}
          </div>

          {/* Feedback */}
          <div className="bg-white border rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">Feedback</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {correctionResult.overallFeedback}
            </p>
          </div>

          {/* Next steps */}
          {correctionResult.nextSteps.length > 0 && (
            <div className="bg-white border rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 text-sm mb-2">Conseils</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                {correctionResult.nextSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
