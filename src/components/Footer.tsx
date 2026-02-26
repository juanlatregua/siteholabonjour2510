// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // opcional
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          <span>HolaBonjour</span> | Tel: 685070304<br />
          info@holabonjour.es | www.holabonjour.es
        </p>
        <p>
          <Link href="/aviso-legal">Aviso Legal</Link> |{' '}
          <Link href="/politica-de-privacidad">Política de Privacidad</Link>
        </p>
      </div>
      <div className={styles.social}>
        <a href="https://www.facebook.com/holabonjourmalaga/" target="_blank" rel="noreferrer">
          <Image src="/images/icons-facbook.svg" alt="Facebook" width={45} height={45} />
        </a>
        <a href="https://twitter.com/Holabonjour_mlg" target="_blank" rel="noreferrer">
          <Image src="/images/icons-x.svg" alt="Twitter" width={45} height={45} />
        </a>
        <a href="https://www.instagram.com/holabonjourmalaga/" target="_blank" rel="noreferrer">
          <Image src="/images/icons-instagram.svg" alt="Instagram" width={45} height={45} />
        </a>
        <a href="https://www.youtube.com/channel/UCSqK90F1Tm9iYLpZN0tFIGg" target="_blank" rel="noreferrer">
          <Image src="/images/icons-youtube.svg" alt="YouTube" width={45} height={45} />
        </a>
		<a href="https://www.zoom.com/" target="_blank" rel="noreferrer">
          <Image src="/images/icons-zoom.svg" alt="YouTube" width={45} height={45} />
        </a>
      </div>
      <div className={styles.copyright}>
        <p>
          © 2018 Academia Hola Bonjour |{' '}
       
        </p>
      </div>
    </footer>
  );
};

export default Footer;
