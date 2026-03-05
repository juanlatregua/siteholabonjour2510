"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

const cursosLinks = [
  { href: "/cursos", label: "Todos los cursos" },
  { href: "/cursos/preparacion-delf-dalf", label: "Preparación DELF/DALF" },
  { href: "/cursos/conversacion", label: "Conversación" },
  { href: "/cursos/frances-empresas", label: "Francés para empresas" },
  { href: "/cursos/intensivos", label: "Cursos intensivos" },
  { href: "/cursos/clases-particulares", label: "Clases particulares" },
];

const examenesLinks = [
  { href: "/examen-delf-a1", label: "Simulacro DELF A1" },
  { href: "/examen-delf-a2", label: "Simulacro DELF A2" },
  { href: "/calendario-examenes", label: "Calendario de exámenes" },
];

const vieLinks = [
  { href: "/le-mot-du-jour", label: "Le Mot du Jour" },
  { href: "/le-marche", label: "Le Marché" },
  { href: "/le-cinema", label: "Le Cinéma" },
  { href: "/la-cuisine", label: "La Cuisine" },
  { href: "/la-carte", label: "La Carte" },
  { href: "/le-jeu", label: "Le Jeu" },
];

const Header = ({ variant = "light" }: { variant?: "light" | "cinematic" }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const isCinematic = variant === "cinematic";

  /* ─── Lock body scroll when menu is open ─── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ─── Close menu on route change ─── */
  useEffect(() => {
    setMenuOpen(false);
    setOpenAccordion(null);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenAccordion(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      setOpenAccordion(null);
    }
  }, [menuOpen]);

  /* ─── Active-link helpers ─── */

  const getBasePath = (href: string) => {
    const [path] = href.split("#");
    return path || "/";
  };

  const isActive = (href: string) => {
    const basePath = getBasePath(href);
    if (basePath === "/") return pathname === "/";
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  /* ─── Style helpers ─── */

  const menuLinkClass = (href: string) => {
    const active = isActive(href);
    if (isCinematic) {
      return `${styles.menuLink} ${styles.menuLinkCinematic}${active ? ` ${styles.menuLinkActiveCinematic}` : ""}`;
    }
    return `${styles.menuLink}${active ? ` ${styles.menuLinkActive}` : ""}`;
  };

  /* ─── Auth link ─── */

  const renderAuthLink = () => {
    if (status === "loading") return null;

    if (!session) {
      return (
        <li className={`${styles.menuItem} ${styles.authMenuItem}`}>
          <Link
            href="/iniciar-sesion"
            className={menuLinkClass("/iniciar-sesion")}
            onClick={closeMenu}
          >
            Acceder
          </Link>
        </li>
      );
    }

    const role = (session.user as { role?: string })?.role;
    if (role === "TEACHER" || role === "ADMIN") {
      return (
        <li className={`${styles.menuItem} ${styles.authMenuItem}`}>
          <Link
            href="/zona-profesor"
            className={menuLinkClass("/zona-profesor")}
            onClick={closeMenu}
          >
            Zona profesor
          </Link>
        </li>
      );
    }

    return (
      <li className={`${styles.menuItem} ${styles.authMenuItem}`}>
        <Link
          href="/zona-alumno"
          className={menuLinkClass("/zona-alumno")}
          onClick={closeMenu}
        >
          Mi zona
        </Link>
      </li>
    );
  };

  /* ─── Accordion renderer for sub-sections ─── */

  const renderAccordion = (
    name: string,
    label: string,
    links: { href: string; label: string }[]
  ) => (
    <li key={name} className={styles.menuItem}>
      <button
        className={
          isCinematic
            ? `${styles.accordionTrigger} ${styles.accordionTriggerCinematic}`
            : styles.accordionTrigger
        }
        onClick={() => setOpenAccordion(openAccordion === name ? null : name)}
        aria-expanded={openAccordion === name}
      >
        <span>{label}</span>
        <FiChevronDown
          className={`${styles.chevron}${openAccordion === name ? ` ${styles.chevronOpen}` : ""}`}
        />
      </button>

      <div
        className={`${styles.accordionBody}${openAccordion === name ? ` ${styles.accordionBodyOpen}` : ""}`}
      >
        <ul
          className={
            isCinematic
              ? `${styles.accordionList} ${styles.accordionListCinematic}`
              : styles.accordionList
          }
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isCinematic
                    ? `${styles.accordionItem} ${styles.accordionItemCinematic}${isActive(link.href) ? ` ${styles.accordionItemActiveCinematic}` : ""}`
                    : `${styles.accordionItem}${isActive(link.href) ? ` ${styles.accordionItemActive}` : ""}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );

  return (
    <header className={isCinematic ? styles.headerCinematic : styles.header}>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[#E50046] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Ir al contenido principal
      </a>
      {/* ─── Notice bar ─── */}
      <div className={isCinematic ? styles.noticeCinematic : styles.notice}>
        Clases online con profesoras nativas &middot; Preparación DELF/DALF
        &middot; Test de nivel gratuito
      </div>

      {/* ─── Top bar: logo + burger ─── */}
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <Link href="/" aria-label="Ir al inicio" onClick={closeMenu}>
              <Image
                src="/images/logo-holabonjour-01.svg"
                alt="HolaBonjour"
                width={120}
                height={43}
                priority
                style={undefined}
              />
            </Link>
          </div>

          <button
            className={
              isCinematic
                ? styles.burgerButtonCinematic
                : styles.burgerButton
            }
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="overlay-nav"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ─── Full-screen overlay menu ─── */}
      <div
        className={`${styles.overlay}${menuOpen ? ` ${styles.overlayOpen}` : ""}${isCinematic ? ` ${styles.overlayCinematic}` : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav
          id="overlay-nav"
          className={styles.overlayInner}
          aria-label="Navegación principal"
        >
          <ul className={styles.menuList}>
            {/* ── APRENDER ── */}
            {renderAccordion("cursos", "Cursos", cursosLinks)}

            <li className={styles.menuItem}>
              <Link
                href="/test-de-nivel"
                className={menuLinkClass("/test-de-nivel")}
                onClick={closeMenu}
              >
                Test de Nivel
              </Link>
            </li>

            <li className={styles.menuItem}>
              <Link
                href="/correccion-ia"
                className={menuLinkClass("/correccion-ia")}
                onClick={closeMenu}
              >
                Corrección IA
              </Link>
            </li>

            {/* ── Separador ── */}
            <li className={styles.menuGroupSeparator} aria-hidden="true" />

            {/* ── EXÁMENES ── */}
            {renderAccordion("examenes", "Exámenes DELF", examenesLinks)}

            {/* ── Separador ── */}
            <li className={styles.menuGroupSeparator} aria-hidden="true" />

            {/* ── DÉCOUVRIR ── */}
            {renderAccordion("vie", "Le Côté Vie", vieLinks)}

            {/* ── Separador ── */}
            <li className={styles.menuGroupSeparator} aria-hidden="true" />

            {/* ── INFO ── */}
            <li className={styles.menuItem}>
              <Link
                href="/tarifas"
                className={menuLinkClass("/tarifas")}
                onClick={closeMenu}
              >
                Tarifas
              </Link>
            </li>

            <li className={styles.menuItem}>
              <Link
                href="/sobre-nosotros"
                className={menuLinkClass("/sobre-nosotros")}
                onClick={closeMenu}
              >
                Sobre nosotros
              </Link>
            </li>

            <li className={styles.menuItem}>
              <Link
                href="/contacto"
                className={menuLinkClass("/contacto")}
                onClick={closeMenu}
              >
                Contacto
              </Link>
            </li>

            {/* ── AUTH ── */}
            {renderAuthLink()}
          </ul>

          {/* CTA at the bottom */}
          <Link
            href="/test-de-nivel"
            className={isCinematic ? styles.overlayCta : styles.overlayCtaLight}
            onClick={closeMenu}
          >
            Hacer el test de nivel
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
