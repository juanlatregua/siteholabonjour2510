import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Horarios clases de francés | HolaBonjour",
  description:
    "Horarios disponibles para clases individuales de francés online por Zoom. Lunes a viernes, mañana y tarde.",
};

const schedule = [
  { period: "Mañana", slots: ["09:00 – 09:55", "10:00 – 10:55", "11:00 – 11:55", "12:00 – 12:55"] },
  { period: "Tarde", slots: ["16:00 – 16:55", "17:00 – 17:55", "18:00 – 18:55", "19:00 – 19:55"] },
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function HorariosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Horarios</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Horarios disponibles
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Clases individuales de lunes a viernes, en horario de mañana o tarde. Elige el que mejor se adapte a ti.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Franjas horarias</h2>
        <p className="mt-2 text-sm text-gray-600">Cada clase dura 55 minutos. Hora peninsular española (CET/CEST).</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {schedule.map((block) => (
            <div key={block.period} className="rounded-xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-[#2563eb]">{block.period}</h3>
              <ul className="mt-3 space-y-2">
                {block.slots.map((slot) => (
                  <li key={slot} className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Días disponibles</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {days.map((day) => (
            <span
              key={day}
              className="rounded-xl border border-[#2563eb] bg-blue-50 px-4 py-2 text-sm font-medium text-[#2563eb]"
            >
              {day}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Sábados y domingos no hay clases. Festivos nacionales franceses y españoles tampoco.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">¿Quieres reservar?</h2>
        <p className="mt-2 text-sm text-gray-700">
          Elige tu nivel y horario preferido al contratar tu pack.
        </p>
        <Link
          href="/contratar"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
        >
          Contratar pack de clases
        </Link>
      </section>
    </div>
  );
}
