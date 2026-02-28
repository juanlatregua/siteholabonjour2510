export interface VocabItem {
  french: string;
  spanish: string;
  example: string;
}

export interface CulturalNote {
  title: string;
  content: string;
}

export interface FilmQuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
}

export interface Film {
  title: string;
  slug: string;
  year: number;
  director: string;
  poster: string;
  synopsis: string;
  synopsisFr: string;
  vocab: VocabItem[];
  culturalNotes: CulturalNote[];
  quiz: FilmQuizQuestion[];
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  genre: string;
}

export const films: Film[] = [
  {
    title: "Le Fabuleux Destin d'Amelie Poulain",
    slug: "amelie",
    year: 2001,
    director: "Jean-Pierre Jeunet",
    poster: "/images/films/amelie.jpg",
    synopsis:
      "Amelie Poulain es una joven camarera en Montmartre que decide dedicar su vida a hacer felices a los demas, mientras busca su propia historia de amor. A traves de pequenos gestos ingeniosos y un mundo de fantasia, transforma la vida de quienes la rodean.",
    synopsisFr:
      "Amelie Poulain est une jeune serveuse a Montmartre qui decide de consacrer sa vie a rendre les autres heureux, tout en cherchant sa propre histoire d'amour. A travers de petits gestes ingenieux et un monde de fantaisie, elle transforme la vie de ceux qui l'entourent.",
    vocab: [
      { french: "serveuse", spanish: "camarera", example: "Amelie travaille comme serveuse au cafe des Deux Moulins." },
      { french: "bonheur", spanish: "felicidad", example: "Elle cherche le bonheur des autres avant le sien." },
      { french: "destin", spanish: "destino", example: "Son fabuleux destin commence avec une decouverte inattendue." },
      { french: "reveur", spanish: "sonador", example: "Amelie est une jeune femme reveuse et solitaire." },
      { french: "stratageme", spanish: "estratagema", example: "Elle invente des stratagemes pour aider les gens." },
    ],
    culturalNotes: [
      {
        title: "Montmartre: el corazon bohemio de Paris",
        content:
          "Montmartre es un barrio historico en la colina mas alta de Paris. Famoso por la basilica del Sacre-Coeur, sus calles adoquinadas y su pasado artistico, fue hogar de pintores como Picasso, Modigliani y Toulouse-Lautrec. El cafe des Deux Moulins, donde trabaja Amelie, es un lugar real que se ha convertido en destino turistico.",
      },
      {
        title: "El cine poetico frances",
        content:
          "Amelie forma parte de una tradicion del cine frances llamada 'realismo poetico', que mezcla la vida cotidiana con elementos de fantasia y lirismo visual. Jean-Pierre Jeunet usa colores saturados, sobre todo verdes y rojos, para crear un Paris idealizado y magico.",
      },
      {
        title: "La cultura del cafe en Francia",
        content:
          "Los cafes franceses son mucho mas que lugares para tomar algo: son espacios de vida social, debate y observacion. En la pelicula, el cafe des Deux Moulins refleja esta tradicion donde los habituales tienen su mesa fija y el camarero conoce sus costumbres.",
      },
    ],
    quiz: [
      {
        question: "Donde trabaja Amelie?",
        options: ["En una libreria", "En un cafe de Montmartre", "En un museo", "En una panaderia"],
        correctIdx: 1,
      },
      {
        question: "Que decide hacer Amelie con su vida?",
        options: ["Viajar por el mundo", "Hacer felices a los demas", "Convertirse en artista", "Abrir su propio restaurante"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'serveuse' en espanol?",
        options: ["Cocinera", "Camarera", "Sirena", "Secretaria"],
        correctIdx: 1,
      },
    ],
    level: "B1",
    genre: "Comedie romantique",
  },
  {
    title: "Intouchables",
    slug: "intouchables",
    year: 2011,
    director: "Olivier Nakache & Eric Toledano",
    poster: "/images/films/intouchables.jpg",
    synopsis:
      "Philippe, un aristocrata tetraplejico, contrata como cuidador a Driss, un joven de los suburbios recien salido de prision. A pesar de sus diferencias sociales abismales, nace entre ellos una amistad profunda y llena de humor que cambiara sus vidas para siempre.",
    synopsisFr:
      "Philippe, un aristocrate tetraplegique, engage comme aide a domicile Driss, un jeune de banlieue tout juste sorti de prison. Malgre leurs differences sociales abyssales, une amitie profonde et pleine d'humour nait entre eux, qui changera leurs vies a jamais.",
    vocab: [
      { french: "banlieue", spanish: "suburbio", example: "Driss vient de la banlieue parisienne." },
      { french: "fauteuil roulant", spanish: "silla de ruedas", example: "Philippe se deplace en fauteuil roulant." },
      { french: "amitie", spanish: "amistad", example: "Leur amitie depasse les barrieres sociales." },
      { french: "entretien", spanish: "entrevista", example: "Driss se presente a l'entretien d'embauche." },
      { french: "quotidien", spanish: "cotidiano", example: "Driss change le quotidien de Philippe." },
    ],
    culturalNotes: [
      {
        title: "Las banlieues francesas",
        content:
          "Las banlieues son los suburbios de las grandes ciudades francesas, especialmente Paris. A menudo asociadas a conjuntos de viviendas sociales (HLM), albergan una poblacion diversa y son un tema recurrente en el cine y la politica francesa. La pelicula muestra el choque entre este mundo y la alta burguesia parisina.",
      },
      {
        title: "Historia real",
        content:
          "Intouchables esta basada en la historia real de Philippe Pozzo di Borgo, un empresario tetraplejico, y su cuidador Abdel Yasmin Sellou. Su relacion inspiro primero un documental y luego esta pelicula, que se convirtio en la segunda mas taquillera de la historia del cine frances.",
      },
    ],
    quiz: [
      {
        question: "Que le ocurre a Philippe?",
        options: ["Es ciego", "Es tetraplejico", "Tiene amnesia", "Es sordo"],
        correctIdx: 1,
      },
      {
        question: "De donde viene Driss?",
        options: ["De la campiña francesa", "De una familia rica", "De la banlieue parisina", "De Africa"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'amitie'?",
        options: ["Amabilidad", "Amistad", "Amor", "Ambicion"],
        correctIdx: 1,
      },
    ],
    level: "A2",
    genre: "Comedie dramatique",
  },
  {
    title: "Les Choristes",
    slug: "les-choristes",
    year: 2004,
    director: "Christophe Barratier",
    poster: "/images/films/les-choristes.jpg",
    synopsis:
      "En 1949, Clement Mathieu, un profesor de musica desempleado, llega a un internado para ninos problematicos llamado 'Fond de l'Etang'. A pesar de los metodos severos del director, Mathieu decide crear un coro con los alumnos, transformando sus vidas a traves de la musica.",
    synopsisFr:
      "En 1949, Clement Mathieu, un professeur de musique au chomage, arrive dans un internat pour enfants difficiles appele 'Fond de l'Etang'. Malgre les methodes severes du directeur, Mathieu decide de creer une chorale avec les eleves, transformant leurs vies grace a la musique.",
    vocab: [
      { french: "chorale", spanish: "coro", example: "Mathieu cree une chorale avec les enfants." },
      { french: "internat", spanish: "internado", example: "Les enfants vivent dans un internat strict." },
      { french: "punition", spanish: "castigo", example: "Le directeur croit aux punitions severes." },
      { french: "eleve", spanish: "alumno", example: "Chaque eleve a une histoire differente." },
      { french: "chanter", spanish: "cantar", example: "Les enfants apprennent a chanter ensemble." },
    ],
    culturalNotes: [
      {
        title: "La educacion en la posguerra francesa",
        content:
          "Tras la Segunda Guerra Mundial, Francia tenia muchos internados para ninos huerfanos o de familias desestructuradas. Los metodos educativos eran a menudo muy estrictos, basados en el castigo. La pelicula refleja el debate entre la disciplina autoritaria y la pedagogia humanista.",
      },
      {
        title: "La tradicion coral francesa",
        content:
          "Francia tiene una rica tradicion de coros escolares y religiosos. La pelicula revivio el interes por la musica coral en Francia, y la banda sonora, interpretada por Les Petits Chanteurs de Saint-Marc, fue un enorme exito comercial.",
      },
    ],
    quiz: [
      {
        question: "Que profesion tiene Clement Mathieu?",
        options: ["Medico", "Profesor de musica", "Abogado", "Sacerdote"],
        correctIdx: 1,
      },
      {
        question: "Que crea Mathieu con los ninos?",
        options: ["Un equipo de futbol", "Un taller de teatro", "Un coro", "Una banda de rock"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'chorale'?",
        options: ["Coral (arrecife)", "Coro", "Coreografia", "Colera"],
        correctIdx: 1,
      },
    ],
    level: "A2",
    genre: "Drame musical",
  },
  {
    title: "La Haine",
    slug: "la-haine",
    year: 1995,
    director: "Mathieu Kassovitz",
    poster: "/images/films/la-haine.jpg",
    synopsis:
      "Tras una noche de disturbios en un suburbio parisino, tres amigos -- Vinz, Hubert y Said -- pasan 24 horas entre la banlieue y Paris. La tension aumenta cuando descubren que un arma de policia se ha perdido durante los enfrentamientos. La pelicula retrata la frustracion y la violencia cotidiana en las periferias francesas.",
    synopsisFr:
      "Apres une nuit d'emeutes dans une cite de banlieue parisienne, trois amis -- Vinz, Hubert et Said -- passent 24 heures entre la banlieue et Paris. La tension monte quand ils decouvrent qu'une arme de police a ete perdue pendant les affrontements. Le film depeint la frustration et la violence quotidienne dans les peripheries francaises.",
    vocab: [
      { french: "emeute", spanish: "disturbio", example: "Une emeute a eclate dans la cite la nuit derniere." },
      { french: "cite", spanish: "barriada/conjunto habitacional", example: "Ils ont grandi dans une cite de banlieue." },
      { french: "haine", spanish: "odio", example: "La haine engendre la haine." },
      { french: "flic", spanish: "poli/policia (coloquial)", example: "Les flics patrouillent dans le quartier." },
      { french: "galerer", spanish: "pasarla mal/luchar", example: "Ils galerent pour trouver du travail." },
    ],
    culturalNotes: [
      {
        title: "Las tensiones sociales en las banlieues",
        content:
          "La Haine se inspiro en la muerte de Makomé M'Bowolé en 1993 durante un interrogatorio policial. La pelicula expone las tensiones entre la juventud de las banlieues y las fuerzas del orden, un tema que sigue siendo actual en Francia, como demostraron las revueltas de 2005 y 2023.",
      },
      {
        title: "El verlan: el argot invertido frances",
        content:
          "En la pelicula se usa mucho 'verlan', un argot que consiste en invertir las silabas de las palabras. Por ejemplo, 'meuf' (femme), 'keuf' (flic/policia), 'teuf' (fete). Es un fenomeno linguistico propio de la cultura urbana francesa.",
      },
      {
        title: "El blanco y negro como decision estetica",
        content:
          "Kassovitz rodo la pelicula en blanco y negro para dar una estetica de documental y eliminar distracciones visuales, centrando la atencion en los personajes y su entorno. Esta decision fue controvertida pero se convirtio en marca del film.",
      },
    ],
    quiz: [
      {
        question: "Cuantas horas abarca la trama de La Haine?",
        options: ["12 horas", "24 horas", "48 horas", "Una semana"],
        correctIdx: 1,
      },
      {
        question: "En que formato visual esta rodada la pelicula?",
        options: ["Color saturado", "Sepia", "Blanco y negro", "Color desaturado"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'emeute'?",
        options: ["Emocion", "Disturbio", "Encuentro", "Emigracion"],
        correctIdx: 1,
      },
    ],
    level: "B2",
    genre: "Drame social",
  },
  {
    title: "Le Petit Prince",
    slug: "le-petit-prince",
    year: 2015,
    director: "Mark Osborne",
    poster: "/images/films/le-petit-prince.jpg",
    synopsis:
      "Una nina muy estudiosa se muda con su madre a un nuevo barrio donde conoce a un anciano aviador vecino. El le cuenta la historia del Principito, un nino que viaja de planeta en planeta aprendiendo sobre la vida, el amor y la amistad. La nina descubre que hay cosas mas importantes que los examenes.",
    synopsisFr:
      "Une petite fille tres studieuse demenage avec sa mere dans un nouveau quartier ou elle rencontre un vieil aviateur voisin. Il lui raconte l'histoire du Petit Prince, un enfant qui voyage de planete en planete en apprenant sur la vie, l'amour et l'amitie. La petite fille decouvre qu'il y a des choses plus importantes que les examens.",
    vocab: [
      { french: "etoile", spanish: "estrella", example: "Le Petit Prince vient d'une petite etoile." },
      { french: "renard", spanish: "zorro", example: "Le renard apprend au Petit Prince a apprivoiser." },
      { french: "rose", spanish: "rosa", example: "Le Petit Prince aime sa rose unique." },
      { french: "apprivoiser", spanish: "domesticar/crear lazos", example: "Apprivoiser signifie creer des liens." },
      { french: "grandir", spanish: "crecer", example: "Grandir ne veut pas dire oublier son enfance." },
    ],
    culturalNotes: [
      {
        title: "Antoine de Saint-Exupery",
        content:
          "Le Petit Prince fue escrito por Antoine de Saint-Exupery en 1943 y es el libro frances mas traducido y vendido de la historia. Saint-Exupery era aviador y escritor, y desaparecio en una mision de vuelo en 1944. Su rostro aparecia en los billetes de 50 francos.",
      },
      {
        title: "Frases celebres del Principito",
        content:
          "'On ne voit bien qu'avec le coeur. L'essentiel est invisible pour les yeux.' (Solo se ve bien con el corazon. Lo esencial es invisible para los ojos). Esta frase es quiza la mas famosa de toda la literatura francesa y resume la filosofia del libro.",
      },
    ],
    quiz: [
      {
        question: "Quien le cuenta a la nina la historia del Principito?",
        options: ["Su madre", "Su profesora", "Un anciano aviador", "Su abuelo"],
        correctIdx: 2,
      },
      {
        question: "Que animal ensena al Principito sobre la amistad?",
        options: ["Un gato", "Un zorro", "Un perro", "Un pajaro"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'etoile'?",
        options: ["Estela", "Estufa", "Estrella", "Estilo"],
        correctIdx: 2,
      },
    ],
    level: "A1",
    genre: "Animation",
  },
  {
    title: "Cyrano de Bergerac",
    slug: "cyrano-de-bergerac",
    year: 1990,
    director: "Jean-Paul Rappeneau",
    poster: "/images/films/cyrano-de-bergerac.jpg",
    synopsis:
      "Cyrano es un espadachin brillante y poeta elocuente cuya enorme nariz le impide declarar su amor a la bella Roxane. Cuando su apuesto pero torpe primo Christian tambien se enamora de ella, Cyrano decide prestarle sus palabras para conquistarla, sacrificando su propio amor en el proceso.",
    synopsisFr:
      "Cyrano est un brillant bretteur et poete eloquent dont le nez enorme l'empeche de declarer son amour a la belle Roxane. Quand son beau mais maladroit cousin Christian tombe aussi amoureux d'elle, Cyrano decide de lui preter ses mots pour la seduire, sacrifiant son propre amour.",
    vocab: [
      { french: "panache", spanish: "garbo/elegancia", example: "Cyrano meurt avec panache, fidele a lui-meme." },
      { french: "bretteur", spanish: "espadachin", example: "Cyrano est le meilleur bretteur de Paris." },
      { french: "eloquence", spanish: "elocuencia", example: "Son eloquence charme tous ceux qui l'ecoutent." },
      { french: "tirade", spanish: "tirada/monologo", example: "La tirade du nez est un moment celebre de la piece." },
      { french: "aveu", spanish: "confesion", example: "Cyrano ne fait jamais l'aveu de son amour." },
      { french: "alexandrin", spanish: "alejandrino", example: "La piece est ecrite en alexandrins, des vers de douze syllabes." },
    ],
    culturalNotes: [
      {
        title: "Edmond Rostand y el verso alejandrino",
        content:
          "La pelicula adapta la obra teatral de Edmond Rostand (1897), escrita enteramente en verso alejandrino (doce silabas). Gerard Depardieu recita estos versos con una maestria que le valio el premio al Mejor Actor en Cannes. El alejandrino es la forma poetica clasica francesa por excelencia.",
      },
      {
        title: "El 'panache' frances",
        content:
          "La ultima palabra de Cyrano, 'mon panache', se ha convertido en simbolo del espiritu frances: la capacidad de mantener la elegancia y la dignidad incluso en la derrota. Es un concepto dificil de traducir y muy valorado en la cultura francesa.",
      },
      {
        title: "El Cyrano historico",
        content:
          "Cyrano de Bergerac existio realmente (1619-1655). Fue un escritor y duelista frances, precursor de la ciencia ficcion con obras como 'L'Autre Monde'. Rostand tomo su nombre y algunas anecdotas para crear un personaje en gran parte ficticio.",
      },
    ],
    quiz: [
      {
        question: "Que impide a Cyrano declarar su amor?",
        options: ["Su pobreza", "Su enorme nariz", "Su timidez", "Su rango social"],
        correctIdx: 1,
      },
      {
        question: "A quien presta Cyrano sus palabras?",
        options: ["A su mejor amigo", "A su primo Christian", "A un noble", "A un soldado"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'panache'?",
        options: ["Panico", "Garbo/elegancia", "Pancarta", "Pluma"],
        correctIdx: 1,
      },
    ],
    level: "C1",
    genre: "Drame historique",
  },
  {
    title: "Les Parapluies de Cherbourg",
    slug: "les-parapluies-de-cherbourg",
    year: 1964,
    director: "Jacques Demy",
    poster: "/images/films/les-parapluies-de-cherbourg.jpg",
    synopsis:
      "Genevieve, una joven dependienta de una tienda de paraguas en Cherbourg, esta enamorada de Guy, un mecanico. Cuando Guy es reclutado para la guerra de Argelia, Genevieve descubre que esta embarazada. La presion de su madre y las circunstancias la llevan a tomar una decision que cambiara ambas vidas para siempre.",
    synopsisFr:
      "Genevieve, une jeune vendeuse dans un magasin de parapluies a Cherbourg, est amoureuse de Guy, un garagiste. Quand Guy est appele pour la guerre d'Algerie, Genevieve decouvre qu'elle est enceinte. La pression de sa mere et les circonstances la poussent a prendre une decision qui changera leurs deux vies a jamais.",
    vocab: [
      { french: "parapluie", spanish: "paraguas", example: "Le magasin vend des parapluies de toutes les couleurs." },
      { french: "garagiste", spanish: "mecanico", example: "Guy travaille comme garagiste avant la guerre." },
      { french: "enceinte", spanish: "embarazada", example: "Genevieve decouvre qu'elle est enceinte." },
      { french: "adieu", spanish: "adios (definitivo)", example: "Les adieux a la gare sont dechirantes." },
      { french: "chantonner", spanish: "tararear", example: "Tous les dialogues sont chantonnes dans ce film." },
    ],
    culturalNotes: [
      {
        title: "Un film enteramente cantado",
        content:
          "Los Paraguas de Cherbourg es unico en el cine: todos los dialogos, incluso los mas mundanos, estan cantados. No es una comedia musical convencional, sino un drama cantado donde la musica de Michel Legrand envuelve cada escena de la vida cotidiana.",
      },
      {
        title: "La guerra de Argelia",
        content:
          "La pelicula transcurre durante la guerra de Argelia (1954-1962), un conflicto traumatico para Francia. Miles de jovenes franceses fueron reclutados para combatir, lo que afecto profundamente a la sociedad. La pelicula trata este tema de forma sutil pero poderosa a traves de la separacion de los amantes.",
      },
    ],
    quiz: [
      {
        question: "Que vende la tienda de la familia de Genevieve?",
        options: ["Flores", "Sombreros", "Paraguas", "Zapatos"],
        correctIdx: 2,
      },
      {
        question: "Por que se separan Genevieve y Guy?",
        options: ["Guy se va a estudiar", "Guy es reclutado para la guerra", "Genevieve se muda", "Los padres lo prohiben"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'parapluie'?",
        options: ["Parasol", "Paraguas", "Paracaidas", "Parada"],
        correctIdx: 1,
      },
    ],
    level: "B1",
    genre: "Drame musical",
  },
  {
    title: "La Vie en Rose",
    slug: "la-vie-en-rose",
    year: 2007,
    director: "Olivier Dahan",
    poster: "/images/films/la-vie-en-rose.jpg",
    synopsis:
      "Biografia de Edith Piaf, la cantante francesa mas famosa de todos los tiempos. Desde su infancia en la pobreza en las calles de Paris y Normandia, pasando por su descubrimiento en un cabaret, hasta su consagracion mundial y sus tragedias personales. Marion Cotillard encarna a Piaf en una interpretacion que le valio el Oscar.",
    synopsisFr:
      "Biographie d'Edith Piaf, la chanteuse francaise la plus celebre de tous les temps. Depuis son enfance dans la misere dans les rues de Paris et de Normandie, en passant par sa decouverte dans un cabaret, jusqu'a sa consecration mondiale et ses tragedies personnelles. Marion Cotillard incarne Piaf dans une interpretation qui lui a valu l'Oscar.",
    vocab: [
      { french: "chanteuse", spanish: "cantante (fem.)", example: "Piaf est devenue la plus grande chanteuse francaise." },
      { french: "misere", spanish: "miseria", example: "Elle a grandi dans la misere des rues de Paris." },
      { french: "cabaret", spanish: "cabaret", example: "Elle a ete decouverte en chantant dans un cabaret." },
      { french: "deuil", spanish: "duelo/luto", example: "La vie de Piaf a ete marquee par le deuil." },
      { french: "ovation", spanish: "ovacion", example: "Le public lui a fait une ovation debout." },
    ],
    culturalNotes: [
      {
        title: "Edith Piaf, la mome",
        content:
          "Edith Piaf (1915-1963) fue apodada 'la Mome Piaf' (la gorriona). Su voz unica y sus canciones como 'La Vie en Rose', 'Non, je ne regrette rien' y 'L'Hymne a l'amour' son iconos culturales franceses. Su tumba en el cementerio Pere-Lachaise es una de las mas visitadas del mundo.",
      },
      {
        title: "La chanson francaise",
        content:
          "La 'chanson francaise' es un genero musical que da especial importancia a la letra y la interpretacion vocal. Piaf, junto con Brel, Brassens y Aznavour, definio este genero que sigue siendo central en la identidad cultural francesa.",
      },
      {
        title: "Marion Cotillard y el Oscar",
        content:
          "Marion Cotillard gano el Oscar a la Mejor Actriz en 2008 por su interpretacion de Piaf, convirtiendose en la primera actriz en ganar este premio por una pelicula en frances desde 1960. Su transformacion fisica para el papel fue extraordinaria.",
      },
    ],
    quiz: [
      {
        question: "Quien fue Edith Piaf?",
        options: ["Una pintora", "Una actriz", "Una cantante", "Una escritora"],
        correctIdx: 2,
      },
      {
        question: "Que premio gano Marion Cotillard por esta pelicula?",
        options: ["Palma de Oro", "BAFTA", "Oscar", "Cesar"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'chanteuse'?",
        options: ["Bailarina", "Cantante", "Cuentista", "Chancla"],
        correctIdx: 1,
      },
    ],
    level: "B2",
    genre: "Biopic",
  },
  {
    title: "Bienvenue chez les Ch'tis",
    slug: "bienvenue-chez-les-chtis",
    year: 2008,
    director: "Dany Boon",
    poster: "/images/films/bienvenue-chez-les-chtis.jpg",
    synopsis:
      "Philippe Abrams, director de una oficina de correos en el sur de Francia, es trasladado como castigo a Bergues, en el norte. Aterrorizado por los estereotipos sobre el Norte frio y gris, descubre que los 'ch'tis' son gente calida y acogedora. Una comedia sobre los prejuicios regionales en Francia.",
    synopsisFr:
      "Philippe Abrams, directeur d'une agence postale dans le sud de la France, est mute par sanction a Bergues, dans le Nord. Terrorise par les stereotypes sur le Nord froid et gris, il decouvre que les Ch'tis sont des gens chaleureux et accueillants. Une comedie sur les prejuges regionaux en France.",
    vocab: [
      { french: "mutation", spanish: "traslado", example: "Sa mutation dans le Nord est vue comme une punition." },
      { french: "accueillant", spanish: "acogedor", example: "Les gens du Nord sont tres accueillants." },
      { french: "prejuge", spanish: "prejuicio", example: "Philippe est plein de prejuges sur le Nord." },
      { french: "patois", spanish: "dialecto local", example: "Le ch'ti est un patois du nord de la France." },
      { french: "chaleureux", spanish: "calido/carinoso", example: "L'accueil des Ch'tis est chaleureux." },
    ],
    culturalNotes: [
      {
        title: "El ch'ti: un dialecto del norte",
        content:
          "El ch'ti (o picard) es un dialecto historico del norte de Francia y Belgica. Tiene su propia pronunciacion, vocabulario y expresiones. En la pelicula, los malentendidos linguisticos son una fuente constante de humor. Palabras como 'biloute' (amigo) o 'cha va ti?' (como estas?) son tipicas.",
      },
      {
        title: "La rivalidad Norte-Sur en Francia",
        content:
          "En Francia existe una rivalidad cultural humoristica entre el Norte (frio, industrial, cerveza) y el Sur (sol, vacaciones, pastis). La pelicula juega con estos estereotipos para finalmente desmontarlos y mostrar que la calidez humana no depende del clima.",
      },
      {
        title: "Record de taquilla",
        content:
          "Bienvenue chez les Ch'tis fue la pelicula mas taquillera de la historia del cine frances con mas de 20 millones de espectadores en Francia, hasta que fue superada por Intouchables. Fue un fenomeno social que genero un boom turistico en la region Nord-Pas-de-Calais.",
      },
    ],
    quiz: [
      {
        question: "Por que trasladan a Philippe al norte?",
        options: ["Por un ascenso", "Como castigo", "Por voluntad propia", "Por una herencia"],
        correctIdx: 1,
      },
      {
        question: "Que descubre Philippe sobre los ch'tis?",
        options: ["Que son frios", "Que son acogedores", "Que son ricos", "Que son tristes"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'accueillant'?",
        options: ["Acomodado", "Acogedor", "Acumulador", "Acusado"],
        correctIdx: 1,
      },
    ],
    level: "B1",
    genre: "Comedie",
  },
  {
    title: "Le Diner de Cons",
    slug: "le-diner-de-cons",
    year: 1998,
    director: "Francis Veber",
    poster: "/images/films/le-diner-de-cons.jpg",
    synopsis:
      "Pierre Brochant organiza cada miercoles una 'cena de idiotas': cada invitado debe traer a la persona mas idiota que pueda encontrar, sin que esta lo sepa. Pierre cree haber encontrado al campeon perfecto en Francois Pignon, un apasionado de las maquetas de cerillas. Pero Pignon resultara ser mucho mas listo de lo esperado.",
    synopsisFr:
      "Pierre Brochant organise chaque mercredi un 'diner de cons' : chaque invite doit amener la personne la plus idiote qu'il puisse trouver, sans que celle-ci le sache. Pierre pense avoir trouve le champion parfait en Francois Pignon, un passionne de maquettes en allumettes. Mais Pignon se revelera bien plus malin que prevu.",
    vocab: [
      { french: "con", spanish: "idiota (coloquial)", example: "Le titre du film joue avec le mot 'con'." },
      { french: "maquette", spanish: "maqueta", example: "Pignon construit des maquettes en allumettes." },
      { french: "allumette", spanish: "cerilla", example: "Il utilise des milliers d'allumettes pour ses oeuvres." },
      { french: "quiproquo", spanish: "malentendido", example: "Le film est base sur une serie de quiproquos." },
      { french: "malin", spanish: "astuto", example: "Pignon est plus malin qu'il ne parait." },
    ],
    culturalNotes: [
      {
        title: "La comedia de enredo francesa",
        content:
          "Le Diner de Cons pertenece a la gran tradicion de la comedia de enredo francesa (vaudeville), donde un malentendido inicial desencadena una cascada de situaciones absurdas. Francis Veber es maestro del genero, habiendo creado tambien Le Placard y La Chevre.",
      },
      {
        title: "Francois Pignon: un personaje recurrente",
        content:
          "El nombre 'Francois Pignon' es usado por Veber en varias peliculas para designar a un personaje comun y aparentemente insignificante que acaba poniendo patas arriba la vida de quienes lo rodean. Es un arquetipo del 'tonto sabio' del cine frances.",
      },
    ],
    quiz: [
      {
        question: "En que consiste la 'cena de idiotas'?",
        options: [
          "Una cena para gente torpe en la cocina",
          "Cada invitado trae a la persona mas idiota que encuentre",
          "Una cena donde se cuentan chistes",
          "Una cena benefica",
        ],
        correctIdx: 1,
      },
      {
        question: "Cual es la pasion de Francois Pignon?",
        options: ["La pesca", "Las maquetas de cerillas", "El ajedrez", "Los trenes"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'malin'?",
        options: ["Malvado", "Malo", "Astuto", "Malhumorado"],
        correctIdx: 2,
      },
    ],
    level: "B1",
    genre: "Comedie",
  },
  {
    title: "Cleo de 5 a 7",
    slug: "cleo-de-5-a-7",
    year: 1962,
    director: "Agnes Varda",
    poster: "/images/films/cleo-de-5-a-7.jpg",
    synopsis:
      "Cleo, una bella y caprichosa cantante parisina, espera los resultados de unas pruebas medicas que podrian confirmar que tiene cancer. Durante dos horas recorre Paris, confrontando su vanidad, sus miedos y su relacion con los demas. Un retrato existencial filmado practicamente en tiempo real.",
    synopsisFr:
      "Cleo, une belle et capricieuse chanteuse parisienne, attend les resultats d'examens medicaux qui pourraient confirmer qu'elle a un cancer. Pendant deux heures, elle parcourt Paris, confrontant sa vanite, ses peurs et sa relation aux autres. Un portrait existentiel filme pratiquement en temps reel.",
    vocab: [
      { french: "angoisse", spanish: "angustia", example: "Cleo vit dans l'angoisse en attendant ses resultats." },
      { french: "vanite", spanish: "vanidad", example: "Sa vanite cache une profonde fragilite." },
      { french: "errer", spanish: "deambular", example: "Elle erre dans les rues de Paris." },
      { french: "superstition", spanish: "supersticion", example: "Cleo est pleine de superstitions." },
      { french: "regard", spanish: "mirada", example: "Le regard des autres definit Cleo au debut du film." },
      { french: "depouillement", spanish: "despojamiento", example: "Le film progresse vers un depouillement emotionnel." },
    ],
    culturalNotes: [
      {
        title: "Agnes Varda, la abuela de la Nouvelle Vague",
        content:
          "Agnes Varda (1928-2019) fue una de las cineastas mas importantes de Francia y una pionera de la Nouvelle Vague. Cleo de 5 a 7 es considerada su obra maestra. Fue la primera mujer en recibir una Palma de Oro honorifica en Cannes (2015) y un Oscar honorifico (2017).",
      },
      {
        title: "Paris como personaje",
        content:
          "La pelicula recorre Paris en tiempo real, convirtiendo la ciudad en un personaje mas. Varda filmo en locaciones reales del Barrio Latino, Montparnasse y el Parc Montsouris, capturando la vida parisina de principios de los anos 60.",
      },
      {
        title: "El tiempo real en el cine",
        content:
          "Cleo de 5 a 7 es un experimento con el tiempo cinematografico: los 90 minutos de pelicula cubren casi exactamente 90 minutos en la vida de Cleo. Esta tecnica crea una tension constante y una intimidad con la protagonista.",
      },
    ],
    quiz: [
      {
        question: "Que espera Cleo durante la pelicula?",
        options: ["Un vuelo", "Resultados medicos", "Una llamada de su amante", "Un contrato discografico"],
        correctIdx: 1,
      },
      {
        question: "Quien dirigio Cleo de 5 a 7?",
        options: ["Francois Truffaut", "Jean-Luc Godard", "Agnes Varda", "Claude Chabrol"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'angoisse'?",
        options: ["Anguila", "Angustia", "Angulo", "Anillo"],
        correctIdx: 1,
      },
    ],
    level: "C1",
    genre: "Drame existentiel",
  },
  {
    title: "Les 400 Coups",
    slug: "les-400-coups",
    year: 1959,
    director: "Francois Truffaut",
    poster: "/images/films/les-400-coups.jpg",
    synopsis:
      "Antoine Doinel es un adolescente parisino incomprendido por sus padres y sus profesores. Harto de castigos y negligencia, empieza a hacer novillos, mentir y robar, lo que lo lleva al reformatorio. Una pelicula semiautobiografica que revoluciono el cine mundial y lanzo la Nouvelle Vague.",
    synopsisFr:
      "Antoine Doinel est un adolescent parisien incompris par ses parents et ses professeurs. Las des punitions et de la negligence, il commence a faire l'ecole buissonniere, mentir et voler, ce qui le conduit en maison de correction. Un film semi-autobiographique qui a revolutionne le cinema mondial et lance la Nouvelle Vague.",
    vocab: [
      { french: "ecole buissonniere", spanish: "hacer novillos", example: "Antoine fait l'ecole buissonniere pour aller au cinema." },
      { french: "fugue", spanish: "fuga/huida", example: "Antoine fait plusieurs fugues de chez lui." },
      { french: "punition", spanish: "castigo", example: "Les punitions ne font qu'aggraver la situation." },
      { french: "maison de correction", spanish: "reformatorio", example: "Antoine est envoye en maison de correction." },
      { french: "incompris", spanish: "incomprendido", example: "Antoine est un adolescent incompris." },
    ],
    culturalNotes: [
      {
        title: "La Nouvelle Vague",
        content:
          "Les 400 Coups (1959) es considerada una de las peliculas fundadoras de la Nouvelle Vague (Nueva Ola), un movimiento cinematografico frances que rompio con el cine academico. Junto con A bout de souffle de Godard, establecio un nuevo lenguaje cinematografico: rodaje en exteriores, camara en mano, actores no profesionales.",
      },
      {
        title: "Antoine Doinel: el alter ego de Truffaut",
        content:
          "Antoine Doinel es el alter ego cinematografico de Truffaut, interpretado por Jean-Pierre Leaud en cinco peliculas a lo largo de 20 anos. Truffaut, que tuvo una infancia dificil y paso por un reformatorio, volco su experiencia personal en este personaje.",
      },
      {
        title: "El plano final",
        content:
          "El ultimo plano de la pelicula, un zoom sobre el rostro de Antoine mirando al mar tras escapar del reformatorio, es uno de los planos mas celebres de la historia del cine. La imagen se congela, dejando abierto el destino del personaje.",
      },
    ],
    quiz: [
      {
        question: "Que movimiento cinematografico inicio esta pelicula?",
        options: ["El expresionismo", "La Nouvelle Vague", "El neorrealismo", "El surrealismo"],
        correctIdx: 1,
      },
      {
        question: "Que hace Antoine para escapar de su vida?",
        options: ["Se va al ejercito", "Hace novillos y huye", "Emigra a America", "Se esconde en una biblioteca"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'fugue'?",
        options: ["Fuego", "Fuga/huida", "Fulgor", "Funcion"],
        correctIdx: 1,
      },
    ],
    level: "B2",
    genre: "Drame",
  },
  {
    title: "Un Prophete",
    slug: "un-prophete",
    year: 2009,
    director: "Jacques Audiard",
    poster: "/images/films/un-prophete.jpg",
    synopsis:
      "Malik El Djebena, un joven francoarabe analfabeto de 19 anos, entra en prision. Alli es reclutado por el clan corso que domina la carcel. A lo largo de seis anos, Malik aprende a leer, a hablar corso e italiano, y construye su propio imperio criminal, convirtiendose en un lider respetado tanto dentro como fuera de la prision.",
    synopsisFr:
      "Malik El Djebena, un jeune Franco-Arabe analphabete de 19 ans, entre en prison. Il est recrute par le clan corse qui domine la prison. Au fil de six ans, Malik apprend a lire, a parler corse et italien, et bati son propre empire criminel, devenant un leader respecte aussi bien a l'interieur qu'a l'exterieur de la prison.",
    vocab: [
      { french: "taulard", spanish: "presidiario (argot)", example: "Malik devient un taulard respecte." },
      { french: "analphabete", spanish: "analfabeto", example: "Malik est analphabete quand il arrive en prison." },
      { french: "clan", spanish: "clan", example: "Le clan corse controle tout dans la prison." },
      { french: "permission", spanish: "permiso de salida", example: "Malik obtient des permissions de sortie." },
      { french: "ascension", spanish: "ascenso", example: "Son ascension dans le milieu criminel est fulgurante." },
    ],
    culturalNotes: [
      {
        title: "El sistema penitenciario frances",
        content:
          "La pelicula ofrece una vision realista de las carceles francesas, donde coexisten diferentes comunidades etnicas y sus jerarquias de poder. Francia tiene uno de los sistemas carcelarios mas sobrepoblados de Europa occidental, un tema de debate social constante.",
      },
      {
        title: "Las comunidades en la prision francesa",
        content:
          "Un Prophete muestra la division de la carcel entre comunidades: los corsos, los arabes, los gitanos. Esta compartimentacion refleja tensiones reales en las prisiones francesas y, por extension, en la sociedad francesa contemporanea.",
      },
      {
        title: "Jacques Audiard",
        content:
          "Jacques Audiard es uno de los directores franceses mas aclamados internacionalmente. Un Prophete gano el Gran Premio del Jurado en Cannes 2009 y nueve premios Cesar, incluyendo Mejor Pelicula. Audiard ganaria la Palma de Oro en 2015 con Dheepan.",
      },
    ],
    quiz: [
      {
        question: "Cuantos anos pasa Malik en prision?",
        options: ["Dos", "Cuatro", "Seis", "Diez"],
        correctIdx: 2,
      },
      {
        question: "Que clan domina la carcel?",
        options: ["El clan arabe", "El clan corso", "El clan gitano", "El clan ruso"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'analphabete'?",
        options: ["Analogico", "Analfabeto", "Anarquista", "Anonimo"],
        correctIdx: 1,
      },
    ],
    level: "C1",
    genre: "Drame carceral",
  },
  {
    title: "Ratatouille",
    slug: "ratatouille",
    year: 2007,
    director: "Brad Bird",
    poster: "/images/films/ratatouille.jpg",
    synopsis:
      "Remy es una rata con un sentido del gusto extraordinario que suena con ser chef en Paris. Cuando llega al restaurante del fallecido Auguste Gusteau, se alia con Linguini, un joven torpe que trabaja en la cocina. Juntos demuestran que 'cualquiera puede cocinar', incluso una rata.",
    synopsisFr:
      "Remy est un rat avec un sens du gout extraordinaire qui reve de devenir chef a Paris. Quand il arrive au restaurant du defunt Auguste Gusteau, il s'allie avec Linguini, un jeune maladroit qui travaille en cuisine. Ensemble, ils prouvent que 'tout le monde peut cuisiner', meme un rat.",
    vocab: [
      { french: "rat", spanish: "rata", example: "Remy est un rat qui veut devenir chef." },
      { french: "cuisine", spanish: "cocina", example: "La cuisine francaise est celebre dans le monde entier." },
      { french: "gouter", spanish: "probar/saborear", example: "Remy adore gouter de nouveaux plats." },
      { french: "chef", spanish: "chef/cocinero jefe", example: "Le chef Gusteau est le heros de Remy." },
      { french: "recette", spanish: "receta", example: "La recette de la ratatouille est simple mais delicieuse." },
    ],
    culturalNotes: [
      {
        title: "La alta cocina francesa",
        content:
          "La pelicula rinde homenaje a la alta cocina francesa (haute cuisine) y al sistema de brigada de cocina creado por Auguste Escoffier. Los restaurantes parisinos con estrellas Michelin son templos de la gastronomia mundial, y la pelicula captura ese mundo con sorprendente precision.",
      },
      {
        title: "La ratatouille: un plato humilde",
        content:
          "La ratatouille es un plato provenzal de verduras (berenjenas, calabacines, tomates, pimientos) tipico del sur de Francia. En la pelicula, este plato humilde conquista al temido critico Anton Ego, mostrando que la grandeza culinaria no depende de ingredientes lujosos sino de la pasion.",
      },
    ],
    quiz: [
      {
        question: "Que animal es Remy?",
        options: ["Un raton", "Una rata", "Un hamster", "Un conejo"],
        correctIdx: 1,
      },
      {
        question: "Con que suena Remy?",
        options: ["Vivir en el campo", "Ser chef en Paris", "Tener una familia", "Escribir un libro"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'cuisine'?",
        options: ["Costura", "Cuchillo", "Cocina", "Cuero"],
        correctIdx: 2,
      },
    ],
    level: "A1",
    genre: "Animation",
  },
  {
    title: "Le Pere Noel est une ordure",
    slug: "le-pere-noel-est-une-ordure",
    year: 1982,
    director: "Jean-Marie Poire",
    poster: "/images/films/le-pere-noel-est-une-ordure.jpg",
    synopsis:
      "Es Nochebuena en un centro de atencion telefonica para personas en crisis. Los dos voluntarios, Pierre y Therese, intentan mantener la calma mientras reciben visitas cada vez mas absurdas: un mendigo, una transexual, un vecino agresivo. Una comedia coral de humor negro que se ha convertido en clasico navideo frances.",
    synopsisFr:
      "C'est le soir du reveillon de Noel dans un centre d'ecoute telephonique pour personnes en detresse. Les deux benevoles, Pierre et Therese, tentent de garder leur calme tandis que les visites deviennent de plus en plus absurdes : un clochard, une transsexuelle, un voisin agressif. Une comedie chorale d'humour noir devenue un classique de Noel en France.",
    vocab: [
      { french: "reveillon", spanish: "cena de Nochebuena/Nochevieja", example: "Le reveillon de Noel tourne au chaos." },
      { french: "benevole", spanish: "voluntario", example: "Pierre et Therese sont des benevoles." },
      { french: "clochard", spanish: "mendigo/vagabundo", example: "Un clochard arrive au centre pendant le reveillon." },
      { french: "ordure", spanish: "basura/porqueria", example: "Le titre dit que le Pere Noel est une ordure." },
      { french: "detresse", spanish: "angustia/peligro", example: "Le centre aide les personnes en detresse." },
    ],
    culturalNotes: [
      {
        title: "La troupe du Splendid",
        content:
          "Le Pere Noel est une ordure fue creada por la troupe del teatro Splendid, un grupo de comicos que revoluciono el humor frances en los 70 y 80. Sus miembros (Josiane Balasko, Thierry Lhermitte, Gerard Jugnot, Michel Blanc, Christian Clavier) se convirtieron en estrellas del cine frances.",
      },
      {
        title: "El reveillon frances",
        content:
          "El reveillon (cena de Nochebuena o Nochevieja) es una tradicion central en Francia: una cena larga y copiosa con familia o amigos, que puede incluir foie gras, ostras, salmon ahumado, capones y la buche de Noel (tronco de Navidad). La pelicula parodia esta tradicion.",
      },
    ],
    quiz: [
      {
        question: "Donde transcurre la pelicula?",
        options: ["En un hospital", "En un centro de atencion telefonica", "En un restaurante", "En una iglesia"],
        correctIdx: 1,
      },
      {
        question: "En que fecha se desarrolla la accion?",
        options: ["Ano Nuevo", "Nochebuena", "Navidad por la manana", "Dia de Reyes"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'reveillon'?",
        options: ["Revelacion", "Cena de Nochebuena/Nochevieja", "Revolucion", "Reverencia"],
        correctIdx: 1,
      },
    ],
    level: "B2",
    genre: "Comedie noire",
  },
  {
    title: "Asterix: Mission Cleopatre",
    slug: "asterix-mission-cleopatre",
    year: 2002,
    director: "Alain Chabat",
    poster: "/images/films/asterix-mission-cleopatre.jpg",
    synopsis:
      "Cleopatra apuesta con Julio Cesar que los egipcios pueden construir un palacio magnifico en tres meses. Para lograrlo, el arquitecto Numerobis pide ayuda a los galos Asterix y Obelix y su pocion magica. Una adaptacion del celebre comic con humor absurdo y parodias cinematograficas.",
    synopsisFr:
      "Cleopatre parie avec Jules Cesar que les Egyptiens peuvent construire un palais magnifique en trois mois. Pour y arriver, l'architecte Numerobis demande l'aide des Gaulois Asterix et Obelix et de leur potion magique. Une adaptation de la celebre bande dessinee avec un humour absurde et des parodies cinematographiques.",
    vocab: [
      { french: "bande dessinee", spanish: "comic/historieta", example: "Asterix est une celebre bande dessinee francaise." },
      { french: "potion", spanish: "pocion", example: "La potion magique donne une force surhumaine." },
      { french: "gaulois", spanish: "galo", example: "Asterix et Obelix sont des Gaulois." },
      { french: "pari", spanish: "apuesta", example: "Cleopatre fait un pari avec Cesar." },
      { french: "chantier", spanish: "obra (construccion)", example: "Le chantier du palais avance grace a la potion." },
    ],
    culturalNotes: [
      {
        title: "Asterix: un simbolo cultural frances",
        content:
          "Asterix, creado por Goscinny y Uderzo en 1959, es el comic mas famoso de Francia. Ha vendido mas de 380 millones de ejemplares y ha sido traducido a mas de 100 idiomas. Los personajes representan el espiritu de resistencia frances (los galos que resisten a los romanos) y son un icono cultural nacional.",
      },
      {
        title: "La BD (bande dessinee) en Francia",
        content:
          "En Francia, la bande dessinee es considerada el 'noveno arte' y tiene un estatus cultural comparable a la literatura o el cine. El Festival de Angouleme es el evento de comic mas importante de Europa. Tintin, Asterix y Lucky Luke son los pilares de esta tradicion.",
      },
    ],
    quiz: [
      {
        question: "Que apuesta Cleopatra con Cesar?",
        options: [
          "Que Egipto ganara una guerra",
          "Que construiran un palacio en tres meses",
          "Que encontraran un tesoro",
          "Que cruzaran el desierto",
        ],
        correctIdx: 1,
      },
      {
        question: "Que da fuerza sobrehumana a los galos?",
        options: ["Una espada magica", "Un casco especial", "Una pocion magica", "Una piedra sagrada"],
        correctIdx: 2,
      },
      {
        question: "Que significa 'bande dessinee'?",
        options: ["Banda de musica", "Comic/historieta", "Cinta dibujada", "Pandilla disenada"],
        correctIdx: 1,
      },
    ],
    level: "A2",
    genre: "Comedie",
  },
  {
    title: "Cache",
    slug: "cache",
    year: 2005,
    director: "Michael Haneke",
    poster: "/images/films/cache.jpg",
    synopsis:
      "Georges Laurent, un presentador de television parisino, empieza a recibir misteriosos videos de vigilancia de su propia casa, acompanados de dibujos infantiles inquietantes. A medida que investiga, los videos lo obligan a confrontar un terrible secreto de su infancia relacionado con un nino argelino. Un thriller psicologico sobre la culpa colonial francesa.",
    synopsisFr:
      "Georges Laurent, un presentateur de television parisien, commence a recevoir de mysterieuses cassettes de surveillance de sa propre maison, accompagnees de dessins d'enfant inquietants. Au fur et a mesure de son enquete, les cassettes le forcent a confronter un terrible secret de son enfance lie a un enfant algerien. Un thriller psychologique sur la culpabilite coloniale francaise.",
    vocab: [
      { french: "surveillance", spanish: "vigilancia", example: "Les cassettes de surveillance sont anonymes." },
      { french: "culpabilite", spanish: "culpabilidad", example: "La culpabilite de Georges remonte a l'enfance." },
      { french: "menace", spanish: "amenaza", example: "Les videos representent une menace silencieuse." },
      { french: "refoulement", spanish: "represion (psicologica)", example: "Georges a refoule ses souvenirs d'enfance." },
      { french: "malaise", spanish: "malestar", example: "Un malaise croissant envahit la famille." },
      { french: "deni", spanish: "negacion", example: "Georges est dans le deni total de sa responsabilite." },
    ],
    culturalNotes: [
      {
        title: "La masacre del 17 de octubre de 1961",
        content:
          "La pelicula alude a la masacre de manifestantes argelinos por la policia parisina el 17 de octubre de 1961, durante la guerra de Argelia. Este evento fue silenciado durante decadas por el Estado frances. Haneke utiliza esta memoria oculta como metafora de la culpa colectiva francesa.",
      },
      {
        title: "Michael Haneke y el cine frances",
        content:
          "Aunque austriaco, Haneke ha rodado muchas de sus peliculas mas importantes en Frances y con actores franceses. Cache gano el premio a la Mejor Direccion en Cannes 2005. Haneke ganaria dos Palmas de Oro consecutivas con Das weisse Band (2009) y Amour (2012).",
      },
      {
        title: "El final abierto",
        content:
          "Cache es famosa por su final abierto y ambiguo, que sigue generando debates entre cineastas y criticos. Un plano fijo largo en el ultimo fotograma contiene un detalle que muchos espectadores no perciben y que cambia la interpretacion de toda la pelicula.",
      },
    ],
    quiz: [
      {
        question: "Que recibe Georges en su casa?",
        options: ["Cartas anonimas", "Videos de vigilancia", "Llamadas telefonicas", "Paquetes con regalos"],
        correctIdx: 1,
      },
      {
        question: "Que secreto oculta Georges?",
        options: ["Un crimen reciente", "Algo de su infancia", "Una doble vida", "Un robo"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'culpabilite'?",
        options: ["Capacidad", "Culpabilidad", "Curiosidad", "Calamidad"],
        correctIdx: 1,
      },
    ],
    level: "C2",
    genre: "Thriller psychologique",
  },
  {
    title: "8 femmes",
    slug: "8-femmes",
    year: 2002,
    director: "Francois Ozon",
    poster: "/images/films/8-femmes.jpg",
    synopsis:
      "En una mansion aislada por la nieve en los anos 50, ocho mujeres descubren que el unico hombre de la casa ha sido asesinado. Cada una tiene un motivo y un secreto. Entre acusaciones, revelaciones y numeros musicales, las sospechas recaen sobre todas. Una comedia de misterio con un reparto femenino estelar.",
    synopsisFr:
      "Dans un manoir isole par la neige dans les annees 50, huit femmes decouvrent que le seul homme de la maison a ete assassine. Chacune a un mobile et un secret. Entre accusations, revelations et numeros musicaux, les soupcons se portent sur toutes. Une comedie policiere avec une distribution feminine prestigieuse.",
    vocab: [
      { french: "manoir", spanish: "mansion/casona", example: "Le manoir est isole par la neige." },
      { french: "meurtre", spanish: "asesinato", example: "Un meurtre mysterieux a ete commis." },
      { french: "soupcon", spanish: "sospecha", example: "Les soupcons pesent sur chacune des huit femmes." },
      { french: "mobile", spanish: "motivo (de un crimen)", example: "Chaque femme a un mobile pour le meurtre." },
      { french: "aveu", spanish: "confesion", example: "Les aveux se succedent au fil du film." },
    ],
    culturalNotes: [
      {
        title: "Un reparto de leyenda",
        content:
          "8 femmes reune a ocho de las actrices mas importantes del cine frances de diferentes generaciones: Catherine Deneuve, Fanny Ardant, Isabelle Huppert, Emmanuelle Beart, Virginie Ledoyen, Ludivine Sagnier, Danielle Darrieux y Firmine Richard. Reunir a tantas estrellas fue un evento historico.",
      },
      {
        title: "La tradicion del whodunit frances",
        content:
          "La pelicula se inspira en el teatro de bulevar frances y en las novelas policiacas de Agatha Christie. El genero del 'whodunit' (quien lo hizo) tiene una larga tradicion en Francia, desde Gaston Leroux hasta Fred Vargas.",
      },
    ],
    quiz: [
      {
        question: "Cuantas mujeres protagonizan la pelicula?",
        options: ["Seis", "Siete", "Ocho", "Diez"],
        correctIdx: 2,
      },
      {
        question: "Que sucede al unico hombre de la casa?",
        options: ["Desaparece", "Es asesinado", "Huye", "Se enferma"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'soupcon'?",
        options: ["Solucion", "Sospecha", "Soplo", "Suposicion"],
        correctIdx: 1,
      },
    ],
    level: "B1",
    genre: "Comedie policiere",
  },
  {
    title: "Persepolis",
    slug: "persepolis",
    year: 2007,
    director: "Marjane Satrapi & Vincent Paronnaud",
    poster: "/images/films/persepolis.jpg",
    synopsis:
      "Basada en la novela grafica autobiografica de Marjane Satrapi, la pelicula narra su infancia en Iran durante la revolucion islamica, su adolescencia como exiliada en Viena y su regreso a Teheran. Una historia de identidad, libertad y resistencia contada con animacion en blanco y negro.",
    synopsisFr:
      "Basee sur le roman graphique autobiographique de Marjane Satrapi, le film raconte son enfance en Iran pendant la revolution islamique, son adolescence en tant qu'exilee a Vienne et son retour a Teheran. Une histoire d'identite, de liberte et de resistance racontee en animation noir et blanc.",
    vocab: [
      { french: "exil", spanish: "exilio", example: "Marjane vit l'exil en Europe." },
      { french: "revolution", spanish: "revolucion", example: "La revolution islamique change la vie de Marjane." },
      { french: "identite", spanish: "identidad", example: "Marjane cherche son identite entre deux cultures." },
      { french: "liberte", spanish: "libertad", example: "La liberte est le theme central du film." },
      { french: "deracine", spanish: "desarraigado", example: "Marjane se sent deracinee en Europe." },
    ],
    culturalNotes: [
      {
        title: "La diaspora iraniana en Francia",
        content:
          "Francia acoge una importante comunidad iraniana, muchos de ellos exiliados tras la revolucion islamica de 1979. Paris es un centro cultural de la diaspora persa, con restaurantes, librerias y asociaciones culturales. Satrapi vive en Paris desde los anos 90.",
      },
      {
        title: "La novela grafica autobiografica",
        content:
          "Persepolis fue publicada como novela grafica en cuatro tomos entre 2000 y 2003 por L'Association, una editorial independiente francesa. El libro fue un exito mundial y ayudo a popularizar la novela grafica autobiografica como genero literario serio en Francia.",
      },
      {
        title: "La animacion en blanco y negro",
        content:
          "La eleccion del blanco y negro para la animacion reproduce el estilo del comic original y aporta una fuerza expresiva particular. Las pocas escenas en color representan el presente de Marjane en Paris, creando un contraste entre memoria y realidad.",
      },
    ],
    quiz: [
      {
        question: "Donde crece Marjane?",
        options: ["En Francia", "En Iran", "En Espana", "En Turquia"],
        correctIdx: 1,
      },
      {
        question: "Que evento historico marca su infancia?",
        options: ["La Segunda Guerra Mundial", "La revolucion islamica", "La Guerra Fria", "La primavera arabe"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'exil'?",
        options: ["Exito", "Exilio", "Existencia", "Exhibicion"],
        correctIdx: 1,
      },
    ],
    level: "B2",
    genre: "Animation autobiographique",
  },
  {
    title: "La Grande Vadrouille",
    slug: "la-grande-vadrouille",
    year: 1966,
    director: "Gerard Oury",
    poster: "/images/films/la-grande-vadrouille.jpg",
    synopsis:
      "Durante la ocupacion nazi de Paris en 1942, un director de orquesta gruñon y un pintor de brocha gorda se ven obligados a ayudar a tres aviadores britanicos derribados a cruzar Francia hasta la zona libre. Una aventura comica llena de disfraces, persecuciones y malentendidos en la Francia ocupada.",
    synopsisFr:
      "Pendant l'occupation nazie de Paris en 1942, un chef d'orchestre grognon et un peintre en batiment se retrouvent obliges d'aider trois aviateurs britanniques abattus a traverser la France jusqu'a la zone libre. Une aventure comique pleine de deguisements, de poursuites et de quiproquos dans la France occupee.",
    vocab: [
      { french: "occupation", spanish: "ocupacion", example: "L'occupation allemande a dure quatre ans." },
      { french: "deguisement", spanish: "disfraz", example: "Ils utilisent des deguisements pour echapper aux Allemands." },
      { french: "zone libre", spanish: "zona libre", example: "Ils doivent atteindre la zone libre au sud." },
      { french: "poursuite", spanish: "persecucion", example: "Les poursuites sont le coeur comique du film." },
      { french: "grognon", spanish: "gruñon", example: "Bourvil joue un personnage grognon mais attachant." },
    ],
    culturalNotes: [
      {
        title: "La Francia ocupada y la zona libre",
        content:
          "Tras la derrota de 1940, Francia quedo dividida en una zona norte ocupada por los nazis y una zona sur gobernada por el regimen de Vichy. La 'ligne de demarcation' (linea de demarcacion) separaba ambas zonas. Cruzarla clandestinamente, como en la pelicula, era peligroso y frecuente.",
      },
      {
        title: "Bourvil y de Funes: la pareja comica",
        content:
          "Bourvil y Louis de Funes son los dos comicos mas populares del cine frances clasico. La Grande Vadrouille fue la primera vez que trabajaron juntos y la pelicula mantuvo el record de taquilla frances durante 42 anos (17 millones de espectadores) hasta ser superada por Bienvenue chez les Ch'tis.",
      },
      {
        title: "El humor sobre la guerra",
        content:
          "En 1966, solo 21 anos despues del fin de la guerra, hacer una comedia sobre la Ocupacion era atrevido. La pelicula elige el humor para tratar un trauma colectivo, mostrando a franceses ordinarios que se convierten en heroes a su pesar. Este enfoque fue aceptado con entusiasmo por el publico.",
      },
    ],
    quiz: [
      {
        question: "En que epoca se situa la pelicula?",
        options: ["Primera Guerra Mundial", "Ocupacion nazi", "Mayo del 68", "Posguerra"],
        correctIdx: 1,
      },
      {
        question: "A quienes ayudan los protagonistas?",
        options: ["A prisioneros franceses", "A aviadores britanicos", "A espias rusos", "A refugiados judios"],
        correctIdx: 1,
      },
      {
        question: "Que significa 'deguisement'?",
        options: ["Desguace", "Disfraz", "Disgusto", "Desorden"],
        correctIdx: 1,
      },
    ],
    level: "B1",
    genre: "Comedie d'aventure",
  },
];

export function getFilmBySlug(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}
