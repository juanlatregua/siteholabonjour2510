export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDefaultTeacher } from "@/lib/teacher";
import { addDays, format, startOfWeek, addWeeks } from "date-fns";

const WEEKS_AHEAD = 4;
const PENDING_PAYMENT_EXPIRY_MINUTES = 30;

export async function GET() {
  try {
    const teacher = await getDefaultTeacher();

    // Clean up expired PENDING_PAYMENT lessons
    const expiryThreshold = new Date(
      Date.now() - PENDING_PAYMENT_EXPIRY_MINUTES * 60 * 1000
    );
    await prisma.lesson.updateMany({
      where: {
        status: "PENDING_PAYMENT",
        createdAt: { lt: expiryThreshold },
      },
      data: { status: "CANCELLED" },
    });

    // Get teacher availability (recurring schedule)
    const availabilities = await prisma.availability.findMany({
      where: { teacherId: teacher.id, active: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });

    // Date range: today → 4 weeks ahead
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const rangeEnd = addWeeks(weekStart, WEEKS_AHEAD);
    const totalDays = Math.ceil(
      (rangeEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Get booked lessons in range
    const bookedLessons = await prisma.lesson.findMany({
      where: {
        teacherId: teacher.id,
        status: { in: ["SCHEDULED", "PENDING_PAYMENT"] },
        scheduledAt: { gte: weekStart, lt: rangeEnd },
      },
      select: { scheduledAt: true },
    });

    const bookedSet = new Set(
      bookedLessons.map((l) => {
        const d = l.scheduledAt;
        return `${format(d, "yyyy-MM-dd")}_${format(d, "HH:mm")}`;
      })
    );

    // Build available slots per day
    const slots: Record<string, string[]> = {};

    for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
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
          const slotDateTime = new Date(`${dateStr}T${avail.startTime}:00`);
          if (slotDateTime > now) {
            availableSlots.push(avail.startTime);
          }
        }
      }

      if (availableSlots.length > 0) {
        slots[dateStr] = availableSlots.sort();
      }
    }

    return NextResponse.json({
      ok: true,
      teacherName: teacher.name || "Isabelle",
      slots,
    });
  } catch (err) {
    console.error("[public/disponibilidad] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error al obtener disponibilidad" },
      { status: 500 }
    );
  }
}
