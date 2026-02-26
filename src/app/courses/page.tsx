// src/app/courses/page.tsx
import React from 'react';
import CourseCard from '../../components/CourseCard';

const Courses = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Cursos de Francés</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Aquí irían las tarjetas de los cursos */}
        <CourseCard title="Curso Básico de Francés" description="Aprende los fundamentos del francés." />
        <CourseCard title="Curso Intermedio de Francés" description="Amplía tu vocabulario y comprensión." />
        <CourseCard title="Curso Avanzado de Francés" description="Para perfeccionar tu nivel de francés." />
      </div>
    </div>
  );
}

export default Courses;
