import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStudentDashboard } from "@/lib/student-zone-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "No autenticado" },
      { status: 401 }
    );
  }

  const { studentId } = await params;

  // Students can only access their own data; teachers/admins can access any
  const role = (session.user as { role?: string }).role;
  if (session.user.id !== studentId && role !== "TEACHER" && role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "Acceso denegado" },
      { status: 403 }
    );
  }

  const dashboard = getStudentDashboard(studentId);

  if (!dashboard) {
    return NextResponse.json(
      { ok: false, error: "Alumno no encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: dashboard });
}
