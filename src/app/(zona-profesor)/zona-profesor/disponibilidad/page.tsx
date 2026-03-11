import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import AvailabilityGrid from "@/components/zona/AvailabilityGrid";
import RecurringSlotManager from "@/components/zona/RecurringSlotManager";

export default async function DisponibilidadPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  // Fetch students for the recurring slot form
  const students = await prisma.user.findMany({
    where: { coachId: session.user.id, role: "STUDENT" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  const studentOptions = students.map((s) => ({
    value: s.id,
    label: s.name || s.email,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Disponibilidad</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configura tus horarios disponibles para clases.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Horario semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <AvailabilityGrid teacherId={session.user.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horarios reservados (continuidad)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-500">
            Los horarios reservados se bloquean para que ningún alumno nuevo pueda reservarlos online.
          </p>
          <RecurringSlotManager students={studentOptions} />
        </CardContent>
      </Card>
    </div>
  );
}
