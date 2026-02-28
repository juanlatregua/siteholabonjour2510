import React from "react";
import { redirect } from "next/navigation";
import { requireTeacher, getCurrentUser } from "@/lib/auth-helpers";
import ZonaSidebar from "@/components/zona/ZonaSidebar";
import ZonaTopbar from "@/components/zona/ZonaTopbar";
import { FiHome, FiUsers, FiBook, FiCalendar, FiFolder, FiClock, FiPackage, FiCreditCard } from "react-icons/fi";

const teacherLinks = [
  { href: "/zona-profesor", label: "Dashboard", icon: <FiHome /> },
  { href: "/zona-profesor/alumnos", label: "Alumnos", icon: <FiUsers /> },
  { href: "/zona-profesor/clases", label: "Clases", icon: <FiBook /> },
  { href: "/zona-profesor/calendario", label: "Calendario", icon: <FiCalendar /> },
  { href: "/zona-profesor/materiales", label: "Materiales", icon: <FiFolder /> },
  { href: "/zona-profesor/disponibilidad", label: "Disponibilidad", icon: <FiClock /> },
  { href: "/zona-profesor/packs", label: "Packs", icon: <FiPackage /> },
  { href: "/zona-profesor/pagos", label: "Pagos", icon: <FiCreditCard /> },
];

export default async function ZonaProfesorLayout({ children }: { children: React.ReactNode }) {
  const session = await requireTeacher();
  const user = await getCurrentUser(session.user.id);
  if (!user) redirect("/iniciar-sesion");

  const userData = { name: user.name, email: user.email, image: user.image, role: user.role };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ZonaSidebar links={teacherLinks} user={userData} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ZonaTopbar title="Zona Profesor" user={userData} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
