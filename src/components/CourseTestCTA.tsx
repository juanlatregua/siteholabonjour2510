// components/CourseTestCTA.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CourseTestCTA = () => {
  return (
    <section className="bg-blue-100 p-6 rounded-lg flex items-center justify-between my-8">
      <div className="flex items-center space-x-4">
        {/* Icono o imagen representativa */}
        <Image 
          src="/images/french-course-icon.svg" 
          alt="Contrata tu curso de francés"
          width={64}
          height={64}
        />
        <div>
          <h2 className="text-xl font-bold text-blue-800">
            Contrata tu curso de francés
          </h2>
          <p className="text-blue-700">
            ¿No sabes tu nivel? Realiza nuestra prueba rápida de ejercicios y descubre el curso ideal para ti.
          </p>
        </div>
      </div>
      <Link href="/test-de-nivel">
        <a className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ¡Realiza la prueba!
        </a>
      </Link>
    </section>
  );
};

export default CourseTestCTA;
