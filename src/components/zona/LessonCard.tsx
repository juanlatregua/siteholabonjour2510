import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface LessonCardProps {
  scheduledAt: Date | string;
  status: string;
  focus?: string | null;
  teacherName?: string | null;
  zoomLink?: string | null;
  durationMinutes: number;
  personLabel?: string;
}

const statusVariant: Record<string, "info" | "success" | "danger" | "warning"> = {
  SCHEDULED: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "warning",
};

const statusLabel: Record<string, string> = {
  SCHEDULED: "Programada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  NO_SHOW: "No asistencia",
};

export default function LessonCard({
  scheduledAt,
  status,
  focus,
  teacherName,
  zoomLink,
  durationMinutes,
  personLabel = "Profesor",
}: LessonCardProps) {
  const date = typeof scheduledAt === "string" ? new Date(scheduledAt) : scheduledAt;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            {format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
          </p>
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

      {status === "SCHEDULED" && zoomLink && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <a
            href={zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f5da0] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#0b3c6f]"
          >
            Unirse a Zoom
          </a>
        </div>
      )}
    </div>
  );
}
