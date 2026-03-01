"use client";

import { useState, useMemo } from "react";
import RecipeCard from "@/components/la-cuisine/RecipeCard";
import type { Recipe } from "@/data/recipes/recipes";

const DIFFICULTIES = ["Todas", "Facil", "Intermedio", "Avanzado"] as const;
const LEVELS = ["All", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  const [activeDifficulty, setActiveDifficulty] = useState<string>("Todas");
  const [activeLevel, setActiveLevel] = useState<string>("All");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchesDifficulty =
        activeDifficulty === "Todas" || r.difficulty === activeDifficulty;
      const matchesLevel =
        activeLevel === "All" ||
        r.versions.some((v) => v.level === activeLevel);
      return matchesDifficulty && matchesLevel;
    });
  }, [recipes, activeDifficulty, activeLevel]);

  return (
    <div>
      {/* Difficulty Filters */}
      <div className="mb-3">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--vie-navy)" }}
        >
          Dificultad
        </p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeDifficulty === diff
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={
                activeDifficulty === diff
                  ? { backgroundColor: "var(--vie-wine)", color: "white" }
                  : undefined
              }
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Level Filters */}
      <div className="mb-6">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--vie-navy)" }}
        >
          Nivel CEFR
        </p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeLevel === level
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={
                activeLevel === level
                  ? { backgroundColor: "var(--vie-navy)", color: "white" }
                  : undefined
              }
            >
              {level === "All" ? "Todos" : level}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No se encontraron recetas con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
