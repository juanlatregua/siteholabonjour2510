import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface PaymentRowProps {
  amount: number;
  method: string;
  status: string;
  reference?: string | null;
  createdAt: Date | string;
  confirmedAt?: Date | string | null;
}

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

export default function PaymentRow({
  amount,
  method,
  status,
  reference,
  createdAt,
  confirmedAt,
}: PaymentRowProps) {
  const date =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const confirmedDate =
    confirmedAt
      ? typeof confirmedAt === "string"
        ? new Date(confirmedAt)
        : confirmedAt
      : null;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {amount.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <p className="text-xs text-gray-500">
          {format(date, "d MMM yyyy", { locale: es })}
          {reference && <> &middot; Ref: {reference}</>}
        </p>
        {confirmedDate && (
          <p className="text-xs text-green-600">
            Confirmado el {format(confirmedDate, "d MMM yyyy", { locale: es })}
          </p>
        )}
      </div>
      <Badge variant="outline">{methodLabel[method] || method}</Badge>
      <Badge variant={statusVariant[status] || "default"}>
        {statusLabel[status] || status}
      </Badge>
    </div>
  );
}
