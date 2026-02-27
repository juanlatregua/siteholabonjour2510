import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con HolaBonjour para clases online de frances con direccion academica de Isabelle Guitton.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
      <p className="mt-3 text-gray-700">
        Trabajamos 100% online por Zoom con direccion academica de Isabelle Guitton. Escribenos y te
        orientamos en menos de 24h laborables.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Atencion directa</h2>
          <p className="mt-2 text-sm text-gray-700">Telefono / WhatsApp: 685 07 03 04</p>
          <p className="text-sm text-gray-700">Email: info@holabonjour.es</p>
          <p className="mt-3 text-sm text-gray-700">Rutas: preparacion DELF/DALF o conversacion.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Tarifas vigentes</h2>
          <p className="mt-2 text-sm text-gray-700">A1-B2: pack 4 horas por 140€</p>
          <p className="text-sm text-gray-700">C1-C2: pack 4 horas por 200€</p>
          <p className="mt-3 text-sm text-gray-700">Siguiente paso: reserva orientacion y plan personalizado.</p>
        </div>
      </div>
    </div>
  );
}
