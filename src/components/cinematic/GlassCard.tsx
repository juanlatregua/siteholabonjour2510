"use client";

import { useState, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  glow,
  hover = true,
  onClick,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && hover
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: 32,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered && hover ? "translateY(-6px) scale(1.01)" : "translateY(0)",
        boxShadow: hovered && hover
          ? `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${glow || "rgba(255,255,255,0.05)"}`
          : "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  );
}
