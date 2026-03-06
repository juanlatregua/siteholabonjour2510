import type { Metadata } from "next";
import Link from "next/link";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Pago confirmado — HolaBonjour",
  description: "Tu pago ha sido procesado correctamente. Bienvenido/a a HolaBonjour.",
};

export default function ConfirmacionPage() {
  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1
            className="text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pago confirmado
          </h1>
          <p className="mt-4 text-lg" style={{ color: "#3d4a5c" }}>
            Tu pack de clases ha sido activado. Recibirás un email de confirmación con los detalles.
          </p>
          <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
            Nos pondremos en contacto contigo para organizar tus clases.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <GoldButton href="/zona-alumno">
              Ir a mi zona de alumno
            </GoldButton>
            <GoldButton href="/" variant="outline">
              Volver al inicio
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
