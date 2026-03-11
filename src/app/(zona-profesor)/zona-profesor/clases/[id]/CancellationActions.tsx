"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

const CANCELLATION_WINDOW_MS = 48 * 60 * 60 * 1000;

interface CancellationActionsProps {
  lessonId: string;
  status: string;
  scheduledAt: string; // ISO string
  cancellationRequestedAt: string | null;
  packId: string | null;
  studentName: string;
}

export default function CancellationActions({
  lessonId,
  status,
  scheduledAt,
  cancellationRequestedAt,
  packId,
  studentName,
}: CancellationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDevolverForm, setShowDevolverForm] = useState(false);
  const [motivo, setMotivo] = useState("");

  const msUntilClass = useMemo(
    () => new Date(scheduledAt).getTime() - Date.now(),
    [scheduledAt]
  );
  const isLate = msUntilClass < CANCELLATION_WINDOW_MS;

  async function handleApprove() {
    setLoading("approve");
    setError(null);
    try {
      const res = await fetch(`/api/zona-profesor/clases/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "Error");
      setSuccess(
        data.lateCancellation
          ? "Cancelación aprobada (tardía — hora descontada del pack)"
          : "Cancelación aprobada — hora devuelta al pack"
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al aprobar");
    } finally {
      setLoading(null);
    }
  }

  async function handleReject() {
    setLoading("reject");
    setError(null);
    try {
      const res = await fetch(`/api/zona-profesor/clases/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectCancellation: true }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "Error");
      setSuccess("Solicitud de cancelación rechazada — se ha notificado al alumno");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al rechazar");
    } finally {
      setLoading(null);
    }
  }

  async function handleCancelByTeacher() {
    setLoading("cancel");
    setError(null);
    try {
      const res = await fetch(`/api/zona-profesor/clases/${lessonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "Error");
      setSuccess(
        data.lateCancellation
          ? "Clase cancelada (tardía — hora descontada del pack)"
          : "Clase cancelada — hora devuelta al pack"
      );
      setShowCancelConfirm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cancelar");
    } finally {
      setLoading(null);
    }
  }

  async function handleDevolverHora() {
    if (!packId || !motivo.trim()) return;
    setLoading("devolver");
    setError(null);
    try {
      const res = await fetch(`/api/zona-profesor/packs/${packId}/devolver-hora`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad: 1, motivo: motivo.trim() }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "Error");
      setSuccess(`Hora devuelta al pack. Horas restantes: ${data.hoursRemaining}`);
      setShowDevolverForm(false);
      setMotivo("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al devolver hora");
    } finally {
      setLoading(null);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-800">{success}</p>
      </div>
    );
  }

  // Cancellation request pending — show approve/reject
  if (status === "SCHEDULED" && cancellationRequestedAt) {
    return (
      <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 space-y-3">
        <div>
          <p className="font-semibold text-amber-900">
            {studentName} ha solicitado cancelar esta clase
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Solicitado el{" "}
            {new Date(cancellationRequestedAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="mt-1 text-xs text-amber-600">
            {isLate
              ? "Cancelación tardía (<48h): la hora se descontará del pack"
              : "Cancelación anticipada (>48h): la hora se devolverá al pack"}
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            loading={loading === "approve"}
            disabled={loading !== null}
            onClick={handleApprove}
          >
            Aprobar cancelación
          </Button>
          <Button
            variant="outline"
            size="sm"
            loading={loading === "reject"}
            disabled={loading !== null}
            onClick={handleReject}
          >
            Rechazar cancelación
          </Button>
        </div>
      </div>
    );
  }

  // SCHEDULED with no cancellation request — show cancel button
  if (status === "SCHEDULED") {
    return (
      <div className="space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {showCancelConfirm ? (
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 space-y-3">
            <p className="font-semibold text-red-800">
              ¿Cancelar esta clase?
            </p>
            <p className="text-sm text-red-700">
              {isLate
                ? "Cancelación con menos de 48h: la hora se descontará del pack del alumno."
                : "Cancelación con más de 48h: la hora se devolverá al pack."}
            </p>
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                loading={loading === "cancel"}
                disabled={loading !== null}
                onClick={handleCancelByTeacher}
              >
                Confirmar cancelación
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={loading !== null}
                onClick={() => setShowCancelConfirm(false)}
              >
                Volver atrás
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowCancelConfirm(true)}
          >
            Cancelar clase
          </Button>
        )}
      </div>
    );
  }

  // CANCELLED or NO_SHOW with late cancellation — show devolver hora button
  if ((status === "CANCELLED" || status === "NO_SHOW") && packId && isLate) {
    return (
      <div className="space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {showDevolverForm ? (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
            <p className="font-semibold text-blue-900">
              Devolver hora al pack de {studentName}
            </p>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Motivo
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
                placeholder="Ej: Justificante médico presentado"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                loading={loading === "devolver"}
                disabled={loading !== null || !motivo.trim()}
                onClick={handleDevolverHora}
              >
                Devolver hora
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={loading !== null}
                onClick={() => {
                  setShowDevolverForm(false);
                  setMotivo("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDevolverForm(true)}
          >
            Devolver hora al pack
          </Button>
        )}
      </div>
    );
  }

  return null;
}
