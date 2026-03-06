"use client";

import { useState, useEffect, useCallback } from "react";

interface ExamSession {
  id: string;
  examType: string;
  level: string;
  center: string;
  centerType: string;
  city: string;
  province: string;
  autonomousCommunity: string;
  registrationStart: string | null;
  registrationEnd: string | null;
  writtenExamDate: string | null;
  oralExamStart: string | null;
  oralExamEnd: string | null;
  resultsDate: string | null;
  fee: number | null;
  sourceUrl: string | null;
  notes: string | null;
}

const COMMUNITIES = [
  "Andalucía",
  "Aragón",
  "Cataluña",
  "Comunidad de Madrid",
  "Comunitat Valenciana",
  "País Vasco",
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getRegistrationStatus(start: string | null, end: string | null) {
  if (!start || !end) return { label: "Sin información", color: "bg-gray-100 text-gray-600" };
  const now = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (now < s) return { label: "Próximamente", color: "bg-blue-100 text-blue-700" };
  if (now <= e) return { label: "Matrícula abierta", color: "bg-green-100 text-green-700" };
  return { label: "Matrícula cerrada", color: "bg-red-100 text-red-700" };
}

export default function ExamCalendar() {
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [examType, setExamType] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [community, setCommunity] = useState<string>("");
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderSaving, setReminderSaving] = useState<string | null>(null);
  const [reminderDone, setReminderDone] = useState<Set<string>>(new Set());

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (examType) params.set("examType", examType);
    if (level) params.set("level", level);
    if (community) params.set("community", community);

    const res = await fetch(`/api/exams?${params.toString()}`);
    if (res.ok) {
      setSessions(await res.json());
    }
    setLoading(false);
  }, [examType, level, community]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleReminder = async (sessionId: string) => {
    if (!reminderEmail) return;
    setReminderSaving(sessionId);
    try {
      for (const type of ["REGISTRATION_OPEN", "REGISTRATION_CLOSING", "EXAM_WEEK"]) {
        await fetch("/api/exams/reminders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            examSessionId: sessionId,
            email: reminderEmail,
            reminderType: type,
          }),
        });
      }
      setReminderDone((prev) => new Set(prev).add(sessionId));
    } finally {
      setReminderSaving(null);
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Todos los exámenes</option>
          <option value="DELF">DELF</option>
          <option value="DALF">DALF</option>
          <option value="EOI">EOI</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Todos los niveles</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Toda España</option>
          {COMMUNITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Reminder email input */}
      <div className="flex gap-2 mb-6">
        <input
          type="email"
          value={reminderEmail}
          onChange={(e) => setReminderEmail(e.target.value)}
          placeholder="Tu email para recordatorios"
          className="flex-1 max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#395D9F] border-t-transparent" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No se encontraron sesiones de examen con esos filtros.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => {
            const status = getRegistrationStatus(s.registrationStart, s.registrationEnd);
            const isDone = reminderDone.has(s.id);
            const isSaving = reminderSaving === s.id;

            return (
              <div
                key={s.id}
                className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#395D9F]">
                      {s.examType} {s.level}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-800">{s.center}</p>
                <p className="text-xs text-gray-500 mb-3">
                  {s.city}, {s.autonomousCommunity}
                </p>

                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Matrícula:</span>
                    <span>
                      {formatDate(s.registrationStart)} — {formatDate(s.registrationEnd)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Escrito:</span>
                    <span>{formatDate(s.writtenExamDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Oral:</span>
                    <span>
                      {formatDate(s.oralExamStart)}
                      {s.oralExamEnd ? ` — ${formatDate(s.oralExamEnd)}` : ""}
                    </span>
                  </div>
                  {s.fee && (
                    <div className="flex justify-between">
                      <span>Precio:</span>
                      <span className="font-medium">{s.fee} €</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  {isDone ? (
                    <span className="text-xs text-green-700 font-medium">
                      Recordatorio activado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleReminder(s.id)}
                      disabled={!reminderEmail || isSaving}
                      className="text-xs text-[#E50046] font-medium hover:underline disabled:opacity-50"
                    >
                      {isSaving ? "Guardando..." : "Activar recordatorio"}
                    </button>
                  )}
                  {s.sourceUrl && (
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#395D9F] hover:underline"
                    >
                      Más info
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
