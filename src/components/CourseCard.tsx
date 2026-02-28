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
      <button className="mt-4 bg-[#0f5da0] hover:bg-[#0e4f8d] text-white py-2 px-4 rounded-lg transition-colors">
        Más información
      </button>
    </div>
  );
}

export default CourseCard;
