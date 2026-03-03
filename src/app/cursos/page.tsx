import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursos de francés online | HolaBonjour",
  description:
    "Cursos de francés online por Zoom con profesora nativa. Preparación DELF/DALF y conversación. Niveles A1 a C2.",
};

const courses = [
  {
    level: "A1 – A2",
    title: "Francés básico",
    description:
      "Aprende los fundamentos del francés: presentarte, hacer compras, orientarte en una ciudad francesa. Ideal para principiantes.",
    focus: ["Comprensión y producción oral básica", "Vocabulario cotidiano", "Gramática esencial", "Preparación DELF A1/A2"],
  },
  {
    level: "B1 – B2",
    title: "Francés intermedio",
    description:
      "Consolida tu francés para desenvolverte con soltura en situaciones profesionales, académicas y de viaje.",
    focus: ["Conversación fluida", "Expresión escrita estructurada", "Comprensión de medios franceses", "Preparación DELF B1/B2"],
  },
  {
    level: "C1 – C2",
    title: "Francés avanzado",
    description:
      "Perfecciona tu francés para un dominio casi nativo. Argumentación, matices culturales y registro formal.",
    focus: ["Debate y argumentación compleja", "Redacción académica y profesional", "Cultura y civilización francófona", "Preparación DALF C1/C2"],
  },
];

export default function CursosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Cursos</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Cursos de francés online por Zoom
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Clases individuales con profesora nativa. Adaptamos el contenido a tu nivel, objetivos y ritmo.
        </p>
      </section>

      <section className="mt-8 space-y-6">
        {courses.map((course) => (
          <article key={course.level} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">{course.level}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="mt-2 text-sm text-gray-700">{course.description}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {course.focus.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-[#2563eb]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">¿Listo para empezar?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Elige tu nivel, reserva tus clases y empieza esta semana.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contratar"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Contratar pack de clases
          </Link>
          <Link
            href="/prueba-nivel"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#2563eb] px-6 text-sm font-semibold text-[#2563eb] transition hover:bg-blue-100"
          >
            Hacer test de nivel gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
