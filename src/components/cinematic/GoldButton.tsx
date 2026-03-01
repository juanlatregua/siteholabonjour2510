"use client";

import Link from "next/link";
import { type ReactNode, type MouseEventHandler } from "react";

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: "solid" | "outline";
}

const baseStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 28px",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  transition: "all 0.25s ease",
  textDecoration: "none",
  border: "none",
  fontFamily: "var(--font-heading)",
  letterSpacing: "0.01em",
};

const solidStyles: React.CSSProperties = {
  ...baseStyles,
  backgroundColor: "#e8b865",
  color: "#1a1a2e",
};

const outlineStyles: React.CSSProperties = {
  ...baseStyles,
  backgroundColor: "transparent",
  color: "#e8b865",
  border: "2px solid #e8b865",
};

export default function GoldButton({
  children,
  href,
  onClick,
  className = "",
  variant = "solid",
}: GoldButtonProps) {
  const styles = variant === "solid" ? solidStyles : outlineStyles;

  const hoverClass =
    variant === "solid"
      ? "hover:shadow-[0_0_24px_rgba(232,184,101,0.35)] hover:brightness-110"
      : "hover:bg-[rgba(232,184,101,0.1)]";

  if (href) {
    return (
      <Link
        href={href}
        className={`${hoverClass} ${className}`}
        style={styles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${hoverClass} ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
}
