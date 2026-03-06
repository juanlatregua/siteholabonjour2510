import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Preparación DELF/DALF con examinadoras oficiales — HolaBonjour",
  description:
    "Prepara tu examen DELF o DALF con profesoras examinadoras oficiales. Simulacros reales, corrección personalizada. Niveles A1 a C2.",
  alternates: { canonical: "/cursos/preparacion-delf-dalf" },
  openGraph: {
    title: "Preparación DELF/DALF con examinadoras oficiales — HolaBonjour",
    description:
      "Prepara tu examen DELF o DALF con profesoras examinadoras oficiales. Simulacros reales, corrección personalizada. Niveles A1 a C2.",
    url: "https://holabonjour.es/cursos/preparacion-delf-dalf",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const levels = [
  {
    code: "A1",
    name: "Découverte",
    evaluated: "Comprension y expresion basica",
    duration: "1h20",
  },
  {
    code: "A2",
    name: "Survie",
    evaluated: "Comunicacion cotidiana",
    duration: "1h40",
  },
  {
    code: "B1",
    name: "Seuil",
    evaluated: "Autonomia en viajes y trabajo",
    duration: "1h55",
  },
  {
    code: "B2",
    name: "Avancé",
    evaluated: "Argumentacion y comprension compleja",
    duration: "2h30",
  },
  {
    code: "C1",
    name: "Autonome",
    evaluated: "Fluidez profesional y academica",
    duration: "4h00",
  },
  {
    code: "C2",
    name: "Maîtrise",
    evaluated: "Nivel nativo",
    duration: "3h30",
  },
];

const faqs = [
  {
    question: "Combien coûte le DELF ?",
    answer:
      "Las tasas del DELF varian segun el nivel: A1 (108 EUR), A2 (130 EUR), B1 (160 EUR), B2 (190 EUR). El DALF C1 cuesta 205 EUR y el C2, 220 EUR. Los precios pueden variar ligeramente segun el centro examinador.",
  },
  {
    question: "Où passer le DELF en Andalousie ?",
    answer:
      "En Andalucia puedes presentarte al DELF/DALF en centros acreditados de Malaga, Sevilla, Granada y Cadiz. La Alliance Francaise de Malaga es el centro mas cercano para la Costa del Sol.",
  },
  {
    question: "Combien de temps pour se préparer ?",
    answer:
      "El tiempo de preparacion depende de tu nivel actual y del nivel objetivo. Como referencia: de A1 a A2 necesitaras unas 100-120 horas, de B1 a B2 entre 150-200 horas. Recomendamos al menos 2-3 meses de preparacion especifica para el examen.",
  },
];

export default function PreparacionDelfDalfPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Preparación DELF/DALF Online",
            "description":
              "Prepara tu examen DELF o DALF con profesoras examinadoras oficiales. Simulacros reales, corrección personalizada. Niveles A1 a C2.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
            },
            "educationalLevel": "A1-C2",
            "inLanguage": "fr",
            "teaches":
              "Francés — Preparación exámenes oficiales DELF y DALF",
            "courseMode": "online",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "35",
              "highPrice": "50",
              "priceCurrency": "EUR",
              "offerCount": "3",
              "availability": "https://schema.org/InStock",
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "instructor": {
                "@type": "Person",
                "name": "Profesoras nativas certificadas",
              },
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
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer,
              },
            })),
          }),
        }}
      />
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div
          className="absolute inset-0"
          style={{
            background: "#faf7f2",
          }}
        />
        <Particles color="#6B3FA0" />
        <MorphBlob
          size={400}
          color="#6B3FA0"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#6B3FA0"
          position={{ bottom: "-10%", right: "-5%" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Préparation DELF/DALF
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
          >
            Preparación específica para cada nivel del examen oficial. Simulacros
            reales, correcciones detalladas y estrategia por prueba.
          </p>
          <p
            className="text-sm mt-4 tracking-wide"
            style={{ color: "#6b7280" }}
          >
            Cours individuel &middot; 1h par séance &middot; 100% en ligne par Zoom
          </p>
        </div>
      </CinematicSection>

      {/* CEFR Levels */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Les niveaux DELF &amp; DALF
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <GlassCard key={level.code} glow="rgba(107,63,160,0.2)">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#6B3FA0" }}
                  >
                    {level.code}
                  </span>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(107,63,160,0.15)",
                      color: "#4A2870",
                      border: "1px solid rgba(107,63,160,0.3)",
                    }}
                  >
                    {level.duration}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {level.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "#6b7280" }}
                >
                  {level.evaluated}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Our teachers */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Nos professeurs sont examinateurs DELF/DALF
          </h2>
          <GlassCard glow="rgba(107,63,160,0.15)">
            <p
              className="text-lg leading-relaxed"
              style={{ color: "#3d4a5c" }}
            >
              Nuestras profesoras son examinadoras oficiales DELF/DALF. Conocen
              los criterios de evaluacion de primera mano y te preparan con
              simulacros identicos al examen real, correcciones detalladas y
              estrategias especificas para cada prueba.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* FAQ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} hover={false}>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#6B3FA0",
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "#6b7280" }}
                >
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Exam simulation + AI Correction + Calendar */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-4xl grid gap-6 sm:grid-cols-2">
          <GlassCard className="p-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#6B3FA0" }}
            >
              Examen DELF A1 complet
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
              Simulation complète avec audios, textes et correction IA de la production écrite. Comme le jour de l&apos;examen.
            </p>
            <GoldButton href="/examen-delf-a1" variant="outline">
              Passer l&apos;examen A1
            </GoldButton>
          </GlassCard>
          <GlassCard className="p-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#6B3FA0" }}
            >
              Examen DELF A2 complet
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
              Simulation complète du DELF A2 avec audios, textes et correction IA de la production écrite. Entraîne-toi comme au vrai examen.
            </p>
            <GoldButton href="/examen-delf-a2" variant="outline">
              Passer l&apos;examen A2
            </GoldButton>
          </GlassCard>
          <GlassCard className="p-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#6B3FA0" }}
            >
              Correction IA de tes écrits
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
              Entraîne-toi entre les séances. Notre IA corrige ta production écrite avec les
              mêmes critères que les examinateurs DELF/DALF.
            </p>
            <GoldButton href="/correccion-ia" variant="outline">
              Essayer gratuitement
            </GoldButton>
          </GlassCard>
          <GlassCard className="p-6">
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#6B3FA0" }}
            >
              Calendrier des examens
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
              Toutes les dates DELF/DALF en Espagne : Alliance Française, Institut Français, EOI.
              Active un rappel pour ne rater aucun délai.
            </p>
            <GoldButton href="/calendario-examenes" variant="outline">
              Voir les dates
            </GoldButton>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prêt à réussir ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "#6b7280" }}
          >
            Empieza tu preparaci&oacute;n con profesoras examinadoras. Inf&oacute;rmate sin compromiso.
          </p>
          <GoldButton href={CONTACT.whatsapp}>
            Commencer ma préparation
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
