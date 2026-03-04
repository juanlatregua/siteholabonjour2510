// Complete DELF A2 official exam simulation data
// Transcribed from official DELF A2 TP candidat collectif exemple 2 + correcteur

import type { ExamData } from "./delf-a1-exam";

// ── Compréhension de l'oral (25 pts) ──

const CO_EXERCISES = [
  {
    id: "a2-co-1",
    number: 1,
    title: "Exercice 1 — Annonce publique",
    instruction: "Lisez les questions. Écoutez le document puis répondez. Vous entendez cette annonce. (2 écoutes)",
    audioSrc: "/audio/delf-a2/delf-a2-tp-coll-exemple2-exercice1.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "a2-co1-q1",
        questionText: "Le retard va être de combien de temps ?",
        type: "text" as const,
        correctAnswer: ["40 minutes", "40 min", "quarante minutes"],
        points: 1,
      },
      {
        id: "a2-co1-q2",
        questionText: "Quelle est la cause de ce retard ?",
        type: "mcq" as const,
        options: ["A — ❄️ Neige / verglas", "B — ⛈️ Tempête / orage", "C — 💨 Vent fort"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "a2-co1-q3",
        questionText: "L'avion en retard vient...",
        type: "mcq" as const,
        options: ["D'Italie", "De Paris", "De Madrid"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "a2-co1-q4",
        questionText: "Pour avoir plus d'informations, que faut-il faire ?",
        type: "mcq" as const,
        options: [
          "A — 👩‍💼 Aller au comptoir d'information",
          "B — 👥 Demander aux autres passagers",
          "C — 📺 Regarder l'écran des départs",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-co1-q5",
        questionText: "Que vous souhaite la compagnie ?",
        type: "text" as const,
        correctAnswer: ["une excellente journée", "excellente journée", "bonne journée"],
        points: 1,
      },
    ],
    totalPoints: 5,
  },
  {
    id: "a2-co-2",
    number: 2,
    title: "Exercice 2 — Message répondeur",
    instruction: "Lisez les questions. Écoutez le document puis répondez. Vous entendez ce message sur votre répondeur. (2 écoutes)",
    audioSrc: "/audio/delf-a2/delf-a2-tp-coll-exemple2-exercice2.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "a2-co2-q1",
        questionText: "Le magasin vend...",
        type: "mcq" as const,
        options: [
          "A — 📎 Fournitures de bureau",
          "B — 👟 Chaussures",
          "C — 👖 Pantalons",
        ],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "a2-co2-q2",
        questionText: "Le magasin offre des promotions parce que c'est bientôt...",
        type: "mcq" as const,
        options: ["Noël", "Les vacances", "Votre anniversaire"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-co2-q3",
        questionText: "Il y a des réductions de...",
        type: "mcq" as const,
        options: ["5 %", "15 %", "50 %"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "a2-co2-q4",
        questionText: "Quels sont les jours d'ouverture du magasin ?",
        type: "text" as const,
        correctAnswer: ["du lundi au samedi", "lundi au samedi", "lundi à samedi"],
        points: 1,
      },
      {
        id: "a2-co2-q5",
        questionText: "Le soir, le magasin ferme à quelle heure ?",
        type: "text" as const,
        correctAnswer: ["20h", "20:00", "20 h", "8 heures", "huit heures du soir", "20h00"],
        points: 1,
      },
      {
        id: "a2-co2-q6",
        questionText: "Que pouvez-vous faire pour avoir plus d'informations ?",
        type: "text" as const,
        correctAnswer: ["consulter le site", "aller au magasin", "site internet", "visiter le site"],
        points: 1,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "a2-co-3",
    number: 3,
    title: "Exercice 3 — Émission de radio",
    instruction: "Lisez les questions. Écoutez le document puis répondez. Vous écoutez cette émission de radio française. (2 écoutes)",
    audioSrc: "/audio/delf-a2/delf-a2-tp-coll-exemple2-exercice3.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "a2-co3-q1",
        questionText: "La journaliste parle d'un événement qui...",
        type: "mcq" as const,
        options: ["Est déjà fini", "Se passe en ce moment", "Va commencer très bientôt"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-co3-q2",
        questionText: "Quelle est la spécialité du salon présenté dans l'émission ?",
        type: "mcq" as const,
        options: [
          "A — 🧁 Pâtisserie / gâteaux",
          "B — 🥗 Cuisine saine / salades",
          "C — 🍝 Pâtes / cuisine italienne",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-co3-q3",
        questionText: "À qui est réservé ce salon ?",
        type: "text" as const,
        correctAnswer: ["les professionnels et le public", "professionnels et public", "tout le monde", "professionnels et le grand public"],
        points: 1,
      },
      {
        id: "a2-co3-q4",
        questionText: "Que font les chefs présents au salon ? Ils...",
        type: "mcq" as const,
        options: [
          "Parlent de leur travail",
          "Participent à un concours",
          "Cherchent de nouveaux employés",
        ],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-co3-q5",
        questionText: "Quelle nouvelle activité est proposée cette année au salon ?",
        type: "text" as const,
        correctAnswer: ["suivre une classe", "suivre un cours", "un cours avec un chef", "cours de cuisine"],
        points: 1,
      },
      {
        id: "a2-co3-q6",
        questionText: "Pour un adulte, quel est le prix d'une entrée achetée sur place ?",
        type: "text" as const,
        correctAnswer: ["10", "10€", "10 €", "dix", "dix euros", "10 euros"],
        points: 1,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "a2-co-4",
    number: 4,
    title: "Exercice 4 — Dialogues",
    instruction: "Vous allez entendre deux fois quatre dialogues, correspondant à quatre situations différentes. Vous êtes en vacances chez des amis français. Vous entendez ces conversations. Lisez les situations. Écoutez les dialogues puis reliez chaque dialogue à la situation correspondante. (2 écoutes)",
    audioSrc: "/audio/delf-a2/delf-a2-tp-coll-exemple2-exercice4.mp3",
    audioPlays: 2,
    questions: [
      {
        id: "a2-co4-q1",
        questionText: "Dialogue 1 — Situation :",
        type: "mcq" as const,
        options: [
          "A — Proposer de l'aide",
          "B — Informer",
          "C — S'excuser",
          "D — Conseiller quelque chose",
        ],
        correctAnswer: 1,
        points: 2,
      },
      {
        id: "a2-co4-q2",
        questionText: "Dialogue 2 — Situation :",
        type: "mcq" as const,
        options: [
          "A — Proposer de l'aide",
          "B — Informer",
          "C — S'excuser",
          "D — Conseiller quelque chose",
        ],
        correctAnswer: 3,
        points: 2,
      },
      {
        id: "a2-co4-q3",
        questionText: "Dialogue 3 — Situation :",
        type: "mcq" as const,
        options: [
          "A — Proposer de l'aide",
          "B — Informer",
          "C — S'excuser",
          "D — Conseiller quelque chose",
        ],
        correctAnswer: 0,
        points: 2,
      },
      {
        id: "a2-co4-q4",
        questionText: "Dialogue 4 — Situation :",
        type: "mcq" as const,
        options: [
          "A — Proposer de l'aide",
          "B — Informer",
          "C — S'excuser",
          "D — Conseiller quelque chose",
        ],
        correctAnswer: 2,
        points: 2,
      },
    ],
    totalPoints: 8,
  },
];

// ── Compréhension des écrits (25 pts) ──

const CE_EXERCISES = [
  {
    id: "a2-ce-1",
    number: 1,
    title: "Exercice 1 — Annonces immobilières",
    instruction: "Vous habitez en France. Plusieurs de vos amis français recherchent un appartement. Vous lisez ces annonces dans le journal. Quelle est l'annonce qui les intéresse ? Écrivez le numéro de l'annonce.",
    passage: `1. Loue appartement meublé dans centre-ville. Clair. Très calme. Très bon état général. Prix intéressant. www.loueimmo.fr

2. Petite maison à 10 minutes de la ville. Idéale pour famille de 4 personnes. Tél. : 02 60 38 54 10

3. Appartement boulevard Sextius, 3e étage. Soleil. Espace. Non meublé. 1 place de garage. Tél. le soir au 02 60 26 71 59

4. Loue maison avec jardin à 45 minutes du centre-ville. 220 m². Bon état général. Contacter Sophie : 06 58 44 82 29

5. Petit appartement neuf. 45 m². Meublé. À 10 minutes à pied des universités. Prix intéressant. Tél. après 16 h au 02 60 75 88 36`,
    questions: [
      {
        id: "a2-ce1-q1",
        questionText: "A. Bénédicte et Christophe cherchent une maison près de la ville. Ils ont 2 enfants. → Annonce n° ?",
        type: "text" as const,
        correctAnswer: ["2"],
        points: 1,
      },
      {
        id: "a2-ce1-q2",
        questionText: "B. Albert cherche un appartement pas trop cher. Il est étudiant. → Annonce n° ?",
        type: "text" as const,
        correctAnswer: ["5"],
        points: 1,
      },
      {
        id: "a2-ce1-q3",
        questionText: "C. Didier cherche un appartement assez grand. Il a une voiture. → Annonce n° ?",
        type: "text" as const,
        correctAnswer: ["3"],
        points: 1,
      },
      {
        id: "a2-ce1-q4",
        questionText: "D. Émilie cherche un appartement en ville. Elle n'aime pas le bruit. → Annonce n° ?",
        type: "text" as const,
        correctAnswer: ["1"],
        points: 1,
      },
      {
        id: "a2-ce1-q5",
        questionText: "E. Fred cherche une grande maison à l'extérieur de la ville. Il a 3 enfants, un chien et une voiture. → Annonce n° ?",
        type: "text" as const,
        correctAnswer: ["4"],
        points: 1,
      },
    ],
    totalPoints: 5,
  },
  {
    id: "a2-ce-2",
    number: 2,
    title: "Exercice 2 — Message électronique",
    instruction: "Vous recevez ce message électronique. Lisez-le puis répondez aux questions.",
    passage: `De : voyage@malin.com
Objet : Votre voyage à Paris

Madame, Monsieur,

C'est avec grand plaisir que je vous envoie ce message pour vous décrire votre voyage à Paris en notre compagnie.

À votre arrivée, le 7 juin prochain, nous allons vous accueillir à l'aéroport pour vous conduire à votre hôtel. Puis, du 8 au 17 juin, vous allez visiter la capitale de notre pays accompagnés de notre guide, Hervé, qui vous fera découvrir les musées, les rues, les boutiques mais aussi les restaurants de Paris.

N'oubliez pas votre appareil photo ! Les températures en ce moment à Paris sont comprises entre 20 et 24 degrés. Un climat délicieux.

À très bientôt,
L'équipe de voyagemalin.com`,
    questions: [
      {
        id: "a2-ce2-q1",
        questionText: "Quand allez-vous arriver à l'hôtel ?",
        type: "mcq" as const,
        options: ["Le 7 juin", "Le 8 juin", "Le 17 juin"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-ce2-q2",
        questionText: "Hervé travaille...",
        type: "mcq" as const,
        options: ["Comme guide", "Dans un musée", "Dans un restaurant"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-ce2-q3",
        questionText: "Que devez-vous emporter avec vous ?",
        type: "text" as const,
        correctAnswer: ["appareil photo", "un appareil photo", "photo"],
        points: 1.5,
      },
      {
        id: "a2-ce2-q4",
        questionText: "Quelle est la température minimale à Paris en ce moment ?",
        type: "text" as const,
        correctAnswer: ["20", "20 degrés", "vingt degrés", "20°"],
        points: 1.5,
      },
      {
        id: "a2-ce2-q5",
        questionText: "Selon l'agence, le climat de cette saison est...",
        type: "mcq" as const,
        options: ["Plutôt froid", "Plutôt chaud", "Plutôt agréable"],
        correctAnswer: 2,
        points: 1,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "a2-ce-3",
    number: 3,
    title: "Exercice 3 — Documents de travail",
    instruction: "Vous travaillez dans une boulangerie. Vous lisez ces documents.",
    passage: `DOCUMENT 1 — Règles de propreté

À votre arrivée au travail :
• nettoyez-vous bien les mains à l'eau et au savon dans la salle d'eau ;
• mettez votre tenue de travail : protection sur les cheveux, chaussures et uniforme ;
• rangez vos affaires personnelles dans le placard de la salle de repos des employés.

Vous pouvez trouver des vêtements de travail propres à l'accueil.
Certains postes de travail nécessitent de porter des gants.

———

DOCUMENT 2 — Note de Sylvie

Bonjour,
Merci de me remplacer pour servir les clients au magasin.
Tous les prix sont affichés, mais si besoin, j'ai mis la liste des prix à côté de la caisse.
Pour rappel, les chèques ne sont pas acceptés.
Madame Sanchez va passer prendre un gâteau au chocolat vers 10 h, elle a déjà payé (le ticket de caisse est près du téléphone). Le gâteau est dans le frigo.
Merci !
Sylvie

———

DOCUMENT 3 — Mode d'emploi : machine pour faire des glaces

1 - Mélangez le lait, la crème, les jaunes d'œufs et le sucre.
2 - Ajoutez des morceaux de fraises, bananes, oranges, etc.
3 - Versez la préparation dans la machine.
4 - Appuyez sur le bouton « Marche », en bas à droite de la machine.
5 - Mixez 4 minutes 30 maximum, sinon la glace devient trop dure.
6 - Éteignez la machine et nettoyez-la à l'eau chaude.`,
    questions: [
      {
        id: "a2-ce3-q1",
        questionText: "Quand vous arrivez au travail, que devez-vous faire en premier ?",
        type: "mcq" as const,
        options: ["Mettre des gants", "Vous laver les mains", "Attacher vos cheveux"],
        correctAnswer: 1,
        points: 0.5,
      },
      {
        id: "a2-ce3-q2",
        questionText: "Où pouvez-vous mettre vos vêtements et objets personnels ?",
        type: "mcq" as const,
        options: ["À l'accueil", "En salle de pause", "Dans la salle d'eau"],
        correctAnswer: 1,
        points: 2,
      },
      {
        id: "a2-ce3-q3",
        questionText: "La liste des prix des produits est à côté...",
        type: "mcq" as const,
        options: ["Du frigo", "De la caisse", "Du téléphone"],
        correctAnswer: 1,
        points: 0.5,
      },
      {
        id: "a2-ce3-q4",
        questionText: "Une cliente doit venir pour...",
        type: "mcq" as const,
        options: ["Payer", "Passer", "Chercher"],
        correctAnswer: 2,
        points: 1,
      },
      {
        id: "a2-ce3-q5",
        questionText: "Ce document vous propose de faire des glaces...",
        type: "mcq" as const,
        options: ["Au yaourt", "Aux fruits", "Au chocolat"],
        correctAnswer: 1,
        points: 1,
      },
      {
        id: "a2-ce3-q6",
        questionText: "Pour réussir votre glace, vous devez faire très attention...",
        type: "mcq" as const,
        options: [
          "À la température de l'eau",
          "Au nombre d'œufs utilisés",
          "À la durée de marche de la machine",
        ],
        correctAnswer: 2,
        points: 1,
      },
    ],
    totalPoints: 6,
  },
  {
    id: "a2-ce-4",
    number: 4,
    title: "Exercice 4 — Article de journal",
    instruction: "Vous lisez cet article de journal.",
    passage: `« PETITS TRAINS », UNE NOUVELLE IDÉE DE SORTIE À BREST

Jacques Le Cornec, le maire de Brest, a fêté samedi l'ouverture d'un nouveau musée, créé par Jean Jumel, un passionné de petits trains depuis qu'il a 5 ans.

Dans ce musée, vous pouvez voir 10 trains électriques qui se déplacent dans de magnifiques décors, mais aussi des films sur l'histoire des trains français. Et le premier samedi de chaque mois, venez rencontrer des conducteurs de trains !

« Ce lieu peut plaire aux personnes de 2 à 100 ans ! », dit Jean. Deux jeunes en formation à l'université de Brest ont aidé Jean à réunir les 10 000 € nécessaires à la réalisation du projet.

Ouvert du mardi au samedi, d'avril à septembre.
Contact : office de tourisme de Brest

D'après www.letelegramme.fr`,
    questions: [
      {
        id: "a2-ce4-q1",
        questionText: "Cet article parle...",
        type: "mcq" as const,
        options: ["D'un musée", "D'un parc de jeux", "D'une salle de spectacle"],
        correctAnswer: 0,
        points: 1,
      },
      {
        id: "a2-ce4-q2",
        questionText: "Que pouvez-vous faire dans ce lieu ?",
        type: "mcq" as const,
        options: [
          "Conduire des trains",
          "Construire des circuits de trains",
          "Rencontrer des conducteurs de trains",
        ],
        correctAnswer: 2,
        points: 1.5,
      },
      {
        id: "a2-ce4-q3",
        questionText: "Ce lieu est réservé aux personnes âgées.",
        type: "mcq" as const,
        options: ["Vrai", "Faux"],
        correctAnswer: 1,
        points: 1.5,
      },
      {
        id: "a2-ce4-q4",
        questionText: "Qui a aidé Jean Jumel à réaliser son projet ?",
        type: "mcq" as const,
        options: ["La mairie", "Des étudiants", "L'office de tourisme"],
        correctAnswer: 1,
        points: 1.5,
      },
      {
        id: "a2-ce4-q5",
        questionText: "Quel jour pouvez-vous aller dans ce lieu ?",
        type: "mcq" as const,
        options: ["Le lundi", "Le jeudi", "Le dimanche"],
        correctAnswer: 1,
        points: 1.5,
      },
    ],
    totalPoints: 7,
  },
];

// ── Production écrite (25 pts) ──

const PE_EXERCISES = [
  {
    id: "a2-pe-1",
    number: 1,
    title: "Exercice 1 — Raconter un événement",
    instruction: "Hier, vous avez fêté votre anniversaire avec votre famille et vos amis. Vous écrivez un mail à votre ami(e) français(e) pour lui raconter ce que vous avez fait pendant cette journée. Vous lui donnez aussi vos impressions sur la fête. (60 mots minimum)",
    questions: [
      {
        id: "a2-pe1-writing",
        questionText: "Racontez comment se passent les fêtes de famille chez vous et donnez vos impressions.",
        type: "writing" as const,
        points: 12.5,
      },
    ],
    totalPoints: 12.5,
  },
  {
    id: "a2-pe-2",
    number: 2,
    title: "Exercice 2 — Répondre à une invitation",
    instruction: "Vous avez reçu ce faire-part de mariage :\n\n« Ingrid et Julien vous invitent à leur mariage samedi 25 juin à 11h, à la mairie de Neuilly. Après la cérémonie, un repas sera offert au restaurant Le Petit Coq. »\n\nVous envoyez un courriel à vos amis pour les féliciter de leur mariage. Vous acceptez leur invitation et vous dites avec qui vous viendrez. Vous posez quelques questions sur l'organisation. (60 mots minimum)",
    questions: [
      {
        id: "a2-pe2-writing",
        questionText: "Écrivez un courriel pour féliciter vos amis, accepter l'invitation, dire avec qui vous venez et poser des questions sur l'organisation.",
        type: "writing" as const,
        points: 12.5,
      },
    ],
    totalPoints: 12.5,
  },
];

// ── Production orale (25 pts) ──

const PO_EXERCISES = [
  {
    id: "a2-po-1",
    number: 1,
    title: "Exercice 1 — Entretien dirigé (1 min 30)",
    instruction: "Vous vous présentez : vous parlez de vous, de votre famille, de vos amis, de vos études, de vos goûts, etc. L'examinateur peut ensuite vous poser des questions complémentaires. (Sans préparation)",
    questions: [],
    totalPoints: 0,
  },
  {
    id: "a2-po-2",
    number: 2,
    title: "Exercice 2 — Monologue suivi (2 min)",
    instruction: "Vous tirez au sort deux sujets. Vous en choisissez un. Vous vous exprimez sur le sujet. L'examinateur peut ensuite vous poser des questions complémentaires. (Avec 10 minutes de préparation)\n\nExemples de sujets : « Parlez de vos vacances préférées », « Décrivez votre journée habituelle », « Parlez d'un film que vous avez aimé ».",
    questions: [],
    totalPoints: 0,
  },
  {
    id: "a2-po-3",
    number: 3,
    title: "Exercice 3 — Exercice en interaction (3-4 min)",
    instruction: "Vous tirez au sort deux sujets. Vous en choisissez un. Vous simulez un dialogue avec l'examinateur afin de résoudre une situation de la vie quotidienne. Vous montrez que vous êtes capable de saluer et d'utiliser les règles de politesse. (Avec préparation)\n\nExemples : acheter un cadeau dans un magasin, organiser une sortie avec un ami, réserver une chambre d'hôtel.",
    questions: [],
    totalPoints: 0,
  },
];

// ── Full exam ──

export const DELF_A2_EXAM: ExamData = {
  id: "delf-a2-demo",
  level: "A2",
  title: "DELF A2 — Examen complet (simulation)",
  totalPoints: 100,
  totalDuration: "1h40",
  sections: [
    {
      id: "co",
      title: "Comprensión oral",
      titleFr: "Compréhension de l'oral",
      duration: "25 min",
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
      duration: "45 min",
      totalPoints: 25,
      icon: "✍️",
      exercises: PE_EXERCISES,
    },
    {
      id: "po",
      title: "Expresión oral",
      titleFr: "Production orale",
      duration: "6-8 min",
      totalPoints: 25,
      icon: "🗣️",
      exercises: PO_EXERCISES,
    },
  ],
};
