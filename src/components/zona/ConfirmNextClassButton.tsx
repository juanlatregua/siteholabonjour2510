"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

interface ConfirmNextClassButtonProps {
  lessonId: string;
  nextDateLabel: string; // e.g. "lunes 24 de marzo, 10:00"
}

export default function ConfirmNextClassButton({
  lessonId,
  nextDateLabel,
}: ConfirmNextClassButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; lessonId?: string; error?: string } | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/zona-profesor/clases/confirm-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      const data = await res.json();

      if (data.ok) {
        setResult({ ok: true, lessonId: data.lesson.id });
      } else {
        setResult({ ok: false, error: data.message || "Error al confirmar" });
      }
    } catch {
      setResult({ ok: false, error: "Error de conexión" });
    } finally {
      setLoading(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm font-medium text-green-700">
          Siguiente clase confirmada para {nextDateLabel}
        </p>
        <a
          href={`/zona-profesor/clases/${result.lessonId}`}
          className="mt-1 inline-block text-sm font-semibold text-green-600 hover:underline"
        >
          Ver clase
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        onClick={handleConfirm}
        loading={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        Confirmar siguiente clase ({nextDateLabel})
      </Button>
      {result?.error && (
        <p className="text-sm text-red-600">{result.error}</p>
      )}
    </div>
  );
}
