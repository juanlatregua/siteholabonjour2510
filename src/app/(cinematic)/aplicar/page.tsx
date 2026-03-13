import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";
import AplicarForm from "./AplicarForm";

export const metadata: Metadata = {
  title: "Solicitar acceso como profesor | HolaBonjour",
  description:
    "Envía tu candidatura para ser profesor verificado en HolaBonjour. Sube tus diplomas y empieza a dar clases en 48 horas.",
  alternates: { canonical: "/aplicar" },
};

export default function AplicarPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <CinematicSection className="py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 800,
              color: "#1e2d4a",
              marginBottom: "0.75rem",
            }}
          >
            Solicitud de acceso
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#5f6b78", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Completa el formulario y sube tus diplomas.
            Nuestra IA verifica tus credenciales al instante.
            Respuesta en 48 horas.
          </p>
        </div>
      </CinematicSection>

      <section className="pb-20 px-4" style={{ background: "var(--cin-bg)" }}>
        <div className="mx-auto max-w-2xl">
          <AplicarForm />
        </div>
      </section>
    </div>
  );
}
