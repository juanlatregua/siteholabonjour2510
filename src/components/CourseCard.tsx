// src/components/CourseCard.tsx
import React from 'react';

type CourseCardProps = {
  title: string;
  description: string;
};

const CourseCard = ({ title, description }: CourseCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
      <button className="mt-4 bg-[#0055A4] text-white py-2 px-4 rounded-lg">
        Más información
      </button>
    </div>
  );
}

export default CourseCard;
