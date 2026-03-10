"use client";

import { useState, useEffect } from "react";

interface PaymentData {
  id: string;
  amount: number;
  method: string;
  student: {
    id: string;
    name: string | null;
    email: string;
    billingNif: string | null;
    billingRazonSocial: string | null;
    billingDireccion: string | null;
    billingEmail: string | null;
    billingType: string | null;
  };
}

interface Props {
  payment: PaymentData;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #d1d5db",
  fontSize: "0.875rem",
  color: "#1e2d4a",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.25rem",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#5f6b78",
};

export default function FacturaModal({ payment, onClose }: Props) {
  const totalAmount = payment.amount;
  const tipoIva = 21;
  const base = +(totalAmount / (1 + tipoIva / 100)).toFixed(2);
  const cuotaIva = +(totalAmount - base).toFixed(2);

  const [form, setForm] = useState({
    numero: "",
    fechaEmision: new Date().toISOString().split("T")[0],
    clienteNombre: payment.student.name || "",
    clienteNif: payment.student.billingNif || "",
    clienteRazonSocial: payment.student.billingRazonSocial || "",
    clienteDireccion: payment.student.billingDireccion || "",
    clienteEmail: payment.student.billingEmail || payment.student.email,
    concepto: `Clases de francés`,
    baseImponible: base,
    tipoIva,
    cuotaIva,
    total: totalAmount,
    formaPago: payment.method === "STRIPE" ? "Tarjeta" : payment.method,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Recalculate when base or IVA changes
  useEffect(() => {
    const newCuota = +(form.baseImponible * (form.tipoIva / 100)).toFixed(2);
    const newTotal = +(form.baseImponible + newCuota).toFixed(2);
    setForm((prev) => ({ ...prev, cuotaIva: newCuota, total: newTotal }));
  }, [form.baseImponible, form.tipoIva]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contabilidad/factura/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagoId: payment.id,
          alumnoId: payment.student.id,
          numero: form.numero || undefined,
          fechaEmision: form.fechaEmision || undefined,
          clienteNombre: form.clienteNombre,
          clienteNif: form.clienteNif || undefined,
          clienteRazonSocial: form.clienteRazonSocial || undefined,
          clienteDireccion: form.clienteDireccion || undefined,
          clienteEmail: form.clienteEmail || undefined,
          concepto: form.concepto,
          baseImponible: form.baseImponible,
          tipoIva: form.tipoIva,
          cuotaIva: form.cuotaIva,
          total: form.total,
          formaPago: form.formaPago || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al generar factura");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const missingNif = !form.clienteNif;

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
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Generar factura
        </h3>

        {missingNif && (
          <div
            style={{
              padding: "0.625rem",
              background: "#fffbeb",
              border: "1px solid #fbbf24",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              color: "#92400e",
              marginBottom: "1rem",
            }}
          >
            El alumno no tiene NIF registrado. Puedes introducirlo manualmente.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Número (vacío = automático)</label>
            <input
              style={inputStyle}
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
              placeholder="HB-2026-001"
            />
          </div>
          <div>
            <label style={labelStyle}>Fecha emisión</label>
            <input
              type="date"
              style={inputStyle}
              value={form.fechaEmision}
              onChange={(e) => setForm({ ...form, fechaEmision: e.target.value })}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Nombre cliente</label>
            <input
              style={inputStyle}
              value={form.clienteNombre}
              onChange={(e) => setForm({ ...form, clienteNombre: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>NIF / CIF</label>
            <input
              style={inputStyle}
              value={form.clienteNif}
              onChange={(e) => setForm({ ...form, clienteNif: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Razón social</label>
            <input
              style={inputStyle}
              value={form.clienteRazonSocial}
              onChange={(e) => setForm({ ...form, clienteRazonSocial: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Dirección</label>
            <input
              style={inputStyle}
              value={form.clienteDireccion}
              onChange={(e) => setForm({ ...form, clienteDireccion: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={form.clienteEmail}
              onChange={(e) => setForm({ ...form, clienteEmail: e.target.value })}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Concepto</label>
            <input
              style={inputStyle}
              value={form.concepto}
              onChange={(e) => setForm({ ...form, concepto: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Base imponible</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={form.baseImponible}
              onChange={(e) =>
                setForm({ ...form, baseImponible: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div>
            <label style={labelStyle}>IVA (%)</label>
            <input
              type="number"
              step="1"
              style={inputStyle}
              value={form.tipoIva}
              onChange={(e) =>
                setForm({ ...form, tipoIva: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div>
            <label style={labelStyle}>Cuota IVA</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={form.cuotaIva}
              readOnly
            />
          </div>
          <div>
            <label style={labelStyle}>Total</label>
            <input
              type="number"
              step="0.01"
              style={{ ...inputStyle, fontWeight: 700 }}
              value={form.total}
              readOnly
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Forma de pago</label>
            <input
              style={inputStyle}
              value={form.formaPago}
              onChange={(e) => setForm({ ...form, formaPago: e.target.value })}
            />
          </div>
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.75rem" }}>{error}</p>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
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
            disabled={loading || !form.clienteNombre || !form.concepto}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#E50046",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "Generando..." : "Generar factura"}
          </button>
        </div>
      </div>
    </div>
  );
}
