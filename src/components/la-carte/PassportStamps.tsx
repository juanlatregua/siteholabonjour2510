"use client";

import React, { useEffect, useState } from "react";
import { regions } from "@/data/regions/regions";

const STORAGE_KEY = "hb_passport_stamps";

export default function PassportStamps() {
  const [visitedSlugs, setVisitedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setVisitedSlugs(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const total = regions.length;
  const visited = visitedSlugs.length;
  const pct = total > 0 ? Math.round((visited / total) * 100) : 0;

  return (
    <div
      className="vie-card p-5"
      style={{ borderTop: "3px solid var(--vie-gold)" }}
    >
      <h3
        className="text-lg font-semibold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--vie-navy)",
        }}
      >
        Passeport
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        {visited}/{total} regiones visitadas
      </p>

      {/* Progress bar */}
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full"
        style={{ background: "var(--vie-cream)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "var(--vie-gold)",
          }}
        />
      </div>

      {/* Stamp circles */}
      <div className="mt-4 flex flex-wrap gap-2">
        {regions.map((region) => {
          const isVisited = visitedSlugs.includes(region.slug);
          return (
            <div
              key={region.slug}
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: isVisited ? "var(--vie-gold)" : "#e5e7eb",
                color: isVisited ? "white" : "#9ca3af",
                border: isVisited
                  ? "2px solid var(--vie-gold)"
                  : "2px dashed #d1d5db",
                fontFamily: "var(--font-display)",
              }}
              title={`${region.name}${isVisited ? " - Visitada" : ""}`}
            >
              {region.name
                .split(/[\s-]/)
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          );
        })}
      </div>

      {visited === total && (
        <p
          className="mt-3 text-sm font-semibold"
          style={{ color: "var(--vie-gold)" }}
        >
          Felicitations ! Vous avez visite toutes les regions !
        </p>
      )}
    </div>
  );
}
