import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/lib/faq-content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "FAQ de HolaBonjour: preparacion DELF/DALF, conversacion online, precios y proceso de contratacion.",
};

export default function PreguntasFrecuentesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#0b3c6f] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Preguntas frecuentes</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">FAQ HolaBonjour</h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Recopilacion adaptada de nuestra web historica publicada y de la operativa online actual.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        {faqItems.map((item) => (
          <details key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-slate-700">{item.answer}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
              Fuente: {item.source === "legacy" ? "Web historica 2017+" : "Operativa actual online"}
            </p>
          </details>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
        <h2 className="text-xl font-semibold text-slate-900">No ves tu caso?</h2>
        <p className="mt-2 text-sm text-slate-700">
          Escríbenos y te orientamos en menos de 24h laborables con ruta, nivel y siguiente paso.
        </p>
        <Link
          href="/contacto"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white hover:bg-[#0b4d84]"
        >
          Contactar ahora
        </Link>
      </section>
    </div>
  );
}
