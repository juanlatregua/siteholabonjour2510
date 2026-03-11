"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";

const DAY_LABELS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const HOURS = Array.from({ length: 13 }, (_, i) => {
  const h = i + 8; // 08:00 to 20:00
  return { value: `${String(h).padStart(2, "0")}:00`, label: `${String(h).padStart(2, "0")}:00` };
});

const DAYS = [
  { value: "1", label: "Lunes" },
  { value: "2", label: "Martes" },
  { value: "3", label: "Miércoles" },
  { value: "4", label: "Jueves" },
  { value: "5", label: "Viernes" },
  { value: "6", label: "Sábado" },
];

interface Slot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  modality: string;
  active: boolean;
  notes: string | null;
  student: { id: string; name: string | null; email: string };
}

interface RecurringSlotManagerProps {
  students: { value: string; label: string }[];
}

export default function RecurringSlotManager({ students }: RecurringSlotManagerProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [studentId, setStudentId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [modality, setModality] = useState("ZOOM");
  const [notes, setNotes] = useState("");

  async function fetchSlots() {
    try {
      const res = await fetch("/api/zona-profesor/recurring-slots");
      const data = await res.json();
      if (data.ok) setSlots(data.slots);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSlots(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);

    try {
      const res = await fetch("/api/zona-profesor/recurring-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          dayOfWeek: parseInt(dayOfWeek, 10),
          startTime,
          modality,
          notes: notes || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.message || "Error al crear horario");
      } else {
        setSlots((prev) => [...prev, data.slot]);
        setStudentId("");
        setDayOfWeek("");
        setStartTime("");
        setModality("ZOOM");
        setNotes("");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/zona-profesor/recurring-slots/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setSlots((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      // ignore
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando horarios reservados...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Existing slots */}
      {slots.length > 0 ? (
        <div className="space-y-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">
                  {DAY_LABELS[slot.dayOfWeek]} {slot.startTime}
                </span>
                <span className="text-sm text-gray-600">
                  {slot.student.name || slot.student.email}
                </span>
                <Badge variant={slot.modality === "ZOOM" ? "info" : "success"}>
                  {slot.modality === "ZOOM" ? "Zoom" : "Presencial"}
                </Badge>
                {slot.notes && (
                  <span className="text-xs text-gray-400">{slot.notes}</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(slot.id)}
                className="text-xs font-medium text-red-500 hover:text-red-700"
              >
                Liberar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No hay horarios reservados.</p>
      )}

      {/* Create form */}
      <form onSubmit={handleCreate} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-3 text-sm font-semibold text-gray-700">Reservar nuevo horario</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Select
            label="Alumno"
            options={students}
            placeholder="Seleccionar alumno"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <Select
            label="Día"
            options={DAYS}
            placeholder="Seleccionar día"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          />
          <Select
            label="Hora"
            options={HOURS}
            placeholder="Seleccionar hora"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mt-3 flex items-end gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Modalidad</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setModality("ZOOM")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  modality === "ZOOM"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Zoom
              </button>
              <button
                type="button"
                onClick={() => setModality("PRESENCIAL")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  modality === "PRESENCIAL"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Presencial
              </button>
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">Notas</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Oficina C/Larios"
              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
            />
          </div>
          <Button type="submit" variant="primary" loading={creating} disabled={!studentId || !dayOfWeek || !startTime}>
            Reservar
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
