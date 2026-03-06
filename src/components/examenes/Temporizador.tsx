"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TemporizadorProps {
  duracionMinutos: number;
  onTiempoAgotado: () => void;
  onTick?: (segundosRestantes: number) => void;
  autoStart?: boolean;
}

type Estado = "activo" | "pausado" | "agotado";

export default function Temporizador({
  duracionMinutos,
  onTiempoAgotado,
  onTick,
  autoStart = true,
}: TemporizadorProps) {
  const totalSeconds = duracionMinutos * 60;
  const [segundosRestantes, setSegundosRestantes] = useState(totalSeconds);
  const [estado, setEstado] = useState<Estado>(autoStart ? "activo" : "pausado");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTickRef = useRef(onTick);
  const onAgotadoRef = useRef(onTiempoAgotado);
  const beeped5min = useRef(false);

  onTickRef.current = onTick;
  onAgotadoRef.current = onTiempoAgotado;

  // Beep using Web Audio API
  const playBeep = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.value = 0.3;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Web Audio not available
    }
  }, []);

  // Timer tick
  useEffect(() => {
    if (estado !== "activo") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSegundosRestantes((prev) => {
        const next = prev - 1;
        onTickRef.current?.(next);

        // Beep at 5 minutes remaining
        if (next === 300 && !beeped5min.current) {
          beeped5min.current = true;
          playBeep();
        }

        if (next <= 0) {
          setEstado("agotado");
          onAgotadoRef.current();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [estado, playBeep]);

  // Pause on tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (estado === "agotado") return;
      if (document.hidden) {
        setEstado("pausado");
      } else {
        setEstado("activo");
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [estado]);

  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const porcentaje = totalSeconds > 0 ? segundosRestantes / totalSeconds : 0;

  // Color based on remaining percentage
  let barColor = "#22c55e"; // green
  let textColor = "#22c55e";
  if (porcentaje <= 0.2) {
    barColor = "#ef4444"; // red
    textColor = "#ef4444";
  } else if (porcentaje <= 0.5) {
    barColor = "#eab308"; // yellow
    textColor = "#eab308";
  }

  const blinking = segundosRestantes <= 60 && segundosRestantes > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.25rem",
        borderRadius: "0.75rem",
        background: "#FFFFFF",
        border: `1px solid ${porcentaje <= 0.2 ? "rgba(239, 68, 68, 0.3)" : "#E2E8F0"}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        minWidth: 140,
      }}
    >
      {/* Time display */}
      <div
        style={{
          fontFamily: "'Space Grotesk', monospace",
          fontSize: "2rem",
          fontWeight: 700,
          color: estado === "agotado" ? "#ef4444" : textColor,
          lineHeight: 1,
          animation: blinking ? "temporizadorBlink 1s ease-in-out infinite" : "none",
        }}
      >
        {estado === "agotado"
          ? "00:00"
          : `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`}
      </div>

      {/* Status label */}
      {estado === "agotado" && (
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#ef4444",
          }}
        >
          Tiempo agotado
        </div>
      )}
      {estado === "pausado" && (
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#eab308",
          }}
        >
          En pausa
        </div>
      )}

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          borderRadius: 2,
          background: "#E2E8F0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${porcentaje * 100}%`,
            background: barColor,
            borderRadius: 2,
            transition: "width 1s linear, background 0.5s ease",
          }}
        />
      </div>

      {/* Blink keyframes */}
      <style>{`
        @keyframes temporizadorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
