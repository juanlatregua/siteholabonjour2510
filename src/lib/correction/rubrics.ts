// Rubrics for DELF/DALF Production Écrite evaluation
// Based on official France Éducation International grading criteria

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface Criterion {
  id: string;
  name: string;
  nameFr: string;
  maxScore: number;
  descriptors: string[]; // from 0 to max, one descriptor per score band
}

export interface LevelRubric {
  level: CEFRLevel;
  exam: "DELF" | "DALF";
  maxScore: number;
  minWords: number;
  maxWords: number;
  taskTypes: TaskType[];
  criteria: Criterion[];
}

export interface TaskType {
  id: string;
  label: string;
  labelFr: string;
  description: string;
  samplePrompt?: string;
}

// ── Task types by level ──

const A1_TASKS: TaskType[] = [
  { id: "formulaire", label: "Formulario", labelFr: "Formulaire", description: "Rellenar un formulario con datos personales", samplePrompt: "Remplissez ce formulaire d'inscription à un cours de français." },
  { id: "carte_postale", label: "Postal / mensaje corto", labelFr: "Carte postale / message court", description: "Escribir un mensaje corto (postal, SMS, nota)", samplePrompt: "Vous êtes en vacances à Nice. Écrivez une carte postale à un(e) ami(e)." },
];

const A2_TASKS: TaskType[] = [
  { id: "message_amical", label: "Mensaje amistoso", labelFr: "Message amical", description: "Describir un evento, invitar, aceptar/rechazar invitación", samplePrompt: "Vous avez assisté à une fête. Écrivez un message à un(e) ami(e) pour raconter cette soirée." },
  { id: "lettre_informelle", label: "Carta informal", labelFr: "Lettre informelle", description: "Carta personal con descripción o narración simple", samplePrompt: "Écrivez une lettre à un(e) ami(e) pour lui raconter votre week-end." },
];

const B1_TASKS: TaskType[] = [
  { id: "essai", label: "Ensayo de opinión", labelFr: "Essai", description: "Expresar y justificar una opinión personal", samplePrompt: "Pensez-vous que les réseaux sociaux ont un impact positif sur les relations amicales ? Donnez votre opinion en la justifiant." },
  { id: "lettre_formelle", label: "Carta formal", labelFr: "Lettre formelle", description: "Carta de reclamación, solicitud, propuesta", samplePrompt: "Vous écrivez au directeur de votre école pour proposer une activité culturelle. Présentez votre projet et expliquez ses avantages." },
];

