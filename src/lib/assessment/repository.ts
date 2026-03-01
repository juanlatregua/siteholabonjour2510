import { prisma } from "@/lib/prisma";
import type {
  AssessmentAttemptAnswer,
  AssessmentAttemptWithResult,
  AssessmentResult,
} from "./types.ts";
import type { AssessmentAttempt as PrismaAttempt, AssessmentAttemptAnswer as PrismaAnswer } from "@/generated/prisma/client";

// ── Helpers to convert between Prisma rows and app-level types ──

function toAppAttempt(
  row: PrismaAttempt & { answers?: PrismaAnswer[] },
): AssessmentAttemptWithResult {
  const attempt: AssessmentAttemptWithResult = {
    id: row.id,
    assessmentId: row.assessmentId,
    attemptToken: row.attemptToken,
    candidateId: row.candidateId,
    status: row.status as AssessmentAttemptWithResult["status"],
    startedAt: row.startedAt.toISOString(),
    finishedAt: row.finishedAt?.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };

  if (row.result) {
    try {
      attempt.result = JSON.parse(row.result) as AssessmentResult;
    } catch {
      // If the JSON is corrupt, leave result undefined
    }
  }

  return attempt;
}

function toAppAnswer(row: PrismaAnswer): AssessmentAttemptAnswer {
  return {
    id: row.id,
    attemptId: row.attemptId,
    questionId: row.questionId,
    selectedOptionId: row.selectedOptionId,
    isCorrect: row.isCorrect,
    pointsAwarded: row.pointsAwarded,
    clientSequence: row.clientSequence ?? undefined,
    answeredAt: row.answeredAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ── Prisma-backed Assessment Repository ──

class PrismaAssessmentRepository {
  async createAttempt({
    assessmentId,
    candidateId,
  }: {
    assessmentId: string;
    candidateId: string;
  }): Promise<AssessmentAttemptWithResult> {
    const row = await prisma.assessmentAttempt.create({
      data: {
        assessmentId,
        candidateId,
        status: "IN_PROGRESS",
      },
    });

    return toAppAttempt(row);
  }

  async getAttempt(attemptId: string): Promise<AssessmentAttemptWithResult | undefined> {
    const row = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
    });

    return row ? toAppAttempt(row) : undefined;
  }

  async listAttemptAnswers(attemptId: string): Promise<AssessmentAttemptAnswer[]> {
    const rows = await prisma.assessmentAttemptAnswer.findMany({
      where: { attemptId },
      orderBy: { answeredAt: "asc" },
    });

    return rows.map(toAppAnswer);
  }

  async upsertAnswer({
    answer,
  }: {
    answer: AssessmentAttemptAnswer;
  }): Promise<{ answers: AssessmentAttemptAnswer[]; saved: boolean }> {
    // Check for an existing answer with the same attemptId + questionId
    const existing = await prisma.assessmentAttemptAnswer.findUnique({
      where: {
        attemptId_questionId: {
          attemptId: answer.attemptId,
          questionId: answer.questionId,
        },
      },
    });

    if (existing) {
      const incomingSequence = answer.clientSequence ?? 0;
      const existingSequence = existing.clientSequence ?? 0;

      if (incomingSequence < existingSequence) {
        // Stale answer — return current answers without saving
        const allRows = await prisma.assessmentAttemptAnswer.findMany({
          where: { attemptId: answer.attemptId },
          orderBy: { answeredAt: "asc" },
        });
        return { answers: allRows.map(toAppAnswer), saved: false };
      }

      // Update existing answer
      await prisma.assessmentAttemptAnswer.update({
        where: { id: existing.id },
        data: {
          selectedOptionId: answer.selectedOptionId,
          isCorrect: answer.isCorrect,
          pointsAwarded: answer.pointsAwarded,
          clientSequence: answer.clientSequence ?? existing.clientSequence,
          updatedAt: new Date(answer.updatedAt),
        },
      });
    } else {
      // Insert new answer
      await prisma.assessmentAttemptAnswer.create({
        data: {
          id: answer.id,
          attemptId: answer.attemptId,
          questionId: answer.questionId,
          selectedOptionId: answer.selectedOptionId,
          isCorrect: answer.isCorrect,
          pointsAwarded: answer.pointsAwarded,
          clientSequence: answer.clientSequence ?? null,
          answeredAt: new Date(answer.answeredAt),
          // updatedAt is handled by @updatedAt in schema
        },
      });
    }

    // Update the attempt's updatedAt timestamp
    await prisma.assessmentAttempt.update({
      where: { id: answer.attemptId },
      data: { updatedAt: new Date(answer.updatedAt) },
    });

    // Return the full list of answers for this attempt
    const allRows = await prisma.assessmentAttemptAnswer.findMany({
      where: { attemptId: answer.attemptId },
      orderBy: { answeredAt: "asc" },
    });

    return { answers: allRows.map(toAppAnswer), saved: true };
  }

  async finishAttempt({
    attemptId,
    result,
  }: {
    attemptId: string;
    result: AssessmentResult;
  }): Promise<AssessmentAttemptWithResult | undefined> {
    const existing = await prisma.assessmentAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!existing) {
      return undefined;
    }

    const now = new Date();
    const row = await prisma.assessmentAttempt.update({
      where: { id: attemptId },
      data: {
        status: "FINISHED",
        finishedAt: now,
        updatedAt: now,
        result: JSON.stringify(result),
      },
    });

    return toAppAttempt(row);
  }

  async resetForTests(): Promise<void> {
    await prisma.assessmentAttemptAnswer.deleteMany();
    await prisma.assessmentAttempt.deleteMany();
  }
}

export const assessmentRepository = new PrismaAssessmentRepository();

export const resetAssessmentRepositoryForTests = async (): Promise<void> => {
  await assessmentRepository.resetForTests();
};
