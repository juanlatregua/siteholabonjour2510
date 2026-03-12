"use client";

import React, { useState, useMemo } from "react";
import ReviewCard from "@/components/zona/ReviewCard";
import EmptyState from "@/components/ui/EmptyState";
import { FiStar } from "react-icons/fi";

interface ReviewData {
  id: string;
  rating: number | null;
  comment: string | null;
  submittedAt: string | null;
  createdAt: string;
  studentName: string | null;
  scheduledAt: string;
}

const PERIOD_OPTIONS = [
  { label: "Últimos 30 días", days: 30 },
  { label: "Últimos 90 días", days: 90 },
  { label: "Todo", days: 0 },
];

export default function ResenasProfesorClient({ reviews }: { reviews: ReviewData[] }) {
  const [periodDays, setPeriodDays] = useState(0);

  const filtered = useMemo(() => {
    if (periodDays === 0) return reviews;
    const cutoff = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);
    return reviews.filter((r) => new Date(r.scheduledAt) >= cutoff);
  }, [reviews, periodDays]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Reseñas ({filtered.length})
        </h3>
        <div className="flex gap-1">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.days}
              onClick={() => setPeriodDays(opt.days)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                periodDays === opt.days
                  ? "bg-[#1e2d4a] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((review) => (
            <ReviewCard
              key={review.id}
              rating={review.rating}
              comment={review.comment}
              submittedAt={review.submittedAt}
              scheduledAt={review.scheduledAt}
              studentName={review.studentName}
              showPersonLabel="Alumno"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiStar className="h-12 w-12" />}
          title="Sin reseñas"
          description="Las valoraciones de tus alumnos aparecerán aquí."
        />
      )}
    </div>
  );
}
