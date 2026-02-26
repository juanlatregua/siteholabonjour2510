import type { Metadata } from "next";
import Link from "next/link";
import TrustReviews from "@/components/TrustReviews";

export const metadata: Metadata = {
  title: "Plataforma DELF/DALF",
  description:
    "Evalua tu nivel de frances y recibe un plan de preparacion online para examenes DELF y DALF.",
};

const highlights = [
  {
    title: "Prueba de nivel online",
    detail:
      "Evalua comprension y gramatica en pocos minutos para estimar tu nivel CEFR con criterio orientativo.",
  },
  {
    title: "Ruta por examen oficial",
    detail:
      "Te orientamos a DELF o DALF segun tu resultado y tu objetivo academico o profesional.",
  },
  {
    title: "Preparacion 100% online",
    detail:
      "Clases en directo centradas en las pruebas oficiales: comprension, produccion escrita y oral.",
  },
];

const trustSignals = [
  "Enfoque examenes oficiales FEI",
  "Seguimiento docente personalizado",
  "Metodologia online clara y estructurada",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="rounded-2xl bg-gradient-to-br from-[#0b3c6f] via-[#0f5da0] to-[#1b78c2] px-5 py-7 text-white shadow-[0_14px_34px_rgba(15,93,160,0.22)] sm:px-8 sm:py-9">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.17em] text-blue-100">HolaBonjour · DELF/DALF</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Evalua tu nivel de frances y preparate para el examen oficial
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-50 sm:text-base">
              Plataforma online para candidatos DELF/DALF: diagnostico inicial, recomendacion de
              nivel y plan de preparacion orientado a convocatorias oficiales.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/prueba-nivel"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#0b3c6f] transition hover:bg-blue-50"
              >
                Empezar prueba de nivel
              </Link>
              <Link
                href="/preparacion-delf-dalf"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver programas DELF/DALF
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">Como funciona</p>
            <ol className="mt-2 space-y-2 text-sm text-white">
              <li>1. Realizas la prueba orientativa online.</li>
              <li>2. Recibes nivel estimado y recomendacion.</li>
              <li>3. Accedes a preparacion DELF/DALF adaptada.</li>
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

      <section className="mt-8">
        <TrustReviews tone="white" />
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[#0b3c6f]">Base academica y fuentes oficiales</h2>
        <p className="mt-2 text-sm text-slate-700">
          El itinerario se apoya en el marco CEFR y en modelos de examen publicados por France
          Education international. Esta plataforma ofrece simulaciones orientativas para ayudarte a
          elegir plan de preparacion.
        </p>
      </section>
    </div>
  );
}
