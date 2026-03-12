# 005 — Supabase Storage para archivos

## Contexto
Se necesitaba almacenamiento de archivos para materiales de clase (PDF, audio),
facturas generadas, y audio de exámenes. Se evaluaron Vercel Blob, S3, y Supabase Storage.

## Decisión
Supabase Storage con service role key para uploads server-side. URLs firmadas con
expiración (1h por defecto) para descargas. Buckets separados: `materials`, `facturas`,
`examenes-audio`.

## Consecuencias
- Mismo proveedor que la DB (simplifica operaciones y facturación)
- URLs firmadas = archivos privados por defecto
- Service role key necesaria para uploads (solo server-side)
- Audio de exámenes estáticos van en `public/` de Next.js (no en storage)
- Sin CDN dedicado — aceptable para el volumen actual
