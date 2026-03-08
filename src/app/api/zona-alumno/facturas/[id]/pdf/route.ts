import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getInvoicePdfUrl } from "@/lib/factura";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });
  }

  // Ownership check: student or teacher/admin
  const isOwner = invoice.studentId === session.user.id;
  const isTeacher = session.user.role === "TEACHER" || session.user.role === "ADMIN";

  if (!isOwner && !isTeacher) {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const url = await getInvoicePdfUrl(invoice.id);
  return NextResponse.redirect(url);
}
