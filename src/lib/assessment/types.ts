export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type AssessmentSectionId =
  | "comprension-escrita"
  | "gramatica-vocabulario"
  | "comprension-oral";

export type AssessmentDifficulty = "easy" | "medium" | "hard";

export interface AssessmentOption {
  id: string;
  text: string;
}

export interface AssessmentQuestionAudio {
  src?: string;
  title?: string;
  transcript?: string;
  ttsText?: string;
  durationSeconds?: number;
}

export interface AssessmentSection {
  id: AssessmentSectionId;
  title: string;
  description: string;
  order: number;
}

export interface AssessmentQuestion {
  id: string;
  sectionId: AssessmentSectionId;
  prompt: string;
  difficulty: AssessmentDifficulty;
  points: number;
  options: AssessmentOption[];
  correctOptionId: string;
  audio?: AssessmentQuestionAudio;
}

export interface Assessment {
  id: string;
  slug: string;
  title: string;
  description: string;
  simulationNotice: string;
  targetLevel: CEFRLevel;
  durationMinutes: number;
  sections: AssessmentSection[];
  questions: AssessmentQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface PublicAssessmentQuestion {
  id: string;
  sectionId: AssessmentSectionId;
  prompt: string;
  difficulty: AssessmentDifficulty;
  points: number;
  options: AssessmentOption[];
  audio?: AssessmentQuestionAudio;
}

export interface PublicAssessment {
  id: string;
  slug: string;
  title: string;
  description: string;
  simulationNotice: string;
  targetLevel: CEFRLevel;
  durationMinutes: number;
  sections: AssessmentSection[];
  questions: PublicAssessmentQuestion[];
  totalQuestions: number;
}

export type AttemptStatus = "IN_PROGRESS" | "FINISHED";

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  attemptToken: string;
  candidateId: string;
  status: AttemptStatus;
  startedAt: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentAttemptAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  pointsAwarded: number;
  clientSequence?: number;
  answeredAt: string;
  updatedAt: string;
}

export interface AssessmentSectionScore {
  sectionId: AssessmentSectionId;
  sectionTitle: string;
  answeredQuestions: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  attemptId: string;
  assessmentId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  estimatedLevel: CEFRLevel;
  recommendedExam: string;
  recommendedCourse: string;
  sectionScores: AssessmentSectionScore[];
  calculatedAt: string;
}

export interface AssessmentAttemptWithResult extends AssessmentAttempt {
  result?: AssessmentResult;
}
