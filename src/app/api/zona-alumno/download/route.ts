export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSignedUrl } from "@/lib/supabase";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", message: "Se requiere el parametro path" },
      { status: 400 }
    );
  }

  // Verify the material belongs to this student
  const material = await prisma.material.findFirst({
    where: {
      storagePath: path,
      studentId: session.user.id,
    },
  });

  if (!material) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN", message: "No tienes acceso a este material" },
      { status: 403 }
    );
  }

  try {
    const signedUrl = await getSignedUrl(path, 3600);
    return NextResponse.redirect(signedUrl);
  } catch {
    return NextResponse.json(
      { ok: false, error: "DOWNLOAD_ERROR", message: "No se pudo generar el enlace de descarga" },
      { status: 500 }
    );
  }
}
