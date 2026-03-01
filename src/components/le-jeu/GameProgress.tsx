import React from "react";

interface GameProgressProps {
  currentScene: number;
  totalScenes: number;
  score: number;
}

export default function GameProgress({
  currentScene,
  totalScenes,
  score,
}: GameProgressProps) {
  const pct = totalScenes > 0 ? Math.round(((currentScene + 1) / totalScenes) * 100) : 0;

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3"
      style={{ background: "var(--vie-cream)" }}
    >
      {/* Scene counter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500">Escena</span>
        <span
          className="text-sm font-bold"
          style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
        >
          {currentScene + 1}/{totalScenes}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: "var(--vie-gold)",
            }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5">
        <svg
          className="h-4 w-4"
          style={{ color: "var(--vie-gold)" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span
          className="text-sm font-bold"
          style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}
