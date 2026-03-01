"use client";

import { useState, useMemo } from "react";
import FilmCard from "@/components/le-cinema/FilmCard";
import type { Film } from "@/data/films/films";

const LEVELS = ["All", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

export default function FilmGrid({ films }: { films: Film[] }) {
  const [activeLevel, setActiveLevel] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return films.filter((f) => {
      const matchesLevel = activeLevel === "All" || f.level === activeLevel;
      const matchesSearch =
        search.trim() === "" ||
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.director.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [films, activeLevel, search]);

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por titulo o director..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[var(--vie-bleu)] focus:outline-none focus:ring-2 focus:ring-[var(--vie-bleu)]/30"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Level Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
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
            {level}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No se encontraron peliculas con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      )}
    </div>
  );
}
