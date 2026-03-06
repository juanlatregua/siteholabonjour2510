import type { Metadata } from "next";
import Image from "next/image";
import { team } from "@/data/team";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Sobre nosotros — Equipo y método — HolaBonjour",
  description:
    "Conoce al equipo de HolaBonjour: profesora nativa francesa examinadora DELF/DALF y traductor jurado. Academia online de francés desde Málaga.",
  alternates: { canonical: "/sobre-nosotros" },
  openGraph: {
    title: "Sobre nosotros — Equipo y método — HolaBonjour",
    description:
      "Conoce al equipo de HolaBonjour: profesora nativa francesa examinadora DELF/DALF y traductor jurado. Academia online de francés desde Málaga.",
    url: "https://holabonjour.es/sobre-nosotros",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const methodologyPillars = [
  {
    title: "Immersion culturelle",
    description:
      "Aprendes francés a través de la cultura: cine, gastronomía, actualidad y juegos. Cada clase es una ventana a Francia.",
    icon: "🎬",
  },
  {
    title: "Préparation rigoureuse",
    description:
      "Cada sesión está alineada con los estándares oficiales DELF y DALF. Simulacros reales, correcciones detalladas, estrategia por prueba.",
    icon: "🎯",
  },
  {
    title: "Accompagnement réel",
    description:
      "Tu profesora te conoce, sigue tu progreso y adapta el plan. Nada de cursos genéricos: cada alumno tiene su ruta.",
    icon: "🤝",
  },
  {
    title: "100% en ligne",
    description:
      "Clases en directo por videoconferencia desde donde estés. Sin desplazamientos, con la misma calidad que una clase presencial.",
    icon: "💻",
  },
];

const keyNumbers = [
  { value: "15+", label: "años de experiencia" },
  { value: "100%", label: "profesora nativa" },
  { value: "A1–C2", label: "todos los niveles" },
  { value: "4.5/5", label: "Google Reviews" },
];

export default function SobreNosotrosPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Sobre nosotros — HolaBonjour",
            "description": "Academia de francés online con sede en Málaga, fundada por una profesora nativa francesa examinadora DELF/DALF y un traductor jurado.",
            "mainEntity": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
              "description": "Academia de francés online especializada en preparación DELF/DALF, conversación y francés para empresas.",
              "founder": [
                {
                  "@type": "Person",
                  "name": "Isabelle Guitton",
                  "jobTitle": "Directora pedagógica",
                  "knowsLanguage": ["fr", "es"],
                },
                {
                  "@type": "Person",
                  "name": "Juan Silva",
                  "jobTitle": "Director técnico",
                  "knowsLanguage": ["es", "fr", "en"],
                },
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Málaga",
                "addressRegion": "Andalucía",
                "addressCountry": "ES",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            &Agrave; propos de nous
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
          >
            Dos apasionados del franc&eacute;s con una misi&oacute;n: hacer que aprender
            franc&eacute;s sea una experiencia, no solo una clase.
          </p>
        </div>
      </CinematicSection>

      {/* Key numbers */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyNumbers.map((n) => (
            <div key={n.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "#E50046" }}
              >
                {n.value}
              </div>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                {n.label}
              </p>
            </div>
          ))}
        </div>
      </CinematicSection>

      {/* Team — Isabelle (featured) */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Votre &eacute;quipe
          </h2>

          {/* Isabelle — featured card with photo */}
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="shrink-0">
                <Image
                  src="/images/isabelle-guitton.jpg"
                  alt="Isabelle Guitton — Directora pedagógica de HolaBonjour"
                  width={200}
                  height={250}
                  className="rounded-xl object-cover"
                  style={{ width: 200, height: 250, objectFit: "cover" }}
                />
              </div>
              <div className="flex-1">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
                >
                  {team[0].name}
                </h3>
                <p
                  className="text-sm font-semibold mb-4"
                  style={{ color: "#E50046" }}
                >
                  {team[0].role}
                </p>
                <p
                  className="leading-relaxed mb-4"
                  style={{ color: "#3d4a5c" }}
                >
                  {team[0].bioLong}
                </p>
                <div className="flex flex-wrap gap-2">
                  {team[0].credentials.map((credential) => (
                    <span
                      key={credential}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(229,0,70,0.12)",
                        color: "#E50046",
                        border: "1px solid rgba(229,0,70,0.2)",
                      }}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Juan — standard card */}
          <GlassCard>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: 80,
                  height: 80,
                  background: "#395D9F",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                JS
              </div>
              <div className="flex-1">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
                >
                  {team[1].name}
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#E50046" }}
                >
                  {team[1].role}
                </p>
                <p
                  className="leading-relaxed mb-3"
                  style={{ color: "#3d4a5c" }}
                >
                  {team[1].bioLong}
                </p>
                <div className="flex flex-wrap gap-2">
                  {team[1].credentials.map((credential) => (
                    <span
                      key={credential}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(229,0,70,0.12)",
                        color: "#E50046",
                        border: "1px solid rgba(229,0,70,0.2)",
                      }}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Our story */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Notre histoire
          </h2>
          <GlassCard>
            <div className="space-y-4 leading-relaxed" style={{ color: "#3d4a5c" }}>
              <p>
                HolaBonjour naci&oacute; de la convicci&oacute;n de que aprender franc&eacute;s va mucho m&aacute;s all&aacute;
                de la gram&aacute;tica. Isabelle, profesora nativa y examinadora DELF/DALF, y Juan,
                traductor jurado y desarrollador, unieron sus experiencias para crear una academia
                que combina ense&ntilde;anza rigurosa con tecnolog&iacute;a e inmersi&oacute;n cultural.
              </p>
              <p>
                Desde M&aacute;laga, damos clases online a alumnos en toda Espa&ntilde;a, Francia y
                Latinoam&eacute;rica. Nuestra metodolog&iacute;a se basa en la preparaci&oacute;n real de
                ex&aacute;menes oficiales —con simulacros id&eacute;nticos al examen y correcci&oacute;n
                con IA— y en recursos culturales gratuitos como Le C&ocirc;t&eacute; Vie: cine, gastronom&iacute;a,
                actualidad y juegos para practicar fuera de clase.
              </p>
              <p>
                El resultado: alumnos que no solo aprueban sus ex&aacute;menes, sino que disfrutan
                del camino. Porque creemos que aprender franc&eacute;s debe ser una experiencia,
                no solo una obligaci&oacute;n.
              </p>
            </div>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Methodology */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Notre m&eacute;thode
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {methodologyPillars.map((pillar) => (
              <GlassCard key={pillar.title}>
                <div className="text-3xl mb-4" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "#3d4a5c" }}
                >
                  {pillar.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* What makes us different */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Ce qui nous diff&eacute;rencie
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <GlassCard>
              <h3 className="font-bold mb-2" style={{ color: "#E50046" }}>
                Examinadora oficial
              </h3>
              <p className="text-sm" style={{ color: "#3d4a5c" }}>
                Isabelle est&aacute; habilitada por France &Eacute;ducation International.
                Conoce los criterios exactos de evaluaci&oacute;n porque ella misma corrige ex&aacute;menes DELF y DALF.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-bold mb-2" style={{ color: "#E50046" }}>
                Correcci&oacute;n IA + humana
              </h3>
              <p className="text-sm" style={{ color: "#3d4a5c" }}>
                Practica con nuestra correcci&oacute;n por inteligencia artificial con r&uacute;bricas
                oficiales y recibe feedback de tu profesora en cada sesi&oacute;n.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-bold mb-2" style={{ color: "#E50046" }}>
                Simulacros reales
              </h3>
              <p className="text-sm" style={{ color: "#3d4a5c" }}>
                Simulaciones completas de examen con audios, tiempos y condiciones reales.
                El d&iacute;a del examen no hay sorpresas.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="font-bold mb-2" style={{ color: "#E50046" }}>
                Plataforma propia
              </h3>
              <p className="text-sm" style={{ color: "#3d4a5c" }}>
                Portal del alumno con seguimiento, materiales, calendario de ex&aacute;menes
                y recursos culturales gratuitos.
              </p>
            </GlassCard>
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Envie de nous conna&icirc;tre ?
          </h2>
          <p
            className="mb-10 text-lg"
            style={{ color: "#3d4a5c" }}
          >
            Escr&iacute;benos por WhatsApp o descubre tu nivel con nuestro test gratuito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="https://wa.me/34685070304">
              WhatsApp
            </GoldButton>
            <GoldButton href="mailto:hola@holabonjour.es" variant="outline">
              hola@holabonjour.es
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
