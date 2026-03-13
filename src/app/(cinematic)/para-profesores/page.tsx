import type { Metadata } from "next";
import Link from "next/link";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GlassCard from "@/components/cinematic/GlassCard";

export const metadata: Metadata = {
  title: "Tu academia online. Sin intermediarios | HolaBonjour",
  description:
    "Plataforma gratuita para profesores de FLE certificados. Booking, portal alumno, corrección IA y simuladores DELF/DALF. Sin comisión.",
  alternates: { canonical: "/para-profesores" },
  openGraph: {
    title: "Tu academia online. Sin intermediarios | HolaBonjour",
    description:
      "Plataforma gratuita para profesores de FLE certificados. Sin comisión. Tú traes el conocimiento, nosotros ponemos las herramientas.",
    url: "https://holabonjour.es/para-profesores",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function ParaProfesoresPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* ====== HERO ====== */}
      <CinematicSection className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#E50046",
              marginBottom: "1rem",
            }}
          >
            Solo profesores verificados
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#1e2d4a",
            }}
          >
            Tu academia online.
            <br />
            <span style={{ color: "#E50046" }}>Sin intermediarios.</span>
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.15rem",
              lineHeight: 1.65,
              color: "#3d4a5c",
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Plataforma para profesores de FLE certificados. Gratis para empezar.
            Tú traes el conocimiento, nosotros ponemos las herramientas.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/aplicar"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "1rem 2.5rem",
                background: "#E50046",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(229,0,70,0.3)",
              }}
            >
              Solicitar acceso
            </Link>
            <Link
              href="#planes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "1rem 2rem",
                color: "#1e2d4a",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              Ver planes &darr;
            </Link>
          </div>
        </div>
      </CinematicSection>

      {/* ====== EL PROBLEMA ====== */}
      <section className="py-16 px-4" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            ¿Te suena esto?
          </h2>
          <div className="space-y-4">
            {[
              {
                text: "Tienes el Máster FLE o el DAEFLE y preparas DELF en una academia por 12-15 €/hora.",
                highlight: "12-15 €/hora",
              },
              {
                text: "Usas Calendly para las reservas, Zoom para las clases, Google Drive para los materiales y WhatsApp para todo lo demás.",
                highlight: "4 herramientas",
              },
              {
                text: "Preply, italki o Superprof se quedan entre el 15% y el 33% de cada clase que das.",
                highlight: "15-33% de comisión",
              },
            ].map((item) => (
              <div
                key={item.highlight}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  padding: "1.25rem",
                  background: "#fef2f2",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(229,0,70,0.1)",
                }}
              >
                <span style={{ fontSize: "1.3rem", flexShrink: 0, lineHeight: 1 }}>&#10060;</span>
                <p style={{ fontSize: "0.95rem", color: "#3d4a5c", lineHeight: 1.55, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LA SOLUCIÓN ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-5xl">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "0.75rem",
            }}
          >
            Todo en una sola plataforma
          </h2>
          <p style={{ textAlign: "center", color: "#5f6b78", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
            Sin comisión. Sin configuración. Sin dolores de cabeza.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Perfil público verificado", desc: "Tu propia página con badge de profesor certificado. SEO incluido: Google te encuentra." },
              { title: "Booking automático", desc: "Configura tu horario. Los alumnos reservan solos. Cero WhatsApp de ida y vuelta." },
              { title: "Portal del alumno", desc: "Cada alumno tiene su zona: clases, materiales, grabaciones. Pareces una academia sin serlo." },
              { title: "Corrección IA DELF/DALF", desc: "Tus alumnos practican escritura y reciben corrección automática con rúbricas oficiales FEI." },
              { title: "Simuladores de examen", desc: "Comprensión oral y escrita A1-C2 con formato idéntico al examen real." },
              { title: "Mensajería integrada", desc: "Chat con cada alumno dentro de la plataforma. Tu WhatsApp personal queda libre." },
            ].map((b) => (
              <GlassCard key={b.title} hover={false}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.35rem" }}>{b.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====== VERIFICACIÓN ====== */}
      <section className="py-16 px-4" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              borderRadius: "2rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#065f46",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "1rem" }}>&#9989;</span>
            Profesor verificado HolaBonjour
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e2d4a",
              marginBottom: "1rem",
            }}
          >
            Solo profesores certificados. Eso nos diferencia.
          </h2>
          <p style={{ color: "#3d4a5c", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 540, margin: "0 auto 2rem" }}>
            Escaneamos tus diplomas con IA para verificar tu formación.
            El badge &ldquo;Profesor verificado&rdquo; es tu argumento de venta ante los alumnos.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-left" style={{ maxWidth: 480, margin: "0 auto" }}>
            {[
              "Máster FLE / Didactique du FLE",
              "DAEFLE (Alliance Française + CNED)",
              "Habilitación DELF/DALF/TCF/TEF",
              "CAPES / Agrégation",
              "Filología Francesa",
              "Traducción e Interpretación (francés)",
            ].map((d) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: "#3d4a5c" }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>&#10003;</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PLANES ====== */}
      <section id="planes" className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Planes
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Essentiel */}
            <div style={{ background: "#fff", border: "1px solid rgba(30,45,74,0.1)", borderRadius: "1rem", padding: "2rem 1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#395D9F" }}>Essentiel</h3>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e2d4a", margin: "0.5rem 0 1.25rem" }}>
                Gratis <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#5f6b78" }}>para siempre</span>
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Perfil público con badge verificado",
                  "Booking con disponibilidad",
                  "Portal básico del alumno",
                  "Mensajería con alumnos",
                  "Hasta 10 alumnos activos",
                  "Tu propio link de videollamada",
                  "Cobras directamente (Bizum, transferencia)",
                ].map((f) => (
                  <li key={f} style={{ padding: "0.3rem 0", fontSize: "0.85rem", color: "#3d4a5c", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "#395D9F", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professionnel */}
            <div
              style={{
                background: "#fff",
                border: "2px solid #E50046",
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-0.75rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#E50046",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                14 días gratis
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E50046" }}>Professionnel</h3>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#1e2d4a", margin: "0.5rem 0 1.25rem" }}>
                39 €<span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#5f6b78" }}>/mes</span>
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Todo lo de Essentiel +",
                  "Sin límite de alumnos",
                  "Videoconferencia automática + grabación",
                  "Corrección IA para tus alumnos",
                  "Simuladores DELF/DALF para alumnos",
                  "Analíticas de progreso",
                  "Cobro en plataforma (Stripe)",
                ].map((f) => (
                  <li key={f} style={{ padding: "0.3rem 0", fontSize: "0.85rem", color: "#3d4a5c", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "#E50046", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SOCIAL PROOF ====== */}
      <section className="py-16 px-4" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e2d4a",
              marginBottom: "2rem",
            }}
          >
            Ya funciona
          </h2>
          <div
            style={{
              background: "var(--cin-bg)",
              border: "1px solid rgba(30,45,74,0.08)",
              borderRadius: "1rem",
              padding: "2rem",
            }}
          >
            <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#3d4a5c", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              &ldquo;100% de aprobados en DELF y DALF desde 2003. La plataforma me permite centrarme en lo que importa: la enseñanza.&rdquo;
            </p>
            <p style={{ fontWeight: 700, color: "#1e2d4a", fontSize: "0.95rem" }}>Isabelle Guitton</p>
            <p style={{ fontSize: "0.82rem", color: "#5f6b78" }}>
              Examinadora DELF/DALF habilitada · Cofundadora HolaBonjour
            </p>
          </div>
        </div>
      </section>

      {/* ====== CÓMO FUNCIONA ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-3xl">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e2d4a", textAlign: "center", marginBottom: "2.5rem" }}>
            Empieza en 48 horas
          </h2>
          <div className="space-y-5">
            {[
              { n: "1", title: "Envía tu candidatura", desc: "Sube tus diplomas y cuéntanos tu experiencia. Nuestra IA verifica tus credenciales al instante." },
              { n: "2", title: "Recibe tu acceso", desc: "Revisamos tu perfil en 48h. Si cumples los requisitos, recibes tu cuenta de profesor por email." },
              { n: "3", title: "Configura y comparte", desc: "Sube tu foto, define tu horario y precio. Comparte tu enlace con tus alumnos. Listo." },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "50%", background: "#1e2d4a",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "1.1rem", flexShrink: 0,
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.2rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <CinematicSection className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e2d4a", textAlign: "center", marginBottom: "2rem" }}>
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {[
              { q: "¿Es realmente gratis?", a: "Sí. El plan Essentiel es gratuito y sin comisiones. Cobras a tus alumnos directamente. La plataforma se sostiene con las suscripciones al plan Professionnel (39 €/mes)." },
              { q: "¿Qué diplomas aceptáis?", a: "Máster FLE, DAEFLE, habilitación DELF/DALF/TCF/TEF, CAPES, Filología Francesa, Traducción e Interpretación con especialidad en francés, Magisterio de francés, o equivalente. Los escaneamos con IA para verificarlos." },
              { q: "¿Necesito traer mis propios alumnos?", a: "Puedes gestionar tus alumnos actuales. Además, los alumnos que llegan por SEO a holabonjour.es pueden encontrarte en el directorio." },
              { q: "¿Puedo usar mi propio Zoom o Google Meet?", a: "Sí. En el plan gratuito usas cualquier herramienta. En Professionnel tienes videoconferencia con grabación automática integrada." },
              { q: "¿Qué pasa si cancelo Professionnel?", a: "Vuelves al plan Essentiel al final del período de facturación. No pierdes tus alumnos ni tu perfil. Solo se desactivan las funciones premium." },
            ].map((item) => (
              <details
                key={item.q}
                className="group"
                style={{ background: "#fff", border: "1px solid rgba(30,45,74,0.08)", borderRadius: "0.75rem", overflow: "hidden" }}
              >
                <summary style={{ padding: "1rem 1.25rem", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem", color: "#1e2d4a", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ fontSize: "1.2rem", color: "#5f6b78", transition: "transform 0.2s" }} className="group-open:rotate-45">+</span>
                </summary>
                <div style={{ padding: "0 1.25rem 1rem", fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.6 }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ====== CTA FINAL ====== */}
      <section className="py-20 px-4" style={{ background: "#1e2d4a" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
            ¿Tienes la formación? Empieza gratis.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Sin tarjeta de crédito. Sin comisiones. Tu primera clase en 48 horas.
          </p>
          <Link
            href="/aplicar"
            style={{
              display: "inline-flex",
              padding: "1rem 3rem",
              background: "#E50046",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(229,0,70,0.4)",
            }}
          >
            Solicitar acceso
          </Link>
        </div>
      </section>
    </div>
  );
}
