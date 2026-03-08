"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function ContabilidadClient() {
  const now = new Date();
  const yearStr = now.getFullYear().toString();
  const [from, setFrom] = useState(`${yearStr}-01-01`);
  const [to, setTo] = useState(now.toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: "xlsx" | "csv") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, format });
      const res = await fetch(`/api/zona-profesor/contabilidad/export?${params}`);
      if (!res.ok) throw new Error("Error al exportar");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contabilidad-holabonjour.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error al exportar. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    color: "#1e2d4a",
  };

  const buttonStyle = (bg: string): React.CSSProperties => ({
    padding: "0.5rem 1.25rem",
    borderRadius: "0.5rem",
    border: "none",
    background: bg,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: loading ? "default" : "pointer",
    opacity: loading ? 0.5 : 1,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar datos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Desde</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Hasta</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleExport("xlsx")}
            style={buttonStyle("#10b981")}
          >
            {loading ? "Exportando..." : "Exportar Excel"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleExport("csv")}
            style={buttonStyle("#6b7280")}
          >
            Exportar CSV
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          El Excel incluye dos hojas: &quot;Pagos&quot; (detalle) y &quot;Resumen&quot; (totales por método).
        </p>
      </CardContent>
    </Card>
  );
}
