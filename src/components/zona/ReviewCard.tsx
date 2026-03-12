"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { FiStar } from "react-icons/fi";

interface ReviewCardProps {
  rating: number | null;
  comment: string | null;
  submittedAt: Date | string | null;
  scheduledAt: Date | string;
  teacherName?: string | null;
  studentName?: string | null;
  token?: string | null;
  showPersonLabel?: string;
}

export default function ReviewCard({
  rating,
  comment,
  submittedAt,
  scheduledAt,
  teacherName,
  studentName,
  token,
  showPersonLabel,
}: ReviewCardProps) {
  const date = typeof scheduledAt === "string" ? new Date(scheduledAt) : scheduledAt;
  const isSubmitted = !!submittedAt;
  const personName = showPersonLabel === "Alumno" ? studentName : teacherName;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            {format(date, "d 'de' MMMM, yyyy", { locale: es })}
          </p>
          <p className="mt-0.5 text-sm text-gray-500">
            {format(date, "HH:mm", { locale: es })} h
            {personName && ` · ${showPersonLabel || "Profesor"}: ${personName}`}
          </p>
        </div>

        {isSubmitted && rating != null ? (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-4 w-4 ${
                  rating >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        ) : (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            Pendiente
          </span>
        )}
      </div>

      {isSubmitted && comment && (
        <p className="mt-2 text-sm text-gray-600">{comment}</p>
      )}

      {!isSubmitted && token && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <Link
            href={`/opinion/${token}`}
            className="text-sm font-medium text-[#1e2d4a] transition-colors hover:text-[#395D9F]"
          >
            Enviar valoración →
          </Link>
        </div>
      )}
    </div>
  );
}
