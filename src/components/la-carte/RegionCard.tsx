import React from "react";
import Link from "next/link";
import type { Region } from "@/data/regions/regions";

interface RegionCardProps {
  region: Region;
}

export default function RegionCard({ region }: RegionCardProps) {
  return (
    <Link href={`/la-carte/${region.slug}`} className="block">
      <div className="vie-card p-5">
        <div className="flex items-start gap-3">
          <div
            className="mt-1 h-4 w-4 shrink-0 rounded-full"
            style={{ backgroundColor: region.color }}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--vie-navy)",
              }}
            >
              {region.name}
            </h3>
            <p
              className="mt-0.5 text-sm"
              style={{ color: "var(--vie-wine)" }}
            >
              Capital: {region.capital}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {region.specialties.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="inline-block rounded-full px-2 py-0.5 text-xs"
                  style={{
                    background: "var(--vie-gold-light)",
                    color: "var(--vie-navy)",
                  }}
                >
                  {s}
                </span>
              ))}
              {region.specialties.length > 3 && (
                <span className="inline-block rounded-full px-2 py-0.5 text-xs text-gray-500">
                  +{region.specialties.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
