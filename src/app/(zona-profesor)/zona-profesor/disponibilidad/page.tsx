import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import AvailabilityGrid from "@/components/zona/AvailabilityGrid";

export default async function DisponibilidadPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

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
    </div>
  );
}
