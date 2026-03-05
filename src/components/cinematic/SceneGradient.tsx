const gradients = {
  paris:     "linear-gradient(135deg, #1e2d4a 0%, #253d5e 50%, #1a3a6b 100%)",
  lyon:      "linear-gradient(135deg, #2d1b4e 0%, #1e2d4a 50%, #462255 100%)",
  bordeaux:  "linear-gradient(135deg, #1b2838 0%, #1e2d4a 50%, #1b3a4b 100%)",
  marseille: "linear-gradient(135deg, #1a2740 0%, #1e2d4a 50%, #324a5f 100%)",
  default:   "linear-gradient(135deg, #1e2d4a 0%, #253d5e 50%, #1a3a6b 100%)",
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
