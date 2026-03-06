import type { Metadata } from "next";
import { Suspense } from "react";
import CinematicSection from "@/components/cinematic/CinematicSection";
import BookingFunnel from "@/components/BookingFunnel";

export const metadata: Metadata = {
  title: "Contratar pack de clases de francés — HolaBonjour",
  description:
    "Contrata tu pack de clases individuales de francés online por Zoom. Pack A1-B2: 150€, pack C1-C2: 200€. Pago seguro con tarjeta.",
  alternates: { canonical: "/contratar" },
  openGraph: {
    title: "Contratar pack de clases de francés — HolaBonjour",
    description:
      "Contrata tu pack de clases individuales de francés online por Zoom. Pack A1-B2: 150€, pack C1-C2: 200€. Pago seguro con tarjeta.",
    url: "https://holabonjour.es/contratar",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function ContratarPage() {
  return (
    <div style={{ background: "#1e2d4a", color: "#f1f5f9", minHeight: "100vh" }}>
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
            style={{ background: "rgba(229,0,70,0.15)", color: "#E50046", border: "1px solid rgba(229,0,70,0.3)" }}
          >
            Contratación online
          </p>
          <h1
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contrata tu pack de clases
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            Clases individuales (1 a 1) de 55 minutos por Zoom con profesora nativa francesa.
            Pago seguro con tarjeta.
          </p>
        </div>
      </CinematicSection>

      <CinematicSection className="pb-10 px-6">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "rgba(255,255,255,0.5)" }}>Cargando...</div>}>
            <BookingFunnel />
          </Suspense>
        </div>
      </CinematicSection>

      <CinematicSection className="pb-10 px-6">
        <div
          className="mx-auto max-w-3xl rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <h2 className="text-xl font-semibold">Qué incluye el pack</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            <li>4 clases individuales de 55 minutos por Zoom.</li>
            <li>Apuntes y seguimiento personalizado en tu zona de alumno.</li>
            <li>Acceso a Le Côté Vie: cine, gastronomía, juegos y cultura francesa.</li>
            <li>Certificado de asistencia.</li>
          </ul>
        </div>
      </CinematicSection>

      <CinematicSection className="pb-16 px-6">
        <div
          className="mx-auto max-w-3xl rounded-xl p-4 text-sm"
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" }}
        >
          <strong>Política de anulación:</strong> al menos 48h de antelación. Si no, se descuenta del bono.
          Excepción: justificante médico presentado en 24h.
        </div>
      </CinematicSection>
    </div>
  );
}
