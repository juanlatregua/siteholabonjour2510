// components/SocialIcons.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SocialIcons.module.css'; // Opcional, si deseas usar CSS Modules

const SocialIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <Link href="https://www.facebook.com/holabonjourmalaga/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/images/icons-facbook.svg" alt="Facebook" width={45} height={45} />
        </a>
      </Link>
      <Link href="https://twitter.com/Holabonjour_mlg" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/images/icons-x.svg" alt="Twitter" width={45} height={45} />
        </a>
      </Link>
      <Link href="https://www.instagram.com/holabonjourmalaga/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/images/icons-instagram.svg" alt="Instagram" width={45} height={45} />
        </a>
      </Link>
      <Link href="https://www.youtube.com/channel/UCSqK90F1Tm9iYLpZN0tFIGg" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/images/icons-youtube.svg" alt="YouTube" width={45} height={45} />
        </a>
      </Link>
      <Link href="https://www.zoom.com/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/images/icons-zoom.svg" alt="Zoom" width={45} height={45} />
        </a>
      </Link>
    </div>
  );
};

export default SocialIcons;
