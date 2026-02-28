import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import EmptyState from "@/components/ui/EmptyState";
import { FiCreditCard } from "react-icons/fi";
import PagosTable from "./PagosTable";

export default async function PagosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const studentIds = await prisma.user.findMany({
    where: { coachId: session.user.id },
    select: { id: true },
  });

  const payments = await prisma.payment.findMany({
    where: {
      studentId: { in: studentIds.map((s) => s.id) },
    },
    orderBy: { createdAt: "desc" },
    include: {
      student: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pagos</h2>
        <p className="mt-1 text-sm text-gray-500">
          {payments.length} pago{payments.length !== 1 ? "s" : ""} registrado{payments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {payments.length > 0 ? (
        <PagosTable
          payments={payments.map((p) => ({
            id: p.id,
            amount: p.amount,
            method: p.method,
            status: p.status,
            reference: p.reference,
            createdAt: p.createdAt.toISOString(),
            confirmedAt: p.confirmedAt?.toISOString() ?? null,
            studentName: p.student.name || p.student.email,
          }))}
        />
      ) : (
        <EmptyState
          icon={<FiCreditCard className="h-12 w-12" />}
          title="Sin pagos"
          description="No hay pagos registrados para tus alumnos."
        />
      )}
    </div>
  );
}
