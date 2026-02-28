import { randomUUID } from "node:crypto";
import { assessmentById, assessments } from "../../data/assessment-bank.ts";
import { calculateAssessmentResult, calculateAdaptiveResult, toPublicAssessment } from "../assessment-engine.ts";
import { assessmentRepository } from "./repository.ts";
import type {
  Assessment,
  AssessmentAttemptAnswer,
  AssessmentAttemptWithResult,
  AssessmentResult,
  PublicAssessment,
} from "./types.ts";

export class AssessmentServiceError extends Error {
  readonly code: string;

  readonly status: number;

  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

const getAssessmentOrThrow = (assessmentId: string): Assessment => {
  const assessment = assessmentById.get(assessmentId);

  if (!assessment) {
    throw new AssessmentServiceError(
      "ASSESSMENT_NOT_FOUND",
      "No existe la prueba solicitada.",
      404,
    );
  }

  return assessment;
};

const getQuestionOrThrow = (assessment: Assessment, questionId: string) => {
  const question = assessment.questions.find((entry) => entry.id === questionId);

  if (!question) {
    throw new AssessmentServiceError(
      "QUESTION_NOT_FOUND",
      "La pregunta no pertenece a esta prueba.",
      404,
    );
  }

  return question;
};

const assertAttemptAccess = ({
  attempt,
  expectedAssessmentId,
  attemptToken,
}: {
  attempt: AssessmentAttemptWithResult | undefined;
  expectedAssessmentId: string;
  attemptToken: string;
}): AssessmentAttemptWithResult => {
  if (!attempt) {
    throw new AssessmentServiceError("ATTEMPT_NOT_FOUND", "Intento no encontrado.", 404);
  }

  if (attempt.assessmentId !== expectedAssessmentId) {
    throw new AssessmentServiceError(
      "ATTEMPT_ASSESSMENT_MISMATCH",
      "El intento no corresponde a esta prueba.",
      400,
    );
  }

  if (attempt.attemptToken !== attemptToken) {
    throw new AssessmentServiceError("ATTEMPT_FORBIDDEN", "Token de intento invalido.", 403);
  }

  return attempt;
};

const buildAnswerRecord = ({
  attemptId,
  questionId,
  selectedOptionId,
  isCorrect,
  pointsAwarded,
  clientSequence,
}: {
  attemptId: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  pointsAwarded: number;
  clientSequence?: number;
}): AssessmentAttemptAnswer => {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    attemptId,
    questionId,
    selectedOptionId,
    isCorrect,
    pointsAwarded,
    clientSequence,
    answeredAt: now,
    updatedAt: now,
  };
};

export const listPublicAssessments = (): PublicAssessment[] => {
  return assessments.map(toPublicAssessment);
};

export const getPublicAssessment = (assessmentId: string): PublicAssessment => {
  return toPublicAssessment(getAssessmentOrThrow(assessmentId));
};

export const startAssessmentAttempt = async ({
  assessmentId,
  candidateId,
}: {
  assessmentId: string;
  candidateId?: string;
}): Promise<{
  attemptId: string;
  attemptToken: string;
  assessment: PublicAssessment;
}> => {
  const assessment = getAssessmentOrThrow(assessmentId);

  const attempt = await assessmentRepository.createAttempt({
    assessmentId,
    candidateId: candidateId?.trim() || "anonymous",
  });

  return {
    attemptId: attempt.id,
    attemptToken: attempt.attemptToken,
    assessment: toPublicAssessment(assessment),
  };
};

export const submitAssessmentAnswer = async ({
  assessmentId,
  attemptId,
  attemptToken,
  questionId,
  selectedOptionId,
  clientSequence,
}: {
  assessmentId: string;
  attemptId: string;
  attemptToken: string;
  questionId: string;
  selectedOptionId: string;
  clientSequence?: number;
}): Promise<{ answeredQuestions: number; saved: boolean }> => {
  const assessment = getAssessmentOrThrow(assessmentId);
  const question = getQuestionOrThrow(assessment, questionId);

  const attempt = assertAttemptAccess({
    attempt: await assessmentRepository.getAttempt(attemptId),
    expectedAssessmentId: assessmentId,
    attemptToken,
  });

  if (attempt.status !== "IN_PROGRESS") {
    throw new AssessmentServiceError(
      "ATTEMPT_NOT_ACTIVE",
      "Este intento ya no acepta respuestas.",
      409,
    );
  }

  const hasOption = question.options.some((option) => option.id === selectedOptionId);
  if (!hasOption) {
    throw new AssessmentServiceError(
      "OPTION_NOT_FOUND",
      "La opcion seleccionada no existe para esta pregunta.",
      400,
    );
  }

  if (
    typeof clientSequence !== "undefined" &&
    (!Number.isFinite(clientSequence) || clientSequence < 1)
  ) {
    throw new AssessmentServiceError(
      "INVALID_SEQUENCE",
      "La secuencia de respuesta no es valida.",
      400,
    );
  }

  const answer = buildAnswerRecord({
    attemptId,
    questionId,
    selectedOptionId,
    isCorrect: question.correctOptionId === selectedOptionId,
    pointsAwarded: question.correctOptionId === selectedOptionId ? question.points : 0,
    clientSequence,
  });

  const { answers, saved } = await assessmentRepository.upsertAnswer({ answer });

  return {
    answeredQuestions: answers.length,
    saved,
  };
};

export const finishAssessmentAttempt = async ({
  assessmentId,
  attemptId,
  attemptToken,
}: {
  assessmentId: string;
  attemptId: string;
  attemptToken: string;
}): Promise<AssessmentResult> => {
  const assessment = getAssessmentOrThrow(assessmentId);

  const attempt = assertAttemptAccess({
    attempt: await assessmentRepository.getAttempt(attemptId),
    expectedAssessmentId: assessmentId,
    attemptToken,
  });

  if (attempt.status === "FINISHED") {
    throw new AssessmentServiceError(
      "ATTEMPT_ALREADY_FINISHED",
      "Este intento ya fue finalizado.",
      409,
    );
  }

  const answers = await assessmentRepository.listAttemptAnswers(attemptId);
  const resultFn = assessment.slug === "test-general" ? calculateAdaptiveResult : calculateAssessmentResult;
  const result = resultFn({
    assessment,
    attemptId,
    answers,
  });

  await assessmentRepository.finishAttempt({
    attemptId,
    result,
  });

  return result;
};

export const getAssessmentResult = async ({
  assessmentId,
  attemptId,
  attemptToken,
}: {
  assessmentId: string;
  attemptId: string;
  attemptToken: string;
}): Promise<AssessmentResult> => {
  getAssessmentOrThrow(assessmentId);

  const attempt = assertAttemptAccess({
    attempt: await assessmentRepository.getAttempt(attemptId),
    expectedAssessmentId: assessmentId,
    attemptToken,
  });

  if (attempt.status !== "FINISHED" || !attempt.result) {
    throw new AssessmentServiceError(
      "ATTEMPT_NOT_FINISHED",
      "El intento aun no ha sido finalizado.",
      409,
    );
  }

  return attempt.result;
};
