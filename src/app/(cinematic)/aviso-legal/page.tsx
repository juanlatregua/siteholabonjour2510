import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";

export const metadata: Metadata = {
  title: "Aviso Legal — HolaBonjour",
  description:
    "Aviso legal de HolaBonjour: datos del titular, condiciones de uso, propiedad intelectual y legislación aplicable.",
  alternates: { canonical: "/aviso-legal" },
  openGraph: {
    title: "Aviso Legal — HolaBonjour",
    description:
      "Aviso legal de HolaBonjour: datos del titular, condiciones de uso, propiedad intelectual y legislación aplicable.",
    url: "https://holabonjour.es/aviso-legal",
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
`;

export default function AvisoLegalPage() {
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
            Aviso Legal
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Informaci&oacute;n y de Comercio Electr&oacute;nico (LSSI-CE).
          </p>
        </div>
      </CinematicSection>

      {/* Content */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl prose-legal">

          <h2>1. Datos del titular</h2>
          <ul>
            <li><strong>Denominaci&oacute;n social:</strong> HBTJ Consultores Ling&uuml;&iacute;sticos S.L.</li>
            <li><strong>CIF:</strong> [CIF de la empresa]</li>
            <li><strong>Domicilio social:</strong> [Direcci&oacute;n fiscal de la empresa]</li>
            <li><strong>Correo electr&oacute;nico:</strong> <a href="mailto:hola@holabonjour.es">hola@holabonjour.es</a></li>
            <li><strong>Tel&eacute;fono:</strong> 685 070 304</li>
            <li><strong>Sitio web:</strong> <a href="https://holabonjour.es">holabonjour.es</a></li>
            <li><strong>Datos registrales:</strong> [Datos del Registro Mercantil]</li>
          </ul>

          <h2>2. Objeto del sitio web</h2>
          <p>
            El presente sitio web tiene como finalidad ofrecer informaci&oacute;n sobre los
            servicios de ense&ntilde;anza de franc&eacute;s de HBTJ Consultores Ling&uuml;&iacute;sticos S.L.,
            incluyendo clases particulares, preparaci&oacute;n de ex&aacute;menes oficiales DELF/DALF,
            cursos de conversaci&oacute;n y formaci&oacute;n de franc&eacute;s para empresas, as&iacute; como
            facilitar el contacto y la contrataci&oacute;n de dichos servicios.
          </p>

          <h2>3. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos de este sitio web, incluyendo textos, im&aacute;genes,
            dise&ntilde;os gr&aacute;ficos, logotipos, iconos, material did&aacute;ctico, c&oacute;digo fuente y
            cualquier otro elemento, son propiedad de HBTJ Consultores Ling&uuml;&iacute;sticos S.L.
            o de sus leg&iacute;timos titulares, y est&aacute;n protegidos por las leyes espa&ntilde;olas e
            internacionales de propiedad intelectual e industrial.
          </p>
          <p>
            Queda prohibida la reproducci&oacute;n, distribuci&oacute;n, transformaci&oacute;n,
            comunicaci&oacute;n p&uacute;blica o cualquier otra forma de explotaci&oacute;n, total o
            parcial, de los contenidos de este sitio web sin la autorizaci&oacute;n expresa
            y por escrito de HBTJ Consultores Ling&uuml;&iacute;sticos S.L.
          </p>

          <h2>4. Condiciones de uso</h2>
          <p>
            El acceso y uso de este sitio web atribuye la condici&oacute;n de usuario e
            implica la aceptaci&oacute;n plena de todas las condiciones incluidas en este
            aviso legal. El usuario se compromete a hacer un uso adecuado y l&iacute;cito
            del sitio web y de sus contenidos, de conformidad con la legislaci&oacute;n
            aplicable y el presente aviso legal.
          </p>
          <p>En particular, el usuario se compromete a:</p>
          <ul>
            <li>No utilizar los contenidos con fines il&iacute;citos o contrarios a lo establecido en este aviso legal.</li>
            <li>No introducir virus inform&aacute;ticos, archivos defectuosos o cualquier otro software que pueda causar da&ntilde;os en los sistemas del titular o de terceros.</li>
            <li>No intentar acceder a &aacute;reas restringidas del sitio web sin autorizaci&oacute;n.</li>
            <li>No utilizar el sitio web de forma que pueda da&ntilde;ar, inutilizar, sobrecargar o deteriorar el mismo.</li>
          </ul>

          <h2>5. Responsabilidad</h2>
          <p>
            HBTJ Consultores Ling&uuml;&iacute;sticos S.L. no se hace responsable de los da&ntilde;os y
            perjuicios que pudieran derivarse del uso del sitio web, incluyendo, sin
            limitaci&oacute;n, errores u omisiones en los contenidos, falta de
            disponibilidad del sitio web o transmisi&oacute;n de virus a trav&eacute;s del mismo.
          </p>
          <p>
            El titular se reserva el derecho de modificar los contenidos del sitio web
            en cualquier momento y sin previo aviso, as&iacute; como de restringir o
            suspender temporal o definitivamente el acceso al mismo.
          </p>
          <p>
            En caso de que el sitio web contenga enlaces a sitios de terceros, HBTJ
            Consultores Ling&uuml;&iacute;sticos S.L. no se hace responsable de los contenidos,
            pol&iacute;ticas de privacidad o pr&aacute;cticas de dichos sitios externos.
          </p>

          <h2>6. Legislaci&oacute;n aplicable y jurisdicci&oacute;n</h2>
          <p>
            El presente aviso legal se rige por la legislaci&oacute;n espa&ntilde;ola. Para la
            resoluci&oacute;n de cualquier controversia que pudiera derivarse del acceso o
            uso de este sitio web, las partes se someten a la jurisdicci&oacute;n de los
            Juzgados y Tribunales de M&aacute;laga, con renuncia expresa a cualquier otro
            fuero que pudiera corresponderles.
          </p>

          <p style={{ marginTop: "3rem", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
            &Uacute;ltima actualizaci&oacute;n: marzo 2026
          </p>
        </div>
      </CinematicSection>
    </div>
  );
}
