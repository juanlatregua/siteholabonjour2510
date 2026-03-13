export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadFile, getSignedUrlFromBucket } from "@/lib/supabase";

// GET: fetch current teacher profile
export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.preparateurProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  // Generate signed URL for photo if it exists
  let photoUrl: string | null = null;
  if (profile.photo) {
    try {
      photoUrl = await getSignedUrlFromBucket(profile.photo, "materials", 86400);
    } catch {
      photoUrl = profile.photo; // fallback to raw URL
    }
  }

  return NextResponse.json({
    ok: true,
    profile: {
      ...profile,
      photoUrl,
      hourlyRate: profile.hourlyRate / 100, // convert cents to euros for display
    },
  });
}

// PATCH: update teacher profile
export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.preparateurProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  const contentType = request.headers.get("content-type") || "";

  // Handle photo upload
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("photo") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, WebP images allowed" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const path = `profiles/${session.user.id}/photo-${Date.now()}.${ext}`;

    await uploadFile(buffer, path, "materials");

    await prisma.preparateurProfile.update({
      where: { id: profile.id },
      data: { photo: path },
    });

    const photoUrl = await getSignedUrlFromBucket(path, "materials", 86400);
    return NextResponse.json({ ok: true, photoUrl, photoPath: path });
  }

  // Handle JSON profile update
  const body = await request.json();
  const { displayName, bio, languages, specialties, levels, hourlyRate, videoLink } = body;

  const updateData: Record<string, unknown> = {};

  if (displayName && typeof displayName === "string" && displayName.trim().length >= 2) {
    updateData.displayName = displayName.trim();
  }
  if (bio !== undefined && typeof bio === "string") {
    updateData.bio = bio.trim();
  }
  if (Array.isArray(languages) && languages.length > 0) {
    updateData.languages = languages;
  }
  if (Array.isArray(specialties)) {
    updateData.specialties = specialties;
  }
  if (Array.isArray(levels) && levels.length > 0) {
    updateData.levels = levels;
  }
  if (hourlyRate !== undefined && typeof hourlyRate === "number" && hourlyRate >= 5) {
    updateData.hourlyRate = Math.round(hourlyRate * 100); // euros to cents
  }
  if (videoLink !== undefined) {
    updateData.feiCertification = videoLink || null; // reuse field for intro video link
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const updated = await prisma.preparateurProfile.update({
    where: { id: profile.id },
    data: updateData,
  });

  return NextResponse.json({
    ok: true,
    profile: { ...updated, hourlyRate: updated.hourlyRate / 100 },
  });
}
