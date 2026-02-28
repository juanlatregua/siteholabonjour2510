import test from "node:test";
import assert from "node:assert/strict";
import { assessmentById } from "../../src/data/assessment-bank.ts";
import { resetAssessmentRepositoryForTests } from "../../src/lib/assessment/repository.ts";
import {
  AssessmentServiceError,
  finishAssessmentAttempt,
  getAssessmentResult,
  startAssessmentAttempt,
  submitAssessmentAnswer,
} from "../../src/lib/assessment/service.ts";

const assessment = assessmentById.get("a1-diagnostic");
if (!assessment) {
  throw new Error("a1-diagnostic assessment missing");
}

test("integration: start -> answer -> finish -> result", async () => {
  await resetAssessmentRepositoryForTests();

  const start = await startAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    candidateId: "qa-user",
  });

  assert.ok(start.attemptId);
  assert.ok(start.attemptToken);

  const firstQuestion = assessment.questions[0];
  const secondQuestion = assessment.questions[1];

  await submitAssessmentAnswer({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
    questionId: firstQuestion.id,
    selectedOptionId: firstQuestion.correctOptionId,
  });

  await submitAssessmentAnswer({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
    questionId: secondQuestion.id,
    selectedOptionId: secondQuestion.options.find(
      (option) => option.id !== secondQuestion.correctOptionId,
    )?.id ?? secondQuestion.correctOptionId,
  });

  const result = await finishAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
  });

  assert.equal(result.attemptId, start.attemptId);
  assert.ok(result.maxScore > 0);
  assert.ok(result.totalScore >= 0);

  const fetched = await getAssessmentResult({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
  });

  assert.equal(fetched.attemptId, result.attemptId);
  assert.equal(fetched.totalScore, result.totalScore);
  assert.equal(fetched.estimatedLevel, result.estimatedLevel);
});

test("edge: stale sequence answer is ignored", async () => {
  await resetAssessmentRepositoryForTests();

  const start = await startAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    candidateId: "qa-sequence",
  });

  const question = assessment.questions[0];
  const wrongOptionId =
    question.options.find((option) => option.id !== question.correctOptionId)?.id ??
    question.correctOptionId;

  const latest = await submitAssessmentAnswer({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
    questionId: question.id,
    selectedOptionId: question.correctOptionId,
    clientSequence: 2,
  });

  const stale = await submitAssessmentAnswer({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
    questionId: question.id,
    selectedOptionId: wrongOptionId,
    clientSequence: 1,
  });

  assert.equal(latest.saved, true);
  assert.equal(stale.saved, false);

  const result = await finishAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
  });

  assert.equal(result.totalScore, question.points);
});

test("edge: double finish is rejected safely", async () => {
  await resetAssessmentRepositoryForTests();

  const start = await startAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    candidateId: "qa-double-finish",
  });

  const firstQuestion = assessment.questions[0];

  await submitAssessmentAnswer({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
    questionId: firstQuestion.id,
    selectedOptionId: firstQuestion.correctOptionId,
  });

  await finishAssessmentAttempt({
    assessmentId: "a1-diagnostic",
    attemptId: start.attemptId,
    attemptToken: start.attemptToken,
  });

  await assert.rejects(
    async () => {
      await finishAssessmentAttempt({
        assessmentId: "a1-diagnostic",
        attemptId: start.attemptId,
        attemptToken: start.attemptToken,
      });
    },
    (error: unknown) => {
      assert.ok(error instanceof AssessmentServiceError);
      assert.equal(error.code, "ATTEMPT_ALREADY_FINISHED");
      return true;
    },
  );
});
