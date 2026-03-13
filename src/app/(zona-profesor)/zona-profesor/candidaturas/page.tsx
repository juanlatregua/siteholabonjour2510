import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import CandidaturasClient, { type Application } from "./CandidaturasClient";

export default async function CandidaturasPage() {
  await requireTeacher();

  const applications = await prisma.preparateurApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = applications.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    telefono: a.telefono,
    nationality: a.nationality,
    location: a.location,
    nivelFrances: a.nivelFrances,
    titulacion: a.titulacion,
    titulacionDetalle: a.titulacionDetalle,
    levels: a.levels,
    especialidades: a.especialidades,
    experience: a.experience,
    disponibilidad: a.disponibilidad,
    hourlyRate: a.hourlyRate,
    linkedinUrl: a.linkedinUrl,
    motivacion: a.motivacion,
    archivos: a.archivos,
    diplomaUrls: a.diplomaUrls,
    diplomaScan: a.diplomaScan as Application["diplomaScan"],
    status: a.status,
    rejectionReason: a.rejectionReason,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Candidaturas</h1>
      <CandidaturasClient applications={serialized} />
    </div>
  );
}
