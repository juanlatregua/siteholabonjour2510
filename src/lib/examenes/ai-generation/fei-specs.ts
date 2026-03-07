/**
 * FEI (France Éducation international) — Specifications for DELF B1, B2 and DALF C1, C2
 *
 * Sources: Manuel du candidat (FEI), Grilles d'évaluation PE/PO,
 * Descripteurs de performance, Référentiel officiel FEI.
 *
 * This file provides the EXACT exam structure, question types, scoring grids,
 * and evaluation criteria for each level, used as context for AI exam generation.
 */

// ─── Types ────────────────────────────────────────────────────────

export interface FEISeccionSpec {
  codigo: 'CO' | 'CE' | 'PE' | 'PO'
  titulo: string
  duracionMinutos: number
  puntuacionTotal: number
  estructura: string // Description for AI prompt
  ejercicios: FEIEjercicioSpec[]
}

export interface FEIEjercicioSpec {
  numero: number
  titulo: string
  descripcion: string
  tipoDocumento: string
  numEscuchas?: number
  numPreguntas: number | string
  tipoPreguntasPermitidos: string[]
  puntuacionTotal: number
  detalles?: string
}

export interface FEIGrilleEvaluacion {
  criterio: string
  maxPuntos: number
  descripteurs: string[]
}

export interface FEINivelSpec {
  nivel: 'B1' | 'B2' | 'C1' | 'C2'
  diploma: 'DELF' | 'DALF'
  duracionTotal: string
  descripcionGeneral: string
  secciones: FEISeccionSpec[]
  grillePE: FEIGrilleEvaluacion[]
  grillePO: FEIGrilleEvaluacion[]
  peMinPalabras: number
  peConsigneType: string
  poStructure: string
}

// ─── DELF B1 ──────────────────────────────────────────────────────

