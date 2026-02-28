export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addDays, format } from "date-fns";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, error: "UNAUTHORIZED", message: "No autenticado" },
      { status: 401 }
    );
  }

  const { searchParams } = request.nextUrl;
  const teacherId = searchParams.get("teacherId");
  const week = searchParams.get("week"); // e.g. "2026-W09"

  if (!teacherId || !week) {
    return NextResponse.json(
      {
        ok: false,
        error: "MISSING_PARAMS",
        message: "Se requiere teacherId y week",
      },
      { status: 400 }
    );
  }

  // Parse week string to get the Monday of that week
  const weekMatch = week.match(/^(\d{4})-W(\d{2})$/);
  if (!weekMatch) {
    return NextResponse.json(
      { ok: false, error: "INVALID_WEEK", message: "Formato de semana invalido. Usar YYYY-Www" },
      { status: 400 }
    );
  }

  const yearNum = parseInt(weekMatch[1], 10);
  const weekNum = parseInt(weekMatch[2], 10);

  // Calculate the Monday of the ISO week
  // Jan 4 is always in ISO week 1
  const jan4 = new Date(yearNum, 0, 4);
  const jan4DayOfWeek = jan4.getDay() || 7; // Convert Sunday(0) to 7
  const mondayOfWeek1 = new Date(jan4);
  mondayOfWeek1.setDate(jan4.getDate() - jan4DayOfWeek + 1);
  const mondayOfRequestedWeek = new Date(mondayOfWeek1);
  mondayOfRequestedWeek.setDate(mondayOfWeek1.getDate() + (weekNum - 1) * 7);

  // Get teacher availability (recurring schedule)
  const availabilities = await prisma.availability.findMany({
    where: { teacherId, active: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Get already-booked lessons for this teacher during the week
  const weekStart = mondayOfRequestedWeek;
  const weekEnd = addDays(weekStart, 7);

  const bookedLessons = await prisma.lesson.findMany({
    where: {
      teacherId,
      status: "SCHEDULED",
      scheduledAt: {
        gte: weekStart,
        lt: weekEnd,
      },
    },
    select: { scheduledAt: true },
  });

  // Build a set of booked date+time strings
  const bookedSet = new Set(
    bookedLessons.map((l) => {
      const d = l.scheduledAt;
      return `${format(d, "yyyy-MM-dd")}_${format(d, "HH:mm")}`;
    })
  );

  // Build available slots per day
  const slots: Record<string, string[]> = {};

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const day = addDays(weekStart, dayOffset);
    const dayOfWeek = day.getDay(); // 0=Sun ... 6=Sat
    const dateStr = format(day, "yyyy-MM-dd");

    const dayAvailabilities = availabilities.filter(
      (a) => a.dayOfWeek === dayOfWeek
    );

    const availableSlots: string[] = [];

    for (const avail of dayAvailabilities) {
      const key = `${dateStr}_${avail.startTime}`;
      if (!bookedSet.has(key)) {
        // Also check that the slot is in the future
        const slotDateTime = new Date(`${dateStr}T${avail.startTime}:00`);
        if (slotDateTime > new Date()) {
          availableSlots.push(avail.startTime);
        }
      }
    }

    if (availableSlots.length > 0) {
      slots[dateStr] = availableSlots.sort();
    }
  }

  return NextResponse.json({ ok: true, slots });
}
