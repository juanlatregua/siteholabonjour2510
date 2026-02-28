import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type {
  AssessmentAttemptAnswer,
  AssessmentAttemptWithResult,
  AssessmentResult,
} from "./types.ts";

interface StoreSnapshot {
  attempts: Record<string, AssessmentAttemptWithResult>;
  answers: Record<string, AssessmentAttemptAnswer[]>;
}

const DEFAULT_SNAPSHOT: StoreSnapshot = {
  attempts: {},
  answers: {},
};

const DATA_DIR = path.join(process.cwd(), ".assessment-store");
const DATA_FILE = path.join(DATA_DIR, "assessment-attempts.json");

class LocalAssessmentRepository {
  private snapshot: StoreSnapshot = DEFAULT_SNAPSHOT;

  private loadPromise: Promise<void> | null = null;

  private persistenceEnabled = true;

  private async ensureLoaded(): Promise<void> {
    if (!this.loadPromise) {
      this.loadPromise = this.load();
    }

    await this.loadPromise;
  }

  private async load(): Promise<void> {
    try {
      const raw = await readFile(DATA_FILE, "utf8");
      const parsed = JSON.parse(raw) as StoreSnapshot;
      this.snapshot = {
        attempts: parsed.attempts ?? {},
        answers: parsed.answers ?? {},
      };
    } catch {
      this.snapshot = { ...DEFAULT_SNAPSHOT };
    }
  }

  private async persist(): Promise<void> {
    if (!this.persistenceEnabled) {
      return;
    }

    try {
      await mkdir(DATA_DIR, { recursive: true });
      await writeFile(DATA_FILE, `${JSON.stringify(this.snapshot, null, 2)}\n`, "utf8");
    } catch {
      this.persistenceEnabled = false;
    }
  }

  async createAttempt({
    assessmentId,
    candidateId,
  }: {
    assessmentId: string;
    candidateId: string;
  }): Promise<AssessmentAttemptWithResult> {
    await this.ensureLoaded();

    const now = new Date().toISOString();
    const attempt: AssessmentAttemptWithResult = {
      id: randomUUID(),
      assessmentId,
      attemptToken: randomUUID(),
      candidateId,
      status: "IN_PROGRESS",
      startedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    this.snapshot.attempts[attempt.id] = attempt;
    this.snapshot.answers[attempt.id] = [];

    await this.persist();

    return attempt;
  }

  async getAttempt(attemptId: string): Promise<AssessmentAttemptWithResult | undefined> {
    await this.ensureLoaded();
    return this.snapshot.attempts[attemptId];
  }

  async listAttemptAnswers(attemptId: string): Promise<AssessmentAttemptAnswer[]> {
    await this.ensureLoaded();
    return this.snapshot.answers[attemptId] ?? [];
  }

  async upsertAnswer({
    answer,
  }: {
    answer: AssessmentAttemptAnswer;
  }): Promise<{ answers: AssessmentAttemptAnswer[]; saved: boolean }> {
    await this.ensureLoaded();

    const currentAnswers = this.snapshot.answers[answer.attemptId] ?? [];
    const existingIndex = currentAnswers.findIndex(
      (entry) => entry.questionId === answer.questionId,
    );

    if (existingIndex >= 0) {
      const existing = currentAnswers[existingIndex];
      const incomingSequence = answer.clientSequence ?? 0;
      const existingSequence = existing.clientSequence ?? 0;

      if (incomingSequence < existingSequence) {
        return {
          answers: currentAnswers,
          saved: false,
        };
      }

      currentAnswers[existingIndex] = {
        ...existing,
        selectedOptionId: answer.selectedOptionId,
        isCorrect: answer.isCorrect,
        pointsAwarded: answer.pointsAwarded,
        clientSequence: answer.clientSequence ?? existing.clientSequence,
        updatedAt: answer.updatedAt,
      };
    } else {
      currentAnswers.push(answer);
    }

    this.snapshot.answers[answer.attemptId] = currentAnswers;

    const attempt = this.snapshot.attempts[answer.attemptId];
    if (attempt) {
      attempt.updatedAt = answer.updatedAt;
    }

    await this.persist();

    return {
      answers: currentAnswers,
      saved: true,
    };
  }

  async finishAttempt({
    attemptId,
    result,
  }: {
    attemptId: string;
    result: AssessmentResult;
  }): Promise<AssessmentAttemptWithResult | undefined> {
    await this.ensureLoaded();

    const attempt = this.snapshot.attempts[attemptId];
    if (!attempt) {
      return undefined;
    }

    const now = new Date().toISOString();
    attempt.status = "FINISHED";
    attempt.finishedAt = now;
    attempt.updatedAt = now;
    attempt.result = result;

    await this.persist();

    return attempt;
  }

  async resetForTests(): Promise<void> {
    this.snapshot = {
      attempts: {},
      answers: {},
    };

    await this.persist();
  }
}

type GlobalRepositoryStore = typeof globalThis & {
  __hbAssessmentRepository?: LocalAssessmentRepository;
};

const globalRepositoryStore = globalThis as GlobalRepositoryStore;

export const assessmentRepository =
  globalRepositoryStore.__hbAssessmentRepository ?? new LocalAssessmentRepository();

if (process.env.NODE_ENV !== "production") {
  globalRepositoryStore.__hbAssessmentRepository = assessmentRepository;
}

export const resetAssessmentRepositoryForTests = async (): Promise<void> => {
  await assessmentRepository.resetForTests();
};
