import { NextResponse } from "next/server";
import {
  AssessmentServiceError,
  getAssessmentResult,
} from "@/lib/assessment/service";
import { toErrorResponse } from "@/lib/assessment/http";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; attemptId: string }> },
): Promise<NextResponse> {
  try {
    const { id, attemptId } = await context.params;
    const url = new URL(request.url);
    const attemptToken = url.searchParams.get("token");

    if (!attemptToken) {
      throw new AssessmentServiceError(
        "TOKEN_REQUIRED",
        "Debes incluir ?token=... para consultar el resultado.",
        400,
      );
    }

    const result = await getAssessmentResult({
      assessmentId: id,
      attemptId,
      attemptToken,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return toErrorResponse(error);
  }
}
