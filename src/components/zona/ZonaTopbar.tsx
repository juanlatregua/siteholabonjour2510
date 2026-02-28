"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  clases: "Clases",
  calendario: "Calendario",
  reservar: "Reservar",
  pack: "Mi Pack",
  pagos: "Pagos",
  resultados: "Resultados",
  recursos: "Recursos",
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

      {/* User avatar */}
      <div className="flex-shrink-0">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || user.email}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b3c6f] text-xs font-semibold text-white">
            {initials}
          </div>
        )}
      </div>
    </header>
  );
}
