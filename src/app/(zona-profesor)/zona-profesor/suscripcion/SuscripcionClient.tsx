"use client";

import React, { useState } from "react";
import { FiCheck, FiZap, FiArrowRight } from "react-icons/fi";

interface Props {
  currentPlan: "essentiel" | "professionnel";
  subscriptionStatus: string | null;
  hasStripeCustomer: boolean;
}

const PLANS = {
  essentiel: {
    name: "Essentiel",
    price: "Gratis",
    description: "Para empezar a dar clases en HolaBonjour",
    features: [
      "Hasta 10 alumnos",
      "Perfil público verificado",
      "Calendario básico",
      "Enlace de reserva manual",
      "Chat con alumnos",
    ],
    limits: [
      "Sin clases por Teams",
      "Sin grabaciones automáticas",
      "Sin corrección IA",
      "Sin simuladores para alumnos",
      "Sin facturación automática",
    ],
  },
  professionnel: {
    name: "Professionnel",
    price: "39 €/mes",
    description: "Todo lo que necesitas para ser profesor/a profesional",
    features: [
      "Alumnos ilimitados",
      "Perfil público verificado",
      "Clases por Microsoft Teams",
      "Cuenta Microsoft 365 incluida",
      "Grabaciones automáticas",
      "Corrección IA para alumnos",
      "Simuladores DELF/DALF para alumnos",
      "Facturación automática",
      "Chat con alumnos",
      "Analíticas avanzadas",
      "Soporte prioritario",
    ],
    limits: [],
  },
};

export default function SuscripcionClient({ currentPlan, subscriptionStatus, hasStripeCustomer }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: "subscribe" | "portal") {
    setLoading(action);
    try {
      const res = await fetch("/api/zona-profesor/suscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Error de red");
    } finally {
      setLoading(null);
    }
  }

  const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: "Activa", color: "#065f46", bg: "#d1fae5" },
    past_due: { label: "Pago pendiente", color: "#92400e", bg: "#fef3c7" },
    canceled: { label: "Cancelada", color: "#991b1b", bg: "#fee2e2" },
    unpaid: { label: "Impagada", color: "#991b1b", bg: "#fee2e2" },
  };

  return (
    <div>
      {/* Current subscription status */}
      {subscriptionStatus && statusLabels[subscriptionStatus] && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            background: statusLabels[subscriptionStatus].bg,
            color: statusLabels[subscriptionStatus].color,
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          Estado: {statusLabels[subscriptionStatus].label}
        </div>
      )}

      {/* Plans comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {(["essentiel", "professionnel"] as const).map((planKey) => {
          const plan = PLANS[planKey];
          const isCurrent = planKey === currentPlan;
          const isPro = planKey === "professionnel";

          return (
            <div
              key={planKey}
              style={{
                background: "#fff",
                border: isPro ? "2px solid #E50046" : "1px solid rgba(30,45,74,0.08)",
                borderRadius: "1rem",
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isPro && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "#E50046",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.25rem 1rem",
                    borderBottomLeftRadius: "0.5rem",
                  }}
                >
                  RECOMENDADO
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1e2d4a", margin: 0 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: isPro ? "#E50046" : "#1e2d4a", margin: "0.25rem 0" }}>
                  {plan.price}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#5f6b78", margin: 0 }}>
                  {plan.description}
                </p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem" }}>
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "#1e2d4a",
                      padding: "0.3rem 0",
                    }}
                  >
                    <FiCheck style={{ color: "#059669", flexShrink: 0 }} size={15} />
                    {f}
                  </li>
                ))}
                {plan.limits.map((l) => (
                  <li
                    key={l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      padding: "0.3rem 0",
                      textDecoration: "line-through",
                    }}
                  >
                    <span style={{ width: 15, flexShrink: 0 }} />
                    {l}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.5rem 1.25rem",
                      borderRadius: "0.5rem",
                      background: "#f1f5f9",
                      color: "#5f6b78",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <FiCheck size={14} /> Tu plan actual
                  </span>
                  {hasStripeCustomer && isPro && (
                    <button
                      onClick={() => handleAction("portal")}
                      disabled={loading === "portal"}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        background: "none",
                        color: "#395D9F",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        border: "1px solid rgba(57,93,159,0.2)",
                        cursor: "pointer",
                      }}
                    >
                      {loading === "portal" ? "Cargando..." : "Gestionar suscripción"}
                    </button>
                  )}
                </div>
              ) : isPro ? (
                <button
                  onClick={() => handleAction("subscribe")}
                  disabled={loading === "subscribe"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 2rem",
                    borderRadius: "0.5rem",
                    background: "#E50046",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: loading === "subscribe" ? "wait" : "pointer",
                    opacity: loading === "subscribe" ? 0.6 : 1,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <FiZap size={16} />
                  {loading === "subscribe" ? "Redirigiendo a pago..." : "Activar Professionnel"}
                  <FiArrowRight size={14} />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div
        style={{
          marginTop: "2rem",
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Preguntas frecuentes
        </h3>
        <div className="space-y-4" style={{ fontSize: "0.88rem" }}>
          <div>
            <p style={{ fontWeight: 600, color: "#1e2d4a", margin: "0 0 0.25rem" }}>
              ¿Puedo cancelar en cualquier momento?
            </p>
            <p style={{ color: "#5f6b78", margin: 0 }}>
              Sí. La cancelación es inmediata y no se cobra el siguiente mes. Mantienes acceso hasta el fin del período pagado.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, color: "#1e2d4a", margin: "0 0 0.25rem" }}>
              ¿Qué pasa con mis alumnos si cambio de plan?
            </p>
            <p style={{ color: "#5f6b78", margin: 0 }}>
              Tus alumnos y datos no se pierden. Si vuelves a Essentiel, se aplica el límite de 10 alumnos activos.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 600, color: "#1e2d4a", margin: "0 0 0.25rem" }}>
              ¿Necesito cuenta de Microsoft 365?
            </p>
            <p style={{ color: "#5f6b78", margin: 0 }}>
              No. Con el plan Professionnel te creamos automáticamente una cuenta @holabonjour.es con Teams, OneDrive y Office incluidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
