const gradients = {
  paris:     "linear-gradient(to bottom, #0a0e17, #1a1028, #0a0e17)",
  lyon:      "linear-gradient(to bottom, #0a0e17, #0d1a1e, #0a0e17)",
  bordeaux:  "linear-gradient(to bottom, #0a0e17, #1a0f14, #0a0e17)",
  marseille: "linear-gradient(to bottom, #0a0e17, #0f1520, #0a0e17)",
  default:   "linear-gradient(to bottom, #0a0e17, #0d1220, #0a0e17)",
} as const;

export type Scene = keyof typeof gradients;

interface SceneGradientProps {
  scene?: Scene;
}

export default function SceneGradient({ scene = "default" }: SceneGradientProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: gradients[scene] }}
    />
  );
}
