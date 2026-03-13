# 008 — Plan de producto: Flujo, puntos fuertes y monetización

**Fecha**: 2026-03-13
**Estado**: Propuesta

---

## 1. Visión

HolaBonjour deja de ser una academia que busca alumnos para ser **la plataforma donde los profesores de francés gestionan su negocio**. Los profesores traen los alumnos. La plataforma les da las herramientas que no tienen en ningún otro sitio.

---

## 2. Flujo completo del producto

### 2.1 — Captación del profesor

```
Profesor encuentra HolaBonjour
  ├─ SEO: "plataforma clases francés online", "gestionar alumnos francés"
  ├─ LinkedIn / grupos de profesores FLE
  ├─ Boca a boca entre profesores
  └─ Google: "dar clases de francés online"
         │
         ▼
   /profesores (landing)
   "Tu plataforma de clases de francés. Gratis."
         │
         ▼
   /colabora (formulario de candidatura)
   Datos + titulación + motivación + CV
         │
         ▼
   Candidatura guardada en BD + email al staff
         │
         ▼
   /zona-profesor/candidaturas (panel admin)
   Staff revisa → Aprobar / Rechazar
         │
    ┌────┴────┐
    │ APROBAR │
    └────┬────┘
         │
   Se crea automáticamente:
   ✓ User (role: TEACHER, password temporal)
   ✓ PreparateurProfile (slug, bio, niveles)
   ✓ Email de bienvenida con credenciales
         │
         ▼
   Profesor inicia sesión → Onboarding
```

### 2.2 — Onboarding del profesor (Fase 1, pendiente)

```
Login con credenciales temporales
         │
         ▼
   Paso 1: Completar perfil
   Foto, bio ampliada, idiomas, especialidades
         │
         ▼
   Paso 2: Configurar disponibilidad
   Selector visual de horarios (ya existe en la plataforma)
         │
         ▼
   Paso 3: Definir tarifa
   Precio por clase de 55 min (ej: 30€, 35€, 40€)
         │
         ▼
   Paso 4: Elegir videollamada
   ┌─────────────────────────────────────────┐
   │ Gratis: Pega tu link (Teams/Meet/Zoom)  │
   │ Premium: Zoom automático + grabación    │
   └─────────────────────────────────────────┘
         │
         ▼
   Perfil público activo en /preparateurs/[slug]
   "Comparte este enlace con tus alumnos"
```

### 2.3 — El profesor trae sus alumnos

```
Profesor comparte su link:
  ├─ WhatsApp: "Reserva tu próxima clase aquí"
  ├─ Email: firma con link a su perfil
  ├─ Redes sociales: bio de Instagram/LinkedIn
  └─ Palabra: "Entra en holabonjour.es/preparateurs/maria-dupont"
         │
         ▼
   Alumno entra en /preparateurs/[slug]
   Ve: foto, bio, niveles, rating, precio, disponibilidad
         │
         ▼
   Alumno reserva clase
   Selecciona hora → crea cuenta automática (magic link)
         │
         ▼
   ┌──────────────────────────────────────┐
   │ FREE: Profesor envía link de Teams   │
   │ PREMIUM: Zoom se crea automático     │
   └──────────────────────────────────────┘
         │
         ▼
   Notificaciones a ambos (email + push)
   Clase aparece en zona-alumno y zona-profesor
```

### 2.4 — Ciclo de clase

```
   Antes de clase
   ├─ Recordatorio automático 24h antes (email + push)
   ├─ Alumno accede a materiales subidos por el profesor
   └─ Profesor revisa notas del alumno
         │
         ▼
   Durante la clase (55 min)
   ├─ FREE: link manual del profesor
   └─ PREMIUM: Zoom con grabación automática
         │
         ▼
   Después de clase
   ├─ PREMIUM: Grabación disponible en portal del alumno
   ├─ Profesor sube materiales / deberes
   ├─ Alumno practica escritura → Corrección IA (PREMIUM)
   ├─ Alumno practica examen → Simulador DELF/DALF (PREMIUM)
   └─ Alumno deja reseña (visible en perfil del profesor)
         │
         ▼
   Alumno reserva siguiente clase → ciclo se repite
```

