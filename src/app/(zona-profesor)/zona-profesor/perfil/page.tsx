import React from "react";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getSignedUrlFromBucket } from "@/lib/supabase";
import PerfilProfesorForm from "./PerfilProfesorForm";

export default async function PerfilPage() {
  const session = await requireTeacher();

  const profile = await prisma.preparateurProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    redirect("/zona-profesor");
  }

  let photoUrl: string | null = null;
  if (profile.photo) {
    try {
      photoUrl = await getSignedUrlFromBucket(profile.photo, "materials", 86400);
    } catch {
      photoUrl = null;
    }
  }

  const serialized = {
    id: profile.id,
    slug: profile.slug,
    displayName: profile.displayName,
    bio: profile.bio,
    photo: profile.photo,
    photoUrl,
    languages: profile.languages,
    specialties: profile.specialties,
    levels: profile.levels,
    hourlyRate: profile.hourlyRate / 100,
    videoLink: profile.feiCertification || "",
    status: profile.status,
    certificationVerified: profile.certificationVerified,
    avgRating: profile.avgRating,
    totalClasses: profile.totalClasses,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mi perfil público</h2>
        <p className="mt-1 text-sm text-gray-500">
          Edita tu perfil de profesor. Los alumnos verán esta información al buscarte.
        </p>
      </div>

      <PerfilProfesorForm profile={serialized} />
    </div>
  );
}
