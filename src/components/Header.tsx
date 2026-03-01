"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

const cursosLinks = [
  { href: "/cursos", label: "Tous les cours" },
  { href: "/cursos/preparacion-delf-dalf", label: "Préparation DELF/DALF" },
  { href: "/cursos/conversacion", label: "Conversation" },
  { href: "/cursos/frances-empresas", label: "Français entreprises" },
  { href: "/cursos/intensivos", label: "Cours intensifs" },
  { href: "/cursos/clases-particulares", label: "Cours particuliers" },
];

const recursosLinks = [
  { href: "/recursos", label: "Toutes les ressources" },
  { href: "/recursos/guia-delf-dalf", label: "Guide DELF/DALF" },
  { href: "/recursos/enlaces-utiles", label: "Liens utiles" },
  { href: "/recursos/descargas", label: "Téléchargements" },
  { href: "/recursos/blog", label: "Blog" },
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
      {/* ─── Notice bar ─── */}
      <div className={isCinematic ? styles.noticeCinematic : styles.notice}>
        Cours en ligne avec professeurs natifs &middot; Préparation DELF/DALF
        &middot; Test de niveau gratuit
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
            {/* Cursos accordion */}
            {renderAccordion("cursos", "Cursos", cursosLinks)}

            {/* Test de Nivel */}
            <li className={styles.menuItem}>
              <Link
                href="/test-de-nivel"
                className={menuLinkClass("/test-de-nivel")}
                onClick={closeMenu}
              >
                Test de Nivel
              </Link>
            </li>

            {/* Le Côté Vie accordion */}
            {renderAccordion("vie", "Le Côté Vie", vieLinks)}

            {/* Recursos accordion */}
            {renderAccordion("recursos", "Recursos", recursosLinks)}

            {/* Tarifas */}
            <li className={styles.menuItem}>
              <Link
                href="/tarifas"
                className={menuLinkClass("/tarifas")}
                onClick={closeMenu}
              >
                Tarifas
              </Link>
            </li>

            {/* Contacto */}
            <li className={styles.menuItem}>
              <Link
                href="/contacto"
                className={menuLinkClass("/contacto")}
                onClick={closeMenu}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* CTA at the bottom */}
          <Link
            href="/le-voyage"
            className={isCinematic ? styles.overlayCta : styles.overlayCtaLight}
            onClick={closeMenu}
          >
            Commencer le voyage
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
