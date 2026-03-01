import type { Metadata } from "next";
import Link from "next/link";
import TrustReviews from "@/components/TrustReviews";
import { listPublicAssessments } from "@/lib/assessment/service";

export const metadata: Metadata = {
  title: "Prueba de nivel frances online",
  description:
    "Haz una simulacion online de nivel y recibe nota, nivel CEFR estimado y recomendacion de preparacion.",
  alternates: {
    canonical: "/prueba-nivel",
  },
};

export default function PruebaNivelIndexPage() {
  const assessments = listPublicAssessments();

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <section className="rounded-2xl border border-cyan-200/60 bg-gradient-to-br from-[#0d3f78] via-[#0f5da0] to-[#1277c2] p-5 text-white shadow-[0_14px_34px_rgba(15,93,160,0.22)] sm:p-7">
          <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100">
            Simulacion orientativa
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            Pruebas de nivel online DELF/DALF
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-cyan-50/95 sm:text-base">
            En menos de 20 minutos sabras tu nivel estimado, tus puntos fuertes y el plan recomendado.
            Al terminar, podras contratar tu pack directamente.
          </p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            <div className="rounded-xl border border-white/15 bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-cyan-100">Paso 1</p>
              <p className="mt-1 text-sm font-semibold">Elige nivel objetivo</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-cyan-100">Paso 2</p>
              <p className="mt-1 text-sm font-semibold">Responde por bloques</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-cyan-100">Paso 3</p>
              <p className="mt-1 text-sm font-semibold">Recibe nivel y ruta de contratacion</p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Esta prueba es una <strong>simulacion orientativa</strong>. No sustituye la evaluacion
            oficial FEI, pero te ayuda a decidir itinerario y pack con mas precision.
          </p>
        </section>

        <section className="mt-7 grid gap-3.5 md:grid-cols-3">
          {assessments.map((assessment) => (
            <article
              key={assessment.id}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_12px_24px_rgba(15,93,160,0.14)]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">
                  Nivel {assessment.targetLevel}
                </p>
                <p className="text-xs font-semibold text-slate-500">{assessment.durationMinutes} min</p>
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-900">{assessment.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{assessment.description}</p>

              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-600">
                  {assessment.totalQuestions} preguntas · Resultado con nota por seccion
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-500">{assessment.simulationNotice}</p>

              <Link
                href={`/prueba-nivel/${assessment.id}`}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#0f5da0] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#0b4d84]"
              >
                Empezar prueba
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Siguiente paso recomendado</h2>
          <p className="mt-2 text-sm text-slate-700 sm:text-base">
            Si prefieres ir directo, puedes contratar ahora y ajustamos nivel/ruta en la orientacion inicial.
          </p>
          <Link
            href="/contratar"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b4d84]"
          >
            Contratar pack ahora
          </Link>
        </section>

        <section className="mt-7">
          <TrustReviews tone="white" />
        </section>
      </div>
    </div>
  );
}
