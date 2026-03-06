"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PublicSlotPicker from "@/components/booking/PublicSlotPicker";

const PACKS = [
  { levelRange: "A1-B2", totalEur: 150, perSession: 37.5, levels: "A1, A2, B1, B2" },
  { levelRange: "C1-C2", totalEur: 200, perSession: 50, levels: "C1, C2" },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

type Step = 1 | 2 | 3;

interface PreparateurInfo {
  teacherName: string;
  photo: string | null;
  slug: string | null;
  hourlyRate: number | null; // cents
  levels: string[];
  certificationVerified: boolean;
}

export default function BookingFunnel() {
  const searchParams = useSearchParams();
  const productoParam = searchParams.get("producto"); // "diagnostico" or null
  const nivelParam = searchParams.get("nivel");       // e.g. "B2"
  const preparateurSlug = searchParams.get("preparateur"); // e.g. "isabelle-guitton"
  const isDiagnostico = productoParam === "diagnostico";

  const [step, setStep] = useState<Step>(1);
  const [level, setLevel] = useState(nivelParam && LEVELS.includes(nivelParam as typeof LEVELS[number]) ? nivelParam : "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prepInfo, setPrepInfo] = useState<PreparateurInfo | null>(null);

  // Fetch preparateur info
  useEffect(() => {
    const url = preparateurSlug
      ? `/api/public/preparateur?slug=${encodeURIComponent(preparateurSlug)}`
      : "/api/public/preparateur";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setPrepInfo(data);
      })
      .catch(() => {});
  }, [preparateurSlug]);

  // Compute pack prices — use preparateur hourlyRate if available
  const customHourly = prepInfo?.hourlyRate ? prepInfo.hourlyRate / 100 : null;
  const packPrices = customHourly
    ? [
        { levelRange: "A1-B2", totalEur: customHourly * 4, perSession: customHourly, levels: "A1, A2, B1, B2" },
        { levelRange: "C1-C2", totalEur: customHourly * 4, perSession: customHourly, levels: "C1, C2" },
      ]
    : PACKS;

  const levelRange = isDiagnostico
    ? "diagnostico"
    : level && ["C1", "C2"].includes(level) ? "C1-C2" : "A1-B2";

  const pack = isDiagnostico
    ? { levelRange: "diagnostico", totalEur: 25, perSession: 25, levels: "" }
    : level ? packPrices.find((p) => p.levelRange === levelRange) : null;

  const canProceedStep1 = (isDiagnostico || level) && selectedDate && selectedTime;
  const canProceedStep2 = name.trim() && email.trim();

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleCheckout = async () => {
    if (!canProceedStep2) return;
    if (!isDiagnostico && !level) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: isDiagnostico ? (level || "B1") : level,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          selectedDate,
          selectedTime,
          producto: isDiagnostico ? "diagnostico" : undefined,
          preparateurSlug: prepInfo?.slug || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al crear la reserva.");
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Format selected date for display
  const displayDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("es-ES", {
        weekday: "long", day: "numeric", month: "long",
      })
    : "";

  const teacherDisplayName = prepInfo?.teacherName || "Isabelle";

  return (
    <div className="space-y-6">
      {/* Preparateur badge */}
      {prepInfo && (
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.75rem 1rem", borderRadius: "0.75rem",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
        }}>
          {prepInfo.photo && (
            <img
              src={prepInfo.photo} alt={teacherDisplayName}
              style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>
              {teacherDisplayName}
              {prepInfo.certificationVerified && (
                <span style={{
                  marginLeft: "0.5rem", fontSize: "0.7rem", padding: "0.15rem 0.5rem",
                  background: "rgba(14,159,110,0.15)", color: "#10b981",
                  borderRadius: "1rem", fontWeight: 600,
                }}>
                  Verificada FEI
                </span>
              )}
            </p>
            {prepInfo.levels.length > 0 && (
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                Niveles: {prepInfo.levels.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step === s ? "bg-[#E50046] text-white" : step > s ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {step > s ? "✓" : s}
            </span>
            <span className={`hidden sm:inline ${step === s ? "font-semibold text-white" : "text-gray-400"}`}>
              {s === 1 ? "Elige horario" : s === 2 ? "Tus datos" : "Pago"}
            </span>
            {s < 3 && <span className="mx-1 text-gray-500">→</span>}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Diagnostico header card */}
          {isDiagnostico && (
            <div style={{
              background: "rgba(229,0,70,0.08)", border: "1px solid rgba(229,0,70,0.25)",
              borderRadius: "1rem", padding: "1.25rem",
            }}>
              <p style={{ fontWeight: 700, fontSize: "1.05rem" }}>Sesión diagnóstico</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", marginTop: "0.25rem" }}>
                30 min por Zoom — Evaluamos tu nivel real y te damos un plan de preparación personalizado.
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#E50046", marginTop: "0.5rem" }}>25 €</p>
            </div>
          )}

          {/* Level selector (pack mode only) */}
          {!isDiagnostico && (
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Nivel de francés</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: "0.15rem" }}>
                Clases individuales (1 a 1) por Zoom, 55 minutos.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.5rem", marginTop: "0.75rem" }}>
                {LEVELS.map((l) => (
                  <button
                    key={l} type="button" onClick={() => setLevel(l)}
                    style={{
                      padding: "0.75rem", borderRadius: "0.75rem", textAlign: "center",
                      border: level === l ? "2px solid #E50046" : "1px solid rgba(255,255,255,0.15)",
                      background: level === l ? "rgba(229,0,70,0.15)" : "rgba(255,255,255,0.06)",
                      color: level === l ? "#E50046" : "rgba(255,255,255,0.8)",
                      fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {pack && (
                <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                  Pack {pack.levelRange}: {pack.totalEur} € ({pack.perSession.toFixed(2)} €/sesión)
                </p>
              )}
            </div>
          )}

          {/* Slot picker */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Elige fecha y hora
            </h3>
            <PublicSlotPicker onSelect={handleSlotSelect} slug={prepInfo?.slug} />
            {selectedDate && selectedTime && (
              <p style={{
                marginTop: "0.75rem", fontSize: "0.9rem", fontWeight: 600, color: "#E50046",
              }}>
                Seleccionado: {displayDate}, {selectedTime}h
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={!canProceedStep1}
            onClick={() => setStep(2)}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
              background: canProceedStep1 ? "#E50046" : "rgba(229,0,70,0.3)",
              color: "white", border: "none", fontWeight: 700, fontSize: "0.95rem",
              cursor: canProceedStep1 ? "pointer" : "default",
              transition: "all 0.15s",
            }}
          >
            Continuar
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <button type="button" onClick={() => setStep(1)} style={{ fontSize: "0.85rem", color: "#E50046", background: "none", border: "none", cursor: "pointer" }}>← Volver</button>
          <div>
            <label htmlFor="booking-name" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Nombre completo *</label>
            <input
              id="booking-name" type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)",
                color: "white", fontSize: "0.9rem",
              }}
            />
          </div>
          <div>
            <label htmlFor="booking-email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Email *</label>
            <input
              id="booking-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)",
                color: "white", fontSize: "0.9rem",
              }}
            />
          </div>
          <div>
            <label htmlFor="booking-phone" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Teléfono (para WhatsApp)</label>
            <input
              id="booking-phone" type="tel" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+34 600 123 456"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)",
                color: "white", fontSize: "0.9rem",
              }}
            />
          </div>
          <button
            type="button" disabled={!canProceedStep2} onClick={() => setStep(3)}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
              background: canProceedStep2 ? "#E50046" : "rgba(229,0,70,0.3)",
              color: "white", border: "none", fontWeight: 700, fontSize: "0.95rem",
              cursor: canProceedStep2 ? "pointer" : "default",
            }}
          >
            Continuar al pago
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && pack && (
        <div className="space-y-4">
          <button type="button" onClick={() => setStep(2)} style={{ fontSize: "0.85rem", color: "#E50046", background: "none", border: "none", cursor: "pointer" }}>← Volver</button>
          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1rem", padding: "1.5rem",
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Resumen</h3>
            <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}>
              {isDiagnostico ? (
                <p><strong style={{ color: "white" }}>Producto:</strong> Sesión diagnóstico (30 min por Zoom)</p>
              ) : (
                <>
                  <p><strong style={{ color: "white" }}>Nivel:</strong> {level} ({pack.levelRange})</p>
                  <p><strong style={{ color: "white" }}>Pack:</strong> 4 clases de 55 min por Zoom</p>
                </>
              )}
              <p><strong style={{ color: "white" }}>Profesora:</strong> {teacherDisplayName}</p>
              <p><strong style={{ color: "white" }}>Fecha:</strong> {displayDate}</p>
              <p><strong style={{ color: "white" }}>Hora:</strong> {selectedTime}h</p>
              <p><strong style={{ color: "white" }}>Nombre:</strong> {name}</p>
              <p><strong style={{ color: "white" }}>Email:</strong> {email}</p>
              {phone && <p><strong style={{ color: "white" }}>Teléfono:</strong> {phone}</p>}
            </div>
            <div style={{
              marginTop: "1rem", padding: "1rem", borderRadius: "0.75rem",
              background: "rgba(229,0,70,0.1)", border: "1px solid rgba(229,0,70,0.2)",
            }}>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#E50046" }}>{pack.totalEur} €</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                {isDiagnostico ? "Sesión diagnóstico · IVA incluido" : `${pack.perSession.toFixed(2)} €/sesión · IVA incluido`}
              </p>
            </div>
          </div>
          <div style={{
            borderRadius: "0.75rem", padding: "1rem", fontSize: "0.85rem",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b",
          }}>
            <strong>Anulación:</strong> 48h antes. Si no, se descuenta del bono. Excepción: justificante médico en 24h.
          </div>
          {error && (
            <p style={{
              borderRadius: "0.75rem", padding: "0.75rem", fontSize: "0.85rem", fontWeight: 600,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444",
            }}>
              {error}
            </p>
          )}
          <button
            type="button" disabled={loading} onClick={handleCheckout}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
              background: loading ? "rgba(16,185,129,0.4)" : "#10b981",
              color: "white", border: "none", fontWeight: 700, fontSize: "0.95rem",
              cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? "Procesando..." : `Pagar ${pack.totalEur} € con tarjeta`}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            Serás redirigido a Stripe para completar el pago.
          </p>
        </div>
      )}
    </div>
  );
}
