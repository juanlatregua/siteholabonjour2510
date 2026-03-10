import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, passwordHash: true, email: true },
  });

  if (!user || (user.role !== "TEACHER" && user.role !== "ADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json({ error: "La nueva contraseña debe tener al menos 8 caracteres." }, { status: 400 });
  }

  // Get the current hash — DB first, env fallback
  let storedHash = user.passwordHash ?? null;
  if (!storedHash) {
    const envKey = `TEACHER_PASSWORD_HASH_${user.email.split("@")[0].toUpperCase().replace(/[^A-Z]/g, "")}`;
    storedHash = process.env[envKey] ?? null;
  }

  if (!storedHash) {
    return NextResponse.json({ error: "No se encontró la contraseña actual. Contacta con soporte." }, { status: 500 });
  }

  const valid = await bcrypt.compare(currentPassword, storedHash);
  if (!valid) {
    return NextResponse.json({ error: "La contraseña actual es incorrecta." }, { status: 400 });
  }

  const newHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: newHash },
  });

  return NextResponse.json({ ok: true });
}
