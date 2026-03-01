import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LessonCard from "@/components/zona/LessonCard";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

import EmptyState from "@/components/ui/EmptyState";
import {
  FiUsers,
  FiBook,
  FiCalendar,
  FiFolder,
  FiClock,
  FiPackage,
  FiCreditCard,
} from "react-icons/fi";

const quickLinks = [
  { href: "/zona-profesor/alumnos", label: "Alumnos", icon: <FiUsers className="h-5 w-5" />, color: "bg-blue-50 text-blue-600" },
  { href: "/zona-profesor/clases", label: "Clases", icon: <FiBook className="h-5 w-5" />, color: "bg-purple-50 text-purple-600" },
  { href: "/zona-profesor/calendario", label: "Calendario", icon: <FiCalendar className="h-5 w-5" />, color: "bg-green-50 text-green-600" },
  { href: "/zona-profesor/materiales", label: "Materiales", icon: <FiFolder className="h-5 w-5" />, color: "bg-amber-50 text-amber-600" },
  { href: "/zona-profesor/disponibilidad", label: "Disponibilidad", icon: <FiClock className="h-5 w-5" />, color: "bg-pink-50 text-pink-600" },
  { href: "/zona-profesor/packs", label: "Packs", icon: <FiPackage className="h-5 w-5" />, color: "bg-indigo-50 text-indigo-600" },
  { href: "/zona-profesor/pagos", label: "Pagos", icon: <FiCreditCard className="h-5 w-5" />, color: "bg-teal-50 text-teal-600" },
];

export default async function ZonaProfesorDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const teacherId = session.user.id;

  // Today range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [studentCount, todayLessons, upcomingLessons, weekLessons] = await Promise.all([
    prisma.user.count({
      where: { coachId: teacherId },
    }),
    prisma.lesson.findMany({
      where: {
        teacherId,
        scheduledAt: { gte: todayStart, lte: todayEnd },
      },
      orderBy: { scheduledAt: "asc" },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.lesson.findMany({
      where: {
        teacherId,
        status: "SCHEDULED",
        scheduledAt: { gt: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.lesson.count({
      where: {
        teacherId,
        scheduledAt: {
          gte: new Date(todayStart.getTime() - todayStart.getDay() * 86400000),
          lte: todayEnd,
        },
        status: "COMPLETED",
      },
    }),
  ]);

  const teacher = await prisma.user.findUnique({
    where: { id: teacherId },
    select: { name: true },
  });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Bienvenido{teacher?.name ? `, ${teacher.name.split(" ")[0]}` : ""}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Aqui tienes un resumen de tu actividad docente.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Alumnos</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{studentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Clases hoy</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{todayLessons.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Proximas clases</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{upcomingLessons.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Completadas esta semana</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{weekLessons}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's lessons + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clases de hoy</CardTitle>
          </CardHeader>
          <CardContent>
            {todayLessons.length > 0 ? (
              <div className="space-y-3">
                {todayLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    scheduledAt={lesson.scheduledAt}
                    status={lesson.status}
                    focus={lesson.focus}
                    teacherName={lesson.student.name || lesson.student.email}
                    zoomLink={lesson.zoomLink}
                    durationMinutes={lesson.durationMinutes}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sin clases hoy"
                description="No tienes clases programadas para hoy."
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proximas clases</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingLessons.length > 0 ? (
              <div className="space-y-3">
                {upcomingLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    scheduledAt={lesson.scheduledAt}
                    status={lesson.status}
                    focus={lesson.focus}
                    teacherName={lesson.student.name || lesson.student.email}
                    zoomLink={lesson.zoomLink}
                    durationMinutes={lesson.durationMinutes}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Sin clases programadas"
                description="No hay clases proximas."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Acceso rapido</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.color}`}>
                {link.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
