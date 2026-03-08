export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const format = searchParams.get("format") || "xlsx";

  const where: Record<string, unknown> = { status: "CONFIRMED" };
  if (from || to) {
    where.confirmedAt = {};
    if (from) (where.confirmedAt as Record<string, Date>).gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      (where.confirmedAt as Record<string, Date>).lte = toDate;
    }
  }

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { confirmedAt: "desc" },
    include: {
      student: { select: { name: true, email: true } },
      invoice: { select: { number: true, baseAmount: true, ivaAmount: true } },
      pack: { select: { levelRange: true, hoursTotal: true } },
    },
  });

  // Build "Pagos" sheet data
  const pagosData = payments.map((p) => ({
    "Fecha confirmación": p.confirmedAt
      ? p.confirmedAt.toLocaleDateString("es-ES")
      : "",
    "Fecha pago": p.createdAt.toLocaleDateString("es-ES"),
    Alumno: p.student.name || "-",
    Email: p.student.email,
    Método: p.method,
    Pack: p.pack?.levelRange || "-",
    "Base (€)": p.invoice?.baseAmount ?? +(p.amount / 1.21).toFixed(2),
    "IVA (€)": p.invoice?.ivaAmount ?? +(p.amount - p.amount / 1.21).toFixed(2),
    "Total (€)": p.amount,
    Factura: p.invoice?.number || "-",
    Referencia: p.reference || "-",
  }));

  // Build "Resumen" sheet
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBase = pagosData.reduce((sum, p) => sum + (p["Base (€)"] as number), 0);
  const totalIva = pagosData.reduce((sum, p) => sum + (p["IVA (€)"] as number), 0);

  const byMethod: Record<string, { count: number; total: number }> = {};
  for (const p of payments) {
    if (!byMethod[p.method]) byMethod[p.method] = { count: 0, total: 0 };
    byMethod[p.method].count++;
    byMethod[p.method].total += p.amount;
  }

  const resumenData = [
    { Concepto: "Total pagos confirmados", Cantidad: payments.length, "Importe (€)": +totalAmount.toFixed(2) },
    { Concepto: "Base imponible total", Cantidad: "", "Importe (€)": +totalBase.toFixed(2) },
    { Concepto: "IVA total", Cantidad: "", "Importe (€)": +totalIva.toFixed(2) },
    { Concepto: "", Cantidad: "", "Importe (€)": "" },
    ...Object.entries(byMethod).map(([method, data]) => ({
      Concepto: `Método: ${method}`,
      Cantidad: data.count,
      "Importe (€)": +data.total.toFixed(2),
    })),
  ];

  const wb = XLSX.utils.book_new();
  const wsPagos = XLSX.utils.json_to_sheet(pagosData);
  XLSX.utils.book_append_sheet(wb, wsPagos, "Pagos");
  const wsResumen = XLSX.utils.json_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");

  // Set column widths for Pagos
  wsPagos["!cols"] = [
    { wch: 16 }, { wch: 12 }, { wch: 25 }, { wch: 30 },
    { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 10 },
    { wch: 10 }, { wch: 18 }, { wch: 15 },
  ];

  if (format === "csv") {
    const csv = XLSX.utils.sheet_to_csv(wsPagos);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contabilidad-holabonjour.csv"`,
      },
    });
  }

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="contabilidad-holabonjour.xlsx"`,
    },
  });
}
