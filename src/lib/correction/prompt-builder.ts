// Builds system prompts and tool schemas for Claude writing correction

import { type CEFRLevel, getRubric, type LevelRubric } from "./rubrics";

function formatCriteriaForPrompt(rubric: LevelRubric): string {
  return rubric.criteria
    .map((c) => {
      const bands = c.descriptors
        .map((d, i) => `  ${i}/${c.maxScore}: ${d}`)
        .join("\n");
      return `### ${c.nameFr} (${c.name}) — /${c.maxScore}\n${bands}`;
    })
    .join("\n\n");
}

export function buildSystemPrompt(level: CEFRLevel, taskType: string): string {
  const rubric = getRubric(level);
  const task = rubric.taskTypes.find((t) => t.id === taskType);
  const taskLabel = task ? task.labelFr : taskType;

  return `Tu es un correcteur expert de français langue étrangère (FLE), spécialisé dans la préparation aux examens ${rubric.exam}.

## Ta mission
Corriger et évaluer une production écrite de niveau ${level} (${rubric.exam}), type d'exercice : ${taskLabel}.

## Consignes d'évaluation

### Extensión
- Minimum : ${rubric.minWords} mots
- Maximum : ${rubric.maxWords} mots
- Si le texte est trop court ou trop long, ajuste la note en « Respect de la consigne ».

### Barème (total : ${rubric.maxScore} points)
${formatCriteriaForPrompt(rubric)}

## Instructions pour la correction

1. **Évalue chaque critère** selon les descripteurs ci-dessus. Attribue un score entier ou demi-point.
2. **Annote le texte** : identifie chaque erreur avec sa position (start/end en caractères), le type d'erreur (grammaire, orthographe, lexique, syntaxe, ponctuation, registre, cohérence), le texte original erroné, la correction proposée et une brève explication en espagnol.
3. **Réécris le texte corrigé** en gardant le style et les idées de l'apprenant mais en corrigeant toutes les erreurs.
4. **Donne un feedback global** en espagnol : points forts, points à améliorer, niveau estimé CECRL.
5. **Suggère 3-5 prochaines étapes concrètes** pour s'améliorer, en espagnol.

## Ton
- Bienveillant mais rigoureux
- Corrections en français, explications et feedback en espagnol
- Adapté au niveau ${level} : ne pas sanctionner des structures au-delà du niveau attendu`;
}

export function buildCorrectionToolSchema(rubric: LevelRubric) {
  const criterionProperties: Record<string, object> = {};
  for (const c of rubric.criteria) {
    criterionProperties[c.id] = {
      type: "object" as const,
      properties: {
        score: { type: "number", description: `Puntuación (0 a ${c.maxScore})` },
        max: { type: "number", description: `Puntuación máxima: ${c.maxScore}` },
        comment: { type: "string", description: "Comentario breve sobre este criterio (en español)" },
      },
      required: ["score", "max", "comment"],
    };
  }

  return {
    name: "submit_correction",
    description: "Envía la corrección completa de la producción escrita",
    input_schema: {
      type: "object" as const,
      properties: {
        globalScore: {
          type: "number",
          description: `Puntuación total (0 a ${rubric.maxScore})`,
        },
        maxScore: {
          type: "number",
          description: `Máximo posible: ${rubric.maxScore}`,
        },
        criterionScores: {
          type: "object",
          properties: criterionProperties,
          required: rubric.criteria.map((c) => c.id),
          description: "Puntuación desglosada por criterio",
        },
        annotations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              start: { type: "number", description: "Posición inicio del error (índice de carácter)" },
              end: { type: "number", description: "Posición fin del error (índice de carácter)" },
              type: {
                type: "string",
                enum: ["grammaire", "orthographe", "lexique", "syntaxe", "ponctuation", "registre", "cohérence"],
                description: "Tipo de error",
              },
              original: { type: "string", description: "Texto original erróneo" },
              correction: { type: "string", description: "Corrección propuesta" },
              explanation: { type: "string", description: "Explicación breve en español" },
            },
            required: ["start", "end", "type", "original", "correction", "explanation"],
          },
          description: "Lista de errores anotados con posiciones",
        },
        correctedText: {
          type: "string",
          description: "El texto completo reescrito y corregido",
        },
        overallFeedback: {
          type: "string",
          description: "Feedback global en español: puntos fuertes, puntos a mejorar",
        },
        estimatedLevel: {
          type: "string",
          enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
          description: "Nivel CECRL estimado del texto",
        },
        nextSteps: {
          type: "array",
          items: { type: "string" },
          description: "3-5 consejos concretos para mejorar (en español)",
        },
      },
      required: [
        "globalScore",
        "maxScore",
        "criterionScores",
        "annotations",
        "correctedText",
        "overallFeedback",
        "estimatedLevel",
        "nextSteps",
      ],
    },
  };
}

export type CorrectionToolInput = {
  globalScore: number;
  maxScore: number;
  criterionScores: Record<
    string,
    { score: number; max: number; comment: string }
  >;
  annotations: Array<{
    start: number;
    end: number;
    type: string;
    original: string;
    correction: string;
    explanation: string;
  }>;
  correctedText: string;
  overallFeedback: string;
  estimatedLevel: string;
  nextSteps: string[];
};
