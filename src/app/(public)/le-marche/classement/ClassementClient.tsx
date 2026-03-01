"use client";

import React, { useState } from "react";
import Leaderboard from "@/components/le-marche/Leaderboard";
import { quizWeeks } from "@/data/quizzes/quizzes";

export default function ClassementClient() {
  const [selectedWeek, setSelectedWeek] = useState<number | undefined>(undefined);

  return (
    <div>
      {/* Week filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedWeek(undefined)}
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: selectedWeek === undefined ? "var(--vie-sage, #8fbc8f)" : "var(--vie-cream, #f5f0eb)",
            color: selectedWeek === undefined ? "white" : "var(--vie-navy, #1e3a5f)",
          }}
        >
          Todas
        </button>
        {quizWeeks.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => setSelectedWeek(week.weekNumber)}
            className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
            style={{
              backgroundColor:
                selectedWeek === week.weekNumber
                  ? "var(--vie-sage, #8fbc8f)"
                  : "var(--vie-cream, #f5f0eb)",
              color:
                selectedWeek === week.weekNumber
                  ? "white"
                  : "var(--vie-navy, #1e3a5f)",
            }}
          >
            Sem. {week.weekNumber}
          </button>
        ))}
      </div>

      <Leaderboard weekNumber={selectedWeek} />
    </div>
  );
}
