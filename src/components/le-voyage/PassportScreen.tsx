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
  { emoji: "📝", label: "Examen DELF/DALF" },
  { emoji: "🏛️", label: "Oposiciones" },
  { emoji: "💼", label: "Trabajo" },
  { emoji: "✈️", label: "Viaje" },
  { emoji: "🎓", label: "Estudios en Francia" },
  { emoji: "💫", label: "Por placer" },
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
      setError(
        "Nom et courriel sont obligatoires. / Nombre y email son obligatorios.",
      );
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
    <section
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <GlassCard>
          <div className="p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Votre{" "}
              <span style={{ fontWeight: 700, fontStyle: "italic" }}>
                passeport
              </span>
            </h2>
            <p className="mt-2 text-sm text-[#f1f5f9]/60">
              Antes de embarcar, necesitamos algunos datos para tu billete.
            </p>

            <form
              onSubmit={(e) => void handleSubmit(e)}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="passport-name"
                  className="block text-sm font-medium text-[#f1f5f9]/80"
                >
                  Nom / Nombre *
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
                  Courriel / Email *
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
                <label className="block text-sm font-medium text-[#f1f5f9]/80">
                  Destination / ¿Tu objetivo?
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {OBJETIVO_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        setObjetivo(objetivo === opt.label ? "" : opt.label)
                      }
                      className={`rounded-full border px-3.5 py-2 text-sm transition ${
                        objetivo === opt.label
                          ? "border-[#e8b865] bg-[#e8b865]/20 text-[#e8b865]"
                          : "border-white/15 bg-white/5 text-[#f1f5f9]/70 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#e8b865] px-5 py-3 text-sm font-semibold text-[#1a1a2e] transition hover:bg-[#d4a555] disabled:opacity-60"
              >
                {isSubmitting ? "Embarquement..." : "Embarquer →"}
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
