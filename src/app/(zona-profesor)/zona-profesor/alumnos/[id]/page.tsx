import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import LessonCard from "@/components/zona/LessonCard";
import PackCard from "@/components/zona/PackCard";
import MaterialItem from "@/components/zona/MaterialItem";
import PaymentRow from "@/components/zona/PaymentRow";
import Badge from "@/components/ui/Badge";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export default async function AlumnoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const student = await prisma.user.findUnique({
    where: { id },
    include: {
      studentPacks: {
        orderBy: { purchasedAt: "desc" },
      },
      studentLessons: {
        orderBy: { scheduledAt: "desc" },
        take: 20,
        include: {
          teacher: { select: { name: true } },
        },
      },
      studentMaterials: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      studentPayments: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!student || student.coachId !== session.user.id) {
    notFound();
  }

  const levelVariant: Record<string, "info" | "success" | "warning" | "default"> = {
    A1: "info",
    A2: "info",
    B1: "success",
    B2: "success",
    C1: "warning",
    C2: "warning",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {student.name || student.email}
            </h2>
            {student.level && (
              <Badge variant={levelVariant[student.level] || "default"}>
                {student.level}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{student.email}</p>
          {student.phone && (
            <p className="text-sm text-gray-500">Tel: {student.phone}</p>
          )}
          {student.route && (
            <p className="mt-1 text-sm text-gray-500">
              Ruta: <span className="font-medium text-gray-700">{student.route}</span>
            </p>
          )}
        </div>
        <Link
          href="/zona-profesor/alumnos"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Volver
        </Link>
      </div>

      {/* Packs */}
      <Card>
        <CardHeader>
          <CardTitle>Packs</CardTitle>
        </CardHeader>
        <CardContent>
          {student.studentPacks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {student.studentPacks.map((pack) => (
                <PackCard
                  key={pack.id}
                  hoursTotal={pack.hoursTotal}
                  hoursUsed={pack.hoursUsed}
                  levelRange={pack.levelRange}
                  status={pack.status}
                  purchasedAt={pack.purchasedAt}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin packs" description="Este alumno no tiene packs." />
          )}
        </CardContent>
      </Card>

      {/* Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Clases</CardTitle>
        </CardHeader>
        <CardContent>
          {student.studentLessons.length > 0 ? (
            <div className="space-y-3">
              {student.studentLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  scheduledAt={lesson.scheduledAt}
                  status={lesson.status}
                  focus={lesson.focus}
                  teacherName={lesson.teacher.name}
                  zoomLink={lesson.zoomLink}
                  durationMinutes={lesson.durationMinutes}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin clases" description="Este alumno no tiene clases registradas." />
          )}
        </CardContent>
      </Card>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Materiales</CardTitle>
        </CardHeader>
        <CardContent>
          {student.studentMaterials.length > 0 ? (
            <div className="space-y-2">
              {student.studentMaterials.map((m) => (
                <MaterialItem
                  key={m.id}
                  title={m.title}
                  type={m.type}
                  storagePath={m.storagePath}
                  publicUrl={m.publicUrl}
                  createdAt={m.createdAt}
                  sizeBytes={m.sizeBytes}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin materiales" description="No hay materiales para este alumno." />
          )}
        </CardContent>
      </Card>

      {/* Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          {student.studentPayments.length > 0 ? (
            <div>
              {student.studentPayments.map((payment) => (
                <PaymentRow
                  key={payment.id}
                  amount={payment.amount}
                  method={payment.method}
                  status={payment.status}
                  reference={payment.reference}
                  createdAt={payment.createdAt}
                  confirmedAt={payment.confirmedAt}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Sin pagos" description="No hay pagos registrados." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
