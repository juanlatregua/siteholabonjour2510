import type { Metadata } from "next";
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-200">Contratación online</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Contrata tu pack de clases
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Clases individuales (1 a 1) de 55 minutos por Zoom con profesora nativa francesa.
          Pago seguro con tarjeta.
        </p>
      </section>

      <section className="mt-8">
        <BookingFunnel />
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Qué incluye el pack</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>4 clases individuales de 55 minutos por Zoom.</li>
          <li>Apuntes y seguimiento personalizado en tu zona de alumno.</li>
          <li>Acceso a Le Côté Vie: cine, gastronomía, juegos y cultura francesa.</li>
          <li>Certificado de asistencia.</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Política de anulación:</strong> al menos 48h de antelación. Si no, se descuenta del bono.
        Excepción: justificante médico presentado en 24h.
      </section>
    </div>
  );
}
