"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: "Error de configuración del servidor.",
  AccessDenied: "No tienes permiso para acceder. Tu cuenta puede estar desactivada.",
  Verification: "El enlace de verificación ha expirado o ya fue usado.",
  Default: "Ha ocurrido un error inesperado.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const message = ERROR_MESSAGES[error] || ERROR_MESSAGES.Default;

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
      <div className="mb-4 text-4xl">⚠️</div>
      <h2 className="mb-2 text-xl font-semibold text-white">Error de acceso</h2>
      <p className="mb-6 text-sm text-white/50">{message}</p>
      <Link
        href="/iniciar-sesion"
        className="inline-block rounded-xl bg-gradient-to-r from-[#e8b865] to-[#c8a55a] px-6 py-3 text-sm font-bold text-[#1a1a2e] transition hover:-translate-y-0.5"
      >
        Volver a intentar
      </Link>
    </div>
  );
}
