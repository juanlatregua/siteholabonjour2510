import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const navLinks = [
  { href: "/cursos", label: "Cursos" },
  { href: "/le-voyage", label: "Le Voyage" },
  { href: "/le-cote-vie", label: "Le Cote Vie" },
  { href: "/recursos", label: "Recursos" },
  { href: "/tarifas", label: "Tarifs" },
  { href: "/contacto", label: "Contact" },
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
              Academie en ligne de francais / Academia online de frances: clases en directo con profesores nativos.
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
            <p className={styles.text}>WhatsApp: +34 685 07 03 04</p>
            <p className={styles.text}>Email: info@holabonjour.es</p>
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
          <p>&copy; 2026 HolaBonjour &middot; HBTJ Consultores Linguisticos S.L. &middot; Malaga</p>
          <p className={styles.synergy}>
            Sinergia / Traductions juridiques:{" "}
            <a href="https://traduccionesjuradas.net" target="_blank" rel="noreferrer">traduccionesjuradas.net</a>
            {" "}&middot;{" "}
            <a href="https://traductorjurado.es" target="_blank" rel="noreferrer">traductorjurado.es</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
