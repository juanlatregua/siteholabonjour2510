import React from "react";
import { prisma } from "@/lib/prisma";
import Card, { CardContent } from "@/components/ui/Card";
import ContabilidadClient from "./ContabilidadClient";

export default async function ContabilidadPage() {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [yearPayments, monthPayments, pendingCount] = await Promise.all([
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
  ]);

  const yearTotal = yearPayments._sum.amount || 0;
  const monthTotal = monthPayments._sum.amount || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contabilidad</h2>
        <p className="mt-1 text-sm text-gray-500">
          Resumen financiero y exportación de datos.
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

      {/* Export section */}
      <ContabilidadClient />
    </div>
  );
}
