import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title:
    "Guia completa DELF y DALF 2026 — Niveles, estructura, precios y preparacion | HolaBonjour",
  description:
    "Todo sobre DELF y DALF: niveles A1-C2, estructura de cada examen, precios orientativos, fechas en Espana, centros examinadores, tiempo de preparacion, consejos para aprobar y recursos gratuitos. Guia actualizada 2026.",
  alternates: { canonical: "/recursos/guia-delf-dalf" },
  openGraph: {
    title:
      "Guia completa DELF y DALF 2026 — Niveles, estructura, precios y preparacion | HolaBonjour",
    description:
      "Todo sobre DELF y DALF: niveles A1-C2, estructura de cada examen, precios orientativos, fechas en Espana, centros examinadores, tiempo de preparacion, consejos para aprobar y recursos gratuitos. Guia actualizada 2026.",
    url: "https://holabonjour.es/recursos/guia-delf-dalf",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "article",
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const levels = [
  {
    nivel: "A1",
    diploma: "DELF",
    co: "20 min",
    ce: "30 min",
    pe: "30 min",
    po: "5-7 min",
    duracion: "~1h20",
    precio: "~108\u20AC",
  },
  {
    nivel: "A2",
    diploma: "DELF",
    co: "25 min",
    ce: "30 min",
    pe: "45 min",
    po: "6-8 min",
    duracion: "~1h40",
    precio: "~108\u20AC",
  },
  {
    nivel: "B1",
    diploma: "DELF",
    co: "25 min",
    ce: "35 min",
    pe: "45 min",
    po: "15 min",
    duracion: "~2h",
    precio: "~145\u20AC",
  },
  {
    nivel: "B2",
    diploma: "DELF",
    co: "30 min",
    ce: "60 min",
    pe: "60 min",
    po: "20 min",
    duracion: "~2h30",
    precio: "~175\u20AC",
  },
  {
    nivel: "C1",
    diploma: "DALF",
    co: "40 min",
    ce: "50 min",
    pe: "2h30",
    po: "30 min",
    duracion: "~4h",
    precio: "~210\u20AC",
  },
  {
    nivel: "C2",
    diploma: "DALF",
    co: "30 min",
    ce: "\u2014",
    pe: "3h30 (combinado)",
    po: "30 min",
    duracion: "~4h30",
    precio: "~230\u20AC",
  },
];

const centers = ["Malaga", "Sevilla", "Granada", "Cadiz"];

const steps = [
  "Consulta las fechas de convocatoria en la web de tu centro examinador (Alliance Francaise o Institut Francais).",
  "Elige el nivel al que quieres presentarte segun tu preparacion.",
  "Rellena el formulario de inscripcion online del centro elegido.",
  "Realiza el pago de las tasas del examen.",
  "Recibe tu confirmacion y prepara la documentacion necesaria (DNI/pasaporte, foto).",
  "Acude al centro examinador en la fecha y hora indicadas.",
];

const prepTime = [
  {
    actual: "Cero",
    objetivo: "A1",
    horas: "60-80 h",
    meses: "4-5 meses",
  },
  {
    actual: "A1",
    objetivo: "A2",
    horas: "80-100 h",
    meses: "5-6 meses",
  },
  {
    actual: "A2",
    objetivo: "B1",
    horas: "150-200 h",
    meses: "9-12 meses",
  },
  {
    actual: "B1",
    objetivo: "B2",
    horas: "200-250 h",
    meses: "12-15 meses",
  },
  {
    actual: "B2",
    objetivo: "C1",
    horas: "250-300 h",
    meses: "15-18 meses",
  },
  {
    actual: "C1",
    objetivo: "C2",
    horas: "300+ h",
    meses: "18+ meses",
  },
];

const skillTips = [
  {
    skill: "Comprension oral (CO)",
    icon: "\uD83C\uDFA7",
    tips: [
      "Escucha a diario podcasts en frances: RFI Savoirs, France Inter, France Culture.",
      "Mira documentales y noticias en TV5Monde con subtitulos en frances (no en espanol).",
      "Practica la toma de notas rapida: apunta palabras clave mientras escuchas.",
      "Acostumbrate a diferentes acentos franceses (metropolitano, belga, suizo, quebecois).",
      "Haz simulacros cronometrados: en el examen solo escucharas cada audio una o dos veces.",
    ],
  },
  {
    skill: "Comprension escrita (CE)",
    icon: "\uD83D\uDCDA",
    tips: [
      "Lee prensa francesa todos los dias: Le Monde, Le Figaro, Courrier International.",
      "Trabaja la lectura rapida: identifica las ideas principales sin traducir palabra por palabra.",
      "Amplia tu vocabulario con fichas tematicas (medio ambiente, tecnologia, sociedad).",
      "Practica con textos del mismo tipo que aparecen en el examen (articulos, cartas, ensayos).",
      "Para niveles B2+, lee textos argumentativos y aprende a identificar la tesis del autor.",
    ],
  },
  {
    skill: "Produccion escrita (PE)",
    icon: "\u270D\uFE0F",
    tips: [
      "Domina la estructura clasica francesa: introduction - developpement - conclusion.",
      "Memoriza conectores logicos: en revanche, neanmoins, par consequent, en outre, d\u2019ailleurs.",
      "Practica escribiendo cartas formales, ensayos argumentativos y articulos de opinion.",
      "Respeta siempre el numero de palabras exigido (suele indicarse en el enunciado).",
      "Haz que un profesor nativo corrija tus textos para identificar errores recurrentes.",
      "En B2+, aprende a argumentar con matices: utiliza el condicional y las concesiones.",
    ],
  },
  {
    skill: "Produccion oral (PO)",
    icon: "\uD83C\uDFA4",
    tips: [
      "Grabate hablando y escuchate para identificar errores de pronunciacion y fluidez.",
      "Practica el monologue argumente (B2+): da tu opinion, argumenta y concluye en 10-15 minutos.",
      "Prepara frases de transicion: je voudrais aborder..., en ce qui concerne..., pour conclure...",
      "Simula entrevistas con tu profesor: la interaccion con el jurado es parte de la nota.",
      "Trabaja la gestion del estres: respira, toma 10 segundos antes de responder, no te precipites.",
      "Para el debate (B2+), practica defender una postura con la que no estes de acuerdo.",
    ],
  },
];

const faqs = [
  {
    question: "\u00BFEl DELF caduca?",
    answer:
      "No. El DELF y el DALF son diplomas validos de por vida. Una vez aprobados, no necesitas renovarlos ni volver a examinarte. Esta es una de sus grandes ventajas frente a otros certificados como el TCF o el TEF.",
  },
  {
    question: "\u00BFPuedo presentarme por libre, sin academia?",
    answer:
      "Si, puedes inscribirte como candidato libre directamente en un centro examinador autorizado (Alliance Francaise o Institut Francais). Sin embargo, prepararte con un profesor especializado aumenta significativamente tus probabilidades de exito, especialmente a partir de B2.",
  },
  {
    question: "\u00BFCuanto cuesta el examen DELF/DALF?",
    answer:
      "Los precios varian segun el nivel: desde unos 108\u20AC para A1-A2, pasando por 145\u20AC para B1, 175\u20AC para B2, hasta 210-230\u20AC para C1-C2. Cada centro examinador puede ajustar ligeramente las tasas. Consulta la web de tu centro para conocer el precio exacto.",
  },
  {
    question: "\u00BFCuanto tiempo necesito para preparar el DELF B2?",
    answer:
      "Depende de tu nivel actual. Si partes de un B1 solido, necesitaras entre 200 y 250 horas de estudio, lo que equivale a 12-15 meses con 4 horas de trabajo a la semana. Con clases individuales regulares y practica diaria, es un objetivo muy alcanzable.",
  },
  {
    question: "\u00BFPuedo repetir el examen si suspendo?",
    answer:
      "Si, puedes volver a presentarte tantas veces como necesites. Solo tienes que inscribirte en la siguiente convocatoria disponible y volver a pagar las tasas. No hay limite de intentos ni penalizacion por haber suspendido antes.",
  },
  {
    question: "\u00BFVale el DELF para oposiciones en Espana?",
    answer:
      "Si. El DELF y el DALF son los diplomas de frances mas aceptados en las oposiciones espanolas. La mayoria de convocatorias exigen un minimo de B2, y niveles superiores (C1, C2) suelen otorgar puntuacion adicional en la fase de meritos.",
  },
  {
    question:
      "\u00BFQue diferencia hay entre el DELF y el DALF?",
    answer:
      "El DELF (Diplome d\u2019Etudes en Langue Francaise) cubre los niveles A1, A2, B1 y B2. El DALF (Diplome Approfondi de Langue Francaise) certifica los niveles C1 y C2, que corresponden a un dominio avanzado y experto del idioma. Ambos son emitidos por el Ministerio de Educacion frances.",
  },
  {
    question: "\u00BFNecesito apostilla para usar el DELF en el extranjero?",
    answer:
      "No. El DELF y el DALF estan reconocidos internacionalmente sin necesidad de apostilla ni homologacion. Son validos en mas de 170 paises y aceptados por universidades, empresas y administraciones publicas en todo el mundo francofono.",
  },
  {
    question:
      "\u00BFEl TCF vale igual que el DELF?",
    answer:
      "No exactamente. El TCF (Test de Connaissance du Francais) es un examen de nivel que caduca a los 2 anos, mientras que el DELF/DALF son diplomas permanentes. El TCF puede servir para tramites puntuales (visados, universidad), pero el DELF es mas valioso a largo plazo porque no expira.",
  },
  {
    question: "\u00BFQue nota necesito para aprobar el DELF?",
    answer:
      "Para aprobar necesitas un minimo de 50 puntos sobre 100 (50%). Ademas, no puedes obtener menos de 5 puntos sobre 25 en ninguna de las cuatro pruebas. Si sacas menos de 5/25 en cualquier competencia, suspendes automaticamente aunque la nota global sea superior a 50.",
  },
  {
    question: "\u00BFCuantas convocatorias hay al ano en Espana?",
    answer:
      "Normalmente hay entre 2 y 4 convocatorias al ano, dependiendo del centro examinador. Las fechas mas habituales son en febrero-marzo, mayo-junio y noviembre-diciembre. Consulta la web de la Alliance Francaise o del Institut Francais de tu ciudad para conocer las fechas exactas.",
  },
  {
    question:
      "\u00BFPuedo presentarme a varios niveles a la vez?",
    answer:
      "Si, puedes inscribirte en varios niveles en la misma convocatoria siempre que los horarios no coincidan. Sin embargo, es recomendable concentrarse en un solo nivel para maximizar tus posibilidades de exito.",
  },
];

const recursos = [
  {
    nombre: "France Education International",
    url: "https://www.france-education-international.fr/diplome/delf-tout-public",
    descripcion:
      "Pagina oficial con sujets d\u2019examen (examenes de ejemplo) de todos los niveles. Descarga gratis modelos de examenes anteriores con sus correcciones.",
  },
  {
    nombre: "TV5Monde - Apprendre le francais",
    url: "https://apprendre.tv5monde.com/",
    descripcion:
      "Miles de ejercicios interactivos clasificados por nivel (A1-C2). Ideal para trabajar comprension oral y escrita con videos autenticos.",
  },
  {
    nombre: "RFI Savoirs",
    url: "https://savoirs.rfi.fr/",
    descripcion:
      "Ejercicios de comprension oral basados en noticias reales de Radio France Internationale. Perfecto para preparar la prueba de CO desde B1.",
  },
  {
    nombre: "Le Monde - Articulos de actualidad",
    url: "https://www.lemonde.fr/",
    descripcion:
      "Periodico de referencia en Francia. Leer articulos a diario mejora tu comprension escrita y tu vocabulario de forma natural.",
  },
  {
    nombre: "Mas recursos y enlaces utiles",
    url: "/recursos/enlaces-utiles",
    descripcion:
      "Nuestra seleccion completa de herramientas, aplicaciones, podcasts y webs para aprender frances en todos los niveles.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function GuiaDelfDalfPage() {
  return (
    <div>
      {/* JSON-LD FAQPage Schema */}
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

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
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
            Guia completa DELF/DALF 2026
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Todo lo que necesitas saber sobre los examenes oficiales de frances:
            niveles, estructura detallada, precios, inscripcion, preparacion y
            recursos gratuitos.
          </p>
          <p
            className="text-sm max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Guia actualizada para 2026 &mdash; por HolaBonjour, academia de
            frances en Malaga.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUE ES EL DELF/DALF                                          */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Qu&apos;est-ce que le DELF/DALF&nbsp;?
          </h2>
          <GlassCard>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              El <strong style={{ color: "var(--cin-gold)" }}>DELF</strong>{" "}
              (Diplome d&apos;Etudes en Langue Francaise) y el{" "}
              <strong style={{ color: "var(--cin-gold)" }}>DALF</strong>{" "}
              (Diplome Approfondi de Langue Francaise) son los diplomas
              oficiales del Ministerio de Educacion frances que certifican el
              nivel de frances de candidatos extranjeros.
            </p>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              El DELF cubre los niveles A1 a B2 (usuario basico e
              independiente), mientras que el DALF certifica los niveles C1 y
              C2, correspondientes a un dominio avanzado y experto del idioma.
              Ambos se basan en el Marco Comun Europeo de Referencia para las
              Lenguas (MCER).
            </p>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Son los unicos diplomas de frances reconocidos internacionalmente
              y{" "}
              <strong style={{ color: "var(--cin-gold)" }}>no caducan</strong>.
              Una vez obtenidos, son validos de por vida en mas de 170 paises.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Cada nivel evalua cuatro competencias linguisticas:{" "}
              <strong style={{ color: "var(--cin-gold)" }}>
                comprension oral
              </strong>
              ,{" "}
              <strong style={{ color: "var(--cin-gold)" }}>
                comprension escrita
              </strong>
              ,{" "}
              <strong style={{ color: "var(--cin-gold)" }}>
                produccion escrita
              </strong>{" "}
              y{" "}
              <strong style={{ color: "var(--cin-gold)" }}>
                produccion oral
              </strong>
              . Para aprobar necesitas un minimo de 50/100, sin bajar de 5/25 en
              ninguna prueba.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* CTA 1 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Preparate con nosotros
          </GoldButton>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* PARA QUE SIRVE EL DELF/DALF                                  */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            A quoi sert le DELF/DALF&nbsp;?
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            El DELF y el DALF abren puertas en muchos ambitos profesionales,
            academicos y administrativos. Estas son las principales razones
            por las que nuestros alumnos se presentan al examen:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Oposiciones */}
            <GlassCard>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cin-gold)",
                }}
              >
                Oposiciones en Espana
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                La mayoria de las oposiciones que valoran idiomas exigen un{" "}
                <strong style={{ color: "var(--cin-gold)" }}>
                  minimo de B2
                </strong>{" "}
                para acreditar el frances. Un nivel C1 o C2 suele otorgar
                puntuacion extra en la fase de meritos.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                El DELF/DALF es el diploma mas aceptado por las
                administraciones publicas espanolas: Administracion General del
                Estado, Junta de Andalucia, diplomaticos, ejercito, cuerpos de
                seguridad, educacion y sanidad.
              </p>
            </GlassCard>

            {/* Estudios */}
            <GlassCard>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cin-gold)",
                }}
              >
                Estudios en Francia, Belgica, Suiza y Canada
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Las universidades francesas y francofonas exigen un{" "}
                <strong style={{ color: "var(--cin-gold)" }}>
                  minimo de B2
                </strong>{" "}
                para los grados y un{" "}
                <strong style={{ color: "var(--cin-gold)" }}>C1</strong> para
                la mayoria de masters y doctorados.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Con un DELF B2 o superior, estas exento del examen de frances
                previo a la inscripcion universitaria (procesos Campus France,
                DAP). Es requisito indispensable para becas Erasmus+ con
                destino francofono.
              </p>
            </GlassCard>

            {/* Inmigracion */}
            <GlassCard>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cin-gold)",
                }}
              >
                Inmigracion y ciudadania
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Para obtener la{" "}
                <strong style={{ color: "var(--cin-gold)" }}>
                  ciudadania francesa
                </strong>{" "}
                necesitas al menos un B1 en produccion oral. Para residir en
                Belgica, Suiza o Canada tambien se exigen niveles acreditados
                de frances.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                El DELF es la opcion preferida frente al TCF porque no caduca:
                una vez aprobado, no tendras que repetirlo antes de que expire,
                algo fundamental en procesos migratorios que pueden durar anos.
              </p>
            </GlassCard>

            {/* Trabajo */}
            <GlassCard>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cin-gold)",
                }}
              >
                Trabajo y desarrollo profesional
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                El frances es idioma oficial en mas de 30 paises y lengua de
                trabajo en organismos internacionales (ONU, UE, OTAN, Cruz
                Roja). Acreditar tu nivel con el DELF/DALF marca la diferencia
                en tu CV.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Sectores que mas valoran el frances:{" "}
                <strong style={{ color: "var(--cin-gold)" }}>
                  turismo, hosteleria, diplomacia, ONG, comercio internacional,
                  lujo, moda, gastronomia y cooperacion al desarrollo
                </strong>
                .
              </p>
            </GlassCard>
          </div>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* ESTRUCTURA DETALLADA POR NIVEL                                */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Structure detaillee par niveau
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Duracion de cada prueba, duracion total del examen y precio
            orientativo para todos los niveles del DELF y DALF.
          </p>

          {/* Desktop table */}
          <div className="hidden lg:block">
            <GlassCard>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {[
                        "Nivel",
                        "Diploma",
                        "Comprension oral",
                        "Comprension escrita",
                        "Produccion escrita",
                        "Produccion oral",
                        "Duracion total",
                        "Precio orient.",
                      ].map((h) => (
                        <th
                          key={h}
                          className="py-3 px-3 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {levels.map((l) => (
                      <tr
                        key={l.nivel}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <td
                          className="py-3 px-3 font-bold text-lg"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {l.nivel}
                        </td>
                        <td
                          className="py-3 px-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {l.diploma}
                        </td>
                        <td
                          className="py-3 px-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {l.co}
                        </td>
                        <td
                          className="py-3 px-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {l.ce}
                        </td>
                        <td
                          className="py-3 px-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {l.pe}
                        </td>
                        <td
                          className="py-3 px-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {l.po}
                        </td>
                        <td
                          className="py-3 px-3 text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {l.duracion}
                        </td>
                        <td
                          className="py-3 px-3 text-sm font-semibold"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {l.precio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                className="text-xs mt-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                * Los precios son orientativos y pueden variar segun el centro
                examinador. Fuente: France Education International 2025-2026.
              </p>
            </GlassCard>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-5 lg:hidden">
            {levels.map((l) => (
              <GlassCard key={l.nivel}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "var(--cin-gold)" }}
                  >
                    {l.nivel}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(232,184,101,0.15)",
                      color: "var(--cin-gold)",
                      border: "1px solid rgba(232,184,101,0.25)",
                    }}
                  >
                    {l.diploma}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span
                      className="text-xs block"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Comp. oral
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>
                      {l.co}
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xs block"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Comp. escrita
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>
                      {l.ce}
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xs block"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Prod. escrita
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>
                      {l.pe}
                    </span>
                  </div>
                  <div>
                    <span
                      className="text-xs block"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Prod. oral
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>
                      {l.po}
                    </span>
                  </div>
                </div>
                <div
                  className="flex justify-between mt-4 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    {l.duracion}
                  </span>
                  <span
                    className="font-bold"
                    style={{ color: "var(--cin-gold)" }}
                  >
                    {l.precio}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA 2 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-base mb-5"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            No sabes a que nivel presentarte? Haz nuestro test gratuito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/test-de-nivel">
              Haz el test de nivel
            </GoldButton>
            <GoldButton href="/cursos/preparacion-delf-dalf" variant="outline">
              Ver curso de preparacion
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* CUANTO TIEMPO NECESITO                                        */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Combien de temps faut-il&nbsp;?
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Estimacion del tiempo de preparacion segun tu nivel actual y tu
            objetivo. Las horas incluyen clases, estudio personal y practica.
          </p>

          {/* Desktop table */}
          <div className="hidden md:block">
            <GlassCard>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {[
                        "Tu nivel actual",
                        "Objetivo",
                        "Horas estimadas",
                        "Meses (4h/semana)",
                      ].map((h) => (
                        <th
                          key={h}
                          className="py-3 px-4 text-sm font-semibold"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prepTime.map((row) => (
                      <tr
                        key={row.objetivo}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <td
                          className="py-3 px-4 text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          {row.actual}
                        </td>
                        <td
                          className="py-3 px-4 font-bold"
                          style={{ color: "var(--cin-gold)" }}
                        >
                          {row.objetivo}
                        </td>
                        <td
                          className="py-3 px-4 text-sm"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {row.horas}
                        </td>
                        <td
                          className="py-3 px-4 text-sm"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {row.meses}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                className="text-xs mt-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                * Estimacion basada en el MCER. El tiempo real depende de
                factores como tu lengua materna, tu dedicacion y si cuentas con
                clases individuales con un profesor nativo.
              </p>
            </GlassCard>
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {prepTime.map((row) => (
              <GlassCard key={row.objetivo}>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  De {row.actual} a
                </p>
                <p
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--cin-gold)" }}
                >
                  {row.objetivo}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {row.horas}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {row.meses}
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Con clases individuales 1 a 1 por Zoom puedes acelerar tu
              preparacion significativamente: cada sesion se adapta 100% a tus
              puntos debiles.
            </p>
            <GoldButton href="/cursos/preparacion-delf-dalf">
              Descubre nuestro curso de preparacion
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* DONDE PRESENTARSE                                             */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Ou se presenter en Andalousie&nbsp;?
          </h2>
          <GlassCard>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              En Andalucia puedes presentarte al DELF/DALF en centros
              autorizados como la Alliance Francaise y el Institut Francais.
              Estos centros organizan convocatorias varias veces al ano
              (normalmente 2 a 4 convocatorias anuales).
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
            <p
              className="text-xs mt-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Consulta la web de cada centro para ver las fechas exactas de
              convocatoria, plazos de inscripcion y tasas vigentes.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* COMO INSCRIBIRSE                                              */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Comment s&apos;inscrire&nbsp;?
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

      {/* CTA 3 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GoldButton href="/cursos/preparacion-delf-dalf">
            Preparate con nosotros
          </GoldButton>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* CONSEJOS POR COMPETENCIA                                      */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Conseils pour reussir
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Consejos practicos organizados por cada competencia del examen.
            Aplicarlos desde el primer dia de preparacion marca la diferencia.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {skillTips.map((s) => (
              <GlassCard key={s.skill}>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  <span className="mr-2">{s.icon}</span>
                  {s.skill}
                </h3>
                <ul className="space-y-3">
                  {s.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      <span
                        className="mt-1 shrink-0"
                        style={{ color: "var(--cin-gold)" }}
                      >
                        &#9733;
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* RECURSOS GRATUITOS                                            */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Ressources gratuites
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Webs y herramientas gratuitas para complementar tu preparacion.
            Usarlas a diario es la mejor inversion de tiempo.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {recursos.map((r) => (
              <GlassCard key={r.nombre}>
                <h3
                  className="text-base font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {r.url.startsWith("/") ? (
                    <a
                      href={r.url}
                      style={{
                        color: "var(--cin-gold)",
                        textDecoration: "none",
                      }}
                    >
                      {r.nombre} &rarr;
                    </a>
                  ) : (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--cin-gold)",
                        textDecoration: "none",
                      }}
                    >
                      {r.nombre} &rarr;
                    </a>
                  )}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {r.descripcion}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA 4 */}
      <CinematicSection className="py-10 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/test-de-nivel">
              Haz el test de nivel
            </GoldButton>
            <GoldButton href="/cursos/preparacion-delf-dalf" variant="outline">
              Ver curso de preparacion
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Questions frequentes
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

      {/* ============================================================ */}
      {/* FINAL CTA                                                     */}
      {/* ============================================================ */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pret a passer le DELF/DALF&nbsp;?
          </h2>
          <p
            className="text-lg mb-4"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Preparate con clases individuales 1 a 1 por Zoom, adaptadas a tu
            nivel y a las exigencias del examen. Profesores nativos
            especializados en DELF/DALF.
          </p>
          <p
            className="text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            WhatsApp:{" "}
            <a
              href="https://wa.me/34685070304"
              style={{ color: "var(--cin-gold)", textDecoration: "none" }}
            >
              685 070 304
            </a>{" "}
            &middot; Email:{" "}
            <a
              href="mailto:hola@holabonjour.es"
              style={{ color: "var(--cin-gold)", textDecoration: "none" }}
            >
              hola@holabonjour.es
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/cursos/preparacion-delf-dalf">
              Ver curso de preparacion
            </GoldButton>
            <GoldButton href="/test-de-nivel" variant="outline">
              Haz el test de nivel gratis
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
