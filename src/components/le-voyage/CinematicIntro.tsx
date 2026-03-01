"use client";

import { useEffect, useState } from "react";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import TypeWriter from "@/components/cinematic/TypeWriter";
import RevealText from "@/components/cinematic/RevealText";
import GoldButton from "@/components/cinematic/GoldButton";

interface CinematicIntroProps {
  onStart: () => void;
}

export default function CinematicIntro({ onStart }: CinematicIntroProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2800);
    const buttonTimer = setTimeout(() => setShowButton(true), 4200);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0e17]">
      {/* Particles background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute left-[-10%] top-[15%] z-0 opacity-40">
        <MorphBlob color="#e8b865" size={320} />
      </div>
      <div className="pointer-events-none absolute bottom-[10%] right-[-8%] z-0 opacity-30">
        <MorphBlob color="#0f5da0" size={260} />
      </div>
      <div className="pointer-events-none absolute right-[20%] top-[5%] z-0 opacity-20">
        <MorphBlob color="#e8b865" size={180} />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1
          className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <TypeWriter text="Et si on d&eacute;couvrait votre niveau de fran&ccedil;ais ?" />
        </h1>

        <div
          className="mt-6"
          style={{
            opacity: showSubtitle ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <p className="text-lg text-[#f1f5f9]/70 sm:text-xl">
            <RevealText delay={0}>
              Un voyage a travers la langue francaise pour decouvrir votre
              niveau reel.
            </RevealText>
          </p>
        </div>

        <div
          className="mt-10"
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <GoldButton onClick={onStart}>Bon voyage</GoldButton>
        </div>
      </div>
    </section>
  );
}
