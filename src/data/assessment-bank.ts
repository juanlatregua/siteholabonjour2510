import type {
  Assessment,
  AssessmentDifficulty,
  AssessmentOption,
  AssessmentQuestion,
  AssessmentSection,
  AssessmentSectionId,
} from "../lib/assessment/types";

const TIMESTAMP = "2026-02-26T00:00:00.000Z";

const baseSections: AssessmentSection[] = [
  {
    id: "comprension-escrita",
    title: "Comprension escrita",
    description: "Mensajes practicos, formularios y textos breves.",
    order: 1,
  },
  {
    id: "gramatica-vocabulario",
    title: "Gramatica y vocabulario",
    description: "Estructuras utiles para examen y situaciones reales.",
    order: 2,
  },
  {
    id: "comprension-oral",
    title: "Comprension oral simulada",
    description: "Situaciones tipicas de escucha en formato DELF/DALF.",
    order: 3,
  },
];

const makeOptions = (options: Array<[string, string]>): AssessmentOption[] => {
  return options.map(([id, text]) => ({ id, text }));
};

const makeQuestion = (
  id: string,
  sectionId: AssessmentSectionId,
  prompt: string,
  options: Array<[string, string]>,
  correctOptionId: string,
  difficulty: AssessmentDifficulty = "easy",
  points = 1,
): AssessmentQuestion => {
  return {
    id,
    sectionId,
    prompt,
    difficulty,
    points,
    options: makeOptions(options),
    correctOptionId,
  };
};