### 2.5 — Descubrimiento orgánico (flywheel)

```
   Visitante llega por SEO
   ├─ Blog: "Cómo preparar el DELF B2"
   ├─ Simuladores: examen-delf-a1, examen-delf-a2
   ├─ Contenido cultural: Le Côté Vie
   ├─ Concierge IA: resuelve dudas en el chat
   └─ Calendario exámenes: convocatorias oficiales
         │
         ▼
   Visitante busca profesor
   /preparateurs → directorio con filtros
         │
         ▼
   Elige profesor → reserva → se convierte en alumno
   (El profesor gana un alumno que NO trajo él)
```

---

## 3. Puntos fuertes del producto

### 3.1 — Ventajas para el PROFESOR

| Punto fuerte | Por qué importa |
|---|---|
| **Gratis de verdad** | No hay comisión por clase ni cuota obligatoria. El profesor cobra el 100% directamente a sus alumnos. Esto no existe en Preply, italki ni Superprof (todos cobran 15-33%). |
| **Perfil público + SEO** | El profesor tiene una URL profesional indexada en Google. Sus alumnos le encuentran fácil. Con el tiempo, Google también trae alumnos nuevos al directorio. |
| **Reservas automáticas** | El alumno ve la disponibilidad real y reserva solo. Elimina el "¿quedamos el martes o el jueves?" por WhatsApp. |
| **Portal del alumno incluido** | El profesor parece profesional: sus alumnos tienen su propia zona con calendario, materiales, historial. Es como tener una mini-academia sin montar nada. |
| **Herramientas DELF/DALF únicas** | Ninguna otra plataforma ofrece simuladores de examen + corrección IA con rúbricas oficiales. Para un profesor que prepara DELF, esto es un diferencial enorme. |
| **Cero setup técnico** | No necesita web propia, ni Calendly, ni Stripe, ni gestión de archivos. Todo está integrado. |
| **Switching cost alto** | Cuanto más usa la plataforma, más difícil irse: historial de clases, grabaciones, correcciones, materiales, reseñas. Todo vive aquí. |

### 3.2 — Ventajas para el ALUMNO

| Punto fuerte | Por qué importa |
|---|---|
| **Un solo sitio** | Reservar, ver grabaciones, practicar escritura, hacer simulacros, hablar con el profe. Todo sin salir de la plataforma. |
| **Corrección IA 24/7** | Practica escritura cuando quiera y recibe feedback inmediato con rúbricas DELF reales. No depende del horario del profesor. |
| **Simuladores reales** | Comprensión oral y escrita con formato idéntico al examen oficial. Sabe exactamente dónde está antes de presentarse. |
| **Transparencia** | Ve reseñas reales, precio claro, disponibilidad en tiempo real. Reserva sin intermediarios. |
| **Contenido cultural gratuito** | Blog, cine francés, recetas, regiones, mot du jour — aprende fuera de clase sin pagar. |

### 3.3 — Ventajas para el NEGOCIO

| Punto fuerte | Por qué importa |
|---|---|
| **CAC = 0 para alumnos** | Los profesores traen sus propios alumnos. El coste de adquisición es cero. |
| **CAC bajo para profesores** | Los profesores llegan solos (CVs ya llegan). Un post en LinkedIn o un grupo de profesores FLE es suficiente. |
| **Contenido SEO ya creado** | 100+ URLs indexadas (blog, exámenes, recetas, películas, regiones). Esto atrae tráfico orgánico que se convierte en alumnos del directorio. |
| **Plataforma ya construida** | No es un MVP: hay 70+ API routes, booking completo, Zoom, corrección IA, chat, push. Solo falta el flujo de self-registration. |
| **Ingresos recurrentes** | Suscripción mensual = predecible. Un profesor que paga €39/mes durante un año = €468. 100 profesores = €46.800/año. |
| **Escalabilidad** | Añadir un profesor no tiene coste marginal significativo. El Zoom Business soporta cientos de reuniones. |

