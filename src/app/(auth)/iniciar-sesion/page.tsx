"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("nodemailer", { email, callbackUrl, redirect: true });
    setSent(true);
    setLoading(false);
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("teacher-credentials", {
      email: teacherEmail,
      password,
      callbackUrl,
      redirect: true,
    });
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-[#e8b865]"
      >
        <span aria-hidden="true">&larr;</span> Volver a HolaBonjour
      </Link>
      {/* Student access */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-2 text-xl font-semibold text-white">Acceso alumno</h2>
        <p className="mb-6 text-sm text-white/40">
          Introduce tu email y te enviaremos un enlace de acceso.
        </p>
        {sent ? (
          <p className="text-center text-sm text-[#e8b865]">
            Revisa tu bandeja de entrada. Te hemos enviado un enlace.
          </p>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#e8b865]/50 focus:ring-1 focus:ring-[#e8b865]/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#e8b865] to-[#c8a55a] px-4 py-3 text-sm font-bold text-[#1a1a2e] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar enlace de acceso"}
            </button>
          </form>
        )}
      </div>

      {/* Teacher access */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-2 text-xl font-semibold text-white">Acceso docente</h2>
        <p className="mb-6 text-sm text-white/40">
          Email y contraseña del equipo docente.
        </p>
        <form onSubmit={handleTeacherLogin} className="space-y-4">
          <input
            type="email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            placeholder="email@holabonjour.es"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#e8b865]/50 focus:ring-1 focus:ring-[#e8b865]/20"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/25 outline-none focus:border-[#e8b865]/50 focus:ring-1 focus:ring-[#e8b865]/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acceder como docente"}
          </button>
        </form>
      </div>
    </div>
  );
}
