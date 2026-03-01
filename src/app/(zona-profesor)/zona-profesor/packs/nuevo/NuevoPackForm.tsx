"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface FormData {
  studentId: string;
  hoursTotal: string;
  price: string;
  levelRange: string;
}

interface NuevoPackFormProps {
  students: { value: string; label: string }[];
}

const levelRangeOptions = [
  { value: "A1-A2", label: "A1-A2" },
  { value: "A1-B1", label: "A1-B1" },
  { value: "A1-B2", label: "A1-B2" },
  { value: "B1-B2", label: "B1-B2" },
  { value: "B2-C1", label: "B2-C1" },
  { value: "C1-C2", label: "C1-C2" },
];

export default function NuevoPackForm({ students }: NuevoPackFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      studentId: "",
      hoursTotal: "",
      price: "",
      levelRange: "",
    },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);

    try {
      const res = await fetch("/api/zona-profesor/packs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: data.studentId,
          hoursTotal: parseFloat(data.hoursTotal),
          price: parseFloat(data.price),
          levelRange: data.levelRange,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Error al crear el pack");
      }

      router.push("/zona-profesor/packs");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error al crear el pack");
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
        label="Horas totales"
        type="number"
        step="0.5"
        min="1"
        placeholder="Ej: 10"
        {...register("hoursTotal", {
          required: "Las horas son obligatorias",
          min: { value: 1, message: "Mínimo 1 hora" },
        })}
        error={errors.hoursTotal?.message}
      />

      <Input
        label="Precio (EUR)"
        type="number"
        step="0.01"
        min="0"
        placeholder="Ej: 140.00"
        {...register("price", {
          required: "El precio es obligatorio",
          min: { value: 0, message: "El precio no puede ser negativo" },
        })}
        error={errors.price?.message}
      />

      <Select
        label="Rango de nivel"
        options={levelRangeOptions}
        placeholder="Selecciona un rango"
        {...register("levelRange", { required: "Selecciona un rango de nivel" })}
        error={errors.levelRange?.message}
      />

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Crear pack
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/zona-profesor/packs")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
