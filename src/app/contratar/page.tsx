import type { Metadata } from "next";
import Link from "next/link";
import BookingFunnel from "@/components/BookingFunnel";

export const metadata: Metadata = {
  title: "Contratar clases de francés online | HolaBonjour",
  description:
    "Contrata tu pack de clases individuales de francés por Zoom con Isabelle Guitton. A1-B2: 4 sesiones 150€. C1-C2: 4 sesiones 200€. Pago seguro con tarjeta.",
};

export default function ContratarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Contratación online</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Contrata tu pack de clases con Isabelle Guitton
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Clases individuales (1 a 1) por Zoom · 55 minutos · Profesora nativa con seguimiento personalizado.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Pack A1 – B2</h2>
          <p className="mt-1 text-3xl font-bold text-[#2563eb]">150 €</p>
          <p className="text-sm text-gray-600">4 sesiones · 37,50 €/sesión</p>
          <p className="mt-2 text-sm text-gray-700">
            Para conversación o preparación DELF A1, A2, B1 y B2.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Pack C1 – C2</h2>
          <p className="mt-1 text-3xl font-bold text-[#2563eb]">200 €</p>
          <p className="text-sm text-gray-600">4 sesiones · 50 €/sesión</p>
          <p className="mt-2 text-sm text-gray-700">
            Para conversación avanzada o preparación DALF C1 y C2.
          </p>
        </article>
      </section>

      {/* Booking funnel */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Reserva tu pack</h2>
        <p className="mt-2 text-sm text-gray-600">
          Elige nivel, horario y completa el pago con tarjeta. Te confirmamos la reserva por email y WhatsApp.
        </p>
        <div className="mt-6">
          <BookingFunnel />
        </div>
      </section>

      {/* Cancellation policy */}
      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-amber-900">Política de anulación</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-900">
          <li>Las clases se anulan con al menos <strong>48 horas</strong> de antelación.</li>
          <li>Si no se anula a tiempo, la clase se descuenta del bono.</li>
          <li>Excepción: enfermedad justificada con certificado médico presentado en las 24h siguientes.</li>
        </ul>
      </section>

      {/* What happens next */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Qué pasa después de reservar</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>Recibes confirmación por email y WhatsApp con los detalles de tu primera clase.</li>
          <li>24h antes de cada clase, te enviamos un recordatorio con el enlace de Zoom.</li>
          <li>Accedes a tu zona de alumno con apuntes y seguimiento personalizado.</li>
        </ul>
      </section>

      <div className="mt-6 text-center">
        <Link
          href="/contact"
          className="text-sm text-[#2563eb] hover:underline"
        >
          ¿Tienes dudas? Contacta con nosotros antes de reservar
        </Link>
      </div>
    </div>
  );
}
