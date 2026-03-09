"use client";

import React, { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FileText, GraduationCap, BookOpen, Sparkles, Briefcase, Calendar } from "lucide-react";
import styles from "./Header.module.css";

/* ─── Menu data ─── */

const ICON_STYLE = { width: 20, height: 20, color: "#1471B3" };

interface MenuItem {
  label: string;
  href?: string;
  children?: { icon: ReactNode; label: string; desc: string; href: string }[];
  separator?: number[]; // indices after which to insert separator
}

const menuItems: MenuItem[] = [
  {
    label: "Exámenes",
    children: [
      { icon: <FileText style={ICON_STYLE} />, label: "DELF A2", desc: "Nivel básico · Gratis", href: "/examenes/a2/1" },
      { icon: <FileText style={ICON_STYLE} />, label: "DELF B1", desc: "Nivel umbral · Gratis", href: "/examenes/b1/1" },
      { icon: <FileText style={ICON_STYLE} />, label: "DELF B2", desc: "Nivel avanzado · Gratis", href: "/examenes/b2/1" },
      { icon: <FileText style={ICON_STYLE} />, label: "DALF C1", desc: "Nivel autónomo · Gratis", href: "/examenes/c1/1" },
      { icon: <FileText style={ICON_STYLE} />, label: "DALF C2", desc: "Nivel maestría · Gratis", href: "/examenes/c2/1" },
      { icon: <Calendar style={ICON_STYLE} />, label: "Calendario de exámenes oficiales", desc: "Próximas convocatorias FEI", href: "/calendario-examenes" },
    ],
    separator: [4],
  },
  {
    label: "Preparación",
    children: [
      { icon: <GraduationCap style={ICON_STYLE} />, label: "Clases con Isabelle", desc: "Preparación personalizada online", href: "/contratar" },
      { icon: <BookOpen style={ICON_STYLE} />, label: "Guías por nivel", desc: "DELF A2, B1, B2 · DALF C1, C2", href: "/preparacion-delf-dalf" },
      { icon: <Sparkles style={ICON_STYLE} />, label: "Corrección IA", desc: "Corrige tu producción escrita al instante", href: "/correccion-ia" },
      { icon: <Briefcase style={ICON_STYLE} />, label: "Para empresas", desc: "Oracle, ALISS y equipos profesionales", href: "/empresas" },
    ],
    separator: [2],
  },
  { label: "Tarifas", href: "/tarifas" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
];

/* ─── Component ─── */

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Headroom: hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 100) {
        setVisible(y < lastScrollY.current || y < 64);
      } else {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileAccordion(null);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  // Desktop dropdown hover handlers
  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  // Auth destination
  const authHref =
    status === "loading"
      ? null
      : !session
      ? "/iniciar-sesion"
      : (session.user as { role?: string })?.role === "TEACHER" ||
        (session.user as { role?: string })?.role === "ADMIN"
      ? "/zona-profesor"
      : "/zona-alumno";

  const authLabel = !session
    ? "Área alumno"
    : (session.user as { role?: string })?.role === "TEACHER" ||
      (session.user as { role?: string })?.role === "ADMIN"
    ? "Zona profesor"
    : "Mi zona";

  const userName = session?.user?.name?.split(" ")[0] || null;

  return (
    <>
    <header
      className={`${styles.header}${scrolled ? ` ${styles.headerScrolled}` : ""}`}
      style={{
        transform: visible || menuOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
      }}
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

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            {menuItems.map((item) => {
              if (!item.children) {
                return (
                  <Link key={item.label} href={item.href!} className={styles.desktopLink}>
                    {item.label}
                  </Link>
                );
              }
              return (
                <div
                  key={item.label}
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={styles.desktopLink} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    {item.label}
                    <FiChevronDown
                      size={14}
                      style={{
                        marginLeft: 2,
                        transition: "transform 0.2s",
                        transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0)",
                      }}
                    />
                  </button>
                  <div
                    className={styles.megaDropdown}
                    style={{
                      opacity: openDropdown === item.label ? 1 : 0,
                      visibility: openDropdown === item.label ? "visible" : "hidden",
                      transform: openDropdown === item.label ? "translateY(0)" : "translateY(-8px)",
                    }}
                  >
                    {item.children.map((child, idx) => (
                      <React.Fragment key={child.href}>
                        {item.separator?.includes(idx - 1) && (
                          <div style={{ height: 1, background: "rgba(30,45,74,0.08)", margin: "0.35rem 0" }} />
                        )}
                        <Link href={child.href} className={styles.megaItem}>
                          <span className={styles.megaIcon}>{child.icon}</span>
                          <div>
                            <span className={styles.megaLabel}>{child.label}</span>
                            <span className={styles.megaDesc}>{child.desc}</span>
                          </div>
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Desktop right: auth + CTA */}
          <div className={styles.desktopActions}>
            {authHref && status !== "loading" && (
              <Link href={authHref} className={styles.btnOutline}>
                {userName ? `${userName}` : authLabel}
              </Link>
            )}
            <Link href="/examenes" className={styles.btnCta}>
              Simulacro gratis
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
    </header>

    {/* ═══ Mobile overlay — OUTSIDE header to avoid backdrop-filter stacking context ═══ */}
    <div
      className={`${styles.overlay}${menuOpen ? ` ${styles.overlayOpen}` : ""}`}
      aria-hidden={!menuOpen}
    >
      <nav className={styles.overlayInner} aria-label="Navegación móvil">
        <ul className={styles.mobileList}>
          {menuItems.map((item) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link href={item.href!} className={styles.mobileLink} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = mobileAccordion === item.label;
            return (
              <li key={item.label}>
                <button
                  className={styles.mobileLink}
                  onClick={() => setMobileAccordion(isOpen ? null : item.label)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  {item.label}
                  <FiChevronDown
                    size={18}
                    style={{
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                      opacity: 0.5,
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 600 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <div style={{ padding: "0.25rem 0 0.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    {item.children.map((child, idx) => (
                      <React.Fragment key={child.href}>
                        {item.separator?.includes(idx - 1) && (
                          <div style={{ height: 1, background: "rgba(30,45,74,0.08)", margin: "0.35rem 0" }} />
                        )}
                        <Link
                          href={child.href}
                          onClick={closeMenu}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            padding: "0.6rem 0.5rem",
                            textDecoration: "none",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{child.icon}</span>
                          <div>
                            <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 600, color: "#1e2d4a" }}>
                              {child.label}
                            </span>
                            <span style={{ display: "block", fontSize: "0.75rem", color: "#5f6b78", marginTop: 1 }}>
                              {child.desc}
                            </span>
                          </div>
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.mobileCtas}>
          {authHref && status !== "loading" && (
            <Link href={authHref} className={styles.btnOutline} onClick={closeMenu}>
              {userName || authLabel}
            </Link>
          )}
          <Link href="/examenes" className={styles.btnCta} onClick={closeMenu}>
            Simulacro gratis
          </Link>
        </div>
      </nav>
    </div>
    </>
  );
};

export default Header;
