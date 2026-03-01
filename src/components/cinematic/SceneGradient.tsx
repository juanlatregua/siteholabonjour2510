const gradients = {
  paris:     "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  lyon:      "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #462255 100%)",
  bordeaux:  "linear-gradient(135deg, #1b2838 0%, #0d1b2a 50%, #1b3a4b 100%)",
  marseille: "linear-gradient(135deg, #0c1821 0%, #1b2838 50%, #324a5f 100%)",
  default:   "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
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
