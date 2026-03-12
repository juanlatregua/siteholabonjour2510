# Email Patterns — HolaBonjour

## Proveedor: Microsoft Graph API (Azure AD)

### Archivos
- `src/lib/azure-mail.ts` — cliente Graph API con OAuth2 client_credentials
- `src/lib/email.ts` — templates y funciones de envío

### Autenticación
OAuth2 client_credentials flow contra Microsoft Graph:
```
POST https://login.microsoftonline.com/{AZURE_TENANT_ID}/oauth2/v2.0/token
POST https://graph.microsoft.com/v1.0/users/{EMAIL_FROM}/sendMail
```
- Access token cacheado con 60s de buffer antes de expirar

### Variables de entorno
```
AZURE_CLIENT_ID       # App registration client ID
AZURE_CLIENT_SECRET   # App registration secret
AZURE_TENANT_ID       # Azure AD tenant
EMAIL_FROM            # hola@holabonjour.es (sender)
STAFF_NOTIFICATION_TO # Email interno para notificaciones de booking/pagos
```

### Función base: `sendMail()`
```typescript
sendMail({
  to: string,
  subject: string,
  html: string,
  text?: string,
  attachments?: { name: string, contentType: string, contentBytes: string /* base64 */ }[]
})
```

### Templates disponibles (src/lib/email.ts)

| Función | Destinatario | Cuándo |
|---------|-------------|--------|
| `sendPaymentConfirmationEmail` | Alumno | Pago confirmado |
| `sendBookingConfirmationEmail` | Alumno | Clase reservada (.ics adjunto) |
| `sendNewLessonTeacherEmail` | Profesor | Nueva clase asignada |
| `sendClassReminderEmail` | Alumno | 24h antes de clase |
| `sendClassReminderTeacherEmail` | Profesor | 24h antes de clase |
| `sendNewBookingStaffEmail` | Staff | Nuevo booking |
| `sendManualPaymentPendingEmail` | Alumno | Pago TRANSFER/BIZUM pendiente |
| `sendPaymentRejectedEmail` | Alumno | Pago rechazado |
| `sendInvoiceEmail` | Alumno | Factura generada (PDF adjunto) |
| `sendCancellationRequestStudentEmail` | Alumno | Cancelación solicitada |
| `sendCancellationRequestTeacherEmail` | Profesor | Solicitud de cancelación |
| `sendCancellationConfirmedEmail` | Alumno | Cancelación confirmada + horas devueltas |
| `sendCancellationRejectedEmail` | Alumno | Cancelación rechazada |
| `sendLateCancellationEmail` | Alumno | Cancelación <48h |
| `sendHoursReturnedEmail` | Alumno | Horas devueltas manualmente |
| `sendPostClassEmail` | Alumno | Post-clase + enlace grabación |
| `sendRecordingReadyEmail` | Alumno | Grabación disponible |
| `sendExamFollowupEmail` | Alumno | Análisis IA post-examen |
| `sendExamReviewEmail` | Staff | Nuevo examen para revisión |

### Cómo crear un nuevo template

1. Añadir función en `src/lib/email.ts`:
```typescript
export async function sendMyNewEmail(to: string, data: MyData) {
  const html = wrapEmailHtml(`
    <h2 style="color: #1e2d4a;">Título</h2>
    <p style="color: #3d4a5c;">Contenido con ${data.variable}</p>
  `)
  await sendMail({ to, subject: "Asunto", html })
}
```

2. `wrapEmailHtml()` añade automáticamente:
   - Logo HolaBonjour en header
   - Footer con contacto y enlace web
   - Branding consistente

3. Para adjuntos .ics: usar `generateLessonICS()` de `src/lib/ics.ts`

### Reglas
- NO usar Resend, SendGrid, ni ningún otro proveedor — solo Azure/Graph
- Todos los emails son HTML (no hay variantes plain text)
- Los envíos de notificación son fire-and-forget (`Promise.allSettled`)
- URL base: `https://www.holabonjour.es`
