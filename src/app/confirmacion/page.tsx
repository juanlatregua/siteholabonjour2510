import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reserva confirmada | HolaBonjour",
  description: "Tu pago ha sido procesado y tu pack de clases está activo.",
};

export default function ConfirmacionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <div className="text-5xl">✓</div>
        <h1 className="mt-4 text-3xl font-bold text-emerald-900">
          ¡Reserva confirmada!
        </h1>
        <p className="mt-3 text-lg text-emerald-800">
          Tu pago ha sido procesado correctamente y tu pack de clases está activo.
        </p>
        <div className="mt-6 space-y-2 text-sm text-emerald-900">
          <p>Recibirás un email de confirmación con los detalles de tu reserva.</p>
          <p>24h antes de cada clase, te enviaremos un recordatorio con el enlace de Zoom.</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/zona-alumno"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Ir a mi zona de alumno
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-700 px-6 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Recuerda:</strong> Las clases se anulan con al menos 48h de antelación.
        Si no se anula a tiempo, la clase se descuenta del bono. Excepción: justificante
        médico presentado en las 24h siguientes.
      </div>
    </div>
  );
}
