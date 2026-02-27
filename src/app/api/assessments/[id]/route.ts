import { NextResponse } from "next/server";
import { getPublicAssessment } from "@/lib/assessment/service";
import { toErrorResponse } from "@/lib/assessment/http";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const assessment = getPublicAssessment(id);
    return NextResponse.json({ ok: true, assessment });
  } catch (error) {
    return toErrorResponse(error);
  }
}
