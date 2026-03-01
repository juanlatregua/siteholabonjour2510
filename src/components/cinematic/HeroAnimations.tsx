"use client";

import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import TypeWriter from "@/components/cinematic/TypeWriter";
import RevealText from "@/components/cinematic/RevealText";
import GoldButton from "@/components/cinematic/GoldButton";

export default function HeroAnimations() {
  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Background effects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Particles />
        <MorphBlob
          size={400}
          position={{ top: "10%", right: "5%" }}
        />
        <MorphBlob
          size={300}
          color="#e8b865"
          position={{ bottom: "15%", left: "10%" }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem 1rem",
          textAlign: "center",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          <TypeWriter text="Aprende francés. Vive en francés." speed={50} />
        </h1>

        <RevealText delay={1800}>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "rgba(241, 245, 249, 0.8)",
              lineHeight: 1.65,
              maxWidth: "680px",
              marginBottom: "2.5rem",
            }}
          >
            Academia online con profesores nativos. Clases en directo,
            preparación DELF/DALF y método inmersivo basado en la cultura
            francesa.
          </p>
        </RevealText>

        <RevealText delay={2200}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <GoldButton href="/test-de-nivel">Descubre tu nivel</GoldButton>
            <GoldButton href="/cursos" variant="outline">
              Ver cursos
            </GoldButton>
          </div>
        </RevealText>
      </div>
    </div>
  );
}
