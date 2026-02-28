"use client";

import React, { useEffect, useState } from "react";

interface SceneTransitionProps {
  sceneTitle: string;
  onComplete: () => void;
}

export default function SceneTransition({ sceneTitle, onComplete }: SceneTransitionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => setVisible(true), 50);

    // Auto-dismiss after 2 seconds
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      // Give time for fade out animation, then call onComplete
      setTimeout(onComplete, 400);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "var(--vie-navy)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease-in-out",
      }}
    >
      <div
        className="text-center"
        style={{
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.5s ease-out",
        }}
      >
        <h2
          className="text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {sceneTitle}
        </h2>
        <div
          className="mx-auto mt-4 h-0.5 w-16"
          style={{ background: "var(--vie-gold)" }}
        />
      </div>
    </div>
  );
}
