export type PuzzleType = "fill-blank" | "multiple-choice" | "reorder";

export interface Puzzle {
  id: string;
  type: PuzzleType;
  prompt: string;
  promptFr?: string;
  blankAnswer?: string;
  options?: string[];
  correctIdx?: number;
  correctOrder?: string[];
  shuffledOrder?: string[];
  hint?: string;
  explanation: string;
}

export interface DialogLine {
  speaker: string;
  text: string;
  translation: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  descriptionFr: string;
  dialog: DialogLine[];
  puzzles: Puzzle[];
  backgroundEmoji?: string;
}

export interface Scenario {
  title: string;
  slug: string;
  level: "A2" | "B1" | "B2" | "C1";
  description: string;
  estimatedMinutes: number;
  scenes: Scene[];
}

export const scenarios: Scenario[] = [
  // ──────────────────────────────────────────────────
  // 1. "Le Mystere du Cafe Parisien" (A2) - 4 scenes
  // ──────────────────────────────────────────────────
  {
    title: "Le Mystere du Cafe Parisien",
    slug: "le-mystere-du-cafe-parisien",
    level: "A2",
    description:
      "Un estudiante llega a Paris y debe desenvolverse en un cafe parisino. Pide tu cafe, encuentra un objeto perdido y sigue las pistas.",
    estimatedMinutes: 15,
    scenes: [
      {
        id: "cafe-1",
        title: "Bienvenue au cafe",
        description:
          "Acabas de llegar a un cafe parisino. El camarero se acerca.",
        descriptionFr:
          "Vous venez d'arriver dans un cafe parisien. Le serveur s'approche.",
        backgroundEmoji: "\u2615",
        dialog: [
          {
            speaker: "Serveur",
            text: "Bonjour ! Qu'est-ce que vous desirez ?",
            translation: "Buenos dias! Que desea?",
          },
          {
            speaker: "Vous",
            text: "Je voudrais un cafe creme, s'il vous plait.",
            translation: "Quisiera un cafe con leche, por favor.",
          },
          {
            speaker: "Serveur",
            text: "Tres bien. Et avec ca ?",
            translation: "Muy bien. Y con eso?",
          },
        ],
        puzzles: [
          {
            id: "cafe-1-p1",
            type: "multiple-choice",
            prompt: "Como se pide un cafe con leche en frances?",
            options: [
              "Un cafe noir",
              "Un cafe creme",
              "Un the au lait",
              "Un chocolat chaud",
            ],
            correctIdx: 1,
            hint: "Piensa en la palabra para 'crema'",
            explanation:
              "'Un cafe creme' es un cafe con leche. 'Cafe noir' es cafe solo.",
          },
          {
            id: "cafe-1-p2",
            type: "fill-blank",
            prompt: "Completa: 'S'il vous _____' (por favor)",
            blankAnswer: "plait",
            hint: "Es una expresion de cortesia formal",
            explanation:
              "'S'il vous plait' significa 'por favor' en registro formal.",
          },
        ],
      },
      {
        id: "cafe-2",
        title: "L'objet mysterieux",
        description: "Encuentras una nota misteriosa debajo de tu mesa.",
        descriptionFr:
          "Vous trouvez une note mysterieuse sous votre table.",
        backgroundEmoji: "\uD83D\uDD0D",
        dialog: [
          {
            speaker: "Note",
            text: "Cherchez le livre rouge sur l'etagere pres de la fenetre.",
            translation:
              "Busca el libro rojo en la estanteria cerca de la ventana.",
          },
        ],
        puzzles: [
          {
            id: "cafe-2-p1",
            type: "multiple-choice",
            prompt: "Que significa 'etagere'?",
            options: ["Mesa", "Estanteria", "Ventana", "Puerta"],
            correctIdx: 1,
            explanation: "'Etagere' significa estanteria o estante.",
          },
        ],
      },
      {
        id: "cafe-3",
        title: "Le livre rouge",
        description: "Dentro del libro hay un mapa con indicaciones.",
        descriptionFr:
          "Dans le livre, il y a une carte avec des indications.",
        backgroundEmoji: "\uD83D\uDCD5",
        dialog: [
          {
            speaker: "Carte",
            text: "Allez tout droit, puis tournez a gauche.",
            translation: "Vaya todo recto, luego gire a la izquierda.",
          },
        ],
        puzzles: [
          {
            id: "cafe-3-p1",
            type: "reorder",
            prompt: "Ordena las direcciones correctamente:",
            correctOrder: ["Allez", "tout", "droit"],
            shuffledOrder: ["droit", "Allez", "tout"],
            explanation: "'Allez tout droit' = Vaya todo recto.",
          },
        ],
      },
      {
        id: "cafe-4",
        title: "Le tresor",
        description: "Has encontrado el tesoro escondido del cafe!",
        descriptionFr: "Vous avez trouve le tresor cache du cafe !",
        backgroundEmoji: "\uD83C\uDF89",
        dialog: [
          {
            speaker: "Serveur",
            text: "Felicitations ! Vous avez resolu le mystere !",
            translation: "Felicidades! Has resuelto el misterio!",
          },
          {
            speaker: "Serveur",
            text: "Votre cafe est offert par la maison.",
            translation: "Su cafe lo invita la casa.",
          },
        ],
        puzzles: [
          {
            id: "cafe-4-p1",
            type: "multiple-choice",
            prompt: "Que significa 'offert par la maison'?",
            options: [
              "Comprado en casa",
              "Invita la casa",
              "Hecho en casa",
              "Para llevar",
            ],
            correctIdx: 1,
            explanation:
              "'Offert par la maison' es una expresion que significa que el establecimiento invita (no cobra).",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // 2. "Le Tresor du Marche aux Puces" (B1) - 5 scenes
  // ──────────────────────────────────────────────────────
  {
    title: "Le Tresor du Marche aux Puces",
    slug: "le-tresor-du-marche-aux-puces",
    level: "B1",
    description:
      "Explora el mercado de pulgas mas grande de Paris. Negocia precios, descifra pistas y encuentra un tesoro escondido entre los puestos.",
    estimatedMinutes: 20,
    scenes: [
      {
        id: "marche-1",
        title: "L'entree du marche",
        description:
          "Llegas al Marche aux Puces de Saint-Ouen. Un vendedor te llama.",
        descriptionFr:
          "Vous arrivez au Marche aux Puces de Saint-Ouen. Un vendeur vous interpelle.",
        backgroundEmoji: "\uD83D\uDED2",
        dialog: [
          {
            speaker: "Vendeur",
            text: "Approchez, approchez ! J'ai des merveilles a vous montrer !",
            translation:
              "Acerquese, acerquese! Tengo maravillas que mostrarle!",
          },
          {
            speaker: "Vous",
            text: "Bonjour ! Je cherche quelque chose de special.",
            translation: "Buenos dias! Busco algo especial.",
          },
          {
            speaker: "Vendeur",
            text: "Regardez cette vieille boite a musique. Elle date du XIXe siecle.",
            translation:
              "Mire esta vieja caja de musica. Data del siglo XIX.",
          },
        ],
        puzzles: [
          {
            id: "marche-1-p1",
            type: "multiple-choice",
            prompt: "Que significa 'marche aux puces'?",
            options: [
              "Mercado de frutas",
              "Mercado de pulgas",
              "Mercado de flores",
              "Supermercado",
            ],
            correctIdx: 1,
            hint: "'Puces' significa 'pulgas'",
            explanation:
              "Un 'marche aux puces' es un mercado de segunda mano. El nombre viene de la idea de que la ropa usada podia tener pulgas.",
          },
          {
            id: "marche-1-p2",
            type: "fill-blank",
            prompt: "Completa: 'Elle _____ du XIXe siecle' (data de)",
            blankAnswer: "date",
            hint: "Verbo 'dater' conjugado en presente",
            explanation:
              "'Dater de' significa 'datar de' o 'ser de la epoca de'. En presente: elle date.",
          },
        ],
      },
      {
        id: "marche-2",
        title: "La negociation",
        description:
          "La caja de musica cuesta demasiado. Hay que negociar el precio.",
        descriptionFr:
          "La boite a musique coute trop cher. Il faut negocier le prix.",
        backgroundEmoji: "\uD83D\uDCB0",
        dialog: [
          {
            speaker: "Vendeur",
            text: "Cette boite coute cent cinquante euros.",
            translation: "Esta caja cuesta ciento cincuenta euros.",
          },
          {
            speaker: "Vous",
            text: "C'est un peu cher. Vous pourriez faire un geste ?",
            translation:
              "Es un poco caro. Podria hacer un descuento?",
          },
          {
            speaker: "Vendeur",
            text: "Pour vous, je peux la laisser a cent vingt euros. C'est mon dernier prix.",
            translation:
              "Para usted, puedo dejarla en ciento veinte euros. Es mi ultimo precio.",
          },
        ],
        puzzles: [
          {
            id: "marche-2-p1",
            type: "multiple-choice",
            prompt: "Que expresion se usa para pedir un descuento de forma educada?",
            options: [
              "C'est gratuit ?",
              "Vous pourriez faire un geste ?",
              "Je ne veux pas payer",
              "C'est trop !",
            ],
            correctIdx: 1,
            explanation:
              "'Faire un geste' es la forma educada de pedir un descuento en Francia. Literalmente significa 'hacer un gesto'.",
          },
          {
            id: "marche-2-p2",
            type: "reorder",
            prompt: "Ordena la frase: 'Es mi ultimo precio'",
            correctOrder: ["C'est", "mon", "dernier", "prix"],
            shuffledOrder: ["prix", "C'est", "dernier", "mon"],
            explanation:
              "'C'est mon dernier prix' sigue el orden sujeto + posesivo + adjetivo + sustantivo.",
          },
        ],
      },
      {
        id: "marche-3",
        title: "Le secret de la boite",
        description:
          "Al abrir la caja, encuentras un compartimiento secreto con un mensaje.",
        descriptionFr:
          "En ouvrant la boite, vous trouvez un compartiment secret avec un message.",
        backgroundEmoji: "\uD83D\uDD10",
        dialog: [
          {
            speaker: "Message",
            text: "Pour trouver le tresor, allez au stand numero sept. Demandez la pendule ancienne.",
            translation:
              "Para encontrar el tesoro, vayan al puesto numero siete. Pregunten por el reloj antiguo.",
          },
          {
            speaker: "Vous",
            text: "Un compartiment secret ! C'est incroyable !",
            translation: "Un compartimento secreto! Es increible!",
          },
        ],
        puzzles: [
          {
            id: "marche-3-p1",
            type: "fill-blank",
            prompt: "Completa: 'Pour _____ le tresor' (encontrar)",
            blankAnswer: "trouver",
            hint: "Infinitivo del verbo 'encontrar'",
            explanation:
              "'Trouver' es el infinitivo de 'encontrar'. Despues de 'pour' siempre se usa el infinitivo.",
          },
          {
            id: "marche-3-p2",
            type: "multiple-choice",
            prompt: "Que significa 'une pendule'?",
            options: [
              "Un pendiente",
              "Un reloj de pared/mesa",
              "Un pendulo de Foucault",
              "Una lampara",
            ],
            correctIdx: 1,
            explanation:
              "'Une pendule' es un reloj (de pared o de mesa). Atencion: 'un pendule' (masculino) es un pendulo.",
          },
        ],
      },
      {
        id: "marche-4",
        title: "Le stand numero sept",
        description:
          "Llegas al puesto siete. Una anciana misteriosa te recibe.",
        descriptionFr:
          "Vous arrivez au stand numero sept. Une vieille dame mysterieuse vous accueille.",
        backgroundEmoji: "\uD83D\uDD70\uFE0F",
        dialog: [
          {
            speaker: "Dame",
            text: "Vous cherchez la pendule ancienne, n'est-ce pas ? J'attendais quelqu'un comme vous.",
            translation:
              "Busca el reloj antiguo, verdad? Esperaba a alguien como usted.",
          },
          {
            speaker: "Vous",
            text: "Oui, on m'a dit de vous demander. Pouvez-vous m'aider ?",
            translation:
              "Si, me dijeron que le preguntara. Puede ayudarme?",
          },
          {
            speaker: "Dame",
            text: "Bien sur, mais d'abord, montrez-moi que vous connaissez le mot de passe.",
            translation:
              "Claro, pero primero, muestreme que conoce la contrasena.",
          },
        ],
        puzzles: [
          {
            id: "marche-4-p1",
            type: "multiple-choice",
            prompt: "Que significa 'n'est-ce pas' al final de una frase?",
            options: [
              "No es posible",
              "Verdad? / No es asi?",
              "No me diga",
              "Por supuesto",
            ],
            correctIdx: 1,
            explanation:
              "'N'est-ce pas ?' es una coletilla interrogativa que se anade al final de una frase para pedir confirmacion, equivale a 'verdad?' o 'no?'.",
          },
          {
            id: "marche-4-p2",
            type: "fill-blank",
            prompt: "Completa: 'Pouvez-vous m'_____ ?' (ayudarme)",
            blankAnswer: "aider",
            hint: "El verbo en infinitivo que significa 'ayudar'",
            explanation:
              "'Aider' significa 'ayudar'. Con los verbos modales como 'pouvoir', el segundo verbo va en infinitivo.",
          },
        ],
      },
      {
        id: "marche-5",
        title: "Le tresor revele",
        description:
          "La anciana te entrega el reloj antiguo. Dentro hay una sorpresa.",
        descriptionFr:
          "La vieille dame vous remet la pendule ancienne. A l'interieur, il y a une surprise.",
        backgroundEmoji: "\u2728",
        dialog: [
          {
            speaker: "Dame",
            text: "Voila la pendule. A l'interieur, vous trouverez un petit tableau. C'est une oeuvre originale de Montmartre.",
            translation:
              "Aqui tiene el reloj. Dentro encontrara un pequeno cuadro. Es una obra original de Montmartre.",
          },
          {
            speaker: "Vous",
            text: "C'est magnifique ! Merci beaucoup, madame !",
            translation: "Es magnifico! Muchas gracias, senora!",
          },
          {
            speaker: "Dame",
            text: "Le vrai tresor, c'est l'aventure que vous avez vecue. Bonne continuation !",
            translation:
              "El verdadero tesoro es la aventura que ha vivido. Que le vaya bien!",
          },
        ],
        puzzles: [
          {
            id: "marche-5-p1",
            type: "reorder",
            prompt: "Ordena: 'El verdadero tesoro es la aventura'",
            correctOrder: ["Le", "vrai", "tresor", "c'est", "l'aventure"],
            shuffledOrder: ["c'est", "Le", "l'aventure", "tresor", "vrai"],
            explanation:
              "'Le vrai tresor, c'est l'aventure' - En frances, el adjetivo 'vrai' va antes del sustantivo.",
          },
          {
            id: "marche-5-p2",
            type: "multiple-choice",
            prompt: "Que significa 'Bonne continuation'?",
            options: [
              "Buena continuacion (en un libro)",
              "Que le vaya bien / Buena suerte",
              "Siga todo recto",
              "Continue comprando",
            ],
            correctIdx: 1,
            explanation:
              "'Bonne continuation' es una expresion de despedida que desea buena suerte en lo que sigue.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. "L'Enigme du Musee" (B2) - 5 scenes
  // ──────────────────────────────────────────────
  {
    title: "L'Enigme du Musee",
    slug: "l-enigme-du-musee",
    level: "B2",
    description:
      "Una noche en el museo del Louvre. Resuelve acertijos linguisticos para descubrir el misterio detras de un cuadro desaparecido.",
    estimatedMinutes: 25,
    scenes: [
      {
        id: "musee-1",
        title: "La nuit au musee",
        description:
          "Eres un vigilante nocturno en el Louvre. Algo extrano ocurre.",
        descriptionFr:
          "Vous etes gardien de nuit au Louvre. Quelque chose d'etrange se passe.",
        backgroundEmoji: "\uD83C\uDFDB\uFE0F",
        dialog: [
          {
            speaker: "Radio",
            text: "Attention, gardien ! Le tableau dans la salle 7 a disparu. Verifiez immediatement.",
            translation:
              "Atencion, vigilante! El cuadro de la sala 7 ha desaparecido. Verifique inmediatamente.",
          },
          {
            speaker: "Vous",
            text: "Compris. J'y vais tout de suite. Y a-t-il des indices sur place ?",
            translation:
              "Entendido. Voy enseguida. Hay indicios en el lugar?",
          },
          {
            speaker: "Radio",
            text: "On a retrouve une enveloppe cachetee sur le mur. Ne touchez a rien d'autre.",
            translation:
              "Se ha encontrado un sobre sellado en la pared. No toque nada mas.",
          },
        ],
        puzzles: [
          {
            id: "musee-1-p1",
            type: "multiple-choice",
            prompt: "Que significa 'Le tableau a disparu'?",
            options: [
              "El cuadro ha sido vendido",
              "El cuadro ha desaparecido",
              "El cuadro ha sido restaurado",
              "El cuadro ha sido trasladado",
            ],
            correctIdx: 1,
            hint: "El verbo 'disparaitre' en passe compose",
            explanation:
              "'Disparaitre' (desaparecer) forma su passe compose con 'avoir': il a disparu = ha desaparecido.",
          },
          {
            id: "musee-1-p2",
            type: "fill-blank",
            prompt: "Completa: 'Ne touchez _____ rien d'autre' (no toque nada mas)",
            blankAnswer: "a",
            hint: "Es una preposicion de una sola letra",
            explanation:
              "'Toucher a quelque chose' requiere la preposicion 'a'. 'Ne touchez a rien' = no toque nada.",
          },
        ],
      },
      {
        id: "musee-2",
        title: "L'enveloppe mysterieuse",
        description:
          "Abres el sobre y encuentras un acertijo escrito en verso.",
        descriptionFr:
          "Vous ouvrez l'enveloppe et trouvez une enigme ecrite en vers.",
        backgroundEmoji: "\u2709\uFE0F",
        dialog: [
          {
            speaker: "Lettre",
            text: "Je suis ce que je suis, mais je ne suis pas ce que je suis. Si j'etais ce que je suis, je ne serais pas ce que je suis.",
            translation:
              "Soy lo que soy, pero no soy lo que soy. Si fuera lo que soy, no seria lo que soy.",
          },
          {
            speaker: "Vous",
            text: "C'est un jeu de mots avec le verbe 'suivre' et le verbe 'etre'. Celui qui a ecrit ceci est malin.",
            translation:
              "Es un juego de palabras con el verbo 'seguir' y el verbo 'ser'. Quien escribio esto es astuto.",
          },
        ],
        puzzles: [
          {
            id: "musee-2-p1",
            type: "multiple-choice",
            prompt: "En frances, 'je suis' puede significar dos cosas diferentes. Cuales?",
            options: [
              "'Yo soy' y 'yo sigo'",
              "'Yo soy' y 'yo se'",
              "'Yo tengo' y 'yo sigo'",
              "'Yo soy' y 'yo puedo'",
            ],
            correctIdx: 0,
            explanation:
              "'Je suis' es la primera persona de 'etre' (ser/estar) y tambien de 'suivre' (seguir). Esta ambiguedad es clasica en los acertijos franceses.",
          },
          {
            id: "musee-2-p2",
            type: "fill-blank",
            prompt: "Completa el condicional: 'Si j'etais ce que je suis, je ne _____ pas' (seria)",
            blankAnswer: "serais",
            hint: "Condicional presente del verbo 'etre', primera persona",
            explanation:
              "El condicional de 'etre': je serais, tu serais, il serait... Se forma con la raiz 'ser-' + terminaciones del imperfecto.",
          },
        ],
      },
      {
        id: "musee-3",
        title: "La salle des sculptures",
        description:
          "El acertijo te lleva a la sala de esculturas griegas.",
        descriptionFr:
          "L'enigme vous mene a la salle des sculptures grecques.",
        backgroundEmoji: "\uD83C\uDFDB\uFE0F",
        dialog: [
          {
            speaker: "Vous",
            text: "D'apres l'enigme, le prochain indice devrait se trouver pres de la Venus de Milo.",
            translation:
              "Segun el acertijo, la siguiente pista deberia estar cerca de la Venus de Milo.",
          },
          {
            speaker: "Collegue",
            text: "Attends, regarde ! Il y a quelque chose de grave sur le socle. On dirait un message code.",
            translation:
              "Espera, mira! Hay algo grabado en el pedestal. Parece un mensaje cifrado.",
          },
          {
            speaker: "Vous",
            text: "C'est du latin melange avec du francais ancien. Il faudrait que je le dechiffre.",
            translation:
              "Es latin mezclado con frances antiguo. Habria que descifrarlo.",
          },
        ],
        puzzles: [
          {
            id: "musee-3-p1",
            type: "multiple-choice",
            prompt: "Que expresa 'Il faudrait que je le dechiffre'?",
            options: [
              "Una obligacion pasada",
              "Una necesidad con matiz de hipotesis / cortesia",
              "Una certeza absoluta",
              "Una prohibicion",
            ],
            correctIdx: 1,
            explanation:
              "'Il faudrait que' + subjuntivo expresa una necesidad atenuada, con matiz de hipotesis o cortesia. Es menos directo que 'il faut que'.",
          },
          {
            id: "musee-3-p2",
            type: "reorder",
            prompt: "Ordena: 'Segun el acertijo, la pista deberia estar aqui'",
            correctOrder: ["D'apres", "l'enigme", "l'indice", "devrait", "etre", "ici"],
            shuffledOrder: ["devrait", "l'enigme", "ici", "D'apres", "etre", "l'indice"],
            explanation:
              "'D'apres l'enigme, l'indice devrait etre ici' - 'D'apres' introduce la fuente de informacion y 'devrait' es el condicional de 'devoir'.",
          },
        ],
      },
      {
        id: "musee-4",
        title: "Le code dechiffre",
        description:
          "El mensaje descifrado revela una sala secreta del museo.",
        descriptionFr:
          "Le message dechiffre revele une salle secrete du musee.",
        backgroundEmoji: "\uD83D\uDDDD\uFE0F",
        dialog: [
          {
            speaker: "Vous",
            text: "Le message dit : 'Derriere le miroir du roi, la verite se cache.' Il doit s'agir de la Galerie des Glaces !",
            translation:
              "El mensaje dice: 'Detras del espejo del rey, la verdad se esconde.' Debe tratarse de la Galeria de los Espejos!",
          },
          {
            speaker: "Collegue",
            text: "Mais la Galerie des Glaces est a Versailles, pas au Louvre. A moins qu'il ne s'agisse d'un miroir dans les appartements de Napoleon III.",
            translation:
              "Pero la Galeria de los Espejos esta en Versalles, no en el Louvre. A menos que se trate de un espejo en los apartamentos de Napoleon III.",
          },
        ],
        puzzles: [
          {
            id: "musee-4-p1",
            type: "fill-blank",
            prompt: "Completa: 'A moins qu'il ne s'_____ d'un miroir' (se trate de)",
            blankAnswer: "agisse",
            hint: "Subjuntivo presente de 's'agir'",
            explanation:
              "'A moins que' siempre va seguido de subjuntivo y del 'ne' expletivo. S'agir en subjuntivo: qu'il s'agisse.",
          },
          {
            id: "musee-4-p2",
            type: "multiple-choice",
            prompt: "Por que se usa el subjuntivo despues de 'a moins que'?",
            options: [
              "Porque expresa una certeza",
              "Porque expresa una condicion incierta / restriccion",
              "Porque es una frase interrogativa",
              "Porque el sujeto es impersonal",
            ],
            correctIdx: 1,
            explanation:
              "'A moins que' (a menos que) introduce una condicion restrictiva e incierta, lo que exige siempre el subjuntivo en frances.",
          },
        ],
      },
      {
        id: "musee-5",
        title: "La resolution du mystere",
        description:
          "Detras del espejo encuentras el cuadro y una carta del artista.",
        descriptionFr:
          "Derriere le miroir, vous trouvez le tableau et une lettre de l'artiste.",
        backgroundEmoji: "\uD83C\uDF1F",
        dialog: [
          {
            speaker: "Lettre",
            text: "Cher gardien, si vous lisez cette lettre, c'est que vous etes digne de comprendre l'art. Ce tableau n'avait pas ete vole; il avait ete mis a l'abri pour le proteger.",
            translation:
              "Querido vigilante, si lee esta carta, es que es digno de comprender el arte. Este cuadro no habia sido robado; habia sido resguardado para protegerlo.",
          },
          {
            speaker: "Vous",
            text: "Le mystere est resolu ! Le tableau etait protege, pas vole. Quelle aventure !",
            translation:
              "El misterio esta resuelto! El cuadro estaba protegido, no robado. Que aventura!",
          },
          {
            speaker: "Radio",
            text: "Excellent travail, gardien ! Vous avez fait preuve d'une grande perspicacite.",
            translation:
              "Excelente trabajo, vigilante! Ha demostrado gran perspicacia.",
          },
        ],
        puzzles: [
          {
            id: "musee-5-p1",
            type: "multiple-choice",
            prompt: "Que tiempo verbal es 'il avait ete vole'?",
            options: [
              "Passe compose pasivo",
              "Plus-que-parfait pasivo",
              "Imparfait pasivo",
              "Futur anterieur pasivo",
            ],
            correctIdx: 1,
            explanation:
              "'Il avait ete vole' es el plus-que-parfait de la voz pasiva: auxiliar avoir en imparfait (avait) + ete + participio pasado (vole). Expresa una accion anterior a otra accion pasada.",
          },
          {
            id: "musee-5-p2",
            type: "reorder",
            prompt: "Ordena: 'Ha demostrado gran perspicacia'",
            correctOrder: ["Vous", "avez", "fait", "preuve", "de", "perspicacite"],
            shuffledOrder: ["fait", "de", "Vous", "perspicacite", "preuve", "avez"],
            explanation:
              "'Faire preuve de' es una expresion verbal que significa 'demostrar' o 'dar prueba de'.",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. "Le Code du Chef" (C1) - 6 scenes
  // ──────────────────────────────────────────────
  {
    title: "Le Code du Chef",
    slug: "le-code-du-chef",
    level: "C1",
    description:
      "En la cocina de un restaurante con estrella Michelin, un chef legendario ha dejado su receta secreta cifrada. Descifra el codigo culinario y linguistico para dominar la haute cuisine.",
    estimatedMinutes: 30,
    scenes: [
      {
        id: "chef-1",
        title: "L'arrivee au restaurant",
        description:
          "Llegas al restaurante 'Le Jardin des Saveurs'. El sous-chef te recibe.",
        descriptionFr:
          "Vous arrivez au restaurant 'Le Jardin des Saveurs'. Le sous-chef vous accueille.",
        backgroundEmoji: "\uD83C\uDF7D\uFE0F",
        dialog: [
          {
            speaker: "Sous-chef",
            text: "Bienvenue. Le Chef Moreau nous a legue son carnet de recettes, mais il est redige dans un code que personne n'a reussi a dechiffrer depuis sa disparition.",
            translation:
              "Bienvenido. El Chef Moreau nos lego su cuaderno de recetas, pero esta redactado en un codigo que nadie ha logrado descifrar desde su desaparicion.",
          },
          {
            speaker: "Vous",
            text: "Je suis pret a relever le defi. Par ou faut-il commencer ?",
            translation:
              "Estoy listo para aceptar el desafio. Por donde hay que empezar?",
          },
          {
            speaker: "Sous-chef",
            text: "Par la premiere page du carnet. Il y est ecrit : 'Quiconque saura manier les mots comme les saveurs trouvera la cle.'",
            translation:
              "Por la primera pagina del cuaderno. Ahi esta escrito: 'Quien sepa manejar las palabras como los sabores encontrara la clave.'",
          },
        ],
        puzzles: [
          {
            id: "chef-1-p1",
            type: "multiple-choice",
            prompt: "Que registro linguistico utiliza la frase 'Quiconque saura manier les mots...'?",
            options: [
              "Registro coloquial (familier)",
              "Registro estandar (courant)",
              "Registro formal / literario (soutenu)",
              "Registro vulgar (vulgaire)",
            ],
            correctIdx: 2,
            explanation:
              "'Quiconque' es un pronombre indefinido del registro sostenido/literario. En registro estandar se diria 'Celui qui' o 'Toute personne qui'.",
          },
          {
            id: "chef-1-p2",
            type: "fill-blank",
            prompt: "Completa: 'Il y _____ ecrit' (esta escrito ahi)",
            blankAnswer: "est",
            hint: "Forma impersonal con 'il y'",
            explanation:
              "'Il y est ecrit' es una construccion impersonal donde 'y' reemplaza un complemento de lugar (en la pagina). 'Il est ecrit' = esta escrito.",
          },
        ],
      },
      {
        id: "chef-2",
        title: "La premiere enigme culinaire",
        description:
          "La primera pagina contiene una receta codificada con juegos de palabras.",
        descriptionFr:
          "La premiere page contient une recette codee avec des jeux de mots.",
        backgroundEmoji: "\uD83D\uDCD6",
        dialog: [
          {
            speaker: "Carnet",
            text: "Prenez le coeur de la terre, faites-le suer sans qu'il ne verse une larme, puis noyez-le dans l'or liquide de Provence.",
            translation:
              "Tomen el corazon de la tierra, haganlo sudar sin que derrame una lagrima, luego ahogenlo en el oro liquido de Provenza.",
          },
          {
            speaker: "Vous",
            text: "Le coeur de la terre... ce doit etre un legume racine. 'Suer sans larme'... un oignon qu'on fait revenir sans pleurer ?",
            translation:
              "El corazon de la tierra... debe ser una verdura de raiz. 'Sudar sin lagrima'... una cebolla que se sofrie sin llorar?",
          },
          {
            speaker: "Sous-chef",
            text: "Et l'or liquide de Provence, c'est l'huile d'olive bien entendu ! Vous commencez a saisir le code du Chef.",
            translation:
              "Y el oro liquido de Provenza es el aceite de oliva, por supuesto! Esta empezando a captar el codigo del Chef.",
          },
        ],
        puzzles: [
          {
            id: "chef-2-p1",
            type: "multiple-choice",
            prompt: "Que figura retorica emplea el Chef al decir 'l'or liquide de Provence'?",
            options: [
              "Una comparacion (comparaison)",
              "Una metafora (metaphore)",
              "Una metonimia (metonymie)",
              "Una hiperbole (hyperbole)",
            ],
            correctIdx: 1,
            hint: "No usa 'comme' ni ningun nexo comparativo",
            explanation:
              "Es una metafora: identifica directamente el aceite de oliva con 'oro liquido' sin usar un nexo comparativo. Si dijera 'comme de l'or', seria una comparacion.",
          },
          {
            id: "chef-2-p2",
            type: "fill-blank",
            prompt: "Completa: 'Faites-le suer sans qu'il ne _____ une larme' (derrame, subjuntivo)",
            blankAnswer: "verse",
            hint: "Subjuntivo presente de 'verser', tercera persona",
            explanation:
              "'Sans que' exige siempre el subjuntivo en frances. 'Verser' (derramar/verter) en subjuntivo: qu'il verse.",
          },
        ],
      },
      {
        id: "chef-3",
        title: "Les herbes du jardin secret",
        description:
          "El cuaderno te guia al jardin de hierbas aromaticas del Chef.",
        descriptionFr:
          "Le carnet vous guide vers le jardin d'herbes aromatiques du Chef.",
        backgroundEmoji: "\uD83C\uDF3F",
        dialog: [
          {
            speaker: "Carnet",
            text: "Au jardin, cueillez ce qui parfume sans se voir, ce qui guerit sans ordonner, et ce qui releve sans elever.",
            translation:
              "En el jardin, recojan lo que perfuma sin verse, lo que cura sin recetar, y lo que realza sin elevar.",
          },
          {
            speaker: "Sous-chef",
            text: "Le Chef adorait les doubles sens. 'Relever' signifie a la fois 'realzar le gout' et 'levantar'. C'est de la polysemie pure.",
            translation:
              "Al Chef le encantaban los dobles sentidos. 'Relever' significa a la vez 'realzar el sabor' y 'levantar'. Es polisemia pura.",
          },
          {
            speaker: "Vous",
            text: "Le thym, le romarin et le basilic - ils relevent les plats sans les transformer completement.",
            translation:
              "El tomillo, el romero y la albahaca - realzan los platos sin transformarlos completamente.",
          },
        ],
        puzzles: [
          {
            id: "chef-3-p1",
            type: "multiple-choice",
            prompt: "Que significa la polisemia del verbo 'relever' en contexto culinario?",
            options: [
              "Solo 'levantar' fisicamente",
              "Solo 'anotar' o 'registrar'",
              "'Realzar' el sabor de un plato / dar mas caracter",
              "'Reemplazar' un ingrediente",
            ],
            correctIdx: 2,
            explanation:
              "En cocina, 'relever' significa realzar o dar mas caracter a un plato. Es uno de los multiples sentidos de este verbo polisemico.",
          },
          {
            id: "chef-3-p2",
            type: "reorder",
            prompt: "Ordena: 'Recojan lo que perfuma sin verse'",
            correctOrder: ["Cueillez", "ce", "qui", "parfume", "sans", "se", "voir"],
            shuffledOrder: ["sans", "qui", "Cueillez", "voir", "ce", "se", "parfume"],
            explanation:
              "'Cueillez ce qui parfume sans se voir' - 'Ce qui' introduce una relativa sin antecedente (lo que), y 'sans' + infinitivo forma una proposicion circunstancial.",
          },
        ],
      },
      {
        id: "chef-4",
        title: "La sauce secrete",
        description:
          "El cuaderno revela la receta de la salsa legendaria del Chef Moreau.",
        descriptionFr:
          "Le carnet revele la recette de la sauce legendaire du Chef Moreau.",
        backgroundEmoji: "\uD83E\uDD58",
        dialog: [
          {
            speaker: "Carnet",
            text: "La sauce qui fait ma renommee n'est autre que celle qu'on obtient en ayant fait reduire l'essence meme du terroir, a condition qu'on y ait ajoute une pointe d'audace.",
            translation:
              "La salsa que hace mi renombre no es otra que la que se obtiene habiendo reducido la esencia misma del terrueno, a condicion de haberle anadido un toque de audacia.",
          },
          {
            speaker: "Vous",
            text: "C'est une reduction de fond de veau avec des herbes locales, n'est-ce pas ? L'audace, ce doit etre une epice inattendue.",
            translation:
              "Es una reduccion de fondo de ternera con hierbas locales, verdad? La audacia debe ser una especia inesperada.",
          },
          {
            speaker: "Sous-chef",
            text: "Bravo ! Le Chef ajoutait toujours une pincee de safran et de piment d'Espelette - son secret le plus jalousement garde.",
            translation:
              "Bravo! El Chef anadaia siempre una pizca de azafran y de pimiento de Espelette - su secreto mas celosamente guardado.",
          },
        ],
        puzzles: [
          {
            id: "chef-4-p1",
            type: "fill-blank",
            prompt: "Completa: 'A condition qu'on y _____ ajoute' (haya anadido, subjuntivo pasado)",
            blankAnswer: "ait",
            hint: "Auxiliar 'avoir' en subjuntivo presente, tercera persona",
            explanation:
              "El subjonctif passe se forma con el subjuntivo presente del auxiliar + participio pasado. Avoir en subjuntivo: que j'aie, que tu aies, qu'il ait.",
          },
          {
            id: "chef-4-p2",
            type: "multiple-choice",
            prompt: "Por que se usa el subjuntivo despues de 'a condition que'?",
            options: [
              "Porque expresa una realidad comprobada",
              "Porque introduce una condicion/requisito no garantizado",
              "Porque es una frase negativa",
              "Porque el sujeto es 'on'",
            ],
            correctIdx: 1,
            explanation:
              "'A condition que' (a condicion de que) introduce una condicion cuyo cumplimiento no esta garantizado, lo que requiere el subjuntivo. Equivale a 'siempre que' o 'con tal de que'.",
          },
        ],
      },
      {
        id: "chef-5",
        title: "Le dessert impossible",
        description:
          "La ultima receta es un postre que parece imposible de realizar.",
        descriptionFr:
          "La derniere recette est un dessert qui semble impossible a realiser.",
        backgroundEmoji: "\uD83C\uDF70",
        dialog: [
          {
            speaker: "Carnet",
            text: "Pour le dessert ultime, il eut fallu que l'on sut marier le feu et la glace, que l'amer devint doux et que le silence eut parle.",
            translation:
              "Para el postre definitivo, hubiera sido necesario que se supiera casar el fuego y el hielo, que lo amargo se volviera dulce y que el silencio hubiera hablado.",
          },
          {
            speaker: "Vous",
            text: "Le subjonctif imparfait et le subjonctif plus-que-parfait ! Le Chef ecrivait dans un registre extremement soutenu.",
            translation:
              "El subjuntivo imperfecto y el pluscuamperfecto de subjuntivo! El Chef escribia en un registro extremadamente elevado.",
          },
          {
            speaker: "Sous-chef",
            text: "C'est un baked Alaska - un dessert flambe a l'exterieur et glace a l'interieur. Le chocolat noir qui devient creme onctueuse. Genial !",
            translation:
              "Es un Alaska flambeado - un postre llameante por fuera y helado por dentro. El chocolate negro que se convierte en crema untuosa. Genial!",
          },
        ],
        puzzles: [
          {
            id: "chef-5-p1",
            type: "multiple-choice",
            prompt: "Que tiempo verbal es 'il eut fallu que l'on sut'?",
            options: [
              "Condicional pasado + subjuntivo presente",
              "Passe simple + imperfecto",
              "Subjonctif plus-que-parfait + subjonctif imparfait",
              "Indicatif plus-que-parfait + passe simple",
            ],
            correctIdx: 2,
            hint: "Es un registro literario muy elevado",
            explanation:
              "'Il eut fallu' es el subjonctif plus-que-parfait de 'falloir', y 'que l'on sut' es el subjonctif imparfait de 'savoir'. Este registro (concordance des temps litteraire) es propio de la literatura clasica.",
          },
          {
            id: "chef-5-p2",
            type: "fill-blank",
            prompt: "Completa: 'Que le silence _____ parle' (hubiera hablado, subj. pluscuamperfecto)",
            blankAnswer: "eut",
            hint: "Auxiliar 'avoir' en subjonctif imparfait, tercera persona",
            explanation:
              "El subjonctif plus-que-parfait se forma con el subjonctif imparfait del auxiliar + participio pasado. Avoir en subj. imparfait: qu'il eut. Asi: qu'il eut parle.",
          },
        ],
      },
      {
        id: "chef-6",
        title: "L'heritage du Chef",
        description:
          "Has descifrado todas las recetas. El sous-chef te revela el verdadero legado.",
        descriptionFr:
          "Vous avez dechiffre toutes les recettes. Le sous-chef vous revele le veritable heritage.",
        backgroundEmoji: "\uD83C\uDFC6",
        dialog: [
          {
            speaker: "Sous-chef",
            text: "Vous avez reussi la ou tant d'autres avaient echoue. Le Chef Moreau disait toujours : 'La cuisine, c'est de la poesie a laquelle on peut gouter.'",
            translation:
              "Ha tenido exito donde tantos otros habian fracasado. El Chef Moreau siempre decia: 'La cocina es poesia que se puede degustar.'",
          },
          {
            speaker: "Vous",
            text: "C'etait plus qu'un simple exercice culinaire. C'etait une lecon de langue, de culture et de sensibilite.",
            translation:
              "Era mas que un simple ejercicio culinario. Era una leccion de lengua, cultura y sensibilidad.",
          },
          {
            speaker: "Sous-chef",
            text: "Desormais, ces recettes vous appartiennent. Puissiez-vous les transmettre a la prochaine generation avec la meme passion.",
            translation:
              "De ahora en adelante, estas recetas le pertenecen. Ojala las transmita a la proxima generacion con la misma pasion.",
          },
        ],
        puzzles: [
          {
            id: "chef-6-p1",
            type: "multiple-choice",
            prompt: "Que expresa 'Puissiez-vous les transmettre'?",
            options: [
              "Una orden directa",
              "Un deseo expresado con el subjuntivo en forma optativa",
              "Una pregunta sobre la capacidad",
              "Una condicion irreal",
            ],
            correctIdx: 1,
            explanation:
              "'Puissiez-vous' es el subjonctif presente de 'pouvoir' usado en inversion para expresar un deseo (optativo). Equivale a 'Ojala pueda usted'. Es un registro muy elevado.",
          },
          {
            id: "chef-6-p2",
            type: "reorder",
            prompt: "Ordena: 'Ha tenido exito donde otros habian fracasado'",
            correctOrder: ["Vous", "avez", "reussi", "la", "ou", "d'autres", "avaient", "echoue"],
            shuffledOrder: ["avaient", "la", "Vous", "d'autres", "echoue", "reussi", "ou", "avez"],
            explanation:
              "'Reussir la ou d'autres avaient echoue' combina un passe compose con un plus-que-parfait para expresar anterioridad. 'La ou' significa 'donde/alli donde'.",
          },
        ],
      },
    ],
  },
];

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return scenarios.find((s) => s.slug === slug);
}
