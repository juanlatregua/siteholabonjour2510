"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookingSlotPicker from "@/components/zona/BookingSlotPicker";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FiPackage } from "react-icons/fi";

interface Teacher {
  id: string;
  name: string | null;
}

interface ActivePack {
  id: string;
  hoursTotal: number;
  hoursUsed: number;
  levelRange: string;
}

export default function ReservarPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [focus, setFocus] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePack, setActivePack] = useState<ActivePack | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch available teachers and pack status
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/zona-alumno/dashboard");
        const data = await res.json();
        if (data.ok) {
          if (data.teachers) {
            setTeachers(data.teachers);
            if (data.teachers.length > 0) {
              setSelectedTeacherId(data.teachers[0].id);
            }
          }
          setActivePack(data.activePack ?? null);
        }
      } catch {
        // handled below
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function handleSlotSelect(date: string, time: string) {
    setSelectedDate(date);
    setSelectedTime(time);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedTeacherId) {
      setMessage({
        type: "error",
        text: "Selecciona un horario disponible antes de reservar.",
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/zona-alumno/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: selectedTeacherId,
          date: selectedDate,
          time: selectedTime,
          focus: focus || undefined,
          notes: notes || undefined,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessage({ type: "success", text: "Clase reservada correctamente." });
        setSelectedDate("");
        setSelectedTime("");
        setFocus("");
        setNotes("");
      } else {
        setMessage({
          type: "error",
          text: data.message || "Error al reservar la clase.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Error de conexión. Inténtalo de nuevo.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#1e2d4a]" />
      </div>
    );
  }

  if (!activePack) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reservar Clase</h2>
        </div>
        <EmptyState
          icon={<FiPackage className="h-12 w-12" />}
          title="Necesitas un pack activo"
          description="Para reservar clases necesitas un pack de horas. Contrata uno y vuelve aquí para elegir tu horario."
          action={
            <Link
              href="/contratar"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#E50046] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c7003d]"
            >
              Contratar pack
            </Link>
          }
        />
      </div>
    );
  }

  const hoursRemaining = activePack.hoursTotal - activePack.hoursUsed;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reservar Clase</h2>
        <p className="mt-1 text-sm text-gray-500">
          Selecciona un horario disponible y completa la reserva.
        </p>
        <p className="mt-1 text-sm font-medium text-[#395D9F]">
          Pack {activePack.levelRange} — {hoursRemaining} de {activePack.hoursTotal} horas disponibles
        </p>
      </div>

      {/* Teacher selector */}
      {teachers.length > 1 && (
        <Card>
          <CardContent>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Profesor
            </label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name || t.id}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {/* Slot picker */}
      {selectedTeacherId && (
        <BookingSlotPicker
          teacherId={selectedTeacherId}
          onSelect={handleSlotSelect}
        />
      )}

      {/* Booking form */}
      {selectedDate && selectedTime && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
                Horario seleccionado:{" "}
                <span className="font-semibold">
                  {selectedDate} a las {selectedTime}
                </span>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                <p className="font-semibold mb-1">Política de cancelación</p>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-amber-700">
                  <li>Las clases no se pueden cambiar sin consultar previamente con la profesora.</li>
                  <li>Cancelación: al menos <strong>48 horas</strong> de antelación.</li>
                  <li>Si se cancela con menos de 48h, <strong>la clase se descuenta del bono</strong>.</li>
                  <li>Excepción: justificante médico presentado en 24h.</li>
                </ul>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tema / enfoque (opcional)
                </label>
                <textarea
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
                  rows={2}
                  placeholder="Ej: Preparación oral DELF B2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
                  rows={2}
                  placeholder="Cualquier información adicional para el profesor"
                />
              </div>

              <Button type="submit" loading={submitting}>
                Confirmar reserva
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Message */}
      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
