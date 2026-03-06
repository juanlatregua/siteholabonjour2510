export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getTeacherBySlugOrDefault } from "@/lib/teacher";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  try {
    const { teacher, profile } = await getTeacherBySlugOrDefault(slug);

    return NextResponse.json({
      ok: true,
      teacherId: teacher.id,
      teacherName: profile?.displayName || teacher.name || "Isabelle",
      photo: profile?.photo || null,
      slug: profile?.slug || null,
      hourlyRate: profile?.hourlyRate || null,
      levels: profile?.levels || [],
      certificationVerified: profile?.certificationVerified || false,
    });
  } catch (err) {
    console.error("[public/preparateur] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Préparateur no encontrado" },
      { status: 404 }
    );
  }
}
