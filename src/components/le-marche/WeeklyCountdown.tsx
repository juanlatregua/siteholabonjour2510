"use client";

import React, { useEffect, useState } from "react";

function getNextMondayCET(): Date {
  const now = new Date();

  // Convert current time to CET (UTC+1) / CEST (UTC+2)
  // We use Europe/Paris timezone for CET
  const cetOffset = getCETOffset(now);
  const cetNow = new Date(now.getTime() + cetOffset);

  // Find the next Monday at 08:00 CET
  const dayOfWeek = cetNow.getUTCDay(); // 0=Sun
  let daysUntilMonday = (1 - dayOfWeek + 7) % 7;

  // If today is Monday and we're before 08:00 CET, target is today
  if (daysUntilMonday === 0) {
    const hours = cetNow.getUTCHours();
    if (hours >= 8) {
      daysUntilMonday = 7; // Next Monday
    }
  }

  const nextMonday = new Date(cetNow);
  nextMonday.setUTCDate(cetNow.getUTCDate() + daysUntilMonday);
  nextMonday.setUTCHours(8, 0, 0, 0);

  // Convert back from CET to UTC
  return new Date(nextMonday.getTime() - cetOffset);
}

function getCETOffset(date: Date): number {
  // CET is UTC+1, CEST (summer) is UTC+2
  // Simple check: DST in Europe is last Sunday of March to last Sunday of October
  const year = date.getUTCFullYear();
  const marchLast = new Date(Date.UTC(year, 2, 31));
  const marchDST = new Date(
    Date.UTC(year, 2, 31 - marchLast.getUTCDay(), 1, 0, 0)
  );
  const octLast = new Date(Date.UTC(year, 9, 31));
  const octDST = new Date(
    Date.UTC(year, 9, 31 - octLast.getUTCDay(), 1, 0, 0)
  );

  if (date >= marchDST && date < octDST) {
    return 2 * 60 * 60 * 1000; // CEST: UTC+2
  }
  return 1 * 60 * 60 * 1000; // CET: UTC+1
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function WeeklyCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = getNextMondayCET();

    const update = () => setTimeLeft(calculateTimeLeft(target));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="vie-card p-4 text-center">
        <p className="text-sm text-gray-400">Cargando...</p>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="vie-card p-4">
      <p
        className="mb-3 text-center text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--vie-navy, #1e3a5f)" }}
      >
        Proximo quiz en
      </p>
      <div className="flex items-center justify-center gap-3">
        {[
          { value: timeLeft.days, label: "dias" },
          { value: timeLeft.hours, label: "horas" },
          { value: timeLeft.minutes, label: "min" },
          { value: timeLeft.seconds, label: "seg" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <span
              className="rounded-lg px-3 py-2 text-2xl font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--vie-navy, #1e3a5f)",
                backgroundColor: "var(--vie-cream, #f5f0eb)",
              }}
            >
              {pad(value)}
            </span>
            <span className="mt-1 text-[10px] uppercase text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
