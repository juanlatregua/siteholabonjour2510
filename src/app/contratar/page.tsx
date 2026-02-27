import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contratar pack de clases",
  description:
    "Contrata tu pack de clases con Isabelle Guitton y reserva en agenda segun disponibilidad.",
};

const packs = [
  {
    id: "a1-b2",
    title: "Pack A1-B2",
    price: "140€",
    detail: "4 horas para conversacion o preparacion DELF A1, A2, B1 y B2.",
  },
  {
    id: "c1-c2",
    title: "Pack C1-C2",
    price: "200€",
    detail: "4 horas para conversacion avanzada o preparacion C1-C2.",
  },
];

const steps = [
  "Elige tu ruta: preparacion de examen o conversacion.",
  "Selecciona pack por nivel (A1-B2 o C1-C2).",
  "Abre la agenda y reserva segun disponibilidad.",
  "Recibe confirmacion y acceso a tu entorno de trabajo.",
];

export default function ContratarPage() {
  const calendarUrl =
    process.env.NEXT_PUBLIC_ISABELLE_CALENDAR_URL ||
    process.env.ISABELLE_CALENDAR_URL ||
    "";

  const hasCalendar = calendarUrl.startsWith("http");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#0b3c6f] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Contratacion online</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Contrata tu pack con Isabelle Guitton
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Direccion academica y docencia directa. Clases por Zoom con plan digital personalizado
          para ruta examen DELF/DALF o ruta conversacion.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {packs.map((pack) => (
          <article key={pack.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{pack.title}</h2>
            <p className="mt-1 text-3xl font-bold text-[#0f5da0]">{pack.price}</p>
            <p className="mt-2 text-sm text-gray-700">{pack.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
        <h2 className="text-2xl font-semibold text-gray-900">Pedido de clases y calendario</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap gap-3">
          {hasCalendar ? (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
            >
              Abrir calendario disponible
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
            >
              Solicitar reserva por WhatsApp/email
            </Link>
          )}

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0f5da0] px-5 text-sm font-semibold text-[#0f5da0] transition hover:bg-blue-100"
          >
            Reservar orientacion
          </Link>
        </div>

        {!hasCalendar && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Para conectar la agenda real de Isabelle, configura la variable
            <code className="ml-1 rounded bg-amber-100 px-1.5 py-0.5">NEXT_PUBLIC_ISABELLE_CALENDAR_URL</code>
            con el enlace de reservas.
          </p>
        )}
      </section>
    </div>
  );
}
