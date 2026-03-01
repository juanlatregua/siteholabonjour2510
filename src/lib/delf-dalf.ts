export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type ExamFamily = "DELF" | "DALF";

export interface TrainingTrack {
  level: CEFRLevel;
  exam: string;
  mode: string;
  weeklyLoad: string;
  focus: string[];
  outcome: string;
}

export interface PlacementOption {
  id: string;
  label: string;
  score: number;
}

export interface PlacementQuestion {
  id: string;
  skill: string;
  prompt: string;
  officialReference: string;
  options: PlacementOption[];
}

export interface PlacementResult {
  score: number;
  maxScore: number;
  estimatedLevel: CEFRLevel;
  examFamily: ExamFamily;
  recommendation: TrainingTrack;
}

export interface ExamWindow {
  period: string;
  note: string;
}

export const trainingTracks: Record<CEFRLevel, TrainingTrack> = {
  A1: {
    level: "A1",
    exam: "DELF A1",
    mode: "Clases individuales online por Zoom",
    weeklyLoad: "2 sesiones/semana + práctica guiada",
    focus: ["Comprensión oral básica", "Presentación personal", "Producción escrita corta"],
    outcome: "Llegar a una comunicación inicial funcional para trámites básicos.",
  },
  A2: {
    level: "A2",
    exam: "DELF A2",
    mode: "Online en directo + simulacros",
    weeklyLoad: "2-3 sesiones/semana",
    focus: ["Interacción cotidiana", "Correos y mensajes formales simples", "Comprensión de instrucciones"],
    outcome: "Consolidar autonomía en contextos cotidianos y administrativos.",
  },
  B1: {
    level: "B1",
    exam: "DELF B1",
    mode: "Preparación orientada a prueba oficial",
    weeklyLoad: "3 sesiones/semana + corrección escrita",
    focus: ["Argumentación breve", "Comprensión de noticias", "Presentación oral estructurada"],
    outcome: "Superar umbral intermedio para estudio y trabajo en entorno francófono.",
  },
  B2: {
    level: "B2",
    exam: "DELF B2",
    mode: "Entrenamiento intensivo por competencias",
    weeklyLoad: "3 sesiones/semana + simulacro mensual",
    focus: ["Debate y defensa de opinión", "Síntesis escrita", "Comprensión de documentos complejos"],
    outcome: "Demostrar competencia independiente avanzada y argumentación sólida.",
  },
  C1: {
    level: "C1",
    exam: "DALF C1",
    mode: "Mentoría experta + simulaciones",
    weeklyLoad: "3 sesiones/semana + práctica autónoma",
    focus: ["Síntesis de múltiples fuentes", "Producción oral formal", "Precisión léxica"],
    outcome: "Acreditar dominio operativo avanzado para contextos académicos/profesionales.",
  },
  C2: {
    level: "C2",
    exam: "DALF C2",
    mode: "Preparación premium individualizada",
    weeklyLoad: "Plan flexible según objetivo",
    focus: ["Argumentación experta", "Mediación avanzada", "Control discursivo de alto nivel"],
    outcome: "Demostrar dominio pleno del idioma en situaciones complejas.",
  },
};

export const officialExamWindows: ExamWindow[] = [
  {
    period: "Convocatoria junio 2026 (Alianza Francesa Malaga)",
    note:
      "Matricula: del 12 al 22 de mayo. Prueba oral: del 22 al 25 de junio. Prueba escrita: viernes 26 de junio. Resultados: del 15 al 17 de julio.",
  },
  {
    period: "Convocatoria octubre 2026 (Alianza Francesa Malaga)",
    note:
      "Matricula: del 14 al 24 de septiembre. Prueba oral: del 5 al 8 de octubre. Prueba escrita: viernes 9 de octubre. Resultados: del 26 al 28 de octubre.",
  },
  {
    period: "Fuente oficial del calendario",
    note:
      "Alianza Francesa Malaga (PDF Calendario DELF/DALF 2026). Confirmar siempre actualizaciones del centro examinador.",
  },
];

