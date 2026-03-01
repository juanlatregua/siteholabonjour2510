import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Guía completa DELF DALF 2026 — HolaBonjour",
  description:
    "Todo sobre los exámenes DELF y DALF: qué son, niveles, cómo inscribirse, fechas en Andalucía, centros examinadores, precios y consejos de preparación.",
};

const levels = [
  { nivel: "A1", pruebas: "CO + CE + PE + PO", duracion: "1h20", precio: "~100\u20AC" },
  { nivel: "A2", pruebas: "CO + CE + PE + PO", duracion: "1h40", precio: "~100\u20AC" },
  { nivel: "B1", pruebas: "CO + CE + PE + PO", duracion: "1h55", precio: "~130\u20AC" },
  { nivel: "B2", pruebas: "CO + CE + PE + PO", duracion: "2h30", precio: "~160\u20AC" },
  { nivel: "C1", pruebas: "CO + CE + PE + PO", duracion: "4h00", precio: "~200\u20AC" },
  { nivel: "C2", pruebas: "CO + CE + PE + PO", duracion: "3h30", precio: "~200\u20AC" },
];

const centers = [
  "Málaga",
  "Sevilla",
  "Granada",
  "Cádiz",
];

const steps = [
  "Consulta las fechas de convocatoria en la web de tu centro examinador (Alliance Française o Institut Français).",
  "Elige el nivel al que quieres presentarte según tu preparación.",
  "Rellena el formulario de inscripción online del centro elegido.",
  "Realiza el pago de las tasas del examen.",
  "Recibe tu confirmación y prepara la documentación necesaria (DNI/pasaporte, foto).",
  "Acude al centro examinador en la fecha y hora indicadas.",
];

const tips = [
  "Empieza a prepararte al menos 3 meses antes del examen.",
  "Familiarízate con el formato: cada nivel tiene 4 pruebas (CO, CE, PE, PO).",
  "Practica con exámenes anteriores disponibles en la web de France Éducation International.",
  "Refuerza tu punto débil: la mayoría de candidatos fallan en la producción escrita.",
  "Graba tu expresión oral y escúchate para corregir errores.",
  "Lee prensa francesa a diario: Le Monde, France Info, TV5Monde.",
  "Trabaja la gestión del tiempo durante los simulacros.",
];

const faqs = [
  {
    question: "\u00BFCuánto cuesta el DELF?",
    answer:
      "Los precios varían según el nivel: desde unos 100\u20AC para A1-A2 hasta unos 200\u20AC para C1-C2. Cada centro examinador puede ajustar ligeramente las tasas.",
  },
  {
    question: "\u00BFCuánto tiempo necesito para preparar el DELF B2?",
    answer:
      "Depende de tu nivel actual. Si partes de un B1 sólido, entre 3 y 6 meses de preparación intensiva suelen ser suficientes. Con clases regulares y práctica diaria, es un objetivo muy alcanzable.",
  },
  {
    question: "\u00BFCaduca el DELF?",
    answer:
      "No. El DELF y el DALF son diplomas válidos de por vida. A diferencia del TCF o del TEF, no necesitas renovarlos.",
  },
  {
    question: "\u00BFPuedo presentarme sin academia?",
    answer:
      "Sí, puedes inscribirte como candidato libre directamente en un centro examinador. Sin embargo, prepararte con un profesor especializado aumenta significativamente tus probabilidades de éxito.",
  },
];

