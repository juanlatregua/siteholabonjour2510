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
  targetLevel: "A1" | "A2" | "B1",
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
];

export const assessmentById = new Map(
  assessments.map((assessment) => [assessment.id, assessment]),
);
