"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

type PaymentMethod = "card" | "bizum" | "transfer";

const BANK_INFO = {
  holder: "HBTJ Consultores Lingüísticos S.L.",
  iban: "ES66 0182 3370 67 0201616991",
  bic: "BBVAESMM",
  bizumPhone: "654 366 320",
};

export default function BookingFunnel() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [manualReference, setManualReference] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-bot honeypot

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

  const handleManualPayment = async () => {
    if (!canProceedStep2) return;
    if (!isDiagnostico && !level) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: isDiagnostico ? (level || "B1") : level,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          selectedDate,
          selectedTime,
          method: paymentMethod === "bizum" ? "BIZUM" : "TRANSFER",
          reference: manualReference.trim() || undefined,
          producto: isDiagnostico ? "diagnostico" : undefined,
          preparateurSlug: prepInfo?.slug || undefined,
          website: honeypot, // honeypot field
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar el pago.");
        return;
      }
      router.push("/confirmacion?pending=true");
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
          background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)",
          boxShadow: "0 2px 8px rgba(30,45,74,0.04)",
        }}>
          {prepInfo.photo && (
            <img
              src={prepInfo.photo} alt={teacherDisplayName}
              style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
            />
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e2d4a" }}>
              {teacherDisplayName}
              {prepInfo.certificationVerified && (
                <span style={{
                  marginLeft: "0.5rem", fontSize: "0.7rem", padding: "0.15rem 0.5rem",
                  background: "rgba(14,159,110,0.1)", color: "#10b981",
                  borderRadius: "1rem", fontWeight: 600,
                }}>
                  Verificada FEI
                </span>
              )}
            </p>
            {prepInfo.levels.length > 0 && (
              <p style={{ fontSize: "0.75rem", color: "#5f6b78" }}>
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
            <span className={`hidden sm:inline ${step === s ? "font-semibold text-[#1e2d4a]" : "text-gray-400"}`}>
              {s === 1 ? "Elige horario" : s === 2 ? "Tus datos" : "Pago"}
            </span>
            {s < 3 && <span className="mx-1 text-gray-400">→</span>}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Diagnostico header card */}
          {isDiagnostico && (
            <div style={{
              background: "rgba(229,0,70,0.04)", border: "1px solid rgba(229,0,70,0.2)",
              borderRadius: "1rem", padding: "1.25rem",
            }}>
              <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1e2d4a" }}>Sesión diagnóstico</p>
              <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginTop: "0.25rem" }}>
                30 min por Zoom — Evaluamos tu nivel real y te damos un plan de preparación personalizado.
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#E50046", marginTop: "0.5rem" }}>25 €</p>
            </div>
          )}

          {/* Level selector (pack mode only) */}
          {!isDiagnostico && (
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>Nivel de francés</h3>
              <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginTop: "0.15rem" }}>
                Clases individuales (1 a 1) por Zoom, 55 minutos.
              </p>
              <div style={{ display: "grid", gap: "0.5rem", marginTop: "0.75rem" }} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                {LEVELS.map((l) => (
                  <button
                    key={l} type="button" onClick={() => setLevel(l)}
                    style={{
                      padding: "0.75rem", borderRadius: "0.75rem", textAlign: "center",
                      border: level === l ? "2px solid #E50046" : "1px solid rgba(30,45,74,0.12)",
                      background: level === l ? "rgba(229,0,70,0.06)" : "#ffffff",
                      color: level === l ? "#E50046" : "#1e2d4a",
                      fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {pack && (
                <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#5f6b78" }}>
                  Pack {pack.levelRange}: {pack.totalEur} € ({pack.perSession.toFixed(2)} €/sesión)
                </p>
              )}
            </div>
          )}

          {/* Slot picker */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1e2d4a" }}>
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
              background: canProceedStep1 ? "#E50046" : "#E2E8F0",
              color: canProceedStep1 ? "white" : "#9ca3af", border: "none", fontWeight: 700, fontSize: "0.95rem",
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
            <label htmlFor="booking-name" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem", color: "#1e2d4a" }}>Nombre completo *</label>
            <input
              id="booking-name" type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(30,45,74,0.15)", background: "#ffffff",
                color: "#1e2d4a", fontSize: "0.9rem",
              }}
            />
          </div>
          <div>
            <label htmlFor="booking-email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem", color: "#1e2d4a" }}>Email *</label>
            <input
              id="booking-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(30,45,74,0.15)", background: "#ffffff",
                color: "#1e2d4a", fontSize: "0.9rem",
              }}
            />
          </div>
          <div>
            <label htmlFor="booking-phone" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem", color: "#1e2d4a" }}>Teléfono (para WhatsApp)</label>
            <input
              id="booking-phone" type="tel" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+34 600 123 456"
              style={{
                width: "100%", padding: "0.65rem 1rem", borderRadius: "0.75rem",
                border: "1px solid rgba(30,45,74,0.15)", background: "#ffffff",
                color: "#1e2d4a", fontSize: "0.9rem",
              }}
            />
          </div>
          {/* Honeypot — hidden from humans, bots fill it */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <label htmlFor="booking-website">Website</label>
            <input
              id="booking-website" type="text" tabIndex={-1} autoComplete="off"
              value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <button
            type="button" disabled={!canProceedStep2} onClick={() => setStep(3)}
            style={{
              width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
              background: canProceedStep2 ? "#E50046" : "#E2E8F0",
              color: canProceedStep2 ? "white" : "#9ca3af", border: "none", fontWeight: 700, fontSize: "0.95rem",
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
            background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)",
            borderRadius: "1rem", padding: "1.5rem",
            boxShadow: "0 2px 12px rgba(30,45,74,0.06)",
          }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>Resumen</h3>
            <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.8, color: "#3d4a5c" }}>
              {isDiagnostico ? (
                <p><strong style={{ color: "#1e2d4a" }}>Producto:</strong> Sesión diagnóstico (30 min por Zoom)</p>
              ) : (
                <>
                  <p><strong style={{ color: "#1e2d4a" }}>Nivel:</strong> {level} ({pack.levelRange})</p>
                  <p><strong style={{ color: "#1e2d4a" }}>Pack:</strong> 4 clases de 55 min por Zoom</p>
                </>
              )}
              <p><strong style={{ color: "#1e2d4a" }}>Profesora:</strong> {teacherDisplayName}</p>
              <p><strong style={{ color: "#1e2d4a" }}>Fecha:</strong> {displayDate}</p>
              <p><strong style={{ color: "#1e2d4a" }}>Hora:</strong> {selectedTime}h</p>
              <p><strong style={{ color: "#1e2d4a" }}>Nombre:</strong> {name}</p>
              <p><strong style={{ color: "#1e2d4a" }}>Email:</strong> {email}</p>
              {phone && <p><strong style={{ color: "#1e2d4a" }}>Teléfono:</strong> {phone}</p>}
            </div>
            <div style={{
              marginTop: "1rem", padding: "1rem", borderRadius: "0.75rem",
              background: "rgba(229,0,70,0.04)", border: "1px solid rgba(229,0,70,0.15)",
            }}>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#E50046" }}>{pack.totalEur} €</p>
              <p style={{ fontSize: "0.8rem", color: "#5f6b78" }}>
                {isDiagnostico ? "Sesión diagnóstico · IVA incluido" : `${pack.perSession.toFixed(2)} €/sesión · IVA incluido`}
              </p>
            </div>
          </div>

          {/* What's included */}
          <div style={{
            background: "rgba(57,93,159,0.03)", border: "1px solid rgba(57,93,159,0.1)",
            borderRadius: "0.75rem", padding: "1rem",
          }}>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>
              {isDiagnostico ? "Qué incluye la sesión diagnóstico" : "Qué incluye el pack"}
            </h4>
            {isDiagnostico ? (
              <ul style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.8, listStyle: "none", padding: 0, margin: 0 }}>
                <li>✓ 30 minutos por Zoom con Isabelle Guitton</li>
                <li>✓ Evaluación de tu nivel real</li>
                <li>✓ Plan de preparación personalizado</li>
                <li>✓ El enlace Zoom te llegará por email y en tu zona de alumno</li>
                <li>✓ Acceso inmediato a tu zona de alumno tras el pago</li>
              </ul>
            ) : (
              <ul style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.8, listStyle: "none", padding: 0, margin: 0 }}>
                <li>✓ 4 clases individuales de 55 min por Zoom</li>
                <li>✓ Profesora nativa certificada FEI</li>
                <li>✓ Material personalizado según tu nivel</li>
                <li>✓ Acceso a tu zona de alumno con materiales y seguimiento</li>
                <li>✓ Enlace Zoom para cada clase por email</li>
              </ul>
            )}
          </div>

          {/* Payment method selector */}
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>Método de pago</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["card", "bizum", "transfer"] as const).map((m) => (
                <button
                  key={m} type="button" onClick={() => setPaymentMethod(m)}
                  style={{
                    flex: 1, padding: "0.6rem 0.5rem", borderRadius: "0.75rem", textAlign: "center",
                    border: paymentMethod === m ? "2px solid #E50046" : "1px solid rgba(30,45,74,0.12)",
                    background: paymentMethod === m ? "rgba(229,0,70,0.06)" : "#ffffff",
                    color: paymentMethod === m ? "#E50046" : "#3d4a5c",
                    fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                  }}
                >
                  {m === "card" ? "Tarjeta" : m === "bizum" ? "Bizum" : "Transferencia"}
                </button>
              ))}
            </div>
          </div>

          {/* Bizum info */}
          {paymentMethod === "bizum" && (
            <div style={{
              borderRadius: "0.75rem", padding: "1rem", fontSize: "0.85rem",
              background: "rgba(57,93,159,0.04)", border: "1px solid rgba(57,93,159,0.15)",
            }}>
              <p style={{ fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>Envía el Bizum a:</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#395D9F", letterSpacing: "0.05em" }}>{BANK_INFO.bizumPhone}</p>
              <p style={{ color: "#5f6b78", marginTop: "0.25rem" }}>Concepto: tu nombre + email</p>
              <div style={{ marginTop: "0.75rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1e2d4a", marginBottom: "0.25rem" }}>
                  Referencia Bizum (opcional)
                </label>
                <input
                  type="text" value={manualReference} onChange={(e) => setManualReference(e.target.value)}
                  placeholder="Referencia o nº operación"
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                    border: "1px solid rgba(30,45,74,0.15)", fontSize: "0.85rem",
                  }}
                />
              </div>
            </div>
          )}

          {/* Transfer info */}
          {paymentMethod === "transfer" && (
            <div style={{
              borderRadius: "0.75rem", padding: "1rem", fontSize: "0.85rem",
              background: "rgba(57,93,159,0.04)", border: "1px solid rgba(57,93,159,0.15)",
            }}>
              <p style={{ fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>Datos bancarios:</p>
              <table style={{ fontSize: "0.85rem", borderCollapse: "collapse" }}>
                <tbody>
                  <tr><td style={{ padding: "2px 8px 2px 0", fontWeight: 600, color: "#5f6b78" }}>Titular:</td><td style={{ color: "#1e2d4a" }}>{BANK_INFO.holder}</td></tr>
                  <tr><td style={{ padding: "2px 8px 2px 0", fontWeight: 600, color: "#5f6b78" }}>IBAN:</td><td style={{ fontFamily: "monospace", color: "#1e2d4a" }}>{BANK_INFO.iban}</td></tr>
                  <tr><td style={{ padding: "2px 8px 2px 0", fontWeight: 600, color: "#5f6b78" }}>BIC:</td><td style={{ fontFamily: "monospace", color: "#1e2d4a" }}>{BANK_INFO.bic}</td></tr>
                </tbody>
              </table>
              <p style={{ color: "#5f6b78", marginTop: "0.5rem" }}>Concepto: tu nombre + email</p>
              <div style={{ marginTop: "0.75rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1e2d4a", marginBottom: "0.25rem" }}>
                  Referencia transferencia (opcional)
                </label>
                <input
                  type="text" value={manualReference} onChange={(e) => setManualReference(e.target.value)}
                  placeholder="Referencia bancaria"
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
                    border: "1px solid rgba(30,45,74,0.15)", fontSize: "0.85rem",
                  }}
                />
              </div>
            </div>
          )}

          <div style={{
            borderRadius: "0.75rem", padding: "1rem", fontSize: "0.85rem",
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", color: "#b45309",
          }}>
            {isDiagnostico ? (
              <><strong>Anulación:</strong> Cancelación gratuita con 48h de antelación.</>
            ) : (
              <><strong>Anulación:</strong> 48h antes. Si no, se descuenta del bono. Excepción: justificante médico en 24h.</>
            )}
          </div>
          {error && (
            <p role="alert" style={{
              borderRadius: "0.75rem", padding: "0.75rem", fontSize: "0.85rem", fontWeight: 600,
              background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444",
            }}>
              {error}
            </p>
          )}

          {paymentMethod === "card" ? (
            <>
              <button
                type="button" disabled={loading} onClick={handleCheckout}
                style={{
                  width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
                  background: loading ? "#9ca3af" : "#10b981",
                  color: "white", border: "none", fontWeight: 700, fontSize: "0.95rem",
                  cursor: loading ? "default" : "pointer",
                }}
              >
                {loading ? "Procesando..." : `Pagar ${pack.totalEur} € con tarjeta`}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6b7280" }}>
                Serás redirigido a Stripe para completar el pago.
              </p>
            </>
          ) : (
            <>
              <button
                type="button" disabled={loading} onClick={handleManualPayment}
                style={{
                  width: "100%", padding: "0.8rem", borderRadius: "0.75rem",
                  background: loading ? "#9ca3af" : "#395D9F",
                  color: "white", border: "none", fontWeight: 700, fontSize: "0.95rem",
                  cursor: loading ? "default" : "pointer",
                }}
              >
                {loading ? "Procesando..." : paymentMethod === "bizum" ? "He pagado por Bizum" : "He realizado la transferencia"}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af" }}>
                Confirmaremos tu pago en menos de 24h.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