const B2_TASKS: TaskType[] = [
  { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté", description: "Defender un punto de vista con argumentos estructurados", samplePrompt: "Le télétravail devrait-il devenir la norme ? Présentez votre opinion dans un essai structuré." },
  { id: "lettre_formelle", label: "Carta formal", labelFr: "Lettre formelle", description: "Carta formal de protesta, propuesta, reclamación", samplePrompt: "Vous écrivez au maire de votre ville pour protester contre un projet de construction. Exposez vos arguments." },
  { id: "article", label: "Artículo", labelFr: "Article", description: "Artículo para revista o blog con opinión argumentada", samplePrompt: "Rédigez un article pour le journal de votre école sur les avantages et les inconvénients des uniformes scolaires." },
];

const C1_TASKS: TaskType[] = [
  { id: "synthese", label: "Síntesis", labelFr: "Synthèse de documents", description: "Síntesis de varios documentos sin opinión personal", samplePrompt: "À partir des documents fournis, rédigez une synthèse sur le thème de l'intelligence artificielle dans l'éducation." },
  { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté", description: "Toma de posición estructurada y matizada", samplePrompt: "L'intelligence artificielle va-t-elle remplacer les enseignants ? Présentez votre point de vue dans un essai argumenté." },
];

const C2_TASKS: TaskType[] = [
  { id: "synthese", label: "Síntesis", labelFr: "Synthèse de documents", description: "Síntesis compleja con reformulación y plan visible", samplePrompt: "Rédigez une synthèse à partir des documents sur le thème de la mondialisation culturelle." },
  { id: "essai_argumente", label: "Ensayo argumentado", labelFr: "Essai argumenté", description: "Argumentación con profundidad, matices, y estilo sostenido", samplePrompt: "La liberté d'expression doit-elle avoir des limites ? Développez votre réflexion dans un essai approfondi." },
];

// ── Rubric criteria by level (official FEI grading grids) ──

const A1_RUBRIC: LevelRubric = {
  level: "A1",
  exam: "DELF",
  maxScore: 25,
  minWords: 40,
  maxWords: 50,
  taskTypes: A1_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 5,
      descriptors: [
        "No respeta la consigna en absoluto",
        "Respeta parcialmente la consigna, producción muy corta",
        "Cumple la consigna de forma mínima",
        "Respeta la consigna aunque con alguna omisión",
        "Respeta bien la consigna, extensión adecuada",
        "Respeta plenamente la consigna y la extensión",
      ],
    },
    {
      id: "correction_sociolinguistique",
      name: "Adecuación sociolingüística",
      nameFr: "Correction sociolinguistique",
      maxScore: 5,
      descriptors: [
        "No utiliza fórmulas de cortesía ni registro adecuado",
        "Utiliza alguna fórmula básica de forma mecánica",
        "Usa fórmulas de cortesía básicas con errores",
        "Registro generalmente adecuado con pequeños errores",
        "Buen uso de fórmulas de cortesía y registro",
        "Uso perfecto del registro y las convenciones sociales",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 5,
      descriptors: [
        "Vocabulario extremadamente limitado, errores constantes",
        "Vocabulario muy limitado, frecuentes errores ortográficos",
        "Vocabulario básico suficiente con errores frecuentes",
        "Vocabulario elemental con algunos errores",
        "Vocabulario adecuado al nivel con pocos errores",
        "Vocabulario variado para el nivel, ortografía correcta",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Estructuras ininteligibles, errores constantes",
        "Frases muy simples con errores frecuentes",
        "Estructuras simples con errores que dificultan la comprensión",
        "Estructuras simples generalmente correctas",
        "Buen control de estructuras simples",
        "Control correcto de las estructuras básicas",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Texto sin estructura, ideas inconexas",
        "Conexión mínima entre ideas",
        "Uso limitado de conectores simples (et, mais)",
        "Articulación básica aceptable",
        "Texto bien organizado con conectores simples",
        "Texto coherente y bien articulado para el nivel",
      ],
    },
  ],
};

const A2_RUBRIC: LevelRubric = {
  level: "A2",
  exam: "DELF",
  maxScore: 25,
  minWords: 60,
  maxWords: 80,
  taskTypes: A2_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 5,
      descriptors: [
        "No respeta la consigna",
        "Respeta parcialmente la consigna",
        "Respeta la consigna de forma mínima",
        "Respeta la consigna con ligeras omisiones",
        "Respeta bien la consigna",
        "Respeta plenamente la consigna y la extensión",
      ],
    },
    {
      id: "correction_sociolinguistique",
      name: "Adecuación sociolingüística",
      nameFr: "Correction sociolinguistique",
      maxScore: 5,
      descriptors: [
        "Registro completamente inadecuado",
        "Mezcla de registros, fórmulas inadecuadas",
        "Fórmulas elementales, registro parcialmente adecuado",
        "Registro generalmente adecuado",
        "Buen uso del registro y las convenciones",
        "Registro y convenciones plenamente adecuados",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 5,
      descriptors: [
        "Vocabulario insuficiente para la tarea",
        "Vocabulario muy limitado, errores frecuentes",
        "Vocabulario elemental para la tarea",
        "Vocabulario adecuado con algunos errores",
        "Vocabulario variado para el nivel",
        "Buen dominio del vocabulario cotidiano",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Errores constantes que impiden la comprensión",
        "Estructuras simples con errores frecuentes",
        "Frases simples con errores que a veces dificultan la comprensión",
        "Estructuras simples generalmente correctas",
        "Control aceptable de las estructuras habituales",
        "Buen control de las estructuras simples y habituales",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Sin estructura visible",
        "Articulación mínima",
        "Conectores simples (et, mais, alors)",
        "Texto articulado de forma elemental",
        "Texto bien articulado con conectores variados",
        "Texto coherente y bien organizado",
      ],
    },
  ],
};

