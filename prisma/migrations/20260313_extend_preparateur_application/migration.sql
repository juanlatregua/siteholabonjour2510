-- Extend preparateur_applications with fields from the colabora form
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "telefono" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "nivelFrances" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "titulacion" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "titulacionDetalle" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "especialidades" TEXT[] DEFAULT '{}';
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "disponibilidad" INTEGER;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "linkedinUrl" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "motivacion" TEXT;
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "archivos" TEXT[] DEFAULT '{}';
ALTER TABLE "preparateur_applications" ADD COLUMN IF NOT EXISTS "rejectionReason" TEXT;
