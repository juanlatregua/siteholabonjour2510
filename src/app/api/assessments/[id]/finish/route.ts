import { NextResponse } from "next/server";
import { readJsonBody, toErrorResponse } from "@/lib/assessment/http";
import {
  AssessmentServiceError,
  finishAssessmentAttempt,
} from "@/lib/assessment/service";

interface FinishBody {
  attemptId?: string;
  attemptToken?: string;
}

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const body = await readJsonBody<FinishBody>(request);
    const { id } = await context.params;

    if (!body.attemptId || !body.attemptToken) {
      throw new AssessmentServiceError(
        "INVALID_PAYLOAD",
        "Faltan datos para finalizar el intento.",
        400,
      );
    }

    const result = await finishAssessmentAttempt({
      assessmentId: id,
      attemptId: body.attemptId,
      attemptToken: body.attemptToken,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return toErrorResponse(error);
  }
}
