"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/prueba-nivel", label: "Prueba de nivel" },
  { href: "/preparacion-delf-dalf", label: "Preparación DELF/DALF" },
  { href: "/contact", label: "Contacto" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Ir al inicio">
            <Image
              src="/images/logo-holabonjour-01.svg"
              alt="Logo HolaBonjour"
              width={140}
              height={52}
              priority
            />
          </Link>
        </div>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className={styles.mobileNav} aria-label="Navegación móvil">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMobileMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
