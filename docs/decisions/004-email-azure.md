# 004 — Microsoft Graph API para email

## Contexto
Se necesitaba un servicio de email transaccional fiable para magic links, confirmaciones
de pago, recordatorios de clase, y facturas. La empresa ya tenía infraestructura Microsoft
(Azure AD, dominio verificado).

## Decisión
Microsoft Graph API con OAuth2 client_credentials flow. El email se envía desde
`hola@holabonjour.es` usando la API de Graph (`/users/{email}/sendMail`).

## Consecuencias
- Sin coste adicional (incluido en licencia Microsoft existente)
- Soporta adjuntos nativos (facturas PDF, archivos .ics)
- Token OAuth2 cacheado en memoria con refresh automático
- No depende de servicios externos como Resend o SendGrid
- Templates HTML inline (no hay sistema de templates externo)
- 19 funciones de email especializadas en `src/lib/email.ts`
