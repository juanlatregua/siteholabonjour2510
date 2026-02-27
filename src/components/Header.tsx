"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/prueba-nivel", label: "Prueba de nivel" },
  { href: "/preparacion-delf-dalf", label: "Preparacion y conversacion" },
  { href: "/contact", label: "Contacto" },
];

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const getBasePath = (href: string) => {
    const [path] = href.split("#");
    return path || "/";
  };

  const isActive = (href: string) => {
    const basePath = getBasePath(href);

    if (basePath === "/") {
      return pathname === "/";
    }

    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.notice}>
        Clases online con Isabelle Guitton · Pack 4h desde 140EUR · Zoom + entorno digital
      </div>

      <div className={styles.inner}>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <Link href="/" aria-label="Ir al inicio">
              <Image
                src="/images/logo-holabonjour-01.svg"
                alt="Logo HolaBonjour"
                width={134}
                height={48}
                priority
              />
            </Link>
          </div>

          <nav className={styles.desktopNav} aria-label="Navegacion principal">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={isActive(link.href) ? styles.activeLink : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href="/contratar" className={styles.ctaButton}>
              Contratar pack
            </Link>
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-nav" className={styles.mobileNav} aria-label="Navegacion movil">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={isActive(link.href) ? styles.activeMobileLink : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contratar" className={styles.mobileCta} onClick={closeMobileMenu}>
            Contratar pack
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
