import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { PublicAssessment } from "@/lib/assessment/types";

interface TestCardProps {
  assessment: PublicAssessment;
}

export default function TestCard({ assessment }: TestCardProps) {
  return (
    <Link href={`/prueba-nivel/${assessment.id}`} className="block">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0f5da0]/30 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{assessment.title}</h3>
          <Badge variant="info">{assessment.targetLevel}</Badge>
        </div>
        <p className="mt-2 text-sm text-slate-600">{assessment.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="rounded bg-slate-100 px-2 py-1">{assessment.durationMinutes} min</span>
          <span className="rounded bg-slate-100 px-2 py-1">{assessment.totalQuestions} preguntas</span>
          <span className="rounded bg-slate-100 px-2 py-1">{assessment.sections.length} secciones</span>
        </div>
      </div>
    </Link>
  );
}
