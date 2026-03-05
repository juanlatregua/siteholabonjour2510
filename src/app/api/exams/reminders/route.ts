import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { examSessionId, email, reminderType } = body;

  if (!examSessionId || !reminderType) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  // Try to get authenticated user
  const session = await auth();
  let userId = session?.user?.id;

  // If not logged in, find or create user by email
  if (!userId && email) {
    const user = await prisma.user.upsert({
      where: { email },
      create: { email, role: "STUDENT" },
      update: {},
    });
    userId = user.id;
  }

  if (!userId) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  // Check exam session exists
  const examSession = await prisma.examSession.findUnique({
    where: { id: examSessionId },
  });
  if (!examSession) {
    return NextResponse.json({ error: "Sesión de examen no encontrada" }, { status: 404 });
  }

  // Upsert reminder
  const reminder = await prisma.examReminder.upsert({
    where: {
      userId_examSessionId_reminderType: {
        userId,
        examSessionId,
        reminderType,
      },
    },
    create: { userId, examSessionId, reminderType },
    update: {},
  });

  return NextResponse.json({ id: reminder.id }, { status: 201 });
}
