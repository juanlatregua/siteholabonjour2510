import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  glow?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  glow = false,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 24,
        padding: "24px 32px",
        boxShadow: glow
          ? "0 0 40px rgba(232,184,101,0.15), 0 0 80px rgba(232,184,101,0.05)"
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
