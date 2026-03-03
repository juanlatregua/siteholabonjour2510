import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad | HolaBonjour",
  description:
    "Política de privacidad de holabonjour.es: responsable del tratamiento, finalidad, derechos RGPD y datos de contacto.",
  alternates: { canonical: "https://www.holabonjour.es/politica-de-privacidad" },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm text-gray-700">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        Política de privacidad
      </h1>

      <section className="mt-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">1. Responsable del tratamiento</h2>
          <p className="mt-2">
            <strong>Responsable:</strong> HBTJ Consultores Lingüísticos S.L.
            <br />
            <strong>CIF:</strong> B93712784
            <br />
            <strong>Nombre comercial:</strong> HolaBonjour
            <br />
            <strong>Domicilio:</strong> Calle Esperanto, 9 — 29007 Málaga (España)
            <br />
            <strong>Email:</strong>{" "}
            <a className="text-[#2563eb] underline" href="mailto:info@holabonjour.es">
              info@holabonjour.es
            </a>
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">2. Datos personales tratados</h2>
          <p className="mt-2">
            Los datos personales que pueden recopilarse incluyen nombre, apellidos, correo
            electrónico, teléfono, nivel de francés, datos de pago (procesados por Stripe, sin
            almacenamiento de datos de tarjeta en nuestros servidores) y datos de navegación.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">3. Finalidad del tratamiento</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Atender solicitudes de información y contacto.</li>
            <li>Gestionar la reserva y pago de clases de francés.</li>
            <li>Enviar recordatorios de clase por email, SMS o WhatsApp.</li>
            <li>Gestionar la relación contractual y administrativa.</li>
            <li>Cumplir obligaciones legales.</li>
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">4. Legitimación</h2>
          <p className="mt-2">
            La base legal para el tratamiento de los datos es el consentimiento del usuario, la
            ejecución de un contrato o la aplicación de medidas precontractuales, así como el
            cumplimiento de obligaciones legales.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">5. Conservación de los datos</h2>
          <p className="mt-2">
            Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la
            que fueron recabados y mientras existan obligaciones legales.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">6. Cesión de datos</h2>
          <p className="mt-2">
            No se cederán datos a terceros salvo obligación legal o cuando sea necesario para la
            prestación del servicio (procesadores de pago como Stripe, servicios de comunicación
            como Twilio y SendGrid), bajo contratos de confidencialidad.
          </p>

          <h2 className="mt-6 text-lg font-semibold text-gray-900">7. Derechos del usuario</h2>
          <p className="mt-2">
            El usuario puede ejercer los derechos de acceso, rectificación, supresión, oposición,
            limitación y portabilidad enviando una solicitud a{" "}
            <a className="text-[#2563eb] underline" href="mailto:info@holabonjour.es">
              info@holabonjour.es
            </a>
            . También podrá presentar una reclamación ante la Agencia Española de Protección de
            Datos (www.aepd.es).
          </p>
        </div>
      </section>
    </main>
  );
}
