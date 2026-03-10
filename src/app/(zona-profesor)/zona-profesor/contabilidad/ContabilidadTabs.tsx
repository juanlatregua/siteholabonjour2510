"use client";

import { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import FacturaModal from "./FacturaModal";
import AnularModal from "./AnularModal";

type PaymentRow = {
  id: string;
  amount: number;
  method: string;
  status: string;
  reference: string | null;
  createdAt: string;
  confirmedAt: string | null;
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
  invoice: { id: string; number: string; storagePath: string | null } | null;
};

type FacturaRow = {
  id: string;
  numero: string;
  fechaEmision: string;
  clienteNombre: string;
  clienteNif: string | null;
  clienteRazonSocial: string | null;
  concepto: string;
  total: number;
  estado: string;
  pdfPath: string | null;
  alumno: { id: string; name: string | null; email: string };
  pagoId: string | null;
};

type InvoiceRow = {
  id: string;
  number: string;
  issuedAt: string;
  studentName: string;
  totalAmount: number;
  storagePath: string | null;
  student: { id: string; name: string | null; email: string };
};

interface Props {
  payments: PaymentRow[];
  facturas: FacturaRow[];
  invoices: InvoiceRow[];
}

const tabs = [
  { key: "pagos", label: "Pagos" },
  { key: "facturas", label: "Facturas" },
  { key: "recibos", label: "Recibos" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "0.5rem 1.25rem",
  borderRadius: "0.5rem 0.5rem 0 0",
  border: "1px solid #e2e8f0",
  borderBottom: active ? "2px solid #E50046" : "1px solid #e2e8f0",
  background: active ? "#ffffff" : "#f8fafc",
  color: active ? "#1e2d4a" : "#5f6b78",
  fontWeight: active ? 700 : 500,
  fontSize: "0.875rem",
  cursor: "pointer",
});

const eur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const statusBadge = (status: string) => {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    CONFIRMED: { bg: "#ecfdf5", text: "#0E9F6E", label: "Confirmado" },
    PENDING: { bg: "#fffbeb", text: "#b45309", label: "Pendiente" },
    REJECTED: { bg: "#fef2f2", text: "#dc2626", label: "Rechazado" },
    REFUNDED: { bg: "#f0f9ff", text: "#2563eb", label: "Devuelto" },
    emitida: { bg: "#ecfdf5", text: "#0E9F6E", label: "Emitida" },
    anulada: { bg: "#fef2f2", text: "#dc2626", label: "Anulada" },
  };
  const s = map[status] || { bg: "#f1f5f9", text: "#64748b", label: status };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        background: s.bg,
        color: s.text,
      }}
    >
      {s.label}
    </span>
  );
};

