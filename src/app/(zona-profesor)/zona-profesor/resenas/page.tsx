import React from "react";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import Card, { CardContent } from "@/components/ui/Card";
import { FiStar } from "react-icons/fi";
import ResenasProfesorClient from "./ResenasProfesorClient";

export default async function ResenasProfesorPage() {
  const session = await requireTeacher();

  const reviews = await prisma.review.findMany({
    where: {
      lesson: { teacherId: session.user.id },
    },
    orderBy: { createdAt: "desc" },
    include: {
      student: { select: { name: true, email: true } },
      lesson: { select: { scheduledAt: true } },
    },
  });

  const submitted = reviews.filter((r) => r.submittedAt != null);
  const pending = reviews.filter((r) => r.submittedAt == null);
  const totalRating = submitted.reduce((sum, r) => sum + (r.rating ?? 0), 0);
  const avgRating = submitted.length > 0 ? (totalRating / submitted.length).toFixed(1) : "—";

  // Star distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: submitted.filter((r) => r.rating === star).length,
  }));

  // Serialize for client component
  const reviewsData = submitted.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    submittedAt: r.submittedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    studentName: r.student.name || r.student.email,
    scheduledAt: r.lesson.scheduledAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reseñas</h2>
        <p className="mt-1 text-sm text-gray-500">
          Valoraciones de tus alumnos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Total</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{reviews.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Valoración media</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              {submitted.length > 0 && <FiStar className="h-5 w-5 fill-amber-400 text-amber-400" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Enviadas</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{submitted.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{pending.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution */}
      {submitted.length > 0 && (
        <Card>
          <CardContent>
            <p className="mb-3 text-sm font-semibold text-gray-700">Distribución</p>
            <div className="space-y-2">
              {distribution.map(({ star, count }) => {
                const pct = submitted.length > 0 ? (count / submitted.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="flex w-12 items-center gap-1 text-sm text-gray-600">
                      {star} <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-gray-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews list with filters */}
      <ResenasProfesorClient reviews={reviewsData} />
    </div>
  );
}
