import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con HolaBonjour para preparación online DELF/DALF y asesoramiento de convocatoria.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
      <p className="mt-3 text-gray-700">
        Escríbenos para resolver dudas sobre nivel, calendario y modalidad de preparación DELF/DALF.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Atención directa</h2>
          <p className="mt-2 text-sm text-gray-700">Teléfono / WhatsApp: 685 07 03 04</p>
          <p className="text-sm text-gray-700">Email: info@holabonjour.es</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Horario de respuesta</h2>
          <p className="mt-2 text-sm text-gray-700">
            Respuesta habitual en menos de 24h laborables.
          </p>
          <p className="text-sm text-gray-700">Modalidad: clases 100% online en directo.</p>
        </div>
      </div>
    </div>
  );
}
