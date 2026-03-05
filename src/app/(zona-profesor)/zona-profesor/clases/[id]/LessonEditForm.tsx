"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

interface LessonEditFormProps {
  lessonId: string;
  initialNotes: string;
  initialFeedback: string;
  initialStatus: string;
  scheduledAt: string; // ISO string
}

const statusOptions = [
  { value: "SCHEDULED", label: "Programada" },
  { value: "COMPLETED", label: "Completada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "NO_SHOW", label: "No asistencia" },
];

const CANCELLATION_WINDOW_MS = 48 * 60 * 60 * 1000;

export default function LessonEditForm({
  lessonId,
  initialNotes,
  initialFeedback,
  initialStatus,
  scheduledAt,
}: LessonEditFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isCancelling = (status === "CANCELLED" || status === "NO_SHOW") && initialStatus === "SCHEDULED";
  const msUntilClass = useMemo(() => new Date(scheduledAt).getTime() - Date.now(), [scheduledAt]);
  const isLate = msUntilClass < CANCELLATION_WINDOW_MS;
  const needsConfirmation = isCancelling && isLate;

  async function doSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    setShowConfirm(false);

    try {
      const res = await fetch(`/api/zona-profesor/clases/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, studentFeedback: feedback, status }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error al guardar");
      }

      if (data.lateCancellation) {
        setSuccess(true);
        setError("Cancelación tardía: se ha descontado la clase del bono y se ha notificado al alumno.");
      } else {
        setSuccess(true);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  function handleSave() {
    if (needsConfirmation && !showConfirm) {
      setShowConfirm(true);
      return;
    }
    doSave();
  }

  return (
    <div className="space-y-4">
      <Select
        label="Estado"
        options={statusOptions}
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setSuccess(false);
          setShowConfirm(false);
        }}
      />

      {/* Late cancellation warning */}
      {showConfirm && (
        <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 text-sm">
          <p className="font-bold text-red-800 mb-2">
            Cancelación con menos de 48 horas
          </p>
          <ul className="list-disc pl-4 space-y-1 text-red-700 text-xs mb-3">
            <li>La clase <strong>se descontará del bono</strong> del alumno.</li>
            <li>Se enviará un email y SMS al alumno notificando la cancelación tardía.</li>
            <li>Excepción: el alumno puede presentar justificante médico en 24h.</li>
          </ul>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={doSave}
              disabled={saving}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Confirmar cancelación"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowConfirm(false);
                setStatus(initialStatus);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Volver atrás
            </button>
          </div>
        </div>
      )}

      {/* Informational warning when selecting cancel/no-show but >48h */}
      {isCancelling && !isLate && !showConfirm && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Cancelación con más de 48h de antelación: la clase <strong>no</strong> se descontará del bono.
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Notas del profesor
        </label>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setSuccess(false);
          }}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
          placeholder="Notas sobre la clase..."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Feedback para el alumno
        </label>
        <textarea
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setSuccess(false);
          }}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
          placeholder="Feedback para el alumno..."
        />
      </div>

      {error && (
        <p className={`text-sm ${success ? "text-amber-600" : "text-red-600"}`}>
          {error}
        </p>
      )}
      {success && !error && <p className="text-sm text-green-600">Guardado correctamente.</p>}

      {!showConfirm && (
        <Button variant="primary" size="md" loading={saving} onClick={handleSave}>
          Guardar cambios
        </Button>
      )}
    </div>
  );
}
