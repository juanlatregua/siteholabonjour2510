"use client";

import { useState } from "react";
import GlassCard from "@/components/cinematic/GlassCard";

interface LeadData {
  name: string;
  email: string;
  objetivo: string;
}

interface PassportScreenProps {
  onComplete: (data: LeadData) => void;
}

const OBJETIVO_OPTIONS = [
  "Viaje",
  "Trabajo",
  "Estudios",
  "Examenes oficiales DELF/DALF",
  "Cultura general",
];

export default function PassportScreen({ onComplete }: PassportScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Nombre y email son obligatorios.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          objetivo,
          source: "le-voyage",
        }),
      });
    } catch {
      // Lead capture is best-effort; continue even if it fails.
    }

    setIsSubmitting(false);
    onComplete({ name: name.trim(), email: email.trim(), objetivo });
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0a0e17] px-4 py-12">
      <div className="w-full max-w-md">
        <GlassCard>
          <div className="p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Votre passeport linguistique
            </h2>
            <p className="mt-2 text-sm text-[#f1f5f9]/60">
              Antes de embarcar, cuentanos sobre ti
            </p>

            <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="passport-name"
                  className="block text-sm font-medium text-[#f1f5f9]/80"
                >
                  Nombre *
                </label>
                <input
                  id="passport-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#e8b865] focus:outline-none focus:ring-2 focus:ring-[#e8b865]/20"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="passport-email"
                  className="block text-sm font-medium text-[#f1f5f9]/80"
                >
                  Email *
                </label>
                <input
                  id="passport-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#e8b865] focus:outline-none focus:ring-2 focus:ring-[#e8b865]/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="passport-objetivo"
                  className="block text-sm font-medium text-[#f1f5f9]/80"
                >
                  Objetivo
                </label>
                <select
                  id="passport-objetivo"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#e8b865] focus:outline-none focus:ring-2 focus:ring-[#e8b865]/20"
                >
                  <option value="" className="bg-[#0a0e17] text-white">
                    Selecciona un objetivo
                  </option>
                  {OBJETIVO_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-[#0a0e17] text-white"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#e8b865] px-5 py-3 text-sm font-semibold text-[#0a0e17] transition hover:bg-[#d4a555] disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Comenzar el viaje"}
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
