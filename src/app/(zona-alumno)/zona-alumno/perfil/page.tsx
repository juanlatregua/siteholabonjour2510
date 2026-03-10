import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import BillingFormAlumno from "./BillingFormAlumno";

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      level: true,
      billingType: true,
      billingNif: true,
      billingRazonSocial: true,
      billingDireccion: true,
      billingCiudad: true,
      billingCP: true,
      billingPais: true,
      billingContacto: true,
      billingEmail: true,
    },
  });

  if (!user) redirect("/iniciar-sesion");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mi perfil</h2>
        <p className="mt-1 text-sm text-gray-500">
          Información personal y datos de facturación.
        </p>
      </div>

      {/* Basic info (read-only) */}
      <Card>
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2" style={{ fontSize: "0.875rem" }}>
            <div>
              <span className="text-xs font-semibold text-gray-500">Nombre</span>
              <p className="text-gray-900">{user.name || "—"}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Email</span>
              <p className="text-gray-900">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <span className="text-xs font-semibold text-gray-500">Teléfono</span>
                <p className="text-gray-900">{user.phone}</p>
              </div>
            )}
            {user.level && (
              <div>
                <span className="text-xs font-semibold text-gray-500">Nivel</span>
                <p className="text-gray-900">{user.level}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Datos de facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-500">
            Si necesitas factura a nombre de una empresa, completa estos datos.
          </p>
          <BillingFormAlumno
            billing={{
              billingType: user.billingType,
              billingNif: user.billingNif,
              billingRazonSocial: user.billingRazonSocial,
              billingDireccion: user.billingDireccion,
              billingCiudad: user.billingCiudad,
              billingCP: user.billingCP,
              billingPais: user.billingPais,
              billingContacto: user.billingContacto,
              billingEmail: user.billingEmail,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
