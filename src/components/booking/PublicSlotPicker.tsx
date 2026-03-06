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

  // Filter allSlots for the current week view
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
        color: "rgba(255,255,255,0.6)",
      }}>
        <div style={{
          width: 32, height: 32, border: "3px solid rgba(255,255,255,0.15)",
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
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          No hay plazas disponibles ahora mismo
        </p>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem" }}>
          Déjanos tu email y te avisamos cuando se abran nuevas plazas.
        </p>
        {waitlistSent ? (
          <p style={{ color: "#10b981", fontWeight: 600 }}>Te avisaremos pronto.</p>
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
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)", color: "white",
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
    );
  }

  return (
    <div>
      {teacherName && (
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>
          Profesora: <strong style={{ color: "rgba(255,255,255,0.85)" }}>{teacherName}</strong>
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
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0.5rem", padding: "0.4rem 0.75rem", color: canGoPrev ? "white" : "rgba(255,255,255,0.3)",
            cursor: canGoPrev ? "pointer" : "default", fontSize: "0.85rem",
          }}
        >
          ← Anterior
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          {format(weekStart, "d MMM", { locale: es })} — {format(addDays(weekStart, 6), "d MMM yyyy", { locale: es })}
        </span>
        <button
          onClick={() => canGoNext && setWeekStart(addWeeks(weekStart, 1))}
          disabled={!canGoNext}
          style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0.5rem", padding: "0.4rem 0.75rem", color: canGoNext ? "white" : "rgba(255,255,255,0.3)",
            cursor: canGoNext ? "pointer" : "default", fontSize: "0.85rem",
          }}
        >
          Siguiente →
        </button>
      </div>

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
                color: "rgba(255,255,255,0.7)",
              }}>
                {format(day, "EEE d", { locale: es })}
              </p>
              {daySlots.length === 0 ? (
                <p style={{
                  textAlign: "center", fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.25)", padding: "0.75rem 0",
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
                            : "1px solid rgba(255,255,255,0.15)",
                          background: isSelected
                            ? "rgba(229,0,70,0.2)"
                            : "rgba(255,255,255,0.06)",
                          color: isSelected ? "#E50046" : "rgba(255,255,255,0.8)",
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
