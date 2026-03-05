// Complete DELF A1 official exam simulation data
// Transcribed from official DELF A1 TP demo materials (France Éducation International)

export interface ExamQuestion {
  id: string;
  questionText: string;
  /** "mcq" = radio buttons, "text" = short text input, "form" = structured form, "writing" = AI-corrected writing */
  type: "mcq" | "text" | "form" | "writing";
  options?: string[];
  /** For MCQ: index of correct option. For text: accepted answers (case-insensitive, partial match). */
  correctAnswer?: number | string[];
  points: number;
  /** Image description for questions that originally had images */
  imageAlt?: string;
}

export interface ExamExercise {
  id: string;
  number: number;
  title: string;
  instruction: string;
  /** Reading passage or context text */
  passage?: string;
  /** Audio file path for CO exercises */
  audioSrc?: string;
  /** How many times the audio plays in the real exam */
  audioPlays?: number;
  questions: ExamQuestion[];
  totalPoints: number;
}

export interface ExamSection {
  id: string;
  title: string;
  titleFr: string;
  duration: string;
  totalPoints: number;
  icon: string;
  exercises: ExamExercise[];
}

export interface ExamData {
  id: string;
  level: string;
  title: string;
  totalPoints: number;
  totalDuration: string;
  sections: ExamSection[];
}

// ── Compréhension de l'oral ──

