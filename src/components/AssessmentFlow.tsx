"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AssessmentAudioPlayer from "@/components/AssessmentAudioPlayer";
import type {
  AssessmentResult,
  PublicAssessment,
  AssessmentSection,
  PublicAssessmentQuestion,
} from "@/lib/assessment/types";

type FlowStep = "intro" | "questions" | "review" | "result";
type QuestionSaveState = "idle" | "saving" | "saved" | "error";

type DraftState = {
  attemptId: string;
  attemptToken: string;
  answers: Record<string, string>;
  currentSectionIndex: number;
  step: FlowStep;
  result?: AssessmentResult;
};

const makeStorageKey = (assessmentId: string): string =>
  `hb_assessment_progress_${assessmentId}`;

const groupQuestionsBySection = (
  assessment: PublicAssessment,
): Array<{ section: AssessmentSection; questionIds: string[] }> => {
  return [...assessment.sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      section,
      questionIds: assessment.questions
        .filter((question) => question.sectionId === section.id)
        .map((question) => question.id),
    }));
};

const getQuestionSaveLabel = (state: QuestionSaveState): string => {
  if (state === "saving") {
    return "Guardando respuesta...";
  }

  if (state === "saved") {
    return "Respuesta guardada.";
  }

  if (state === "error") {
    return "No se pudo guardar. Vuelve a seleccionar una opcion.";
  }

  return "";
};