export const FEI_B1: FEINivelSpec = {
  nivel: 'B1',
  diploma: 'DELF',
  duracionTotal: '1h55 + PO 15 min',
  descripcionGeneral:
    'Le DELF B1 (niveau Seuil) évalue la capacité à interagir dans des situations courantes de la vie quotidienne, à exprimer son opinion et à comprendre des textes et documents audio sur des sujets familiers.',

  secciones: [
    // ── CO ──
    {
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 25,
      puntuacionTotal: 25,
      estructura:
        '3 exercices. Exercice 1 : comprendre une conversation entre locuteurs natifs (7 pts, ~2 min). Exercice 2 : comprendre une émission de radio (reportage, interview) (9 pts, ~3 min). Exercice 3 : comprendre une émission de radio (reportage sur un sujet de société) (9 pts, ~3 min). 2 écoutes pour chaque exercice. Durée max des documents : 6 min.',
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exercice 1',
          descripcion: 'Comprendre une conversation entre locuteurs natifs sur un sujet de la vie quotidienne.',
          tipoDocumento: 'Conversation entre 2-3 personnes (amis, collègues, famille)',
          numEscuchas: 2,
          numPreguntas: '5-7',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 7,
          detalles: 'QCM à 3 choix. Points : 1 ou 1.5 par question. Total exact : 7 pts.',
        },
        {
          numero: 2,
          titulo: 'Exercice 2',
          descripcion: 'Comprendre une émission de radio (reportage, interview) sur un sujet de société.',
          tipoDocumento: 'Émission de radio (interview, reportage)',
          numEscuchas: 2,
          numPreguntas: '7-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix. Points : 1, 1.5 par question. Total exact : 9 pts.',
        },
        {
          numero: 3,
          titulo: 'Exercice 3',
          descripcion: 'Comprendre une émission de radio (reportage sur un sujet de société, culture, science).',
          tipoDocumento: 'Émission de radio (reportage, chronique)',
          numEscuchas: 2,
          numPreguntas: '7-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix. Points : 1, 1.5 par question. Total exact : 9 pts.',
        },
      ],
    },

    // ── CE ──
    {
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      estructura:
        '3 exercices. Exercice 1 : comprendre des documents utilitaires pour sélectionner selon des critères (grille OUI/NON, 8 pts). Exercice 2 : comprendre un article de journal/magazine (QCM + vrai/faux, 8 pts). Exercice 3 : comprendre un article plus long/argumentatif (QCM + vrai/faux, 9 pts).',
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exercice 1',
          descripcion:
            'Comprendre des documents utilitaires (annonces, publicités, menus) pour sélectionner en fonction de critères précis. Grille OUI/NON avec 4 documents × 4 critères.',
          tipoDocumento: '4 courts textes descriptifs (restaurants, hôtels, activités, locations)',
          numPreguntas: 16,
          tipoPreguntasPermitidos: ['vrai-faux'],
          puntuacionTotal: 8,
          detalles:
            '4 documents × 4 critères = 16 questions vrai-faux à 0.5 pt chacune. Le candidat doit indiquer si chaque document correspond à chaque critère.',
        },
        {
          numero: 2,
          titulo: 'Exercice 2',
          descripcion: 'Comprendre un article de journal ou de magazine sur un sujet de société.',
          tipoDocumento: "Article de presse (journal, magazine, blog) — ~300-400 mots",
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm', 'vrai-faux'],
          puntuacionTotal: 8,
          detalles: 'QCM à 3 choix (1 ou 1.5 pts) et/ou vrai-faux (1 pt). Mélange des deux types.',
        },
        {
          numero: 3,
          titulo: 'Exercice 3',
          descripcion: 'Comprendre un article plus long, argumentatif, sur un sujet de société (logement, environnement, éducation...).',
          tipoDocumento: "Article de presse argumentatif — ~400-500 mots",
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm', 'vrai-faux'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix et/ou vrai-faux. Points : 1, 1.5 par question. Total exact : 9 pts.',
        },
      ],
    },

    // ── PE ──
    {
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      estructura:
        "1 exercice unique. Le candidat rédige un essai, une lettre ou un courriel en réponse à une situation donnée. Il exprime son point de vue personnel de manière argumentée. Minimum 160 mots.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Essai / Courrier',
          descripcion:
            "Rédiger un texte (essai, lettre, courriel) pour exprimer un point de vue personnel sur un thème général. Le candidat doit donner son opinion de manière argumentée avec des exemples.",
          tipoDocumento: 'Consigne + document déclencheur (message, mail, extrait d\'article)',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 25,
          detalles: 'Minimum 160 mots. Évaluation sur grille PE B1 (6 critères, 25 pts max).',
        },
      ],
    },

    // ── PO ──
    {
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 15,
      puntuacionTotal: 25,
      estructura:
        "3 parties. Partie 1 — Entretien dirigé (2-3 min, sans préparation, 5 pts) : parler de soi. Partie 2 — Exercice en interaction (3-4 min, sans préparation, 10 pts) : jeu de rôle. Partie 3 — Expression d'un point de vue (5-7 min, avec 10 min de préparation, 10 pts) : monologue argumenté à partir d'un document déclencheur.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Partie 1 — Entretien dirigé',
          descripcion: "Parler de soi, de ses activités, de ses centres d'intérêt, de son passé, présent et projets.",
          tipoDocumento: 'Questions de l\'examinateur',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 5,
          detalles: 'Sans préparation. 2-3 minutes. 5-6 questions-guides pour l\'examinateur.',
        },
        {
          numero: 2,
          titulo: 'Partie 2 — Exercice en interaction',
          descripcion:
            'Jeu de rôle : faire face à une situation inhabituelle de la vie courante (voisinage, voyage, travail, commerce...).',
          tipoDocumento: "Sujet de jeu de rôle avec contexte et rôles définis",
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 10,
          detalles: 'Sans préparation. 3-4 min. 3-4 sujets alternatifs proposés.',
        },
        {
          numero: 3,
          titulo: "Partie 3 — Expression d'un point de vue",
          descripcion:
            "Monologue argumenté à partir d'un court document déclencheur (extrait d'article). Le candidat dégage le thème et présente son opinion.",
          tipoDocumento: 'Court texte déclencheur (titre + 2-3 phrases)',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 10,
          detalles: 'Avec préparation (10 min). 5-7 min. 3-4 sujets alternatifs.',
        },
      ],
    },
  ],

  grillePE: [
    { criterio: 'Respect de la consigne', maxPuntos: 2, descripteurs: ['0 : Ne respecte pas la consigne', '0.5 : Respecte partiellement', '1 : Respecte dans l\'ensemble', '1.5 : Respecte bien', '2 : Respecte pleinement'] },
    { criterio: 'Capacité à présenter des faits', maxPuntos: 4, descripteurs: ['0-1 : Peut décrire quelques faits de manière simple', '1.5-2.5 : Peut décrire des faits avec détails', '3-4 : Peut décrire des faits de manière précise et développée'] },
    { criterio: 'Capacité à exprimer sa pensée', maxPuntos: 4, descripteurs: ['0-1 : Peut exprimer un point de vue très simple', '1.5-2.5 : Peut exprimer et justifier partiellement', '3-4 : Peut exprimer et argumenter de manière claire'] },
    { criterio: 'Cohérence et cohésion', maxPuntos: 3, descripteurs: ['0-1 : Juxtaposition d\'idées', '1.5-2 : Utilise des connecteurs simples', '2.5-3 : Texte bien structuré avec connecteurs variés'] },
    { criterio: 'Compétence lexicale / orthographe lexicale', maxPuntos: 5, descripteurs: ['0-1.5 : Vocabulaire limité, erreurs fréquentes', '2-3 : Vocabulaire suffisant, quelques erreurs', '3.5-5 : Vocabulaire étendu, orthographe globalement correcte'] },
    { criterio: 'Compétence grammaticale / orthographe grammaticale', maxPuntos: 6, descripteurs: ['0-2 : Structures simples, erreurs fréquentes', '2.5-4 : Structures variées, quelques erreurs', '4.5-6 : Bon contrôle grammatical, peu d\'erreurs'] },
  ],

  grillePO: [
    { criterio: 'Partie 1 — Entretien dirigé', maxPuntos: 5, descripteurs: ['Peut parler de soi avec des phrases simples et partiellement développées (0-2)', 'Peut parler de soi de manière fluide et détaillée (3-5)'] },
    { criterio: 'Partie 2 — Interaction', maxPuntos: 4, descripteurs: ['Peut faire face à la situation avec hésitations (0-1.5)', 'Peut interagir de manière efficace (2-4)'] },
    { criterio: 'Partie 2 — Réalisation de la tâche', maxPuntos: 6, descripteurs: ['Réalisation partielle (0-2)', 'Réalisation dans l\'ensemble (2.5-4)', 'Bonne réalisation (4.5-6)'] },
    { criterio: 'Partie 3 — Expression d\'un point de vue', maxPuntos: 5, descripteurs: ['Point de vue limité (0-2)', 'Point de vue clair et partiellement argumenté (2.5-3.5)', 'Point de vue bien argumenté (4-5)'] },
    { criterio: 'Lexique (étendue et maîtrise)', maxPuntos: 2, descripteurs: ['Limité (0-0.5)', 'Suffisant (1-1.5)', 'Étendu (2)'] },
    { criterio: 'Morphosyntaxe', maxPuntos: 3, descripteurs: ['Structures simples, erreurs fréquentes (0-1)', 'Structures variées (1.5-2.5)', 'Bon contrôle (3)'] },
  ],

  peMinPalabras: 160,
  peConsigneType: "Réponse à un mail/message d'un ami ou à une situation personnelle. Le candidat exprime son opinion et donne des exemples.",
  poStructure: 'Partie 1 : Entretien dirigé (sans prép, 2-3 min). Partie 2 : Exercice en interaction / jeu de rôle (sans prép, 3-4 min). Partie 3 : Expression d\'un point de vue à partir d\'un document (avec prép 10 min, 5-7 min).',
}

