// src/app/home/page.tsx
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a HolaBonjour</h1>
      <p className="text-lg text-center mb-6">Tu plataforma para aprender francés de forma fácil y divertida.</p>

      <div className="flex justify-center">
        <Link href="/courses">
          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 px-6 rounded-lg transition-colors">
            Ver cursos
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
