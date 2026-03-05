"use client";

import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  maxPlays?: number;
}

export default function AudioPlayer({ src, maxPlays = 2 }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const canPlay = plays < maxPlays;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;

    if (playing) {
      audio.pause();
    } else {
      if (audio.ended || audio.currentTime === 0) {
        setPlays((p) => p + 1);
      }
      audio.play();
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        onClick={handlePlay}
        disabled={!canPlay && !playing}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shrink-0 transition-colors ${
          canPlay || playing
            ? "bg-[#395D9F] hover:bg-[#2e4d85] cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        aria-label={playing ? "Pause" : "Écouter"}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div className="flex-1 min-w-0">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#395D9F] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{duration ? formatTime((progress / 100) * duration) : "0:00"}</span>
          <span>{duration ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 shrink-0">
        {plays}/{maxPlays}
      </div>
    </div>
  );
}
