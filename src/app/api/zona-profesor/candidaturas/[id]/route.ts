export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/azure-mail";
import { createM365User } from "@/lib/microsoft-users";

function generatePassword(length = 12): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// PATCH: approve or reject an application
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { action, rejectionReason } = body as {
    action: "approve" | "reject";
    rejectionReason?: string;
  };

  if (!action || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const application = await prisma.preparateurApplication.findUnique({ where: { id } });
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (application.status !== "PENDING") {
    return NextResponse.json({ error: "Application already processed" }, { status: 409 });
  }

  // ── REJECT ──
  if (action === "reject") {
    await prisma.preparateurApplication.update({
      where: { id },
      data: { status: "REJECTED", rejectionReason: rejectionReason || null },
    });

    try {
      await sendMail({
        to: application.email,
        subject: "Tu candidatura en HolaBonjour",
        html: wrapEmail(`
          <h2>Hola ${application.name.split(" ")[0]},</h2>
          <p>Gracias por tu interés en colaborar con HolaBonjour.</p>
          <p>Tras revisar tu candidatura, en este momento no podemos seguir adelante con tu perfil.${
            rejectionReason ? ` <strong>Motivo:</strong> ${rejectionReason}` : ""
          }</p>
          <p>Te animamos a volver a aplicar en el futuro si tu situación cambia.</p>
          <p>Un saludo cordial,<br/>Equipo HolaBonjour</p>
        `),
      });
    } catch (e) {
      console.error("[candidaturas] Rejection email failed:", e);
    }

    return NextResponse.json({ ok: true, status: "REJECTED" });
  }

  // ── APPROVE ──
  // 1. Create or update User in Prisma
  let user = await prisma.user.findUnique({ where: { email: application.email } });
  const tempPassword = generatePassword();

  if (!user) {
    const passwordHash = await bcrypt.hash(tempPassword, 12);
    user = await prisma.user.create({
      data: {
        email: application.email,
        name: application.name,
        role: "TEACHER",
        passwordHash,
        active: true,
      },
    });
  } else if (user.role === "STUDENT") {
    const passwordHash = await bcrypt.hash(tempPassword, 12);
    user = await prisma.user.update({
      where: { id: user.id },
      data: { role: "TEACHER", passwordHash },
    });
  }

  // 2. Create Microsoft 365 Education account (Faculty license)
  let m365Email = "";
  let m365TempPassword = "";
  try {
    const m365 = await createM365User(application.name, "faculty");
    m365Email = m365.microsoftEmail;
    m365TempPassword = m365.tempPassword;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        microsoftUserId: m365.microsoftUserId,
        microsoftEmail: m365.microsoftEmail,
      },
    });
  } catch (e) {
    console.error("[candidaturas] M365 user creation failed:", e);
    // Non-fatal: professor can still use the platform without M365
  }

  // 3. Create PreparateurProfile if not exists
  const existingProfile = await prisma.preparateurProfile.findUnique({
    where: { userId: user.id },
  });

  if (!existingProfile) {
    let slug = slugify(application.name);
    const existing = await prisma.preparateurProfile.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    await prisma.preparateurProfile.create({
      data: {
        userId: user.id,
        slug,
        displayName: application.name,
        bio: application.motivacion || "",
        languages: ["fr", "es"],
        specialties: application.especialidades,
        levels: application.levels.length > 0 ? application.levels : ["A1", "A2", "B1", "B2"],
        hourlyRate: application.hourlyRate || 3500,
        status: "ACTIVE",
        certificationVerified: true,
        verifiedBy: session.user.email || "admin",
        verifiedAt: new Date(),
      },
    });
  }

  // 4. Update application status
  await prisma.preparateurApplication.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  // 5. Send welcome email with both credentials
  try {
    const m365Section = m365Email
      ? `
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:12px; padding:16px; margin:16px 0;">
          <p style="margin:0 0 4px; font-weight:700; color:#065f46;">Cuenta Microsoft 365 Education</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong> ${m365Email}</p>
          <p style="margin:0 0 4px;"><strong>Contraseña:</strong> ${m365TempPassword}</p>
          <p style="margin:0; font-size:13px; color:#5f6b78;">Úsala para Teams, OneDrive y Office. Se te pedirá cambiar la contraseña en el primer inicio de sesión.</p>
        </div>
      `
      : "";

    await sendMail({
      to: application.email,
      subject: "Bienvenido/a a HolaBonjour — Tu cuenta de profesor verificado",
      html: wrapEmail(`
        <h2>Bienvenido/a a HolaBonjour</h2>
        <p>Hola ${application.name.split(" ")[0]},</p>
        <p>Tu candidatura ha sido aprobada y tus diplomas verificados. Ya eres <strong>profesor/a verificado/a HolaBonjour</strong>.</p>

        <div style="background:#f0f4ff; border:1px solid #d0d9ed; border-radius:12px; padding:16px; margin:16px 0;">
          <p style="margin:0 0 4px; font-weight:700; color:#1e2d4a;">Cuenta HolaBonjour</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong> ${application.email}</p>
          <p style="margin:0 0 4px;"><strong>Contraseña temporal:</strong> ${tempPassword}</p>
          <p style="margin:0; font-size:13px; color:#5f6b78;">Cámbiala desde "Mi cuenta" tras iniciar sesión.</p>
        </div>

        ${m365Section}

        <p>
          <a href="https://holabonjour.es/iniciar-sesion" style="display:inline-block; padding:12px 24px; background:#E50046; color:#fff; font-weight:700; border-radius:8px; text-decoration:none;">
            Iniciar sesión
          </a>
        </p>

        <p style="margin-top:16px;"><strong>Próximos pasos:</strong></p>
        <ol>
          <li>Inicia sesión en holabonjour.es</li>
          <li>Completa tu perfil: foto, bio, disponibilidad y precio</li>
          <li>Comparte tu enlace con tus alumnos</li>
          ${m365Email ? "<li>Inicia sesión en teams.microsoft.com con tu cuenta @holabonjour.es</li>" : ""}
        </ol>

        <p>¿Dudas? <a href="mailto:info@holabonjour.es" style="color:#E50046;">info@holabonjour.es</a></p>
        <p>Un saludo cordial,<br/>Equipo HolaBonjour</p>
      `),
    });
  } catch (e) {
    console.error("[candidaturas] Welcome email failed:", e);
  }

  return NextResponse.json({ ok: true, status: "APPROVED", m365Email: m365Email || null });
}

function wrapEmail(content: string) {
  return `
    <div style="background:#f8fafc; padding:24px 12px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:22px;">
        <div style="margin-bottom:14px;">
          <a href="https://holabonjour.es" style="text-decoration:none;" target="_blank" rel="noopener noreferrer">
            <strong style="font-size:20px; color:#395D9F;">HolaBonjour</strong>
          </a>
        </div>
        <div style="font-family:Arial, sans-serif; color:#0f172a; font-size:15px; line-height:1.45;">
          ${content}
        </div>
        <hr style="margin:18px 0 12px 0; border:0; border-top:1px solid #e2e8f0;" />
        <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#64748b;">
          HolaBonjour &middot; Plataforma para profesores de francés &middot;
          <a href="mailto:info@holabonjour.es" style="color:#E50046; text-decoration:none;">info@holabonjour.es</a>
        </p>
      </div>
    </div>
  `;
}
