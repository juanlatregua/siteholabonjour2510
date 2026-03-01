import test from "node:test";
import assert from "node:assert/strict";
import { assessmentById } from "../../src/data/assessment-bank.ts";
import {
  calculateAssessmentResult,
  mapScoreToLevel,
} from "../../src/lib/assessment-engine.ts";
import type { AssessmentAttemptAnswer } from "../../src/lib/assessment/types.ts";

const buildAnswers = (
  assessmentId: string,
  mode: "all-correct" | "all-wrong",
): AssessmentAttemptAnswer[] => {
  const assessment = assessmentById.get(assessmentId);
  if (!assessment) {
    throw new Error(`Assessment ${assessmentId} not found`);
  }

  return assessment.questions.map((question, index) => {
    const wrongOption = question.options.find(
      (option) => option.id !== question.correctOptionId,
    );

    const selectedOptionId =
      mode === "all-correct"
        ? question.correctOptionId
        : (wrongOption?.id ?? question.correctOptionId);

    const isCorrect = selectedOptionId === question.correctOptionId;

    return {
      id: `answer-${assessmentId}-${index}`,
      attemptId: `attempt-${assessmentId}`,
      questionId: question.id,
      selectedOptionId,
      isCorrect,
      pointsAwarded: isCorrect ? question.points : 0,
      answeredAt: "2026-02-26T00:00:00.000Z",
      updatedAt: "2026-02-26T00:00:00.000Z",
    };
  });
};

test("mapScoreToLevel keeps deterministic CEFR mapping", () => {
  assert.equal(mapScoreToLevel("A1", 20), "A1");
  assert.equal(mapScoreToLevel("A2", 55), "A2");
  assert.equal(mapScoreToLevel("B1", 70), "B2");
  assert.equal(mapScoreToLevel("B1", 95), "C1");
});

test("calculateAssessmentResult returns stable scoring and recommendation", () => {
  const assessment = assessmentById.get("a1-diagnostic");
  assert.ok(assessment);

  const answers = buildAnswers("a1-diagnostic", "all-correct");
  const result = calculateAssessmentResult({
    assessment,
    attemptId: "attempt-a1",
    answers,
  });

  assert.equal(result.totalScore, result.maxScore);
  assert.equal(result.percentage, 100);
  assert.equal(result.estimatedLevel, "B1");
  assert.equal(result.recommendedExam, "DELF B1");
  assert.equal(result.sectionScores.length, 3);

  const again = calculateAssessmentResult({
    assessment,
    attemptId: "attempt-a1",
    answers,
  });

  assert.deepEqual(
    {
      totalScore: again.totalScore,
      maxScore: again.maxScore,
      percentage: again.percentage,
      estimatedLevel: again.estimatedLevel,
      recommendedExam: again.recommendedExam,
      sectionScores: again.sectionScores,
    },
    {
      totalScore: result.totalScore,
      maxScore: result.maxScore,
      percentage: result.percentage,
      estimatedLevel: result.estimatedLevel,
      recommendedExam: result.recommendedExam,
      sectionScores: result.sectionScores,
    },
  );
});

test("calculateAssessmentResult handles low score consistently", () => {
  const assessment = assessmentById.get("b1-diagnostic");
  assert.ok(assessment);

  const answers = buildAnswers("b1-diagnostic", "all-wrong");
  const result = calculateAssessmentResult({
    assessment,
    attemptId: "attempt-b1",
    answers,
  });

  assert.equal(result.totalScore, 0);
  assert.equal(result.percentage, 0);
  assert.equal(result.estimatedLevel, "A2");
});
