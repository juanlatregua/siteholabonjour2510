"use client";

import React from "react";
import Link from "next/link";

interface ClasesFilterProps {
  active: string;
}

const filters = [
  { key: "upcoming", label: "Próximas" },
  { key: "past", label: "Pasadas" },
];

export default function ClasesFilter({ active }: ClasesFilterProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Link
          key={f.key}
          href={`/zona-alumno/clases?filter=${f.key}`}
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
