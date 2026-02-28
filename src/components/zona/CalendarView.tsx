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

interface CalendarLesson {
  id: string;
  scheduledAt: string;
  status: string;
}

interface CalendarViewProps {
  lessons: CalendarLesson[];
}

const statusColor: Record<string, string> = {
  SCHEDULED: "bg-blue-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-400",
  NO_SHOW: "bg-yellow-500",
};

const dayNames = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];

export default function CalendarView({ lessons }: CalendarViewProps) {
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

          return (
            <div
              key={day.toISOString()}
              className={`relative flex min-h-[48px] flex-col items-center rounded-lg p-1 text-sm ${
                inMonth ? "text-gray-900" : "text-gray-300"
              } ${today ? "bg-[#0b3c6f]/5 font-semibold" : ""}`}
            >
              <span className="text-xs">{format(day, "d")}</span>
              {dayLessons.length > 0 && (
                <div className="mt-0.5 flex gap-0.5">
                  {dayLessons.map((l) => (
                    <span
                      key={l.id}
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        statusColor[l.status] || "bg-gray-400"
                      }`}
                      title={`${l.status} - ${format(new Date(l.scheduledAt), "HH:mm")}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-gray-100 pt-3">
        {Object.entries(statusColor).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
            {status === "SCHEDULED" && "Programada"}
            {status === "COMPLETED" && "Completada"}
            {status === "CANCELLED" && "Cancelada"}
            {status === "NO_SHOW" && "No asistencia"}
          </div>
        ))}
      </div>
    </div>
  );
}
