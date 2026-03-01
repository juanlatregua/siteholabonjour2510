import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const navLinks = [
  { href: "/cursos", label: "Cursos" },
  { href: "/test-de-nivel", label: "Test de nivel" },
  { href: "/le-marche", label: "Le Côté Vie" },
  { href: "/recursos", label: "Recursos" },
  { href: "/tarifas", label: "Tarifs" },
  { href: "/contacto", label: "Contact" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/empresas", label: "Empresas" },
];

const vieCultureLinks = [
  { href: "/le-marche", label: "Le Marche" },
  { href: "/la-carte", label: "La Carte" },
  { href: "/le-cinema", label: "Le Cinema" },
  { href: "/la-cuisine", label: "La Cuisine" },
  { href: "/le-mot-du-jour", label: "Le Mot du Jour" },
  { href: "/le-jeu", label: "Le Jeu" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/holabonjourmalaga/",
    icon: "/images/icons-facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://twitter.com/Holabonjour_mlg",
    icon: "/images/icons-x.svg",
    label: "X",
  },
  {
    href: "https://www.instagram.com/holabonjourmalaga/",
    icon: "/images/icons-instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/channel/UCSqK90F1Tm9iYLpZN0tFIGg",
    icon: "/images/icons-youtube.svg",
    label: "YouTube",
  },
];

const trustSignals = ["Methode immersive", "Examens DELF/DALF", "Professeurs natifs", "Cours en direct"];

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
              Académie en ligne de français / Academia online de francés: clases en directo con profesores nativos.
            </p>
            <ul className={styles.trustList}>
              {trustSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Column 2: Navigation */}
          <section>
            <p className={styles.sectionTitle}>Navigation</p>
            <ul className={styles.linkList}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 3: Ecosysteme culturel */}
          <section>
            <p className={styles.sectionTitle}>Ecosysteme culturel</p>
            <ul className={styles.linkList}>
              {vieCultureLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 4: Contact + social */}
          <section>
            <p className={styles.sectionTitle}>Contact</p>
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
            <div className={styles.social}>
              {socialLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <Image src={item.icon} alt={item.label} width={32} height={32} />
                </a>
              ))}
            </div>
          </section>
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
