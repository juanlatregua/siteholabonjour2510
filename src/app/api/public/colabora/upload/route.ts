export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/supabase";

const BUCKET = "candidaturas";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No se ha enviado ningún archivo" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "El archivo supera el límite de 5 MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Formato no permitido. Usa PDF, JPG o PNG." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${timestamp}-${safeName}`;

    const result = await uploadFile(buffer, path, BUCKET);

    return NextResponse.json({ ok: true, path: result.path });
  } catch (err) {
    console.error("[colabora/upload] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error al subir el archivo. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