const getQuestionSaveClassName = (state: QuestionSaveState, cinematic: boolean): string => {
  if (cinematic) {
    if (state === "saving") {
      return "border-[#e8b865]/30 bg-[#e8b865]/10 text-[#e8b865]";
    }
    if (state === "saved") {
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    }
    if (state === "error") {
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    }
    return "";
  }

  if (state === "saving") {
    return "border-blue-200 bg-blue-50 text-blue-800";
  }

  if (state === "saved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (state === "error") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  return "";
};

interface AssessmentFlowProps {
  assessment: PublicAssessment;
  theme?: "default" | "cinematic";
  onResult?: (result: AssessmentResult) => void;
}

const AssessmentFlow = ({ assessment, theme = "default", onResult }: AssessmentFlowProps) => {
  const cinematic = theme === "cinematic";
  const [candidateId, setCandidateId] = useState("");
  const [step, setStep] = useState<FlowStep>("intro");
  const [attemptId, setAttemptId] = useState("");
  const [attemptToken, setAttemptToken] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [questionSaveState, setQuestionSaveState] = useState<
    Record<string, QuestionSaveState>
  >({});

  const answerSequenceRef = useRef<Record<string, number>>({});
  const inflightControllersRef = useRef<Record<string, AbortController>>({});
  const saveStateResetTimersRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const answersRef = useRef<Record<string, string>>({});

  const storageKey = useMemo(() => makeStorageKey(assessment.id), [assessment.id]);
  const sectionGroups = useMemo(() => groupQuestionsBySection(assessment), [assessment]);

  const currentSection = sectionGroups[currentSectionIndex];

  const currentSectionQuestions = useMemo(() => {
    if (!currentSection) {
      return [] as PublicAssessmentQuestion[];
    }

    return assessment.questions.filter(
      (question) => question.sectionId === currentSection.section.id,
    );
  }, [assessment.questions, currentSection]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const totalQuestions = assessment.questions.length;
  const unansweredCount = totalQuestions - answeredCount;

  const overallProgress =
    totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  const currentSectionAnsweredCount = useMemo(() => {
    return currentSectionQuestions.filter((question) => Boolean(answers[question.id])).length;
  }, [answers, currentSectionQuestions]);

  const hasPendingSaves = useMemo(() => {
    return Object.values(questionSaveState).some((status) => status === "saving");
  }, [questionSaveState]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rawDraft = window.localStorage.getItem(storageKey);
    if (!rawDraft) {
      return;
    }

    try {
      const parsed = JSON.parse(rawDraft) as DraftState;
      if (!parsed.attemptId || !parsed.attemptToken) {
        return;
      }

      setAttemptId(parsed.attemptId);
      setAttemptToken(parsed.attemptToken);
      setAnswers(parsed.answers ?? {});
      setCurrentSectionIndex(parsed.currentSectionIndex ?? 0);
      setStep(parsed.step ?? "questions");
      setResult(parsed.result ?? null);
      setHasDraft(true);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined" || !attemptId || !attemptToken) {
      return;
    }

    const draft: DraftState = {
      attemptId,
      attemptToken,
      answers,
      currentSectionIndex,
      step,
      result: result ?? undefined,
    };

    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [attemptId, attemptToken, answers, currentSectionIndex, step, result, storageKey]);

  useEffect(() => {
    return () => {
      Object.values(inflightControllersRef.current).forEach((controller) => {
        controller.abort();
      });
      Object.values(saveStateResetTimersRef.current).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  const resetTransientQuestionState = () => {
    Object.values(inflightControllersRef.current).forEach((controller) => {
      controller.abort();
    });
    inflightControllersRef.current = {};

    Object.values(saveStateResetTimersRef.current).forEach((timer) => {
      clearTimeout(timer);
    });
    saveStateResetTimersRef.current = {};

    answerSequenceRef.current = {};
    setQuestionSaveState({});
  };

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }

    resetTransientQuestionState();

    setHasDraft(false);
    setAttemptId("");
    setAttemptToken("");
    setAnswers({});
    setCurrentSectionIndex(0);
    setResult(null);
    setStep("intro");
    setMessage("");
  };

  const startAttempt = async () => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/assessments/${assessment.id}/start`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ candidateId }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        attemptId?: string;
        attemptToken?: string;
        message?: string;
      };

      if (!response.ok || !payload.ok || !payload.attemptId || !payload.attemptToken) {
        throw new Error(payload.message ?? "No se pudo iniciar la prueba.");
      }

      resetTransientQuestionState();
      setAttemptId(payload.attemptId);
      setAttemptToken(payload.attemptToken);
      setAnswers({});
      setCurrentSectionIndex(0);
      setResult(null);
      setStep("questions");
      setHasDraft(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "No se pudo iniciar la prueba.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitAnswer = async (
    questionId: string,
    selectedOptionId: string,
  ): Promise<void> => {
    if (!attemptId || !attemptToken) {
      setMessage("Primero debes iniciar la prueba.");
      return;
    }

    const previousOptionId = answersRef.current[questionId];
    const optimisticAnswers = {
      ...answersRef.current,
      [questionId]: selectedOptionId,
    };

    answersRef.current = optimisticAnswers;
    setAnswers(optimisticAnswers);

    const nextSequence = (answerSequenceRef.current[questionId] ?? 0) + 1;
    answerSequenceRef.current[questionId] = nextSequence;

    if (saveStateResetTimersRef.current[questionId]) {
      clearTimeout(saveStateResetTimersRef.current[questionId]);
      delete saveStateResetTimersRef.current[questionId];
    }

    const previousController = inflightControllersRef.current[questionId];
    if (previousController) {
      previousController.abort();
    }

    const controller = new AbortController();
    inflightControllersRef.current[questionId] = controller;

    setQuestionSaveState((current) => ({
      ...current,
      [questionId]: "saving",
    }));

    try {
      const response = await fetch(`/api/assessments/${assessment.id}/answer`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          attemptId,
          attemptToken,
          questionId,
          selectedOptionId,
          clientSequence: nextSequence,
        }),
        signal: controller.signal,
      });

      const payload = (await response.json()) as {
        ok: boolean;
        saved?: boolean;
        message?: string;
      };

      if (answerSequenceRef.current[questionId] !== nextSequence) {
        return;
      }

      if (!response.ok || !payload.ok || payload.saved === false) {
        throw new Error(payload.message ?? "No se pudo guardar la respuesta.");
      }

      setQuestionSaveState((current) => ({
        ...current,
        [questionId]: "saved",
      }));

      saveStateResetTimersRef.current[questionId] = setTimeout(() => {
        if (answerSequenceRef.current[questionId] !== nextSequence) {
          return;
        }

        setQuestionSaveState((current) => ({
          ...current,
          [questionId]: "idle",
        }));
      }, 1200);

      setMessage("");
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      if (answerSequenceRef.current[questionId] !== nextSequence) {
        return;
      }

      const rollbackAnswers = { ...answersRef.current };
      if (typeof previousOptionId === "string") {
        rollbackAnswers[questionId] = previousOptionId;
      } else {
        delete rollbackAnswers[questionId];
      }

      answersRef.current = rollbackAnswers;
      setAnswers(rollbackAnswers);

      setQuestionSaveState((current) => ({
        ...current,
        [questionId]: "error",
      }));

      const errorMessage =
        error instanceof Error ? error.message : "No se pudo guardar la respuesta.";
      setMessage(errorMessage);
    } finally {
      if (inflightControllersRef.current[questionId] === controller) {
        delete inflightControllersRef.current[questionId];
      }
    }
  };

  const finishAttempt = async () => {
    if (!attemptId || !attemptToken) {
      setMessage("No hay intento activo.");
      return;
    }

    if (hasPendingSaves) {
      setMessage("Estamos guardando respuestas. Espera un momento para finalizar.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/assessments/${assessment.id}/finish`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ attemptId, attemptToken }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        result?: AssessmentResult;
        message?: string;
      };

      if (!response.ok || !payload.ok || !payload.result) {
        throw new Error(payload.message ?? "No se pudo finalizar el intento.");
      }

      setResult(payload.result);
      setMessage("");
      setQuestionSaveState({});

      if (onResult) {
        onResult(payload.result);
      } else {
        setStep("result");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "No se pudo finalizar el intento.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <section
        className={
          cinematic
            ? "rounded-2xl border border-white/10 bg-[#1a1a2e] p-4 text-white shadow-[0_10px_26px_rgba(232,184,101,0.1)] sm:p-5"
            : "rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-[#0f4f8a] via-[#0f5da0] to-[#1b78c2] p-4 text-white shadow-[0_10px_26px_rgba(15,93,160,0.18)] sm:p-5"
        }
      >
        <p
          className={
            cinematic
              ? "inline-flex rounded-full border border-[#e8b865]/30 bg-[#e8b865]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e8b865]"
              : "inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-100"
          }
        >
          Simulacion orientativa
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{assessment.title}</h2>
        <p className={cinematic ? "mt-2 text-sm text-[#f1f5f9]/80" : "mt-2 text-sm text-cyan-50/95"}>{assessment.description}</p>
        <p className={cinematic ? "mt-3 text-xs text-[#f1f5f9]/60" : "mt-3 text-xs text-cyan-100/90"}>{assessment.simulationNotice}</p>
      </section>

      {step === "intro" && (
        <section
          className={
            cinematic
              ? "rounded-2xl border border-white/10 bg-[#1a1a2e] p-4 shadow-[0_6px_18px_rgba(232,184,101,0.07)] sm:p-5"
              : "rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.07)] sm:p-5"
          }
        >
          <h3 className={cinematic ? "text-lg font-semibold text-[#f1f5f9]" : "text-lg font-semibold text-slate-900"}>1. Antes de empezar</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <p className={cinematic ? "rounded-xl bg-white/5 px-3 py-2 text-sm text-[#f1f5f9]/80" : "rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"}>
              Duracion estimada: <strong>{assessment.durationMinutes} min</strong>
            </p>
            <p className={cinematic ? "rounded-xl bg-white/5 px-3 py-2 text-sm text-[#f1f5f9]/80" : "rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"}>
              Preguntas: <strong>{assessment.totalQuestions}</strong>
            </p>
            <p className={cinematic ? "rounded-xl bg-white/5 px-3 py-2 text-sm text-[#f1f5f9]/80" : "rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"}>
              Resultado: <strong>nota + nivel + plan</strong>
            </p>
          </div>

          <label
            className={cinematic ? "mt-5 block text-sm font-medium text-[#f1f5f9]/80" : "mt-5 block text-sm font-medium text-slate-700"}
            htmlFor="candidateId"
          >
            Nombre o alias (opcional)
          </label>
          <input
            id="candidateId"
            value={candidateId}
            onChange={(event) => setCandidateId(event.target.value)}
            className={
              cinematic
                ? "mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white shadow-sm placeholder:text-white/30 focus:border-[#e8b865] focus:outline-none focus:ring-2 focus:ring-[#e8b865]/20"
                : "mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm shadow-sm focus:border-[#0f5da0] focus:outline-none focus:ring-2 focus:ring-[#0f5da0]/20"
            }
            placeholder="Ejemplo: maria.g"
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void startAttempt()}
              disabled={isSubmitting}
              className={
                cinematic
                  ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-5 py-3 text-sm font-semibold text-[#1a1a2e] transition hover:bg-[#d4a555] disabled:opacity-60"
                  : "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4d84] disabled:opacity-60"
              }
            >
              {isSubmitting ? "Iniciando..." : "Empezar prueba"}
            </button>

            {hasDraft && (
              <button
                type="button"
                onClick={() => setStep(result ? "result" : "questions")}
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-[#f1f5f9] transition hover:bg-white/5"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                }
              >
                Continuar intento guardado
              </button>
            )}
          </div>
        </section>
      )}

      {step === "questions" && currentSection && (
        <section
          className={
            cinematic
              ? "space-y-3.5 rounded-2xl border border-white/10 bg-[#1a1a2e] p-4 shadow-[0_6px_18px_rgba(232,184,101,0.07)] sm:p-5"
              : "space-y-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.07)] sm:p-5"
          }
        >
          <div
            className={
              cinematic
                ? "-mx-4 sticky top-0 z-20 border-b border-white/10 bg-[#1a1a2e]/95 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5"
                : "-mx-4 sticky top-[84px] z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5"
            }
          >
            <div className="flex items-center justify-between gap-2">
              <p
                className={
                  cinematic
                    ? "inline-flex rounded-full bg-[#e8b865]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e8b865]"
                    : "inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f5da0]"
                }
              >
                Paso 2 de 4
              </p>
              <p className={cinematic ? "text-xs font-medium text-[#f1f5f9]/60" : "text-xs font-medium text-slate-600"}>
                Bloque {currentSectionIndex + 1}/{sectionGroups.length}
              </p>
            </div>
            <div className={cinematic ? "mt-2 flex items-center justify-between text-xs text-[#f1f5f9]/60" : "mt-2 flex items-center justify-between text-xs text-slate-600"}>
              <span>
                Progreso total: {answeredCount}/{totalQuestions}
              </span>
              <span>
                Bloque: {currentSectionAnsweredCount}/{currentSectionQuestions.length}
              </span>
            </div>
            <div className={cinematic ? "mt-2 h-2.5 w-full rounded-full bg-white/10" : "mt-2 h-2.5 w-full rounded-full bg-slate-200"}>
              <div
                className={
                  cinematic
                    ? "h-2.5 rounded-full bg-gradient-to-r from-[#e8b865] to-[#d4a555] transition-all"
                    : "h-2.5 rounded-full bg-gradient-to-r from-[#0f5da0] to-cyan-500 transition-all"
                }
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="pt-1">
            <h3 className={cinematic ? "text-lg font-semibold text-[#f1f5f9]" : "text-lg font-semibold text-slate-900"}>
              2. Preguntas por bloques · {currentSection.section.title}
            </h3>
            <p className={cinematic ? "mt-1 text-sm text-[#f1f5f9]/60" : "mt-1 text-sm text-slate-600"}>{currentSection.section.description}</p>
          </div>

          <div className="space-y-4">
            {currentSectionQuestions.map((question, index) => {
              const status = questionSaveState[question.id] ?? "idle";
              return (
                <article
                  key={question.id}
                  className={
                    cinematic
                      ? "rounded-xl border border-white/10 bg-white/5 p-3.5 shadow-[0_3px_10px_rgba(0,0,0,0.2)]"
                      : "rounded-xl border border-slate-200 bg-slate-50/40 p-3.5 shadow-[0_3px_10px_rgba(15,23,42,0.04)]"
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={cinematic ? "text-sm font-semibold leading-relaxed text-[#f1f5f9]" : "text-sm font-semibold leading-relaxed text-slate-900"}>
                      {index + 1}. {question.prompt}
                    </p>
                    <span
                      className={
                        cinematic
                          ? "shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-[#e8b865]"
                          : "shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
                      }
                    >
                      {question.points} pt
                    </span>
                  </div>

                  {question.sectionId === "comprension-oral" && (
                    <AssessmentAudioPlayer audio={question.audio} fallbackText={question.prompt} />
                  )}

                  <div className="mt-3 space-y-2">
                    {question.options.map((option) => {
                      const checked = answers[question.id] === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                            cinematic
                              ? checked
                                ? "border-[#e8b865] bg-[#e8b865]/10 shadow-sm"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                              : checked
                                ? "border-[#0f5da0] bg-cyan-50 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            checked={checked}
                            onChange={() => void submitAnswer(question.id, option.id)}
                            name={question.id}
                            className="mt-1"
                          />
                          <span className={cinematic ? "text-[#f1f5f9]" : "text-slate-700"}>{option.text}</span>
                        </label>
                      );
                    })}
                  </div>

                  {status !== "idle" && (
                    <p
                      className={`mt-3 rounded-lg border px-3 py-2 text-xs font-medium ${getQuestionSaveClassName(
                        status,
                        cinematic,
                      )}`}
                      aria-live="polite"
                    >
                      {getQuestionSaveLabel(status)}
                    </p>
                  )}
                </article>
              );
            })}
          </div>

          <div className="hidden sm:flex sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setCurrentSectionIndex((value) => Math.max(0, value - 1))}
              disabled={currentSectionIndex === 0}
              className={
                cinematic
                  ? "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-[#f1f5f9] disabled:opacity-40"
                  : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40"
              }
            >
              Bloque anterior
            </button>

            {currentSectionIndex < sectionGroups.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentSectionIndex((value) =>
                    Math.min(sectionGroups.length - 1, value + 1),
                  )
                }
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 py-2 text-sm font-semibold text-[#1a1a2e]"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-4 py-2 text-sm font-semibold text-white"
                }
              >
                Siguiente bloque
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep("review")}
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 py-2 text-sm font-semibold text-[#1a1a2e]"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
                }
              >
                Revisar y finalizar
              </button>
            )}
          </div>

          <div
            className={
              cinematic
                ? "sticky bottom-0 z-10 mt-3 rounded-xl border border-white/10 bg-[#1a1a2e]/95 p-2.5 shadow-[0_-4px_14px_rgba(232,184,101,0.1)] backdrop-blur sm:hidden"
                : "sticky bottom-0 z-10 mt-3 rounded-xl border border-slate-200 bg-white/95 p-2.5 shadow-[0_-4px_14px_rgba(15,93,160,0.1)] sm:hidden"
            }
          >
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentSectionIndex((value) => Math.max(0, value - 1))}
                disabled={currentSectionIndex === 0}
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-[#f1f5f9] disabled:opacity-40"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 disabled:opacity-40"
                }
              >
                Anterior
              </button>

              {currentSectionIndex < sectionGroups.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSectionIndex((value) =>
                      Math.min(sectionGroups.length - 1, value + 1),
                    )
                  }
                  className={
                    cinematic
                      ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 text-sm font-semibold text-[#1a1a2e]"
                      : "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-4 text-sm font-semibold text-white"
                  }
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep("review")}
                  className={
                    cinematic
                      ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 text-sm font-semibold text-[#1a1a2e]"
                      : "inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white"
                  }
                >
                  Revisar
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {step === "review" && (
        <section
          className={
            cinematic
              ? "rounded-2xl border border-white/10 bg-[#1a1a2e] p-4 shadow-[0_6px_18px_rgba(232,184,101,0.07)] sm:p-5"
              : "rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.07)] sm:p-5"
          }
        >
          <p className={cinematic ? "text-xs font-semibold uppercase tracking-[0.08em] text-[#e8b865]" : "text-xs font-semibold uppercase tracking-[0.08em] text-[#0f5da0]"}>Paso 3 de 4</p>
          <h3 className={cinematic ? "mt-1 text-lg font-semibold text-[#f1f5f9]" : "mt-1 text-lg font-semibold text-slate-900"}>Revision final</h3>
          <p className={cinematic ? "mt-2 text-sm text-[#f1f5f9]/80" : "mt-2 text-sm text-slate-700"}>
            Completadas: {answeredCount}/{totalQuestions}. Pendientes: {unansweredCount}.
          </p>

          <ul className={cinematic ? "mt-4 space-y-2 text-sm text-[#f1f5f9]/80" : "mt-4 space-y-2 text-sm text-slate-700"}>
            {sectionGroups.map((entry) => {
              const done = entry.questionIds.filter((id) => answers[id]).length;
              return (
                <li key={entry.section.id} className={cinematic ? "rounded-lg bg-white/5 px-3 py-2" : "rounded-lg bg-slate-50 px-3 py-2"}>
                  {entry.section.title}: {done}/{entry.questionIds.length}
                </li>
              );
            })}
          </ul>

          {hasPendingSaves && (
            <p
              className={
                cinematic
                  ? "mt-4 rounded-lg border border-[#e8b865]/30 bg-[#e8b865]/10 px-3 py-2 text-sm text-[#e8b865]"
                  : "mt-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800"
              }
            >
              Estamos guardando respuestas. En cuanto termine, podras finalizar.
            </p>
          )}

          <div className="mt-5 hidden flex-col gap-3 sm:flex sm:flex-row">
            <button
              type="button"
              onClick={() => setStep("questions")}
              className={
                cinematic
                  ? "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-[#f1f5f9]"
                  : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              }
            >
              Volver a preguntas
            </button>
            <button
              type="button"
              onClick={() => void finishAttempt()}
              disabled={isSubmitting || hasPendingSaves}
              className={
                cinematic
                  ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 py-2 text-sm font-semibold text-[#1a1a2e] disabled:opacity-60"
                  : "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              }
            >
              {isSubmitting
                ? "Calculando..."
                : hasPendingSaves
                  ? "Guardando respuestas..."
                  : "Finalizar y ver resultado"}
            </button>
          </div>

          <div
            className={
              cinematic
                ? "sticky bottom-0 z-10 mt-3 rounded-xl border border-white/10 bg-[#1a1a2e]/95 p-2.5 shadow-[0_-4px_14px_rgba(232,184,101,0.1)] backdrop-blur sm:hidden"
                : "sticky bottom-0 z-10 mt-3 rounded-xl border border-slate-200 bg-white/95 p-2.5 shadow-[0_-4px_14px_rgba(15,93,160,0.1)] sm:hidden"
            }
          >
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStep("questions")}
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 text-sm font-semibold text-[#f1f5f9]"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700"
                }
              >
                Volver
              </button>
              <button
                type="button"
                onClick={() => void finishAttempt()}
                disabled={isSubmitting || hasPendingSaves}
                className={
                  cinematic
                    ? "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8b865] px-4 text-sm font-semibold text-[#1a1a2e] disabled:opacity-60"
                    : "inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-4 text-sm font-semibold text-white disabled:opacity-60"
                }
              >
                {isSubmitting ? "Calculando" : hasPendingSaves ? "Guardando" : "Finalizar"}
              </button>
            </div>
          </div>
        </section>
      )}

      {step === "result" && result && (
        <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-[0_6px_18px_rgba(5,150,105,0.1)] sm:p-5">
          <p className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
            Paso 4 de 4
          </p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-900">
            Nota: {result.totalScore}/{result.maxScore} ({result.percentage}%)
          </h3>
          <p className="mt-2 text-sm text-emerald-900">
            Nivel estimado: <strong>{result.estimatedLevel}</strong>
          </p>
          <p className="text-sm text-emerald-900">
            Recomendacion: <strong>{result.recommendedExam}</strong>
          </p>
          <p className="text-sm text-emerald-900">{result.recommendedCourse}</p>

          <div className="mt-4 space-y-2 rounded-2xl border border-emerald-100 bg-white p-4">
            {result.sectionScores.map((section) => (
              <p key={section.sectionId} className="text-sm text-slate-700">
                {section.sectionTitle}: {section.score}/{section.maxScore} ({section.percentage}% )
              </p>
            ))}
          </div>

          <p className="mt-4 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-900">
            Siguiente paso: contratar pack y reservar agenda. Pago activo por transferencia.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/contratar?nivel=${result.estimatedLevel}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Contratar pack recomendado
            </Link>
            <Link
              href={`/cursos/preparacion-delf-dalf?nivel=${result.estimatedLevel}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-900"
            >
              Ver plan detallado
            </Link>
            <button
              type="button"
              onClick={clearDraft}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-900"
            >
              Empezar otro intento
            </button>
          </div>
        </section>
      )}

      {message && (
        <p
          className={
            cinematic
              ? "rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300"
              : "rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AssessmentFlow;
