"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface FormValues {
  email: string;
  name: string;
}

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/le-mot-du-jour/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setServerMessage(json.message || "Ha ocurrido un error. Intentalo de nuevo.");
        return;
      }

      setStatus("success");
      setServerMessage(json.message || "Suscripcion exitosa!");
      reset();
    } catch {
      setStatus("error");
      setServerMessage("Error de conexion. Intentalo de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div
        className="vie-card p-6 text-center"
        style={{ borderLeft: "4px solid var(--vie-sage)" }}
      >
        <p
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
        >
          Merci !
        </p>
        <p className="mt-1 text-sm text-gray-600">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vie-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input
            label="Nombre (opcional)"
            placeholder="Tu nombre"
            {...register("name")}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalido",
              },
            })}
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            variant="secondary"
            loading={status === "loading"}
          >
            Suscribirme
          </Button>
        </div>
      </div>

      {status === "error" && serverMessage && (
        <p className="mt-3 text-sm text-red-600">{serverMessage}</p>
      )}
    </form>
  );
}
