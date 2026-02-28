"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Region } from "@/data/regions/regions";

interface FranceMapProps {
  regions: Region[];
  visitedRegions?: string[];
}

/* Approximate SVG polygon paths for the 13 metropolitan regions of France.
   Coordinates are in a 500x500 viewBox. These are simplified shapes. */
const regionPaths: Record<string, string> = {
  "ile-de-france":
    "M250,175 L265,170 L275,180 L270,195 L255,200 L242,192 L245,178Z",
  "auvergne-rhone-alpes":
    "M275,270 L310,250 L340,260 L355,290 L345,320 L320,340 L290,335 L270,310 L265,285Z",
  "bourgogne-franche-comte":
    "M270,195 L310,185 L340,200 L345,230 L335,255 L310,250 L275,240 L260,220Z",
  "bretagne":
    "M80,155 L115,140 L145,145 L155,165 L140,185 L110,190 L80,180Z",
  "centre-val-de-loire":
    "M170,195 L210,185 L245,195 L250,225 L235,250 L200,255 L175,240 L165,215Z",
  "corse":
    "M390,380 L400,370 L410,385 L408,415 L398,430 L388,420 L385,395Z",
  "grand-est":
    "M290,130 L330,115 L365,130 L370,165 L355,195 L340,200 L310,185 L285,170Z",
  "hauts-de-france":
    "M210,90 L245,75 L280,85 L290,115 L275,140 L250,150 L225,145 L210,120Z",
  "normandie":
    "M135,120 L175,105 L210,115 L215,145 L195,165 L155,170 L135,155Z",
  "nouvelle-aquitaine":
    "M130,260 L175,250 L210,265 L225,300 L215,340 L195,370 L160,380 L130,360 L115,320 L120,285Z",
  "occitanie":
    "M170,370 L215,345 L265,350 L295,370 L290,400 L260,425 L220,430 L185,415 L165,395Z",
  "pays-de-la-loire":
    "M100,200 L140,190 L170,200 L175,235 L160,260 L130,265 L105,250 L95,225Z",
  "provence-alpes-cote-d-azur":
    "M290,335 L330,320 L370,330 L385,355 L370,380 L340,390 L305,380 L290,360Z",
};

export default function FranceMap({ regions, visitedRegions = [] }: FranceMapProps) {
  const router = useRouter();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const hoveredRegion = regions.find((r) => r.slug === hoveredSlug);

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
    });
  }

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: "500px" }}>
      <svg
        viewBox="60 60 380 400"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        role="img"
        aria-label="Mapa interactivo de las regiones de Francia"
      >
        {/* France outline background */}
        <rect x="60" y="60" width="380" height="400" fill="transparent" />

        {regions.map((region) => {
          const path = regionPaths[region.slug];
          if (!path) return null;

          const isVisited = visitedRegions.includes(region.slug);
          const isHovered = hoveredSlug === region.slug;

          let fillColor = "#e5e7eb"; // light gray - unvisited
          if (isVisited) fillColor = "var(--vie-gold)";
          else if (isHovered) fillColor = region.color;

          return (
            <path
              key={region.slug}
              d={path}
              fill={fillColor}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              style={{
                opacity: isHovered ? 1 : 0.85,
                transform: isHovered ? "scale(1.02)" : "scale(1)",
                transformOrigin: "center",
                filter: isHovered
                  ? "drop-shadow(0 2px 6px rgba(0,0,0,0.2))"
                  : "none",
              }}
              onClick={() => router.push(`/la-carte/${region.slug}`)}
              onMouseEnter={() => setHoveredSlug(region.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              role="button"
              tabIndex={0}
              aria-label={`${region.name}${isVisited ? " (visitada)" : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/la-carte/${region.slug}`);
                }
              }}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg px-3 py-2 text-sm shadow-lg"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -100%)",
            background: "var(--vie-navy)",
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          <p className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            {hoveredRegion.name}
          </p>
          <p className="text-xs opacity-80">{hoveredRegion.capital}</p>
          {visitedRegions.includes(hoveredRegion.slug) && (
            <p className="mt-0.5 text-xs" style={{ color: "var(--vie-gold)" }}>
              Visitada
            </p>
          )}
        </div>
      )}
    </div>
  );
}
