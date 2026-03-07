// src/lib/level-content.ts — DELF/DALF level content for /preparacion-delf-dalf/[nivel]

export interface ExamPart {
  prueba: string;
  duracion: string;
  puntos: string;
  evalua: string;
}

export interface ProgramWeek {
  semanas: string;
  tema: string;
  actividades: string;
}

export interface Simulacro {
  label: string;
  href: string | null; // null = próximamente
}

export interface LevelData {
  slug: string;
  code: string;
  name: string;
  frenchName: string;
  badge: "DELF" | "DALF";
  hours: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  profile: string;
  examStructure: ExamPart[];
  examNote: string;
  competencies: string[];
  specialBlock: { title: string; text: string } | null;
  simulacros: Simulacro[];
  mcerDescriptor: string;
  materials: string[];
  program: ProgramWeek[];
}

export const LEVEL_DATA: LevelData[] = [
  // ─── A1 ─────────────────────────────────────────────
  {
    slug: "a1",
    code: "A1",
    name: "Découverte",
    frenchName: "DELF A1",
    badge: "DELF",
    hours: "50-80h",
    subtitle: "El primer paso oficial en francés",
    metaTitle: "Preparación DELF A1 Découverte — HolaBonjour",
    metaDescription:
      "Prepara el DELF A1 con simulacros oficiales y situaciones reales de examen. El primer certificado oficial de francés.",
    profile:
      "El DELF A1 es el primer certificado oficial de francés. Está destinado a principiantes sin conocimientos previos: estudiantes de secundaria que empiezan francés, personas que inician el aprendizaje por motivos familiares o profesionales, y adultos que quieren validar sus primeras competencias en la lengua.",
    examStructure: [
      { prueba: "Compréhension de l'oral", duracion: "20 min", puntos: "25", evalua: "Comprender anuncios, instrucciones y conversaciones breves" },
      { prueba: "Compréhension des écrits", duracion: "30 min", puntos: "25", evalua: "Leer carteles, formularios, mensajes cortos" },
      { prueba: "Production écrite", duracion: "30 min", puntos: "25", evalua: "Rellenar un formulario, escribir un mensaje simple" },
      { prueba: "Production orale", duracion: "5-7 min", puntos: "25", evalua: "Presentarse, responder preguntas básicas" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 5/25 por prueba)",
    competencies: [
      "Números, fechas, horas y precios",
      "Presentarse y hablar de la familia",
      "Entender instrucciones sencillas y anuncios públicos",
      "Vocabulario cotidiano: casa, ciudad, transporte, comida",
      "Verbos básicos en presente (être, avoir, aller, faire)",
      "Escribir mensajes cortos (SMS, postal, email simple)",
      "Pronunciación básica y entonación interrogativa",
    ],
    specialBlock: null,
    simulacros: [
      { label: "Simulacro completo", href: null },
    ],
    mcerDescriptor:
      "Es capaz de comprender y utilizar expresiones cotidianas de uso muy frecuente, así como frases sencillas destinadas a satisfacer necesidades de tipo inmediato. Puede presentarse a sí mismo y a otros, pedir y dar información personal básica.",
    materials: [
      "Diálogos breves y situacionales",
      "Textos cortos: carteles, menús, formularios",
      "Documentos sonoros de menos de 2 minutos",
      "Fichas de vocabulario temático con flashcards",
    ],
    program: [
      { semanas: "1-2", tema: "Presentaciones y saludos", actividades: "Se présenter, épeler, nationalités, alphabet phonétique" },
      { semanas: "3-4", tema: "Familia y descripción", actividades: "La famille, adjectifs, articles, possessifs" },
      { semanas: "5-6", tema: "La casa y la ciudad", actividades: "Le logement, la ville, prépositions de lieu, il y a" },
      { semanas: "7-8", tema: "Rutinas y horarios", actividades: "Les activités quotidiennes, l'heure, verbes pronominaux" },
      { semanas: "9-10", tema: "Compras y servicios", actividades: "Faire les courses, les prix, les quantités, partitifs" },
      { semanas: "11-12", tema: "Transporte y desplazamientos", actividades: "Les transports, demander son chemin, futur proche" },
      { semanas: "13-14", tema: "Alimentación y restaurante", actividades: "Commander au restaurant, exprimer ses goûts, les repas" },
      { semanas: "15-16", tema: "Simulacro completo + revisión", actividades: "Examen blanc complet, correction détaillée, stratégies d'examen" },
    ],
  },

  // ─── A2 ─────────────────────────────────────────────
  {
    slug: "a2",
    code: "A2",
    name: "Survie",
    frenchName: "DELF A2",
    badge: "DELF",
    hours: "80-120h",
    subtitle: "Comunícate en situaciones cotidianas",
    metaTitle: "Preparación DELF A2 — Simulacros oficiales gratis | HolaBonjour",
    metaDescription:
      "Prepara el DELF A2 con 2 simulacros completos, audio oficial FEI y corrección IA. Practica gratis online.",
    profile:
      "El DELF A2 es el nivel más solicitado para la reagrupación familiar, visados de larga duración y programas de integración en Francia. El candidato típico tiene 1-2 años de estudio irregular y necesita validar que puede desenvolverse en situaciones cotidianas: compras, transporte, trámites sencillos.",
    examStructure: [
      { prueba: "Compréhension de l'oral", duracion: "25 min", puntos: "25", evalua: "Comprender conversaciones cotidianas, anuncios, indicaciones" },
      { prueba: "Compréhension des écrits", duracion: "30 min", puntos: "25", evalua: "Leer correspondencia, artículos cortos, anuncios" },
      { prueba: "Production écrite", duracion: "45 min", puntos: "25", evalua: "Carta informal o mensaje de 60-80 palabras" },
      { prueba: "Production orale", duracion: "6-8 min", puntos: "25", evalua: "Monólogo breve + intercambio sobre tema cotidiano" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 5/25 por prueba)",
    competencies: [
      "Describir tu entorno, rutinas y experiencias pasadas",
      "Expresar opiniones sencillas con justificación básica",
      "Escribir mensajes informales coherentes (60-80 palabras)",
      "Interactuar en situaciones cotidianas (tiendas, servicios, transporte)",
      "Usar conectores básicos (mais, parce que, alors, d'abord, ensuite)",
      "Passé composé e imparfait: usos básicos",
      "Vocabulario de la vida diaria: trabajo, ocio, salud",
    ],
    specialBlock: null,
    simulacros: [
      { label: "Exemple 1 — Simulacro completo", href: "/examenes/a2/1" },
      { label: "Exemple 2 — Simulacro completo", href: "/examenes/a2/2" },
    ],
    mcerDescriptor:
      "Es capaz de comprender frases y expresiones de uso frecuente relacionadas con áreas de experiencia que le son relevantes. Sabe comunicarse en situaciones sencillas y cotidianas. Puede describir en términos sencillos aspectos de su pasado y su entorno.",
    materials: [
      "Textos auténticos simplificados y documentos sonoros cotidianos",
      "Manuales: Version Originale A2, Alter Ego+ A2",
      "Cómics franceses adaptados al nivel",
      "Podcasts RFI Journal en français facile",
      "Películas francesas con subtítulos en francés",
    ],
    program: [
      { semanas: "1-2", tema: "Passé composé y narración", actividades: "Raconter un événement, passé composé, participes passés irréguliers" },
      { semanas: "3-4", tema: "Descripción e imparfait", actividades: "Décrire des habitudes passées, imparfait, comparaison PC/imparfait" },
      { semanas: "5-6", tema: "Expresar opiniones", actividades: "Donner son avis, exprimer l'accord/le désaccord, connecteurs simples" },
      { semanas: "7-8", tema: "Futuro y proyectos", actividades: "Futur simple, exprimer des projets, faire des propositions" },
      { semanas: "9-10", tema: "Comprensión oral intensiva", actividades: "Écoute de documents authentiques, prise de notes, stratégies CO" },
      { semanas: "11-12", tema: "Producción escrita", actividades: "Rédiger des messages, lettres amicales, structure PE A2" },
      { semanas: "13-14", tema: "Producción oral", actividades: "Monologue suivi, interaction, jeux de rôle quotidiens" },
      { semanas: "15-16", tema: "Simulacro completo + corrección", actividades: "Examen blanc 1 + examen blanc 2 avec correction détaillée" },
    ],
  },

  // ─── B1 ─────────────────────────────────────────────
  {
    slug: "b1",
    code: "B1",
    name: "Seuil",
    frenchName: "DELF B1",
    badge: "DELF",
    hours: "150-200h",
    subtitle: "El nivel de la autonomía real en francés",
    metaTitle: "Preparación DELF B1 — Simulacros y corrección IA | HolaBonjour",
    metaDescription:
      "Prepara el DELF B1 con simulacros reales, audio oficial FEI y corrección IA de tu producción escrita. Ideal para funcionarios y oposiciones.",
    profile:
      "El DELF B1 es el nivel más solicitado por funcionarios españoles para oposiciones con bonificación lingüística. También es el mínimo para universidades francesas (Erasmus) y lo exigen empresas para comunicación habitual con clientes francófonos. El candidato típico tiene base pero necesita estructura y estrategia de examen.",
    examStructure: [
      { prueba: "Compréhension de l'oral", duracion: "25 min", puntos: "25", evalua: "Documentos sonoros variados: noticias, entrevistas, conversaciones" },
      { prueba: "Compréhension des écrits", duracion: "35 min", puntos: "25", evalua: "Artículos de prensa, textos informativos, correspondencia formal" },
      { prueba: "Production écrite", duracion: "45 min", puntos: "25", evalua: "Texto personal o formal de 160-180 palabras" },
      { prueba: "Production orale", duracion: "15 min", puntos: "25", evalua: "Monólogo preparado + ejercicio interactivo con el examinador" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 5/25 por prueba)",
    competencies: [
      "Comprender los puntos principales de textos estándar sobre temas familiares",
      "Expresar y justificar experiencias, opiniones y planes futuros",
      "Escribir textos claros y coherentes (160-180 palabras)",
      "Interactuar con fluidez en situaciones cotidianas y profesionales básicas",
      "Conectores avanzados (cependant, en revanche, bien que + subjonctif)",
      "Uso correcto del subjonctif en contextos obligatorios",
      "Pronombres relativos compuestos (dont, auquel, duquel)",
    ],
    specialBlock: null,
    simulacros: [
      { label: "Exemple 1 — Simulacro completo", href: "/examenes/b1/1" },
      { label: "Exemple 2 — Simulacro completo", href: "/examenes/b1/2" },
    ],
    mcerDescriptor:
      "Es capaz de comprender los puntos principales de textos claros y en lengua estándar sobre cuestiones conocidas. Sabe desenvolverse en la mayor parte de las situaciones de viaje. Es capaz de producir textos sencillos y coherentes sobre temas familiares. Puede describir experiencias, acontecimientos, deseos y aspiraciones, así como justificar brevemente sus opiniones o explicar sus planes.",
    materials: [
      "Prensa francesa: Le Monde Étudiants, 20 Minutes",
      "Podcasts auténticos: Affaires sensibles, France Inter",
      "Literatura simplificada y novelas cortas",
      "Documentales en francés con subtítulos",
      "Manuales de preparación DELF B1",
    ],
    program: [
      { semanas: "1-2", tema: "Diagnóstico + estrategias CO", actividades: "Test initial, techniques d'écoute, prise de notes, repérage d'indices" },
      { semanas: "3-4", tema: "CE: textos informativos y argumentativos", actividades: "Articles de presse, textes informatifs, repérage de la thèse et des arguments" },
      { semanas: "5-6", tema: "PE: estructura personal y formal", actividades: "Structure du texte argumentatif, connecteurs, registre formel/informel" },
      { semanas: "7-8", tema: "Conectores y subjonctif", actividades: "Connecteurs logiques, subjonctif obligatoire, cause/conséquence/but" },
      { semanas: "9-10", tema: "PO: monólogo preparado", actividades: "Présentation structurée, gestion du temps, vocabulaire d'opinion" },
      { semanas: "11-12", tema: "PO: ejercicio interactivo", actividades: "Interaction avec l'examinateur, négociation, résolution de problème" },
      { semanas: "13-14", tema: "Simulacro 1 completo", actividades: "Examen blanc complet + correction détaillée + analyse des erreurs" },
      { semanas: "15-16", tema: "Simulacro 2 + sesión con Isabelle", actividades: "Examen blanc 2 + session individuelle de correction avec Isabelle" },
    ],
  },

  // ─── B2 ─────────────────────────────────────────────
  {
    slug: "b2",
    code: "B2",
    name: "Avancé",
    frenchName: "DELF B2",
    badge: "DELF",
    hours: "250-350h",
    subtitle: "El nivel que abre puertas en Francia",
    metaTitle: "Preparación DELF B2 — Simulacros oficiales gratis | HolaBonjour",
    metaDescription:
      "Prepara el DELF B2 con simulacros reales y corrección IA con los criterios exactos de France Éducation Internationale. Practica gratis.",
    profile:
      "El DELF B2 es el nivel más demandado de toda la familia DELF/DALF. Lo necesitan funcionarios para cuerpos superiores, universitarios para másteres en Francia, profesionales en entornos francófonos y personas que buscan la nacionalidad francesa. Es el nivel que valida que puedes argumentar, debatir y defender tu punto de vista.",
    examStructure: [
      { prueba: "Compréhension de l'oral", duracion: "30 min", puntos: "25", evalua: "Documentos de radio, debates, conferencias" },
      { prueba: "Compréhension des écrits", duracion: "35 min", puntos: "25", evalua: "Textos argumentativos, artículos de opinión" },
      { prueba: "Production écrite", duracion: "60 min", puntos: "25", evalua: "Texto argumentativo de mínimo 250 palabras" },
      { prueba: "Production orale", duracion: "20 min", puntos: "25", evalua: "Presentación de 5 min + debate con el examinador" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 5/25 por prueba)",
    competencies: [
      "Comprender discurso complejo y abstracto sobre temas variados",
      "Argumentar con fluidez y espontaneidad sin esfuerzo visible",
      "Escribir textos detallados y bien estructurados (mínimo 250 palabras)",
      "Defender un punto de vista con argumentos sólidos y ejemplos",
      "Conectores avanzados de argumentación (en effet, par ailleurs, toutefois, force est de constater)",
      "Dominar registros formal e informal",
      "Estructurar un texto argumentativo: introducción, desarrollo (2-3 argumentos), conclusión",
    ],
    specialBlock: {
      title: "El error más común en el B2",
      text: "La Production écrite. El 60% de los candidatos que suspenden lo hacen por la PE — no por falta de nivel sino por no conocer el formato exacto de la grille d'évaluation. La corrección IA de HolaBonjour evalúa tu texto con los mismos 5 criterios que usa el examinador real: respect de la consigne, capacité à argumenter, cohérence et cohésion, compétence lexicale y compétence grammaticale.",
    },
    simulacros: [
      { label: "Exemple 1 — Simulacro completo", href: "/examenes/b2/1" },
      { label: "Exemple 2 — Simulacro completo", href: "/examenes/b2/2" },
    ],
    mcerDescriptor:
      "Es capaz de entender las ideas principales de textos complejos que traten de temas tanto concretos como abstractos. Puede relacionarse con hablantes nativos con un grado suficiente de fluidez y naturalidad. Puede producir textos claros y detallados sobre temas diversos, así como defender un punto de vista sobre temas generales indicando los pros y los contras.",
    materials: [
      "Prensa de referencia: Le Monde, Le Figaro, Libération, Le Point",
      "Debates de radio: France Inter, France Culture",
      "Literatura original francesa contemporánea",
      "Ensayos y artículos de opinión",
      "Documentales de actualidad en francés",
      "Grilles d'évaluation oficiales FEI",
    ],
    program: [
      { semanas: "1-2", tema: "Diagnóstico completo + análisis grille", actividades: "Test initial B2, analyse de la grille d'évaluation, points forts/faibles" },
      { semanas: "3-4", tema: "CO: documentos de radio y debates", actividades: "Écoute de reportages, débats, conférences, prise de notes structurée" },
      { semanas: "5-6", tema: "CE: textos argumentativos y de opinión", actividades: "Articles d'opinion, essais, repérage thèse/antithèse, vocabulaire argumentatif" },
      { semanas: "7-8", tema: "PE: estructura argumentativa + conectores", actividades: "Plan du texte argumentatif, introduction/développement/conclusion, connecteurs" },
      { semanas: "9-10", tema: "PE: 2 producciones completas con corrección IA", actividades: "Rédaction de 2 textes argumentatifs (250+ mots) + correction IA détaillée" },
      { semanas: "11-12", tema: "PO: presentación 5 min + debate 15 min", actividades: "Exposé structuré, gestion du temps, techniques de débat, registre formel" },
      { semanas: "13-14", tema: "Simulacro 1 completo con corrección IA", actividades: "Examen blanc complet + correction IA de la PE + auto-évaluation" },
      { semanas: "15-16", tema: "Simulacro 2 + sesión con Isabelle", actividades: "Examen blanc 2 + session individuelle de correction avec Isabelle" },
    ],
  },

  // ─── C1 ─────────────────────────────────────────────
  {
    slug: "c1",
    code: "C1",
    name: "Autonome",
    frenchName: "DALF C1",
    badge: "DALF",
    hours: "400-500h",
    subtitle: "Uso flexible y eficaz del francés",
    metaTitle: "Preparación DALF C1 — Simulacros y preparación | HolaBonjour",
    metaDescription:
      "Prepara el DALF C1 con simulacros reales y la guía de Isabelle Guitton, especialista en preparación DALF. Nivel universidad y profesional.",
    profile:
      "El DALF C1 es para profesionales y académicos que necesitan un francés avanzado. Lo exigen la mayoría de universidades francesas para doctorado y másteres de investigación, el CNRS, la función pública francesa para puestos directivos, y empresas multinacionales para roles de gestión en entornos francófonos. También puede ser requerido para la naturalización francesa.",
    examStructure: [
      { prueba: "Compréhension de l'oral", duracion: "40 min", puntos: "25", evalua: "Conferencias, debates, documentales especializados" },
      { prueba: "Compréhension des écrits", duracion: "50 min", puntos: "25", evalua: "Textos especializados, ensayos, artículos académicos" },
      { prueba: "Production écrite", duracion: "2h30", puntos: "25", evalua: "Síntesis de documentos (220 pal.) + texto argumentativo (250 pal.)" },
      { prueba: "Production orale", duracion: "30 min", puntos: "25", evalua: "Presentación de 10 min + debate de 20 min" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 5/25 por prueba)",
    competencies: [
      "Comprender textos largos y exigentes con significados implícitos",
      "Expresarse con fluidez sin búsqueda visible de palabras",
      "Usar el francés de forma flexible para fines sociales, académicos y profesionales",
      "Producir textos bien estructurados sobre temas complejos",
      "Sintetizar múltiples fuentes de información en un texto coherente",
      "Dominar el registro académico y formal",
      "Técnicas de síntesis: identificar, reformular, neutralidad",
    ],
    specialBlock: {
      title: "La prueba más difícil del C1",
      text: "La Production écrite del C1 exige sintetizar 3-4 documentos de naturaleza distinta (artículo de prensa, gráfico, texto literario) en un texto coherente de 220 palabras, seguido de un texto argumentativo personal de 250 palabras. Es la prueba donde más candidatos fallan — y donde la preparación específica marca más la diferencia.",
    },
    simulacros: [
      { label: "Exemple 1 — Simulacro completo", href: "/examenes/c1/1" },
      { label: "Exemple 2 — Próximamente", href: null },
    ],
    mcerDescriptor:
      "Es capaz de comprender una amplia variedad de textos extensos y con cierto nivel de exigencia, así como reconocer en ellos sentidos implícitos. Sabe expresarse de forma fluida y espontánea sin muestras muy evidentes de esfuerzo. Puede hacer un uso flexible y efectivo del idioma para fines sociales, académicos y profesionales. Puede producir textos claros, bien estructurados y detallados sobre temas de cierta complejidad.",
    materials: [
      "Prensa especializada: Le Monde Diplomatique, Sciences Humaines, La Recherche",
      "Literatura exigente: Camus, Sartre, Houellebecq, Modiano",
      "Ensayos académicos y artículos de investigación",
      "TED talks en francés y conferencias universitarias",
      "Radio France Culture: debates y análisis en profundidad",
      "Manuales de preparación DALF C1",
    ],
    program: [
      { semanas: "1-2", tema: "Diagnóstico C1 + técnica de síntesis", actividades: "Test initial C1, méthodologie de la synthèse, analyse de documents" },
      { semanas: "3-4", tema: "CO: conferencias y debates complejos", actividades: "Écoute de conférences universitaires, débats spécialisés, prise de notes" },
      { semanas: "5-6", tema: "CE: textos especializados y académicos", actividades: "Lecture d'essais, articles de recherche, identification des thèses implicites" },
      { semanas: "7-8", tema: "PE: síntesis de documentos (x3 prácticas)", actividades: "Synthèse de 3-4 documents, reformulation, neutralité, cohérence (220 mots)" },
      { semanas: "9-10", tema: "PE: texto argumentativo personal", actividades: "Essai argumentatif personnel (250 mots), registre académique, nuance" },
      { semanas: "11-12", tema: "PO: presentación estructurada de 10 min", actividades: "Exposé structuré de 10 min, gestion du temps, support visuel" },
      { semanas: "13-14", tema: "PO: debate y gestión de preguntas", actividades: "Débat avec l'examinateur, gestion des objections, registre soutenu" },
      { semanas: "15-16", tema: "Simulacro completo + sesión con Isabelle", actividades: "Examen blanc complet + session individuelle de correction avec Isabelle" },
    ],
  },

  // ─── C2 ─────────────────────────────────────────────
  {
    slug: "c2",
    code: "C2",
    name: "Maîtrise",
    frenchName: "DALF C2",
    badge: "DALF",
    hours: "600-800h",
    subtitle: "Dominio prácticamente nativo del francés",
    metaTitle: "Preparación DALF C2 — El certificado más alto | HolaBonjour",
    metaDescription:
      "Prepara el DALF C2 con simulacros oficiales completos. El certificado de dominio nativo del francés, el más alto de la familia DELF/DALF.",
    profile:
      "El DALF C2 es el certificado más alto de la familia DELF/DALF y uno de los más exigentes del mundo. Lo obtienen traductores e intérpretes profesionales, académicos e investigadores en humanidades y ciencias sociales, diplomáticos y funcionarios internacionales, y profesionales que aspiran a puestos directivos en entornos completamente francófonos. También es el certificado reconocido por Francia para la dispensa total de la prueba de idioma en la naturalización.",
    examStructure: [
      { prueba: "CO + PO (agrupadas)", duracion: "45 min prep. + 30 min oral", puntos: "50", evalua: "Síntesis oral de documentos sonoros + debate con tribunal" },
      { prueba: "CE + PE (agrupadas)", duracion: "4h", puntos: "50", evalua: "Síntesis escrita de dossier + ensayo argumentativo" },
    ],
    examNote: "Total: 100 puntos — mínimo 50 para aprobar (mínimo 10/50 por parte)",
    competencies: [
      "Comprender sin esfuerzo prácticamente todo lo que oye o lee",
      "Resumir información de diversas fuentes orales y escritas",
      "Expresarse espontáneamente con gran fluidez y precisión",
      "Distinguir matices finos de significado en situaciones complejas",
      "Dominar todos los registros: formal, académico, literario y coloquial",
      "Producir textos con complejidad estilística y retórica",
    ],
    specialBlock: {
      title: "La estructura única del C2",
      text: "A diferencia de los niveles anteriores, el C2 agrupa las pruebas: CE+PE en una sola sesión de 4 horas trabajando sobre un dossier completo, y CO+PO en otra sesión que combina comprensión y expresión oral. Esta estructura requiere una preparación específica muy distinta a los niveles inferiores — es fundamental practicar con simulacros reales.",
    },
    simulacros: [
      { label: "Exemple 1 — Simulacro completo", href: "/examenes/c2/1" },
      { label: "Exemple 2 — Simulacro completo", href: "/examenes/c2/2" },
    ],
    mcerDescriptor:
      "Es capaz de comprender con facilidad prácticamente todo lo que oye o lee. Sabe reconstruir la información y los argumentos procedentes de diversas fuentes orales y escritas. Puede expresarse espontáneamente, con gran fluidez y con un grado de precisión que le permite diferenciar pequeños matices de significado incluso en situaciones de mayor complejidad.",
    materials: [
      "Literatura clásica y contemporánea francesa sin adaptación",
      "Filosofía, ensayos y crítica literaria",
      "Radio y televisión generalista sin apoyo (France Culture, Arte)",
      "Prensa internacional francófona: RFI, TV5 Monde, Le Monde",
      "Textos académicos, jurídicos y científicos",
      "Corpus de exámenes C2 anteriores",
    ],
    program: [
      { semanas: "1-2", tema: "Diagnóstico C2 + análisis de dossier", actividades: "Test initial C2, méthodologie d'analyse de dossier, repérage des enjeux" },
      { semanas: "3-4", tema: "CE: lectura crítica de dossier completo", actividades: "Lecture critique de dossiers complets, identification des thèses, intertextualité" },
      { semanas: "5-6", tema: "PE: síntesis de dossier (x3 prácticas)", actividades: "Synthèse écrite de dossier, reformulation avancée, neutralité, plan rigoureux" },
      { semanas: "7-8", tema: "PE: ensayo C2 — argumentación compleja", actividades: "Essai argumentatif C2, complexité stylistique, rhétorique, registre soutenu" },
      { semanas: "9-10", tema: "CO: síntesis oral de documentos sonoros", actividades: "Écoute de documents longs, synthèse orale structurée, prise de notes avancée" },
      { semanas: "11-12", tema: "PO: presentación + debate con tribunal", actividades: "Exposé de 15 min + débat avec tribunal, gestion de la contradiction" },
      { semanas: "13-14", tema: "Simulacro 1 completo (CE+PE, 4h)", actividades: "Épreuve écrite complète (4h) + correction détaillée + analyse des erreurs" },
      { semanas: "15-16", tema: "Simulacro 2 + sesión con Isabelle", actividades: "Épreuve orale complète + session individuelle avec Isabelle" },
    ],
  },
];

export function getLevelData(slug: string): LevelData | undefined {
  return LEVEL_DATA.find((l) => l.slug === slug.toLowerCase());
}

export const VALID_LEVELS = LEVEL_DATA.map((l) => l.slug);
