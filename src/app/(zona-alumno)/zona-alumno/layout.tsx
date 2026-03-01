import React from "react";
import { redirect } from "next/navigation";
import { requireStudent, getCurrentUser } from "@/lib/auth-helpers";
import ZonaSidebar from "@/components/zona/ZonaSidebar";
import ZonaTopbar from "@/components/zona/ZonaTopbar";
import {
  FiHome,
  FiBook,
  FiCalendar,
  FiPlus,
  FiPackage,
  FiCreditCard,
  FiBarChart2,
  FiFolder,
} from "react-icons/fi";

const studentLinks = [
  { href: "/zona-alumno", label: "Dashboard", icon: <FiHome /> },
  { href: "/zona-alumno/clases", label: "Clases", icon: <FiBook /> },
  { href: "/zona-alumno/calendario", label: "Calendario", icon: <FiCalendar /> },
  { href: "/zona-alumno/reservar", label: "Reservar", icon: <FiPlus /> },
  { href: "/zona-alumno/pack", label: "Mi Pack", icon: <FiPackage /> },
  { href: "/zona-alumno/pagos", label: "Pagos", icon: <FiCreditCard /> },
  { href: "/zona-alumno/resultados", label: "Resultados", icon: <FiBarChart2 /> },
  { href: "/zona-alumno/recursos", label: "Recursos", icon: <FiFolder /> },
];

export default async function ZonaAlumnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireStudent();
  const user = await getCurrentUser(session.user.id);

  if (!user) {
    redirect("/iniciar-sesion");
  }

  const userData = {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ZonaSidebar links={studentLinks} user={userData} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ZonaTopbar title="Zona Alumno" user={userData} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
