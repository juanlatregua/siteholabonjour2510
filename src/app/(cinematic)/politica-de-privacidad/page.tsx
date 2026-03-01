import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";

export const metadata: Metadata = {
  title: "Pol\u00edtica de Privacidad — HolaBonjour",
  description:
    "Pol\u00edtica de privacidad de HolaBonjour: informaci\u00f3n sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: {
    title: "Pol\u00edtica de Privacidad — HolaBonjour",
    description:
      "Pol\u00edtica de privacidad de HolaBonjour: informaci\u00f3n sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
    url: "https://holabonjour.es/politica-de-privacidad",
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

export default function PoliticaDePrivacidadPage() {
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
            Pol&iacute;tica de Privacidad
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Org&aacute;nica
            3/2018 de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos
            digitales (LOPDGDD).
          </p>
        </div>
      </CinematicSection>

      {/* Content */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl prose-legal">

          <h2>1. Responsable del tratamiento</h2>
          <ul>
            <li><strong>Denominaci&oacute;n social:</strong> HBTJ Consultores Ling&uuml;&iacute;sticos S.L.</li>
            <li><strong>CIF:</strong> [CIF de la empresa]</li>
            <li><strong>Domicilio:</strong> [Direcci&oacute;n fiscal de la empresa]</li>
            <li><strong>Correo electr&oacute;nico:</strong> <a href="mailto:hola@holabonjour.es">hola@holabonjour.es</a></li>
            <li><strong>Tel&eacute;fono:</strong> 685 070 304</li>
          </ul>

          <h2>2. Finalidades del tratamiento</h2>
          <p>
            En HBTJ Consultores Ling&uuml;&iacute;sticos S.L. tratamos los datos personales que
            nos facilitas con las siguientes finalidades:
          </p>
          <ul>
            <li><strong>Gesti&oacute;n de alumnos:</strong> administrar la relaci&oacute;n contractual, organizar las clases, realizar el seguimiento del progreso acad&eacute;mico y gestionar los pagos.</li>
            <li><strong>Comunicaciones:</strong> responder a tus consultas a trav&eacute;s del formulario de contacto, correo electr&oacute;nico, WhatsApp u otros canales disponibles en el sitio web.</li>
            <li><strong>Test de nivel:</strong> evaluar tu nivel de franc&eacute;s y proporcionarte una recomendaci&oacute;n personalizada.</li>
            <li><strong>Env&iacute;o de informaci&oacute;n comercial:</strong> enviarte comunicaciones sobre nuestros cursos, promociones y novedades, siempre que hayas dado tu consentimiento previo.</li>
          </ul>

          <h2>3. Base legal del tratamiento</h2>
          <p>La base legal para el tratamiento de tus datos es:</p>
          <ul>
            <li><strong>Consentimiento:</strong> al enviar un formulario de contacto, solicitar informaci&oacute;n o suscribirte a comunicaciones comerciales.</li>
            <li><strong>Ejecuci&oacute;n de un contrato:</strong> para la gesti&oacute;n de la relaci&oacute;n como alumno, incluyendo la organizaci&oacute;n de clases y la facturaci&oacute;n.</li>
            <li><strong>Inter&eacute;s leg&iacute;timo:</strong> para la mejora de nuestros servicios y la prevenci&oacute;n del fraude.</li>
            <li><strong>Obligaci&oacute;n legal:</strong> para el cumplimiento de las obligaciones fiscales y contables aplicables.</li>
          </ul>

          <h2>4. Destinatarios de los datos</h2>
          <p>
            Tus datos personales no ser&aacute;n cedidos a terceros, salvo obligaci&oacute;n legal.
            En particular:
          </p>
          <ul>
            <li>No vendemos ni compartimos tus datos con fines comerciales de terceros.</li>
            <li>Podemos utilizar proveedores de servicios (hosting, correo electr&oacute;nico, plataformas de videoconferencia) que act&uacute;an como encargados del tratamiento conforme al art. 28 del RGPD.</li>
            <li>En caso de obligaci&oacute;n legal, los datos podr&aacute;n ser comunicados a las administraciones p&uacute;blicas competentes.</li>
          </ul>

          <h2>5. Derechos del interesado (ARCO-POL)</h2>
          <p>
            Puedes ejercer los siguientes derechos en relaci&oacute;n con tus datos personales:
          </p>
          <ul>
            <li><strong>Acceso:</strong> conocer qu&eacute; datos personales tenemos sobre ti.</li>
            <li><strong>Rectificaci&oacute;n:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Cancelaci&oacute;n / Supresi&oacute;n:</strong> solicitar la eliminaci&oacute;n de tus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposici&oacute;n:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso com&uacute;n.</li>
            <li><strong>Limitaci&oacute;n:</strong> solicitar la limitaci&oacute;n del tratamiento en los supuestos previstos por la normativa.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puedes dirigirte a nosotros a
            trav&eacute;s del correo electr&oacute;nico{" "}
            <a href="mailto:hola@holabonjour.es">hola@holabonjour.es</a>, indicando
            tu nombre completo y el derecho que deseas ejercer. Responderemos en un
            plazo m&aacute;ximo de 30 d&iacute;as.
          </p>
          <p>
            Asimismo, te informamos de tu derecho a presentar una reclamaci&oacute;n ante la
            Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos (AEPD) si consideras que el
            tratamiento de tus datos no se ajusta a la normativa vigente:{" "}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
              www.aepd.es
            </a>.
          </p>

          <h2>6. Plazos de conservaci&oacute;n</h2>
          <p>
            Los datos personales se conservar&aacute;n durante el tiempo necesario para
            cumplir con la finalidad para la que fueron recogidos:
          </p>
          <ul>
            <li><strong>Datos de alumnos:</strong> durante la relaci&oacute;n contractual y, una vez finalizada, durante los plazos legales de prescripci&oacute;n aplicables (generalmente 5 a&ntilde;os para obligaciones fiscales).</li>
            <li><strong>Datos de contacto:</strong> hasta que respondamos a tu consulta y, posteriormente, durante 1 a&ntilde;o salvo que se inicie una relaci&oacute;n comercial.</li>
            <li><strong>Datos de test de nivel:</strong> durante 2 a&ntilde;os desde su realizaci&oacute;n.</li>
            <li><strong>Comunicaciones comerciales:</strong> hasta que revoques tu consentimiento.</li>
          </ul>

          <h2>7. Medidas de seguridad</h2>
          <p>
            Hemos adoptado las medidas t&eacute;cnicas y organizativas apropiadas para
            garantizar la seguridad de tus datos personales, incluyendo protecci&oacute;n
            contra el tratamiento no autorizado o il&iacute;cito, la p&eacute;rdida, destrucci&oacute;n o
            da&ntilde;o accidental, mediante la aplicaci&oacute;n de medidas t&eacute;cnicas adecuadas.
          </p>

          <h2>8. Modificaciones de la pol&iacute;tica de privacidad</h2>
          <p>
            HBTJ Consultores Ling&uuml;&iacute;sticos S.L. se reserva el derecho de modificar
            esta pol&iacute;tica de privacidad para adaptarla a novedades legislativas o
            jurisprudenciales. En caso de cambios significativos, se informar&aacute; a los
            usuarios a trav&eacute;s del sitio web.
          </p>

          <p style={{ marginTop: "3rem", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
            &Uacute;ltima actualizaci&oacute;n: marzo 2026
          </p>
        </div>
      </CinematicSection>
    </div>
  );
}
