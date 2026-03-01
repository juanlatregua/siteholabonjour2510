"use client";

interface MorphBlobProps {
  size?: number;
  color?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

export default function MorphBlob({
  size = 300,
  color = "#e8b865",
  position,
}: MorphBlobProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(80px)",
        pointerEvents: "none",
        animation: "blobPulse 6s ease-in-out infinite",
        borderRadius: "50%",
      }}
    />
  );
}
