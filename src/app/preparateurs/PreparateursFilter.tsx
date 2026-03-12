"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Profile {
  id: string;
  slug: string;
  displayName: string;
  bio: string;
  photo: string | null;
  languages: string[];
  specialties: string[];
  levels: string[];
  hourlyRate: number;
  avgRating: number | null;
  reviewCount: number;
  certificationVerified: boolean;
}

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function PreparateursFilter({ profiles }: { profiles: Profile[] }) {
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("");

  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach((p) => p.specialties.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [profiles]);

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (levelFilter && !p.levels.includes(levelFilter)) return false;
      if (specialtyFilter && !p.specialties.includes(specialtyFilter)) return false;
      return true;
    });
  }, [profiles, levelFilter, specialtyFilter]);

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(30,45,74,0.15)",
            fontSize: "0.85rem",
            background: "white",
            color: "#1e2d4a",
          }}
        >
          <option value="">Todos los niveles</option>
          {CEFR_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {allSpecialties.length > 0 && (
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(30,45,74,0.15)",
              fontSize: "0.85rem",
              background: "white",
              color: "#1e2d4a",
            }}
          >
            <option value="">Todas las especialidades</option>
            {allSpecialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {(levelFilter || specialtyFilter) && (
          <button
            onClick={() => {
              setLevelFilter("");
              setSpecialtyFilter("");
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "rgba(229,0,70,0.08)",
              color: "#E50046",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results count */}
      <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginBottom: "1rem" }}>
        {filtered.length} préparateur{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((p) => {
          const hourlyEur = (p.hourlyRate / 100).toFixed(0);
          return (
            <Link
              key={p.id}
              href={`/preparateurs/${p.slug}`}
              style={{
                display: "block",
                background: "#ffffff",
                border: "1px solid rgba(30,45,74,0.08)",
                borderRadius: "0.875rem",
                padding: "1.25rem",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(30,45,74,0.08)";
                e.currentTarget.style.borderColor = "rgba(229,0,70,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(30,45,74,0.08)";
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={p.displayName}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg, #E50046, #6B3FA0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    {p.displayName.charAt(0)}
                  </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {p.displayName}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#5f6b78",
                      marginTop: "0.25rem",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {p.bio.length > 120 ? p.bio.slice(0, 120) + "..." : p.bio}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div
                style={{
                  display: "flex",
                  gap: "0.35rem",
                  flexWrap: "wrap",
                  marginTop: "0.75rem",
                }}
              >
                {p.levels.map((l) => (
                  <span
                    key={l}
                    style={{
                      padding: "0.15rem 0.5rem",
                      borderRadius: "0.5rem",
                      background: "rgba(229,0,70,0.12)",
                      color: "#E50046",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* Bottom row: rating + price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "0.75rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(30,45,74,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {p.avgRating !== null && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#f59e0b",
                      }}
                    >
                      {"★".repeat(Math.round(p.avgRating))} {p.avgRating.toFixed(1)}
                    </span>
                  )}
                  {p.reviewCount > 0 && (
                    <span style={{ fontSize: "0.75rem", color: "#5f6b78" }}>
                      ({p.reviewCount})
                    </span>
                  )}
                  {p.certificationVerified && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        padding: "0.1rem 0.5rem",
                        background: "rgba(14,159,110,0.15)",
                        color: "#10b981",
                        borderRadius: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      FEI
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#395D9F",
                  }}
                >
                  {hourlyEur} €/h
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "#5f6b78",
          }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            No se encontraron préparateurs con esos filtros.
          </p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Prueba a cambiar los filtros o contáctanos para más información.
          </p>
        </div>
      )}
    </div>
  );
}
