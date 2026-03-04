"use client";

import { useState, useCallback } from "react";
import CorrectionInput from "./CorrectionInput";
import CorrectionResult from "./CorrectionResult";
import type { CEFRLevel } from "@/lib/correction/rubrics";

interface CorrectionData {
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
  wordCount: number;
  level: string;
  taskType: string;
  id: string;
}

interface QuotaData {
  canSubmit: boolean;
  freeRemaining: number;
  paidRemaining: number;
  hasActivePack: boolean;
}

export default function CorrectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionData | null>(null);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quota, setQuota] = useState<QuotaData | null>(null);
  const [lastEmail, setLastEmail] = useState("");

  const fetchQuota = useCallback(async (email: string) => {
    try {
      const res = await fetch(`/api/corrections/quota?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setQuota(data);
      }
    } catch {
      // Quota check failure is non-blocking
    }
  }, []);

  const handleSubmit = async (data: {
    email: string;
    level: CEFRLevel;
    taskType: string;
    inputText: string;
  }) => {
    setLoading(true);
    setError(null);
    setInputText(data.inputText);

    // Fetch quota if email changed
    if (data.email !== lastEmail) {
      setLastEmail(data.email);
      await fetchQuota(data.email);
    }

    try {
      const res = await fetch("/api/corrections/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.quotaExhausted) {
          setError("Has agotado tus correcciones gratuitas. Contrata un pack para continuar.");
        } else {
          setError(json.error || "Error al procesar la corrección");
        }
        return;
      }

      setResult(json);
      // Refresh quota after submission
      await fetchQuota(data.email);
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#1e2d4a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Corrección IA de expresión escrita
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Escribe tu texto en francés y recibe una corrección detallada con las rúbricas oficiales DELF/DALF.
            Puntuación, errores anotados, texto corregido y consejos personalizados.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm text-blue-300">
            <span>3 correcciones gratis</span>
            <span>·</span>
            <span>Rúbricas oficiales FEI</span>
            <span>·</span>
            <span>Resultado en segundos</span>
          </div>
        </div>
      </section>

      {/* Split panel */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
            {error.includes("agotado") && (
              <button
                onClick={() => {
                  fetch("/api/corrections/purchase", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ packKey: "10-corrections", email: lastEmail }),
                  })
                    .then((r) => r.json())
                    .then((d) => { if (d.url) window.location.href = d.url; });
                }}
                className="block mt-2 text-[#E50046] font-semibold hover:underline"
              >
                Comprar 10 correcciones — 19 €
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
          {/* Left: Input */}
          <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tu texto
            </h2>
            <CorrectionInput
              onSubmit={handleSubmit}
              loading={loading}
              freeRemaining={quota?.freeRemaining}
              paidRemaining={quota?.paidRemaining}
              hasActivePack={quota?.hasActivePack}
            />
          </div>

          {/* Right: Result */}
          <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Resultado
            </h2>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#395D9F] border-t-transparent mb-3" />
                  <p className="text-gray-500 text-sm">
                    Analizando tu texto con IA...
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Esto puede tardar 10-20 segundos
                  </p>
                </div>
              </div>
            ) : result ? (
              <CorrectionResult result={result} inputText={inputText} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <div className="text-5xl mb-4 opacity-30">✍️</div>
                  <p className="text-gray-400 text-sm">
                    Escribe tu texto y pulsa &quot;Corriger mon texte&quot; para
                    recibir tu corrección
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Rúbricas oficiales</h3>
            <p className="text-sm text-gray-600">
              Evaluación con los mismos criterios que los examinadores DELF/DALF de France Éducation International.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Errores anotados</h3>
            <p className="text-sm text-gray-600">
              Cada error identificado con tipo, corrección y explicación. Aprende de tus errores.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Texto corregido + consejos</h3>
            <p className="text-sm text-gray-600">
              Versión corregida de tu texto y recomendaciones personalizadas para progresar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
