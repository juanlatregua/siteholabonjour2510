import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const navLinks = [
  { href: "/examenes", label: "Exámenes DELF/DALF" },
  { href: "/calendario-examenes", label: "Calendario de exámenes" },
  { href: "/correccion-ia", label: "Corrección IA" },
  { href: "/preparacion-delf-dalf", label: "Preparación DELF/DALF" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/iniciar-sesion", label: "Acceder" },
  { href: "/unirse", label: "¿Eres profesor?" },
];

const vieCultureLinks = [
  { href: "/le-marche", label: "Contenido cultural →" },
];

const trustSignals = ["Método inmersivo", "Exámenes DELF/DALF", "Profesoras nativas", "Clases en directo"];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand + tagline + trust signals */}
          <section>
            <p className={styles.brand}>
              Hola<span className={styles.brandAccent}>Bonjour</span>
            </p>
            <p className={styles.tagline}>L&apos;aventure commence ici</p>
            <p className={styles.text}>
              Academia online de francés: clases en directo con profesoras nativas.
            </p>
            <ul className={styles.trustList}>
              {trustSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Column 2: Navigation */}
          <section>
            <p className={styles.sectionTitle}>Navegación</p>
            <ul className={styles.linkList}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 3: Ecosystème culturel */}
          <section>
            <p className={styles.sectionTitle}>Le Côté Vie</p>
            <ul className={styles.linkList}>
              {vieCultureLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 4: Contact */}
          <section>
            <p className={styles.sectionTitle}>Contacto</p>
            <p className={styles.text}>
              <a href="https://wa.me/34685070304?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20los%20cursos." target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                WhatsApp: +34 685 070 304
              </a>
            </p>
            <p className={styles.text}>
              <a href="mailto:hola@holabonjour.es" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                hola@holabonjour.es
              </a>
            </p>
            <p className={styles.text} style={{ marginTop: "0.6rem" }}>
              <Link href="/recursos/blog" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Blog
              </Link>
            </p>
          </section>
        </div>

        <div className={styles.ecosystem}>
          <div>
            <p className={styles.ecosystemTitle}>Ecosistema HBTJ</p>
            <p className={styles.ecosystemLinks}>
              <a href="https://www.traduccionesjuradas.net" target="_blank" rel="noreferrer">
                traduccionesjuradas.net
              </a>{" "}
              &mdash; Traducciones juradas de francés
            </p>
          </div>
        </div>

        <div className={styles.legalLinks}>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/politica-de-privacidad">Privacidad</Link>
          <Link href="/politica-de-cookies">Cookies</Link>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 HolaBonjour &middot; Academia online de francés &middot; Málaga</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