// ─── DELF B2 ──────────────────────────────────────────────────────

export const FEI_B2: FEINivelSpec = {
  nivel: 'B2',
  diploma: 'DELF',
  duracionTotal: '2h30 + PO 20 min',
  descripcionGeneral:
    'Le DELF B2 (niveau Avancé) évalue la capacité à argumenter, à défendre son point de vue, à comprendre l\'essentiel d\'un texte complexe et à interagir avec aisance et spontanéité.',

  secciones: [
    // ── CO ──
    {
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 30,
      puntuacionTotal: 25,
      estructura:
        '3 exercices. Exercice 1 : comprendre un document long (émission radio, interview ~4-5 min, 2 écoutes, 9 pts). Exercice 2 : comprendre un document long (émission radio, reportage ~4-5 min, 2 écoutes, 9 pts). Exercice 3 : comprendre 3 documents courts (~1-2 min chacun, 1 seule écoute, 7 pts). Durée max des documents : 15 min.',
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exercice 1',
          descripcion: 'Comprendre un document long : émission de radio (interview, débat) sur un sujet de société.',
          tipoDocumento: 'Émission de radio (interview, chronique) — ~4-5 min',
          numEscuchas: 2,
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix. Points variés : 0.5, 1, 1.5, 2, 2.5 pts. Total exact : 9 pts.',
        },
        {
          numero: 2,
          titulo: 'Exercice 2',
          descripcion: 'Comprendre un document long : émission de radio (reportage, analyse) sur un sujet de société.',
          tipoDocumento: 'Émission de radio (reportage, analyse) — ~4-5 min',
          numEscuchas: 2,
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix. Points variés : 0.5, 1, 1.5, 2, 2.5 pts. Total exact : 9 pts.',
        },
        {
          numero: 3,
          titulo: 'Exercice 3',
          descripcion: 'Comprendre 3 documents courts (flash info, brève, annonce) avec 1 seule écoute.',
          tipoDocumento: '3 documents courts de radio (chacun ~1-2 min)',
          numEscuchas: 1,
          numPreguntas: '6 (2 par document)',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 7,
          detalles: '2 questions par document court. Points variés : 0.5, 1, 1.5, 2 pts. Total exact : 7 pts.',
        },
      ],
    },

    // ── CE ──
    {
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      estructura:
        '3 exercices. Exercice 1 : comprendre un texte informatif/argumentatif (~500-600 mots, QCM, 9 pts). Exercice 2 : comprendre un texte informatif/argumentatif (~500-600 mots, QCM, 9 pts). Exercice 3 : comprendre les points de vue de plusieurs personnes (forum, témoignages, 3 personnes, QCM d\'attribution, 7 pts).',
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exercice 1 — Comprendre un texte informatif ou argumentatif',
          descripcion: 'Comprendre un texte de presse argumentatif sur un sujet de société (technologie, éducation, environnement, travail...).',
          tipoDocumento: 'Article de presse (journal, magazine) — ~500-600 mots',
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix uniquement. Points variés : 0.5, 1, 1.5, 2, 2.5 pts. Total exact : 9 pts.',
        },
        {
          numero: 2,
          titulo: 'Exercice 2 — Comprendre un texte informatif ou argumentatif',
          descripcion: 'Comprendre un texte de presse argumentatif (politique, économie, culture, sciences).',
          tipoDocumento: 'Article de presse (journal, magazine) — ~500-600 mots',
          numPreguntas: '6-8',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 9,
          detalles: 'QCM à 3 choix uniquement. Points variés. Total exact : 9 pts.',
        },
        {
          numero: 3,
          titulo: 'Exercice 3 — Comprendre les points de vue',
          descripcion: 'Identifier à quel locuteur (3 personnes) correspond chaque point de vue. Forum, tribunes ou témoignages.',
          tipoDocumento: 'Forum / témoignages de 3 personnes (~150-200 mots chacun)',
          numPreguntas: '6',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 7,
          detalles: '6 affirmations à attribuer à l\'une des 3 personnes (QCM A/B/C). Points variés : 0.5, 1, 1.5, 2 pts.',
        },
      ],
    },

    // ── PE ──
    {
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      estructura:
        "1 exercice unique. Prise de position personnelle argumentée : lettre formelle, article critique, contribution à un débat. Minimum 250 mots.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Prise de position argumentée',
          descripcion:
            "Rédiger un texte argumenté (lettre formelle au maire/directeur, article critique, contribution à un débat) pour contester, proposer ou défendre un point de vue.",
          tipoDocumento: 'Consigne situationnelle (rôle, destinataire, contexte)',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 25,
          detalles: 'Minimum 250 mots. Évaluation sur grille PE B2 (9 critères, 25 pts max).',
        },
      ],
    },

    // ── PO ──
    {
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 20,
      puntuacionTotal: 25,
      estructura:
        "1 partie unique. Présentation et défense d'un point de vue à partir d'un court document déclencheur (article de presse). Le candidat dégage le problème, présente son opinion (exposé ~3 min), puis débat avec l'examinateur (~5-7 min). Préparation : 30 min.",
      ejercicios: [
        {
          numero: 1,
          titulo: "Présentation et défense d'un point de vue",
          descripcion:
            "Monologue argumenté suivi d'un débat avec l'examinateur. Le candidat tire au sort 2 sujets et en choisit 1.",
          tipoDocumento: 'Court article de presse ou extrait (titre + résumé du problème)',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 25,
          detalles: 'Préparation 30 min. Exposé ~3 min + débat ~5-7 min. 2 sujets alternatifs.',
        },
      ],
    },
  ],

  grillePE: [
    { criterio: 'Respect de la consigne', maxPuntos: 2, descripteurs: ['0 : Hors sujet', '0.5-1 : Partiellement respectée', '1.5-2 : Pleinement respectée'] },
    { criterio: 'Correction sociolinguistique', maxPuntos: 2, descripteurs: ['0-0.5 : Inadaptée', '1-1.5 : Partiellement adaptée', '2 : Bien adaptée'] },
    { criterio: 'Capacité à présenter des faits', maxPuntos: 4, descripteurs: ['0-1 : Très limitée', '1.5-2.5 : Suffisante', '3-4 : Bien développée'] },
    { criterio: 'Capacité à argumenter une prise de position', maxPuntos: 3, descripteurs: ['0-1 : Arguments peu développés', '1.5-2 : Arguments clairs', '2.5-3 : Argumentation solide'] },
    { criterio: 'Cohérence et cohésion', maxPuntos: 4, descripteurs: ['0-1 : Manque de structure', '1.5-2.5 : Structure convenable', '3-4 : Bien structuré, connecteurs variés'] },
    { criterio: 'Étendue du vocabulaire', maxPuntos: 2, descripteurs: ['0-0.5 : Vocabulaire limité', '1-1.5 : Suffisant', '2 : Étendu et précis'] },
    { criterio: 'Maîtrise du vocabulaire', maxPuntos: 2, descripteurs: ['0-0.5 : Erreurs fréquentes', '1-1.5 : Quelques erreurs', '2 : Bonne maîtrise'] },
    { criterio: "Maîtrise de l'orthographe", maxPuntos: 1, descripteurs: ['0 : Nombreuses erreurs', '0.5 : Quelques erreurs', '1 : Correcte'] },
    { criterio: 'Étendue et maîtrise des structures grammaticales', maxPuntos: 5, descripteurs: ['0-1.5 : Structures simples, erreurs', '2-3 : Structures variées', '3.5-5 : Bon contrôle grammatical'] },
  ],

  grillePO: [
    { criterio: 'Monologue suivi : présentation du thème', maxPuntos: 3, descripteurs: ['0-1 : Thème mal dégagé', '1.5-2 : Thème identifié', '2.5-3 : Thème bien présenté'] },
    { criterio: 'Monologue suivi : argumentation', maxPuntos: 5, descripteurs: ['0-1.5 : Arguments limités', '2-3 : Arguments clairs', '3.5-5 : Argumentation solide et développée'] },
    { criterio: 'Débat : interaction', maxPuntos: 6, descripteurs: ['0-2 : Difficulté à réagir', '2.5-4 : Réactions pertinentes', '4.5-6 : Interaction naturelle et efficace'] },
    { criterio: 'Lexique (étendue et maîtrise)', maxPuntos: 4, descripteurs: ['0-1 : Limité', '1.5-2.5 : Suffisant', '3-4 : Étendu et précis'] },
    { criterio: 'Morphosyntaxe', maxPuntos: 5, descripteurs: ['0-1.5 : Structures simples', '2-3 : Structures variées', '3.5-5 : Bon contrôle'] },
    { criterio: 'Phonétique, prosodie, fluidité', maxPuntos: 2, descripteurs: ['0-0.5 : Prononciation peu claire', '1-1.5 : Compréhensible', '2 : Claire et naturelle'] },
  ],

  peMinPalabras: 250,
  peConsigneType: "Prise de position argumentée : lettre formelle (au maire, directeur, rédaction), article critique, contribution à un forum/débat. Le candidat doit contester, défendre ou proposer.",
  poStructure: "1 partie unique : présentation et défense d'un point de vue à partir d'un document déclencheur. Préparation 30 min. Exposé ~3 min + débat avec l'examinateur.",
}