const B1_RUBRIC: LevelRubric = {
  level: "B1",
  exam: "DELF",
  maxScore: 25,
  minWords: 160,
  maxWords: 180,
  taskTypes: B1_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 5,
      descriptors: [
        "No respeta la consigna ni la extensión",
        "Trata parcialmente el tema con extensión insuficiente",
        "Respeta la consigna con omisiones",
        "Respeta la consigna, extensión casi adecuada",
        "Respeta bien la consigna y la extensión",
        "Cumplimiento total de la consigna",
      ],
    },
    {
      id: "capacite_argumenter",
      name: "Capacidad de argumentar / narrar",
      nameFr: "Capacité à présenter des faits / exprimer son opinion",
      maxScore: 5,
      descriptors: [
        "No argumenta ni narra",
        "Describe brevemente sin argumentar",
        "Expresa opiniones sin justificar",
        "Expresa y justifica opiniones de forma simple",
        "Argumenta con ejemplos concretos",
        "Argumenta de forma clara con ejemplos relevantes",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 5,
      descriptors: [
        "Vocabulario insuficiente, errores constantes",
        "Vocabulario limitado, repeticiones frecuentes",
        "Vocabulario suficiente para la tarea con errores",
        "Vocabulario adecuado, algunos errores",
        "Vocabulario variado con pocos errores",
        "Buen dominio del vocabulario, ortografía correcta",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Errores constantes que impiden la comprensión",
        "Errores frecuentes en estructuras simples",
        "Estructuras simples correctas, errores en las complejas",
        "Buen control de las estructuras simples",
        "Variedad de estructuras con pocos errores",
        "Buen dominio de la gramática del nivel",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Texto sin organización",
        "Articulación débil entre ideas",
        "Uso de conectores simples, organización básica",
        "Texto organizado con conectores variados",
        "Buena articulación y progresión del discurso",
        "Texto fluido con articulación eficaz",
      ],
    },
  ],
};

const B2_RUBRIC: LevelRubric = {
  level: "B2",
  exam: "DELF",
  maxScore: 25,
  minWords: 250,
  maxWords: 280,
  taskTypes: B2_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 5,
      descriptors: [
        "No respeta la consigna ni el tipo de texto",
        "Respeta parcialmente la consigna",
        "Respeta la consigna, extensión insuficiente",
        "Respeta la consigna, extensión casi adecuada",
        "Respeta bien la consigna y el tipo de producción",
        "Cumplimiento total de la consigna, extensión y tipo",
      ],
    },
    {
      id: "capacite_argumenter",
      name: "Capacidad de argumentar",
      nameFr: "Capacité à argumenter",
      maxScore: 5,
      descriptors: [
        "Sin argumentación",
        "Argumentación mínima, ideas poco desarrolladas",
        "Argumentos presentes pero poco desarrollados",
        "Argumentación clara con ejemplos",
        "Argumentación eficaz y matizada",
        "Argumentación rica, matizada y convincente",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 5,
      descriptors: [
        "Vocabulario insuficiente, errores graves",
        "Vocabulario limitado, imprecisiones frecuentes",
        "Vocabulario suficiente pero poco variado",
        "Vocabulario adecuado, algunos errores",
        "Vocabulario variado y preciso",
        "Vocabulario rico y preciso, ortografía maîtrisée",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Errores graves y constantes",
        "Errores frecuentes en estructuras simples y complejas",
        "Estructuras simples correctas, errores en complejas",
        "Buen control general, errores puntuales",
        "Variedad de estructuras bien controladas",
        "Excelente dominio de la gramática del nivel",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Sin estructura ni articulación",
        "Articulación débil, texto poco organizado",
        "Organización visible pero articulación limitada",
        "Texto bien organizado, conectores variados",
        "Buena articulación, progresión clara",
        "Texto fluido con articulación eficaz y matizada",
      ],
    },
  ],
};

