"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  startOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  format,
  isBefore,
} from "date-fns";
import { es } from "date-fns/locale/es";

interface SlotsByDay {
  [dayIso: string]: string[];
}

interface PublicSlotPickerProps {
  onSelect: (date: string, time: string) => void;
  slug?: string | null;
}

export default function PublicSlotPicker({ onSelect, slug }: PublicSlotPickerProps) {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [allSlots, setAllSlots] = useState<SlotsByDay>({});
  const [loading, setLoading] = useState(true);
  const [noSlots, setNoSlots] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSent, setWaitlistSent] = useState(false);
  const [selected, setSelected] = useState<{ date: string; time: string } | null>(null);
  const [teacherName, setTeacherName] = useState("");

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const url = slug
        ? `/api/public/disponibilidad?slug=${encodeURIComponent(slug)}`
        : "/api/public/disponibilidad";
      const res = await fetch(url);
      const data = await res.json();
      if (data.ok) {
        setAllSlots(data.slots ?? {});
        setTeacherName(data.teacherName || "");
        setNoSlots(Object.keys(data.slots ?? {}).length === 0);
      } else {
        setAllSlots({});
        setNoSlots(true);
      }
    } catch {
      setAllSlots({});
      setNoSlots(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const weekSlots: SlotsByDay = {};
  for (const day of days) {
    const dateStr = format(day, "yyyy-MM-dd");
    if (allSlots[dateStr]) {
      weekSlots[dateStr] = allSlots[dateStr];
    }
  }

  const canGoPrev = !isBefore(
    subWeeks(weekStart, 1),
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const maxWeek = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 3);
  const canGoNext = isBefore(weekStart, maxWeek);

  function handleSlotClick(dateStr: string, time: string) {
    setSelected({ date: dateStr, time });
    onSelect(dateStr, time);
  }

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail) return;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail, source: "no-slots-contratar" }),
      });
      setWaitlistSent(true);
    } catch {
      // silent
    }
  }

  if (loading) {
    return (
      <div style={{
        padding: "3rem 1rem",
        textAlign: "center",
        color: "#5f6b78",
      }}>
        <div style={{
          width: 32, height: 32, border: "3px solid rgba(30,45,74,0.1)",
          borderTopColor: "#E50046", borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 0.75rem",
        }} />
        Cargando disponibilidad...
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (noSlots) {
    return (
      <div style={{
        background: "#ffffff",
        border: "1px solid rgba(30,45,74,0.08)",
        borderRadius: "1rem",
        padding: "2rem",
        textAlign: "center",
        boxShadow: "0 2px 12px rgba(30,45,74,0.06)",
      }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem", color: "#1e2d4a" }}>
          Sin disponibilidad configurada
        </p>
        <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginBottom: "1.25rem" }}>
          La profesora aún no ha configurado su disponibilidad para estas semanas.
          Contacta por WhatsApp para reservar tu clase directamente.
        </p>
        <a
          href="https://wa.me/34685070304"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.7rem 1.5rem", borderRadius: "0.75rem",
            background: "#25D366", color: "white", border: "none",
            fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
          }}
        >
          Contactar por WhatsApp
        </a>
        <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(30,45,74,0.06)", paddingTop: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
            O déjanos tu email y te avisamos cuando se abran nuevas plazas:
          </p>
          {waitlistSent ? (
            <p style={{ color: "#10b981", fontWeight: 600, fontSize: "0.85rem" }}>Te avisaremos pronto.</p>
          ) : (
            <form onSubmit={handleWaitlist} style={{ display: "flex", gap: "0.5rem", maxWidth: 400, margin: "0 auto" }}>
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                style={{
                  flex: 1, padding: "0.6rem 1rem", borderRadius: "0.5rem",
                  border: "1px solid rgba(30,45,74,0.15)",
                  background: "#ffffff", color: "#1e2d4a",
                  fontSize: "0.85rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.6rem 1.25rem", borderRadius: "0.5rem",
                  background: "#E50046", color: "white", border: "none",
                  fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                }}
              >
                Avisar
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {teacherName && (
        <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginBottom: "0.75rem" }}>
          Profesora: <strong style={{ color: "#1e2d4a" }}>{teacherName}</strong>
        </p>
      )}

      {/* Week navigation */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1rem",
      }}>
        <button
          onClick={() => canGoPrev && setWeekStart(subWeeks(weekStart, 1))}
          disabled={!canGoPrev}
          style={{
            background: canGoPrev ? "#ffffff" : "#f0ede6", border: "1px solid rgba(30,45,74,0.12)",
            borderRadius: "0.5rem", padding: "0.4rem 0.75rem", color: canGoPrev ? "#1e2d4a" : "#9ca3af",
            cursor: canGoPrev ? "pointer" : "default", fontSize: "0.85rem",
          }}
        >
          ← Anterior
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e2d4a" }}>
          {format(weekStart, "d MMM", { locale: es })} — {format(addDays(weekStart, 6), "d MMM yyyy", { locale: es })}
        </span>
        <button
          onClick={() => canGoNext && setWeekStart(addWeeks(weekStart, 1))}
          disabled={!canGoNext}
          style={{
            background: canGoNext ? "#ffffff" : "#f0ede6", border: "1px solid rgba(30,45,74,0.12)",
            borderRadius: "0.5rem", padding: "0.4rem 0.75rem", color: canGoNext ? "#1e2d4a" : "#9ca3af",
            cursor: canGoNext ? "pointer" : "default", fontSize: "0.85rem",
          }}
        >
          Siguiente →
        </button>
      </div>

      {/* Empty week message */}
      {Object.keys(weekSlots).length === 0 && (
        <div style={{
          textAlign: "center", padding: "1.5rem", borderRadius: "0.75rem",
          background: "rgba(57,93,159,0.04)", border: "1px solid rgba(57,93,159,0.1)",
          marginBottom: "0.75rem",
        }}>
          <p style={{ fontSize: "0.9rem", color: "#3d4a5c", fontWeight: 600, marginBottom: "0.25rem" }}>
            No hay horarios disponibles esta semana
          </p>
          <p style={{ fontSize: "0.8rem", color: "#5f6b78" }}>
            Prueba la semana siguiente o <a href="https://wa.me/34685070304" target="_blank" rel="noopener noreferrer" style={{ color: "#E50046", fontWeight: 600 }}>contáctanos por WhatsApp</a>.
          </p>
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "0.5rem",
      }}>
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const daySlots = weekSlots[dateStr] || [];

          return (
            <div key={dateStr} style={{ minWidth: 0 }}>
              <p style={{
                textAlign: "center", fontSize: "0.75rem", fontWeight: 700,
                textTransform: "capitalize", marginBottom: "0.5rem",
                color: "#3d4a5c",
              }}>
                {format(day, "EEE d", { locale: es })}
              </p>
              {daySlots.length === 0 ? (
                <p style={{
                  textAlign: "center", fontSize: "0.7rem",
                  color: "#d1d5db", padding: "0.75rem 0",
                }}>
                  —
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {daySlots.map((time) => {
                    const isSelected = selected?.date === dateStr && selected?.time === time;
                    return (
                      <button
                        key={time}
                        onClick={() => handleSlotClick(dateStr, time)}
                        style={{
                          width: "100%", padding: "0.4rem 0.25rem",
                          borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 600,
                          border: isSelected
                            ? "1.5px solid #E50046"
                            : "1px solid rgba(30,45,74,0.12)",
                          background: isSelected
                            ? "rgba(229,0,70,0.08)"
                            : "#ffffff",
                          color: isSelected ? "#E50046" : "#1e2d4a",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
