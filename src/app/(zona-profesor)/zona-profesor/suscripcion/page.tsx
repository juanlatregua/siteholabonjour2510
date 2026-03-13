import React from "react";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SuscripcionClient from "./SuscripcionClient";

export default async function SuscripcionPage() {
  const session = await requireTeacher();

  const profile = await prisma.preparateurProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!profile) {
    redirect("/zona-profesor");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mi suscripción</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gestiona tu plan y accede a todas las funciones de HolaBonjour.
        </p>
      </div>

      <SuscripcionClient
        currentPlan={profile.subscriptionStatus === "active" ? "professionnel" : "essentiel"}
        subscriptionStatus={profile.subscriptionStatus}
        hasStripeCustomer={!!profile.stripeCustomerId}
      />
    </div>
  );
}
