import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";

interface PackCardProps {
  hoursTotal: number;
  hoursUsed: number;
  levelRange: string;
  status: string;
  purchasedAt: Date | string;
}

const statusVariant: Record<string, "success" | "warning" | "danger" | "default"> = {
  ACTIVE: "success",
  EXPIRED: "warning",
  EXHAUSTED: "danger",
  CANCELLED: "danger",
};

const statusLabel: Record<string, string> = {
  ACTIVE: "Activo",
  EXPIRED: "Expirado",
  EXHAUSTED: "Agotado",
  CANCELLED: "Cancelado",
};

export default function PackCard({
  hoursTotal,
  hoursUsed,
  levelRange,
  status,
  purchasedAt,
}: PackCardProps) {
  const date =
    typeof purchasedAt === "string" ? new Date(purchasedAt) : purchasedAt;
  const hoursRemaining = Math.max(hoursTotal - hoursUsed, 0);
  const pct = hoursTotal > 0 ? Math.min((hoursUsed / hoursTotal) * 100, 100) : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Pack {levelRange}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Comprado el {format(date, "d 'de' MMMM yyyy", { locale: es })}
          </p>
        </div>
        <Badge variant={statusVariant[status] || "default"}>
          {statusLabel[status] || status}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-gray-600">
          <span>
            {hoursUsed}h usadas de {hoursTotal}h
          </span>
          <span className="font-medium">{hoursRemaining}h restantes</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#0b3c6f] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Nivel: <span className="font-medium text-gray-700">{levelRange}</span>
      </p>
    </div>
  );
}
