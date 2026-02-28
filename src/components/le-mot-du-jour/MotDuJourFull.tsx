import React from "react";
import type { Expression } from "@/data/mots/expressions";
import Badge from "@/components/ui/Badge";

const categoryLabels: Record<string, string> = {
  idiom: "Modismo",
  slang: "Argot",
  formal: "Formal",
  everyday: "Cotidiano",
  cultural: "Cultural",
};

const categoryVariants: Record<string, "default" | "success" | "warning" | "danger" | "info" | "outline"> = {
  idiom: "info",
  slang: "warning",
  formal: "default",
  everyday: "success",
  cultural: "danger",
};

interface MotDuJourFullProps {
  expression: Expression;
}

export default function MotDuJourFull({ expression }: MotDuJourFullProps) {
  return (
    <div className="vie-card overflow-hidden">
      {/* Header bar */}
      <div
        className="px-6 py-4"
        style={{ background: "var(--vie-navy)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--vie-gold-light)" }}
          >
            Le Mot du Jour
          </span>
          <div className="flex gap-2">
            <Badge variant={categoryVariants[expression.category]}>
              {categoryLabels[expression.category]}
            </Badge>
            <Badge variant="outline">
              <span className="text-white">{expression.level}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* French expression */}
        <div className="text-center">
          {expression.emoji && (
            <span className="mb-2 block text-4xl">{expression.emoji}</span>
          )}
          <h2
            className="text-2xl font-bold sm:text-3xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--vie-navy)",
            }}
          >
            {expression.french}
          </h2>
        </div>

        {/* Divider */}
        <div
          className="mx-auto my-6 h-px w-16"
          style={{ background: "var(--vie-gold)" }}
        />

        {/* Spanish translation */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            En espanol
          </p>
          <p
            className="mt-1 text-lg font-semibold sm:text-xl"
            style={{ color: "var(--vie-navy)" }}
          >
            {expression.spanish}
          </p>
        </div>

        {/* Literal translation */}
        {expression.literal && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Traduccion literal
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              {expression.literal}
            </p>
          </div>
        )}

        {/* Example */}
        <div
          className="mt-6 rounded-lg p-4"
          style={{ background: "var(--vie-cream)" }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            Ejemplo
          </p>
          <p
            className="mt-2 text-base font-medium"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--vie-navy)",
            }}
          >
            &laquo; {expression.example} &raquo;
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {expression.exampleTranslation}
          </p>
        </div>
      </div>
    </div>
  );
}
