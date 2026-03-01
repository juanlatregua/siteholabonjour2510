"use client";

import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
} from "date-fns";
import { es } from "date-fns/locale/es";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface CalendarLesson {
  id: string;
  scheduledAt: string;
  status: string;
  personName?: string;
  focus?: string | null;
}

interface CalendarViewProps {
  lessons: CalendarLesson[];
  onDayClick?: (date: Date) => void;
  selectedDate?: Date | null;
}

const statusColor: Record<string, string> = {
  SCHEDULED: "bg-blue-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-400",
  NO_SHOW: "bg-yellow-500",
};

const statusLabel: Record<string, string> = {
  SCHEDULED: "Programada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  NO_SHOW: "No asistencia",
};

const dayNames = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

export default function CalendarView({ lessons, onDayClick, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  function getLessonsForDay(day: Date): CalendarLesson[] {
    return lessons.filter((l) => isSameDay(new Date(l.scheduledAt), day));
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label="Mes anterior"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-semibold capitalize text-gray-900">
          {format(currentMonth, "MMMM yyyy", { locale: es })}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label="Mes siguiente"
        >
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {dayNames.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-medium uppercase text-gray-400"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const dayLessons = getLessonsForDay(day);
          const hasLessons = dayLessons.length > 0;
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

          const tooltipParts = dayLessons.map(
            (l) =>
              `${format(new Date(l.scheduledAt), "HH:mm")} - ${statusLabel[l.status] || l.status}${l.personName ? ` (${l.personName})` : ""}`,
          );
          const tooltip = tooltipParts.join("\n");

          return (
            <button
              type="button"
              key={day.toISOString()}
              onClick={() => {
                if (hasLessons && onDayClick) onDayClick(day);
              }}
              disabled={!hasLessons}
              title={hasLessons ? tooltip : undefined}
              className={`relative flex min-h-[48px] flex-col items-center rounded-lg p-1 text-sm transition-colors ${
                inMonth ? "text-gray-900" : "text-gray-300"
              } ${today ? "bg-[#0b3c6f]/5 font-semibold" : ""} ${
                isSelected ? "ring-2 ring-[#0b3c6f] bg-[#0b3c6f]/10" : ""
              } ${hasLessons ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}`}
            >
              <span className="text-xs">{format(day, "d")}</span>
              {hasLessons && (
                <div className="mt-0.5 flex flex-col items-center gap-0.5">
                  <div className="flex gap-0.5">
                    {dayLessons.slice(0, 3).map((l) => (
                      <span
                        key={l.id}
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          statusColor[l.status] || "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  {dayLessons.length > 3 && (
                    <span className="text-[9px] leading-none text-gray-400">
                      +{dayLessons.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-gray-100 pt-3">
        {Object.entries(statusColor).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
            {statusLabel[status]}
          </div>
        ))}
      </div>
    </div>
  );
}
