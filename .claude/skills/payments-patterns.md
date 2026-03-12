# Payments Patterns — HolaBonjour

## Proveedor: Stripe (SDK v20)

### Archivos clave
- `src/lib/stripe.ts` — helpers, precios, funciones de checkout
- `src/app/api/webhook/stripe/route.ts` — webhook handler
- `src/app/api/booking/checkout/route.ts` — crear sesión de checkout
- `src/app/api/booking/manual/route.ts` — pagos manuales (transferencia/Bizum)

### Variables de entorno
```
STRIPE_SECRET_KEY      # sk_test_... o sk_live_...
STRIPE_WEBHOOK_SECRET  # whsec_... (validación webhook)
```

### Precios de packs de clases
```typescript
PACK_PRICES = {
  "A1-B2":       { sessions: 4, totalEur: 150, perSession: 37.50 },
  "C1-C2":       { sessions: 4, totalEur: 200, perSession: 50.00 },
  "diagnostico": { sessions: 1, totalEur: 25,  perSession: 25.00 }
}
```

### Precios de correcciones IA
```typescript
CORRECTION_PACK_PRICES = {
  "10-corrections": { count: 10, totalEur: 19.00 },
  "1-correction":   { count: 1,  totalEur: 2.90  }
}
```

### Flujo completo de pago con Stripe

```
1. Alumno selecciona pack y horario
   └─> POST /api/booking/checkout
       └─> createCheckoutSession() → Stripe checkout URL

2. Alumno paga en Stripe Checkout
   └─> Stripe envía evento checkout.session.completed

3. Webhook recibe evento
   └─> POST /api/webhook/stripe
       ├─ Idempotencia: inserta event.id en tabla StripeEvent (duplicado → skip)
       ├─ Si es correction_pack → addPaidCorrections(email, count)
       └─ Si es class_pack:
          ├─ Payment → status=CONFIRMED
          ├─ Pack → status=ACTIVE
          ├─ Lesson PENDING_PAYMENT → SCHEDULED
          ├─ Crear Zoom meeting si no existe
          ├─ Generar factura (async)
          └─ Notificaciones (fire-and-forget):
             ├─ Email confirmación pago (alumno)
             ├─ Email nuevo booking (staff)
             ├─ SMS confirmación (alumno)
             ├─ Email confirmación clase (alumno, con .ics)
             └─ Email nueva clase (profesor, con Zoom start URL)
```

### Pagos manuales (transferencia/Bizum)

```
1. Alumno selecciona transferencia/Bizum
   └─> POST /api/booking/manual
       ├─ Crea Payment (status=PENDING)
       ├─ Crea Pack (status=ACTIVE al confirmar)
       ├─ Crea Lesson (status=PENDING_PAYMENT)
       └─ Email con datos bancarios al alumno

2. Profesor confirma pago desde zona-profesor
   └─> Payment → CONFIRMED, Pack → ACTIVE, Lesson → SCHEDULED
```

### Webhook en local
```bash
# Terminal 1: servidor
npm run dev

# Terminal 2: Stripe CLI forwarding
stripe listen --forward-to localhost:3000/api/webhook/stripe
# Copiar el whsec_... en STRIPE_WEBHOOK_SECRET
```

### Reglas
- NUNCA modificar el webhook sin entender el flujo completo
- Idempotencia es CRÍTICA — la tabla StripeEvent previene duplicados
- Los metadata de la sesión Stripe llevan packId, levelRange, customerName
- No hay suscripciones — solo pagos únicos (checkout sessions)
- Stripe Checkout maneja toda la UI de pago — no hay formulario propio
