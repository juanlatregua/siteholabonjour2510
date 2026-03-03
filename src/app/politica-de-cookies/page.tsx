import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies | HolaBonjour",
  description:
    "Política de cookies de holabonjour.es: tipos de cookies utilizadas, finalidad y cómo gestionarlas.",
  alternates: { canonical: "https://www.holabonjour.es/politica-de-cookies" },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm text-gray-700">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        Política de cookies (UE)
      </h1>

      <p className="mt-4">
        Esta política de cookies fue actualizada por última vez el{" "}
        <strong>3 de marzo de 2026</strong> y se aplica a los ciudadanos y residentes legales
        permanentes del Espacio Económico Europeo y Suiza.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">1. Introducción</h2>
      <p className="mt-2">
        Nuestra web, <strong>https://www.holabonjour.es</strong> (en adelante, &quot;la web&quot;),
        utiliza cookies y otras tecnologías relacionadas. Las cookies también pueden ser colocadas
        por terceros a los que hemos contratado. En este documento te informamos sobre el uso de
        cookies en nuestra web.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">2. ¿Qué son las cookies?</h2>
      <p className="mt-2">
        Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu
        navegador almacena en el disco duro de tu ordenador u otro dispositivo. La información
        almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados
        durante una visita posterior.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">3. Cookies utilizadas</h2>

      <h3 className="mt-4 font-semibold text-gray-900">3.1 Cookies técnicas o funcionales</h3>
      <p className="mt-2">
        Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus
        preferencias sigan recordándose. Estas cookies pueden colocarse sin tu consentimiento.
      </p>

      <h3 className="mt-4 font-semibold text-gray-900">3.2 Cookies de sesión y autenticación</h3>
      <p className="mt-2">
        Utilizamos cookies de sesión para gestionar el inicio de sesión en la zona de alumno y el
        proceso de pago con Stripe. Estas cookies son estrictamente necesarias para el
        funcionamiento del servicio.
      </p>

      <h3 className="mt-4 font-semibold text-gray-900">3.3 Cookies de terceros</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          <strong>Stripe:</strong> Procesamiento seguro de pagos con tarjeta.
        </li>
        <li>
          <strong>Vercel Analytics:</strong> Estadísticas anónimas de uso del sitio.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">4. Consentimiento</h2>
      <p className="mt-2">
        Cuando visites nuestra web por primera vez, podrás ver información sobre las cookies. Las
        cookies técnicas y funcionales se instalan automáticamente. Para cookies no esenciales,
        solicitaremos tu consentimiento previo.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">
        5. Activación/desactivación y borrado de cookies
      </h2>
      <p className="mt-2">
        Puedes eliminar cookies manual o automáticamente desde tu navegador. También puedes evitar
        que se coloquen o recibir un aviso cada vez que una cookie quiere instalarse. Para más
        información, consulta la sección «Ayuda» de tu navegador.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">
        6. Tus derechos con respecto a los datos personales
      </h2>
      <p className="mt-2">
        Tienes derecho a saber por qué se necesitan tus datos personales, a acceder a ellos, a
        rectificarlos y a solicitar su supresión. Si nos das tu consentimiento para procesarlos,
        puedes revocarlo en cualquier momento.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">7. Datos de contacto</h2>
      <p className="mt-2">
        <strong>HBTJ Consultores Lingüísticos S.L.</strong>
        <br />
        Nombre comercial: HolaBonjour
        <br />
        Calle Esperanto, 9 — 29007 Málaga (España)
        <br />
        Web: https://www.holabonjour.es
        <br />
        Correo electrónico:{" "}
        <a className="text-[#2563eb] underline" href="mailto:info@holabonjour.es">
          info@holabonjour.es
        </a>
      </p>
    </main>
  );
}
