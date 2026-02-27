import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#isabelle", label: "Isabelle" },
  { href: "/prueba-nivel", label: "Prueba de nivel" },
  { href: "/preparacion-delf-dalf", label: "Preparacion y conversacion" },
  { href: "/contratar", label: "Contratar pack" },
  { href: "/zona-alumno", label: "Zona alumno" },
  { href: "/contact", label: "Contacto" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/holabonjourmalaga/",
    icon: "/images/icons-facbook.svg",
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

const trustSignals = [
  "Isabelle Guitton: directora academica y docente",
  "Proyecto docente activo desde 2017",
  "Zoom + entorno de aprendizaje digital personalizado",
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <section>
            <p className={styles.brand}>HolaBonjour</p>
            <p className={styles.text}>
              Direccion academica de Isabelle Guitton. Nacimos como academia fisica en Malaga y hoy
              trabajamos 100% online con seguimiento individual y plan por objetivo.
            </p>
            <ul className={styles.trustList}>
              {trustSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className={styles.sectionTitle}>Navegacion</p>
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
            <p className={styles.text}>Telefono / WhatsApp: 685 07 03 04</p>
            <p className={styles.text}>Email: info@holabonjour.es</p>
            <p className={styles.text}>A1-B2: pack 4 horas por 140€</p>
            <p className={styles.text}>C1-C2: pack 4 horas por 200€</p>
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
          <p>© {new Date().getFullYear()} HolaBonjour.</p>
          <p>Preparacion online por Zoom: ruta examen o ruta conversacion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