const CO_EXERCISES: ExamExercise[] = [
  {
    id: "co-1",
    number: 1,
    title: "Exercice 1",
    instruction: "Vous allez entendre 2 fois un document. Vous avez 30 secondes de pause entre les 2 écoutes puis 30 secondes pour vérifier vos réponses. Lisez les questions. Écoutez le document puis répondez.",
    audioSrc: "/audio/delf-a1/delf-a1-tp-demo-exercice-1.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "co-1-q1",
        questionText: "Solange vous invite à :",
        type: "mcq",
        options: ["Un petit-déjeuner", "Un déjeuner", "Un dîner"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "co-1-q2",
        questionText: "Quel jour ?",
        type: "text",
        correctAnswer: ["samedi", "le samedi"],
        points: 1,
      },
      {
        id: "co-1-q3",
        questionText: "À quelle heure ?",
        type: "mcq",
        options: ["08:00", "12:00", "20:00"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "co-1-q4",
        questionText: "Qu'est-ce que vous devez apporter ?",
        type: "text",
        correctAnswer: ["dessert", "un dessert", "le dessert"],
        points: 1,
      },
    ],
    totalPoints: 4,
  },
  {
    id: "co-2",
    number: 2,
    title: "Exercice 2",
    instruction: "Vous allez entendre 2 fois un document. Vous avez 30 secondes de pause entre les 2 écoutes puis 30 secondes pour vérifier vos réponses. Lisez les questions. Écoutez le document puis répondez.",
    audioSrc: "/audio/delf-a1/delf-a1-tp-demo-exercice-2.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "co-2-q1",
        questionText: "Quel est le numéro du vol ?",
        type: "mcq",
        options: ["AF 8520", "AF 8250", "AF 2580"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "co-2-q2",
        questionText: "L'avion part de :",
        type: "mcq",
        options: ["Bordeaux", "Toulouse", "Marseille"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "co-2-q3",
        questionText: "L'avion part à quelle heure ?",
        type: "text",
        correctAnswer: ["13h50", "13:50", "13 h 50", "13h 50"],
        points: 1.5,
      },
      {
        id: "co-2-q4",
        questionText: "Où est-ce que les passagers doivent aller ?",
        type: "text",
        correctAnswer: ["porte 24", "la porte 24", "porte vingt-quatre"],
        points: 1.5,
      },
    ],
    totalPoints: 5,
  },
  {
    id: "co-3",
    number: 3,
    title: "Exercice 3",
    instruction: "Vous allez entendre 2 fois un document. Vous avez 30 secondes de pause entre les 2 écoutes puis 30 secondes pour vérifier vos réponses. Lisez les questions. Écoutez le document puis répondez.",
    audioSrc: "/audio/delf-a1/delf-a1-tp-demo-exercice-3.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "co-3-q1",
        questionText: "Le message est pour quel jour ?",
        type: "mcq",
        options: ["Lundi", "Mardi", "Mercredi"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "co-3-q2",
        questionText: "Le rendez-vous de 11h est :",
        type: "mcq",
        options: [
          "Chez le dentiste",
          "Chez un client",
          "Avec le directeur",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "co-3-q3",
        questionText: "Où est le déjeuner ?",
        type: "text",
        correctAnswer: ["cafétéria", "cafeteria", "la cafétéria", "à la cafétéria"],
        points: 2,
      },
      {
        id: "co-3-q4",
        questionText: "Quelle est l'heure de la réunion avec M. Nysol ?",
        type: "text",
        correctAnswer: ["15h", "15:00", "15 h", "15h00", "3h", "quinze heures"],
        points: 2,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "co-4",
    number: 4,
    title: "Exercice 4",
    instruction: "Vous allez entendre 5 petits dialogues correspondant à 5 situations différentes. Il y a 6 images (A, B, C, D, E, F). Associez chaque dialogue à une image. Attention, il y a 6 images mais seulement 5 dialogues.",
    audioSrc: "/audio/delf-a1/delf-a1-tp-demo-exercice-4.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "co-4-q1",
        questionText: "Dialogue 1 — Image :",
        type: "mcq",
        options: ["A — Salle de classe avec élèves", "B — Réunion / présentation", "C — Cours avec tableau noir", "D — Deux personnes qui discutent", "E — Femme qui parle", "F — Personnes qui marchent"],
        correctAnswer: 3,
        points: 2,
      },
      {
        id: "co-4-q2",
        questionText: "Dialogue 2 — Image :",
        type: "mcq",
        options: ["A — Salle de classe avec élèves", "B — Réunion / présentation", "C — Cours avec tableau noir", "D — Deux personnes qui discutent", "E — Femme qui parle", "F — Personnes qui marchent"],
        correctAnswer: 5,
        points: 2,
      },
      {
        id: "co-4-q3",
        questionText: "Dialogue 3 — Image :",
        type: "mcq",
        options: ["A — Salle de classe avec élèves", "B — Réunion / présentation", "C — Cours avec tableau noir", "D — Deux personnes qui discutent", "E — Femme qui parle", "F — Personnes qui marchent"],
        correctAnswer: 0,
        points: 2,
      },
      {
        id: "co-4-q4",
        questionText: "Dialogue 4 — Image :",
        type: "mcq",
        options: ["A — Salle de classe avec élèves", "B — Réunion / présentation", "C — Cours avec tableau noir", "D — Deux personnes qui discutent", "E — Femme qui parle", "F — Personnes qui marchent"],
        correctAnswer: 4,
        points: 2,
      },
      {
        id: "co-4-q5",
        questionText: "Dialogue 5 — Image :",
        type: "mcq",
        options: ["A — Salle de classe avec élèves", "B — Réunion / présentation", "C — Cours avec tableau noir", "D — Deux personnes qui discutent", "E — Femme qui parle", "F — Personnes qui marchent"],
        correctAnswer: 1,
        points: 2,
      },
    ],
    totalPoints: 10,
  },
  {
    id: "co-5",
    number: 5,
    title: "Exercice 5",
    instruction: "Vous allez entendre plusieurs petits dialogues. Pour chaque dialogue, indiquez si la personne parle de l'objet proposé (oui ou non).",
    audioSrc: "/audio/delf-a1/TP_demo2_A1_exo5.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "co-5-q1",
        questionText: "Une serviette (toalla) :",
        type: "mcq",
        options: ["Oui", "Non"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "co-5-q2",
        questionText: "Des lunettes de soleil (gafas de sol) :",
        type: "mcq",
        options: ["Oui", "Non"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "co-5-q3",
        questionText: "Un téléphone (teléfono) :",
        type: "mcq",
        options: ["Oui", "Non"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "co-5-q4",
        questionText: "Un chapeau (sombrero) :",
        type: "mcq",
        options: ["Oui", "Non"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "co-5-q5",
        questionText: "Un appareil photo (cámara) :",
        type: "mcq",
        options: ["Oui", "Non"],
        correctAnswer: 1,
        points: 1,
      },
    ],
    totalPoints: 5,
  },
];

// ── Compréhension des écrits ──

const CE_EXERCISES: ExamExercise[] = [
  {
    id: "ce-1",
    number: 1,
    title: "Exercice 1",
    instruction: "Lisez le document puis répondez aux questions.",
    passage: `PETITE ANNONCE

Je recherche une personne pour garder mes enfants de 1 et 7 ans.
Il faut être disponible pour travailler les jeudis, vendredis et samedis soirs après 17 heures.
Vous devez habiter dans le centre de Limoges ou avoir une voiture.
Tarifs : 45 € pour une soirée.
Expérience avec les enfants souhaitée.

Si vous êtes intéressé(e), appelez le 06 38 46 27 11.`,
    questions: [
      {
        id: "ce-1-q1",
        questionText: "Quel travail est proposé ?",
        type: "mcq",
        options: [
          "Garder des enfants (babysitting)",
          "Promener un chien",
          "Faire le ménage",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "ce-1-q2",
        questionText: "La personne doit être disponible le :",
        type: "mcq",
        options: ["Mercredi", "Jeudi", "Dimanche"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "ce-1-q3",
        questionText: "La personne doit être disponible :",
        type: "mcq",
        options: ["Le matin", "Le midi", "Le soir"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "ce-1-q4",
        questionText: "Combien coûte une soirée ?",
        type: "text",
        correctAnswer: ["45", "45€", "45 €", "45 euros"],
        points: 1.5,
      },
      {
        id: "ce-1-q5",
        questionText: "Que devez-vous faire si vous êtes intéressé(e) ?",
        type: "text",
        correctAnswer: ["appeler", "téléphoner", "appeler au 06 38 46 27 11", "téléphoner au 06"],
        points: 1.5,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "ce-2",
    number: 2,
    title: "Exercice 2",
    instruction: "Lisez le document puis répondez aux questions.",
    passage: `BIBLIOTHÈQUE MUNICIPALE — PLAN ET HORAIRES

PREMIER ÉTAGE : Livres pour enfants — Journaux et magazines
DEUXIÈME ÉTAGE : Livres pour adultes — Salle de travail — Salle Internet — Cafétéria

HORAIRES :
Lundi à vendredi : 8h – 12h
Samedi : 8h – 19h`,
    questions: [
      {
        id: "ce-2-q1",
        questionText: "Les livres pour enfants sont :",
        type: "mcq",
        options: [
          "Au premier étage",
          "Au deuxième étage",
          "Au sous-sol",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "ce-2-q2",
        questionText: "Qu'est-ce qu'il y a dans la bibliothèque ?",
        type: "mcq",
        options: [
          "Une piscine",
          "Un restaurant",
          "Une cafétéria",
        ],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "ce-2-q3",
        questionText: "À quelle heure ouvre la bibliothèque le matin ?",
        type: "text",
        correctAnswer: ["8h", "8:00", "8 h", "huit heures", "08h", "08:00"],
        points: 2,
      },
      {
        id: "ce-2-q4",
        questionText: "Quel jour la bibliothèque est-elle ouverte l'après-midi ?",
        type: "text",
        correctAnswer: ["samedi", "le samedi"],
        points: 2,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "ce-3",
    number: 3,
    title: "Exercice 3",
    instruction: "Lisez les annonces puis répondez aux questions.",
    passage: `PETITES ANNONCES — EMPLOIS

1. SPORT PLUS — Magasin de chaussures de sport recherche vendeur / vendeuse. À partir d'octobre. Temps plein.

2. RESTAURANT BON APPÉTIT — Cherche serveurs / serveuses pour la saison d'été (juin à septembre). Expérience souhaitée.

3. PROFESSEUR DE DANSE — Pour mariage le 30 mai. Cours particuliers de danse pour le couple. Contactez Émilie au 04 55 32 10 87.

4. CLUB DE FOOTBALL DE BRIANÇON — Cherche entraîneur pour les équipes de jeunes. De septembre à février.

5. CABINET DU DR MARTIN — Secrétaire médicale pendant 3 semaines au mois d'août. Remplacement congés d'été.`,
    questions: [
      {
        id: "ce-3-q1",
        questionText: "Qui propose un travail de serveur ?",
        type: "text",
        correctAnswer: ["Bon Appétit", "restaurant Bon Appétit", "Restaurant Bon Appétit", "le restaurant Bon Appétit"],
        points: 1.5,
      },
      {
        id: "ce-3-q2",
        questionText: "Combien de temps dure le travail de secrétaire médicale ?",
        type: "text",
        correctAnswer: ["3 semaines", "trois semaines", "3 semaines en août"],
        points: 1.5,
      },
      {
        id: "ce-3-q3",
        questionText: "Quelle est la date du mariage ?",
        type: "text",
        correctAnswer: ["30 mai", "le 30 mai", "30/05"],
        points: 1,
      },
      {
        id: "ce-3-q4",
        questionText: "Quand commence le travail chez Sport Plus ?",
        type: "text",
        correctAnswer: ["octobre", "en octobre", "à partir d'octobre"],
        points: 1,
      },
      {
        id: "ce-3-q5",
        questionText: "Michel travaille dans un club de sport. Quel travail peut-il faire ?",
        type: "mcq",
        options: [
          "Vendeur chez Sport Plus",
          "Serveur au restaurant",
          "Entraîneur de football",
        ],
        correctAnswer: 2,
        points: 1,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "ce-4",
    number: 4,
    title: "Exercice 4",
    instruction: "Lisez le document puis répondez aux questions.",
    passage: `QUE FAIRE À PARIS ?

☀️ S'IL FAIT BEAU :
Le matin, visitez le jardin du Luxembourg. L'après-midi, faites une promenade en bateau sur la Seine.

🌧️ S'IL PLEUT :
Allez au musée Carnavalet (gratuit !). Le soir, la Comédie-Française propose des spectacles à petits prix.

🍽️ RESTAURANT :
Le Paris Musical, près des Champs-Élysées. Menu à 21 €.

📞 RÉSERVATION :
Bureau 127 de l'université — du lundi au vendredi, de 10h à 18h.`,
    questions: [
      {
        id: "ce-4-q1",
        questionText: "S'il fait beau l'après-midi, que pouvez-vous faire ?",
        type: "mcq",
        options: [
          "Visiter un musée",
          "Faire un tour en bateau",
          "Aller au théâtre",
        ],
        correctAnswer: 1,
        points: 1.5,
      },
      {
        id: "ce-4-q2",
        questionText: "S'il pleut, quel musée pouvez-vous visiter ?",
        type: "text",
        correctAnswer: ["Carnavalet", "musée Carnavalet", "le musée Carnavalet"],
        points: 1.5,
      },
      {
        id: "ce-4-q3",
        questionText: "Le soir, s'il fait mauvais, que peut-on faire ?",
        type: "mcq",
        options: [
          "Aller au cinéma",
          "Aller au théâtre (Comédie-Française)",
          "Aller au restaurant",
        ],
        correctAnswer: 1,
        points: 1.5,
      },
      {
        id: "ce-4-q4",
        questionText: "Le restaurant est près de :",
        type: "mcq",
        options: [
          "La Tour Eiffel",
          "Les Champs-Élysées",
          "Notre-Dame",
        ],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "ce-4-q5",
        questionText: "Où pouvez-vous réserver ?",
        type: "text",
        correctAnswer: ["bureau 127", "au bureau 127", "bureau 127 de l'université"],
        points: 1.5,
      },
    ],
    totalPoints: 7,
  },
];

// ── Production écrite ──

const PE_EXERCISES: ExamExercise[] = [
  {
    id: "pe-1",
    number: 1,
    title: "Exercice 1 — Formulaire",
    instruction: "Vous voulez vous inscrire dans un hôtel en France. Remplissez le formulaire suivant.",
    questions: [
      {
        id: "pe-1-form",
        questionText: "Remplissez le formulaire d'inscription à l'hôtel.",
        type: "form",
        points: 10,
      },
    ],
    totalPoints: 10,
  },
  {
    id: "pe-2",
    number: 2,
    title: "Exercice 2 — Lettre amicale",
    instruction: "Vous écrivez une lettre à un(e) ami(e) français(e) pour l'inviter dans votre pays pendant les vacances. Vous lui parlez des activités que vous pouvez faire ensemble. (40 mots minimum)",
    questions: [
      {
        id: "pe-2-writing",
        questionText: "Écrivez votre lettre ci-dessous (40 mots minimum) :",
        type: "writing",
        points: 15,
      },
    ],
    totalPoints: 15,
  },
];

// ── Production orale ──

const PO_EXERCISES: ExamExercise[] = [
  {
    id: "po-1",
    number: 1,
    title: "Exercice 1 — Entretien dirigé (1 min)",
    instruction: "L'examinateur vous pose des questions sur vous, votre famille, vos goûts ou vos activités. (Exemples : Comment vous appelez-vous ? Quelle est votre nationalité ? Qu'est-ce que vous aimez faire le week-end ?)",
    questions: [],
    totalPoints: 0,
  },
  {
    id: "po-2",
    number: 2,
    title: "Exercice 2 — Échange d'informations (2 min)",
    instruction: "Vous posez des questions à l'examinateur à partir de mots-clés écrits sur des cartes. (Exemples de mots : Vacances ? Musique ? Sport ? Famille ? Travail ? Cinéma ?)",
    questions: [],
    totalPoints: 0,
  },
  {
    id: "po-3",
    number: 3,
    title: "Exercice 3 — Dialogue simulé (2 min)",
    instruction: "Vous êtes dans une situation de la vie quotidienne (un magasin, un restaurant, une gare...). Vous devez acheter quelque chose, réserver ou demander une information. L'examinateur joue le rôle du vendeur / serveur / employé.",
    questions: [],
    totalPoints: 0,
  },
];

// ── Full exam ──

export const DELF_A1_EXAM: ExamData = {
  id: "delf-a1-demo",
  level: "A1",
  title: "DELF A1 — Examen complet (simulation)",
  totalPoints: 100,
  totalDuration: "1h20",
  sections: [
    {
      id: "co",
      title: "Comprensión oral",
      titleFr: "Compréhension de l'oral",
      duration: "20 min",
      totalPoints: 25,
      icon: "🎧",
      exercises: CO_EXERCISES,
    },
    {
      id: "ce",
      title: "Comprensión escrita",
      titleFr: "Compréhension des écrits",
      duration: "30 min",
      totalPoints: 25,
      icon: "📖",
      exercises: CE_EXERCISES,
    },
    {
      id: "pe",
      title: "Expresión escrita",
      titleFr: "Production écrite",
      duration: "30 min",
      totalPoints: 25,
      icon: "✍️",
      exercises: PE_EXERCISES,
    },
    {
      id: "po",
      title: "Expresión oral",
      titleFr: "Production orale",
      duration: "5-7 min",
      totalPoints: 25,
      icon: "🗣️",
      exercises: PO_EXERCISES,
    },
  ],
};

// Hotel form fields for PE Exercise 1
export const HOTEL_FORM_FIELDS = [
  { id: "nom", label: "Nom (Apellido)", placeholder: "Votre nom de famille" },
  { id: "prenom", label: "Prénom (Nombre)", placeholder: "Votre prénom" },
  { id: "date_naissance", label: "Date de naissance", placeholder: "JJ/MM/AAAA" },
  { id: "nationalite", label: "Nationalité", placeholder: "Votre nationalité" },
  { id: "courriel", label: "Courriel (Email)", placeholder: "votre@email.com" },
  { id: "adresse", label: "Adresse", placeholder: "Votre adresse" },
  { id: "code_postal", label: "Code postal", placeholder: "Ex: 75001" },
  { id: "pays", label: "Pays", placeholder: "Votre pays" },
  { id: "telephone", label: "Téléphone", placeholder: "+34 600 000 000" },
  { id: "profession", label: "Profession", placeholder: "Votre métier" },
  { id: "date_arrivee", label: "Date d'arrivée", placeholder: "JJ/MM/AAAA" },
];
