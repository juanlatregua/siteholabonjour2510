"use client";

import { useState, useEffect, useRef } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: TypeWriterProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Handle initial delay
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Type characters one by one
  useEffect(() => {
    if (!started) return;
    if (displayedCount >= text.length) {
      onCompleteRef.current?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedCount((c) => c + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayedCount, text.length, speed]);

  const isComplete = displayedCount >= text.length;

  return (
    <span>
      {text.slice(0, displayedCount)}
      {!isComplete && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            backgroundColor: "currentColor",
            marginLeft: "1px",
            verticalAlign: "text-bottom",
            animation: "cursorBlink 0.8s step-end infinite",
          }}
        />
      )}
    </span>
  );
}
