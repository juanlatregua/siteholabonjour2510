import React from "react";
import { prisma } from "@/lib/prisma";
import Card, { CardContent } from "@/components/ui/Card";
import ContabilidadClient from "./ContabilidadClient";
import ContabilidadTabs from "./ContabilidadTabs";

export default async function ContabilidadPage() {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [yearPayments, monthPayments, pendingCount, payments, facturas, invoices] =
    await Promise.all([
      prisma.payment.aggregate({
        where: { status: "CONFIRMED", confirmedAt: { gte: yearStart } },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.payment.aggregate({
        where: { status: "CONFIRMED", confirmedAt: { gte: monthStart } },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.payment.count({
        where: { status: "PENDING", method: { in: ["BIZUM", "TRANSFER"] } },
      }),
      prisma.payment.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              billingNif: true,
              billingRazonSocial: true,
              billingDireccion: true,
              billingEmail: true,
              billingType: true,
            },
          },
          invoice: { select: { id: true, number: true, storagePath: true } },
        },
      }),
      prisma.factura.findMany({
        orderBy: { fechaEmision: "desc" },
        take: 100,
        include: {
          alumno: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.invoice.findMany({
        orderBy: { issuedAt: "desc" },
        take: 100,
        include: {
          student: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);

  const yearTotal = yearPayments._sum.amount || 0;
  const monthTotal = monthPayments._sum.amount || 0;

  // Serialize dates for client component
  const serializedPayments = payments.map((p) => ({
    id: p.id,
    amount: p.amount,
    method: p.method,
    status: p.status,
    reference: p.reference,
    createdAt: p.createdAt.toISOString(),
    confirmedAt: p.confirmedAt?.toISOString() ?? null,
    student: p.student,
    invoice: p.invoice,
  }));

  const serializedFacturas = facturas.map((f) => ({
    id: f.id,
    numero: f.numero,
    fechaEmision: f.fechaEmision.toISOString(),
    clienteNombre: f.clienteNombre,
    clienteNif: f.clienteNif,
    clienteRazonSocial: f.clienteRazonSocial,
    concepto: f.concepto,
    total: f.total,
    estado: f.estado,
    pdfPath: f.pdfPath,
    alumno: f.alumno,
    pagoId: f.pagoId,
  }));

  const serializedInvoices = invoices.map((inv) => ({
    id: inv.id,
    number: inv.number,
    issuedAt: inv.issuedAt.toISOString(),
    studentName: inv.studentName,
    totalAmount: inv.totalAmount,
    storagePath: inv.storagePath,
    student: inv.student,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contabilidad</h2>
        <p className="mt-1 text-sm text-gray-500">
          Resumen financiero, facturas y exportación de datos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Facturado este año</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {yearTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {yearPayments._count} pago{yearPayments._count !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Facturado este mes</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {monthTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {monthPayments._count} pago{monthPayments._count !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Base imponible (año)</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {(yearTotal / 1.21).toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">IVA 21%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Pagos pendientes</p>
            <div className="mt-1 flex items-center gap-2">
              <p className={`text-2xl font-bold ${pendingCount > 0 ? "text-amber-600" : "text-gray-900"}`}>
                {pendingCount}
              </p>
              {pendingCount > 0 && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  Bizum/Transferencia
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <ContabilidadTabs
        payments={serializedPayments}
        facturas={serializedFacturas}
        invoices={serializedInvoices}
      />

      {/* Export section */}
      <ContabilidadClient />
    </div>
  );
}
