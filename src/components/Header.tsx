"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

const cursosLinks = [
  { href: "/cursos", label: "Todos los cursos" },
  { href: "/preparacion-delf-dalf", label: "Preparación DELF/DALF" },
  { href: "/cursos#conversacion", label: "Conversación" },
  { href: "/empresas", label: "Francés para empresas" },
];

const recursosLinks = [
  { href: "/recursos/enlaces-utiles", label: "Enlaces útiles" },
  { href: "/blog", label: "Blog" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCinematic = variant === "cinematic";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

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

  const isDropdownActive = (links: { href: string }[]) => {
    return links.some((link) => isActive(link.href));
  };

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  /* ─── Style helpers ─── */

  const linkClass = (href: string) => {
    const active = isActive(href);
    if (isCinematic) {
      return `${styles.navLinkCinematic}${active ? ` ${styles.activeLinkCinematic}` : ""}`;
    }
    return active ? styles.activeLink : undefined;
  };

  const triggerClass = (links: { href: string }[]) => {
    const active = isDropdownActive(links);
    if (isCinematic) {
      return `${styles.dropdownTriggerCinematic}${active ? ` ${styles.dropdownTriggerActiveCinematic}` : ""}`;
    }
    return `${styles.dropdownTrigger}${active ? ` ${styles.dropdownTriggerActive}` : ""}`;
  };

  const dropdownMenuClass = isCinematic ? styles.dropdownMenuCinematic : styles.dropdownMenu;

  const dropdownItemClass = (href: string) => {
    const active = isActive(href);
    if (isCinematic) {
      return `${styles.dropdownItemCinematic}${active ? ` ${styles.dropdownItemActiveCinematic}` : ""}`;
    }
    return `${styles.dropdownItem}${active ? ` ${styles.dropdownItemActive}` : ""}`;
  };

  /* ─── Dropdown renderer ─── */

  const renderDropdown = (name: string, label: string, links: { href: string; label: string }[]) => (
    <li
      key={name}
      onMouseEnter={() => handleDropdownEnter(name)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        className={triggerClass(links)}
        onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
        aria-expanded={openDropdown === name}
      >
        {label}
        <FiChevronDown
          className={`${styles.chevron}${openDropdown === name ? ` ${styles.chevronOpen}` : ""}`}
        />
      </button>
      {openDropdown === name && (
        <ul className={dropdownMenuClass}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={dropdownItemClass(link.href)}
                onClick={() => setOpenDropdown(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  /* ─── Mobile accordion renderer ─── */

  const renderAccordion = (name: string, label: string, links: { href: string; label: string }[]) => (
    <li key={name}>
      <button
        className={isCinematic ? styles.accordionCinematic : styles.accordion}
        onClick={() => setOpenAccordion(openAccordion === name ? null : name)}
        aria-expanded={openAccordion === name}
      >
        {label}
        <FiChevronDown
          className={`${styles.chevron}${openAccordion === name ? ` ${styles.chevronOpen}` : ""}`}
        />
      </button>
      {openAccordion === name && (
        <ul className={isCinematic ? styles.accordionContentCinematic : styles.accordionContent}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isCinematic ? styles.accordionItemCinematic : styles.accordionItem}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <header className={isCinematic ? styles.headerCinematic : styles.header}>
      <div className={isCinematic ? styles.noticeCinematic : styles.notice}>
        Clases online con profesores nativos · Preparación DELF/DALF · Test de nivel gratuito
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

          <nav className={styles.desktopNav} aria-label="Navegación principal">
            <ul>
              <li>
                <Link href="/" className={linkClass("/")}>
                  Inicio
                </Link>
              </li>
              {renderDropdown("cursos", "Cursos", cursosLinks)}
              <li>
                <Link href="/test-de-nivel" className={linkClass("/test-de-nivel")}>
                  Test de Nivel
                </Link>
              </li>
              {renderDropdown("vie", "Le Côté Vie", vieLinks)}
              {renderDropdown("recursos", "Recursos", recursosLinks)}
              <li>
                <Link href="/tarifas" className={linkClass("/tarifas")}>
                  Tarifas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className={linkClass("/contacto")}>
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link
              href="/test-de-nivel"
              className={isCinematic ? styles.ctaCinematic : styles.ctaButton}
            >
              Test de nivel
            </Link>
            <button
              className={isCinematic ? styles.mobileMenuButtonCinematic : styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className={isCinematic ? styles.mobileNavCinematic : styles.mobileNav}
          aria-label="Navegación móvil"
        >
          <ul>
            <li>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={
                  isActive("/")
                    ? isCinematic
                      ? styles.activeMobileLinkCinematic
                      : styles.activeMobileLink
                    : undefined
                }
              >
                Inicio
              </Link>
            </li>
            {renderAccordion("cursos", "Cursos", cursosLinks)}
            <li>
              <Link
                href="/test-de-nivel"
                onClick={closeMobileMenu}
                className={
                  isActive("/test-de-nivel")
                    ? isCinematic
                      ? styles.activeMobileLinkCinematic
                      : styles.activeMobileLink
                    : undefined
                }
              >
                Test de Nivel
              </Link>
            </li>
            {renderAccordion("vie", "Le Côté Vie", vieLinks)}
            {renderAccordion("recursos", "Recursos", recursosLinks)}
            <li>
              <Link
                href="/tarifas"
                onClick={closeMobileMenu}
                className={
                  isActive("/tarifas")
                    ? isCinematic
                      ? styles.activeMobileLinkCinematic
                      : styles.activeMobileLink
                    : undefined
                }
              >
                Tarifas
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                onClick={closeMobileMenu}
                className={
                  isActive("/contacto")
                    ? isCinematic
                      ? styles.activeMobileLinkCinematic
                      : styles.activeMobileLink
                    : undefined
                }
              >
                Contacto
              </Link>
            </li>
          </ul>
          <Link
            href="/test-de-nivel"
            className={isCinematic ? styles.mobileCtaCinematic : styles.mobileCta}
            onClick={closeMobileMenu}
          >
            Test de nivel
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
