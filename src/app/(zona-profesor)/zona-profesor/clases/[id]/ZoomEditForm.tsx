"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface ZoomEditFormProps {
  lessonId: string;
  initialZoomLink: string;
}

export default function ZoomEditForm({ lessonId, initialZoomLink }: ZoomEditFormProps) {
  const router = useRouter();
  const [zoomLink, setZoomLink] = useState(initialZoomLink);
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
        body: JSON.stringify({ zoomLink: zoomLink.trim() || null }),
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
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Enlace Zoom (alumno)
        </label>
        <input
          type="url"
          value={zoomLink}
          onChange={(e) => {
            setZoomLink(e.target.value);
            setSuccess(false);
          }}
          placeholder="https://zoom.us/j/..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
        />
        <p className="mt-1 text-xs text-gray-400">
          Se genera automáticamente con Zoom. Usa este campo solo si necesitas cambiar el enlace manualmente.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Enlace Zoom actualizado.</p>}

      <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
        Guardar enlace Zoom
      </Button>
    </div>
  );
}
