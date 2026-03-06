"use client";

import { useState, useEffect } from "react";
import { type CEFRLevel } from "@/lib/correction/rubrics";
import Button from "@/components/ui/Button";

interface TaskTypeOption {
  id: string;
  label: string;
  labelFr: string;
}

const TASK_TYPES: Record<CEFRLevel, TaskTypeOption[]> = {
  A1: [
    { id: "formulaire", label: "Formulario", labelFr: "Formulaire" },
    { id: "carte_postale", label: "Postal / mensaje corto", labelFr: "Carte postale" },
  ],
  A2: [
    { id: "message_amical", label: "Mensaje amistoso", labelFr: "Message amical" },
    { id: "lettre_informelle", label: "Carta informal", labelFr: "Lettre informelle" },
  ],
  B1: [
    { id: "essai", label: "Ensayo de opinión", labelFr: "Essai" },
    { id: "lettre_formelle", label: "Carta formal", labelFr: "Lettre formelle" },
  ],
  B2: [
    { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté" },
    { id: "lettre_formelle", label: "Carta formal", labelFr: "Lettre formelle" },
    { id: "article", label: "Artículo", labelFr: "Article" },
  ],
  C1: [
    { id: "synthese", label: "Síntesis", labelFr: "Synthèse" },
    { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté" },
  ],
  C2: [
    { id: "synthese", label: "Síntesis", labelFr: "Synthèse" },
    { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté" },
  ],
};

const WORD_LIMITS: Record<CEFRLevel, { min: number; max: number }> = {
  A1: { min: 40, max: 50 },
  A2: { min: 60, max: 80 },
  B1: { min: 160, max: 180 },
  B2: { min: 250, max: 280 },
  C1: { min: 220, max: 250 },
  C2: { min: 300, max: 500 },
};

interface CorrectionInputProps {
  onSubmit: (data: {
    email: string;
    level: CEFRLevel;
    taskType: string;
    inputText: string;
  }) => void;
  loading?: boolean;
  freeRemaining?: number;
  paidRemaining?: number;
  hasActivePack?: boolean;
}

export default function CorrectionInput({
  onSubmit,
  loading = false,
  freeRemaining,
  paidRemaining,
  hasActivePack,
}: CorrectionInputProps) {
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState<CEFRLevel>("B1");
  const [taskType, setTaskType] = useState("essai");
  const [inputText, setInputText] = useState("");

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const limits = WORD_LIMITS[level];

  // Reset taskType when level changes
  useEffect(() => {
    const tasks = TASK_TYPES[level];
    if (tasks.length > 0 && !tasks.find((t) => t.id === taskType)) {
      setTaskType(tasks[0].id);
    }
  }, [level, taskType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !inputText.trim() || wordCount < 10) return;
    onSubmit({ email, level, taskType, inputText: inputText.trim() });
  };

  const quotaLabel = hasActivePack
    ? "Pack activo — correcciones ilimitadas"
    : freeRemaining !== undefined && freeRemaining > 0
      ? `Te quedan ${freeRemaining} correcciones gratuitas`
      : paidRemaining !== undefined && paidRemaining > 0
        ? `Te quedan ${paidRemaining} correcciones de pago`
        : freeRemaining === 0 && (paidRemaining === undefined || paidRemaining === 0)
          ? "Sin correcciones disponibles"
          : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Email */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F] outline-none"
        />
      </div>

      {/* Level & Task type */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivel
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as CEFRLevel)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F] outline-none"
          >
            {(["A1", "A2", "B1", "B2", "C1", "C2"] as CEFRLevel[]).map(
              (l) => (
                <option key={l} value={l}>
                  {l} — {l.startsWith("A") || l.startsWith("B") ? "DELF" : "DALF"}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de tarea
          </label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F] outline-none"
          >
            {TASK_TYPES[level].map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tu texto en francés
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Écris ton texte ici..."
          className="w-full h-full min-h-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm leading-6 resize-none focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F] outline-none"
        />
      </div>

      {/* Word count */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>
          {wordCount} palabras
          <span className="text-gray-600">
            {" "}
            (recomendado: {limits.min}–{limits.max})
          </span>
        </span>
        {quotaLabel && (
          <span
            className={`font-medium ${
              hasActivePack
                ? "text-green-600"
                : freeRemaining && freeRemaining > 0
                  ? "text-[#395D9F]"
                  : "text-red-500"
            }`}
          >
            {quotaLabel}
          </span>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!email || wordCount < 10}
        className="w-full"
      >
        Corriger mon texte
      </Button>
    </form>
  );
}
