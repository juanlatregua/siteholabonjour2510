import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendNotification, formatPhoneSpain } from "@/lib/sms";
import { smsResenaRequest } from "@/lib/sms-templates";

export async function POST(req: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "TEACHER" && role !== "ADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { lessonId } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: "lessonId requerido" }, { status: 400 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        student: { select: { id: true, name: true, phone: true } },
        review: true,
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Clase no encontrada" }, { status: 404 });
    }
    if (lesson.status !== "COMPLETED") {
      return NextResponse.json({ error: "La clase no está completada" }, { status: 400 });
    }
    if (lesson.review) {
      return NextResponse.json({ error: "Ya se pidió reseña para esta clase" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        lessonId: lesson.id,
        studentId: lesson.student.id,
        studentName: lesson.student.name,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "https://holabonjour.es";
    const linkOpinion = `${baseUrl}/opinion/${review.token}`;
    const nombre = (lesson.student.name || "").split(" ")[0] || "Alumno";

    if (lesson.student.phone) {
      await sendNotification({
        to: formatPhoneSpain(lesson.student.phone),
        body: smsResenaRequest({ nombre, linkOpinion }),
      });
    }

    return NextResponse.json({ ok: true, token: review.token });
  } catch (err) {
    console.error("[api/zona-profesor/resena]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
