"use client";

import { useState, useEffect } from "react";

interface PassportStampProps {
  level: string;
  score?: number;
  total?: number;
  animated?: boolean;
}

export default function PassportStamp({
  level,
  score,
  total,
  animated = true,
}: PassportStampProps) {
  const [entered, setEntered] = useState(!animated);

  useEffect(() => {
    if (!animated) return;
    const timer = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(timer);
  }, [animated]);

  return (
    <div
      className="inline-flex flex-col items-center gap-1"
      style={{
        transform: entered ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        willChange: "transform",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "3px dashed #e8b865",
          position: "relative",
        }}
      >
        <span
          className="font-bold tracking-widest uppercase"
          style={{
            color: "#e8b865",
            fontSize: "1.5rem",
            fontFamily: "var(--font-heading)",
          }}
        >
          {level}
        </span>
      </div>
      {score !== undefined && total !== undefined && (
        <span
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {score}/{total}
        </span>
      )}
    </div>
  );
}
