import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const examenesLinks = [
  { href: "/examenes/a2/1", label: "DELF A2" },
  { href: "/examenes/b1/1", label: "DELF B1" },
  { href: "/examenes/b2/1", label: "DELF B2" },
  { href: "/examenes/c1/1", label: "DALF C1" },
  { href: "/examenes/c2/1", label: "DALF C2" },
  { href: "/calendario-examenes", label: "Calendario de exámenes" },
];

const preparacionLinks = [
  { href: "/contratar", label: "Clases con Isabelle" },
  { href: "/preparacion-delf-dalf", label: "Guías por nivel" },
  { href: "/correccion-ia", label: "Corrección IA" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/empresas", label: "Empresas" },
];

const hbLinks = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/recursos/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
  { href: "/colabora", label: "Colabora con nosotros" },
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand */}
          <section>
            <p className={styles.brand}>
              Hola<span className={styles.brandAccent}>Bonjour</span>
            </p>
            <p className={styles.tagline}>L&apos;aventure commence ici</p>
            <p className={styles.text}>
              Academia online de francés con profesoras nativas.
              Preparación DELF/DALF, clases individuales por Zoom
              y corrección IA con rúbricas oficiales.
            </p>
            <div className={styles.contact}>
              <a href="https://wa.me/34685070304?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20los%20cursos." target="_blank" rel="noreferrer">
                WhatsApp: +34 685 070 304
              </a>
              <a href="mailto:info@holabonjour.es">
                info@holabonjour.es
              </a>
            </div>
          </section>

          {/* Column 2: Exámenes */}
          <section>
            <p className={styles.sectionTitle}>Exámenes</p>
            <ul className={styles.linkList}>
              {examenesLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 3: Preparación */}
          <section>
            <p className={styles.sectionTitle}>Preparación</p>
            <ul className={styles.linkList}>
              {preparacionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 4: HolaBonjour */}
          <section>
            <p className={styles.sectionTitle}>HolaBonjour</p>
            <ul className={styles.linkList}>
              {hbLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
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

        <div className={styles.bottom}>
          <p>&copy; 2026 HolaBonjour &middot; HBTJ Consultores Lingüísticos S.L. &middot; Málaga</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
