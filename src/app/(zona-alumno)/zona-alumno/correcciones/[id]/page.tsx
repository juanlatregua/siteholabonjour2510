"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CorrectionResult from "@/components/correction/CorrectionResult";
import Card, { CardContent } from "@/components/ui/Card";

interface CorrectionData {
  id: string;
  level: string;
  taskType: string;
  taskPrompt: string | null;
  inputText: string;
  wordCount: number;
  globalScore: number;
  maxScore: number;
  criterionScores: Record<string, { score: number; max: number; comment: string }>;
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
  status: string;
  createdAt: string;
  teacherAnnotations: Array<{
    id: string;
    content: string;
    scoreOverride: Record<string, number> | null;
    createdAt: string;
  }>;
}

export default function CorrectionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [correction, setCorrection] = useState<CorrectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/corrections/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(setCorrection)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#395D9F] border-t-transparent" />
      </div>
    );
  }

  if (error || !correction) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">{error || "Corrección no encontrada"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Corrección — {correction.level} · {correction.taskType.replace(/_/g, " ")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {new Date(correction.createdAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original text */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tu texto original</h3>
            <p className="text-sm text-gray-800 leading-6 whitespace-pre-line">
              {correction.inputText}
            </p>
            <p className="text-xs text-gray-400 mt-2">{correction.wordCount} palabras</p>
          </CardContent>
        </Card>

        {/* Correction result */}
        <Card>
          <CardContent>
            <CorrectionResult
              result={{
                globalScore: correction.globalScore,
                maxScore: correction.maxScore,
                criterionScores: correction.criterionScores,
                annotations: correction.annotations,
                correctedText: correction.correctedText,
                overallFeedback: correction.overallFeedback,
                estimatedLevel: correction.estimatedLevel,
                nextSteps: correction.nextSteps,
                wordCount: correction.wordCount,
                level: correction.level,
                taskType: correction.taskType,
              }}
              inputText={correction.inputText}
            />
          </CardContent>
        </Card>
      </div>

      {/* Teacher annotations */}
      {correction.teacherAnnotations.length > 0 && (
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Anotaciones del profesor
            </h3>
            <div className="space-y-3">
              {correction.teacherAnnotations.map((ta) => (
                <div key={ta.id} className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <p className="text-sm text-gray-800">{ta.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(ta.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
