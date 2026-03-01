import { trainingTracks } from "./delf-dalf.ts";
import type {
  Assessment,
  AssessmentAttemptAnswer,
  AssessmentResult,
  CEFRLevel,
  PublicAssessment,
} from "./assessment/types.ts";

const orderedLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const round = (value: number): number => {
  return Number.parseFloat(value.toFixed(2));
};

const getLevelWithOffset = (level: CEFRLevel, offset: number): CEFRLevel => {
  const currentIndex = orderedLevels.indexOf(level);
  const safeIndex = clamp(currentIndex + offset, 0, orderedLevels.length - 1);
  return orderedLevels[safeIndex];
};

export const mapScoreToLevel = (
  targetLevel: CEFRLevel,
  percentage: number,
): CEFRLevel => {
  if (percentage < 35) {
    return getLevelWithOffset(targetLevel, -1);
  }

  if (percentage < 60) {
    return targetLevel;
  }

  if (percentage < 80) {
    return getLevelWithOffset(targetLevel, 1);
  }

  return getLevelWithOffset(targetLevel, 2);
};

export const toPublicAssessment = (assessment: Assessment): PublicAssessment => {
  return {
    id: assessment.id,
    slug: assessment.slug,
    title: assessment.title,
    description: assessment.description,
    simulationNotice: assessment.simulationNotice,
    targetLevel: assessment.targetLevel,
    durationMinutes: assessment.durationMinutes,
    sections: assessment.sections,
    questions: assessment.questions.map((question) => ({
      id: question.id,
      sectionId: question.sectionId,
      prompt: question.prompt,
      difficulty: question.difficulty,
      points: question.points,
      options: question.options,
      audio: question.audio,
    })),
    totalQuestions: assessment.questions.length,
  };
};

export const calculateAssessmentResult = ({
  assessment,
  attemptId,
  answers,
}: {
  assessment: Assessment;
  attemptId: string;
  answers: AssessmentAttemptAnswer[];
}): AssessmentResult => {
  const answerByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  );

  const maxScore = assessment.questions.reduce(
    (accumulator, question) => accumulator + question.points,
    0,
  );

  const totalScore = assessment.questions.reduce((accumulator, question) => {
    const answer = answerByQuestionId.get(question.id);
    if (!answer) {
      return accumulator;
    }

    return accumulator + answer.pointsAwarded;
  }, 0);

  const percentage = maxScore === 0 ? 0 : round((totalScore / maxScore) * 100);
  const estimatedLevel = mapScoreToLevel(assessment.targetLevel, percentage);
  const track = trainingTracks[estimatedLevel];

  const sectionScores = assessment.sections.map((section) => {
    const sectionQuestions = assessment.questions.filter(
      (question) => question.sectionId === section.id,
    );

    const sectionMaxScore = sectionQuestions.reduce(
      (accumulator, question) => accumulator + question.points,
      0,
    );

    const sectionScore = sectionQuestions.reduce((accumulator, question) => {
      const answer = answerByQuestionId.get(question.id);
      return accumulator + (answer?.pointsAwarded ?? 0);
    }, 0);

    const answeredQuestions = sectionQuestions.filter((question) =>
      answerByQuestionId.has(question.id),
    ).length;

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      answeredQuestions,
      totalQuestions: sectionQuestions.length,
      score: sectionScore,
      maxScore: sectionMaxScore,
      percentage:
        sectionMaxScore === 0 ? 0 : round((sectionScore / sectionMaxScore) * 100),
    };
  });

  return {
    attemptId,
    assessmentId: assessment.id,
    totalScore,
    maxScore,
    percentage,
    estimatedLevel,
    recommendedExam: track.exam,
    recommendedCourse: `${track.exam} · ${track.mode}`,
    sectionScores,
    calculatedAt: new Date().toISOString(),
  };
};

export const calculateAdaptiveResult = ({
  assessment,
  attemptId,
  answers,
}: {
  assessment: Assessment;
  attemptId: string;
  answers: AssessmentAttemptAnswer[];
}): AssessmentResult => {
  // First, get the base result
  const baseResult = calculateAssessmentResult({ assessment, attemptId, answers });

  // For non test-general assessments, just return the base result
  if (assessment.slug !== "test-general") {
    return baseResult;
  }

  // Weighted section analysis for finer-grained CEFR placement
  const sectionWeights: Record<string, number> = {
    "comprension-escrita": 0.30,
    "gramatica-vocabulario": 0.25,
    "comprension-oral": 0.25,
    "expressions-tournures": 0.20,
  };

  const answerByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  );

  // Calculate weighted score
  let weightedPercentage = 0;
  let totalWeight = 0;

  for (const section of assessment.sections) {
    const weight = sectionWeights[section.id] ?? 0.25;
    const sectionQuestions = assessment.questions.filter(
      (q) => q.sectionId === section.id,
    );

    const sectionMaxScore = sectionQuestions.reduce((acc, q) => acc + q.points, 0);
    const sectionScore = sectionQuestions.reduce((acc, q) => {
      const answer = answerByQuestionId.get(q.id);
      return acc + (answer?.pointsAwarded ?? 0);
    }, 0);

    const sectionPercentage = sectionMaxScore === 0 ? 0 : (sectionScore / sectionMaxScore) * 100;
    weightedPercentage += sectionPercentage * weight;
    totalWeight += weight;
  }

  // Normalize
  const finalPercentage = totalWeight === 0 ? 0 : weightedPercentage / totalWeight;

  // Use the weighted percentage for a finer level estimation
  const estimatedLevel = mapScoreToLevel(assessment.targetLevel, finalPercentage);

  // Get the track for recommendations
  const track = trainingTracks[estimatedLevel];

  return {
    ...baseResult,
    percentage: Number.parseFloat(finalPercentage.toFixed(2)),
    estimatedLevel,
    recommendedExam: track.exam,
    recommendedCourse: `${track.exam} · ${track.mode}`,
  };
};
