import { NextResponse } from "next/server";
import { getStudentDashboard } from "@/lib/student-zone-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await params;
  const dashboard = getStudentDashboard(studentId);

  if (!dashboard) {
    return NextResponse.json(
      { ok: false, error: "Alumno no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: dashboard });
}
