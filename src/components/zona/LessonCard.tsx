"use client";

import React, { useState } from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface LessonCardProps {
  lessonId?: string;
  scheduledAt: Date | string;
  status: string;
  focus?: string | null;
  teacherName?: string | null;
  zoomLink?: string | null;
  zoomStartUrl?: string | null;
  durationMinutes: number;
  personLabel?: string;
  isTeacher?: boolean;
  recordingUrl?: string | null;
  cancellationRequestedAt?: Date | string | null;
  modality?: string | null;
}

const statusVariant: Record<string, "info" | "success" | "danger" | "warning"> = {
  SCHEDULED: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "warning",
  PENDING_PAYMENT: "warning",
};

const statusLabel: Record<string, string> = {
  SCHEDULED: "Programada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  NO_SHOW: "No asistencia",
  PENDING_PAYMENT: "Pendiente de pago",
};

export default function LessonCard({
  lessonId,
  scheduledAt,
  status,
  focus,
  teacherName,
  zoomLink,
  zoomStartUrl,
  durationMinutes,
  personLabel = "Profesor",
  isTeacher = false,
  recordingUrl,
  cancellationRequestedAt,
  modality,
}: LessonCardProps) {
  const date = typeof scheduledAt === "string" ? new Date(scheduledAt) : scheduledAt;
  const now = new Date();
  const msUntil = date.getTime() - now.getTime();
  const minutesUntil = msUntil / (1000 * 60);
  const hoursUntil = msUntil / (1000 * 60 * 60);

  // Time context label
  const isClassToday = isToday(date);
  const isClassTomorrow = isTomorrow(date);
  const isActive = minutesUntil <= 15 && minutesUntil > -durationMinutes;
  const isSoon = minutesUntil > 0 && minutesUntil <= 15;
  const canJoin = minutesUntil <= 15 && minutesUntil > -(durationMinutes + 10);

  // Zoom link available 24h before for students, always for teachers
  const hoursBeforeZoomAvailable = 24;
  const zoomAvailable = isTeacher || hoursUntil <= hoursBeforeZoomAvailable;

  // Cancellation state
  const isLateCancel = hoursUntil < 48;
  const [cancelRequested, setCancelRequested] = useState(!!cancellationRequestedAt);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Pick the right zoom URL: teacher gets startUrl, student gets joinUrl
  const zoomUrl = isTeacher ? (zoomStartUrl || zoomLink) : zoomLink;
  const zoomButtonLabel = isTeacher ? "Iniciar clase" : "Entrar a clase";

  async function handleCancelRequest() {
    if (!lessonId) return;
    setCancelLoading(true);
    try {
      const res = await fetch(`/api/zona-alumno/clases/${lessonId}/cancelar`, {
        method: "POST",
      });
      if (res.ok) {
        setCancelRequested(true);
      }
    } catch {
      // silently fail
    } finally {
      setCancelLoading(false);
      setShowCancelConfirm(false);
    }
  }

  return (
    <div className={`rounded-xl border bg-white p-4 shadow-sm ${
      isActive && status === "SCHEDULED"
        ? "border-green-300 bg-green-50/30"
        : isClassToday && status === "SCHEDULED"
          ? "border-blue-200"
          : "border-gray-200"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">
              {format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
            </p>
            {isClassToday && status === "SCHEDULED" && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                Hoy
              </span>
            )}
            {isClassTomorrow && status === "SCHEDULED" && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                Mañana
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            {format(date, "HH:mm", { locale: es })} h &middot; {durationMinutes} min
          </p>
          {teacherName && (
            <p className="mt-1 text-sm text-gray-600">
              {personLabel}: <span className="font-medium">{teacherName}</span>
            </p>
          )}
          {focus && (
            <p className="mt-1 text-sm text-gray-500">
              Tema: {focus}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={statusVariant[status] || "default"}>
            {statusLabel[status] || status}
          </Badge>
          {modality === "PRESENCIAL" && (
            <Badge variant="success">Presencial</Badge>
          )}
          {cancelRequested && status === "SCHEDULED" && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              Cancelación solicitada
            </span>
          )}
        </div>
      </div>

      {/* Zoom section (only for ZOOM modality) */}
      {status === "SCHEDULED" && modality !== "PRESENCIAL" && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          {zoomUrl ? (
            <div className="flex items-center gap-3">
              {zoomAvailable ? (
                canJoin ? (
                  <a
                    href={zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                      isSoon || isActive
                        ? "bg-green-600 hover:bg-green-700 animate-pulse"
                        : "bg-[#395D9F] hover:bg-[#1e2d4a]"
                    }`}
                  >
                    {zoomButtonLabel}
                  </a>
                ) : (
                  <a
                    href={zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#395D9F]/10 px-4 py-2 text-sm font-medium text-[#395D9F] transition-colors hover:bg-[#395D9F]/20"
                  >
                    {zoomButtonLabel}
                  </a>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                  Link de Zoom disponible 24h antes
                </span>
              )}
              {isSoon && (
                <span className="text-xs font-semibold text-green-600">
                  Empieza en {Math.ceil(minutesUntil)} min
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              El enlace Zoom se generará antes de la clase.
            </p>
          )}
        </div>
      )}

      {/* Cancellation button for students */}
      {status === "SCHEDULED" && !isTeacher && lessonId && !cancelRequested && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          {showCancelConfirm ? (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-700">
                ¿Solicitar cancelación? Se notificará al profesor.
              </p>
              {isLateCancel && (
                <p className="mt-1 text-xs text-amber-600">
                  Cancelación con menos de 48h: según la política, la hora se descuenta del pack.
                </p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleCancelRequest}
                  disabled={cancelLoading}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelLoading ? "Enviando..." : "Confirmar"}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  Volver
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="text-xs font-medium text-gray-500 transition-colors hover:text-red-600"
            >
              Solicitar cancelación
            </button>
          )}
        </div>
      )}

      {/* Recording link for completed classes */}
      {status === "COMPLETED" && recordingUrl && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <a
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            Ver grabación
          </a>
        </div>
      )}
    </div>
  );
}
