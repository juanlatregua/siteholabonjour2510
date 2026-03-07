export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadFile, getSignedUrlFromBucket } from "@/lib/supabase";

const BUCKET = "examenes-audio";
const MAX_SIZE = 50 * 1024 * 1024; // 50MB
const ONE_YEAR = 365 * 24 * 3600;

export async function POST(request: NextRequest) {
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
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { ok: false, error: "NO_FILE", message: "No se ha enviado ningún archivo" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { ok: false, error: "FILE_TOO_LARGE", message: "El archivo supera 50MB" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "mp3";
  if (!["mp3", "wav", "ogg", "m4a"].includes(ext)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_TYPE", message: "Tipo de archivo no permitido. Usa MP3, WAV, OGG o M4A." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  const storagePath = `${session.user.id}/${timestamp}-${file.name}`;

  await uploadFile(buffer, storagePath, BUCKET);
  const signedUrl = await getSignedUrlFromBucket(storagePath, BUCKET, ONE_YEAR);

  return NextResponse.json({
    ok: true,
    url: signedUrl,
    path: storagePath,
  });
}
