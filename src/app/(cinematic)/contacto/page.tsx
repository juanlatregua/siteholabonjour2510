import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con HolaBonjour: WhatsApp, email o formulario. Reserva tu clase de prueba gratuita.",
};

const contactMethods = [
  {
    title: "WhatsApp",
    description: "Respuesta rápida en horario laboral",
    detail: "685 07 03 04",
    href: "https://wa.me/34685070304",
    cta: "Escribir por WhatsApp",
  },
  {
    title: "Email",
    description: "Te respondemos en menos de 24 horas",
    detail: "info@holabonjour.es",
    href: "mailto:info@holabonjour.es",
    cta: "Enviar email",
  },
  {
    title: "Clase de prueba",
    description: "Conoce nuestro método sin compromiso",
    detail: "Sesión gratuita de 30 minutos",
    href: "https://wa.me/34685070304?text=Quiero%20reservar%20una%20clase%20de%20prueba",
    cta: "Reservar clase",
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/holabonjourmalaga/" },
  { name: "Instagram", href: "https://www.instagram.com/holabonjourmalaga/" },
  { name: "X (Twitter)", href: "https://twitter.com/Holabonjour_mlg" },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCSqK90F1Tm9iYLpZN0tFIGg",
  },
];

export default function ContactoPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Contacto
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            ¿Tienes preguntas? Estamos aquí para ayudarte.
          </p>
        </div>
      </CinematicSection>

      {/* Contact methods */}
      <CinematicSection className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <GlassCard key={method.title}>
                <h2
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {method.title}
                </h2>
                <p
                  className="text-sm mb-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {method.description}
                </p>
                <p className="text-sm font-medium mb-5">{method.detail}</p>
                <GoldButton href={method.href} variant="outline">
                  {method.cta}
                </GoldButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Contact form */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Envíanos un mensaje
          </h2>
          <GlassCard>
            <ContactForm />
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Social + location */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Síguenos
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Clases 100% online. Alumnos en España, Francia y Latinoamérica.
          </p>
        </div>
      </CinematicSection>
    </div>
  );
}
