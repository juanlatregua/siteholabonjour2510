import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard, GoldButton, CinematicSection } from "@/components/cinematic";
import { LEVEL_DATA } from "@/lib/level-content";

export const metadata: Metadata = {
  title: "Preparación DELF/DALF — Simulacros oficiales y corrección IA | HolaBonjour",
  description:
    "Prepara tu DELF o DALF online con simulacros oficiales FEI, corrección IA y clases con Isabelle. Niveles A1 a C2.",
  alternates: { canonical: "/preparacion-delf-dalf" },
  openGraph: {
    title: "Preparación DELF/DALF — Simulacros oficiales y corrección IA | HolaBonjour",
    description:
      "Prepara tu DELF o DALF online con simulacros oficiales FEI, corrección IA y clases con Isabelle. Niveles A1 a C2.",
    url: "https://holabonjour.es/preparacion-delf-dalf",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const faqs = [
  {
    question: "¿Qué diferencia hay entre el DELF y el DALF?",
    answer:
      "El DELF cubre los niveles A1 a B2 y el DALF los niveles C1 y C2. Ambos son diplomas oficiales del Ministerio de Educación francés, expedidos por France Éducation Internationale. Son válidos de por vida.",
  },
  {
    question: "¿Cuánto cuesta presentarse al DELF/DALF?",
    answer:
      "Las tasas varían según el nivel: A1 (108€), A2 (130€), B1 (160€), B2 (190€), C1 (205€) y C2 (220€). Los precios pueden variar ligeramente según el centro examinador.",
  },
  {
    question: "¿Cuánto tiempo necesito para prepararme?",
    answer:
      "Depende de tu nivel actual. Como referencia: de A1 a A2 necesitarás unas 100-120 horas, de B1 a B2 entre 150-200 horas. Recomendamos al menos 2-3 meses de preparación específica para el examen.",
  },
  {
    question: "¿Puedo practicar con simulacros reales gratis?",
    answer:
      "Sí. Ofrecemos simulacros completos con audio oficial de France Éducation Internationale para los niveles A2, B1, B2, C1 y C2. Incluyen las 4 pruebas del examen y corrección IA de la producción escrita.",
  },
  {
    question: "¿Qué es la corrección IA de HolaBonjour?",
    answer:
      "Nuestra IA corrige tu producción escrita con los mismos criterios que usan los examinadores DELF/DALF: respeto de la consigna, capacidad para argumentar, coherencia, léxico y gramática. Recibes una nota detallada con comentarios por criterio.",
  },
];

function getSimulacroCount(slug: string): number {
  const level = LEVEL_DATA.find((l) => l.slug === slug);
  if (!level) return 0;
  return level.simulacros.filter((s) => s.href !== null).length;
}

export default function PreparacionDelfDalfHub() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Preparación DELF/DALF Online",
            description:
              "Prepara tu DELF o DALF online con simulacros oficiales FEI, corrección IA y clases con Isabelle.",
            provider: {
              "@type": "EducationalOrganization",
              name: "HolaBonjour",
              url: "https://holabonjour.es",
            },
            educationalLevel: "A1-C2",
            inLanguage: "fr",
            teaches: "Francés — Preparación exámenes oficiales DELF y DALF",
            courseMode: "online",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "35",
              highPrice: "50",
              priceCurrency: "EUR",
              offerCount: "3",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
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
            Préparation DELF/DALF
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: "#3d4a5c" }}
          >
            Simulacros oficiales FEI, corrección IA con criterios reales y clases con
            Isabelle, examinadora oficial.
          </p>
          <p className="text-sm tracking-wide mb-8" style={{ color: "#6b7280" }}>
            Simulacros gratuitos &middot; Corrección IA &middot; Clases individuales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/examenes">Hacer simulacro gratis</GoldButton>
            <GoldButton href="#niveles" variant="outline">
              Elegir mi nivel
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* Grid de 6 niveles */}
      <CinematicSection className="py-20 px-6">
        <div id="niveles" className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Elige tu nivel
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEVEL_DATA.map((level) => {
              const count = getSimulacroCount(level.slug);
              const isDisabled = level.slug === "a1";

              const card = (
                <GlassCard key={level.code} className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "var(--cin-accent)" }}
                    >
                      {level.code}
                    </span>
                    {isDisabled ? (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(107,114,128,0.12)",
                          color: "#6b7280",
                          border: "1px solid rgba(107,114,128,0.2)",
                        }}
                      >
                        Próximamente
                      </span>
                    ) : (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(229,0,70,0.1)",
                          color: "#E50046",
                          border: "1px solid rgba(229,0,70,0.2)",
                        }}
                      >
                        {count} simulacro{count !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
                  >
                    {level.badge} {level.code} — {level.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "#6b7280" }}>
                    {level.hours} &middot; {level.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#3d4a5c" }}>
                    {level.profile.slice(0, 120)}...
                  </p>
                </GlassCard>
              );

              if (isDisabled) {
                return (
                  <div key={level.code} className="opacity-60 cursor-not-allowed">
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={level.code}
                  href={`/preparacion-delf-dalf/${level.slug}`}
                  className="block transition-transform hover:scale-[1.02]"
                  style={{ textDecoration: "none" }}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </CinematicSection>

      {/* Nuestros profesores son examinadores */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Nos professeurs sont examinateurs DELF/DALF
          </h2>
          <GlassCard>
            <p className="text-lg leading-relaxed" style={{ color: "#3d4a5c" }}>
              Nuestras profesoras son examinadoras oficiales DELF/DALF habilitadas por
              France Éducation Internationale. Conocen los criterios de evaluación de
              primera mano y te preparan con simulacros idénticos al examen real,
              correcciones detalladas y estrategias específicas para cada prueba.
            </p>
            <p
              className="text-lg font-semibold mt-4"
              style={{ color: "var(--cin-accent)" }}
            >
              El 100% de los alumnos de Isabelle aprueba desde 2017.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* 4 cards recursos */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Recursos gratuitos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <GlassCard className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
              >
                Corrección IA
              </h3>
              <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                Corrige tu producción escrita con los mismos criterios que los examinadores
                DELF/DALF. 3 correcciones gratis.
              </p>
              <GoldButton href="/correccion-ia" variant="outline">
                Probar gratis
              </GoldButton>
            </GlassCard>
            <GlassCard className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
              >
                Calendario de exámenes
              </h3>
              <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                Todas las fechas DELF/DALF en España: Alliance Française, Institut
                Français, EOI. Activa un recordatorio.
              </p>
              <GoldButton href="/calendario-examenes" variant="outline">
                Ver fechas
              </GoldButton>
            </GlassCard>
            <GlassCard className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
              >
                Simulacros completos
              </h3>
              <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                Practica con simulacros idénticos al examen real. Audio oficial FEI,
                4 pruebas completas, cronómetro.
              </p>
              <GoldButton href="/examenes" variant="outline">
                Ver simulacros
              </GoldButton>
            </GlassCard>
            <GlassCard className="p-6">
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
              >
                Test de nivel
              </h3>
              <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                Descubre tu nivel de francés en menos de 20 minutos con nuestro test
                adaptativo gratuito.
              </p>
              <GoldButton href="/test-de-nivel" variant="outline">
                Hacer el test
              </GoldButton>
            </GlassCard>
          </div>
        </div>
      </CinematicSection>

      {/* FAQ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group"
                style={{
                  background: "rgba(30,45,74,0.03)",
                  border: "1px solid rgba(30,45,74,0.08)",
                  borderRadius: 16,
                }}
              >
                <summary
                  className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold select-none"
                  style={{ color: "var(--cin-text)" }}
                >
                  <span>{item.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-open:rotate-180"
                    style={{ color: "var(--cin-accent)", flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div
                  className="px-6 pb-5 leading-relaxed"
                  style={{ color: "#3d4a5c" }}
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA final */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            ¿Quieres prepararte con Isabelle?
          </h2>
          <p className="text-lg mb-2" style={{ color: "#3d4a5c" }}>
            El 100% de los alumnos de Isabelle aprueba desde 2017.
          </p>
          <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
            Sesión diagnóstico — 25€ &middot; Sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/contratar?producto=diagnostico">
              Reservar sesión diagnóstico
            </GoldButton>
            <GoldButton href="/contratar" variant="outline">
              Ver packs de preparación
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
