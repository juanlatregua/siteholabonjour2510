import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Pago confirmado — HolaBonjour",
  description: "Tu pago ha sido procesado correctamente. Bienvenido/a a HolaBonjour.",
};

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ pending?: string }>;
}) {
  const params = await searchParams;
  const isPending = params.pending === "true";

  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: isPending ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)",
              border: isPending ? "2px solid rgba(245,158,11,0.4)" : "2px solid rgba(34,197,94,0.4)",
            }}
          >
            {isPending ? (
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          <h1
            className="text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isPending ? "Reserva registrada" : "Pago confirmado"}
          </h1>
          <p className="mt-4 text-lg" style={{ color: "#3d4a5c" }}>
            {isPending
              ? "Tu reserva está registrada. Confirmaremos tu pago en menos de 24h y recibirás un email de confirmación."
              : "Tu pack de clases ha sido activado. Recibirás un email de confirmación con los detalles."}
          </p>
          {isPending && (
            <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              Si tienes alguna duda, escríbenos a info@holabonjour.es
            </p>
          )}
          {!isPending && (
            <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              Nos pondremos en contacto contigo para organizar tus clases.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <GoldButton href="/zona-alumno">
              Ir a mi zona de alumno
            </GoldButton>
            <GoldButton href="/" variant="outline">
              Volver al inicio
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
