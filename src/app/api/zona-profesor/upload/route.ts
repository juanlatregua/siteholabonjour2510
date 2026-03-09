export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadMaterial, getSignedUrl } from "@/lib/supabase";

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

  const MAX_SIZE = 20 * 1024 * 1024; // 20MB
  const ALLOWED_TYPES = new Set([
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    "video/mp4",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

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

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { ok: false, error: "FILE_TOO_LARGE", message: "El archivo supera el límite de 20MB" },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_TYPE", message: "Tipo de archivo no permitido" },
      { status: 400 }
    );
  }

  // Sanitize filename to prevent path traversal
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/\.{2,}/g, "_");

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `${session.user.id}/${studentId}/${Date.now()}-${safeName}`;
  const { path: storagePath } = await uploadMaterial(buffer, path);

  // Generate a signed URL for download (7 days expiry)
  const publicUrl = await getSignedUrl(storagePath, 7 * 24 * 3600);

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
      publicUrl,
      sizeBytes: file.size,
    },
  });

  return NextResponse.json({ ok: true, material });
}
