# 006 — Pivot SaaS: Plataforma para profesores independientes

**Fecha**: 2026-03-13
**Estado**: Propuesta
**Contexto**: No hay tráfico de alumnos. Llegan CVs de profesores. La plataforma tiene herramientas valiosas que un profe independiente pagaría por usar.

---

## Modelo de negocio

### Propuesta de valor

Plataforma todo-en-uno para profesores de francés independientes: reservas, videoconferencia, portal alumno, corrección IA, simuladores DELF/DALF. **El profesor trae sus alumnos, la plataforma le da las herramientas.**

### Segmentos de cliente

| Segmento | Descripción | Canal de entrada |
|----------|-------------|------------------|
| Profesores independientes | Freelance de francés que necesita gestionar alumnos | Formulario /colabora (ya recibe CVs) |
| Micro-academias | 2-5 profes bajo una marca | Referidos, LinkedIn |
| Alumnos | Llegan vía su profesor | Invitación directa del profesor |

### Tiers

#### GRATIS — "Essentiel"
- Perfil público con URL `/preparateurs/[slug]`
- Sistema de reservas y disponibilidad
- Videoconferencia vía **Microsoft Teams** (cuenta de HolaBonjour, coste 0)
- Portal básico del alumno (calendario, materiales, mensajería)
- Hasta **10 alumnos activos**
- El profesor gestiona cobros externamente (Bizum, transferencia, efectivo)

#### PREMIUM — "Professionnel" (€39/mes)
- Todo lo de Essentiel, sin límite de alumnos +
- **Zoom** con grabación automática en la nube (cuenta Zoom de HolaBonjour)
- Portal alumno completo: grabaciones, historial de clases
- **Corrección IA** de escritura para los alumnos del profesor
- Acceso a **simuladores de examen** DELF/DALF para alumnos
- Analíticas: horas impartidas, asistencia, ingresos estimados
- Push notifications (recordatorios de clase, mensajes)
- Facturación automática para los alumnos (Stripe Connect)
- Branding personalizado (foto, bio, colores)

#### ACADEMY — "Académie" (€99/mes, futuro)
- Múltiples profesores bajo una marca
- Panel de administración centralizado
- Facturación unificada
- Estadísticas por profesor

### Modelo de ingresos

| Fuente | Free | Premium |
|--------|------|---------|
| Suscripción profesor | €0 | €39/mes |
| Comisión por pago | 0% (pago externo) | 0% (Stripe Connect, solo comisión Stripe) |
| Correcciones IA extras | — | Incluidas |
| Zoom + grabaciones | — | Incluido (cuenta HolaBonjour) |

**Proyección**: Con 50 profesores premium = €1.950/mes recurrente.
Con 200 = €7.800/mes. Los profesores churn menos que alumnos porque la plataforma es su herramienta de trabajo.

### Flywheel

```
Profesores se registran (gratis)
    → Traen sus alumnos (crecimiento orgánico, coste adquisición = 0)
    → Alumnos generan actividad y contenido
    → Profesor necesita más features → upgrade a Premium
    → Contenido SEO (Le Côté Vie, blog, exámenes) atrae alumnos directos
    → Alumnos directos necesitan profesor → descubren el marketplace
```

### Ventaja competitiva

1. **Nicho francés**: herramientas que no existen en plataformas genéricas (DELF/DALF simuladores, corrección IA con rúbricas FEI, calendario de convocatorias)
2. **Todo integrado**: elimina la combinación Calendly + Zoom + Google Drive + WhatsApp + facturación
3. **Los profesores ya vienen**: CVs llegan sin buscarlos
4. **Contenido gratuito como moat**: Le Côté Vie, blog, concierge IA → SEO orgánico

### Riesgos y mitigación

| Riesgo | Mitigación |
|--------|------------|
| Profesores usan free y nunca upgraden | Límite de 10 alumnos + features clave solo en premium |
| Competencia de plataformas genéricas (Calendly, Preply) | Nicho francés + herramientas DELF/DALF únicas |
| Coste Zoom escala con profes premium | Zoom Business soporta ~300 meetings/mes. Monitorizar y ajustar tier si necesario |
| Profesores se van con sus alumnos | Switching cost alto: historial, grabaciones, correcciones, materiales — todo en la plataforma |

---

## Stack de videoconferencia

### Microsoft Teams (tier gratuito)
- HolaBonjour crea reuniones vía **Microsoft Graph API** con una cuenta Microsoft 365 Business Basic (~€5.60/usuario/mes para 1 cuenta organizadora)
- La API Graph permite `POST /users/{id}/onlineMeetings` — crear reuniones programadas
- Alternativa aún más barata: el profesor pega su propio link de Teams/Meet/Zoom
- Grabación: no disponible vía API en plan básico

### Zoom (tier premium)
- Ya implementado y funcionando
- Reuniones automáticas + grabación en la nube + webhook para estado de clase
- Coste: cuenta Zoom Business actual de HolaBonjour (~€18/mes)

### Decisión recomendada para MVP
**Free = el profesor pega su propio link de videollamada** (Teams, Meet, Zoom personal, lo que quiera). Esto tiene coste 0 y cero integración adicional. En premium, se activa la creación automática de Zoom con grabación.
