import { NextResponse } from "next/server";
import { readJsonBody, toErrorResponse } from "@/lib/assessment/http";
import { startAssessmentAttempt } from "@/lib/assessment/service";

interface StartBody {
  candidateId?: string;
}

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const body = await readJsonBody<StartBody>(request);
    const { id } = await context.params;

    const payload = await startAssessmentAttempt({
      assessmentId: id,
      candidateId: body.candidateId,
    });

    return NextResponse.json({ ok: true, ...payload }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
