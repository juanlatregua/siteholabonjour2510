"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

interface LessonEditFormProps {
  lessonId: string;
  initialNotes: string;
  initialFeedback: string;
  initialStatus: string;
}

const statusOptions = [
  { value: "SCHEDULED", label: "Programada" },
  { value: "COMPLETED", label: "Completada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "NO_SHOW", label: "No asistencia" },
];

export default function LessonEditForm({
  lessonId,
  initialNotes,
  initialFeedback,
  initialStatus,
}: LessonEditFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);

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

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
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
        }}
      />

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
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0b3c6f] focus:outline-none focus:ring-2 focus:ring-[#0b3c6f]/20"
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
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0b3c6f] focus:outline-none focus:ring-2 focus:ring-[#0b3c6f]/20"
          placeholder="Feedback para el alumno..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Guardado correctamente.</p>}

      <Button variant="primary" size="md" loading={saving} onClick={handleSave}>
        Guardar cambios
      </Button>
    </div>
  );
}
