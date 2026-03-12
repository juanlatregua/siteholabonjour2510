# Storage Patterns — HolaBonjour

## Proveedor: Supabase Storage

### Archivo: `src/lib/supabase.ts`

### Variables de entorno
```
NEXT_PUBLIC_SUPABASE_URL    # URL pública de Supabase
SUPABASE_SERVICE_ROLE_KEY   # Clave admin (service role) para uploads
```

### Funciones disponibles

```typescript
// Upload a materiales (bucket por defecto: "materials")
uploadMaterial(file: Buffer, path: string) → { path: string }

// URL firmada con expiración (default 1h)
getSignedUrl(path: string, expiresIn?: number) → string

// Eliminar archivo
deleteMaterial(path: string) → void

// Upload genérico (cualquier bucket)
uploadFile(file: Buffer, path: string, bucket?: string) → { path }

// URL firmada genérica
getSignedUrlFromBucket(path: string, bucket?: string, expiresIn?: number) → string
```

### Estructura de archivos en storage

```
materials/
├── lessons/{lessonId}/{filename}      # Materiales de clase (PDF, audio, doc)
└── ...

examenes-audio/
├── {nivel}/{filename}                  # Audio oficial de exámenes FEI

facturas/
├── {fileName}                          # PDFs de facturas generadas
```

### Cómo subir un archivo

```typescript
import { uploadMaterial } from "@/lib/supabase"

// Desde un API route con FormData
const file = formData.get("file") as File
const buffer = Buffer.from(await file.arrayBuffer())
const result = await uploadMaterial(buffer, `lessons/${lessonId}/${file.name}`)
```

### Cómo obtener URL de descarga

```typescript
import { getSignedUrl } from "@/lib/supabase"

const url = await getSignedUrl(material.storagePath)
// URL válida por 1 hora
```

### Reglas
- NO usar Vercel Blob, S3, ni Cloudinary — solo Supabase Storage
- Usar `SUPABASE_SERVICE_ROLE_KEY` (admin) para uploads server-side
- URLs firmadas expiran — no almacenar en DB, generar bajo demanda
- El bucket "materials" es el default — facturas y audio usan buckets separados
- Los archivos públicos de examen van en `public/examenes/audio/` (estáticos en Next.js)
