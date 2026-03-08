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

export interface CalendarAvailability {
  dayOfWeek: number; // 0=Sunday, 1=Monday ... 6=Saturday
  startTime: string; // "09:00"
  endTime: string;
}

interface CalendarViewProps {
  lessons: CalendarLesson[];
  availability?: CalendarAvailability[];
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

export default function CalendarView({ lessons, availability, onDayClick, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  function getLessonsForDay(day: Date): CalendarLesson[] {
    return lessons.filter((l) => isSameDay(new Date(l.scheduledAt), day));
  }

  function getAvailableSlotsForDay(day: Date): CalendarAvailability[] {
    if (!availability) return [];
    const dow = day.getDay(); // 0=Sunday
    return availability.filter((a) => a.dayOfWeek === dow);
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
          const daySlots = getAvailableSlotsForDay(day);
          const hasLessons = dayLessons.length > 0;
          const hasAvailability = daySlots.length > 0;
          const hasContent = hasLessons || hasAvailability;
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

          const tooltipParts = [
            ...dayLessons.map(
              (l) =>
                `${format(new Date(l.scheduledAt), "HH:mm")} - ${statusLabel[l.status] || l.status}${l.personName ? ` (${l.personName})` : ""}`,
            ),
            ...(hasAvailability && !hasLessons ? [`${daySlots.length} huecos disponibles`] : []),
          ];
          const tooltip = tooltipParts.join("\n");

          return (
            <button
              type="button"
              key={day.toISOString()}
              onClick={() => {
                if (hasContent && onDayClick) onDayClick(day);
              }}
              disabled={!hasContent}
              title={hasContent ? tooltip : undefined}
              className={`relative flex min-h-[48px] flex-col items-center rounded-lg p-1 text-sm transition-colors ${
                inMonth ? "text-gray-900" : "text-gray-300"
              } ${today ? "bg-[#1e2d4a]/5 font-semibold" : ""} ${
                isSelected ? "ring-2 ring-[#1e2d4a] bg-[#1e2d4a]/10" : ""
              } ${hasContent ? "cursor-pointer hover:bg-gray-50" : "cursor-default"} ${
                hasAvailability && !hasLessons && inMonth ? "bg-green-50/50" : ""
              }`}
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
              {hasAvailability && !hasLessons && inMonth && (
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
        {availability && availability.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Disponible
          </div>
        )}
      </div>
    </div>
  );
}
