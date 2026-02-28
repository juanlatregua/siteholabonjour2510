import { NextResponse } from "next/server";
import { listPublicAssessments } from "@/lib/assessment/service";
import { toErrorResponse } from "@/lib/assessment/http";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  try {
    const items = listPublicAssessments().map((assessment) => ({
      id: assessment.id,
      slug: assessment.slug,
      title: assessment.title,
      description: assessment.description,
      targetLevel: assessment.targetLevel,
      durationMinutes: assessment.durationMinutes,
      totalQuestions: assessment.totalQuestions,
      simulationNotice: assessment.simulationNotice,
    }));

    return NextResponse.json({ ok: true, items });
  } catch (error) {
    return toErrorResponse(error);
  }
}
