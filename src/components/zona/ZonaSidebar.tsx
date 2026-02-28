"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ZonaSidebarProps {
  links: SidebarLink[];
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
    role: string;
  };
}

function UserAvatar({ user }: { user: ZonaSidebarProps["user"] }) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user.email[0].toUpperCase();

  if (user.image) {
    return (
      <img
        src={user.image}
        alt={user.name || user.email}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b3c6f] text-sm font-semibold text-white">
      {initials}
    </div>
  );
}

export default function ZonaSidebar({ links, user }: ZonaSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* User info */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-5">
        <UserAvatar user={user} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">
            {user.name || user.email}
          </p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/zona-alumno" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#0b3c6f]/10 text-[#0b3c6f]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-gray-200 bg-white p-2 shadow-sm lg:hidden"
        aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
      >
        {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-white shadow-lg transition-transform lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        {navContent}
      </aside>
    </>
  );
}
