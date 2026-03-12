"use client";

import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface MonthlyData {
  month: string;
  classes: number;
  hours: number;
}

export default function AnalyticsCharts({ monthlyData }: { monthlyData: MonthlyData[] }) {
  const maxClasses = Math.max(...monthlyData.map((d) => d.classes), 1);
  const maxHours = Math.max(...monthlyData.map((d) => d.hours), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Classes trend */}
      <Card>
        <CardHeader>
          <CardTitle>Clases por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="w-10 text-sm font-medium text-gray-600">{d.month}</span>
                <div className="h-6 flex-1 overflow-hidden rounded bg-gray-100">
                  <div
                    className="flex h-full items-center rounded bg-blue-500 px-2 text-xs font-semibold text-white transition-all"
                    style={{ width: `${Math.max((d.classes / maxClasses) * 100, d.classes > 0 ? 8 : 0)}%` }}
                  >
                    {d.classes > 0 && d.classes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hours trend */}
      <Card>
        <CardHeader>
          <CardTitle>Horas por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="w-10 text-sm font-medium text-gray-600">{d.month}</span>
                <div className="h-6 flex-1 overflow-hidden rounded bg-gray-100">
                  <div
                    className="flex h-full items-center rounded bg-green-500 px-2 text-xs font-semibold text-white transition-all"
                    style={{ width: `${Math.max((d.hours / maxHours) * 100, d.hours > 0 ? 8 : 0)}%` }}
                  >
                    {d.hours > 0 && `${d.hours}h`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
