"use client";

import React, { useEffect, useState } from "react";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  timeMs: number;
  createdAt: string;
}

interface LeaderboardProps {
  weekNumber?: number;
}

export default function Leaderboard({ weekNumber }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = weekNumber
          ? `/api/le-marche/leaderboard?weekNumber=${weekNumber}`
          : "/api/le-marche/leaderboard";
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok || !json.ok) {
          setError(json.message || "Error al cargar el ranking");
          return;
        }

        setEntries(json.results);
      } catch {
        setError("Error de conexion");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [weekNumber]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="vie-card p-8 text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: "var(--vie-sage, #8fbc8f)", borderTopColor: "transparent" }}
        />
        <p className="mt-3 text-sm text-gray-500">Cargando ranking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vie-card p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="vie-card p-8 text-center">
        <p
          className="text-base font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy, #1e3a5f)" }}
        >
          Todavia no hay resultados
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Se el primero en completar el quiz de esta semana.
        </p>
      </div>
    );
  }

  return (
    <div className="vie-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b text-left text-xs uppercase tracking-wider"
              style={{ color: "var(--vie-navy, #1e3a5f)" }}
            >
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3 text-center">Puntos</th>
              <th className="px-4 py-3 text-right">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={entry.id}
                className="border-b last:border-b-0"
                style={{
                  backgroundColor:
                    idx === 0
                      ? "#fef9c3"
                      : idx === 1
                        ? "#f1f5f9"
                        : idx === 2
                          ? "#fff7ed"
                          : "transparent",
                }}
              >
                <td className="px-4 py-3 font-bold" style={{ color: "var(--vie-navy, #1e3a5f)" }}>
                  {idx + 1}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--vie-navy, #1e3a5f)" }}>
                  {entry.name}
                </td>
                <td className="px-4 py-3 text-center font-semibold">
                  {entry.score}
                </td>
                <td className="px-4 py-3 text-right text-gray-500">
                  {formatTime(entry.timeMs)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
