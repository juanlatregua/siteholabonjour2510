"use client";

import { useState } from "react";
import AssessmentFlow from "@/components/AssessmentFlow";
import CinematicIntro from "@/components/le-voyage/CinematicIntro";
import PassportScreen from "@/components/le-voyage/PassportScreen";
import DestinationScreen from "@/components/le-voyage/DestinationScreen";
import ArrivalScreen from "@/components/le-voyage/ArrivalScreen";
import type {
  AssessmentResult,
  PublicAssessment,
} from "@/lib/assessment/types";

type VoyageStep =
  | "intro"
  | "passport"
  | "destinations"
  | "assessment"
  | "arrival";

interface LeadData {
  name: string;
  email: string;
  objetivo: string;
}

interface LeVoyageFlowProps {
  assessments: PublicAssessment[];
}

export default function LeVoyageFlow({ assessments }: LeVoyageFlowProps) {
  const [step, setStep] = useState<VoyageStep>("intro");
  const [, setLeadData] = useState<LeadData | null>(null);
  const [selectedAssessment, setSelectedAssessment] =
    useState<PublicAssessment | null>(null);
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);

  const handleIntroStart = () => {
    setStep("passport");
  };

  const handlePassportComplete = (data: LeadData) => {
    setLeadData(data);
    setStep("destinations");
  };

  const handleDestinationSelect = (assessment: PublicAssessment) => {
    setSelectedAssessment(assessment);
    setStep("assessment");
  };

  const handleAssessmentResult = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setStep("arrival");
  };

  const handleRestart = () => {
    setSelectedAssessment(null);
    setAssessmentResult(null);
    setStep("destinations");
  };

  return (
    <div className="relative min-h-screen bg-[#1a1a2e]">
      {step === "intro" && <CinematicIntro onStart={handleIntroStart} />}

      {step === "passport" && (
        <PassportScreen onComplete={handlePassportComplete} />
      )}

      {step === "destinations" && (
        <DestinationScreen
          assessments={assessments}
          onSelect={handleDestinationSelect}
        />
      )}

      {step === "assessment" && selectedAssessment && (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <AssessmentFlow
            assessment={selectedAssessment}
            theme="cinematic"
            onResult={handleAssessmentResult}
          />
        </div>
      )}

      {step === "arrival" && assessmentResult && selectedAssessment && (
        <ArrivalScreen
          result={assessmentResult}
          assessment={selectedAssessment}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
