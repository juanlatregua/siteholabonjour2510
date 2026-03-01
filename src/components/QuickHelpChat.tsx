"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { faqItems } from "@/lib/faq-content";

const QuickHelpChat = () => {
  const [selectedId, setSelectedId] = useState(faqItems[0]?.id ?? "");

  const selected = useMemo(
    () => faqItems.find((item) => item.id === selectedId) ?? faqItems[0],
    [selectedId],
  );

  if (!selected) {
    return null;
  }

  return (
    <section
      id="asistente"
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-label="Asistente de preguntas frecuentes"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.09em] text-[#0f5da0]">
        Asistente rapido
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
        Chatbot FAQ: respuestas en 10 segundos
      </h2>
      <p className="mt-2 text-sm text-slate-700">
        Selecciona una pregunta frecuente para evitar mensajes repetitivos por WhatsApp.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {faqItems.map((item) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                active
                  ? "border-[#0f5da0] bg-blue-50 text-[#0f5da0]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {item.question}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
        <p className="text-sm font-semibold text-slate-900">{selected.question}</p>
        <p className="mt-2 text-sm text-slate-700">{selected.answer}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/preguntas-frecuentes"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0f5da0] px-4 text-sm font-semibold text-[#0f5da0] hover:bg-blue-100"
        >
          Ver FAQ completa
        </Link>
        <Link
          href="/contacto"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-4 text-sm font-semibold text-white hover:bg-[#0b4d84]"
        >
          Aun tengo dudas: contactar
        </Link>
      </div>
    </section>
  );
};

export default QuickHelpChat;
