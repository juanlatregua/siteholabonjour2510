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
          <TypeWriter text="Apprends le français comme on vit en France" speed={50} />
        </h1>

        <RevealText delay={2400}>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "rgba(241, 245, 249, 0.8)",
              lineHeight: 1.65,
              maxWidth: "680px",
              marginBottom: "2.5rem",
            }}
          >
            Academia de franc&eacute;s online con alma francesa. DELF, DALF,
            conversaci&oacute;n, empresas.
          </p>
        </RevealText>

        <RevealText delay={2800}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <GoldButton href="/test-de-nivel">
              Faire le test de niveau &rarr;
            </GoldButton>
            <a
              href="https://wa.me/34685070304"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 28px",
                borderRadius: 12,
                background: "rgba(37, 211, 102, 0.15)",
                border: "2px solid rgba(37, 211, 102, 0.5)",
                color: "#25d366",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "background 0.25s ease",
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.01em",
                cursor: "pointer",
              }}
            >
              Classe d&apos;essai gratuite
            </a>
          </div>
        </RevealText>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "fadeUp 1s ease infinite alternate",
          opacity: 0.5,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </div>

      {/* Keyframe for scroll indicator */}
      <style>{`
        @keyframes fadeUp {
          from { transform: translateY(0); opacity: 0.3; }
          to { transform: translateY(-8px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
