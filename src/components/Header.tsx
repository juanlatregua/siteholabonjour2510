"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

const proLinks = [
  { href: "/prueba-nivel", label: "Prueba de nivel" },
  { href: "/preparacion-delf-dalf", label: "Preparación DELF/DALF" },
  { href: "/contact", label: "Contacto" },
];

const vieLinks = [
  { href: "/le-mot-du-jour", label: "Le Mot du Jour" },
  { href: "/le-marche", label: "Le Marché" },
  { href: "/le-cinema", label: "Le Cinéma" },
  { href: "/la-cuisine", label: "La Cuisine" },
  { href: "/la-carte", label: "La Carte" },
  { href: "/le-jeu", label: "Le Jeu" },
];

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const isGroupActive = (links: { href: string }[]) =>
    links.some((link) => isActive(link.href));

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    };
  }, []);

  const ctaHref = session?.user
    ? session.user.role === "TEACHER" || session.user.role === "ADMIN"
      ? "/zona-profesor"
      : "/zona-alumno"
    : "/iniciar-sesion";

  const ctaLabel = session?.user
    ? session.user.role === "TEACHER" || session.user.role === "ADMIN"
      ? "Zona profesor"
      : "Mi zona"
    : "Iniciar sesión";

  return (
    <header className={styles.header}>
      <div className={styles.notice}>Formacion online para examenes oficiales DELF y DALF</div>

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
              <li>
                <Link href="/" className={isActive("/") ? styles.activeLink : undefined}>
                  Inicio
                </Link>
              </li>

              {/* Le Côté Pro dropdown */}
              <li
                className={styles.dropdown}
                onMouseEnter={() => handleDropdownEnter("pro")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`${styles.dropdownTrigger} ${isGroupActive(proLinks) ? styles.activeLink : ""}`}
                  aria-expanded={openDropdown === "pro"}
                >
                  Le Côté Pro <FiChevronDown className={styles.chevron} />
                </button>
                {openDropdown === "pro" && (
                  <div className={styles.dropdownMenu}>
                    {proLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.dropdownItem} ${isActive(link.href) ? styles.dropdownItemActive : ""}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Le Côté Vie dropdown */}
              <li
                className={styles.dropdown}
                onMouseEnter={() => handleDropdownEnter("vie")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  className={`${styles.dropdownTrigger} ${isGroupActive(vieLinks) ? styles.activeLink : ""}`}
                  aria-expanded={openDropdown === "vie"}
                >
                  Le Côté Vie <FiChevronDown className={styles.chevron} />
                </button>
                {openDropdown === "vie" && (
                  <div className={styles.dropdownMenu}>
                    {vieLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.dropdownItem} ${isActive(link.href) ? styles.dropdownItemActive : ""}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href={ctaHref} className={styles.ctaButton}>
              {ctaLabel}
            </Link>
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className={styles.mobileNav} aria-label="Navegacion movil">
          <ul>
            <li>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={isActive("/") ? styles.activeMobileLink : undefined}
              >
                Inicio
              </Link>
            </li>

            {/* Le Côté Pro accordion */}
            <li>
              <button
                type="button"
                className={`${styles.accordion} ${isGroupActive(proLinks) ? styles.activeMobileLink : ""}`}
                onClick={() => setOpenAccordion(openAccordion === "pro" ? null : "pro")}
              >
                Le Côté Pro
                <FiChevronDown
                  className={`${styles.chevron} ${openAccordion === "pro" ? styles.chevronOpen : ""}`}
                />
              </button>
              {openAccordion === "pro" && (
                <div className={styles.accordionContent}>
                  {proLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`${styles.accordionItem} ${isActive(link.href) ? styles.activeMobileLink : ""}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Le Côté Vie accordion */}
            <li>
              <button
                type="button"
                className={`${styles.accordion} ${isGroupActive(vieLinks) ? styles.activeMobileLink : ""}`}
                onClick={() => setOpenAccordion(openAccordion === "vie" ? null : "vie")}
              >
                Le Côté Vie
                <FiChevronDown
                  className={`${styles.chevron} ${openAccordion === "vie" ? styles.chevronOpen : ""}`}
                />
              </button>
              {openAccordion === "vie" && (
                <div className={styles.accordionContent}>
                  {vieLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`${styles.accordionItem} ${isActive(link.href) ? styles.activeMobileLink : ""}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          <Link href={ctaHref} className={styles.mobileCta} onClick={closeMobileMenu}>
            {ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
