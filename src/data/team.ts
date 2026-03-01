export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
}

export const team: TeamMember[] = [
  {
    name: "Isabelle Guitton",
    role: "Directora pedagógica y profesora",
    bio: "Profesora nativa francesa con más de 15 años de experiencia en la enseñanza del francés como lengua extranjera. Especialista en preparación de exámenes DELF y DALF.",
    credentials: [
      "Licenciada en Letras Modernas",
      "Examinadora DELF/DALF",
      "Formadora FLE",
    ],
  },
  {
    name: "Juan Silva",
    role: "Director técnico y cofundador",
    bio: "Traductor e intérprete jurado de francés con experiencia en tecnología educativa. Responsable de la plataforma digital y la metodología online.",
    credentials: [
      "Traductor-Intérprete Jurado",
      "Máster en Traducción",
      "Desarrollador web",
    ],
  },
];
