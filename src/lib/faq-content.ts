export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  source: "legacy" | "current";
};

// Base adaptada desde la web historica publicada + operativa actual online.
export const faqItems: FaqItem[] = [
  {
    id: "faq-preparador",
    question: "La academia HolaBonjour es centro preparador DELF/DALF?",
    answer:
      "Si. Nuestro equipo tiene formacion y experiencia para preparar candidatos a examenes oficiales DELF/DALF.",
    source: "legacy",
  },
  {
    id: "faq-matricula",
    question: "Puedo matricularme del DELF/DALF directamente en HolaBonjour?",
    answer:
      "Te asesoramos y te damos todas las herramientas, pero la matricula oficial se realiza en centros examinadores como la Alianza Francesa.",
    source: "legacy",
  },
  {
    id: "faq-tiempo-b1-b2",
    question: "Cuanto tiempo necesito para llegar a B1 o B2?",
    answer:
      "Como referencia historica de la academia, cada nivel requiere horas de trabajo sostenido. El plan exacto depende de tu punto de partida y ritmo.",
    source: "legacy",
  },
  {
    id: "faq-ruta",
    question: "Puedo estudiar sin presentarme a examen oficial?",
    answer:
      "Si. Puedes elegir ruta de conversacion para mantener y mejorar nivel sin objetivo de certificacion inmediata.",
    source: "legacy",
  },
  {
    id: "faq-pack",
    question: "Que pack ofrecemos ahora?",
    answer:
      "Pack 4 horas A1-B2: 140EUR. Pack 4 horas C1-C2: 200EUR. Modalidad online por Zoom.",
    source: "current",
  },
  {
    id: "faq-pago",
    question: "Como se confirma el pago ahora?",
    answer:
      "Actualmente por transferencia bancaria a HBTJ Consultores Linguisticos S.L. Bizum y tarjeta quedan en stand by.",
    source: "current",
  },
  {
    id: "faq-respuesta",
    question: "Cuanto tardais en responder y activar clases?",
    answer:
      "Respondemos en menos de 24h laborables con ruta recomendada, propuesta de agenda y siguientes pasos.",
    source: "current",
  },
];
