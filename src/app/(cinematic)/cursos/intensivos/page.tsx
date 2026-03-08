import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cursos intensivos de francés online — HolaBonjour",
  description:
    "Cursos intensivos de francés: verano, pre-examen DELF/DALF, a medida. Sesiones individuales diarias por Zoom.",
  alternates: { canonical: "/cursos/intensivos" },
  openGraph: {
    title: "Cursos intensivos de francés online — HolaBonjour",
    description:
      "Cursos intensivos de francés: verano, pre-examen DELF/DALF, a medida. Sesiones individuales diarias por Zoom.",
    url: "https://holabonjour.es/cursos/intensivos",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const courseTypes = [
  {
    icon: "☀️",
    title: "Été",
    description:
      "Cursos de verano. Inmersion intensiva de julio a septiembre. Aprovecha las vacaciones para dar un salto de nivel.",
  },
  {
    icon: "📝",
    title: "Pré-examen",
    description:
      "Sprint de preparacion antes de tu convocatoria DELF/DALF. Simulacros intensivos y estrategia por prueba.",
  },
  {
    icon: "⚡",
    title: "Sur mesure",
    description:
      "Programa personalizado segun tus necesidades y plazos. Tu marcas el ritmo, nosotros el contenido.",
  },
];

export default function IntensivosPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Curso Intensivo de Francés Online",
            "description":
              "Cursos intensivos de francés: verano, pre-examen DELF/DALF, a medida. Sesiones individuales diarias por Zoom.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
            },
            "educationalLevel": "A1-C2",
            "inLanguage": "fr",
            "teaches": "Francés — Curso intensivo personalizado",
            "courseMode": "online",
            "offers": {
              "@type": "Offer",
              "price": "Según formato",
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
            Cours intensifs
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
          >
            Cursos sprint de 2-4 semanas. Ideal para preparacion de examenes,
            viajes o inmersion rapida.
          </p>
        </div>
      </CinematicSection>

      {/* Course types */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Nos formules intensives
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {courseTypes.map((course) => (
              <GlassCard key={course.title} glow="rgba(107,63,160,0.2)">
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {course.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5f6b78" }}
                >
                  {course.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Format */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard glow="rgba(107,63,160,0.15)">
            <p
              className="text-xl md:text-2xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "#6B3FA0",
              }}
            >
              10-20h/semaine &middot; 2-4 semaines &middot; En ligne
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "#5f6b78" }}
            >
              Sesiones individuales diarias de 55 minutos por Zoom con profesores nativos.
              Apuntes y seguimiento personalizado.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* What's included */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Ce qui est inclus
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Test de niveau initial",
                text: "Evaluacion previa para disenar tu programa individual.",
              },
              {
                title: "Matériel pédagogique",
                text: "Apuntes y seguimiento personalizado incluidos en el precio.",
              },
              {
                title: "Suivi quotidien",
                text: "Feedback diario y correccion de ejercicios.",
              },
              {
                title: "Certificat de fin",
                text: "Certificado de aprovechamiento al finalizar el curso.",
              },
            ].map((item) => (
              <GlassCard key={item.title} hover={false}>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#6B3FA0",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "#5f6b78" }}
                >
                  {item.text}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prêt pour l&apos;intensif ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "#5f6b78" }}
          >
            Reserva tu plaza ahora. Clases individuales con horarios flexibles.
          </p>
          <GoldButton href={CONTACT.whatsapp}>
            Réserver mon intensif
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
