import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plataforma DELF/DALF",
  description:
    "Evalúa tu nivel de francés y recibe un plan de preparación online para exámenes DELF y DALF.",
};

const highlights = [
  {
    title: "Prueba de nivel online",
    detail:
      "Evalúas comprensión y gramática en menos de 10 minutos para estimar tu nivel real CEFR.",
  },
  {
    title: "Ruta por examen oficial",
    detail:
      "Te orientamos a DELF o DALF según tu resultado y objetivo académico o profesional.",
  },
  {
    title: "Preparación 100% online",
    detail:
      "Clases en directo enfocadas en las cuatro pruebas oficiales: comprensión, producción escrita, oral y mediación.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-gradient-to-r from-[#0b3c6f] to-[#0f5da0] px-6 py-10 text-white sm:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-100">
          HolaBonjour · Especialistas DELF/DALF
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          Evalúa tu nivel de francés y prepárate para el examen oficial
        </h1>
        <p className="mt-4 max-w-2xl text-base text-blue-50 sm:text-lg">
          Plataforma diseñada para candidatos DELF/DALF: diagnóstico inicial,
          recomendación personalizada y plan de preparación orientado a convocatorias oficiales.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/prueba-nivel"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3c6f] transition hover:bg-blue-50"
          >
            Empezar prueba de nivel
          </Link>
          <Link
            href="/preparacion-delf-dalf"
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ver programas DELF/DALF
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
        <h2 className="text-xl font-semibold text-[#0b3c6f]">Base académica y fuentes oficiales</h2>
        <p className="mt-2 text-sm text-gray-700">
          El diseño del itinerario se apoya en el marco CEFR y en los modelos públicos de examen de
          France Éducation international. Este MVP usa ejemplos representativos para orientar nivel y
          plan de estudio.
        </p>
      </section>
    </div>
  );
}
