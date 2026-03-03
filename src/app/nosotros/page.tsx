import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conócenos | HolaBonjour – Academia de francés online",
  description:
    "Conoce a Isabelle Guitton, directora académica de HolaBonjour. Profesora nativa de francés con experiencia desde 2017 en Málaga.",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#1e40af] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Quiénes somos</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Conócenos
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          HolaBonjour es un proyecto docente con trayectoria desde 2017, primero como academia
          presencial en Málaga y ahora en formato 100% online por Zoom.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Isabelle Guitton</h2>
        <p className="text-sm text-[#2563eb]">Directora académica y profesora</p>
        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <p>
            Isabelle es profesora nativa de francés, nacida y formada en Francia. Dirige HolaBonjour
            desde su fundación, con un enfoque personalizado y orientado a resultados.
          </p>
          <p>
            Especialista en preparación de exámenes DELF y DALF, trabaja con cada alumno de forma
            individual, adaptando el contenido y el ritmo a sus necesidades y objetivos.
          </p>
          <p>
            Las clases se imparten por Zoom, con seguimiento personalizado, apuntes de cada sesión
            y acceso a la zona de alumno para consultar el avance.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Desde 2017</h3>
          <p className="mt-2 text-sm text-gray-700">
            Proyecto docente activo con trayectoria verificable, primero presencial y ahora online.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">100% online</h3>
          <p className="mt-2 text-sm text-gray-700">
            Todas las clases son por Zoom. Aprende francés desde cualquier lugar sin desplazarte.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Clases individuales</h3>
          <p className="mt-2 text-sm text-gray-700">
            Cada clase es 1 a 1 con Isabelle. Sin grupos, sin esperas. 55 minutos de inmersión.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">HBTJ Consultores Lingüísticos S.L.</h2>
        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p><strong>CIF:</strong> B93712784</p>
          <p><strong>Nombre comercial:</strong> HolaBonjour</p>
          <p><strong>Domicilio:</strong> Calle Esperanto, 9 — 29007 Málaga</p>
          <p><strong>Email:</strong> info@holabonjour.es</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">¿Quieres empezar?</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contratar"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Contratar clases
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#2563eb] px-6 text-sm font-semibold text-[#2563eb] transition hover:bg-blue-100"
          >
            Contactar
          </Link>
        </div>
      </section>
    </div>
  );
}
