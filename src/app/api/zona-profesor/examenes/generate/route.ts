export const runtime = "nodejs";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { generateExamSection } from "@/lib/examenes/ai-generation/generate-exam";
import type { GenerableNivel, GenerableSeccion } from "@/lib/examenes/ai-generation/generate-exam";

const schema = z.object({
  nivel: z.enum(["B1", "B2", "C1", "C2"]),
  seccion: z.enum(["CO", "CE", "PE", "PO"]),
});

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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Cuerpo inválido" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Nivel debe ser B1/B2/C1/C2, seccion debe ser CO/CE/PE/PO",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { nivel, seccion } = parsed.data;

  try {
    const result = await generateExamSection(
      nivel as GenerableNivel,
      seccion as GenerableSeccion
    );
    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    console.error("Error generating exam section:", e);
    return NextResponse.json(
      {
        ok: false,
        error: "GENERATION_ERROR",
        message: `Error al generar la sección: ${(e as Error).message}`,
      },
      { status: 500 }
    );
  }
}
