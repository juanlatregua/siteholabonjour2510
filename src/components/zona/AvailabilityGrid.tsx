"use client";

import React, { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

interface AvailabilityGridProps {
  teacherId?: string;
}

interface SlotState {
  [key: string]: boolean; // key = "dayOfWeek-startTime", e.g. "1-09:00"
}

const DAY_LABELS = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
// dayOfWeek mapping: Monday=1, Tuesday=2, ..., Sunday=0
const DAY_VALUES = [1, 2, 3, 4, 5, 6, 0];

const TIME_SLOTS: string[] = [];
for (let h = 8; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
}

export default function AvailabilityGrid({}: AvailabilityGridProps) {
  const [slots, setSlots] = useState<SlotState>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/zona-profesor/disponibilidad");
      const data = await res.json();
      if (data.ok && data.availability) {
        const newSlots: SlotState = {};
        for (const slot of data.availability) {
          const key = `${slot.dayOfWeek}-${slot.startTime}`;
          newSlots[key] = slot.active;
        }
        setSlots(newSlots);
      }
    } catch {
      setError("Error al cargar la disponibilidad");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  function toggleSlot(dayOfWeek: number, startTime: string) {
    const key = `${dayOfWeek}-${startTime}`;
    setSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSuccess(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Build the payload: list of active slots
      const activeSlots: { dayOfWeek: number; startTime: string; endTime: string }[] = [];
      for (const [key, active] of Object.entries(slots)) {
        if (active) {
          const [dayStr, startTime] = key.split("-");
          const dayOfWeek = parseInt(dayStr, 10);
          const hour = parseInt(startTime.split(":")[0], 10);
          const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
          activeSlots.push({ dayOfWeek, startTime, endTime });
        }
      }

      const res = await fetch("/api/zona-profesor/disponibilidad", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots: activeSlots }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error al guardar");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la disponibilidad");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#0b3c6f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Hora</th>
              {DAY_LABELS.map((label) => (
                <th
                  key={label}
                  className="px-1 py-2 text-center text-xs font-medium text-gray-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time) => (
              <tr key={time}>
                <td className="whitespace-nowrap px-2 py-1 text-xs font-medium text-gray-600">
                  {time}
                </td>
                {DAY_VALUES.map((dayOfWeek, idx) => {
                  const key = `${dayOfWeek}-${time}`;
                  const isActive = !!slots[key];
                  return (
                    <td key={`${dayOfWeek}-${time}`} className="px-1 py-1">
                      <button
                        onClick={() => toggleSlot(dayOfWeek, time)}
                        className={`h-8 w-full rounded text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#0f5da0] text-white"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        aria-label={`${DAY_LABELS[idx]} ${time} - ${isActive ? "Activo" : "Inactivo"}`}
                      >
                        {isActive ? time : ""}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Disponibilidad guardada correctamente.</p>}

      <Button variant="primary" size="md" loading={saving} onClick={handleSave}>
        Guardar disponibilidad
      </Button>
    </div>
  );
}
