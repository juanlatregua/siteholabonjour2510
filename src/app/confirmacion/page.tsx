import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pago confirmado — HolaBonjour",
  description: "Tu pago ha sido procesado correctamente. Bienvenido/a a HolaBonjour.",
};

export default function ConfirmacionPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Pago confirmado</h1>
        <p className="mt-3 text-gray-700">
          Tu pack de clases ha sido activado. Recibirás un email de confirmación con los detalles.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Nos pondremos en contacto contigo para organizar tus clases.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/zona-alumno"
          className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
        >
          Ir a mi zona de alumno
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
