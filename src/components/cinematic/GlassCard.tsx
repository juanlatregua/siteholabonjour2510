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
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid rgba(30,45,74,0.08)",
        padding: 32,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered && hover ? "translateY(-6px) scale(1.01)" : "translateY(0)",
        boxShadow: hovered && hover
          ? `0 20px 60px rgba(30,45,74,0.12), 0 0 40px ${glow || "rgba(30,45,74,0.03)"}`
          : "0 2px 12px rgba(30,45,74,0.06)",
      }}
    >
      {children}
    </div>
  );
}
