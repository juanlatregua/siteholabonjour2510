// components/LevelTestCTA.tsx
import React from 'react';
import Link from 'next/link';
import styles from './LevelTestCTA.module.css';

interface Level {
  label: string;
  url: string;
}

const levels: Level[] = [
  { label: 'A1', url: '/test?level=A1' },
  { label: 'A2', url: '/test?level=A2' },
  { label: 'B1', url: '/test?level=B1' },
  { label: 'B2', url: '/test?level=B2' },
  // Puedes agregar más niveles si es necesario.
];

const LevelTestCTA = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Elige tu nivel de francés</h2>
	  <div className={styles.levels}>
  		{levels.map((level) => (
    		<Link key={level.label} href={level.url} className={styles.levelButton}>
      		{level.label}
    		</Link>
  		))}
		</div>   
    </section>
  );
};

export default LevelTestCTA;
