"use client";

import React from "react";
import Link from "next/link";

interface RecursosFilterProps {
  active: string;
}

const filters = [
  { key: "ALL", label: "Todos" },
  { key: "PDF", label: "PDF" },
  { key: "AUDIO", label: "Audio" },
  { key: "DOC", label: "Documento" },
  { key: "NOTE", label: "Nota" },
];

export default function RecursosFilter({ active }: RecursosFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <Link
          key={f.key}
          href={
            f.key === "ALL"
              ? "/zona-alumno/recursos"
              : `/zona-alumno/recursos?type=${f.key}`
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            active === f.key
              ? "bg-[#0b3c6f] text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {f.label}
        </Link>
      ))}
    </div>
  );
}
