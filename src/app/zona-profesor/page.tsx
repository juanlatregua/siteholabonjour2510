import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zona profesor",
  description:
    "Area de gestion docente para agenda, sesiones Zoom y seguimiento academico.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function ZonaProfesorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#0b3c6f] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Zona profesor</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Gestion docente y agenda</h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Area interna para gestionar disponibilidad, sesiones Zoom, materiales y comunicacion con alumnado.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Acceso privado</h2>
        <p className="mt-2 text-sm text-slate-700">
          Esta pagina es de uso interno y no publica. El acceso operativo se habilita con credenciales del equipo.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Agenda de clases y disponibilidad semanal.</li>
          <li>Enlaces de sesiones Zoom por alumno.</li>
          <li>Registro de apuntes, tareas y materiales por sesion.</li>
          <li>Mensajeria/email de seguimiento academico.</li>
        </ul>
        <div className="mt-5">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white hover:bg-[#0b4d84]"
          >
            Contactar soporte tecnico
          </Link>
        </div>
      </section>
    </div>
  );
}
