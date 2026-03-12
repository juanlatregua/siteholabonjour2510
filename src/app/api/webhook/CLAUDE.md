# Webhooks — NUNCA MODIFICAR SIN LEER ESTO

## Webhooks activos

### Stripe (`/api/webhook/stripe`)
Archivo: `src/app/api/webhook/stripe/route.ts`

**Evento escuchado:** `checkout.session.completed`

**Flujo:**
1. Verificar firma con `STRIPE_WEBHOOK_SECRET`
2. Idempotencia: insertar `event.id` en tabla `StripeEvent` (duplicado → skip silencioso)
3. Leer `session.metadata.type`:
   - `"correction_pack"` → añadir correcciones pagadas al quota del email
   - Cualquier otro → activar pack de clases

**Activación de pack de clases:**
1. Payment → status=CONFIRMED, stripePaymentId, confirmedAt
2. Pack → status=ACTIVE, purchasedAt
3. Lesson PENDING_PAYMENT → SCHEDULED
4. Crear Zoom meeting si no existe
5. Generar factura PDF (async, no bloquea)
6. Notificaciones (fire-and-forget con Promise.allSettled):
   - Email confirmación pago → alumno
   - Email nuevo booking → staff
   - SMS confirmación → alumno
   - Email confirmación clase → alumno (con .ics)
   - Email nueva clase → profesor (con Zoom start URL)
   - SMS clase confirmada → alumno

### Zoom (`/api/webhook/zoom`)
Archivo: `src/app/api/webhook/zoom/route.ts`

**Eventos escuchados:**
- `recording.completed` — grabación disponible
- Otros eventos se registran en tabla `ZoomEvent`

## Reglas
- NUNCA modificar la lógica de idempotencia (StripeEvent)
- NUNCA cambiar el orden de operaciones del webhook de Stripe
- Los webhooks DEBEN retornar 200 rápido — notificaciones son fire-and-forget
- En local: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
- Verificar STRIPE_WEBHOOK_SECRET para local vs producción (son diferentes)
- El webhook NO debe fallar por un error de notificación (email/SMS)