const C1_RUBRIC: LevelRubric = {
  level: "C1",
  exam: "DALF",
  maxScore: 25,
  minWords: 220,
  maxWords: 250,
  taskTypes: C1_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 4,
      descriptors: [
        "No respeta la consigna ni la extensión",
        "Parcialmente respetada",
        "Respetada con alguna omisión",
        "Bien respetada",
        "Plenamente respetada",
      ],
    },
    {
      id: "capacite_traiter",
      name: "Capacidad de tratamiento de la información",
      nameFr: "Capacité à traiter les informations / argumenter",
      maxScore: 7,
      descriptors: [
        "Sin tratamiento de la información",
        "Tratamiento muy superficial",
        "Información tratada parcialmente",
        "Información tratada de forma aceptable",
        "Buen tratamiento con jerarquización",
        "Tratamiento eficaz y reformulación adecuada",
        "Tratamiento completo con reformulación personal",
        "Excelente síntesis / argumentación completa y matizada",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 4,
      descriptors: [
        "Vocabulario insuficiente",
        "Vocabulario limitado, imprecisiones",
        "Vocabulario adecuado con algunos errores",
        "Vocabulario variado y preciso",
        "Vocabulario rico, matizado y preciso",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Errores graves y constantes",
        "Errores frecuentes",
        "Control aceptable, errores puntuales",
        "Buen control de las estructuras complejas",
        "Variedad y buen control de las estructuras",
        "Excelente dominio de la gramática",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Sin organización",
        "Articulación débil",
        "Organización aceptable",
        "Texto bien organizado, conectores eficaces",
        "Muy buena articulación y progresión",
        "Articulación fluida, encadenamientos naturales",
      ],
    },
  ],
};

const C2_RUBRIC: LevelRubric = {
  level: "C2",
  exam: "DALF",
  maxScore: 25,
  minWords: 300,
  maxWords: 500,
  taskTypes: C2_TASKS,
  criteria: [
    {
      id: "respect_consigne",
      name: "Cumplimiento de la consigna",
      nameFr: "Respect de la consigne",
      maxScore: 4,
      descriptors: [
        "No respeta la consigna",
        "Respeta parcialmente",
        "Respeta la consigna adecuadamente",
        "Respeta la consigna con precisión",
        "Cumplimiento ejemplar",
      ],
    },
    {
      id: "capacite_traiter",
      name: "Capacidad de tratamiento y argumentación",
      nameFr: "Capacité à traiter et argumenter",
      maxScore: 7,
      descriptors: [
        "Sin tratamiento",
        "Tratamiento superficial",
        "Tratamiento parcial",
        "Tratamiento aceptable",
        "Buen tratamiento con argumentación",
        "Argumentación eficaz y matizada",
        "Argumentación profunda con perspectiva personal",
        "Argumentación brillante, profunda y original",
      ],
    },
    {
      id: "lexique",
      name: "Léxico / Vocabulario",
      nameFr: "Compétence lexicale / orthographe lexicale",
      maxScore: 4,
      descriptors: [
        "Vocabulario insuficiente",
        "Vocabulario limitado",
        "Vocabulario adecuado",
        "Vocabulario rico y preciso",
        "Vocabulario erudito y estilísticamente variado",
      ],
    },
    {
      id: "morphosyntaxe",
      name: "Morfosintaxis / Gramática",
      nameFr: "Compétence grammaticale / orthographe grammaticale",
      maxScore: 5,
      descriptors: [
        "Errores graves",
        "Errores frecuentes",
        "Control aceptable",
        "Buen control de estructuras complejas",
        "Excelente dominio",
        "Dominio total de la gramática francesa",
      ],
    },
    {
      id: "coherence",
      name: "Coherencia y cohesión",
      nameFr: "Cohérence et cohésion",
      maxScore: 5,
      descriptors: [
        "Sin estructura",
        "Articulación débil",
        "Organización aceptable",
        "Buena organización",
        "Articulación fluida y eficaz",
        "Discurso perfectamente articulado",
      ],
    },
  ],
};

// ── Exports ──

export const RUBRICS: Record<CEFRLevel, LevelRubric> = {
  A1: A1_RUBRIC,
  A2: A2_RUBRIC,
  B1: B1_RUBRIC,
  B2: B2_RUBRIC,
  C1: C1_RUBRIC,
  C2: C2_RUBRIC,
};

export function getRubric(level: CEFRLevel): LevelRubric {
  return RUBRICS[level];
}

export function getTaskTypes(level: CEFRLevel): TaskType[] {
  return RUBRICS[level].taskTypes;
}

export function isValidLevel(level: string): level is CEFRLevel {
  return ["A1", "A2", "B1", "B2", "C1", "C2"].includes(level);
}

export function isValidTaskType(level: CEFRLevel, taskTypeId: string): boolean {
  return RUBRICS[level].taskTypes.some((t) => t.id === taskTypeId);
}
