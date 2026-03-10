import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function CuentaPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mi cuenta</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gestiona tu contraseña de acceso.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
