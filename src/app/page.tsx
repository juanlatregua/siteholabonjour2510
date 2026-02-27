import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TrustReviews from "@/components/TrustReviews";

export const metadata: Metadata = {
  title: "Isabelle Guitton | Frances online personalizado",
  description:
    "HolaBonjour evoluciona a modelo 100% online con direccion academica de Isabelle Guitton, ruta examen DELF/DALF o conversacion y tarifas por pack de 4 horas.",
};

const highlights = [
  {
    title: "Ruta 1: preparacion de examen",
    detail:
      "Entrenamiento para DELF/DALF con simulaciones, estrategia por prueba y acompanamiento para llegar a convocatoria con seguridad.",
  },
  {
    title: "Ruta 2: conversacion",
    detail:
      "Clases para mantener y mejorar nivel con foco en soltura oral, precision y continuidad real de uso del frances.",
  },
  {
    title: "Entorno digital personalizado",
    detail:
      "Cada alumno trabaja con cuenta propia, seguimiento individual y recursos organizados para avanzar sin friccion.",
  },
];

const trustSignals = [
  "Isabelle Guitton: directora academica y docente",
  "Trayectoria activa desde 2017",
  "Modelo 100% online por Zoom con plan personalizado",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="rounded-2xl bg-gradient-to-br from-[#0b3c6f] via-[#0f5da0] to-[#1b78c2] px-5 py-7 text-white shadow-[0_14px_34px_rgba(15,93,160,0.22)] sm:px-8 sm:py-9">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.17em] text-blue-100">
              HolaBonjour · Direccion Isabelle Guitton
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Frances online personalizado: examen oficial o conversacion
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-50 sm:text-base">
              Pasamos de academia fisica a plataforma 100% online manteniendo el mismo criterio
              docente. Clases por Zoom, cuenta de alumno y plan a medida segun objetivo.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/contratar"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#0b3c6f] transition hover:bg-blue-50"
              >
                Contratar pack
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Reservar orientacion
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
              Pedido de clases en 4 pasos
            </p>
            <ol className="mt-2 space-y-2 text-sm text-white">
              <li>1. Eliges ruta: examen o conversacion.</li>
              <li>2. Seleccionas pack por nivel.</li>
              <li>3. Reservas en agenda disponible de Isabelle.</li>
              <li>4. Accedes a tu zona alumno con material por clase.</li>
            </ol>
          </aside>
        </div>

        <ul className="mt-5 grid gap-2 text-xs text-blue-50 sm:grid-cols-3 sm:text-sm">
          {trustSignals.map((item) => (
            <li key={item} className="rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-3.5 sm:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
          </article>
        ))}
      </section>

      <section
        id="equipo"
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Image
              src="/images/conocenos2020.jpg"
              alt="Isabelle Guitton en la etapa de academia fisica"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#0f5da0]">Equipo y direccion academica</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Isabelle Guitton</h2>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              Fundadora y directora de HolaBonjour. Desde 2017 lidera el proyecto docente en Malaga,
              primero en formato academia fisica y hoy en formato online personalizado.
            </p>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              Esta evolucion mantiene la experiencia acumulada y la adapta a una operativa mas eficaz:
              sesiones por Zoom, seguimiento individual y plan de trabajo digital para cada alumno.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-800">
              Trayectoria del proyecto: academia presencial (desde 2017) - modelo online especializado actual.
            </p>
          </div>
        </div>
      </section>

      <section id="tarifas" className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[#0b3c6f]">Tarifas actuales por pack</h2>
        <p className="mt-2 text-sm text-slate-700">
          Una misma estructura de trabajo para los dos recorridos: preparacion de examen oficial o
          conversacion para mantener nivel.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-blue-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">
              Niveles A1 a B2
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">Pack 4 horas - 140€</p>
            <p className="mt-2 text-sm text-slate-700">Conversacion o preparacion DELF A1, A2, B1 y B2.</p>
          </article>

          <article className="rounded-xl border border-blue-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">
              Niveles C1 y C2
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">Pack 4 horas - 200€</p>
            <p className="mt-2 text-sm text-slate-700">
              Conversacion o preparacion de alto rendimiento C1-C2.
            </p>
          </article>
        </div>

        <Link
          href="/contratar"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
        >
          Contratar pack
        </Link>
      </section>

      <section id="contratar" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Reserva de clases con agenda disponible</h2>
        <p className="mt-2 text-sm text-slate-700">
          Ya puedes iniciar tu pedido de clases y abrir el calendario para reservar en huecos reales
          de Isabelle.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contratar"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
          >
            Ir a contratar y calendario
          </Link>
          <Link
            href="/zona-alumno?alumno=demo"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0f5da0] px-5 text-sm font-semibold text-[#0f5da0] transition hover:bg-blue-100"
          >
            Ver zona alumno demo
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <TrustReviews tone="white" />
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[#0b3c6f]">Marco oficial y trabajo real</h2>
        <p className="mt-2 text-sm text-slate-700">
          El entorno de estudio se apoya en CEFR y en formatos de examen de France Education
          international para orientar el progreso. El objetivo practico es que avances con un metodo
          claro, estable y adaptado a tu disponibilidad.
        </p>
      </section>
    </div>
  );
}
