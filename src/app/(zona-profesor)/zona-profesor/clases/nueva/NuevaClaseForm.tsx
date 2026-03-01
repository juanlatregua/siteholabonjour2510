"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface FormData {
  studentId: string;
  date: string;
  time: string;
  durationMinutes: string;
  zoomLink: string;
  focus: string;
}

interface NuevaClaseFormProps {
  students: { value: string; label: string }[];
}

const durationOptions = [
  { value: "30", label: "30 minutos" },
  { value: "45", label: "45 minutos" },
  { value: "60", label: "60 minutos" },
  { value: "90", label: "90 minutos" },
  { value: "120", label: "120 minutos" },
];

export default function NuevaClaseForm({ students }: NuevaClaseFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      studentId: "",
      date: "",
      time: "",
      durationMinutes: "60",
      zoomLink: "",
      focus: "",
    },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);

    try {
      const res = await fetch("/api/zona-profesor/clases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: data.studentId,
          scheduledAt: `${data.date}T${data.time}:00`,
          durationMinutes: parseInt(data.durationMinutes, 10),
          zoomLink: data.zoomLink || null,
          focus: data.focus || null,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Error al crear la clase");
      }

      router.push("/zona-profesor/clases");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error al crear la clase");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Alumno"
        options={students}
        placeholder="Selecciona un alumno"
        {...register("studentId", { required: "Selecciona un alumno" })}
        error={errors.studentId?.message}
      />

      <Input
        label="Fecha"
        type="date"
        {...register("date", { required: "La fecha es obligatoria" })}
        error={errors.date?.message}
      />

      <Input
        label="Hora"
        type="time"
        {...register("time", { required: "La hora es obligatoria" })}
        error={errors.time?.message}
      />

      <Select
        label="Duracion"
        options={durationOptions}
        {...register("durationMinutes")}
        error={errors.durationMinutes?.message}
      />

      <Input
        label="Enlace Zoom"
        type="url"
        placeholder="https://zoom.us/j/..."
        {...register("zoomLink")}
        error={errors.zoomLink?.message}
      />

      <Input
        label="Tema / Enfoque"
        placeholder="Ej: Gramática subjuntivo, Conversación..."
        {...register("focus")}
        error={errors.focus?.message}
      />

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Crear clase
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/zona-profesor/clases")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
