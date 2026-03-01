import { FiClock, FiTarget, FiAward, FiBarChart2 } from "react-icons/fi";
import FeatureBadge from "./FeatureBadge";
import TestCard from "./TestCard";
import type { PublicAssessment } from "@/lib/assessment/types";

interface LandingScreenProps {
  assessments: PublicAssessment[];
}

export default function LandingScreen({ assessments }: LandingScreenProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-[#0b3c6f] via-[#0f5da0] to-[#1b78c2] p-6 text-white shadow-lg sm:p-8">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          Prueba de Nivel de Frances
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
          Evalua tu nivel CEFR con nuestra prueba adaptativa. Comprension escrita, oral, gramatica y
          expresiones.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <FeatureBadge icon={<FiClock />} label="20-30 min" variant="dark" />
          <FeatureBadge icon={<FiTarget />} label="Adaptativo" variant="dark" />
          <FeatureBadge icon={<FiAward />} label="Certificado" variant="dark" />
          <FeatureBadge icon={<FiBarChart2 />} label="Desglose detallado" variant="dark" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Pruebas disponibles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {assessments.map((assessment) => (
            <TestCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      </section>
    </div>
  );
}
