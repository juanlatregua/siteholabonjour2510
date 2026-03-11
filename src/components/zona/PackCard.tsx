"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface PackCardProps {
  packId?: string;
  hoursTotal: number;
  hoursUsed: number;
  levelRange: string;
  status: string;
  purchasedAt: Date | string;
  isTeacher?: boolean;
  onHourReturned?: () => void;
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
  packId,
  hoursTotal,
  hoursUsed,
  levelRange,
  status,
  purchasedAt,
  isTeacher = false,
  onHourReturned,
}: PackCardProps) {
  const date =
    typeof purchasedAt === "string" ? new Date(purchasedAt) : purchasedAt;
  const hoursRemaining = Math.max(hoursTotal - hoursUsed, 0);
  const pct = hoursTotal > 0 ? Math.min((hoursUsed / hoursTotal) * 100, 100) : 0;

  const [showDevolver, setShowDevolver] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleDevolver() {
    if (!packId || !motivo.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/zona-profesor/packs/${packId}/devolver-hora`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad, motivo: motivo.trim() }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "Error");
      setSuccessMsg(`${cantidad} hora(s) devuelta(s). Restantes: ${data.hoursRemaining}`);
      setShowDevolver(false);
      setMotivo("");
      setCantidad(1);
      onHourReturned?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al devolver");
    } finally {
      setLoading(false);
    }
  }

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
            className="h-full rounded-full bg-[#1e2d4a] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Nivel: <span className="font-medium text-gray-700">{levelRange}</span>
      </p>

      {/* Teacher: devolver hora */}
      {isTeacher && packId && hoursUsed > 0 && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          {successMsg && (
            <p className="mb-2 text-sm font-medium text-green-700">{successMsg}</p>
          )}

          {showDevolver ? (
            <div className="space-y-3 rounded-lg bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Horas:</label>
                <select
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                >
                  {Array.from({ length: Math.min(hoursUsed, 10) }, (_, i) => i + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Motivo
                </label>
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1e2d4a] focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20"
                  placeholder="Ej: Clase cancelada por enfermedad"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  loading={loading}
                  disabled={!motivo.trim()}
                  onClick={handleDevolver}
                >
                  Devolver {cantidad} hora(s)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    setShowDevolver(false);
                    setMotivo("");
                    setError(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDevolver(true)}
            >
              Devolver hora
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