// ─── DALF C1 ──────────────────────────────────────────────────────

export const FEI_C1: FEINivelSpec = {
  nivel: 'C1',
  diploma: 'DALF',
  duracionTotal: '4h + PO 30 min',
  descripcionGeneral:
    'Le DALF C1 (niveau Autonome) évalue la capacité à comprendre des documents longs et complexes, à s\'exprimer de manière fluide et structurée, et à produire des textes argumentés et bien construits sur des sujets complexes.',

  secciones: [
    // ── CO ──
    {
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 40,
      puntuacionTotal: 25,
      estructura:
        "2 exercices. Première partie : document long (entretien, conférence, cours ~6-8 min, 2 écoutes, 18 pts). QCM à 3 choix + questions à réponse courte (reponse-libre). Deuxième partie : plusieurs brefs documents radiodiffusés (~2-3 min chacun, 1 seule écoute, 7 pts). QCM à 3 choix uniquement. Durée max documents : 10 min.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Première Partie — Document long',
          descripcion: 'Comprendre un document long : entretien, conférence, cours universitaire. 2 écoutes.',
          tipoDocumento: 'Entretien, conférence, cours, débat — ~6-8 min',
          numEscuchas: 2,
          numPreguntas: '8-12',
          tipoPreguntasPermitidos: ['qcm', 'reponse-libre'],
          puntuacionTotal: 18,
          detalles: 'QCM à 3 choix + questions à réponse courte (1-2 mots). Points variés : 1, 1.5, 2 pts. Lecture des questions 3 min. Pause inter-écoute 3 min. Réponse finale 5 min.',
        },
        {
          numero: 2,
          titulo: 'Deuxième Partie — Documents courts',
          descripcion: 'Comprendre plusieurs brefs documents radiodiffusés. 1 seule écoute.',
          tipoDocumento: '2-3 documents courts de radio (flash info, chronique, publicité) — ~1-3 min chacun',
          numEscuchas: 1,
          numPreguntas: '5-7',
          tipoPreguntasPermitidos: ['qcm'],
          puntuacionTotal: 7,
          detalles: 'QCM à 3 choix. Lecture 1 min avant écoute. 2 min pour répondre après écoute.',
        },
      ],
    },

    // ── CE ──
    {
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 50,
      puntuacionTotal: 25,
      estructura:
        "2 exercices. Exercice 1 : comprendre un texte long (~800-1000 mots) informatif/argumentatif — 13 pts. Exercice 2 : comprendre un texte long (~800-1000 mots) argumentatif — 12 pts. QCM à 3 choix et questions à réponse courte.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exercice 1',
          descripcion: 'Comprendre un texte d\'idées, littéraire ou journalistique (~800-1000 mots).',
          tipoDocumento: 'Article de presse spécialisé, essai, texte d\'opinion — ~800-1000 mots',
          numPreguntas: '8-10',
          tipoPreguntasPermitidos: ['qcm', 'reponse-libre'],
          puntuacionTotal: 13,
          detalles: 'QCM à 3 choix + réponses courtes. Points variés.',
        },
        {
          numero: 2,
          titulo: 'Exercice 2',
          descripcion: 'Comprendre un texte argumentatif complexe (~800-1000 mots).',
          tipoDocumento: 'Article de fond, tribune, essai — ~800-1000 mots',
          numPreguntas: '8-10',
          tipoPreguntasPermitidos: ['qcm', 'reponse-libre'],
          puntuacionTotal: 12,
          detalles: 'QCM à 3 choix + réponses courtes. Points variés.',
        },
      ],
    },

    // ── PE ──
    {
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 150,
      puntuacionTotal: 25,
      estructura:
        "2 exercices. Exercice 1 : Synthèse de documents (~200-240 mots) à partir d'un dossier de ~1000 mots (2-3 textes), 13 pts. Exercice 2 : Essai argumenté (~250+ mots) — prise de position personnelle, 12 pts.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Synthèse de documents',
          descripcion: 'Rédiger une synthèse objective (200-240 mots) à partir d\'un dossier de 2-3 textes (~1000 mots total).',
          tipoDocumento: 'Dossier de 2-3 textes sur un même thème',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 13,
          detalles: 'Synthèse : 200-240 mots. Ne pas donner son avis personnel. Reformuler les idées.',
        },
        {
          numero: 2,
          titulo: 'Essai argumenté',
          descripcion: 'Rédiger un essai argumenté (~250+ mots) exprimant son point de vue personnel sur le thème du dossier.',
          tipoDocumento: 'Même thème que la synthèse',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 12,
          detalles: 'Essai argumenté : 250 mots minimum. Prise de position personnelle.',
        },
      ],
    },

    // ── PO ──
    {
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 30,
      puntuacionTotal: 25,
      estructura:
        "1 partie. Exposé à partir de plusieurs documents écrits, suivi d'une discussion avec le jury. Préparation : 1 heure. Le candidat dégage une problématique, présente un exposé construit (~8-10 min), puis répond aux questions du jury (~15-20 min).",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Exposé et discussion',
          descripcion:
            "Exposé formel à partir d'un dossier de documents (2-3 textes courts), suivi d'un débat approfondi avec le jury.",
          tipoDocumento: "Dossier de 2-3 courts documents (articles, extraits) sur un thème",
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 25,
          detalles: "Préparation 1 heure. Exposé ~8-10 min + discussion ~15-20 min. 2 sujets au choix.",
        },
      ],
    },
  ],

  grillePE: [
    { criterio: 'Synthèse — Respect de la consigne (longueur, reformulation)', maxPuntos: 2, descripteurs: ['Respecte la longueur et reformule'] },
    { criterio: 'Synthèse — Capacité à traiter les textes', maxPuntos: 4, descripteurs: ['Repère les infos principales, les met en relation'] },
    { criterio: 'Synthèse — Capacité à organiser', maxPuntos: 3, descripteurs: ['Plan clair, transitions, introduction et conclusion'] },
    { criterio: 'Synthèse — Compétence linguistique', maxPuntos: 4, descripteurs: ['Lexique précis, structures complexes, orthographe'] },
    { criterio: 'Essai — Respect de la consigne', maxPuntos: 2, descripteurs: ['Thème et longueur respectés, prise de position claire'] },
    { criterio: 'Essai — Argumentation', maxPuntos: 4, descripteurs: ['Arguments développés, exemples pertinents, nuances'] },
    { criterio: 'Essai — Cohérence et cohésion', maxPuntos: 3, descripteurs: ['Structure logique, connecteurs variés, progression'] },
    { criterio: 'Essai — Compétence linguistique', maxPuntos: 3, descripteurs: ['Lexique riche, grammaire maîtrisée'] },
  ],

  grillePO: [
    { criterio: 'Exposé — Présentation du sujet', maxPuntos: 3, descripteurs: ['Dégager la problématique, présenter le plan'] },
    { criterio: 'Exposé — Développement et argumentation', maxPuntos: 5, descripteurs: ['Développer avec arguments, exemples, nuances'] },
    { criterio: 'Discussion — Interaction', maxPuntos: 6, descripteurs: ['Réagir, défendre, nuancer, approfondir'] },
    { criterio: 'Lexique (étendue et maîtrise)', maxPuntos: 4, descripteurs: ['Vocabulaire riche et précis'] },
    { criterio: 'Morphosyntaxe', maxPuntos: 5, descripteurs: ['Structures complexes, bon contrôle'] },
    { criterio: 'Phonétique, prosodie, fluidité', maxPuntos: 2, descripteurs: ['Expression claire, naturelle, avec débit approprié'] },
  ],

  peMinPalabras: 250,
  peConsigneType: "2 épreuves : synthèse (200-240 mots, objective) + essai argumenté (250+ mots). Le dossier de synthèse contient 2-3 textes sur un même thème (société, sciences, éducation, environnement).",
  poStructure: "1 partie : exposé formel à partir d'un dossier de documents + discussion/débat avec le jury. Préparation 1h.",
}