export default function GuiaDelfDalfPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-[70vh] px-6"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "var(--cin-text)",
        }}
      >
        <Particles count={40} color="#e8b865" />
        <MorphBlob
          size={400}
          color="#e8b865"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#3b82f6"
          position={{ bottom: "-10%", right: "-5%" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Guide complet DELF/DALF
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Todo lo que necesitas saber sobre los exámenes oficiales de francés:
            niveles, inscripción, fechas y preparación.
          </p>
        </div>
      </section>

      {/* Qué es el DELF/DALF */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Qu&apos;est-ce que le DELF/DALF ?
          </h2>
          <GlassCard>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              El DELF (Diplôme d&apos;Études en Langue Française) y el DALF (Diplôme
              Approfondi de Langue Française) son los diplomas oficiales del
              Ministerio de Educación francés que certifican el nivel de francés
              de candidatos extranjeros.
            </p>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              El DELF cubre los niveles A1 a B2, mientras que el DALF certifica
              los niveles C1 y C2, correspondientes a un dominio avanzado del
              idioma.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Son los únicos diplomas de francés reconocidos internacionalmente y{" "}
              <strong style={{ color: "var(--cin-gold)" }}>no caducan</strong>.
              Una vez obtenidos, son válidos de por vida.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* CTA 1 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Prépare-toi avec nous
          </GoldButton>
        </div>
      </CinematicSection>

      {/* Niveles */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Niveaux et épreuves
          </h2>

          {/* Desktop table */}
          <div className="hidden md:block">
            <GlassCard>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <th
                        className="py-3 px-4 text-sm font-semibold"
                        style={{ color: "var(--cin-gold)" }}
                      >
                        Nivel
                      </th>
                      <th
                        className="py-3 px-4 text-sm font-semibold"
                        style={{ color: "var(--cin-gold)" }}
                      >
                        Pruebas
                      </th>
                      <th
                        className="py-3 px-4 text-sm font-semibold"
                        style={{ color: "var(--cin-gold)" }}
                      >
                        Duración
                      </th>
                      <th
                        className="py-3 px-4 text-sm font-semibold"
                        style={{ color: "var(--cin-gold)" }}
                      >
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {levels.map((level) => (
                      <tr
                        key={level.nivel}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <td
                          className="py-3 px-4 font-bold"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {level.nivel}
                        </td>
                        <td
                          className="py-3 px-4 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {level.pruebas}
                        </td>
                        <td
                          className="py-3 px-4 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {level.duracion}
                        </td>
                        <td
                          className="py-3 px-4 text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          {level.precio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {levels.map((level) => (
              <GlassCard key={level.nivel}>
                <p
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--cin-gold)" }}
                >
                  {level.nivel}
                </p>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {level.pruebas}
                </p>
                <p
                  className="text-sm mb-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {level.duracion}
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {level.precio}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Dónde presentarse */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Où se présenter en Andalousie ?
          </h2>
          <GlassCard>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              En Andalucía puedes presentarte al DELF/DALF en centros
              autorizados como la Alliance Française y el Institut Français.
              Estos centros organizan convocatorias varias veces al año.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {centers.map((center) => (
                <div
                  key={center}
                  className="rounded-xl py-3 px-4 text-center text-sm font-medium"
                  style={{
                    background: "rgba(232,184,101,0.1)",
                    border: "1px solid rgba(232,184,101,0.2)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {center}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* CTA 2 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Prépare-toi avec nous
          </GoldButton>
        </div>
      </CinematicSection>

      {/* Cómo inscribirse */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Comment s&apos;inscrire ?
          </h2>
          <GlassCard>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-base"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                    style={{
                      background: "rgba(232,184,101,0.15)",
                      color: "var(--cin-gold)",
                      border: "1px solid rgba(232,184,101,0.3)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Consejos de preparación */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Conseils de préparation
          </h2>
          <GlassCard>
            <ul className="space-y-4">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span
                    style={{ color: "var(--cin-gold)", flexShrink: 0 }}
                  >
                    &#9733;
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* CTA 3 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Prépare-toi avec nous
          </GoldButton>
        </div>
      </CinematicSection>

      {/* FAQ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Questions fréquentes
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <GlassCard key={faq.question}>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Final CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Prêt à passer le DELF/DALF ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Prepárate con profesores nativos especializados en exámenes
            oficiales.
          </p>
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Prépare-toi avec nous
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
