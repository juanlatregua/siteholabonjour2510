"use client";

import React, { useState } from "react";
import { FiCheck, FiX, FiChevronDown, FiChevronUp, FiExternalLink, FiFileText, FiShield, FiAlertTriangle } from "react-icons/fi";

interface DiplomaResult {
  type: string;
  institution: string;
  date: string | null;
  holderName: string;
  classification: "VALID" | "DUBIOUS" | "INVALID";
  reason: string;
}

interface DiplomaScan {
  diplomas: DiplomaResult[];
  overallClassification: "VALID" | "DUBIOUS" | "INVALID";
  summary: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  telefono: string | null;
  nationality: string | null;
  location: string | null;
  nivelFrances: string | null;
  titulacion: string | null;
  titulacionDetalle: string | null;
  levels: string[];
  especialidades: string[];
  experience: number;
  disponibilidad: number | null;
  hourlyRate: number;
  linkedinUrl: string | null;
  motivacion: string | null;
  archivos: string[];
  diplomaUrls: string[];
  diplomaScan: DiplomaScan | null;
  status: string;
  rejectionReason: string | null;
  createdAt: string;
}

interface Props {
  applications: Application[];
}

type Filter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

const classificationColors: Record<string, { bg: string; text: string; border: string }> = {
  VALID: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
  DUBIOUS: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
  INVALID: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
};

const classificationLabels: Record<string, string> = {
  VALID: "Verificado",
  DUBIOUS: "Dudoso",
  INVALID: "No válido",
};

const classificationIcons: Record<string, React.ReactNode> = {
  VALID: <FiShield size={14} />,
  DUBIOUS: <FiAlertTriangle size={14} />,
  INVALID: <FiX size={14} />,
};

