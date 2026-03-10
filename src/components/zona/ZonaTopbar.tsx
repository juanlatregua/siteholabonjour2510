"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

interface ZonaTopbarProps {
  title: string;
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}

const breadcrumbLabels: Record<string, string> = {
  "zona-alumno": "Zona Alumno",
  "zona-profesor": "Panel profesor",
  clases: "Clases",
  calendario: "Calendario",
  reservar: "Reservar",
  pack: "Mi Pack",
  pagos: "Pagos",
  resultados: "Resultados",
  recursos: "Recursos",
  alumnos: "Alumnos",
  nuevo: "Nuevo",
  nueva: "Nueva",
  materiales: "Materiales",
  subir: "Subir material",
  disponibilidad: "Disponibilidad",
  packs: "Packs",
};

export default function ZonaTopbar({ title, user }: ZonaTopbarProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, idx) => ({
    label: breadcrumbLabels[segment] || segment,
    href: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:px-8">
      <div className="min-w-0 flex-1 pl-12 lg:pl-0">
        {/* Breadcrumbs */}
        <nav className="mb-1 flex items-center gap-1 text-xs text-gray-400">
          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.href}>
              {crumb.isLast ? (
                <span className="text-gray-600">{crumb.label}</span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-gray-600">
                    {crumb.label}
                  </Link>
                  <span>/</span>
                </>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="truncate text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      {/* User avatar + logout */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || user.email}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e2d4a] text-xs font-semibold text-white">
            {initials}
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/iniciar-sesion" })}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          title="Cerrar sesión"
        >
          <FiLogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
