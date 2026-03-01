import type {
  Assessment,
  AssessmentDifficulty,
  AssessmentOption,
  AssessmentQuestion,
  AssessmentSection,
  AssessmentSectionId,
  CEFRLevel,
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
  {
    id: "expressions-tournures",
    title: "Expresiones y giros",
    description: "Expresiones idiomaticas y giros del frances real.",
    order: 4,
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

const questionsA1: AssessmentQuestion[] = [
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
    "Completa: Nous ___ a Malaga.",
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
    "Completa: Elle ___ 20 ans.",
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
    "Completa: Ils ___ en ligne.",
    [
      ["a", "etudies"],
      ["b", "etudions"],
      ["c", "etudient"],
      ["d", "etudie"],
    ],
    "c",
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
    "Completa: Je ne ___ pas francais.",
    [
      ["a", "parles"],
      ["b", "parlons"],
      ["c", "parle"],
      ["d", "parlent"],
    ],
    "c",
  ),
  makeQuestion(
    "a1-q7",
    "gramatica-vocabulario",
    "Completa: Demain, nous ___ au marche.",
    [
      ["a", "allons"],
      ["b", "allez"],
      ["c", "vas"],
      ["d", "vont"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q8",
    "gramatica-vocabulario",
    "Completa: Tu ___ ou?",
    [
      ["a", "habite"],
      ["b", "habites"],
      ["c", "habitons"],
      ["d", "habitez"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q9",
    "comprension-escrita",
    "Lees en una puerta: Entree interdite. Que significa?",
    [
      ["a", "Entrada libre"],
      ["b", "Entrada prohibida"],
      ["c", "Salida obligatoria"],
      ["d", "Puerta cerrada por obras"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q10",
    "comprension-escrita",
    "Email: Rendez-vous lundi a 10h. Cual es la informacion clave?",
    [
      ["a", "La cita es el lunes a las 10:00"],
      ["b", "La cita es el viernes a las 10:00"],
      ["c", "La cita es el lunes a las 12:00"],
      ["d", "No hay cita, solo confirmacion"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q11",
    "comprension-escrita",
    "En un menu: Plat du jour 12 euros. Que indica?",
    [
      ["a", "Postre del dia"],
      ["b", "Menu infantil"],
      ["c", "Plato del dia por 12 euros"],
      ["d", "Bebida incluida"],
    ],
    "c",
  ),
  makeQuestion(
    "a1-q12",
    "comprension-escrita",
    "Anuncio: Cours mardi et jeudi 19h. Cuando son las clases?",
    [
      ["a", "Martes y jueves a las 19:00"],
      ["b", "Lunes y miercoles a las 19:00"],
      ["c", "Martes y jueves a las 17:00"],
      ["d", "Solo jueves a las 19:00"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q13",
    "comprension-escrita",
    "Formulario: Nom / Prenom. Que debes escribir?",
    [
      ["a", "Telefono y direccion"],
      ["b", "Nombre y apellido"],
      ["c", "Pais y ciudad"],
      ["d", "Fecha y firma"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q14",
    "comprension-escrita",
    "Mensaje: Apportez votre passeport. Que te piden?",
    [
      ["a", "Que lleves tu pasaporte"],
      ["b", "Que envies tu pasaporte por correo"],
      ["c", "Que renueves tu pasaporte"],
      ["d", "Que traduzcas tu pasaporte"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q15",
    "comprension-oral",
    "Escuchas: Le train part a 18h30. A que hora sale el tren?",
    [
      ["a", "18:00"],
      ["b", "18:30"],
      ["c", "19:30"],
      ["d", "17:30"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q16",
    "comprension-oral",
    "Escuchas: Tapez 2 pour parler au conseiller. Que debes hacer?",
    [
      ["a", "Marcar 2"],
      ["b", "Colgar"],
      ["c", "Esperar sin pulsar"],
      ["d", "Marcar 5"],
    ],
    "a",
  ),
  makeQuestion(
    "a1-q17",
    "comprension-oral",
    "La profesora dice: Ouvrez le livre page 12. Que pide?",
    [
      ["a", "Cerrar el libro"],
      ["b", "Abrir el libro por la pagina 12"],
      ["c", "Escribir 12 frases"],
      ["d", "Leer la pagina 20"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q18",
    "comprension-oral",
    "Escuchas: Je cherche la station de bus la plus proche. Que busca la persona?",
    [
      ["a", "Una farmacia"],
      ["b", "La estacion de bus mas cercana"],
      ["c", "Un restaurante"],
      ["d", "Una comisaria"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q19",
    "comprension-oral",
    "Escuchas: Le magasin ferme dans dix minutes. Que ocurre?",
    [
      ["a", "La tienda abre en diez minutos"],
      ["b", "La tienda cierra en diez minutos"],
      ["c", "La tienda esta cerrada todo el dia"],
      ["d", "La tienda cambia de direccion"],
    ],
    "b",
  ),
  makeQuestion(
    "a1-q20",
    "comprension-oral",
    "Escuchas: Votre numero est le vingt-quatre. Que te indican?",
    [
      ["a", "Tu mesa es la 24"],
      ["b", "Tu numero de turno es el 24"],
      ["c", "Tu autobus es el 24"],
      ["d", "Tu habitacion es la 42"],
    ],
    "b",
  ),
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

const questionsB2: AssessmentQuestion[] = [
  makeQuestion(
    "b2-q1",
    "gramatica-vocabulario",
    "Completa: Il est essentiel que nous ___ une decision avant vendredi.",
    [
      ["a", "prenons"],
      ["b", "prenions"],
      ["c", "prendrons"],
      ["d", "avons pris"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q2",
    "gramatica-vocabulario",
    "Choisis le connecteur correct: ___ les efforts du gouvernement, le chomage reste eleve.",
    [
      ["a", "Grace a"],
      ["b", "En depit de"],
      ["c", "A cause de"],
      ["d", "Faute de"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q3",
    "comprension-escrita",
    "Extrait de presse: Le rapport souligne que les inegalites se sont accentuees malgre la reprise economique. Quelle est la nuance?",
    [
      ["a", "Les inegalites diminuent grace a la reprise"],
      ["b", "La reprise a aggrave les inegalites"],
      ["c", "Les inegalites persistent malgre une amelioration economique"],
      ["d", "Le rapport nie la reprise economique"],
    ],
    "c",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q4",
    "comprension-oral",
    "Escuchas: Le conferencier affirme que la transition ecologique necessite un changement de paradigme, pas seulement des ajustements techniques. Quel est son argument principal?",
    [
      ["a", "Il faut plus de technologie"],
      ["b", "Un changement profond de mentalite est necessaire"],
      ["c", "Les ajustements techniques suffisent"],
      ["d", "La transition ecologique est impossible"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q5",
    "expressions-tournures",
    "Que signifie l'expression avoir le cafard?",
    [
      ["a", "Avoir peur des insectes"],
      ["b", "Etre deprime, melancolique"],
      ["c", "Etre en colere"],
      ["d", "Avoir faim"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q6",
    "expressions-tournures",
    "Completez avec l'expression correcte: Apres sa promotion, il ne nous parle plus; il a vraiment ___.",
    [
      ["a", "pris la mouche"],
      ["b", "pris la grosse tete"],
      ["c", "mis les pieds dans le plat"],
      ["d", "jete l'eponge"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q7",
    "gramatica-vocabulario",
    "Completez: Bien qu'il ___ tres fatigue, il a termine son travail.",
    [
      ["a", "est"],
      ["b", "soit"],
      ["c", "etait"],
      ["d", "serait"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q8",
    "comprension-escrita",
    "Dans un essai argumentatif B2, quelle formule introduit le mieux une concession?",
    [
      ["a", "En revanche"],
      ["b", "Certes... mais"],
      ["c", "Par consequent"],
      ["d", "En effet"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q9",
    "comprension-oral",
    "Escuchas: La journaliste critique le manque de transparence tout en reconnaissant les avances realisees. Quelle posture adopte-t-elle?",
    [
      ["a", "Totalement negative"],
      ["b", "Nuancee, avec critique et reconnaissance"],
      ["c", "Entierement positive"],
      ["d", "Indifferente"],
    ],
    "b",
    "hard",
    2,
  ),
  makeQuestion(
    "b2-q10",
    "expressions-tournures",
    "Que signifie couper la poire en deux?",
    [
      ["a", "Partager un dessert"],
      ["b", "Trouver un compromis"],
      ["c", "Abandonner un projet"],
      ["d", "Dire la verite"],
    ],
    "b",
    "hard",
    2,
  ),
];

const questionsC1: AssessmentQuestion[] = [
  makeQuestion(
    "c1-q1",
    "gramatica-vocabulario",
    "Completez: ___ les mesures prises, la situation n'a guere evolue, ce qui laisse presager des tensions accrues.",
    [
      ["a", "Nonobstant"],
      ["b", "Neanmoins"],
      ["c", "Toutefois"],
      ["d", "Or"],
    ],
    "a",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q2",
    "comprension-escrita",
    "Extrait litteraire: Dans Les Fleurs du mal, Baudelaire utilise le spleen pour exprimer... Quelle interpretation est la plus juste?",
    [
      ["a", "La joie de vivre parisienne"],
      ["b", "Un ennui existentiel profond et une melancolie moderne"],
      ["c", "La nostalgie de la campagne"],
      ["d", "Un eloge du progres industriel"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q3",
    "expressions-tournures",
    "Dans un registre diplomatique, comment reformuler poliment un desaccord?",
    [
      ["a", "Vous avez tort"],
      ["b", "Je ne partage pas tout a fait cette analyse"],
      ["c", "C'est faux"],
      ["d", "Je suis en desaccord total"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q4",
    "gramatica-vocabulario",
    "Completez: Il eut ete souhaitable que le comite ___ ses conclusions avant la seance pleniere.",
    [
      ["a", "presente"],
      ["b", "presentat"],
      ["c", "presentait"],
      ["d", "presenterait"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q5",
    "comprension-oral",
    "Escuchas: L'intervenant deconstruit l'idee recue selon laquelle la mondialisation profiterait uniformement a tous les pays. Il s'appuie sur des donnees de l'OCDE. Quel est le procede rhetoriquedominant?",
    [
      ["a", "L'anecdote personnelle"],
      ["b", "L'appel a l'autorite institutionnelle avec donnees"],
      ["c", "La metaphore poetique"],
      ["d", "L'ironie"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q6",
    "comprension-escrita",
    "Synthese de documents: Deux textes s'opposent sur le nucleaire. L'un cite la securite energetique, l'autre le risque environnemental. Pour un exercice de synthese DALF C1, vous devez:",
    [
      ["a", "Choisir un camp et argumenter"],
      ["b", "Presenter les deux positions sans donner votre avis"],
      ["c", "Ignorer les contradictions"],
      ["d", "Raconter votre experience personnelle"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q7",
    "expressions-tournures",
    "Que signifie l'expression se mettre martel en tete?",
    [
      ["a", "Se mettre en colere"],
      ["b", "Se faire du souci, s'inquieter excessivement"],
      ["c", "Avoir une idee geniale"],
      ["d", "Prendre une decision rapide"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q8",
    "gramatica-vocabulario",
    "Quel temps est utilise dans: Fut-il arrive plus tot, le resultat aurait ete different?",
    [
      ["a", "Passe simple"],
      ["b", "Subjonctif plus-que-parfait a valeur conditionnelle"],
      ["c", "Conditionnel passe"],
      ["d", "Futur anterieur"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q9",
    "comprension-oral",
    "Escuchas: Le sociologue nuance son propos en affirmant que la precarite ne se reduit pas aux indicateurs economiques mais englobe egalement la fragilite des liens sociaux. Que sous-entend-il?",
    [
      ["a", "La precarite est uniquement financiere"],
      ["b", "La dimension sociale de la precarite est aussi importante que l'economique"],
      ["c", "Les liens sociaux n'ont pas d'importance"],
      ["d", "Les indicateurs economiques sont fiables"],
    ],
    "b",
    "hard",
    3,
  ),
  makeQuestion(
    "c1-q10",
    "comprension-escrita",
    "Dans un texte formel, quelle formule de politesse clot une lettre adressee a un haut fonctionnaire?",
    [
      ["a", "Amicalement"],
      ["b", "Veuillez agreer, Monsieur le Directeur, l'expression de ma haute consideration"],
      ["c", "Cordialement"],
      ["d", "A bientot"],
    ],
    "b",
    "hard",
    3,
  ),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questionsC2: AssessmentQuestion[] = [
  makeQuestion(
    "c2-q1",
    "gramatica-vocabulario",
    "Dans la phrase L'eussions-nous su, nous aurions agi differemment, quel registre et quel temps sont employes?",
    [
      ["a", "Registre courant, conditionnel passe"],
      ["b", "Registre soutenu, subjonctif plus-que-parfait a valeur hypothetique"],
      ["c", "Registre familier, passe compose"],
      ["d", "Registre neutre, futur anterieur"],
    ],
    "b",
    "hard",
    4,
  ),
  makeQuestion(
    "c2-q2",
    "comprension-escrita",
    "Proust ecrit dans Du cote de chez Swann: Le temps perdu est une metaphore de... Quelle lecture stylistique est la plus aboutie?",
    [
      ["a", "Le regret banal du passe"],
      ["b", "La reconstruction de la memoire involontaire comme acte creatif"],
      ["c", "L'oubli definitif"],
      ["d", "Un simple recit autobiographique"],
    ],
    "b",
    "hard",
    4,
  ),
  makeQuestion(
    "c2-q3",
    "expressions-tournures",
    "Quel choix stylistique distingue un texte de registre tres soutenu? Identifiez la phrase C2:",
    [
      ["a", "Il faut qu'on fasse un truc"],
      ["b", "Il conviendrait d'examiner cette question avec toute la rigueur qu'elle requiert"],
      ["c", "On devrait regarder ca de plus pres"],
      ["d", "Faut voir ce qu'on peut faire"],
    ],
    "b",
    "hard",
    4,
  ),
  makeQuestion(
    "c2-q4",
    "comprension-oral",
    "Escuchas: Le philosophe oppose l'ethique de conviction weberienne a l'ethique de responsabilite, arguant que la gouvernance moderne exige une dialectique entre les deux. Que presuppose cette analyse?",
    [
      ["a", "Les deux ethiques sont incompatibles"],
      ["b", "La connaissance des cadres theoriques de Weber et leur application politique actuelle"],
      ["c", "L'ethique de conviction est superieure"],
      ["d", "La gouvernance n'a pas besoin d'ethique"],
    ],
    "b",
    "hard",
    4,
  ),
  makeQuestion(
    "c2-q5",
    "expressions-tournures",
    "Que signifie l'expression C'est un coup d'epee dans l'eau dans un contexte politique?",
    [
      ["a", "Une attaque violente et efficace"],
      ["b", "Une action inutile, sans effet reel"],
      ["c", "Un geste de reconciliation"],
      ["d", "Un discours memorable"],
    ],
    "b",
    "hard",
    4,
  ),
];

const withOralAudio = (questions: AssessmentQuestion[]): AssessmentQuestion[] => {
  return questions.map((question) => {
    if (question.sectionId !== "comprension-oral") {
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
  targetLevel: CEFRLevel,
  durationMinutes: number,
  questions: AssessmentQuestion[],
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
    sections: baseSections,
    questions: withOralAudio(questions),
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
  };
};

const testGeneralQuestions: AssessmentQuestion[] = withOralAudio([
  // 5 from A1 (diverse sections)
  questionsA1[0],  // a1-q1 gramatica
  questionsA1[8],  // a1-q9 comprension-escrita
  questionsA1[14], // a1-q15 comprension-oral
  questionsA1[2],  // a1-q3 gramatica
  questionsA1[11], // a1-q12 comprension-escrita
  // 5 from A2 (diverse sections)
  questionsA2[0],  // a2-q1 gramatica
  questionsA2[3],  // a2-q4 comprension-escrita
  questionsA2[5],  // a2-q6 comprension-oral
  questionsA2[7],  // a2-q8 gramatica
  questionsA2[9],  // a2-q10 comprension-escrita
  // 5 from B1 (diverse sections)
  questionsB1[0],  // b1-q1 gramatica
  questionsB1[2],  // b1-q3 comprension-escrita
  questionsB1[4],  // b1-q5 comprension-oral
  questionsB1[6],  // b1-q7 gramatica
  questionsB1[8],  // b1-q9 comprension-escrita
  // 5 from B2 (diverse sections including expressions-tournures)
  questionsB2[0],  // b2-q1 gramatica
  questionsB2[2],  // b2-q3 comprension-escrita
  questionsB2[3],  // b2-q4 comprension-oral
  questionsB2[4],  // b2-q5 expressions-tournures
  questionsB2[9],  // b2-q10 expressions-tournures
  // 5 from C1 (diverse sections including expressions-tournures)
  questionsC1[0],  // c1-q1 gramatica
  questionsC1[1],  // c1-q2 comprension-escrita
  questionsC1[4],  // c1-q5 comprension-oral
  questionsC1[2],  // c1-q3 expressions-tournures
  questionsC1[6],  // c1-q7 expressions-tournures
]);

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
  makeAssessment(
    "b2-diagnostic",
    "Prueba orientativa B2",
    "Evaluacion avanzada para candidatos que preparan DELF B2.",
    "B2",
    25,
    questionsB2,
  ),
  makeAssessment(
    "c1-diagnostic",
    "Prueba orientativa C1",
    "Evaluacion de nivel avanzado para candidatos que aspiran al DALF C1.",
    "C1",
    30,
    questionsC1,
  ),
  {
    id: "test-general",
    slug: "test-general",
    title: "Test general de nivel",
    description:
      "Evaluacion completa multinivel para determinar tu nivel CEFR de frances.",
    simulationNotice:
      "Simulacion orientativa inspirada en formato oficial. No es un examen oficial FEI.",
    targetLevel: "B1",
    durationMinutes: 40,
    sections: baseSections,
    questions: testGeneralQuestions,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
  },
];

export const assessmentById = new Map(
  assessments.map((assessment) => [assessment.id, assessment]),
);
