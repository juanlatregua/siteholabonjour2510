import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import ReviewCard from "@/components/zona/ReviewCard";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FiStar } from "react-icons/fi";

export default async function ResenasAlumnoPage() {
  const session = await requireStudent();

  const reviews = await prisma.review.findMany({
    where: { studentId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      lesson: {
        select: {
          scheduledAt: true,
          teacher: { select: { name: true } },
        },
      },
    },
  });

  const submitted = reviews.filter((r) => r.submittedAt != null);
  const pending = reviews.filter((r) => r.submittedAt == null);
  const totalRating = submitted.reduce((sum, r) => sum + (r.rating ?? 0), 0);
  const avgRating = submitted.length > 0 ? (totalRating / submitted.length).toFixed(1) : "—";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mis Reseñas</h2>
        <p className="mt-1 text-sm text-gray-500">
          Valoraciones de tus clases de francés.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Enviadas</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{submitted.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Media</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              {submitted.length > 0 && <FiStar className="h-5 w-5 fill-amber-400 text-amber-400" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{pending.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending reviews */}
      {pending.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Pendientes de valorar</h3>
          <div className="space-y-3">
            {pending.map((review) => (
              <ReviewCard
                key={review.id}
                rating={review.rating}
                comment={review.comment}
                submittedAt={review.submittedAt}
                scheduledAt={review.lesson.scheduledAt}
                teacherName={review.lesson.teacher.name}
                token={review.token}
              />
            ))}
          </div>
        </div>
      )}

      {/* Submitted reviews */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Reseñas enviadas</h3>
        {submitted.length > 0 ? (
          <div className="space-y-3">
            {submitted.map((review) => (
              <ReviewCard
                key={review.id}
                rating={review.rating}
                comment={review.comment}
                submittedAt={review.submittedAt}
                scheduledAt={review.lesson.scheduledAt}
                teacherName={review.lesson.teacher.name}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FiStar className="h-12 w-12" />}
            title="Sin reseñas"
            description="Tus valoraciones aparecerán aquí después de cada clase."
          />
        )}
      </div>
    </div>
  );
}
