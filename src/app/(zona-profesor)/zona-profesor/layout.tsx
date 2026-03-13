import React from "react";
import { redirect } from "next/navigation";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import ZonaSidebar from "@/components/zona/ZonaSidebar";
import ZonaTopbar from "@/components/zona/ZonaTopbar";
import { FiHome, FiUsers, FiBook, FiCalendar, FiFolder, FiClock, FiPackage, FiCreditCard, FiEdit3, FiFileText, FiBarChart2, FiStar, FiTrendingUp, FiMessageSquare, FiSettings, FiUserPlus, FiUser, FiZap } from "react-icons/fi";

function buildTeacherLinks(newLessonCount: number, unreadMsgCount: number) {
  return [
    { href: "/zona-profesor", label: "Dashboard", icon: <FiHome /> },
    { href: "/zona-profesor/alumnos", label: "Alumnos", icon: <FiUsers /> },
    { href: "/zona-profesor/clases", label: "Clases", icon: <FiBook />, badge: newLessonCount },
    { href: "/zona-profesor/mensajes", label: "Mensajes", icon: <FiMessageSquare />, badge: unreadMsgCount },
    { href: "/zona-profesor/calendario", label: "Calendario", icon: <FiCalendar /> },
    { href: "/zona-profesor/correcciones", label: "Correcciones", icon: <FiEdit3 /> },
    { href: "/zona-profesor/examenes", label: "Exámenes", icon: <FiFileText /> },
    { href: "/zona-profesor/materiales", label: "Materiales", icon: <FiFolder /> },
    { href: "/zona-profesor/disponibilidad", label: "Disponibilidad", icon: <FiClock /> },
    { href: "/zona-profesor/packs", label: "Packs", icon: <FiPackage /> },
    { href: "/zona-profesor/pagos", label: "Pagos", icon: <FiCreditCard /> },
    { href: "/zona-profesor/contabilidad", label: "Contabilidad", icon: <FiBarChart2 /> },
    { href: "/zona-profesor/resenas", label: "Reseñas", icon: <FiStar /> },
    { href: "/zona-profesor/analiticas", label: "Analíticas", icon: <FiTrendingUp /> },
    { href: "/zona-profesor/candidaturas", label: "Candidaturas", icon: <FiUserPlus /> },
    { href: "/zona-profesor/perfil", label: "Mi perfil", icon: <FiUser /> },
    { href: "/zona-profesor/suscripcion", label: "Suscripción", icon: <FiZap /> },
    { href: "/zona-profesor/cuenta", label: "Mi cuenta", icon: <FiSettings /> },
  ];
}

export default async function ZonaProfesorLayout({ children }: { children: React.ReactNode }) {
  const session = await requireTeacher();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true, role: true },
  });
  if (!user) redirect("/iniciar-sesion");

  // Count lessons created in the last 24h (new bookings)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const newLessonCount = await prisma.lesson.count({
    where: {
      teacherId: session.user.id,
      status: "SCHEDULED",
      createdAt: { gte: oneDayAgo },
    },
  });

  const unreadMsgCount = await prisma.message.count({
    where: {
      conversation: { teacherId: session.user.id },
      senderId: { not: session.user.id },
      readAt: null,
    },
  });

  const userData = { name: user.name, email: user.email, image: user.image, role: user.role };
  const teacherLinks = buildTeacherLinks(newLessonCount, unreadMsgCount);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ZonaSidebar links={teacherLinks} user={userData} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ZonaTopbar title="Zona Profesor" user={userData} />
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
