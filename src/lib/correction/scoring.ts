// Parse and validate Claude's correction response

import type { CorrectionToolInput } from "./prompt-builder";
import { type CEFRLevel, getRubric } from "./rubrics";

export interface ParsedCorrection {
  globalScore: number;
  maxScore: number;
  criterionScores: Record<string, { score: number; max: number; comment: string }>;
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
}

export function parseToolUseResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseContent: any[],
): CorrectionToolInput | null {
  const toolBlock = responseContent.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (block: any) => block.type === "tool_use" && block.name === "submit_correction",
  );
  if (!toolBlock) return null;
  return toolBlock.input as CorrectionToolInput;
}

export function validateAndNormalize(
  input: CorrectionToolInput,
  level: CEFRLevel,
): ParsedCorrection {
  const rubric = getRubric(level);

  // Clamp scores to valid ranges
  const criterionScores: ParsedCorrection["criterionScores"] = {};
  let computedTotal = 0;

  for (const criterion of rubric.criteria) {
    const raw = input.criterionScores?.[criterion.id];
    const score = raw ? Math.min(Math.max(0, raw.score), criterion.maxScore) : 0;
    computedTotal += score;
    criterionScores[criterion.id] = {
      score,
      max: criterion.maxScore,
      comment: raw?.comment || "",
    };
  }

  // Use computed total if Claude's doesn't match
  const globalScore = Math.min(
    Math.max(0, input.globalScore),
    rubric.maxScore,
  );
  const finalScore = Math.abs(globalScore - computedTotal) <= 0.5
    ? globalScore
    : computedTotal;

  return {
    globalScore: finalScore,
    maxScore: rubric.maxScore,
    criterionScores,
    annotations: (input.annotations || []).map((a) => ({
      start: a.start,
      end: a.end,
      type: a.type,
      original: a.original,
      correction: a.correction,
      explanation: a.explanation,
    })),
    correctedText: input.correctedText || "",
    overallFeedback: input.overallFeedback || "",
    estimatedLevel: input.estimatedLevel || level,
    nextSteps: input.nextSteps || [],
  };
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
