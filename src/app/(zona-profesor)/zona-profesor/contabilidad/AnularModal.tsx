"use client";

import { useState } from "react";

interface FacturaData {
  id: string;
  numero: string;
  clienteNombre: string;
  clienteNif: string | null;
  total: number;
  concepto: string;
}

interface Props {
  factura: FacturaData;
  onClose: () => void;
}

const eur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export default function AnularModal({ factura, onClose }: Props) {
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!motivo.trim()) {
      setError("El motivo es obligatorio");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contabilidad/factura/anular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facturaId: factura.id, motivo }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al anular factura");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "1rem",
          padding: "1.5rem",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#dc2626", marginBottom: "1rem" }}>
          Anular factura
        </h3>

        <div
          style={{
            padding: "0.75rem",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          <p style={{ margin: 0, color: "#991b1b" }}>
            Se generará una <strong>factura rectificativa</strong> ({factura.numero}-R)
            con importes negativos y se marcará la factura original como anulada.
          </p>
        </div>

        <table style={{ fontSize: "0.875rem", marginBottom: "1rem", color: "#3d4a5c" }}>
          <tbody>
            <tr>
              <td style={{ padding: "0.25rem 0.75rem 0.25rem 0", fontWeight: 600 }}>Factura</td>
              <td>{factura.numero}</td>
            </tr>
            <tr>
              <td style={{ padding: "0.25rem 0.75rem 0.25rem 0", fontWeight: 600 }}>Cliente</td>
              <td>{factura.clienteNombre}</td>
            </tr>
            <tr>
              <td style={{ padding: "0.25rem 0.75rem 0.25rem 0", fontWeight: 600 }}>Total</td>
              <td>{eur(factura.total)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#5f6b78",
            }}
          >
            Motivo de anulación *
          </label>
          <textarea
            rows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              fontSize: "0.875rem",
              color: "#1e2d4a",
              resize: "vertical",
            }}
            placeholder="Ej: Error en datos fiscales, devolución del pago..."
          />
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{error}</p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              color: "#5f6b78",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !motivo.trim()}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#dc2626",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: loading ? "default" : "pointer",
              opacity: loading || !motivo.trim() ? 0.5 : 1,
            }}
          >
            {loading ? "Anulando..." : "Confirmar anulación"}
          </button>
        </div>
      </div>
    </div>
  );
}
