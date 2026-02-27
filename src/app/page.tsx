import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TrustReviews from "@/components/TrustReviews";
import QuickHelpChat from "@/components/QuickHelpChat";

export const metadata: Metadata = {
  title: "Academia de frances online | Preparacion DELF/DALF",
  description:
    "HolaBonjour, academia de frances online dirigida por Isabelle Guitton: preparacion DELF/DALF y conversacion por Zoom. Pack 4h A1-B2 140EUR, C1-C2 200EUR.",
};

const highlights = [
  {
    title: "Preparacion oficial DELF/DALF",
    detail:
      "Trabajo por competencias y simulacion por pruebas para llegar con seguridad a convocatoria.",
    icon: "/images/icono-legacy-u2998.png",
  },
  {
    title: "Conversacion para mantener nivel",
    detail:
      "Clases centradas en fluidez, precision oral y continuidad real de uso del frances.",
    icon: "/images/icono-legacy-u3005.png",
  },
  {
    title: "Entorno de alumno personalizado",
    detail:
      "Seguimiento individual, materiales por sesion y trazabilidad del avance academico.",
    icon: "/images/icons-zoom.svg",
  },
];

const trustSignals = [
  "Direccion academica: Isabelle Guitton",
  "Proyecto docente activo desde 2017",
  "Modelo actual 100% online por Zoom",
  "Pago activo por transferencia bancaria de empresa",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="rounded-2xl bg-gradient-to-br from-[#0b3c6f] via-[#0f5da0] to-[#1b78c2] px-5 py-7 text-white shadow-[0_14px_34px_rgba(15,93,160,0.22)] sm:px-8 sm:py-9">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.17em] text-blue-100">
              HolaBonjour · Academia de frances online
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              Preparacion DELF/DALF y conversacion por Zoom
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-50 sm:text-base">
              Evolucionamos desde academia fisica a plataforma online, manteniendo el mismo nivel
              docente. Te ayudamos a preparar examen oficial o a mantener nivel con clases
              personalizadas.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/contratar"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#0b3c6f] transition hover:bg-blue-50"
              >
                Contratar pack
              </Link>
              <Link
                href="/prueba-nivel"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-200 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Hacer prueba de nivel
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">
              Packs actuales
            </p>
            <ul className="mt-2 space-y-2 text-sm text-white">
              <li>A1-B2: pack 4h por 140EUR</li>
              <li>C1-C2: pack 4h por 200EUR</li>
              <li>Ruta examen o ruta conversacion</li>
              <li>Confirmacion por transferencia bancaria</li>
            </ul>
          </aside>
        </div>

        <ul className="mt-5 grid gap-2 text-xs text-blue-50 sm:grid-cols-2 lg:grid-cols-4 sm:text-sm">
          {trustSignals.map((item) => (
            <li key={item} className="rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative min-h-[380px]">
          <Image
            src="/images/isabelle-taza-legacy.jpg"
            alt="Isabelle Guitton en HolaBonjour"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3c6f]/85 via-[#0b3c6f]/55 to-transparent" />
          <div className="relative z-10 max-w-xl px-6 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-xs uppercase tracking-[0.12em] text-blue-100">Direccion academica</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Isabelle Guitton</h2>
            <p className="mt-3 text-sm text-blue-50 sm:text-base">
              Desde 2017, el proyecto HolaBonjour combina experiencia docente real y metodologia
              aplicada a objetivos concretos: aprobar DELF/DALF o mantener un frances activo.
            </p>
            <Link
              href="/#equipo"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-[#0b3c6f] hover:bg-blue-50"
            >
              Conocer equipo
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-[#0f5da0]">Logos y diseno historico</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Identidad visual HolaBonjour</h2>
        <p className="mt-2 text-sm text-slate-700">
          Recuperamos elementos visuales de la web historica publicada para mantener continuidad de marca.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Image src="/images/logo-holabonjour-01.svg" alt="Logo HolaBonjour" width={220} height={64} />
            <p className="mt-2 text-xs text-slate-600">Logo principal corporativo</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Image src="/assets/logo.svg" alt="Logo legacy HolaBonjour" width={220} height={64} />
            <p className="mt-2 text-xs text-slate-600">Logo legacy recuperado del diseno original</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Image src="/images/banner-legacy-poster.png" alt="Elemento grafico legacy" width={220} height={168} />
            <p className="mt-2 text-xs text-slate-600">Poster visual historico de marca</p>
          </article>
        </div>
      </section>

      <section className="mt-8 grid gap-3.5 sm:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Image src={item.icon} alt="Icono del servicio" width={44} height={44} />
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900">Academia de frances online con enfoque de examen</h2>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          Si buscas una academia de frances online para preparar DELF/DALF, en HolaBonjour trabajamos
          por nivel y por objetivo. Tambien puedes elegir la ruta de conversacion si tu prioridad es
          mantener nivel y soltura.
        </p>
        <p className="mt-3 text-sm text-slate-700 sm:text-base">
          La metodologia combina evaluacion inicial, plan por competencias, correccion continua y
          seguimiento individual. El formato de clases es por Zoom, con materiales organizados en tu
          entorno de alumno.
        </p>
      </section>

      <section id="equipo" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Image
              src="/images/conocenos2020.jpg"
              alt="Equipo HolaBonjour desde 2017"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#0f5da0]">Equipo y experiencia</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">De academia presencial a operativa digital</h2>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              El proyecto nacio en Malaga y se transformo al modelo online manteniendo criterio
              academico, seguimiento cercano y adaptacion a cada alumno.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Galeria real de la etapa HolaBonjour</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Image src="/assets/s1final.jpg" alt="Imagen real de la academia HolaBonjour 1" width={800} height={520} className="rounded-xl border border-slate-200 object-cover" />
          <Image src="/assets/s2final.jpg" alt="Imagen real de la academia HolaBonjour 2" width={800} height={520} className="rounded-xl border border-slate-200 object-cover" />
          <Image src="/assets/s3nuevo3.jpg" alt="Imagen real de la academia HolaBonjour 3" width={800} height={520} className="rounded-xl border border-slate-200 object-cover" />
        </div>
      </section>

      <section id="tarifas" className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[#0b3c6f]">Tarifas actuales por pack</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-blue-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">Niveles A1 a B2</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">Pack 4 horas - 140EUR</p>
          </article>
          <article className="rounded-xl border border-blue-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">Niveles C1 y C2</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">Pack 4 horas - 200EUR</p>
          </article>
        </div>
        <Link
          href="/contratar"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
        >
          Contratar pack
        </Link>
      </section>

      <QuickHelpChat />

      <section className="mt-8">
        <TrustReviews tone="white" />
      </section>
    </div>
  );
}
