"use client";

import React, { useState, useCallback } from "react";
import type { Scenario } from "@/data/scenarios/scenarios";
import GameProgress from "@/components/le-jeu/GameProgress";
import SceneTransition from "@/components/le-jeu/SceneTransition";
import DialogBox from "@/components/le-jeu/DialogBox";
import PuzzleRenderer from "@/components/le-jeu/PuzzleRenderer";
import GameComplete from "@/components/le-jeu/GameComplete";
import Button from "@/components/ui/Button";

interface GameEngineProps {
  scenario: Scenario;
}

type GameStatus = "playing" | "scene-transition" | "complete";

const POINTS_PER_CORRECT = 10;

export default function GameEngine({ scenario }: GameEngineProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(new Set());
  const [gameStatus, setGameStatus] = useState<GameStatus>("scene-transition");
  const [puzzleAnswered, setPuzzleAnswered] = useState(false);

  const scenes = scenario.scenes;
  const currentScene = scenes[currentSceneIndex];
  const currentPuzzle = currentScene?.puzzles[currentPuzzleIndex];

  const totalPuzzles = scenes.reduce((acc, s) => acc + s.puzzles.length, 0);
  const maxScore = totalPuzzles * POINTS_PER_CORRECT;

  const handleSceneTransitionComplete = useCallback(() => {
    setGameStatus("playing");
  }, []);

  const handlePuzzleSolve = useCallback(
    (correct: boolean) => {
      setPuzzleAnswered(true);
      if (correct && currentPuzzle) {
        const puzzleId = currentPuzzle.id;
        if (!solvedPuzzles.has(puzzleId)) {
          setScore((s) => s + POINTS_PER_CORRECT);
          setSolvedPuzzles((prev) => {
            const next = new Set(prev);
            next.add(puzzleId);
            return next;
          });
        }
      }
    },
    [currentPuzzle, solvedPuzzles],
  );

  function handleNextPuzzle() {
    if (!currentScene) return;

    setPuzzleAnswered(false);

    if (currentPuzzleIndex < currentScene.puzzles.length - 1) {
      // Next puzzle in same scene
      setCurrentPuzzleIndex((i) => i + 1);
    } else if (currentSceneIndex < scenes.length - 1) {
      // Next scene
      setCurrentSceneIndex((i) => i + 1);
      setCurrentPuzzleIndex(0);
      setGameStatus("scene-transition");
    } else {
      // Game complete
      setGameStatus("complete");
    }
  }

  // Game complete screen
  if (gameStatus === "complete") {
    return (
      <div className="py-8">
        <GameComplete scenario={scenario} score={score} maxScore={maxScore} />
      </div>
    );
  }

  // Scene transition overlay
  if (gameStatus === "scene-transition" && currentScene) {
    return (
      <>
        <GameProgress
          currentScene={currentSceneIndex}
          totalScenes={scenes.length}
          score={score}
        />
        <SceneTransition
          sceneTitle={currentScene.title}
          onComplete={handleSceneTransitionComplete}
        />
      </>
    );
  }

  if (!currentScene) return null;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <GameProgress
        currentScene={currentSceneIndex}
        totalScenes={scenes.length}
        score={score}
      />

      {/* Scene header */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--vie-cream)" }}
      >
        <div className="flex items-center gap-2">
          {currentScene.backgroundEmoji && (
            <span className="text-2xl">{currentScene.backgroundEmoji}</span>
          )}
          <div>
            <h3
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--vie-navy)",
              }}
            >
              {currentScene.title}
            </h3>
            <p className="text-xs text-gray-500">
              {currentScene.description}
            </p>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <DialogBox dialog={currentScene.dialog} />

      {/* Puzzle */}
      {currentPuzzle && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              Puzzle {currentPuzzleIndex + 1} de {currentScene.puzzles.length}
            </p>
          </div>

          <PuzzleRenderer
            key={currentPuzzle.id}
            puzzle={currentPuzzle}
            onSolve={handlePuzzleSolve}
          />

          {puzzleAnswered && (
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" size="sm" onClick={handleNextPuzzle}>
                {currentPuzzleIndex < currentScene.puzzles.length - 1
                  ? "Siguiente puzzle"
                  : currentSceneIndex < scenes.length - 1
                    ? "Siguiente escena"
                    : "Ver resultados"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
