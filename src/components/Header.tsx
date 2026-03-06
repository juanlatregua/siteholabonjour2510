"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/cursos", label: "Cursos" },
  { href: "/examenes", label: "Exámenes", badge: "NUEVO" },
  { href: "/correccion-ia", label: "Corrección IA" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const Header = ({ variant = "light" }: { variant?: "light" | "cinematic" }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isCinematic = variant === "cinematic";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const authHref =
    status === "loading"
      ? null
      : !session
      ? "/iniciar-sesion"
      : (session.user as { role?: string })?.role === "TEACHER" ||
        (session.user as { role?: string })?.role === "ADMIN"
      ? "/zona-profesor"
      : "/zona-alumno";

  const authLabel =
    !session
      ? "Área alumno"
      : (session.user as { role?: string })?.role === "TEACHER" ||
        (session.user as { role?: string })?.role === "ADMIN"
      ? "Zona profesor"
      : "Mi zona";

  return (
    <header
      className={`${isCinematic ? styles.headerCinematic : styles.header}${scrolled ? ` ${styles.headerScrolled}` : ""}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[#E50046] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Ir al contenido principal
      </a>

      <div className={styles.inner}>
        <div className={styles.topBar}>
          {/* Logo */}
          <Link href="/" aria-label="Ir al inicio" className={styles.logo}>
            <Image
              src="/images/logo-holabonjour-01.svg"
              alt="HolaBonjour"
              width={120}
              height={43}
              priority
            />
          </Link>

          {/* Desktop nav — centered */}
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.desktopLink}${isActive(link.href) ? ` ${styles.desktopLinkActive}` : ""}`}
              >
                {link.label}
                {link.badge && (
                  <span className={styles.badge}>{link.badge}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop right: auth + CTA */}
          <div className={styles.desktopActions}>
            {authHref && status !== "loading" && (
              <Link href={authHref} className={styles.btnOutline}>
                {authLabel}
              </Link>
            )}
            <Link href="/test-de-nivel" className={styles.btnPrimary}>
              Hacer el test de nivel
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className={styles.burgerButton}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`${styles.overlay}${menuOpen ? ` ${styles.overlayOpen}` : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.overlayInner} aria-label="Navegación móvil">
          <ul className={styles.mobileList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.mobileLink}${isActive(link.href) ? ` ${styles.mobileLinkActive}` : ""}`}
                  onClick={closeMenu}
                >
                  {link.label}
                  {link.badge && (
                    <span className={styles.badge}>{link.badge}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileCtas}>
            {authHref && status !== "loading" && (
              <Link
                href={authHref}
                className={styles.btnOutline}
                onClick={closeMenu}
              >
                {authLabel}
              </Link>
            )}
            <Link
              href="/test-de-nivel"
              className={styles.btnPrimary}
              onClick={closeMenu}
            >
              Hacer el test de nivel
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
