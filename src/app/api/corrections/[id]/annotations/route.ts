import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // Verify teacher role
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id: correctionId } = await params;
  const body = await req.json();
  const { content, scoreOverride } = body;

  if (!content?.trim()) {
    return NextResponse.json({ error: "Contenido requerido" }, { status: 400 });
  }

  const annotation = await prisma.teacherAnnotation.create({
    data: {
      correctionId,
      teacherId: session.user.id,
      content: content.trim(),
      scoreOverride: scoreOverride ? JSON.stringify(scoreOverride) : null,
    },
  });

  return NextResponse.json({ id: annotation.id }, { status: 201 });
}
