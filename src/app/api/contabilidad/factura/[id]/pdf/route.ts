export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSignedUrlFromBucket } from "@/lib/supabase";

const BUCKET = "facturas";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const factura = await prisma.factura.findUnique({ where: { id } });
  if (!factura || !factura.pdfPath) {
    return NextResponse.json(
      { error: "Factura no encontrada" },
      { status: 404 }
    );
  }

  // Allow teacher/admin or student owner
  const isTeacher =
    session.user.role === "TEACHER" || session.user.role === "ADMIN";
  const isOwner = factura.alumnoId === session.user.id;

  if (!isTeacher && !isOwner) {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const url = await getSignedUrlFromBucket(factura.pdfPath, BUCKET, 3600);
  return NextResponse.redirect(url);
}
