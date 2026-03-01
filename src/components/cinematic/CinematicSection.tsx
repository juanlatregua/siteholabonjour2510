import { type ReactNode } from "react";
import SceneGradient, { type Scene } from "./SceneGradient";
import Particles from "./Particles";
import MorphBlob from "./MorphBlob";

interface CinematicSectionProps {
  children: ReactNode;
  className?: string;
  particles?: boolean;
  blobs?: boolean;
  scene?: Scene;
}

export default function CinematicSection({
  children,
  className = "",
  particles = false,
  blobs = false,
  scene,
}: CinematicSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "var(--cin-bg)",
        color: "var(--cin-text)",
      }}
    >
      {scene && <SceneGradient scene={scene} />}
      {particles && <Particles />}
      {blobs && (
        <>
          <MorphBlob
            size={400}
            color="#e8b865"
            position={{ top: "-10%", left: "-5%" }}
          />
          <MorphBlob
            size={300}
            color="#3b82f6"
            position={{ bottom: "-10%", right: "-5%" }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
