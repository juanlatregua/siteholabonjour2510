"use client";

import React, { useState } from "react";
import LessonCard from "@/components/zona/LessonCard";
import EmptyState from "@/components/ui/EmptyState";
import { FiBook, FiStar } from "react-icons/fi";
import Link from "next/link";

interface LessonData {
  id: string;
  scheduledAt: string;
  status: string;
  focus: string | null;
  zoomLink: string | null;
  zoomStartUrl?: string | null;
  durationMinutes: number;
  studentName: string;
  hasReview: boolean;
  recordingUrl?: string | null;
  cancellationRequestedAt?: string | null;
  modality?: string | null;
}

interface ClasesFilterProfesorProps {
  upcoming: LessonData[];
  past: LessonData[];
}

export default function ClasesFilterProfesor({ upcoming, past }: ClasesFilterProfesorProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [sendingReview, setSendingReview] = useState<string | null>(null);
  const [sentReviews, setSentReviews] = useState<Set<string>>(new Set());

  const lessons = tab === "upcoming" ? upcoming : past;

  async function handlePedirResena(lessonId: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSendingReview(lessonId);
    try {
      const res = await fetch("/api/zona-profesor/resena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) {
        setSentReviews((prev) => new Set(prev).add(lessonId));
      } else {
        const data = await res.json();
        alert(data.error || "Error al enviar solicitud");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setSendingReview(null);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab("upcoming")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "upcoming"
              ? "border-b-2 border-[#1e2d4a] text-[#1e2d4a]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Próximas ({upcoming.length})
        </button>
        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            tab === "past"
              ? "border-b-2 border-[#1e2d4a] text-[#1e2d4a]"
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
            <div key={lesson.id} className="relative">
              <Link href={`/zona-profesor/clases/${lesson.id}`} className="block">
                <LessonCard
                  scheduledAt={lesson.scheduledAt}
                  status={lesson.status}
                  focus={lesson.focus}
                  teacherName={lesson.studentName}
                  zoomLink={lesson.zoomLink}
                  zoomStartUrl={lesson.zoomStartUrl}
                  durationMinutes={lesson.durationMinutes}
                  personLabel="Alumno"
                  isTeacher
                  recordingUrl={lesson.recordingUrl}
                  cancellationRequestedAt={lesson.cancellationRequestedAt}
                  modality={lesson.modality}
                />
              </Link>
              {lesson.status === "COMPLETED" && !lesson.hasReview && !sentReviews.has(lesson.id) && (
                <button
                  onClick={(e) => handlePedirResena(lesson.id, e)}
                  disabled={sendingReview === lesson.id}
                  className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-[#395D9F] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#2e4d8a] disabled:opacity-50"
                >
                  <FiStar className="h-3.5 w-3.5" />
                  {sendingReview === lesson.id ? "Enviando..." : "Pedir reseña"}
                </button>
              )}
              {(lesson.hasReview || sentReviews.has(lesson.id)) && lesson.status === "COMPLETED" && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                  <FiStar className="h-3.5 w-3.5" />
                  Reseña solicitada
                </span>
              )}
            </div>
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
