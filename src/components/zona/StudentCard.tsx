import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface StudentCardProps {
  student: {
    id: string;
    name: string | null;
    email: string;
    level: string | null;
    image: string | null;
    activePack?: {
      hoursTotal: number;
      hoursUsed: number;
      status: string;
    } | null;
    nextLesson?: {
      scheduledAt: Date | string;
    } | null;
  };
}

const levelVariant: Record<string, "info" | "success" | "warning" | "default"> = {
  A1: "info",
  A2: "info",
  B1: "success",
  B2: "success",
  C1: "warning",
  C2: "warning",
};

export default function StudentCard({ student }: StudentCardProps) {
  const initials = student.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : student.email[0].toUpperCase();

  const nextLessonDate = student.nextLesson
    ? typeof student.nextLesson.scheduledAt === "string"
      ? new Date(student.nextLesson.scheduledAt)
      : student.nextLesson.scheduledAt
    : null;

  const packRemaining = student.activePack
    ? Math.max(student.activePack.hoursTotal - student.activePack.hoursUsed, 0)
    : null;

  return (
    <Link
      href={`/zona-profesor/alumnos/${student.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {student.image ? (
            <img
              src={student.image}
              alt={student.name || student.email}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b3c6f] text-sm font-semibold text-white">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-gray-900">
              {student.name || student.email}
            </p>
            {student.level && (
              <Badge variant={levelVariant[student.level] || "default"}>
                {student.level}
              </Badge>
            )}
          </div>
          <p className="truncate text-xs text-gray-500">{student.email}</p>

          {/* Pack status */}
          {student.activePack && (
            <p className="mt-1.5 text-xs text-gray-600">
              Pack:{" "}
              <span className="font-medium">
                {packRemaining}h restantes de {student.activePack.hoursTotal}h
              </span>
              {" "}
              <Badge
                variant={student.activePack.status === "ACTIVE" ? "success" : "warning"}
                className="ml-1"
              >
                {student.activePack.status === "ACTIVE" ? "Activo" : student.activePack.status}
              </Badge>
            </p>
          )}

          {/* Next lesson */}
          {nextLessonDate && (
            <p className="mt-1 text-xs text-gray-500">
              Proxima clase:{" "}
              <span className="font-medium text-gray-700">
                {format(nextLessonDate, "d MMM yyyy, HH:mm", { locale: es })}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
