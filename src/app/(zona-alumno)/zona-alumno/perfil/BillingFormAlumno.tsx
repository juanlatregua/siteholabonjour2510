"use client";

import { useState } from "react";

interface BillingData {
  billingType: string | null;
  billingNif: string | null;
  billingRazonSocial: string | null;
  billingDireccion: string | null;
  billingCiudad: string | null;
  billingCP: string | null;
  billingPais: string | null;
  billingContacto: string | null;
  billingEmail: string | null;
}

interface Props {
  billing: BillingData;
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

export default function BillingFormAlumno({ billing }: Props) {
  const [form, setForm] = useState({
    billingType: billing.billingType || "particular",
    billingNif: billing.billingNif || "",
    billingRazonSocial: billing.billingRazonSocial || "",
    billingDireccion: billing.billingDireccion || "",
    billingCiudad: billing.billingCiudad || "",
    billingCP: billing.billingCP || "",
    billingPais: billing.billingPais || "España",
    billingContacto: billing.billingContacto || "",
    billingEmail: billing.billingEmail || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isEmpresa = form.billingType === "empresa";

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/zona-alumno/perfil/billing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          billingNif: form.billingNif || null,
          billingRazonSocial: form.billingRazonSocial || null,
          billingDireccion: form.billingDireccion || null,
          billingCiudad: form.billingCiudad || null,
          billingCP: form.billingCP || null,
          billingContacto: form.billingContacto || null,
          billingEmail: form.billingEmail || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "0.75rem" }}>
        <label style={labelStyle}>Tipo</label>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {["particular", "empresa"].map((type) => (
            <label
              key={type}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.875rem",
                color: "#3d4a5c",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="billingType"
                value={type}
                checked={form.billingType === type}
                onChange={(e) => setForm({ ...form, billingType: e.target.value })}
              />
              {type === "particular" ? "Particular" : "Empresa"}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div>
          <label style={labelStyle}>NIF / CIF</label>
          <input
            style={inputStyle}
            value={form.billingNif}
            onChange={(e) => setForm({ ...form, billingNif: e.target.value })}
          />
        </div>
        {isEmpresa && (
          <div>
            <label style={labelStyle}>Razón social</label>
            <input
              style={inputStyle}
              value={form.billingRazonSocial}
              onChange={(e) => setForm({ ...form, billingRazonSocial: e.target.value })}
            />
          </div>
        )}
        <div style={{ gridColumn: isEmpresa ? undefined : "span 2" }}>
          <label style={labelStyle}>Dirección</label>
          <input
            style={inputStyle}
            value={form.billingDireccion}
            onChange={(e) => setForm({ ...form, billingDireccion: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>Ciudad</label>
          <input
            style={inputStyle}
            value={form.billingCiudad}
            onChange={(e) => setForm({ ...form, billingCiudad: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>C.P.</label>
          <input
            style={inputStyle}
            value={form.billingCP}
            onChange={(e) => setForm({ ...form, billingCP: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>País</label>
          <input
            style={inputStyle}
            value={form.billingPais}
            onChange={(e) => setForm({ ...form, billingPais: e.target.value })}
          />
        </div>
        {isEmpresa && (
          <div>
            <label style={labelStyle}>Persona de contacto</label>
            <input
              style={inputStyle}
              value={form.billingContacto}
              onChange={(e) => setForm({ ...form, billingContacto: e.target.value })}
            />
          </div>
        )}
        <div>
          <label style={labelStyle}>Email de facturación</label>
          <input
            type="email"
            style={inputStyle}
            value={form.billingEmail}
            onChange={(e) => setForm({ ...form, billingEmail: e.target.value })}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
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
          {loading ? "Guardando..." : "Guardar datos"}
        </button>
        {success && (
          <span style={{ color: "#0E9F6E", fontSize: "0.8rem", fontWeight: 600 }}>
            Guardado correctamente
          </span>
        )}
        {error && (
          <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>{error}</span>
        )}
      </div>
    </div>
  );
}
