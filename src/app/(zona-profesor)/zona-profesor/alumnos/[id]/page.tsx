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
import BillingForm from "./BillingForm";

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

  // Fetch recurring slots for this student
  const recurringSlots = await prisma.recurringSlot.findMany({
    where: { studentId: id, teacherId: session.user.id, active: true },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

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

      {/* Recurring slots */}
      {recurringSlots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Horarios reservados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recurringSlots.map((slot) => {
                const dayLabels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                return (
                  <Badge key={slot.id} variant={slot.modality === "ZOOM" ? "info" : "success"}>
                    {dayLabels[slot.dayOfWeek]} {slot.startTime} ({slot.modality === "ZOOM" ? "Zoom" : "Presencial"})
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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
                  packId={pack.id}
                  hoursTotal={pack.hoursTotal}
                  hoursUsed={pack.hoursUsed}
                  levelRange={pack.levelRange}
                  status={pack.status}
                  purchasedAt={pack.purchasedAt}
                  isTeacher
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
                  zoomStartUrl={lesson.zoomStartUrl}
                  durationMinutes={lesson.durationMinutes}
                  isTeacher
                  recordingUrl={lesson.recordingUrl}
                  cancellationRequestedAt={lesson.cancellationRequestedAt}
                  modality={lesson.modality}
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
                  downloadEndpoint="/api/zona-profesor/download"
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

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Datos de facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <BillingForm
            studentId={student.id}
            billing={{
              billingType: student.billingType,
              billingNif: student.billingNif,
              billingRazonSocial: student.billingRazonSocial,
              billingDireccion: student.billingDireccion,
              billingCiudad: student.billingCiudad,
              billingCP: student.billingCP,
              billingPais: student.billingPais,
              billingContacto: student.billingContacto,
              billingEmail: student.billingEmail,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
