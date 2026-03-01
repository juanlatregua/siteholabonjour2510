import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con HolaBonjour para clases online de frances con direccion academica de Isabelle Guitton.",
};

const faqItems = [
  {
    q: "Que incluye el pack?",
    a: "Clases por Zoom, objetivos por sesion y material en tu entorno digital.",
  },
  {
    q: "Que precio tiene?",
    a: "A1-B2: pack 4 horas por 140EUR. C1-C2: pack 4 horas por 200EUR.",
  },
  {
    q: "Como se paga ahora?",
    a: "Ahora por transferencia bancaria a la cuenta de empresa. Bizum y tarjeta en stand by.",
  },
  {
    q: "Que necesitamos para orientarte?",
    a: "Tu nivel aproximado, objetivo (examen o conversacion) y disponibilidad horaria.",
  },
];

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
          <p className="text-sm text-gray-700">Email: hola@holabonjour.es</p>
          <p className="mt-3 text-sm text-gray-700">Rutas: preparacion DELF/DALF o conversacion.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Tarifas vigentes</h2>
          <p className="mt-2 text-sm text-gray-700">A1-B2: pack 4 horas por 140EUR</p>
          <p className="text-sm text-gray-700">C1-C2: pack 4 horas por 200EUR</p>
          <p className="mt-3 text-sm text-gray-700">Siguiente paso: te proponemos ruta y plan en 24h laborables.</p>
        </div>
      </div>

      <section id="faq" className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
        <h2 className="text-xl font-semibold text-gray-900">FAQ rapida (antes de escribir)</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.q} className="rounded-xl border border-blue-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