export default function ContabilidadTabs({
  payments,
  facturas,
  invoices,
}: Props) {
  const [active, setActive] = useState<TabKey>("pagos");
  const [facturaModal, setFacturaModal] = useState<PaymentRow | null>(null);
  const [anularModal, setAnularModal] = useState<FacturaRow | null>(null);

  // Check if a payment already has a factura
  const paymentFacturaMap = new Map<string, FacturaRow>();
  for (const f of facturas) {
    if (f.pagoId) paymentFacturaMap.set(f.pagoId, f);
  }

  return (
    <>
      <Card>
        <CardContent>
          {/* Tab headers */}
          <div style={{ display: "flex", gap: "0.25rem", marginBottom: "-1px" }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                style={tabStyle(active === t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "0 0.5rem 0.5rem 0.5rem",
              overflow: "auto",
            }}
          >
            {active === "pagos" && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={thStyle}>Fecha</th>
                    <th style={thStyle}>Alumno</th>
                    <th style={thStyle}>Importe</th>
                    <th style={thStyle}>Método</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Recibo</th>
                    <th style={thStyle}>Factura</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => {
                    const existingFactura = paymentFacturaMap.get(p.id);
                    return (
                      <tr key={p.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                        <td style={tdStyle}>{fmtDate(p.createdAt)}</td>
                        <td style={tdStyle}>{p.student.name || p.student.email}</td>
                        <td style={tdStyle}>{eur(p.amount)}</td>
                        <td style={tdStyle}>{p.method}</td>
                        <td style={tdStyle}>{statusBadge(p.status)}</td>
                        <td style={tdStyle}>
                          {p.invoice ? (
                            <a
                              href={`/api/zona-profesor/invoices/${p.invoice.id}/pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#395D9F", fontWeight: 600, fontSize: "0.8rem" }}
                            >
                              {p.invoice.number}
                            </a>
                          ) : (
                            <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>—</span>
                          )}
                        </td>
                        <td style={tdStyle}>
                          {existingFactura ? (
                            <a
                              href={`/api/contabilidad/factura/${existingFactura.id}/pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#395D9F", fontWeight: 600, fontSize: "0.8rem" }}
                            >
                              {existingFactura.numero}
                            </a>
                          ) : p.status === "CONFIRMED" ? (
                            <button
                              type="button"
                              onClick={() => setFacturaModal(p)}
                              style={{
                                padding: "3px 10px",
                                borderRadius: "0.375rem",
                                border: "1px solid #E50046",
                                background: "transparent",
                                color: "#E50046",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Generar
                            </button>
                          ) : (
                            <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...tdStyle, textAlign: "center", color: "#9ca3af" }}>
                        No hay pagos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {active === "facturas" && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={thStyle}>Número</th>
                    <th style={thStyle}>Fecha</th>
                    <th style={thStyle}>Cliente</th>
                    <th style={thStyle}>NIF</th>
                    <th style={thStyle}>Total</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {facturas.map((f) => (
                    <tr key={f.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600 }}>{f.numero}</span>
                      </td>
                      <td style={tdStyle}>{fmtDate(f.fechaEmision)}</td>
                      <td style={tdStyle}>{f.clienteRazonSocial || f.clienteNombre}</td>
                      <td style={tdStyle}>{f.clienteNif || "—"}</td>
                      <td style={tdStyle}>{eur(f.total)}</td>
                      <td style={tdStyle}>{statusBadge(f.estado)}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {f.pdfPath && (
                            <a
                              href={`/api/contabilidad/factura/${f.id}/pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#395D9F", fontWeight: 600, fontSize: "0.8rem" }}
                            >
                              PDF
                            </a>
                          )}
                          {f.estado === "emitida" && (
                            <button
                              type="button"
                              onClick={() => setAnularModal(f)}
                              style={{
                                padding: "2px 8px",
                                borderRadius: "0.375rem",
                                border: "1px solid #dc2626",
                                background: "transparent",
                                color: "#dc2626",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Anular
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {facturas.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...tdStyle, textAlign: "center", color: "#9ca3af" }}>
                        No hay facturas emitidas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {active === "recibos" && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={thStyle}>Número</th>
                    <th style={thStyle}>Fecha</th>
                    <th style={thStyle}>Alumno</th>
                    <th style={thStyle}>Total</th>
                    <th style={thStyle}>PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 600 }}>{inv.number}</span>
                      </td>
                      <td style={tdStyle}>{fmtDate(inv.issuedAt)}</td>
                      <td style={tdStyle}>{inv.studentName}</td>
                      <td style={tdStyle}>{eur(inv.totalAmount)}</td>
                      <td style={tdStyle}>
                        {inv.storagePath ? (
                          <a
                            href={`/api/zona-profesor/invoices/${inv.id}/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#395D9F", fontWeight: 600, fontSize: "0.8rem" }}
                          >
                            Descargar
                          </a>
                        ) : (
                          <span style={{ color: "#9ca3af" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ ...tdStyle, textAlign: "center", color: "#9ca3af" }}>
                        No hay recibos generados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {facturaModal && (
        <FacturaModal
          payment={facturaModal}
          onClose={() => setFacturaModal(null)}
        />
      )}
      {anularModal && (
        <AnularModal
          factura={anularModal}
          onClose={() => setAnularModal(null)}
        />
      )}
    </>
  );
}

const thStyle: React.CSSProperties = {
  padding: "0.625rem 0.75rem",
  fontWeight: 600,
  color: "#5f6b78",
  fontSize: "0.8rem",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "0.625rem 0.75rem",
  color: "#3d4a5c",
  whiteSpace: "nowrap",
};
