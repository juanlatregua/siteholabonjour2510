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
    name: "Iniciación",
    levels: "A1 – A2",
    price: 140,
    hours: 4,
    features: [
      "4 horas de clase en directo",
      "Grupos reducidos (máx. 6)",
      "Material didáctico incluido",
      "Acceso a Le Côté Vie",
      "Seguimiento del profesor",
      "Certificado de asistencia",
    ],
  },
  {
    name: "Intermedio",
    levels: "B1 – B2",
    price: 140,
    hours: 4,
    popular: true,
    features: [
      "4 horas de clase en directo",
      "Grupos reducidos (máx. 6)",
      "Simulacros de examen DELF",
      "Material didáctico incluido",
      "Acceso a Le Côté Vie",
      "Plan de estudio personalizado",
      "Seguimiento del profesor",
    ],
  },
  {
    name: "Avanzado",
    levels: "C1 – C2",
    price: 200,
    hours: 4,
    features: [
      "4 horas de clase en directo",
      "Grupos reducidos (máx. 4)",
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
      "Las clases se imparten en directo por videoconferencia con profesores nativos franceses. Cada sesión es interactiva con ejercicios prácticos, simulacros de examen y correcciones en tiempo real.",
  },
  {
    question: "¿Qué incluye el pack?",
    answer:
      "Cada pack incluye las horas de clase indicadas, material didáctico digital, acceso a la plataforma Le Côté Vie, seguimiento personalizado del profesor y certificado de asistencia.",
  },
  {
    question: "¿Puedo cambiar de nivel?",
    answer:
      "Sí. Si durante las clases el profesor considera que tu nivel es diferente al estimado, te reubicamos sin coste adicional.",
  },
  {
    question: "¿Cuándo puedo empezar?",
    answer:
      "Los grupos se abren de forma continua. Una vez contratado el pack, te asignamos al próximo grupo disponible para tu nivel.",
  },
  {
    question: "¿Qué necesito para las clases?",
    answer:
      "Solo necesitas un ordenador o tablet con conexión a internet, micrófono y cámara. Usamos plataformas de videoconferencia estándar.",
  },
  {
    question: "¿Ofrecéis clases particulares?",
    answer:
      "Sí, además de los grupos reducidos, ofrecemos clases particulares con horarios flexibles. Contacta con nosotros para tarifas personalizadas.",
  },
];
