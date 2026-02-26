"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AssessmentQuestionAudio } from "@/lib/assessment/types";

const PLAYBACK_RATES = [0.75, 1, 1.25] as const;

const formatTime = (rawSeconds: number): string => {
  const safeSeconds = Number.isFinite(rawSeconds) ? Math.max(0, rawSeconds) : 0;
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(safeSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const getNextRate = (currentRate: number): number => {
  const currentIndex = PLAYBACK_RATES.indexOf(
    currentRate as (typeof PLAYBACK_RATES)[number],
  );

  if (currentIndex === -1) {
    return PLAYBACK_RATES[1];
  }

  const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;
  return PLAYBACK_RATES[nextIndex];
};

const stopSpeech = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
};

const AssessmentAudioPlayer = ({
  audio,
  fallbackText,
}: {
  audio?: AssessmentQuestionAudio;
  fallbackText: string;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [error, setError] = useState("");

  const hasAudioSource = Boolean(audio?.src);
  const supportsTts = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }, []);

  useEffect(() => {
    const player = audioRef.current;
    if (!player) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(player.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(player.duration || 0);
      setIsReady(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(player.duration || 0);
    };

    const handleError = () => {
      setIsPlaying(false);
      setError("No se pudo cargar el audio.");
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("loadedmetadata", handleLoadedMetadata);
    player.addEventListener("ended", handleEnded);
    player.addEventListener("error", handleError);

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("loadedmetadata", handleLoadedMetadata);
      player.removeEventListener("ended", handleEnded);
      player.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const player = audioRef.current;
    if (!player) {
      return;
    }

    player.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handleToggleAudio = async () => {
    const player = audioRef.current;
    if (!player || !hasAudioSource) {
      return;
    }

    try {
      setError("");
      if (isPlaying) {
        player.pause();
        setIsPlaying(false);
        return;
      }

      stopSpeech();
      setTtsPlaying(false);
      await player.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setError("No se pudo iniciar el audio en este navegador.");
    }
  };

  const handleSeek = (value: string) => {
    const player = audioRef.current;
    if (!player) {
      return;
    }

    const nextTime = Number.parseFloat(value);
    player.currentTime = Number.isFinite(nextTime) ? nextTime : 0;
    setCurrentTime(player.currentTime);
  };

  const handleRewind = () => {
    const player = audioRef.current;
    if (!player) {
      return;
    }

    player.currentTime = Math.max(0, player.currentTime - 10);
    setCurrentTime(player.currentTime);
  };

  const handleRateCycle = () => {
    setPlaybackRate((current) => getNextRate(current));
  };

  const handleToggleTts = () => {
    if (!supportsTts || typeof window === "undefined") {
      return;
    }

    if (ttsPlaying) {
      stopSpeech();
      setTtsPlaying(false);
      return;
    }

    const textToSpeak = audio?.ttsText?.trim() || audio?.transcript?.trim() || fallbackText.trim();

    if (!textToSpeak) {
      setError("No hay texto disponible para el lector.");
      return;
    }

    try {
      setError("");

      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = () => {
        setTtsPlaying(false);
      };
      utterance.onerror = () => {
        setTtsPlaying(false);
        setError("El lector no pudo reproducir este enunciado.");
      };

      stopSpeech();
      window.speechSynthesis.speak(utterance);
      setTtsPlaying(true);
    } catch {
      setTtsPlaying(false);
      setError("El lector no esta disponible en este dispositivo.");
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-cyan-200/70 bg-cyan-50/40 p-3 shadow-sm sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0f5da0]">
          Comprension oral
        </p>
        <p className="text-xs font-medium text-slate-600">{audio?.title || "Lector integrado"}</p>
      </div>

      <p className="mt-2 text-sm text-slate-700">Escucha el audio y selecciona la opcion correcta.</p>

      {hasAudioSource && (
        <div className="mt-3 space-y-3">
          <audio ref={audioRef} preload="none" src={audio?.src} />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleToggleAudio()}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-3.5 text-sm font-semibold text-white"
              aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
            >
              {isPlaying ? "Pausar" : "Reproducir"}
            </button>
            <button
              type="button"
              onClick={handleRewind}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-300 bg-white px-3 text-sm font-semibold text-[#0f5da0]"
              aria-label="Retroceder 10 segundos"
            >
              -10s
            </button>
            <button
              type="button"
              onClick={handleRateCycle}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-300 bg-white px-3 text-sm font-semibold text-[#0f5da0]"
              aria-label="Cambiar velocidad de reproduccion"
            >
              {playbackRate.toFixed(2).replace(".00", "")}x
            </button>
            <button
              type="button"
              onClick={handleToggleTts}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-300 bg-white px-3 text-sm font-semibold text-[#0f5da0]"
              aria-label={ttsPlaying ? "Detener lector" : "Leer en voz alta"}
            >
              {ttsPlaying ? "Detener lector" : "Lector FR"}
            </button>
          </div>

          <label className="block text-xs font-medium uppercase tracking-wide text-slate-600" htmlFor="audio-progress">
            Progreso audio
          </label>
          <input
            id="audio-progress"
            type="range"
            min={0}
            max={duration || 0}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => handleSeek(event.target.value)}
            className="w-full accent-[#0f5da0]"
            disabled={!isReady}
          />

          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {!hasAudioSource && (
        <p className="mt-3 rounded-lg border border-cyan-100 bg-white px-3 py-2 text-sm text-slate-700">
          Esta pregunta no incluye audio externo. Usa el lector integrado para escuchar el enunciado.
        </p>
      )}

      {error && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {error}
        </p>
      )}
    </div>
  );
};

export default AssessmentAudioPlayer;
