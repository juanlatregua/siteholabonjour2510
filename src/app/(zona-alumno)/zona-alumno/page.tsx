import React from "react";
import Link from "next/link";
import { requireStudent, getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import LessonCard from "@/components/zona/LessonCard";
import PackCard from "@/components/zona/PackCard";
import MaterialItem from "@/components/zona/MaterialItem";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import {
  FiBook,
  FiCalendar,
  FiPlus,
  FiPackage,
  FiCreditCard,
  FiBarChart2,
  FiFolder,
  FiEdit3,
} from "react-icons/fi";

const quickLinks = [
  { href: "/zona-alumno/clases", label: "Clases", icon: <FiBook className="h-5 w-5" />, color: "bg-blue-50 text-blue-600" },
  { href: "/zona-alumno/calendario", label: "Calendario", icon: <FiCalendar className="h-5 w-5" />, color: "bg-purple-50 text-purple-600" },
  { href: "/zona-alumno/reservar", label: "Reservar", icon: <FiPlus className="h-5 w-5" />, color: "bg-green-50 text-green-600" },
  { href: "/zona-alumno/correcciones", label: "Correcciones IA", icon: <FiEdit3 className="h-5 w-5" />, color: "bg-rose-50 text-rose-600" },
  { href: "/zona-alumno/pack", label: "Mi Pack", icon: <FiPackage className="h-5 w-5" />, color: "bg-amber-50 text-amber-600" },
  { href: "/zona-alumno/pagos", label: "Pagos", icon: <FiCreditCard className="h-5 w-5" />, color: "bg-pink-50 text-pink-600" },
  { href: "/zona-alumno/resultados", label: "Resultados", icon: <FiBarChart2 className="h-5 w-5" />, color: "bg-indigo-50 text-indigo-600" },
  { href: "/zona-alumno/recursos", label: "Recursos", icon: <FiFolder className="h-5 w-5" />, color: "bg-teal-50 text-teal-600" },
];

export default async function ZonaAlumnoDashboard() {
  const session = await requireStudent();
  const user = await getCurrentUser(session.user.id);

  if (!user) return null;

  // Fetch next upcoming lesson
  const nextLesson = await prisma.lesson.findFirst({
    where: {
      studentId: user.id,
      status: "SCHEDULED",
      scheduledAt: { gte: new Date() },
    },
    orderBy: { scheduledAt: "asc" },
    include: {
      teacher: { select: { name: true } },
    },
  });

  // Active pack
  const activePack = await prisma.pack.findFirst({
    where: { studentId: user.id, status: "ACTIVE" },
    orderBy: { purchasedAt: "desc" },
  });

  // Recent materials
  const recentMaterials = await prisma.material.findMany({
    where: { studentId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Latest correction
  const latestCorrection = await prisma.writingCorrection.findFirst({
    where: { userId: user.id, status: "COMPLETED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Bienvenido{user.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Aquí tienes un resumen de tu actividad.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next lesson */}
        <Card>
          <CardHeader>
            <CardTitle>Próxima clase</CardTitle>
          </CardHeader>
          <CardContent>
            {nextLesson ? (
              <LessonCard
                scheduledAt={nextLesson.scheduledAt}
                status={nextLesson.status}
                focus={nextLesson.focus}
                teacherName={nextLesson.teacher.name}
                zoomLink={nextLesson.zoomLink}
                durationMinutes={nextLesson.durationMinutes}
              />
            ) : (
              <EmptyState
                title="Sin clases programadas"
                description="Reserva tu próxima clase para empezar."
                action={
                  <Link
                    href="/zona-alumno/reservar"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e2d4a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2e4d8a]"
                  >
                    <FiPlus className="h-4 w-4" />
                    Reservar clase
                  </Link>
                }
              />
            )}
          </CardContent>
        </Card>

        {/* Active pack */}
        <Card>
          <CardHeader>
            <CardTitle>Mi Pack</CardTitle>
          </CardHeader>
          <CardContent>
            {activePack ? (
              <PackCard
                hoursTotal={activePack.hoursTotal}
                hoursUsed={activePack.hoursUsed}
                levelRange={activePack.levelRange}
                status={activePack.status}
                purchasedAt={activePack.purchasedAt}
              />
            ) : (
              <EmptyState
                title="Sin pack activo"
                description="Contrata un pack de clases para empezar."
                action={
                  <Link
                    href="/contratar"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E50046] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c7003d]"
                  >
                    <FiPlus className="h-4 w-4" />
                    Contratar pack
                  </Link>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Latest correction */}
      {latestCorrection && (
        <Card>
          <CardHeader>
            <CardTitle>Última corrección IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {latestCorrection.level} — {latestCorrection.taskType.replace(/_/g, " ")}
                </p>
                <p className="text-xs text-gray-600">
                  {latestCorrection.globalScore != null && latestCorrection.maxScore != null
                    ? `${latestCorrection.globalScore}/${latestCorrection.maxScore} puntos`
                    : "Procesando..."}
                  {" · "}{latestCorrection.wordCount} palabras
                </p>
              </div>
              <Link
                href={`/zona-alumno/correcciones/${latestCorrection.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#1e2d4a] transition-colors hover:bg-[#1e2d4a]/5"
              >
                Ver detalle
                <FiBarChart2 className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent materials */}
      <Card>
        <CardHeader>
          <CardTitle>Materiales recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentMaterials.length > 0 ? (
            <div className="space-y-2">
              {recentMaterials.map((m) => (
                <MaterialItem
                  key={m.id}
                  title={m.title}
                  type={m.type}
                  storagePath={m.storagePath}
                  publicUrl={m.publicUrl}
                  createdAt={m.createdAt}
                  sizeBytes={m.sizeBytes}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Sin materiales"
              description="Los materiales de tus clases aparecerán aquí."
            />
          )}
        </CardContent>
      </Card>

      {/* Quick links */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Acceso rápido</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color}`}
              >
                {link.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
