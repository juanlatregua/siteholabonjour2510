"use client";

import { useState, useEffect } from "react";

interface PassportStampProps {
  level: string;
  score?: number;
  total?: number;
  animated?: boolean;
}

const levelColors: Record<string, string> = {
  A1: "#e74c3c",
  A2: "#e67e22",
  B1: "#f1c40f",
  B2: "#2ecc71",
  C1: "#3498db",
  C2: "#8e44ad",
};

export default function PassportStamp({
  level,
  score,
  total,
  animated = true,
}: PassportStampProps) {
  const [scale, setScale] = useState(animated ? 0 : 1);
  const color = levelColors[level] || "#f1c40f";

  useEffect(() => {
    if (!animated) return;
    const timer = setTimeout(() => setScale(1), 400);
    return () => clearTimeout(timer);
  }, [animated]);

  return (
    <div
      style={{
        position: "relative",
        width: 220,
        height: 220,
        margin: "0 auto",
        transform: `scale(${scale}) rotate(${scale === 1 ? "-6deg" : "-20deg"})`,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        opacity: scale,
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: `4px double ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Inner content */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            NIVEAU CERTIFIÉ
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color,
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1,
              textShadow: `0 0 30px ${color}40`,
            }}
          >
            {level}
          </div>
          {score !== undefined && total !== undefined && (
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {score}/{total} · MCER
            </div>
          )}
          {score !== undefined && total === undefined && (
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {score}% · MCER
            </div>
          )}
        </div>

        {/* Decorative dots around the circle */}
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: `${color}60`,
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 10}deg) translateY(-105px)`,
              transformOrigin: "0 0",
            }}
          />
        ))}
      </div>
    </div>
  );
}
