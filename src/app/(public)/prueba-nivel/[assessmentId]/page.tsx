import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssessmentFlow from "@/components/AssessmentFlow";
import { getPublicAssessment } from "@/lib/assessment/service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}): Promise<Metadata> {
  try {
    const { assessmentId } = await params;
    const assessment = getPublicAssessment(assessmentId);

    return {
      title: `${assessment.title}`,
      description: assessment.description,
      alternates: {
        canonical: `/prueba-nivel/${assessment.id}`,
      },
    };
  } catch {
    return {
      title: "Prueba de nivel",
    };
  }
}

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = await params;

  try {
    const assessment = getPublicAssessment(assessmentId);

    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <AssessmentFlow assessment={assessment} />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
