# KPI Dashboard Spec · SEO holabonjour.es

## 1) Marco de medicion unico

### Periodo baseline (T0)
- Ventana: últimos 28 días completos previos a Semana 1.
- Fuente primaria: Google Search Console (Performance y Coverage).
- Fuente secundaria: GA4 (sesiones orgánicas y conversiones).
- Estado actual: **NO_VERIFICADO** hasta carga de datos oficial.

### KPIs troncales
1. **Clicks orgánicos** (total y no branded)
2. **Impresiones orgánicas**
3. **CTR medio**
4. **Posición media**
5. **Conversión orgánica a lead/contratación**

## 2) Targets a 8 semanas

| KPI | Baseline (T0) | Objetivo Semana 8 | Umbral alerta |
|---|---:|---:|---:|
| Clicks orgánicos totales | T0 | +25% | <-5% WoW 2 semanas seguidas |
| Clicks no branded | T0 | +30% | estancamiento 3 semanas |
| Impresiones orgánicas | T0 | +20% | caída >10% WoW |
| CTR medio | T0 | +1.5 pp | caída >0.5 pp en páginas money |
| Posición media (queries objetivo) | T0 | mejora 1.0-1.5 posiciones | empeora >0.7 posiciones |
| Conversión orgánica (lead/contratar) | T0 | +20% | caída >8% WoW |

## 3) Segmentaciones obligatorias
- Por página: `/`, `/contratar`, `/preparacion-delf-dalf`, `/prueba-nivel`.
- Por query: branded vs no branded.
- Por dispositivo: móvil vs desktop.
- Por país: ES (principal), resto.

## 4) Cadencia de revisión
- **Semanal (operativa)**: KPI leading (impresiones, CTR, clics, incidencias técnicas).
- **Quincenal (dirección)**: KPI de negocio (lead y contratación orgánica).
- **Mensual (estratégica)**: decisiones de backlog P0/P1/P2 siguiente ciclo.

## 5) Definiciones de eventos (GA4)
- `organic_lead_contact`: envío de contacto desde sesión orgánica.
- `organic_click_contratar`: clic en CTA “Contratar pack” desde orgánico.
- `organic_booking_start`: inicio de reserva/calendario desde orgánico.
- `organic_student_zone_access`: acceso a zona alumno desde orgánico (informativo, no objetivo primario SEO).

## 6) Reglas de calidad de datos
- No comparar semanas con diferente estacionalidad sin anotación.
- Toda decisión de roadmap requiere al menos 2 cortes semanales comparables.
- Cualquier anomalía técnica invalida lectura de rendimiento hasta resolución.
