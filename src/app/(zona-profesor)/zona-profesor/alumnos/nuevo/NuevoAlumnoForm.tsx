"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  level: string;
  route: string;
  phone: string;
}

const levelOptions = [
  { value: "A1", label: "A1 - Principiante" },
  { value: "A2", label: "A2 - Elemental" },
  { value: "B1", label: "B1 - Intermedio" },
  { value: "B2", label: "B2 - Intermedio alto" },
  { value: "C1", label: "C1 - Avanzado" },
  { value: "C2", label: "C2 - Maestría" },
];

const routeOptions = [
  { value: "preparacion-examen", label: "Preparación examen" },
  { value: "conversacion", label: "Conversación" },
];

export default function NuevoAlumnoForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      level: "",
      route: "",
      phone: "",
    },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);

    try {
      const res = await fetch("/api/zona-profesor/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "Error al crear alumno");
      }

      router.push("/zona-profesor/alumnos");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error al crear alumno");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre"
        placeholder="Nombre completo"
        {...register("name", { required: "El nombre es obligatorio" })}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="alumno@email.com"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email no válido",
          },
        })}
        error={errors.email?.message}
      />

      <Select
        label="Nivel"
        options={levelOptions}
        placeholder="Selecciona un nivel"
        {...register("level")}
        error={errors.level?.message}
      />

      <Select
        label="Ruta"
        options={routeOptions}
        placeholder="Selecciona una ruta"
        {...register("route")}
        error={errors.route?.message}
      />

      <Input
        label="Teléfono"
        type="tel"
        placeholder="+34 600 000 000"
        {...register("phone")}
        error={errors.phone?.message}
      />

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Crear alumno
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/zona-profesor/alumnos")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
