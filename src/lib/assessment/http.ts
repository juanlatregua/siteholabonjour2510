import { NextResponse } from "next/server";
import { AssessmentServiceError } from "@/lib/assessment/service";

export const readJsonBody = async <T>(request: Request): Promise<T> => {
  try {
    const payload = (await request.json()) as T;
    return payload;
  } catch {
    throw new AssessmentServiceError(
      "INVALID_JSON",
      "El cuerpo de la solicitud no es JSON valido.",
      400,
    );
  }
};

export const toErrorResponse = (error: unknown): NextResponse => {
  if (error instanceof AssessmentServiceError) {
    return NextResponse.json(
      {
        ok: false,
        error: error.code,
        message: error.message,
      },
      { status: error.status },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      error: "INTERNAL_ERROR",
      message: "Error interno de evaluacion.",
    },
    { status: 500 },
  );
};
