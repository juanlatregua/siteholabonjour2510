import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/test-de-nivel", label: "Test de nivel" },
  { href: "/cursos", label: "Cursos" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
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

const trustSignals = ["Método inmersivo", "Exámenes DELF/DALF", "Profesores nativos", "Clases en directo"];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <section>
            <p className={styles.brand}>HolaBonjour</p>
            <p className={styles.text}>
              Academia online de francés: clases en directo con profesores nativos, preparación de
              exámenes DELF/DALF y método inmersivo.
            </p>
            <ul className={styles.trustList}>
              {trustSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className={styles.sectionTitle}>Navegación</p>
            <ul className={styles.linkList}>
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className={styles.sectionTitle}>Contacto y tarifas</p>
            <p className={styles.text}>Teléfono / WhatsApp: 685 07 03 04</p>
            <p className={styles.text}>Email: info@holabonjour.es</p>
            <p className={styles.text}>A1-B2: pack 4 horas por 140EUR</p>
            <p className={styles.text}>C1-C2: pack 4 horas por 200EUR</p>
            <p className={styles.text}>Pago activo: transferencia bancaria</p>
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
          <p>&copy; {new Date().getFullYear()} HolaBonjour.</p>
          <p>Aprende francés. Vive en francés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