// ---------------------------------------------------------------------------
// A1 Diagnostic – prueba publica de orientacion
// ---------------------------------------------------------------------------
const questionsA1: AssessmentQuestion[] = [
  // --- Gramatica y vocabulario (8) ---
  makeQuestion(
    "a1-q1",
    "gramatica-vocabulario",
    "Completa: Je ___ espagnol.",
    [
      ["a", "es"],
      ["b", "suis"],
      ["c", "est"],
      ["d", "sommes"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q2",
    "gramatica-vocabulario",
    "Completa: Nous ___ a Paris.",
    [
      ["a", "habite"],
      ["b", "habites"],
      ["c", "habitons"],
      ["d", "habitent"],
    ],
    "c",
  ),
  makeQuestion(
    "a1-q3",
    "gramatica-vocabulario",
    "Completa: Elle ___ 25 ans.",
    [
      ["a", "a"],
      ["b", "as"],
      ["c", "ai"],
      ["d", "ont"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q4",
    "gramatica-vocabulario",
    "Quel est le possessif correct? C'est ___ professeur de francais.",
    [
      ["a", "ma"],
      ["b", "mon"],
      ["c", "mes"],
      ["d", "leur"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q5",
    "gramatica-vocabulario",
    "Completa: Vous ___ un cafe?",
    [
      ["a", "voulez"],
      ["b", "veux"],
      ["c", "veut"],
      ["d", "voulons"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q6",
    "gramatica-vocabulario",
    "Completa: Il habite ___ Lyon.",
    [
      ["a", "en"],
      ["b", "au"],
      ["c", "a"],
      ["d", "dans"],
    ],
    "c",
  ),
  makeQuestion(
    "a1-q7",
    "gramatica-vocabulario",
    "Quel article? Je cherche ___ pharmacie.",
    [
      ["a", "un"],
      ["b", "une"],
      ["c", "le"],
      ["d", "des"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q8",
    "gramatica-vocabulario",
    "Completa: Ils ___ au restaurant ce soir.",
    [
      ["a", "va"],
      ["b", "allez"],
      ["c", "allons"],
      ["d", "vont"],
    ],
    "d",
  ),

  // --- Comprension escrita (6) ---
  makeQuestion(
    "a1-q9",
    "comprension-escrita",
    "Lees esta nota en un comercio: Vendeur/vendeuse. Samedi et dimanche, 10h-18h. Telephonez au 01 42 36 10 10. Es una oferta de...",
    [
      ["a", "Trabajo de fin de semana"],
      ["b", "Curso de formacion"],
      ["c", "Alquiler de local"],
      ["d", "Horarios de apertura"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q10",
    "comprension-escrita",
    "En la carta de un cafe: Petit-dejeuner complet 8 EUR. Croissant + cafe 4,50 EUR. Cuanto cuesta el desayuno completo?",
    [
      ["a", "4,50 euros"],
      ["b", "8 euros"],
      ["c", "12,50 euros"],
      ["d", "No aparece el precio"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q11",
    "comprension-escrita",
    "Cartel: Horaires d'ouverture - Du lundi au vendredi: 9h-17h. Samedi: 9h-12h. Dimanche: ferme. Cuando esta cerrado?",
    [
      ["a", "Los sabados"],
      ["b", "Los domingos"],
      ["c", "Los lunes"],
      ["d", "Nunca cierra"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q12",
    "comprension-escrita",
    "Email de tu profesora: Bonjour, le cours de mardi est annule. Prochain cours jeudi a 16h, salle 3. Cuando es la proxima clase?",
    [
      ["a", "Martes a las 16h"],
      ["b", "Jueves a las 16h"],
      ["c", "Jueves a las 15h"],
      ["d", "Viernes a las 16h"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q13",
    "comprension-escrita",
    "En un formulario pone: Nom / Prenom / Date de naissance / Nationalite. Que informacion te piden?",
    [
      ["a", "Telefono y direccion"],
      ["b", "Apellido, nombre, fecha de nacimiento y nacionalidad"],
      ["c", "Pais y ciudad solamente"],
      ["d", "Correo electronico y contrasena"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q14",
    "comprension-escrita",
    "Lees un mensaje: N'oublie pas demain! Rendez-vous a 9h devant la gare. Apporte ton billet de train. Que debes llevar?",
    [
      ["a", "Tu pasaporte"],
      ["b", "Tu billete de tren"],
      ["c", "Dinero en efectivo"],
      ["d", "Ropa de deporte"],
    ],
    "b",
  ),

  // --- Comprension oral (6) ---
  makeQuestion(
    "a1-q15",
    "comprension-oral",
    "Escuchas: Bonjour, c'est Sophie. On se retrouve samedi a midi au restaurant Le Petit Bistrot. A bientot! Donde es la cita?",
    [
      ["a", "En el cine"],
      ["b", "En el restaurante Le Petit Bistrot"],
      ["c", "En casa de Sophie"],
      ["d", "En la estacion"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q16",
    "comprension-oral",
    "Escuchas: Le train numero 42 a destination de Marseille partira voie 3 dans quinze minutes. Adonde va el tren?",
    [
      ["a", "A Lyon"],
      ["b", "A Marseille"],
      ["c", "A Paris"],
      ["d", "A Nice"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q17",
    "comprension-oral",
    "Escuchas: Mesdames et messieurs, le magasin ferme dans dix minutes. Merci de vous diriger vers les caisses. Que debes hacer?",
    [
      ["a", "Ir a la entrada"],
      ["b", "Esperar en el probador"],
      ["c", "Ir a las cajas"],
      ["d", "Pedir ayuda a un empleado"],
    ],
    "c",
  ),
  makeQuestion(
    "a1-q18",
    "comprension-oral",
    "Escuchas: Pour le cours de demain, apportez votre manuel de francais et un cahier. Que hay que llevar a clase?",
    [
      ["a", "El ordenador y un lapiz"],
      ["b", "El manual de frances y un cuaderno"],
      ["c", "Solo un diccionario"],
      ["d", "Un libro de lectura"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q19",
    "comprension-oral",
    "Escuchas: La boulangerie? Vous allez tout droit, puis vous tournez a gauche. C'est en face de la poste. Donde esta la panaderia?",
    [
      ["a", "A la derecha de la farmacia"],
      ["b", "Enfrente del correo"],
      ["c", "Al lado del supermercado"],
      ["d", "Detras de la estacion"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q20",
    "comprension-oral",
    "Escuchas: Bonjour, votre rendez-vous avec le docteur Dupont est confirme pour jeudi a quatorze heures trente. Cuando es la cita medica?",
    [
      ["a", "Martes a las 14:00"],
      ["b", "Jueves a las 14:30"],
      ["c", "Jueves a las 16:30"],
      ["d", "Viernes a las 14:30"],
    ],
    "b",
  ),
];

// ---------------------------------------------------------------------------
// A1 Simulacro DELF – digitalizacion fiel del sujeto demo oficial FEI
// CO (exercices 1-5) + CE (exercices 1-4)
// ---------------------------------------------------------------------------

const DELF_A1_AUDIO = {
  co1: { src: "/delf/a1/co1-audio.mp3", title: "Exercice 1 – Message telephonique" },
  co2: { src: "/delf/a1/co2-audio.mp3", title: "Exercice 2 – Annonce aeroport" },
  co3: { src: "/delf/a1/co3-audio.mp3", title: "Exercice 3 – Message assistant" },
  co4: { src: "/delf/a1/co4-audio.mp3", title: "Exercice 4 – Dialogues et images" },
  co5: { src: "/delf/a1/co5-audio.mp3", title: "Exercice 5 – Objets mentionnes" },
};

const delfA1Sections: AssessmentSection[] = [
  {
    id: "comprension-oral",
    title: "Comprehension de l'oral",
    description: "Ecoutez les documents audio et repondez aux questions.",
    order: 1,
  },
  {
    id: "comprension-escrita",
    title: "Comprehension des ecrits",
    description: "Lisez les documents et repondez aux questions.",
    order: 2,
  },
];

const questionsA1Simulacro: AssessmentQuestion[] = [
  // === CO – EXERCICE 1 (4 pts) – Message de Solange ===
  { id: "a1s-co1-q1", sectionId: "comprension-oral", prompt: "Exercice 1 – Votre amie Solange laisse un message sur votre repondeur.\n\nSolange vous invite a...", difficulty: "easy", points: 1, options: [{ id: "a", text: "prendre le petit-dejeuner" }, { id: "b", text: "dejeuner" }, { id: "c", text: "diner" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co1 },
  { id: "a1s-co1-q2", sectionId: "comprension-oral", prompt: "Quel jour est le rendez-vous ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Vendredi" }, { id: "b", text: "Samedi" }, { id: "c", text: "Dimanche" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co1 },
  { id: "a1s-co1-q3", sectionId: "comprension-oral", prompt: "A quelle heure est le rendez-vous ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "08:00", image: "/delf/a1/co1-clock-08.png" }, { id: "b", text: "12:00", image: "/delf/a1/co1-clock-12.png" }, { id: "c", text: "20:00", image: "/delf/a1/co1-clock-20.png" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co1 },
  { id: "a1s-co1-q4", sectionId: "comprension-oral", prompt: "Qu'est-ce que vous devez apporter ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Une salade" }, { id: "b", text: "Un gateau" }, { id: "c", text: "Une bouteille de vin" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co1 },

  // === CO – EXERCICE 2 (5 pts) – Annonce aeroport ===
  { id: "a1s-co2-q1", sectionId: "comprension-oral", prompt: "Exercice 2 – Vous entendez une annonce dans un aeroport.\n\nQuel est le numero du vol ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "AF335" }, { id: "b", text: "AR315" }, { id: "c", text: "AS305" }], correctOptionId: "a", audio: DELF_A1_AUDIO.co2 },
  { id: "a1s-co2-q2", sectionId: "comprension-oral", prompt: "L'avion part de...", difficulty: "easy", points: 1, options: [{ id: "a", text: "Lille" }, { id: "b", text: "Nice" }, { id: "c", text: "Paris" }], correctOptionId: "c", audio: DELF_A1_AUDIO.co2 },
  { id: "a1s-co2-q3", sectionId: "comprension-oral", prompt: "A quelle heure est le vol ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "13h30" }, { id: "b", text: "14h30" }, { id: "c", text: "15h30" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co2 },
  { id: "a1s-co2-q4", sectionId: "comprension-oral", prompt: "Ou doivent aller les passagers ?", difficulty: "easy", points: 2, options: [{ id: "a", text: "Porte 12" }, { id: "b", text: "Porte 24" }, { id: "c", text: "Porte 36" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co2 },

  // === CO – EXERCICE 3 (6 pts) – Message assistant ===
  { id: "a1s-co3-q1", sectionId: "comprension-oral", prompt: "Exercice 3 – Votre assistant vous laisse un message.\n\nC'est le programme de la journee de...", difficulty: "easy", points: 1, options: [{ id: "a", text: "lundi" }, { id: "b", text: "mardi" }, { id: "c", text: "mercredi" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co3 },
  { id: "a1s-co3-q2", sectionId: "comprension-oral", prompt: "A 11 h, vous avez rendez-vous...", difficulty: "easy", points: 1, options: [{ id: "a", text: "au bureau" }, { id: "b", text: "chez le dentiste" }, { id: "c", text: "chez Madame Seguin" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co3 },
  { id: "a1s-co3-q3", sectionId: "comprension-oral", prompt: "Ou dejeunez-vous ?", difficulty: "medium", points: 2, options: [{ id: "a", text: "Au bureau" }, { id: "b", text: "Au restaurant" }, { id: "c", text: "A la maison" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co3 },
  { id: "a1s-co3-q4", sectionId: "comprension-oral", prompt: "A quelle heure est votre reunion avec l'entreprise Nysol ?", difficulty: "medium", points: 2, options: [{ id: "a", text: "14h" }, { id: "b", text: "15h" }, { id: "c", text: "16h" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co3 },

  // === CO – EXERCICE 4 (10 pts) – Dialogues et images ===
  { id: "a1s-co4-q1", sectionId: "comprension-oral", prompt: "Exercice 4 – Ecoutez 5 dialogues et associez chaque dialogue a l'image correspondante.\n\nDialogue 1 correspond a quelle image ?", contextImage: "/delf/a1/co4-grid.png", difficulty: "medium", points: 2, options: [{ id: "a", text: "Image A" }, { id: "b", text: "Image B" }, { id: "c", text: "Image C" }, { id: "d", text: "Image D" }, { id: "e", text: "Image E" }, { id: "f", text: "Image F" }], correctOptionId: "e", audio: DELF_A1_AUDIO.co4 },
  { id: "a1s-co4-q2", sectionId: "comprension-oral", prompt: "Dialogue 2 correspond a quelle image ?", contextImage: "/delf/a1/co4-grid.png", difficulty: "medium", points: 2, options: [{ id: "a", text: "Image A" }, { id: "b", text: "Image B" }, { id: "c", text: "Image C" }, { id: "d", text: "Image D" }, { id: "e", text: "Image E" }, { id: "f", text: "Image F" }], correctOptionId: "a", audio: DELF_A1_AUDIO.co4 },
  { id: "a1s-co4-q3", sectionId: "comprension-oral", prompt: "Dialogue 3 correspond a quelle image ?", contextImage: "/delf/a1/co4-grid.png", difficulty: "medium", points: 2, options: [{ id: "a", text: "Image A" }, { id: "b", text: "Image B" }, { id: "c", text: "Image C" }, { id: "d", text: "Image D" }, { id: "e", text: "Image E" }, { id: "f", text: "Image F" }], correctOptionId: "c", audio: DELF_A1_AUDIO.co4 },
  { id: "a1s-co4-q4", sectionId: "comprension-oral", prompt: "Dialogue 4 correspond a quelle image ?", contextImage: "/delf/a1/co4-grid.png", difficulty: "medium", points: 2, options: [{ id: "a", text: "Image A" }, { id: "b", text: "Image B" }, { id: "c", text: "Image C" }, { id: "d", text: "Image D" }, { id: "e", text: "Image E" }, { id: "f", text: "Image F" }], correctOptionId: "f", audio: DELF_A1_AUDIO.co4 },
  { id: "a1s-co4-q5", sectionId: "comprension-oral", prompt: "Dialogue 5 correspond a quelle image ?", contextImage: "/delf/a1/co4-grid.png", difficulty: "medium", points: 2, options: [{ id: "a", text: "Image A" }, { id: "b", text: "Image B" }, { id: "c", text: "Image C" }, { id: "d", text: "Image D" }, { id: "e", text: "Image E" }, { id: "f", text: "Image F" }], correctOptionId: "d", audio: DELF_A1_AUDIO.co4 },

  // === CO – EXERCICE 5 (5 pts) – Objets mentionnes ===
  { id: "a1s-co5-q1", sectionId: "comprension-oral", prompt: "Exercice 5 – Ecoutez le message. Quels objets sont mentionnes ?\n\n1. La serviette de plage", contextImage: "/delf/a1/co5-objects-grid.png", difficulty: "easy", points: 1, options: [{ id: "a", text: "Oui" }, { id: "b", text: "Non" }], correctOptionId: "a", audio: DELF_A1_AUDIO.co5 },
  { id: "a1s-co5-q2", sectionId: "comprension-oral", prompt: "2. Les lunettes de soleil", difficulty: "easy", points: 1, options: [{ id: "a", text: "Oui" }, { id: "b", text: "Non" }], correctOptionId: "a", audio: DELF_A1_AUDIO.co5 },
  { id: "a1s-co5-q3", sectionId: "comprension-oral", prompt: "3. Le telephone portable", difficulty: "easy", points: 1, options: [{ id: "a", text: "Oui" }, { id: "b", text: "Non" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co5 },
  { id: "a1s-co5-q4", sectionId: "comprension-oral", prompt: "4. Le chapeau", difficulty: "easy", points: 1, options: [{ id: "a", text: "Oui" }, { id: "b", text: "Non" }], correctOptionId: "a", audio: DELF_A1_AUDIO.co5 },
  { id: "a1s-co5-q5", sectionId: "comprension-oral", prompt: "5. L'appareil photo", difficulty: "easy", points: 1, options: [{ id: "a", text: "Oui" }, { id: "b", text: "Non" }], correctOptionId: "b", audio: DELF_A1_AUDIO.co5 },

  // === CE – EXERCICE 1 (6 pts) – Annonce garde d'enfants ===
  { id: "a1s-ce1-q1", sectionId: "comprension-escrita", prompt: "Exercice 1 – Vous lisez cette annonce dans un centre commercial :\n\n\"Bonjour, je recherche une personne pour garder mes enfants de 1 et 7 ans. Il faut etre disponible pour travailler les jeudis, vendredis et samedis soirs apres 17 heures. Vous devez habiter dans le centre de Limoges ou avoir une voiture. Tarifs : 45 EUR pour une soiree. Experience avec les enfants souhaitee. Si vous etes interesse, appelez-moi au 06 38 46 27 11. Anna Lemaitre\"\n\nCette annonce concerne quel travail ?", contextImage: "/delf/a1/ce1-jobs-row.png", difficulty: "easy", points: 1, options: [{ id: "a", text: "A – Garde d'enfants" }, { id: "b", text: "B – Serveuse" }, { id: "c", text: "C – Journaliste" }], correctOptionId: "a" },
  { id: "a1s-ce1-q2", sectionId: "comprension-escrita", prompt: "Quel jour devez-vous travailler ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Le lundi" }, { id: "b", text: "Le mercredi" }, { id: "c", text: "Le vendredi" }], correctOptionId: "c" },
  { id: "a1s-ce1-q3", sectionId: "comprension-escrita", prompt: "Il faut etre disponible...", difficulty: "easy", points: 1, options: [{ id: "a", text: "le matin" }, { id: "b", text: "le midi" }, { id: "c", text: "le soir" }], correctOptionId: "c" },
  { id: "a1s-ce1-q4", sectionId: "comprension-escrita", prompt: "Combien est-on paye pour une soiree ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "35 EUR" }, { id: "b", text: "45 EUR" }, { id: "c", text: "55 EUR" }], correctOptionId: "b" },
  { id: "a1s-ce1-q5", sectionId: "comprension-escrita", prompt: "Si vous etes interesse par l'annonce, que devez-vous faire ?", difficulty: "easy", points: 2, options: [{ id: "a", text: "Envoyer un email" }, { id: "b", text: "Telephoner" }, { id: "c", text: "Ecrire une lettre" }], correctOptionId: "b" },

  // === CE – EXERCICE 2 (6 pts) – Bibliotheque municipale ===
  { id: "a1s-ce2-q1", sectionId: "comprension-escrita", prompt: "Exercice 2 – Vous lisez le panneau de la bibliotheque municipale :\n\n\"BIENVENUE A LA BIBLIOTHEQUE MUNICIPALE !\n\n• Au premier etage : les livres pour enfants, les journaux.\n• Au deuxieme etage : les livres pour adultes, une salle de travail, une salle internet et la cafeteria.\n\nPour aller a la salle internet a partir de l'escalier, marchez jusqu'a l'accueil, puis tournez a gauche. La salle internet est la deuxieme salle apres les toilettes, a gauche.\n\nHoraires d'ouverture :\n– du lundi au vendredi : 8 h – 12 h\n– le samedi : 8 h – 19 h\"\n\nLes livres pour enfants sont...", difficulty: "easy", points: 1, options: [{ id: "a", text: "au premier etage, avec les journaux" }, { id: "b", text: "au deuxieme etage, a cote des toilettes" }, { id: "c", text: "au deuxieme etage, derriere la salle internet" }], correctOptionId: "a" },
  { id: "a1s-ce2-q2", sectionId: "comprension-escrita", prompt: "Dans la bibliotheque, il y a...", difficulty: "easy", points: 1, options: [{ id: "a", text: "une cafeteria" }, { id: "b", text: "une salle de cinema" }, { id: "c", text: "une salle de spectacle" }], correctOptionId: "a" },
  { id: "a1s-ce2-q3", sectionId: "comprension-escrita", prompt: "Ou se trouve la salle internet ?", difficulty: "medium", points: 2, options: [{ id: "a", text: "Au premier etage, a droite de l'accueil" }, { id: "b", text: "Au deuxieme etage, a gauche apres les toilettes" }, { id: "c", text: "Au deuxieme etage, a cote de l'accueil" }], correctOptionId: "b" },
  { id: "a1s-ce2-q4", sectionId: "comprension-escrita", prompt: "A quelle heure la bibliotheque ouvre-t-elle le matin ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "7 h" }, { id: "b", text: "8 h" }, { id: "c", text: "9 h" }], correctOptionId: "b" },
  { id: "a1s-ce2-q5", sectionId: "comprension-escrita", prompt: "Quel jour est-ce que la bibliotheque est ouverte l'apres-midi ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Le lundi" }, { id: "b", text: "Le vendredi" }, { id: "c", text: "Le samedi" }], correctOptionId: "c" },

  // === CE – EXERCICE 3 (6 pts) – Petites annonces ===
  { id: "a1s-ce3-q1", sectionId: "comprension-escrita", prompt: "Exercice 3 – Vous lisez les petites annonces dans le journal :\n\n• \"Sport plus\" cherche un vendeur de chaussures a partir d'octobre.\n• Le restaurant \"Bon appetit\" recherche des serveurs pour l'ete (juin - septembre).\n• Medecin recherche une secretaire pour 3 semaines en aout. Tel : 04 44 57 65 00.\n• URGENT ! Jeune homme cherche un professeur de danse pour apprendre la valse avant le mariage, le 30 mai. Tel : 06 89 64 53 20.\n• Le club de football de Briancon recherche un joueur (15-17 ans) du 1er septembre au 30 fevrier. Contacter Michel au 04 92 21 43 28.\n\nQui propose un travail de serveur ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Sport plus" }, { id: "b", text: "Bon appetit" }, { id: "c", text: "Le medecin" }], correctOptionId: "b" },
  { id: "a1s-ce3-q2", sectionId: "comprension-escrita", prompt: "Le docteur offre un travail pour combien de temps ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "2 semaines" }, { id: "b", text: "3 semaines" }, { id: "c", text: "4 semaines" }], correctOptionId: "b" },
  { id: "a1s-ce3-q3", sectionId: "comprension-escrita", prompt: "Quelle est la date du mariage ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Le 20 mai" }, { id: "b", text: "Le 30 mai" }, { id: "c", text: "Le 30 juin" }], correctOptionId: "b" },
  { id: "a1s-ce3-q4", sectionId: "comprension-escrita", prompt: "Quand commence le travail a \"Sport plus\" ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "En septembre" }, { id: "b", text: "En octobre" }, { id: "c", text: "En novembre" }], correctOptionId: "b" },
  { id: "a1s-ce3-q5", sectionId: "comprension-escrita", prompt: "Michel travaille...", difficulty: "medium", points: 2, options: [{ id: "a", text: "dans un restaurant" }, { id: "b", text: "dans un club de sport" }, { id: "c", text: "dans un magasin de chaussures" }], correctOptionId: "b" },

  // === CE – EXERCICE 4 (7 pts) – Que faire a Paris ? ===
  { id: "a1s-ce4-q1", sectionId: "comprension-escrita", prompt: "Exercice 4 – Vous lisez cet article sur le site internet de l'universite :\n\n\"Que faire a Paris ?\n\nS'il fait beau, l'apres-midi vous pouvez aller au jardin du Luxembourg et, le soir vous pouvez faire un tour en bateau jusqu'a la Tour Eiffel.\n\nS'il pleut, allez visiter le musee Carnavalet sur l'Histoire de Paris et finissez la journee avec une piece de theatre a la Comedie-Francaise...\n\nAu restaurant Paris Musical, pres des Champs Elysees, vous pouvez voir des spectacles et manger pour 21 EUR.\n\nReservez vos billets dans le bureau 127 de l'universite du lundi au vendredi (10 h - 18 h).\"\n\nL'apres-midi, s'il y a du soleil, dans l'article on vous conseille...", difficulty: "easy", points: 2, options: [{ id: "a", text: "de visiter un musee" }, { id: "b", text: "d'aller dans un parc" }, { id: "c", text: "de faire un tour de bateau sur la Seine" }], correctOptionId: "b" },
  { id: "a1s-ce4-q2", sectionId: "comprension-escrita", prompt: "Quel musee on vous conseille de visiter s'il pleut ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Le Louvre" }, { id: "b", text: "Le musee Carnavalet" }, { id: "c", text: "Le musee d'Orsay" }], correctOptionId: "b" },
  { id: "a1s-ce4-q3", sectionId: "comprension-escrita", prompt: "Le soir, s'il ne fait pas beau, on vous propose...", contextImage: "/delf/a1/ce4-paris-row.png", difficulty: "easy", points: 1, options: [{ id: "a", text: "A – Aller au theatre" }, { id: "b", text: "B – Faire un tour en bateau" }, { id: "c", text: "C – Visiter un musee" }], correctOptionId: "a" },
  { id: "a1s-ce4-q4", sectionId: "comprension-escrita", prompt: "Le restaurant propose dans l'article est a cote...", difficulty: "easy", points: 2, options: [{ id: "a", text: "de la Tour Eiffel" }, { id: "b", text: "des Champs-Elysees" }, { id: "c", text: "du musee Carnavalet" }], correctOptionId: "b" },
  { id: "a1s-ce4-q5", sectionId: "comprension-escrita", prompt: "Ou pouvez-vous reserver ?", difficulty: "easy", points: 1, options: [{ id: "a", text: "Sur internet" }, { id: "b", text: "Au bureau 127 de l'universite" }, { id: "c", text: "Au restaurant" }], correctOptionId: "b" },
];

const questionsA2: AssessmentQuestion[] = [
  makeQuestion(
    "a2-q1",
    "gramatica-vocabulario",
    "Completa: Hier, nous ___ visite le musee.",
    [
      ["a", "avons"],
      ["b", "sommes"],
      ["c", "etes"],
      ["d", "a"],
    ],
    "a",
    "medium",
  ),
  makeQuestion(
    "a2-q2",
    "gramatica-vocabulario",
    "Completa: Si j'ai le temps, je ___ ce soir.",
    [
      ["a", "viens"],
      ["b", "venu"],
      ["c", "venez"],
      ["d", "viendrais"],
    ],
    "a",
    "medium",
  ),
  makeQuestion(
    "a2-q3",
    "gramatica-vocabulario",
    "Completa: Je vais ___ appeler demain.",
    [
      ["a", "le"],
      ["b", "lui"],
      ["c", "la"],
      ["d", "l'"],
    ],
    "d",
    "medium",
  ),
  makeQuestion(
    "a2-q4",
    "comprension-escrita",
    "Anuncio: Appartement a louer, proche metro, 650 EUR/mois. Que indica?",
    [
      ["a", "Venta de apartamento"],
      ["b", "Alquiler por 650 EUR al mes"],
      ["c", "Hotel cerca del metro"],
      ["d", "Habitacion compartida por semana"],
    ],
    "b",
    "medium",
  ),
  makeQuestion(
    "a2-q5",
    "comprension-escrita",
    "Correo: Nous avons bien recu votre dossier, il manque la copie du passeport. Que falta?",
    [
      ["a", "El certificado de nacimiento"],
      ["b", "El pago de tasas"],
      ["c", "La copia del pasaporte"],
      ["d", "Una foto"],
    ],
    "c",
    "medium",
  ),
  makeQuestion(
    "a2-q6",
    "comprension-oral",
    "Escuchas: Prenez ce medicament apres le repas du soir. Cuando debes tomarlo?",
    [
      ["a", "Antes del desayuno"],
      ["b", "Despues de la cena"],
      ["c", "Al mediodia"],
      ["d", "Antes de dormir sin comer"],
    ],
    "b",
    "medium",
  ),
  makeQuestion(
    "a2-q7",
    "comprension-oral",
    "Escuchas: La reunion est reportee a vendredi a 9h. Que cambia?",
    [
      ["a", "Se cancela la reunion"],
      ["b", "Pasa al viernes a las 9"],
      ["c", "Empieza hoy a las 9"],
      ["d", "Pasa al viernes a las 19"],
    ],
    "b",
    "medium",
  ),
  makeQuestion(
    "a2-q8",
    "gramatica-vocabulario",
    "Completa: Il faut que tu ___ ton dossier aujourd'hui.",
    [
      ["a", "prepare"],
      ["b", "prepares"],
      ["c", "preparer"],
      ["d", "prepares pas"],
    ],
    "b",
    "medium",
  ),
  makeQuestion(
    "a2-q9",
    "gramatica-vocabulario",
    "Completa: Nous avons besoin ___ informations precises.",
    [
      ["a", "a"],
      ["b", "de"],
      ["c", "du"],
      ["d", "des"],
    ],
    "b",
    "medium",
  ),
  makeQuestion(
    "a2-q10",
    "comprension-escrita",
    "En un email formal, cual cierre es el mas adecuado?",
    [
      ["a", "A plus"],
      ["b", "Salut"],
      ["c", "Cordialement"],
      ["d", "Bye"],
    ],
    "c",
    "medium",
  ),
];

const questionsB1: AssessmentQuestion[] = [
  makeQuestion(
    "b1-q1",
    "gramatica-vocabulario",
    "Completa: Quand j'etais petit, je ___ au foot tous les samedis.",
    [
      ["a", "jouais"],
      ["b", "ai joue"],
      ["c", "joue"],
      ["d", "jouerai"],
    ],
    "a",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q2",
    "gramatica-vocabulario",
    "Choisis le connecteur correct: Il pleuvait, ___ nous sommes sortis.",
    [
      ["a", "donc"],
      ["b", "cependant"],
      ["c", "parce que"],
      ["d", "puisque"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q3",
    "comprension-escrita",
    "Articulo: la ciudad limita coches en el centro para reducir contaminacion. Cual es la idea principal?",
    [
      ["a", "Promover compras en coche"],
      ["b", "Reducir trafico y contaminacion"],
      ["c", "Cerrar todo el centro"],
      ["d", "Subir el precio del transporte"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q4",
    "comprension-escrita",
    "Foro: varios usuarios comparan trabajo remoto y presencial. Que postura aparece mas?",
    [
      ["a", "Solo presencial"],
      ["b", "Solo remoto"],
      ["c", "Modelo mixto con ventajas de ambos"],
      ["d", "Ningun cambio posible"],
    ],
    "c",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q5",
    "comprension-oral",
    "Escuchas: Le confierencier souligne trois priorites: budget, calendrier et equipe. Cual NO aparece?",
    [
      ["a", "Budget"],
      ["b", "Calendrier"],
      ["c", "Equipe"],
      ["d", "Marketing digital"],
    ],
    "d",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q6",
    "comprension-oral",
    "Escuchas: Le client est satisfait du resultat mais demande des delais plus courts. Que pide?",
    [
      ["a", "Bajar el precio"],
      ["b", "Reducir plazos"],
      ["c", "Cancelar el proyecto"],
      ["d", "Cambiar de proveedor"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q7",
    "gramatica-vocabulario",
    "Completa: Je ___ savoir si vous etes disponible mardi.",
    [
      ["a", "voudrais"],
      ["b", "veux"],
      ["c", "voudra"],
      ["d", "ai voulu"],
    ],
    "a",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q8",
    "gramatica-vocabulario",
    "Que opcion tiene registro formal?",
    [
      ["a", "Je te tiens au jus"],
      ["b", "Merci d'avance pour votre retour"],
      ["c", "On se capte"],
      ["d", "Ciao"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q9",
    "comprension-escrita",
    "En un texto argumentativo B1, cual estructura es mas apropiada?",
    [
      ["a", "Lista sin orden"],
      ["b", "Introduccion, argumentos, conclusion"],
      ["c", "Solo ejemplos"],
      ["d", "Frases sueltas"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b1-q10",
    "comprension-oral",
    "Escuchas: Le train 602 partira quai 4 avec dix minutes de retard. Que debes retener?",
    [
      ["a", "Tren 620, anden 4, sin retraso"],
      ["b", "Tren 602, anden 4, +10 minutos"],
      ["c", "Tren 602, anden 10, +4 minutos"],
      ["d", "Tren 602 cancelado"],
    ],
    "b",
    "hard",
    2,
  ),
];

const withOralAudio = (questions: AssessmentQuestion[]): AssessmentQuestion[] => {
  return questions.map((question) => {
    if (question.sectionId !== "comprension-oral" || question.audio) {
      return question;
    }

    const transcript = question.prompt.replace(/^Escuchas:\s*/i, "").trim();

    return {
      ...question,
      audio: {
        title: "Audio " + question.id.toUpperCase(),
        transcript,
        ttsText: transcript,
      },
    };
  });
};

const makeAssessment = (
  id: string,
  title: string,
  description: string,
  targetLevel: "A1" | "A2" | "B1",
  durationMinutes: number,
  questions: AssessmentQuestion[],
  sections?: AssessmentSection[],
): Assessment => {
  return {
    id,
    slug: id,
    title,
    description,
    simulationNotice:
      "Simulacion orientativa inspirada en formato oficial. No es un examen oficial FEI.",
    targetLevel,
    durationMinutes,
    sections: sections ?? baseSections,
    questions: withOralAudio(questions),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
  };
};

export const assessments: Assessment[] = [
  makeAssessment(
    "a1-diagnostic",
    "Prueba orientativa A1",
    "Diagnostico inicial para candidatos que empiezan preparacion DELF A1.",
    "A1",
    20,
    questionsA1,
  ),
  makeAssessment(
    "a1-simulacro",
    "Simulacro DELF A1",
    "Prueba completa tipo examen DELF A1 con audio y documentos reales: comprehension de l'oral (5 exercices) + comprehension des ecrits (4 exercices).",
    "A1",
    45,
    questionsA1Simulacro,
    delfA1Sections,
  ),
  makeAssessment(
    "a2-diagnostic",
    "Prueba orientativa A2",
    "Simulacion breve para estimar base A2 antes de planificar el curso.",
    "A2",
    20,
    questionsA2,
  ),
  makeAssessment(
    "b1-diagnostic",
    "Prueba orientativa B1",
    "Evaluacion beta para alumnos que buscan preparar DELF B1/B2.",
    "B1",
    25,
    questionsB1,
  ),
];

export const assessmentById = new Map(
  assessments.map((assessment) => [assessment.id, assessment]),
);
