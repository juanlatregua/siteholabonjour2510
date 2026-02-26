'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Test = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Aprende francés sin desplazarte
      </h1>
      <p className="text-center mb-6 text-lg">
        Todos nuestros cursos son <strong>100% online</strong> por Zoom, con
        profesorado nativo y horarios flexibles.
      </p>

      <div className="flex justify-center mb-10">
        <Image
          src="/images/conocenos2020.jpg"
          alt="Profesorado nativo de francés en Málaga"
		  width={800}
		  height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Haz el test de nivel</h2>
      <p className="mb-4">
        Responde a unas preguntas rápidas y te indicaremos el curso ideal para
        ti. ¡Es gratuito!
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        placeholder="Escríbenos si tienes dudas o quieres que te contactemos"
        rows={4}
      />

      <button className="bg-[#0055A4] text-white px-6 py-2 rounded hover:bg-[#003b7a] transition">
        Enviar
      </button>
    </div>
  );
};

export default Test;


