import { NextResponse } from "next/server";
import { readJsonBody, toErrorResponse } from "@/lib/assessment/http";
import {
  AssessmentServiceError,
  submitAssessmentAnswer,
} from "@/lib/assessment/service";

interface AnswerBody {
  attemptId?: string;
  attemptToken?: string;
  questionId?: string;
  selectedOptionId?: string;
  clientSequence?: number;
}

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const body = await readJsonBody<AnswerBody>(request);
    const { id } = await context.params;

    if (
      !body.attemptId ||
      !body.attemptToken ||
      !body.questionId ||
      !body.selectedOptionId
    ) {
      throw new AssessmentServiceError(
        "INVALID_PAYLOAD",
        "Faltan campos obligatorios para registrar la respuesta.",
        400,
      );
    }

    const response = await submitAssessmentAnswer({
      assessmentId: id,
      attemptId: body.attemptId,
      attemptToken: body.attemptToken,
      questionId: body.questionId,
      selectedOptionId: body.selectedOptionId,
      clientSequence: body.clientSequence,
    });

    return NextResponse.json({ ok: true, ...response });
  } catch (error) {
    return toErrorResponse(error);
  }
}
