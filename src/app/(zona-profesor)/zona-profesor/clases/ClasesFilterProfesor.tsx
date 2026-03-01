"use client";

import React, { useState } from "react";
import LessonCard from "@/components/zona/LessonCard";
import EmptyState from "@/components/ui/EmptyState";
import { FiBook } from "react-icons/fi";
import Link from "next/link";

interface LessonData {
  id: string;
  scheduledAt: string;
  status: string;
  focus: string | null;
  zoomLink: string | null;
  durationMinutes: number;
  studentName: string;
}

interface ClasesFilterProfesorProps {
  upcoming: LessonData[];
  past: LessonData[];
}

export default function ClasesFilterProfesor({ upcoming, past }: ClasesFilterProfesorProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const lessons = tab === "upcoming" ? upcoming : past;

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "upcoming"
              ? "border-b-2 border-[#0b3c6f] text-[#0b3c6f]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Proximas ({upcoming.length})
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "past"
              ? "border-b-2 border-[#0b3c6f] text-[#0b3c6f]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pasadas ({past.length})
        </button>
      </div>

      {/* Lesson list */}
      {lessons.length > 0 ? (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/zona-profesor/clases/${lesson.id}`} className="block">
              <LessonCard
                scheduledAt={lesson.scheduledAt}
                status={lesson.status}
                focus={lesson.focus}
                teacherName={lesson.studentName}
                zoomLink={lesson.zoomLink}
                durationMinutes={lesson.durationMinutes}
                personLabel="Alumno"
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiBook className="h-12 w-12" />}
          title={tab === "upcoming" ? "Sin clases proximas" : "Sin clases pasadas"}
          description={
            tab === "upcoming"
              ? "No hay clases programadas."
              : "No hay clases completadas o canceladas."
          }
        />
      )}
    </div>
  );
}
