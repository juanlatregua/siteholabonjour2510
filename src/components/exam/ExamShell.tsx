"use client";

import { useState, useCallback } from "react";
import type {
  ExamData,
  ExamSection,
  ExamExercise,
} from "@/data/delf-a1-exam";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import ExamMCQ from "./ExamMCQ";
import ExamTextInput from "./ExamTextInput";
import HotelForm from "./HotelForm";
import WritingExercise from "./WritingExercise";

type Answers = Record<string, string | number>;

interface CorrectionResultData {
  globalScore: number;
  maxScore: number;
  correctedText: string;
  overallFeedback: string;
  nextSteps: string[];
  annotations: Array<{
    original: string;
    correction: string;
    explanation: string;
    type: string;
  }>;
}

interface ExamShellProps {
  exam: ExamData;
  /** CEFR level for AI correction API call */
  correctionLevel?: string;
  /** Task type for AI correction API call */
  correctionTaskType?: string;
  /** Min words for writing exercises (default 40) */
  minWritingWords?: number;
}

export default function ExamShell({
  exam,
  correctionLevel = "A1",
  correctionTaskType = "carte_postale",
  minWritingWords = 40,
}: ExamShellProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [writingTexts, setWritingTexts] = useState<Record<string, string>>({});
  const [showCorrection, setShowCorrection] = useState(false);
  const [writingResults, setWritingResults] = useState<Record<string, CorrectionResultData>>({});
  const [correctingId, setCorrectingId] = useState<string | null>(null);
  const [examFinished, setExamFinished] = useState(false);

  const section = exam.sections[currentSection];

  const handleMCQChange = useCallback((questionId: string, index: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  }, []);

  const handleTextChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleFormChange = useCallback((fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleWritingChange = useCallback((questionId: string, value: string) => {
    setWritingTexts((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleCorrectWriting = async (questionId: string) => {
    setCorrectingId(questionId);
    try {
      const res = await fetch("/api/corrections/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "exam-simulation@holabonjour.es",
          level: correctionLevel,
          taskType: correctionTaskType,
          inputText: writingTexts[questionId] || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setWritingResults((prev) => ({
          ...prev,
          [questionId]: {
            globalScore: data.globalScore,
            maxScore: data.maxScore,
            correctedText: data.correctedText,
            overallFeedback: data.overallFeedback,
            nextSteps: data.nextSteps || [],
            annotations: data.annotations || [],
          },
        }));
      }
    } catch {
      // silent
    } finally {
      setCorrectingId(null);
    }
  };

  const calculateSectionScore = (sec: ExamSection): { earned: number; total: number } => {
    let earned = 0;
    let total = 0;
    for (const ex of sec.exercises) {
      for (const q of ex.questions) {
        total += q.points;
        if (q.type === "mcq" && q.correctAnswer !== undefined) {
          if (answers[q.id] === q.correctAnswer) earned += q.points;
        } else if (q.type === "text" && q.correctAnswer) {
          const userAnswer = (answers[q.id] as string)?.trim().toLowerCase() || "";
          const correct = q.correctAnswer as string[];
          if (
            correct.some(
              (a) =>
                userAnswer.includes(a.toLowerCase()) ||
                a.toLowerCase().includes(userAnswer)
            ) && userAnswer.length > 0
          ) {
            earned += q.points;
          }
        }
      }
    }
    return { earned, total };
  };

  const handleFinish = () => {
    setShowCorrection(true);
    setExamFinished(true);
  };

  const nextSection = () => {
    if (currentSection < exam.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Results view
  if (examFinished) {
    const scores = exam.sections.map((s) => ({
      section: s,
      ...calculateSectionScore(s),
    }));
    const totalEarned = scores.reduce((sum, s) => sum + s.earned, 0);

    // PE scoring: form fields + writing results
    const hasForm = exam.sections.some((s) =>
      s.exercises.some((e) => e.questions.some((q) => q.type === "form"))
    );
    const peFormScore = hasForm
      ? Object.values(formValues).filter((v) => v.trim()).length >= 9
        ? 8
        : Object.values(formValues).filter((v) => v.trim()).length >= 6
        ? 5
        : 2
      : 0;
    const writingScore = Object.values(writingResults).reduce(
      (sum, r) => sum + (r.globalScore || 0),
      0
    );
    const adjustedTotal = totalEarned + peFormScore + writingScore;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Résultats de l&apos;examen</h2>
          <p className="text-gray-500">{exam.title}</p>
        </div>

        {/* Total score */}
        <div className="bg-white rounded-xl border-2 border-[#395D9F] p-6 text-center">
          <div className="text-5xl font-bold text-[#395D9F]">
            {adjustedTotal}
            <span className="text-2xl text-gray-400">/{exam.totalPoints}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {adjustedTotal >= 50
              ? "Félicitations ! Vous auriez réussi l'examen."
              : "Il faut 50/100 pour réussir. Continuez à vous entraîner !"}
          </p>
          <div className="mt-3">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className={`h-full rounded-full transition-all ${
                  adjustedTotal >= 50 ? "bg-green-500" : "bg-orange-500"
                }`}
                style={{ width: `${adjustedTotal}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scores.map(({ section: s, earned }) => {
            let sectionTotal = earned;
            if (s.id === "pe") sectionTotal = peFormScore + writingScore;

            return (
              <div key={s.id} className="bg-white rounded-xl border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <h3 className="font-semibold text-gray-800 text-sm">{s.title}</h3>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-800">{sectionTotal}</span>
                  <span className="text-gray-400 text-sm mb-0.5">/ {s.totalPoints}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full ${
                      sectionTotal / s.totalPoints >= 0.5 ? "bg-[#395D9F]" : "bg-orange-400"
                    }`}
                    style={{ width: `${(sectionTotal / s.totalPoints) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed correction */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Correction détaillée</h3>
          {exam.sections.filter((s) => s.id !== "po").map((s) => (
            <div key={s.id} className="mb-6 last:mb-0">
              <h4 className="font-semibold text-[#395D9F] text-sm mb-3">
                {s.icon} {s.titleFr}
              </h4>
              {s.exercises.map((ex) => (
                <div key={ex.id} className="mb-4 last:mb-0 pl-4 border-l-2 border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">{ex.title}</p>
                  {renderExercise(ex, true)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="bg-[#1e2d4a] rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2 text-center">Prepárate con profesoras examinadoras</h3>
          <p className="text-sm text-blue-200 mb-5 text-center">
            Nuestras profesoras son examinadoras oficiales DELF/DALF.
            Te preparan con simulacros reales y correcciones detalladas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tarifas"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#E50046] text-white font-semibold hover:bg-[#c70040] transition-colors text-sm"
            >
              Ver tarifas y packs
            </Link>
            <Link
              href="/correccion-ia"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              Prueba la corrección IA gratis
            </Link>
            <a
              href="https://wa.me/34685070304"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#25d366] text-white font-semibold hover:bg-[#1fb855] transition-colors text-sm"
            >
              Reservar clase de prueba
            </a>
          </div>
        </div>

        {/* Retry */}
        <div className="text-center">
          <button
            onClick={() => {
              setAnswers({});
              setFormValues({});
              setWritingTexts({});
              setWritingResults({});
              setShowCorrection(false);
              setExamFinished(false);
              setCurrentSection(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm text-[#395D9F] hover:underline"
          >
            Recommencer l&apos;examen
          </button>
        </div>
      </div>
    );
  }

  function renderExercise(exercise: ExamExercise, correctionMode: boolean) {
    return (
      <div className="space-y-4">
        {exercise.questions.map((q) => {
          if (q.type === "mcq" && q.options) {
            return (
              <ExamMCQ
                key={q.id}
                questionId={q.id}
                questionText={q.questionText}
                options={q.options}
                selected={answers[q.id] as number | null ?? null}
                onChange={handleMCQChange}
                correctAnswer={q.correctAnswer as number}
                showCorrection={correctionMode}
                points={q.points}
              />
            );
          }
          if (q.type === "text") {
            return (
              <ExamTextInput
                key={q.id}
                questionId={q.id}
                questionText={q.questionText}
                value={(answers[q.id] as string) || ""}
                onChange={handleTextChange}
                correctAnswers={q.correctAnswer as string[]}
                showCorrection={correctionMode}
                points={q.points}
              />
            );
          }
          if (q.type === "form") {
            return (
              <HotelForm
                key={q.id}
                values={formValues}
                onChange={handleFormChange}
                showCorrection={correctionMode}
              />
            );
          }
          if (q.type === "writing") {
            return (
              <WritingExercise
                key={q.id}
                value={writingTexts[q.id] || ""}
                onChange={(v) => handleWritingChange(q.id, v)}
                showCorrection={correctionMode}
                correctionResult={writingResults[q.id] || null}
                onCorrect={() => handleCorrectWriting(q.id)}
                correcting={correctingId === q.id}
                minWords={minWritingWords}
                instruction={q.questionText}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Section tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        {exam.sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setCurrentSection(i);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex-1 min-w-0 py-2.5 px-3 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              currentSection === i
                ? "bg-white text-[#395D9F] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="block text-lg mb-0.5">{s.icon}</span>
            <span className="hidden sm:block">{s.title}</span>
            <span className="block sm:hidden">{s.titleFr.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="bg-[#1e2d4a] text-white rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{section.icon}</span>
          <div>
            <h2 className="text-lg font-bold">{section.titleFr}</h2>
            <p className="text-sm text-blue-200">
              {section.title} — {section.duration} — {section.totalPoints} points
            </p>
          </div>
        </div>
      </div>

      {/* PO informational section */}
      {section.id === "po" ? (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-gray-700">
              <strong>Note :</strong> La production orale se réalise en face à face avec un
              examinateur. Cette section est informative pour que vous connaissiez le format
              de l&apos;épreuve.
            </p>
          </div>
          {section.exercises.map((ex) => (
            <div key={ex.id} className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{ex.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{ex.instruction}</p>
            </div>
          ))}
          <div className="bg-[#395D9F] text-white rounded-xl p-5 text-center">
            <p className="text-sm mb-3">
              Practica la expresión oral con una profesora examinadora oficial.
            </p>
            <a
              href="https://wa.me/34685070304"
              className="inline-block px-5 py-2.5 rounded-lg bg-[#E50046] font-semibold hover:bg-[#c70040] transition-colors text-sm"
            >
              Reservar sesión de práctica oral
            </a>
          </div>
        </div>
      ) : (
        /* Regular exercises */
        <div className="space-y-8">
          {section.exercises.map((ex) => (
            <div key={ex.id} className="bg-white border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{ex.title}</h3>
                <span className="text-xs text-gray-400">{ex.totalPoints} pts</span>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{ex.instruction}</p>

              {/* Audio player */}
              {ex.audioSrc && (
                <div className="mb-4">
                  <AudioPlayer src={ex.audioSrc} maxPlays={ex.audioPlays} />
                </div>
              )}

              {/* Reading passage */}
              {ex.passage && (
                <div className="bg-gray-50 border rounded-lg p-4 mb-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {ex.passage}
                </div>
              )}

              {/* Questions */}
              {renderExercise(ex, showCorrection)}
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 gap-4">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className="px-5 py-2.5 rounded-lg border text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Section précédente
        </button>

        {currentSection === exam.sections.length - 1 ? (
          <button
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-lg bg-[#E50046] text-white text-sm font-semibold hover:bg-[#c70040] transition-colors"
          >
            Terminer et corriger
          </button>
        ) : (
          <button
            onClick={nextSection}
            className="px-5 py-2.5 rounded-lg bg-[#395D9F] text-white text-sm font-semibold hover:bg-[#2e4d85] transition-colors"
          >
            Section suivante
          </button>
        )}
      </div>
    </div>
  );
}
