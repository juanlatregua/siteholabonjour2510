import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Precios clases de francés | HolaBonjour",
  description:
    "Precios de clases individuales de francés por Zoom. Pack 4 sesiones A1-B2: 150€. Pack 4 sesiones C1-C2: 200€. IVA incluido.",
};

const packs = [
  {
    id: "a1-b2",
    title: "Pack A1 – B2",
    price: 150,
    perSession: 37.5,
    sessions: 4,
    duration: 55,
    levels: "A1, A2, B1, B2",
    includes: [
      "4 clases individuales de 55 min por Zoom",
      "Profesora nativa con seguimiento personalizado",
      "Apuntes y notas de cada sesión",
      "Acceso a la zona de alumno",
      "Preparación DELF o conversación",
    ],
  },
  {
    id: "c1-c2",
    title: "Pack C1 – C2",
    price: 200,
    perSession: 50,
    sessions: 4,
    duration: 55,
    levels: "C1, C2",
    includes: [
      "4 clases individuales de 55 min por Zoom",
      "Profesora nativa especializada en niveles avanzados",
      "Apuntes y notas de cada sesión",
      "Acceso a la zona de alumno",
      "Preparación DALF o conversación avanzada",
    ],
  },
];

export default function PreciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Precios</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Precios claros, sin permanencia
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Pago único por pack de 4 clases. Sin matrícula, sin compromiso de continuidad. IVA incluido.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {packs.map((pack) => (
          <article key={pack.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{pack.title}</h2>
            <p className="text-sm text-gray-600">Niveles {pack.levels}</p>
            <p className="mt-3 text-4xl font-bold text-[#2563eb]">{pack.price} €</p>
            <p className="text-sm text-gray-600">
              {pack.perSession.toFixed(2)} €/sesión · {pack.sessions} clases de {pack.duration} min
            </p>
            <ul className="mt-4 space-y-2">
              {pack.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-emerald-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contratar"
              className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
            >
              Contratar este pack
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-amber-900">Política de anulación</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-900">
          <li>Las clases se anulan con al menos <strong>48 horas</strong> de antelación.</li>
          <li>Si no se anula a tiempo, la clase se descuenta del bono.</li>
          <li>Excepción: enfermedad justificada con certificado médico presentado en las 24h siguientes.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Preguntas sobre precios</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900">¿Hay matrícula?</h3>
            <p className="mt-1">No. Solo pagas el pack de clases. Sin matrícula ni gastos adicionales.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">¿Los precios incluyen IVA?</h3>
            <p className="mt-1">Sí, todos los precios son finales con IVA incluido.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">¿Puedo contratar más de un pack?</h3>
            <p className="mt-1">Sí, puedes renovar tu pack en cualquier momento cuando termines las 4 sesiones.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
