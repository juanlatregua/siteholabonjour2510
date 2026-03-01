import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentCard from "@/components/zona/StudentCard";
import EmptyState from "@/components/ui/EmptyState";
import { FiPlus, FiUsers } from "react-icons/fi";

export default async function AlumnosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const students = await prisma.user.findMany({
    where: { coachId: session.user.id },
    orderBy: { name: "asc" },
    include: {
      studentPacks: {
        where: { status: "ACTIVE" },
        orderBy: { purchasedAt: "desc" },
        take: 1,
      },
      studentLessons: {
        where: {
          status: "SCHEDULED",
          scheduledAt: { gte: new Date() },
        },
        orderBy: { scheduledAt: "asc" },
        take: 1,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alumnos</h2>
          <p className="mt-1 text-sm text-gray-500">
            {students.length} alumno{students.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/zona-profesor/alumnos/nuevo"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
        >
          <FiPlus className="h-4 w-4" />
          Nuevo alumno
        </Link>
      </div>

      {students.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={{
                id: student.id,
                name: student.name,
                email: student.email,
                level: student.level,
                image: student.image,
                activePack: student.studentPacks[0]
                  ? {
                      hoursTotal: student.studentPacks[0].hoursTotal,
                      hoursUsed: student.studentPacks[0].hoursUsed,
                      status: student.studentPacks[0].status,
                    }
                  : null,
                nextLesson: student.studentLessons[0]
                  ? { scheduledAt: student.studentLessons[0].scheduledAt }
                  : null,
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiUsers className="h-12 w-12" />}
          title="Sin alumnos"
          description="Aún no tienes alumnos asignados."
          action={
            <Link
              href="/zona-profesor/alumnos/nuevo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
            >
              <FiPlus className="h-4 w-4" />
              Crear alumno
            </Link>
          }
        />
      )}
    </div>
  );
}