export const placementQuestions: PlacementQuestion[] = [
  {
    id: "q1",
    skill: "Comprensión escrita",
    prompt: "Entiendes un email corto con instrucciones para una cita administrativa en Francia.",
    officialReference: "Modelos DELF A1-A2 (compréhension écrite)",
    options: [
      { id: "q1o1", label: "Solo capto palabras sueltas", score: 0 },
      { id: "q1o2", label: "Entiendo la idea general", score: 1 },
      { id: "q1o3", label: "Entiendo casi todo con contexto", score: 2 },
      { id: "q1o4", label: "Entiendo todo con precisión", score: 3 },
    ],
  },
  {
    id: "q2",
    skill: "Gramática aplicada",
    prompt: "Puedes usar correctamente pasado (passé composé/imparfait) en una narración breve.",
    officialReference: "Descriptores CEFR B1",
    options: [
      { id: "q2o1", label: "Aún no, me cuesta construir frases", score: 0 },
      { id: "q2o2", label: "Lo intento, pero con bastantes errores", score: 1 },
      { id: "q2o3", label: "Lo manejo en textos simples", score: 2 },
      { id: "q2o4", label: "Lo uso con seguridad en textos complejos", score: 3 },
    ],
  },
  {
    id: "q3",
    skill: "Comprensión oral",
    prompt: "Comprendes una entrevista de radio sobre vida laboral sin subtítulos.",
    officialReference: "Modelos DELF B1-B2 (compréhension orale)",
    options: [
      { id: "q3o1", label: "No, salvo palabras aisladas", score: 0 },
      { id: "q3o2", label: "Sí, si hablan lento y claro", score: 1 },
      { id: "q3o3", label: "Sí, entiendo ideas y detalles principales", score: 2 },
      { id: "q3o4", label: "Sí, incluso matices y opiniones implícitas", score: 3 },
    ],
  },
  {
    id: "q4",
    skill: "Producción escrita",
    prompt: "Puedes redactar un texto argumentativo de 220-250 palabras con estructura clara.",
    officialReference: "Requisitos DELF B2 / DALF C1",
    options: [
      { id: "q4o1", label: "No, solo textos muy cortos", score: 0 },
      { id: "q4o2", label: "Sí, con ayuda de plantillas", score: 1 },
      { id: "q4o3", label: "Sí, con coherencia y algunos errores", score: 2 },
      { id: "q4o4", label: "Sí, con argumentos sólidos y buen registro", score: 3 },
    ],
  },
  {
    id: "q5",
    skill: "Interacción oral",
    prompt: "En una entrevista oral, puedes defender una posición y responder objeciones.",
    officialReference: "Épreuve orale DELF B2 / DALF",
    options: [
      { id: "q5o1", label: "Todavía no", score: 0 },
      { id: "q5o2", label: "Solo con frases preparadas", score: 1 },
      { id: "q5o3", label: "Sí, en temas conocidos", score: 2 },
      { id: "q5o4", label: "Sí, con fluidez y estructura", score: 3 },
    ],
  },
  {
    id: "q6",
    skill: "Léxico y precisión",
    prompt: "Adaptas el registro (formal/informal) según la situación escrita u oral.",
    officialReference: "Descriptores CEFR B2-C1",
    options: [
      { id: "q6o1", label: "Aún no", score: 0 },
      { id: "q6o2", label: "A veces, con dudas", score: 1 },
      { id: "q6o3", label: "Sí, en la mayoría de casos", score: 2 },
      { id: "q6o4", label: "Sí, con control avanzado", score: 3 },
    ],
  },
  {
    id: "q7",
    skill: "Comprensión compleja",
    prompt: "Puedes resumir y comparar dos textos largos con posturas distintas.",
    officialReference: "DALF C1-C2",
    options: [
      { id: "q7o1", label: "No todavía", score: 0 },
      { id: "q7o2", label: "Con mucha ayuda", score: 1 },
      { id: "q7o3", label: "Sí, en textos moderadamente complejos", score: 2 },
      { id: "q7o4", label: "Sí, también en textos técnicos", score: 3 },
    ],
  },
  {
    id: "q8",
    skill: "Autonomía de examen",
    prompt: "Has hecho simulacros completos con tiempos oficiales y estrategia por prueba.",
    officialReference: "Formato oficial DELF/DALF",
    options: [
      { id: "q8o1", label: "No", score: 0 },
      { id: "q8o2", label: "Solo parcial", score: 1 },
      { id: "q8o3", label: "Sí, varios simulacros", score: 2 },
      { id: "q8o4", label: "Sí, con revisión técnica posterior", score: 3 },
    ],
  },
];

const levelThresholds: Array<{ max: number; level: CEFRLevel }> = [
  { max: 5, level: "A1" },
  { max: 9, level: "A2" },
  { max: 14, level: "B1" },
  { max: 19, level: "B2" },
  { max: 24, level: "C1" },
  { max: Number.POSITIVE_INFINITY, level: "C2" },
];

const getLevelFromScore = (score: number): CEFRLevel => {
  return levelThresholds.find((entry) => score <= entry.max)?.level ?? "A1";
};

const getExamFamily = (level: CEFRLevel): ExamFamily => {
  return level === "C1" || level === "C2" ? "DALF" : "DELF";
};

export const evaluatePlacement = (answers: Record<string, number>): PlacementResult => {
  const score = placementQuestions.reduce((total, question) => total + (answers[question.id] ?? 0), 0);
  const maxScore = placementQuestions.length * 3;
  const estimatedLevel = getLevelFromScore(score);

  return {
    score,
    maxScore,
    estimatedLevel,
    examFamily: getExamFamily(estimatedLevel),
    recommendation: trainingTracks[estimatedLevel],
  };
};
