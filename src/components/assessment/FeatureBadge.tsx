import { type ReactNode } from "react";

interface FeatureBadgeProps {
  icon: ReactNode;
  label: string;
  variant?: "light" | "dark";
}

export default function FeatureBadge({ icon, label, variant = "light" }: FeatureBadgeProps) {
  const classes =
    variant === "dark"
      ? "border-white/25 bg-white/10 text-cyan-100"
      : "border-blue-200 bg-blue-50 text-[#0f5da0]";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </div>
  );
}
