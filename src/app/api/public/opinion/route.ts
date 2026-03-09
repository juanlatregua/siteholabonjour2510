import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token, rating, comment, studentName } = await req.json();

    if (!token || !rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Token y valoración (1-5) son obligatorios" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({ where: { token } });
    if (!review) {
      return NextResponse.json({ error: "Enlace no válido" }, { status: 404 });
    }
    if (review.submittedAt) {
      return NextResponse.json({ error: "Ya recibimos tu opinión" }, { status: 409 });
    }

    await prisma.review.update({
      where: { token },
      data: {
        rating,
        comment: comment?.trim() || null,
        studentName: studentName?.trim() || review.studentName,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/public/opinion]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }

  const review = await prisma.review.findUnique({
    where: { token },
    select: { studentName: true, submittedAt: true, rating: true },
  });

  if (!review) {
    return NextResponse.json({ error: "Enlace no válido" }, { status: 404 });
  }

  return NextResponse.json({
    studentName: review.studentName,
    alreadySubmitted: !!review.submittedAt,
  });
}