---

## 4. Monetización

### 4.1 — Fuentes de ingreso

```
┌─────────────────────────────────────────────────────────────┐
│                    INGRESOS RECURRENTES                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  1. Suscripción Professionnel — €39/mes             │    │
│  │     Zoom + grabaciones + corrección IA +            │    │
│  │     simuladores + analíticas + sin límite alumnos   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  2. Suscripción Académie — €99/mes (futuro)         │    │
│  │     Multi-profesor + admin centralizado +            │    │
│  │     facturación unificada                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    INGRESOS TRANSACCIONALES                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  3. Packs de corrección IA — €19/10 correcciones    │    │
│  │     Para alumnos de profesores free que quieran      │    │
│  │     corrección IA sin que el profe pague premium     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  4. Clases con profesores del directorio (futuro)    │    │
│  │     Alumnos que llegan por SEO → reservan → 10%      │    │
│  │     comisión solo en alumnos captados por la web     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 — Proyección de ingresos

**Escenario conservador** (12 meses):

| Mes | Profes free | Profes premium | MRR suscripciones | Correcciones IA | MRR total |
|-----|-------------|----------------|--------------------:|----------------:|----------:|
| 1   | 10          | 0              | €0                 | €0              | €0        |
| 3   | 30          | 5              | €195               | €38             | €233      |
| 6   | 60          | 15             | €585               | €95             | €680      |
| 9   | 100         | 30             | €1.170             | €190            | €1.360    |
| 12  | 150         | 50             | €1.950             | €285            | €2.235    |

**ARR mes 12**: ~€26.800

**Escenario optimista** (si la captación de profesores funciona bien):

| Mes 12 | Profes free | Profes premium | MRR |
|--------|-------------|----------------|----:|
| Optimista | 300 | 100 | €4.190 |

**ARR optimista**: ~€50.280

### 4.3 — Costes operativos

| Concepto | Coste/mes | Notas |
|----------|----------:|-------|
| Vercel Pro | €20 | Hosting + edge |
| Supabase Pro | €25 | DB + Storage |
| Zoom Business | €18 | 1 cuenta, meetings ilimitados |
| Azure email | ~€5 | Transactional emails |
| Twilio SMS | ~€10 | Recordatorios |
| Anthropic (IA) | ~€30 | Correcciones + concierge |
| Dominio + miscelánea | €5 | |
| **Total** | **~€113/mes** | |

**Break-even**: 3 profesores premium (3 × €39 = €117 > €113).

### 4.4 — Palancas de conversión free → premium

```
┌────────────────────────────────────────────────────┐
│  TRIGGER 1: Límite de 10 alumnos                    │
│  "Has alcanzado el límite. Actualiza a              │
│   Professionnel para alumnos ilimitados."            │
├────────────────────────────────────────────────────┤
│  TRIGGER 2: Alumno pide grabación                   │
│  "Tu alumno ha solicitado la grabación de           │
│   la clase. Activa Zoom con grabación               │
│   automática por €39/mes."                           │
├────────────────────────────────────────────────────┤
│  TRIGGER 3: Alumno quiere corrección IA             │
│  "María quiere practicar escritura para el          │
│   DELF B2. Con Professionnel, tus alumnos           │
│   tienen corrección IA incluida."                    │
├────────────────────────────────────────────────────┤
│  TRIGGER 4: Profesor ve analíticas básicas          │
│  Dashboard free muestra: "3 clases esta semana"     │
│  Premium muestra: ingresos, tendencias,             │
│  asistencia, progreso de alumnos → valor claro      │
├────────────────────────────────────────────────────┤
│  TRIGGER 5: Competencia visible                     │
│  En el directorio, los profes premium tienen        │
│  badge "Verificado", grabaciones, y más reseñas     │
│  → más visibilidad → más alumnos del directorio     │
└────────────────────────────────────────────────────┘
```

---

## 5. Comparativa con competencia

| Feature | HolaBonjour | Preply | italki | Superprof | Calendly+Zoom |
|---------|:-----------:|:------:|:------:|:---------:|:-------------:|
| Coste para el profesor | **€0** | 33% comisión | 15% comisión | ~€30/mes | €12+€14/mes |
| Booking integrado | Si | Si | Si | No | Si |
| Portal del alumno | **Si** | No | No | No | No |
| Corrección IA DELF | **Si** | No | No | No | No |
| Simuladores examen | **Si** | No | No | No | No |
| Grabación de clase | Si (premium) | No | No | No | Si |
| Chat alumno-profe | Si | Si | Si | No | No |
| SEO/contenido cultural | **Si** | No | No | No | No |
| Nicho francés | **Si** | No | No | No | No |
| El profesor cobra 100% | **Si** | No | No | No | Si |

**Conclusión**: No hay ningún competidor que ofrezca herramientas específicas de francés (DELF/DALF) + booking + portal alumno + corrección IA a coste 0 para el profesor.

---

## 6. Roadmap de producto

### Ahora (hecho)
- [x] Landing page `/profesores`
- [x] Formulario de candidatura con persistencia en BD
- [x] Panel admin para aprobar/rechazar candidaturas
- [x] Creación automática de User + PreparateurProfile al aprobar
- [x] Email de bienvenida con credenciales
- [x] Directorio público de préparateurs con filtros
- [x] Perfil público individual con reseñas

### Corto plazo (Fase 1 — 1-2 semanas)
- [ ] Onboarding wizard para nuevos profesores
- [ ] Self-registration (sin aprobación manual para empezar rápido)
- [ ] Booking desde el perfil público del profesor
- [ ] Abstracción de video provider (link manual vs Zoom)
- [ ] El profesor configura su propia tarifa

### Medio plazo (Fase 2 — 3-4 semanas)
- [ ] Stripe Subscriptions para profesores (Professionnel €39/mes)
- [ ] Feature gating (free vs premium)
- [ ] Trial de 14 días
- [ ] Banner de upgrade contextual en zona-profesor
- [ ] Analíticas por profesor (clases, alumnos, ingresos estimados)

### Largo plazo (Fase 3 — 2-3 meses)
- [ ] Stripe Connect para pagos alumno → profesor vía plataforma
- [ ] Plan Académie (multi-profesor)
- [ ] App móvil PWA (ya hay manifest.json + service worker)
- [ ] Marketplace con ranking y algoritmo de recomendación
- [ ] Integraciones: Google Calendar sync, WhatsApp Business API

---

## 7. Métricas clave (KPIs)

| Métrica | Objetivo mes 3 | Objetivo mes 6 | Objetivo mes 12 |
|---------|:--------------:|:--------------:|:---------------:|
| Profesores registrados | 30 | 60 | 150 |
| Profesores premium | 5 | 15 | 50 |
| Tasa conversión free→premium | 15% | 20% | 25-33% |
| Alumnos activos (total) | 50 | 200 | 500 |
| Clases/semana | 30 | 100 | 300 |
| MRR | €233 | €680 | €2.235 |
| Churn mensual profesor | <5% | <5% | <3% |
| NPS profesor | >40 | >50 | >50 |

---

## 8. Riesgos y mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|:----------:|:-------:|------------|
| Profesores usan free eternamente | Alta | Medio | Límite 10 alumnos + triggers contextuales de upgrade |
| No llegan suficientes profesores | Media | Alto | Campaña activa LinkedIn + grupos FLE + partnerships con centros de formación FLE |
| Profesor copia el modelo y monta su web | Baja | Bajo | Switching cost alto (historial, grabaciones, reseñas, correcciones) |
| Zoom satura con muchos profes premium | Baja | Medio | Monitorizar uso. Zoom Business soporta ~100 meetings simultáneos. Escalar plan si necesario |
| Calidad desigual de profesores | Media | Alto | Aprobación manual inicial + sistema de reseñas + suspensión si rating < 3 estrellas |
| Stripe Connect complejo | Media | Bajo | No es necesario para MVP. Profesores cobran directamente. Implementar solo cuando haya demanda |