// ─── DALF C2 ──────────────────────────────────────────────────────

export const FEI_C2: FEINivelSpec = {
  nivel: 'C2',
  diploma: 'DALF',
  duracionTotal: '3h30 (CE+PE) + 30 min PO',
  descripcionGeneral:
    "Le DALF C2 (niveau Maîtrise) évalue la capacité à comprendre et produire des textes complexes, à restituer le contenu d'un document sonore de manière structurée, et à argumenter de manière nuancée. L'examen se compose de 2 épreuves : une épreuve collective (CE+PE, 50 pts) et une épreuve individuelle (CO+PO, 50 pts).",

  secciones: [
    // ── CO ──
    {
      codigo: 'CO',
      titulo: "Compréhension et production orales",
      duracionMinutos: 30,
      puntuacionTotal: 25,
      estructura:
        "Épreuve individuelle combinée CO+PO. Le candidat écoute un enregistrement de ~15 min (2 écoutes), prend des notes, puis prépare (1h) un compte rendu oral structuré du document suivi d'un point de vue argumenté et d'un débat avec le jury. CO = restitution du contenu.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Compte rendu du document sonore',
          descripcion: "Écouter un enregistrement long (~15 min, 2 écoutes) et en faire un compte rendu oral structuré.",
          tipoDocumento: 'Enregistrement long (émission radio, conférence, débat) — ~15 min',
          numEscuchas: 2,
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 25,
          detalles: "Compte rendu de 5-10 min, reprenant l'ensemble des informations et points de vue. Évaluation orale.",
        },
      ],
    },

    // ── CE ──
    {
      codigo: 'CE',
      titulo: 'Compréhension et production écrites',
      duracionMinutos: 210,
      puntuacionTotal: 25,
      estructura:
        "Épreuve collective combinée CE+PE. Le candidat lit un dossier de ~2000 mots (3-5 documents) sur un thème, puis rédige un texte structuré de 700+ mots. CE = compréhension implicite évaluée à travers la qualité de la synthèse.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Dossier de lecture',
          descripcion: "Lire et analyser un dossier de 3-5 documents (~2000 mots total) sur un thème académique ou sociétal.",
          tipoDocumento: 'Dossier : 3-5 articles, extraits, données — ~2000 mots',
          numPreguntas: 0,
          tipoPreguntasPermitidos: [],
          puntuacionTotal: 25,
          detalles: "Pas de questions directes — la CE est évaluée à travers la production écrite.",
        },
      ],
    },

    // ── PE ──
    {
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 210,
      puntuacionTotal: 25,
      estructura:
        "Incluse dans l'épreuve collective (3h30 avec CE). Production d'un texte structuré de 700+ mots : synthèse des documents du dossier suivie d'une réflexion personnelle argumentée.",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Production écrite structurée',
          descripcion: "Rédiger un texte structuré (article, essai, rapport) de 700+ mots à partir du dossier de documents.",
          tipoDocumento: 'Même dossier que CE',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['production'],
          puntuacionTotal: 25,
          detalles: "700 mots minimum. Le texte doit synthétiser les documents et présenter une réflexion personnelle.",
        },
      ],
    },

    // ── PO ──
    {
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 30,
      puntuacionTotal: 25,
      estructura:
        "Incluse dans l'épreuve individuelle (avec CO). Après le compte rendu du document sonore, le candidat présente son point de vue argumenté sur le thème (~5-10 min), puis débat avec le jury (~15-20 min).",
      ejercicios: [
        {
          numero: 1,
          titulo: 'Point de vue argumenté et débat',
          descripcion: "Après le compte rendu, présenter un point de vue personnel argumenté sur le thème, puis en débattre avec le jury.",
          tipoDocumento: 'Même thème que le document sonore CO',
          numPreguntas: 1,
          tipoPreguntasPermitidos: ['oral'],
          puntuacionTotal: 25,
          detalles: "Point de vue ~5-10 min + débat ~15-20 min. Dictionnaires monolingues autorisés.",
        },
      ],
    },
  ],

  grillePE: [
    { criterio: 'Compétence pragmatique : respect de la consigne', maxPuntos: 2, descripteurs: ['Type de production, thème, longueur'] },
    { criterio: 'Compétence pragmatique : capacité à analyser et restituer', maxPuntos: 5, descripteurs: ['Sélection des informations pertinentes, reformulation, mise en relation'] },
    { criterio: 'Compétence pragmatique : capacité à argumenter', maxPuntos: 5, descripteurs: ['Prise de position, argumentation développée et nuancée, exemples pertinents'] },
    { criterio: 'Compétence pragmatique : cohérence et cohésion', maxPuntos: 3, descripteurs: ['Plan clair, introduction et conclusion, transitions, progression logique'] },
    { criterio: 'Compétence linguistique : étendue et maîtrise du vocabulaire', maxPuntos: 4, descripteurs: ['Vocabulaire riche, précis et varié, nuances'] },
    { criterio: 'Compétence linguistique : morphosyntaxe et orthographe', maxPuntos: 6, descripteurs: ['Structures complexes maîtrisées, rares erreurs, orthographe fiable'] },
  ],

  grillePO: [
    { criterio: 'Compte rendu : présentation et organisation', maxPuntos: 5, descripteurs: ['Structure claire, reprise complète des informations'] },
    { criterio: 'Compte rendu : fidélité au contenu', maxPuntos: 5, descripteurs: ['Restitution fidèle des informations et points de vue'] },
    { criterio: 'Point de vue : argumentation', maxPuntos: 5, descripteurs: ['Argumentation développée, nuancée, avec exemples'] },
    { criterio: 'Débat : interaction', maxPuntos: 4, descripteurs: ['Réactions pertinentes, défense du point de vue, nuances'] },
    { criterio: 'Compétence linguistique', maxPuntos: 6, descripteurs: ['Lexique riche, grammaire maîtrisée, fluidité, phonétique claire'] },
  ],

  peMinPalabras: 700,
  peConsigneType: "Production écrite structurée (article, essai, rapport) de 700+ mots à partir d'un dossier de 3-5 documents. Synthèse + réflexion personnelle argumentée.",
  poStructure: "Épreuve combinée CO+PO : compte rendu du document sonore (5-10 min) + point de vue argumenté (5-10 min) + débat avec le jury (15-20 min). Préparation 1h.",
}

// ─── Index ────────────────────────────────────────────────────────

export const FEI_SPECS: Record<string, FEINivelSpec> = {
  B1: FEI_B1,
  B2: FEI_B2,
  C1: FEI_C1,
  C2: FEI_C2,
}
