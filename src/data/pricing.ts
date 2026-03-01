export interface PricingTier {
  name: string;
  levels: string;
  price: number;
  hours: number;
  features: string[];
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Initiation",
    levels: "A1 – A2",
    price: 140,
    hours: 4,
    features: [
      "4 horas de clase en directo",
      "Clases individuales 1-to-1 por Zoom",
      "Material didáctico incluido",
      "Acceso a Le Côté Vie",
      "Seguimiento del profesor",
      "Certificado de asistencia",
    ],
  },
  {
    name: "Intermédiaire",
    levels: "B1 – B2",
    price: 140,
    hours: 4,
    popular: true,
    features: [
      "4 horas de clase en directo",
      "Clases individuales 1-to-1 por Zoom",
      "Simulacros de examen DELF",
      "Material didáctico incluido",
      "Acceso a Le Côté Vie",
      "Plan de estudio personalizado",
      "Seguimiento del profesor",
    ],
  },
  {
    name: "Avancé",
    levels: "C1 – C2",
    price: 200,
    hours: 4,
    features: [
      "4 horas de clase en directo",
      "Clases individuales 1-to-1 por Zoom",
      "Simulacros de examen DALF",
      "Corrección detallada de producciones",
      "Material avanzado incluido",
      "Acceso a Le Côté Vie",
      "Plan de estudio personalizado",
      "Seguimiento intensivo del profesor",
    ],
  },
];

export const faqItems = [
  {
    question: "¿Cómo funcionan las clases online?",
    answer:
      "Las clases son individuales (1-to-1) de 1 hora por Zoom con profesores nativos franceses. Cada sesión es interactiva con ejercicios prácticos, simulacros de examen y correcciones en tiempo real.",
  },
  {
    question: "¿Qué incluye el pack?",
    answer:
      "Cada pack incluye las horas de clase indicadas, material didáctico digital, acceso a la plataforma Le Côté Vie, seguimiento personalizado del profesor y certificado de asistencia.",
  },
  {
    question: "¿Puedo cambiar de nivel?",
    answer:
      "Sí. Si durante las clases el profesor considera que tu nivel es diferente al estimado, ajustamos el contenido sin coste adicional.",
  },
  {
    question: "¿Cuándo puedo empezar?",
    answer:
      "Puedes empezar en cualquier momento. Una vez contratado el pack, coordinamos los horarios de tus clases individuales.",
  },
  {
    question: "¿Qué necesito para las clases?",
    answer:
      "Solo necesitas un ordenador o tablet con conexión a internet, micrófono y cámara. Todas las clases se imparten por Zoom.",
  },
  {
    question: "¿Cómo son las clases?",
    answer:
      "Todas nuestras clases son individuales (1-to-1) de 1 hora por Zoom con profesores nativos franceses. Horarios flexibles adaptados a tu disponibilidad.",
  },
];
