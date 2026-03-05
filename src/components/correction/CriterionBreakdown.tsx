"use client";

interface CriterionScore {
  score: number;
  max: number;
  comment: string;
}

interface CriterionBreakdownProps {
  criterionScores: Record<string, CriterionScore>;
  criterionNames?: Record<string, string>;
}

export default function CriterionBreakdown({
  criterionScores,
  criterionNames,
}: CriterionBreakdownProps) {
  return (
    <div className="space-y-3">
      {Object.entries(criterionScores).map(([id, cs]) => {
        const percentage = cs.max > 0 ? (cs.score / cs.max) * 100 : 0;
        const color =
          percentage >= 70
            ? "bg-green-500"
            : percentage >= 50
              ? "bg-amber-500"
              : "bg-red-500";
        const label = criterionNames?.[id] || id.replace(/_/g, " ");

        return (
          <div key={id}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-700 capitalize">
                {label}
              </span>
              <span className="text-gray-500 font-mono">
                {cs.score}/{cs.max}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            {cs.comment && (
              <p className="text-xs text-gray-500 mt-0.5">{cs.comment}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