export default function CandidaturasClient({ applications: initial }: Props) {
  const [applications, setApplications] = useState(initial);
  const [filter, setFilter] = useState<Filter>("PENDING");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = filter === "ALL" ? applications : applications.filter((a) => a.status === filter);

  const counts = {
    ALL: applications.length,
    PENDING: applications.filter((a) => a.status === "PENDING").length,
    APPROVED: applications.filter((a) => a.status === "APPROVED").length,
    REJECTED: applications.filter((a) => a.status === "REJECTED").length,
  };

  async function handleAction(id: string, action: "approve" | "reject", rejectionReason?: string) {
    setLoading(id);
    try {
      const res = await fetch(`/api/zona-profesor/candidaturas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error al procesar");
        return;
      }
      const data = await res.json();
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: data.status, rejectionReason: rejectionReason || null } : a))
      );
      setRejectId(null);
      setRejectReason("");
    } catch {
      alert("Error de red");
    } finally {
      setLoading(null);
    }
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "#fef3c7", text: "#92400e" },
    APPROVED: { bg: "#d1fae5", text: "#065f46" },
    REJECTED: { bg: "#fee2e2", text: "#991b1b" },
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Pendiente",
    APPROVED: "Aprobada",
    REJECTED: "Rechazada",
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: filter === f ? 700 : 500,
              background: filter === f ? "#1e2d4a" : "#fff",
              color: filter === f ? "#fff" : "#3d4a5c",
              border: filter === f ? "none" : "1px solid rgba(30,45,74,0.15)",
              cursor: "pointer",
            }}
          >
            {f === "ALL" ? "Todas" : statusLabels[f]} ({counts[f]})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "#5f6b78", fontSize: "0.95rem" }}>No hay candidaturas con este filtro.</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.map((app) => {
          const expanded = expandedId === app.id;
          const sc = statusColors[app.status] || statusColors.PENDING;
          const scanClass = app.diplomaScan?.overallClassification;

          return (
            <div
              key={app.id}
              style={{
                background: "#fff",
                border: "1px solid rgba(30,45,74,0.08)",
                borderRadius: "0.875rem",
                overflow: "hidden",
              }}
            >
              {/* Header row */}
              <button
                onClick={() => setExpandedId(expanded ? null : app.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.25rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: "#1e2d4a", fontSize: "0.95rem" }}>{app.name}</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "0.25rem",
                        background: sc.bg,
                        color: sc.text,
                      }}
                    >
                      {statusLabels[app.status]}
                    </span>
                    {scanClass && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "0.25rem",
                          background: classificationColors[scanClass]?.bg,
                          color: classificationColors[scanClass]?.text,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {classificationIcons[scanClass]} Diploma: {classificationLabels[scanClass]}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#5f6b78", marginTop: "0.25rem" }}>
                    {app.email} · {app.experience} año{app.experience !== 1 ? "s" : ""} exp.
                    {app.nationality && ` · ${app.nationality}`}
                    {app.location && ` · ${app.location}`}
                    {" · "}
                    {new Date(app.createdAt).toLocaleDateString("es-ES")}
                  </div>
                </div>
                {expanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
              </button>

              {/* Expanded detail */}
              {expanded && (
                <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid rgba(30,45,74,0.06)" }}>
                  <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
                    <div>
                      <Label>Teléfono</Label>
                      <Value>{app.telefono || "—"}</Value>
                    </div>
                    <div>
                      <Label>Nacionalidad</Label>
                      <Value>{app.nationality || "—"}</Value>
                    </div>
                    <div>
                      <Label>Ubicación</Label>
                      <Value>{app.location || "—"}</Value>
                    </div>
                    <div>
                      <Label>Nivel de francés</Label>
                      <Value>{app.nivelFrances || "—"}</Value>
                    </div>
                    <div>
                      <Label>Titulación</Label>
                      <Value>
                        {app.titulacion || "—"}
                        {app.titulacionDetalle && <span style={{ color: "#5f6b78" }}> — {app.titulacionDetalle}</span>}
                      </Value>
                    </div>
                    <div>
                      <Label>Disponibilidad</Label>
                      <Value>{app.disponibilidad ? `${app.disponibilidad} h/semana` : "—"}</Value>
                    </div>
                    {app.levels.length > 0 && (
                      <div>
                        <Label>Niveles</Label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {app.levels.map((l) => (
                            <span
                              key={l}
                              style={{
                                fontSize: "0.75rem",
                                padding: "0.15rem 0.4rem",
                                background: "#eef2ff",
                                color: "#4338ca",
                                borderRadius: "0.25rem",
                                fontWeight: 600,
                              }}
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.especialidades.length > 0 && (
                      <div>
                        <Label>Especialidades</Label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {app.especialidades.map((e) => (
                            <span
                              key={e}
                              style={{
                                fontSize: "0.75rem",
                                padding: "0.2rem 0.5rem",
                                background: "#f0f4ff",
                                color: "#395D9F",
                                borderRadius: "0.25rem",
                                fontWeight: 500,
                              }}
                            >
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.linkedinUrl && (
                      <div>
                        <Label>LinkedIn/Portfolio</Label>
                        <a
                          href={app.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#395D9F", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                        >
                          Ver perfil <FiExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Diplomas */}
                  {app.diplomaUrls.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      <Label>Diplomas subidos ({app.diplomaUrls.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {app.diplomaUrls.map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              padding: "0.35rem 0.75rem",
                              background: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.5rem",
                              fontSize: "0.8rem",
                              color: "#395D9F",
                              textDecoration: "none",
                            }}
                          >
                            <FiFileText size={13} /> Diploma {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diploma AI Scan Results */}
                  {app.diplomaScan && (
                    <div
                      style={{
                        marginTop: "1rem",
                        border: `1px solid ${classificationColors[app.diplomaScan.overallClassification]?.border || "#e2e8f0"}`,
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.75rem 1rem",
                          background: classificationColors[app.diplomaScan.overallClassification]?.bg || "#f8fafc",
                        }}
                      >
                        {classificationIcons[app.diplomaScan.overallClassification]}
                        <span style={{ fontWeight: 700, fontSize: "0.85rem", color: classificationColors[app.diplomaScan.overallClassification]?.text }}>
                          Verificación IA: {classificationLabels[app.diplomaScan.overallClassification]}
                        </span>
                      </div>
                      <div style={{ padding: "0.75rem 1rem" }}>
                        <p style={{ fontSize: "0.83rem", color: "#3d4a5c", margin: "0 0 0.75rem", lineHeight: 1.5 }}>
                          {app.diplomaScan.summary}
                        </p>
                        {app.diplomaScan.diplomas.map((d, i) => {
                          const dc = classificationColors[d.classification] || classificationColors.DUBIOUS;
                          return (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "0.5rem 0",
                                borderTop: i > 0 ? "1px solid #f1f5f9" : "none",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                  padding: "0.1rem 0.4rem",
                                  borderRadius: "0.2rem",
                                  background: dc.bg,
                                  color: dc.text,
                                  whiteSpace: "nowrap",
                                  marginTop: "0.1rem",
                                }}
                              >
                                {classificationLabels[d.classification]}
                              </span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#1e2d4a", margin: 0 }}>
                                  {d.type}
                                </p>
                                <p style={{ fontSize: "0.78rem", color: "#5f6b78", margin: "0.15rem 0 0" }}>
                                  {d.institution}{d.date ? ` · ${d.date}` : ""} · Titular: {d.holderName}
                                </p>
                                <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0.15rem 0 0", fontStyle: "italic" }}>
                                  {d.reason}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {app.motivacion && (
                    <div style={{ marginTop: "1rem" }}>
                      <Label>Motivación</Label>
                      <div
                        style={{
                          marginTop: "0.5rem",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          padding: "0.75rem",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          color: "#3d4a5c",
                          whiteSpace: "pre-wrap",
                          maxHeight: 200,
                          overflowY: "auto",
                        }}
                      >
                        {app.motivacion}
                      </div>
                    </div>
                  )}

                  {app.rejectionReason && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "0.75rem",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "0.5rem",
                        fontSize: "0.85rem",
                        color: "#991b1b",
                      }}
                    >
                      <strong>Motivo de rechazo:</strong> {app.rejectionReason}
                    </div>
                  )}

                  {/* Action buttons */}
                  {app.status === "PENDING" && (
                    <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleAction(app.id, "approve")}
                        disabled={loading === app.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.5rem 1.25rem",
                          background: "#059669",
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          cursor: loading === app.id ? "wait" : "pointer",
                          opacity: loading === app.id ? 0.6 : 1,
                        }}
                      >
                        <FiCheck size={14} />
                        {loading === app.id ? "Procesando..." : "Aprobar"}
                      </button>

                      {rejectId === app.id ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
                          <input
                            type="text"
                            placeholder="Motivo (opcional)"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            style={{
                              flex: 1,
                              padding: "0.5rem 0.75rem",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.5rem",
                              fontSize: "0.85rem",
                            }}
                          />
                          <button
                            onClick={() => handleAction(app.id, "reject", rejectReason)}
                            disabled={loading === app.id}
                            style={{
                              padding: "0.5rem 1rem",
                              background: "#dc2626",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              borderRadius: "0.5rem",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => { setRejectId(null); setRejectReason(""); }}
                            style={{
                              padding: "0.5rem 0.75rem",
                              background: "none",
                              color: "#5f6b78",
                              fontSize: "0.85rem",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                            }}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRejectId(app.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.5rem 1.25rem",
                            background: "none",
                            color: "#dc2626",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #fecaca",
                            cursor: "pointer",
                          }}
                        >
                          <FiX size={14} />
                          Rechazar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#5f6b78", textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>
      {children}
    </p>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "0.88rem", color: "#1e2d4a", margin: "0.15rem 0 0" }}>{children}</p>;
}
