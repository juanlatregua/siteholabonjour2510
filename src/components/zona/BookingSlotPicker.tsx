"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  startOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  format,
  getISOWeek,
  getYear,
} from "date-fns";
import { es } from "date-fns/locale/es";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface BookingSlotPickerProps {
  teacherId: string;
  onSelect: (date: string, time: string) => void;
}

interface SlotsByDay {
  [dayIso: string]: string[]; // e.g. { "2026-03-02": ["09:00","10:00"] }
}

export default function BookingSlotPicker({
  teacherId,
  onSelect,
}: BookingSlotPickerProps) {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [slots, setSlots] = useState<SlotsByDay>({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<{ date: string; time: string } | null>(
    null
  );

  const weekCode = `${getYear(weekStart)}-W${String(getISOWeek(weekStart)).padStart(2, "0")}`;

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/zona-alumno/reservar/disponibilidad?teacherId=${teacherId}&week=${weekCode}`
      );
      const data = await res.json();
      if (data.ok) {
        setSlots(data.slots ?? {});
      } else {
        setSlots({});
      }
    } catch {
      setSlots({});
    } finally {
      setLoading(false);
    }
  }, [teacherId, weekCode]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  function handleSlotClick(dateStr: string, time: string) {
    setSelected({ date: dateStr, time });
    onSelect(dateStr, time);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Week navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setWeekStart(subWeeks(weekStart, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label="Semana anterior"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-sm font-semibold text-gray-900">
          Semana {weekCode}
        </h3>
        <button
          onClick={() => setWeekStart(addWeeks(weekStart, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label="Semana siguiente"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <LoadingSpinner className="py-12" />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const daySlots = slots[dateStr] || [];

            return (
              <div key={dateStr} className="min-w-0">
                <p className="mb-2 text-center text-xs font-semibold capitalize text-gray-700">
                  {format(day, "EEE d", { locale: es })}
                </p>
                {daySlots.length === 0 ? (
                  <p className="py-3 text-center text-xs text-gray-400">
                    Sin horarios
                  </p>
                ) : (
                  <div className="space-y-1">
                    {daySlots.map((time) => {
                      const isSelected =
                        selected?.date === dateStr && selected?.time === time;
                      return (
                        <button
                          key={time}
                          onClick={() => handleSlotClick(dateStr, time)}
                          className={`w-full rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                            isSelected
                              ? "border-[#0b3c6f] bg-[#0b3c6f] text-white"
                              : "border-gray-200 text-gray-700 hover:border-[#0b3c6f] hover:bg-[#0b3c6f]/5"
                          }`}
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
      )}
    </div>
  );
}
