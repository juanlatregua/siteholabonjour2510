export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadMaterial } from "@/lib/supabase";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "Acceso denegado" },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const studentId = formData.get("studentId") as string;
  const title = formData.get("title") as string;

  if (!file || !studentId) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", message: "Archivo y estudiante requeridos" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `${session.user.id}/${studentId}/${Date.now()}-${file.name}`;
  const { path: storagePath } = await uploadMaterial(buffer, path);

  const type = file.type.includes("pdf")
    ? "PDF"
    : file.type.includes("audio")
      ? "AUDIO"
      : "DOC";

  const material = await prisma.material.create({
    data: {
      studentId,
      uploadedById: session.user.id,
      type,
      title: title || file.name,
      storagePath,
      sizeBytes: file.size,
    },
  });

  return NextResponse.json({ ok: true, material });
}
