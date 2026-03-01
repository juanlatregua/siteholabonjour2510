"use client";

import React, { useState } from "react";
import { isSameDay, format } from "date-fns";
import CalendarView from "@/components/zona/CalendarView";
import type { CalendarLesson } from "@/components/zona/CalendarView";

const statusLabel: Record<string, string> = {
  SCHEDULED: "Programada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  NO_SHOW: "No asistencia",
};

const statusDot: Record<string, string> = {
  SCHEDULED: "bg-blue-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-400",
  NO_SHOW: "bg-yellow-500",
};

interface Props {
  lessons: CalendarLesson[];
}

export default function CalendarioAlumnoClient({ lessons }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const selectedLessons = selectedDate
    ? lessons.filter((l) => isSameDay(new Date(l.scheduledAt), selectedDate))
    : [];

  return (
    <>
      <CalendarView
        lessons={lessons}
        onDayClick={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
      />

      {selectedDate && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">
            {format(selectedDate, "EEEE d 'de' MMMM")} &mdash;{" "}
            {selectedLessons.length}{" "}
            {selectedLessons.length === 1 ? "clase" : "clases"}
          </h3>

          {selectedLessons.length === 0 ? (
            <p className="mt-2 text-sm text-gray-400">
              No hay clases este dia.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-gray-100">
              {selectedLessons.map((l) => (
                <li
                  key={l.id}
                  className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span
                    className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${statusDot[l.status] || "bg-gray-400"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(l.scheduledAt), "HH:mm")} &mdash;{" "}
                      {l.personName || "Profesor"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {statusLabel[l.status] || l.status}
                      {l.focus && <> &middot; {l.focus}</>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
