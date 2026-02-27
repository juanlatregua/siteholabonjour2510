import type { Metadata } from "next";
import Link from "next/link";
import { getStudentDashboard, listStudents } from "@/lib/student-zone-db";

export const metadata: Metadata = {
  title: "Zona alumno",
  description:
    "Accede a apuntes, material y seguimiento de clases del alumno en entorno digital personalizado.",
};

const formatDate = (value: string) => {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default async function ZonaAlumnoPage({
  searchParams,
}: {
  searchParams: Promise<{ alumno?: string }>;
}) {
  const resolved = await searchParams;
  const selectedStudentId = resolved.alumno || "demo";

  const dashboard = getStudentDashboard(selectedStudentId);
  const students = listStudents();

  if (!dashboard) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Zona alumno</h1>
        <p className="mt-3 text-gray-700">No encontramos ese alumno.</p>
        <p className="mt-2 text-sm text-gray-600">
          IDs disponibles: {students.map((student) => student.id).join(", ")}
        </p>
        <Link
          href="/zona-alumno?alumno=demo"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b3c6f]"
        >
          Abrir alumno demo
        </Link>
      </div>
    );
  }

  const { student, lessons } = dashboard;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#0b3c6f] px-6 py-8 text-white">
        <p className="text-xs uppercase tracking-[0.14em] text-blue-100">Zona alumno</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{student.name}</h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Ruta: {student.route === "preparacion-examen" ? "Preparacion de examen" : "Conversacion"} · Nivel {student.level} · Docente: {student.coach}
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-[#0f5da0]">Alumno</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">{student.name}</p>
          <p className="text-sm text-gray-700">{student.email}</p>
        </article>
        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-[#0f5da0]">Plan activo</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {student.route === "preparacion-examen" ? "Preparacion DELF/DALF" : "Conversacion"}
          </p>
          <p className="text-sm text-gray-700">Nivel objetivo {student.level}</p>
        </article>
        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-[#0f5da0]">Clases registradas</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{lessons.length}</p>
          <p className="text-sm text-gray-700">Apuntes y materiales por sesion.</p>
        </article>
      </section>

      <section className="mt-8 space-y-4">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900">{lesson.focus}</h2>
              <p className="text-sm font-medium text-[#0f5da0]">{formatDate(lesson.date)} · {lesson.durationMinutes} min · {lesson.mode}</p>
            </div>

            <p className="mt-3 text-sm text-gray-700">{lesson.notes}</p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">Material de la clase</p>
              <ul className="mt-2 space-y-2">
                {lesson.materials.map((material) => (
                  <li key={material.id}>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-[#0f5da0] underline"
                    >
                      {material.title}
                    </a>
                    <span className="ml-2 text-xs uppercase text-gray-500">{material.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <p className="text-sm text-gray-700">
          Base de datos actual: almacenamiento local JSON con capa de acceso en servidor.
          Lista para migrar a Postgres/Prisma sin cambiar UI.
        </p>
      </section>
    </div>
  );
}
