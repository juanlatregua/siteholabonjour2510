import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { BANK } from "@/lib/constants";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { FiCreditCard } from "react-icons/fi";

const statusVariant: Record<string, "warning" | "success" | "danger"> = {
  PENDING: "warning",
  CONFIRMED: "success",
  REJECTED: "danger",
};

const statusLabel: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  REJECTED: "Rechazado",
};

const methodLabel: Record<string, string> = {
  TRANSFER: "Transferencia",
  BIZUM: "Bizum",
  OTHER: "Otro",
};

export default async function PagosPage() {
  const session = await requireStudent();

  const payments = await prisma.payment.findMany({
    where: { studentId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pagos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Historial de pagos y datos bancarios para transferencias.
        </p>
      </div>

      {payments.length > 0 ? (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Fecha
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Importe
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Metodo
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Estado
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Referencia
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-500">
                    Confirmado
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                      {format(payment.createdAt, "d MMM yyyy", { locale: es })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                      {payment.amount.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge variant="outline">
                        {methodLabel[payment.method] || payment.method}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge variant={statusVariant[payment.status] || "default"}>
                        {statusLabel[payment.status] || payment.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {payment.reference || "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {payment.confirmedAt
                        ? format(payment.confirmedAt, "d MMM yyyy", {
                            locale: es,
                          })
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={<FiCreditCard className="h-12 w-12" />}
          title="Sin pagos"
          description="Aqui aparecera tu historial de pagos."
        />
      )}

      {/* Bank details */}
      <Card>
        <CardHeader>
          <CardTitle>Datos bancarios para transferencia</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">Titular:</dt>
              <dd className="text-gray-900">{BANK.holder}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">IBAN:</dt>
              <dd className="font-mono text-gray-900">{BANK.iban}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-gray-500">BIC/SWIFT:</dt>
              <dd className="font-mono text-gray-900">{BANK.bic}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-gray-500">
            Incluye tu nombre completo y email como concepto de la transferencia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
