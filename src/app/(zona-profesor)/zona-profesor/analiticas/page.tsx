import React from "react";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import Card, { CardContent } from "@/components/ui/Card";
import { FiStar, FiUsers, FiBook, FiClock } from "react-icons/fi";
import AnalyticsCharts from "./AnalyticsCharts";

export default async function AnaliticasPage() {
  const session = await requireTeacher();
  const teacherId = session.user.id;

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const [
    classesThisMonth,
    classesLastMonth,
    activeStudents,
    avgRatingResult,
    hoursThisMonth,
  ] = await Promise.all([
    // Classes this month
    prisma.lesson.count({
      where: {
        teacherId,
        scheduledAt: { gte: thisMonthStart },
        status: { in: ["SCHEDULED", "COMPLETED"] },
      },
    }),
    // Classes last month
    prisma.lesson.count({
      where: {
        teacherId,
        scheduledAt: { gte: lastMonthStart, lte: lastMonthEnd },
        status: { in: ["SCHEDULED", "COMPLETED"] },
      },
    }),
    // Active students (lessons in last 60 days)
    prisma.lesson.findMany({
      where: {
        teacherId,
        scheduledAt: { gte: sixtyDaysAgo },
      },
      select: { studentId: true },
      distinct: ["studentId"],
    }),
    // Average rating
    prisma.review.aggregate({
      where: {
        lesson: { teacherId },
        submittedAt: { not: null },
        rating: { not: null },
      },
      _avg: { rating: true },
      _count: { rating: true },
    }),
    // Hours this month
    prisma.lesson.aggregate({
      where: {
        teacherId,
        scheduledAt: { gte: thisMonthStart },
        status: { in: ["SCHEDULED", "COMPLETED"] },
      },
      _sum: { durationMinutes: true },
    }),
  ]);

  // Monthly data for last 6 months
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
    const [count, hours] = await Promise.all([
      prisma.lesson.count({
        where: {
          teacherId,
          scheduledAt: { gte: start, lte: end },
          status: { in: ["SCHEDULED", "COMPLETED"] },
        },
      }),
      prisma.lesson.aggregate({
        where: {
          teacherId,
          scheduledAt: { gte: start, lte: end },
          status: { in: ["SCHEDULED", "COMPLETED"] },
        },
        _sum: { durationMinutes: true },
      }),
    ]);
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    monthlyData.push({
      month: monthNames[start.getMonth()],
      classes: count,
      hours: Math.round((hours._sum.durationMinutes ?? 0) / 60 * 10) / 10,
    });
  }

  const avgRating = avgRatingResult._avg.rating
    ? avgRatingResult._avg.rating.toFixed(1)
    : "—";
  const totalHoursThisMonth = Math.round((hoursThisMonth._sum.durationMinutes ?? 0) / 60 * 10) / 10;
  const classesDiff = classesThisMonth - classesLastMonth;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analíticas</h2>
        <p className="mt-1 text-sm text-gray-500">
          Resumen de tu actividad docente.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FiBook className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clases este mes</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{classesThisMonth}</p>
                  {classesDiff !== 0 && (
                    <span className={`text-xs font-semibold ${classesDiff > 0 ? "text-green-600" : "text-red-500"}`}>
                      {classesDiff > 0 ? "+" : ""}{classesDiff} vs anterior
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <FiUsers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alumnos activos</p>
                <p className="text-2xl font-bold text-gray-900">{activeStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <FiStar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valoración media</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
                  {avgRatingResult._count.rating > 0 && (
                    <span className="text-xs text-gray-500">({avgRatingResult._count.rating})</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <FiClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horas este mes</p>
                <p className="text-2xl font-bold text-gray-900">{totalHoursThisMonth}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts monthlyData={monthlyData} />
    </div>
  );
}
