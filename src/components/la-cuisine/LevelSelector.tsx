"use client";

import { useState } from "react";
import type { RecipeVersion } from "@/data/recipes/recipes";

export default function LevelSelector({
  versions,
  initialLevel,
}: {
  versions: RecipeVersion[];
  initialLevel?: string;
}) {
  const [activeLevel, setActiveLevel] = useState(
    initialLevel ?? versions[0]?.level ?? "A1"
  );

  const activeVersion = versions.find((v) => v.level === activeLevel) ?? versions[0];

  return (
    <div>
      {/* Level Tabs */}
      <div className="mb-4 flex gap-2">
        {versions.map((version) => (
          <button
            key={version.level}
            onClick={() => setActiveLevel(version.level)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeLevel === version.level
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={
              activeLevel === version.level
                ? { backgroundColor: "var(--vie-navy)", color: "white" }
                : undefined
            }
          >
            {version.level}
          </button>
        ))}
      </div>

      {/* Version Content */}
      {activeVersion && (
        <div
          className="rounded-xl border p-5"
          style={{
            borderColor: "var(--vie-gold-light)",
            backgroundColor: "var(--vie-cream)",
          }}
        >
          <p
            className="mb-2 text-xs font-bold uppercase tracking-wide"
            style={{ color: "var(--vie-navy)" }}
          >
            Nivel {activeVersion.level}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--vie-navy)", fontFamily: "var(--font-body)" }}
          >
            {activeVersion.instructions}
          </p>
        </div>
      )}
    </div>
  );
}
