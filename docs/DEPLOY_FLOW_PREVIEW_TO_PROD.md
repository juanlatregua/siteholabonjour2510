# Deploy Flow: Preview -> Production (sin tocar live actual)

## Objetivo
Migrar `holabonjour-next` a producción de forma controlada sin impactar la web actual `www.holabonjour.es` hasta validación final.

## Estado inicial
- Repo de trabajo: `/Users/juan/Code/HBTJ/holabonjour-next`
- Rama actual: `main`
- Remoto: **no configurado**
- Cambios locales sin commit: sí
- Web live actual: legacy (no sustituir hasta QA final)

## Riesgos detectados antes de deploy
- Assets referenciados y no presentes en esta copia local:
  - `/public/images/logo-holabonjour-01.svg`
  - `/public/images/conocenos2020.jpg`
  - `/public/assets/s1final.jpg`
  - `/public/assets/s2final.jpg`
- Antes de publicar, restaurar estos ficheros o ajustar referencias.

## Flujo recomendado

1. Preparar repositorio remoto (GitHub)
- Crear repo privado `holabonjour-next`.
- En local:
  - `git remote add origin git@github.com:<ORG_O_USER>/holabonjour-next.git`
  - `git checkout -b chore/bootstrap-migration`

2. Congelar base y limpiar build
- `npm ci`
- `npm run lint`
- `npm run build`
- Corregir assets faltantes/paths rotos.

3. Publicar Preview (no dominio principal)
- `git add .`
- `git commit -m "chore: bootstrap holabonjour-next migration base"`
- `git push -u origin chore/bootstrap-migration`
- Crear PR a `main`.
- Conectar repo en Vercel como proyecto nuevo (sin asignar `www.holabonjour.es`).
- Validar preview URL (`*.vercel.app`).

4. UAT sobre preview
Checklist mínimo:
- Home, cursos, test, contacto.
- Formularios y eventos analíticos.
- Rendimiento móvil.
- Enlaces internos y assets.
- Meta/canonical básicos.

5. Staging con subdominio (opcional recomendado)
- Asignar `next.holabonjour.es` a Vercel.
- QA con usuarios internos/negocio sobre staging.

6. Go-live controlado
- Ventana de cambio planificada.
- Bajar TTL DNS (si aplica) 24h antes.
- Asignar `www.holabonjour.es` al proyecto Vercel solo cuando checklist esté en verde.

7. Rollback plan
- Mantener configuración DNS previa documentada.
- Si falla producción, revertir DNS al origen legacy.

## Criterio de salida a producción
- 0 errores críticos en QA.
- Build/lint OK.
- Assets completos.
- Aprobación negocio.
