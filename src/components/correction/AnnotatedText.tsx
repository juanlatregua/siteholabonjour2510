"use client";

import { useState } from "react";

interface Annotation {
  start: number;
  end: number;
  type: string;
  original: string;
  correction: string;
  explanation: string;
}

interface AnnotatedTextProps {
  text: string;
  annotations: Annotation[];
}

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  grammaire: { bg: "bg-red-50", border: "border-red-300", text: "text-red-700" },
  orthographe: { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-700" },
  lexique: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-700" },
  syntaxe: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700" },
  ponctuation: { bg: "bg-gray-50", border: "border-gray-300", text: "text-gray-700" },
  registre: { bg: "bg-teal-50", border: "border-teal-300", text: "text-teal-700" },
  "cohérence": { bg: "bg-yellow-100", border: "border-yellow-300", text: "text-yellow-800" },
};

const TYPE_LABELS: Record<string, string> = {
  grammaire: "Gramática",
  orthographe: "Ortografía",
  lexique: "Léxico",
  syntaxe: "Sintaxis",
  ponctuation: "Puntuación",
  registre: "Registro",
  "cohérence": "Coherencia",
};

export default function AnnotatedText({ text, annotations }: AnnotatedTextProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);

  // Sort annotations by start position
  const sorted = [...annotations].sort((a, b) => a.start - b.start);

  // Build segments: alternating between plain text and annotated spans
  const segments: Array<{ text: string; annotation?: Annotation; index?: number }> = [];
  let pos = 0;

  for (let i = 0; i < sorted.length; i++) {
    const ann = sorted[i];
    if (ann.start > pos) {
      segments.push({ text: text.slice(pos, ann.start) });
    }
    segments.push({
      text: text.slice(ann.start, ann.end),
      annotation: ann,
      index: i,
    });
    pos = ann.end;
  }
  if (pos < text.length) {
    segments.push({ text: text.slice(pos) });
  }

  return (
    <div className="space-y-4">
      <div className="leading-7 text-gray-800 text-[15px]">
        {segments.map((seg, idx) => {
          if (!seg.annotation) {
            return <span key={idx}>{seg.text}</span>;
          }

          const colors = TYPE_COLORS[seg.annotation.type] || TYPE_COLORS.grammaire;
          const isActive = activeAnnotation === seg.index;

          return (
            <span key={idx} className="relative inline">
              <span
                className={`cursor-pointer border-b-2 ${colors.border} ${colors.bg} ${colors.text} rounded-sm px-0.5 transition-colors hover:opacity-80`}
                onClick={() =>
                  setActiveAnnotation(isActive ? null : (seg.index ?? null))
                }
              >
                {seg.text}
              </span>
              {isActive && (
                <span className="absolute left-0 top-full z-10 mt-1 w-72 rounded-lg border bg-white p-3 shadow-lg text-sm">
                  <span className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      {TYPE_LABELS[seg.annotation.type] || seg.annotation.type}
                    </span>
                  </span>
                  <span className="block text-gray-500 line-through text-xs">
                    {seg.annotation.original}
                  </span>
                  <span className="block text-green-700 font-medium text-xs">
                    → {seg.annotation.correction}
                  </span>
                  <span className="block text-gray-600 mt-1 text-xs">
                    {seg.annotation.explanation}
                  </span>
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Error type legend */}
      <div className="flex flex-wrap gap-2 pt-2 border-t">
        {Object.entries(TYPE_LABELS).map(([type, label]) => {
          const count = annotations.filter((a) => a.type === type).length;
          if (count === 0) return null;
          const colors = TYPE_COLORS[type];
          return (
            <span
              key={type}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${colors.bg} ${colors.text}`}
            >
              {label}: {count}
            </span>
          );
        })}
      </div>
    </div>
  );
}
