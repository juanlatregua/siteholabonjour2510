"use client";

import { useState } from "react";

const PACKS = [
  { levelRange: "A1-B2", totalEur: 150, perSession: 37.5, levels: "A1, A2, B1, B2" },
  { levelRange: "C1-C2", totalEur: 200, perSession: 50, levels: "C1, C2" },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"];

type Step = 1 | 2 | 3;

export default function BookingFunnel() {
  const [step, setStep] = useState<Step>(1);
  const [level, setLevel] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number | "">("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const levelRange = level && ["C1", "C2"].includes(level) ? "C1-C2" : "A1-B2";
  const pack = level ? PACKS.find((p) => p.levelRange === levelRange) : null;

  const canProceedStep1 = level && dayOfWeek !== "" && timeSlot;
  const canProceedStep2 = name.trim() && email.trim();

  const handleCheckout = async () => {
    if (!level || !canProceedStep2) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          dayOfWeek,
          timeSlot,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
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

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step === s ? "bg-[#E50046] text-white" : step > s ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {step > s ? "✓" : s}
            </span>
            <span className={`hidden sm:inline ${step === s ? "font-semibold text-gray-900" : "text-gray-500"}`}>
              {s === 1 ? "Elige clase" : s === 2 ? "Tus datos" : "Pago"}
            </span>
            {s < 3 && <span className="mx-1 text-gray-300">→</span>}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Nivel de francés</h3>
            <p className="text-sm text-gray-600">Clases individuales (1 a 1) por Zoom, 55 minutos.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {LEVELS.map((l) => (
                <button key={l} type="button" onClick={() => setLevel(l)} className={`rounded-xl border p-3 text-center transition ${level === l ? "border-[#E50046] bg-blue-50 text-[#E50046]" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  <span className="block text-lg font-bold">{l}</span>
                </button>
              ))}
            </div>
            {pack && <p className="mt-2 text-sm text-gray-600">Pack {pack.levelRange}: {pack.totalEur} € ({pack.perSession.toFixed(2)} €/sesión)</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Día preferido</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button key={d.value} type="button" onClick={() => setDayOfWeek(d.value)} className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${dayOfWeek === d.value ? "border-[#E50046] bg-blue-50 text-[#E50046]" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hora preferida</h3>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((t) => (
                <button key={t} type="button" onClick={() => setTimeSlot(t)} className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${timeSlot === t ? "border-[#E50046] bg-blue-50 text-[#E50046]" : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button type="button" disabled={!canProceedStep1} onClick={() => setStep(2)} className="w-full rounded-xl bg-[#E50046] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c7003b] disabled:opacity-50">
            Continuar
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <button type="button" onClick={() => setStep(1)} className="text-sm text-[#E50046] hover:underline">← Volver</button>
          <div>
            <label htmlFor="booking-name" className="block text-sm font-medium text-gray-900">Nombre completo *</label>
            <input id="booking-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm" placeholder="Tu nombre" />
          </div>
          <div>
            <label htmlFor="booking-email" className="block text-sm font-medium text-gray-900">Email *</label>
            <input id="booking-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm" placeholder="tu@email.com" />
          </div>
          <div>
            <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-900">Teléfono (para WhatsApp)</label>
            <input id="booking-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm" placeholder="+34 600 123 456" />
          </div>
          <button type="button" disabled={!canProceedStep2} onClick={() => setStep(3)} className="w-full rounded-xl bg-[#E50046] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c7003b] disabled:opacity-50">
            Continuar al pago
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && pack && (
        <div className="space-y-4">
          <button type="button" onClick={() => setStep(2)} className="text-sm text-[#E50046] hover:underline">← Volver</button>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Resumen</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p><strong>Nivel:</strong> {level} ({pack.levelRange})</p>
              <p><strong>Pack:</strong> 4 clases de 55 min por Zoom</p>
              <p><strong>Día:</strong> {DAYS.find((d) => d.value === dayOfWeek)?.label}</p>
              <p><strong>Hora:</strong> {timeSlot}</p>
              <p><strong>Nombre:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              {phone && <p><strong>Teléfono:</strong> {phone}</p>}
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 p-4">
              <p className="text-2xl font-bold text-[#E50046]">{pack.totalEur} €</p>
              <p className="text-sm text-gray-600">{pack.perSession.toFixed(2)} €/sesión · IVA incluido</p>
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Anulación:</strong> 48h antes. Si no, se descuenta del bono. Excepción: justificante médico en 24h.
          </div>
          {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
          <button type="button" disabled={loading} onClick={handleCheckout} className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50">
            {loading ? "Procesando..." : `Pagar ${pack.totalEur} € con tarjeta`}
          </button>
          <p className="text-center text-xs text-gray-500">Serás redirigido a Stripe para completar el pago.</p>
        </div>
      )}
    </div>
  );
}
