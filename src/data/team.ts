export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  bioLong: string;
  credentials: string[];
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: "Isabelle Guitton",
    role: "Directora pedagógica y profesora",
    bio: "Profesora nativa francesa con más de 15 años de experiencia en la enseñanza del francés como lengua extranjera. Especialista en preparación de exámenes DELF y DALF.",
    bioLong:
      "Nacida en Francia, Isabelle cuenta con una sólida formación universitaria: Licenciatura en Empresariales (Lyon 3, 1998), Licenciatura en Traducción (Lyon 3, 2000), Máster en Comercio Exterior (Lyon 3, 2002) y, más recientemente, un Máster en Economía Circular y Desarrollo Sostenible (Universidad Internacional de Valencia, 2024). Es examinadora oficial habilitada por France Éducation International para los exámenes DELF y DALF, lo que le permite preparar a sus alumnos con un conocimiento directo de los criterios de evaluación y las expectativas de los examinadores. Además de su labor docente, Isabelle forma a otros profesores de FLE y ha diseñado la metodología pedagógica de HolaBonjour, donde combina rigor académico con inmersión cultural a través del cine, la gastronomía y la actualidad francesa.",
    credentials: [
      "Máster Economía Circular y Desarrollo Sostenible (VIU, 2024)",
      "Máster Comercio Exterior (Lyon 3)",
      "Licenciada en Traducción (Lyon 3)",
      "Examinadora oficial DELF/DALF",
      "Formadora de profesores FLE",
      "15+ años de experiencia",
    ],
    image: "/images/isabelle-guitton.jpg",
  },
  {
    name: "Juan Silva",
    role: "Director técnico y cofundador",
    bio: "Traductor e intérprete jurado de francés con experiencia en tecnología educativa. Responsable de la plataforma digital y la metodología online.",
    bioLong:
      "Juan es traductor-intérprete jurado de francés nombrado por el Ministerio de Asuntos Exteriores de España. Con un Máster en Traducción e Interpretación y experiencia en desarrollo web, ha creado la plataforma tecnológica de HolaBonjour: desde el test de nivel interactivo y los simulacros de examen con corrección por IA, hasta el portal del alumno y la integración de herramientas de seguimiento pedagógico. Dirige también traduccionesjuradas.net, referencia en traducción jurada de francés en España.",
    credentials: [
      "Traductor-Intérprete Jurado FR-ES",
      "Máster en Traducción",
      "Desarrollador full-stack",
    ],
  },
];
