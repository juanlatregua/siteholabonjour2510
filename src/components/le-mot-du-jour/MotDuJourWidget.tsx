import React from "react";
import Link from "next/link";
import { getTodayExpression } from "@/data/mots/expressions";
import Badge from "@/components/ui/Badge";
import FlipCard from "./FlipCard";

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

export default function MotDuJourWidget() {
  const expression = getTodayExpression();

  const front = (
    <div
      className="vie-card p-6"
      style={{ minHeight: "160px", background: "white" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--vie-gold)" }}
        >
          Le Mot du Jour
        </span>
        <Badge variant={categoryVariants[expression.category]}>
          {categoryLabels[expression.category]}
        </Badge>
      </div>
      <p
        className="text-xl font-bold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--vie-navy)",
        }}
      >
        {expression.emoji && <span className="mr-2">{expression.emoji}</span>}
        {expression.french}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Haz clic para ver la traduccion
      </p>
    </div>
  );

  const back = (
    <div
      className="vie-card p-6"
      style={{ minHeight: "160px", background: "white" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--vie-gold)" }}
        >
          Traduccion
        </span>
        <Badge variant="outline">{expression.level}</Badge>
      </div>
      <p
        className="text-lg font-semibold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--vie-navy)",
        }}
      >
        {expression.spanish}
      </p>
      <p className="mt-2 text-sm italic text-gray-600">
        &laquo; {expression.example} &raquo;
      </p>
    </div>
  );

  return (
    <div>
      <FlipCard front={front} back={back} />
      <div className="mt-3 text-right">
        <Link
          href="/le-mot-du-jour"
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "var(--vie-gold)" }}
        >
          Ver mas &rarr;
        </Link>
      </div>
    </div>
  );
}
