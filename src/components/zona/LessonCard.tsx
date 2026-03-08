import React from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface LessonCardProps {
  scheduledAt: Date | string;
  status: string;
  focus?: string | null;
  teacherName?: string | null;
  zoomLink?: string | null;
  zoomStartUrl?: string | null;
  durationMinutes: number;
  personLabel?: string;
  isTeacher?: boolean;
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
  scheduledAt,
  status,
  focus,
  teacherName,
  zoomLink,
  zoomStartUrl,
  durationMinutes,
  personLabel = "Profesor",
  isTeacher = false,
}: LessonCardProps) {
  const date = typeof scheduledAt === "string" ? new Date(scheduledAt) : scheduledAt;
  const now = new Date();
  const msUntil = date.getTime() - now.getTime();
  const minutesUntil = msUntil / (1000 * 60);

  // Time context label
  const isClassToday = isToday(date);
  const isClassTomorrow = isTomorrow(date);
  const isActive = minutesUntil <= 15 && minutesUntil > -durationMinutes;
  const isSoon = minutesUntil > 0 && minutesUntil <= 15;
  const canJoin = minutesUntil <= 15 && minutesUntil > -(durationMinutes + 10);

  // Pick the right zoom URL: teacher gets startUrl, student gets joinUrl
  const zoomUrl = isTeacher ? (zoomStartUrl || zoomLink) : zoomLink;
  const zoomButtonLabel = isTeacher ? "Iniciar clase" : "Entrar a clase";

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
        <Badge variant={statusVariant[status] || "default"}>
          {statusLabel[status] || status}
        </Badge>
      </div>

      {/* Zoom section */}
      {status === "SCHEDULED" && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          {zoomUrl ? (
            <div className="flex items-center gap-3">
              {canJoin ? (
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
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                  {zoomButtonLabel} — se activa 15 min antes
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
    </div>
  );
}
