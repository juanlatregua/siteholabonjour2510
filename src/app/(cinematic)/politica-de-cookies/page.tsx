import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";

export const metadata: Metadata = {
  title: "Pol\u00edtica de Cookies — HolaBonjour",
  description:
    "Pol\u00edtica de cookies de HolaBonjour: tipos de cookies utilizadas, finalidades y c\u00f3mo gestionarlas.",
  alternates: { canonical: "/politica-de-cookies" },
  openGraph: {
    title: "Pol\u00edtica de Cookies — HolaBonjour",
    description:
      "Pol\u00edtica de cookies de HolaBonjour: tipos de cookies utilizadas, finalidades y c\u00f3mo gestionarlas.",
    url: "https://holabonjour.es/politica-de-cookies",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const proseStyles = `
  .prose-legal p {
    color: rgba(255,255,255,0.82);
    line-height: 1.8;
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
  }
  .prose-legal ul,
  .prose-legal ol {
    color: rgba(255,255,255,0.82);
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
    line-height: 1.8;
  }
  .prose-legal li {
    margin-bottom: 0.5rem;
  }
  .prose-legal strong {
    color: #e8b865;
    font-weight: 600;
  }
  .prose-legal a {
    color: #e8b865;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }
  .prose-legal a:hover {
    color: #f0c97a;
  }
  .prose-legal h2 {
    color: #e8b865;
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
  }
  .prose-legal h3 {
    color: rgba(255,255,255,0.9);
    font-weight: 600;
    font-size: 1.15rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .prose-legal table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  .prose-legal th {
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid rgba(232,184,101,0.4);
    color: #e8b865;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .prose-legal td {
    padding: 0.65rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.75);
    font-size: 0.95rem;
  }
`;

export default function PoliticaDeCookiesPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <style dangerouslySetInnerHTML={{ __html: proseStyles }} />

      {/* Header */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Pol&iacute;tica de Cookies
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Informaci&oacute;n sobre el uso de cookies en holabonjour.es, en cumplimiento
            del art&iacute;culo 22.2 de la Ley 34/2002, de Servicios de la Sociedad de la
            Informaci&oacute;n y de Comercio Electr&oacute;nico (LSSI-CE).
          </p>
        </div>
      </CinematicSection>

      {/* Content */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl prose-legal">

          <h2>1. &iquest;Qu&eacute; son las cookies?</h2>
          <p>
            Las cookies son peque&ntilde;os archivos de texto que los sitios web almacenan
            en tu dispositivo (ordenador, tablet o m&oacute;vil) cuando los visitas. Sirven
            para que el sitio web recuerde tus acciones y preferencias (idioma,
            tama&ntilde;o de letra, sesi&oacute;n, etc.) durante un periodo de tiempo, de forma
            que no tengas que volver a configurarlas cada vez que regreses o navegues
            por las distintas p&aacute;ginas.
          </p>

          <h2>2. Tipos de cookies que utilizamos</h2>

          <h3>Cookies t&eacute;cnicas (necesarias)</h3>
          <p>
            Son imprescindibles para el funcionamiento del sitio web. Permiten la
            navegaci&oacute;n, el inicio de sesi&oacute;n y el acceso a &aacute;reas seguras. Sin estas
            cookies, el sitio web no puede funcionar correctamente.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Finalidad</th>
                <th>Duraci&oacute;n</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>next-auth.session-token</td>
                <td>Gesti&oacute;n de la sesi&oacute;n del usuario</td>
                <td>Sesi&oacute;n</td>
              </tr>
              <tr>
                <td>next-auth.csrf-token</td>
                <td>Protecci&oacute;n contra ataques CSRF</td>
                <td>Sesi&oacute;n</td>
              </tr>
              <tr>
                <td>next-auth.callback-url</td>
                <td>Redirecci&oacute;n tras inicio de sesi&oacute;n</td>
                <td>Sesi&oacute;n</td>
              </tr>
            </tbody>
          </table>

          <h3>Cookies anal&iacute;ticas</h3>
          <p>
            Nos permiten analizar el uso que los visitantes hacen del sitio web para
            mejorar su funcionamiento y contenido. Estas cookies recopilan
            informaci&oacute;n de forma an&oacute;nima y agregada.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Proveedor</th>
                <th>Finalidad</th>
                <th>Duraci&oacute;n</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga, _ga_*</td>
                <td>Google Analytics</td>
                <td>Estad&iacute;sticas de uso del sitio</td>
                <td>2 a&ntilde;os</td>
              </tr>
            </tbody>
          </table>

          <h2>3. &iquest;C&oacute;mo gestionar las cookies?</h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo
            mediante la configuraci&oacute;n de las opciones de tu navegador. A
            continuaci&oacute;n, te indicamos c&oacute;mo hacerlo en los navegadores m&aacute;s comunes:
          </p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p>
            Ten en cuenta que si deshabilitas las cookies, algunas funcionalidades
            del sitio web podr&iacute;an no estar disponibles o no funcionar correctamente.
          </p>

          <h2>4. Actualizaciones de esta pol&iacute;tica</h2>
          <p>
            Esta pol&iacute;tica de cookies puede ser actualizada en funci&oacute;n de cambios
            normativos o de las cookies utilizadas en el sitio. Te recomendamos
            revisarla peri&oacute;dicamente.
          </p>

          <h2>5. Contacto</h2>
          <p>
            Si tienes alguna duda sobre nuestra pol&iacute;tica de cookies, puedes ponerte
            en contacto con nosotros a trav&eacute;s de:
          </p>
          <ul>
            <li><strong>Correo electr&oacute;nico:</strong> <a href="mailto:hola@holabonjour.es">hola@holabonjour.es</a></li>
            <li><strong>Tel&eacute;fono:</strong> 685 070 304</li>
          </ul>

          <p style={{ marginTop: "3rem", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
            &Uacute;ltima actualizaci&oacute;n: marzo 2026
          </p>
        </div>
      </CinematicSection>
    </div>
  );
}
