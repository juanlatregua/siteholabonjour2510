export interface QuizQuestionData {
  text: string;
  textFr?: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface QuizWeekData {
  weekNumber: number;
  theme: string;
  title: string;
  questions: QuizQuestionData[];
}

export const quizWeeks: QuizWeekData[] = [
  {
    weekNumber: 1,
    theme: "Gastronomie",
    title: "Les delices de la table francaise",
    questions: [
      {
        text: "Cual es el ingrediente principal del ratatouille?",
        textFr: "Quel est l'ingredient principal de la ratatouille ?",
        options: ["Berenjena", "Patata", "Zanahoria", "Espinaca"],
        correctIdx: 0,
        explanation:
          "La ratatouille es un plato provenzal a base de berenjena, calabacin, tomate y pimiento.",
      },
      {
        text: "Que tipo de queso es el Roquefort?",
        textFr: "Quel type de fromage est le Roquefort ?",
        options: [
          "Queso de cabra",
          "Queso azul de oveja",
          "Queso fresco de vaca",
          "Queso curado de cabra",
        ],
        correctIdx: 1,
        explanation:
          "El Roquefort es un queso azul elaborado con leche cruda de oveja en las cuevas de Roquefort-sur-Soulzon.",
      },
      {
        text: "Que es un croque-monsieur?",
        textFr: "Qu'est-ce qu'un croque-monsieur ?",
        options: [
          "Un sandwich caliente de jamon y queso gratinado",
          "Una sopa de cebolla",
          "Un crepe salado",
          "Un pastel de carne",
        ],
        correctIdx: 0,
        explanation:
          "El croque-monsieur es un sandwich caliente de jamon y queso gratinado, tipico de los bistrots parisinos.",
      },
      {
        text: "Que region francesa es famosa por la quiche?",
        textFr: "Quelle region francaise est celebre pour la quiche ?",
        options: ["Bretana", "Lorena", "Provenza", "Alsacia"],
        correctIdx: 1,
        explanation:
          "La quiche Lorraine es originaria de la region de Lorena, al noreste de Francia.",
      },
      {
        text: "Como se llama el postre frances hecho con hojaldre y crema pastelera?",
        textFr:
          "Comment s'appelle le dessert francais fait avec de la pate feuilletee et de la creme patissiere ?",
        options: ["Tarte tatin", "Mille-feuille", "Creme brulee", "Eclair"],
        correctIdx: 1,
        explanation:
          "El mille-feuille (milhojas) se compone de tres capas de hojaldre alternadas con crema pastelera.",
      },
    ],
  },
  {
    weekNumber: 2,
    theme: "Geographie",
    title: "Decouvrir la France",
    questions: [
      {
        text: "Cual es el rio mas largo de Francia?",
        textFr: "Quel est le plus long fleuve de France ?",
        options: ["El Sena", "El Garona", "El Loira", "El Rodano"],
        correctIdx: 2,
        explanation:
          "El Loira es el rio mas largo de Francia con 1.012 km. Atraviesa el famoso Valle del Loira.",
      },
      {
        text: "Cuantas regiones metropolitanas tiene Francia actualmente?",
        textFr:
          "Combien de regions metropolitaines la France compte-t-elle actuellement ?",
        options: ["13", "18", "22", "26"],
        correctIdx: 0,
        explanation:
          "Desde la reforma territorial de 2016, Francia metropolitana cuenta con 13 regiones.",
      },
      {
        text: "Que montana separa Francia de Espana?",
        textFr: "Quelle montagne separe la France de l'Espagne ?",
        options: ["Los Alpes", "Los Pirineos", "El Macizo Central", "Los Vosgos"],
        correctIdx: 1,
        explanation:
          "Los Pirineos forman la frontera natural entre Francia y Espana, extendiendose desde el Atlantico hasta el Mediterraneo.",
      },
      {
        text: "Que departamento frances de ultramar esta en Sudamerica?",
        textFr:
          "Quel departement francais d'outre-mer se trouve en Amerique du Sud ?",
        options: ["Guadalupe", "Reunion", "Guayana Francesa", "Mayotte"],
        correctIdx: 2,
        explanation:
          "La Guayana Francesa es un departamento de ultramar situado en la costa norte de Sudamerica.",
      },
      {
        text: "Que ciudad francesa es famosa por su festival de cine?",
        textFr:
          "Quelle ville francaise est celebre pour son festival de cinema ?",
        options: ["Niza", "Cannes", "Marsella", "Burdeos"],
        correctIdx: 1,
        explanation:
          "El Festival de Cannes, creado en 1946, es uno de los festivales de cine mas prestigiosos del mundo.",
      },
    ],
  },
  {
    weekNumber: 3,
    theme: "Cinema",
    title: "Le septieme art francais",
    questions: [
      {
        text: "Quien dirigio la pelicula 'Amelie' (Le Fabuleux Destin d'Amelie Poulain)?",
        textFr: "Qui a realise le film 'Amelie' ?",
        options: [
          "Luc Besson",
          "Jean-Pierre Jeunet",
          "Francois Truffaut",
          "Jacques Audiard",
        ],
        correctIdx: 1,
        explanation:
          "Jean-Pierre Jeunet dirigio 'Amelie' en 2001, con Audrey Tautou en el papel principal. La pelicula se convirtio en un fenomeno mundial.",
      },
      {
        text: "Que movimiento cinematografico nacio en Francia en los anos 50-60?",
        textFr:
          "Quel mouvement cinematographique est ne en France dans les annees 50-60 ?",
        options: [
          "El expresionismo",
          "La Nouvelle Vague",
          "El neorrealismo",
          "El surrealismo",
        ],
        correctIdx: 1,
        explanation:
          "La Nouvelle Vague revoluciono el cine con directores como Godard, Truffaut y Rohmer, rompiendo con las convenciones narrativas clasicas.",
      },
      {
        text: "Que pelicula francesa gano el Oscar a Mejor Pelicula en 2012?",
        textFr:
          "Quel film francais a remporte l'Oscar du Meilleur Film en 2012 ?",
        options: ["Intouchables", "The Artist", "Amour", "La Vie en Rose"],
        correctIdx: 1,
        explanation:
          "The Artist, de Michel Hazanavicius, fue la primera pelicula francesa (y muda) en ganar el Oscar a Mejor Pelicula.",
      },
      {
        text: "Quienes son los hermanos que inventaron el cinematografo?",
        textFr: "Qui sont les freres qui ont invente le cinematographe ?",
        options: [
          "Los hermanos Dardenne",
          "Los hermanos Lumiere",
          "Los hermanos Melies",
          "Los hermanos Pathe",
        ],
        correctIdx: 1,
        explanation:
          "Auguste y Louis Lumiere patentaron el cinematografo en 1895 y realizaron la primera proyeccion publica de cine en Paris.",
      },
      {
        text: "Que actor frances protagonizo 'Leon: The Professional'?",
        textFr: "Quel acteur francais a joue dans 'Leon' ?",
        options: [
          "Gerard Depardieu",
          "Jean Reno",
          "Vincent Cassel",
          "Omar Sy",
        ],
        correctIdx: 1,
        explanation:
          "Jean Reno interpreto al asesino a sueldo Leon en la pelicula de Luc Besson de 1994.",
      },
    ],
  },
  {
    weekNumber: 4,
    theme: "Histoire",
    title: "Les grandes dates de l'Histoire de France",
    questions: [
      {
        text: "En que ano comenzo la Revolucion Francesa?",
        textFr: "En quelle annee la Revolution francaise a-t-elle commence ?",
        options: ["1776", "1789", "1799", "1804"],
        correctIdx: 1,
        explanation:
          "La Revolucion Francesa comenzo en 1789 con la toma de la Bastilla el 14 de julio, fecha que se celebra como fiesta nacional.",
      },
      {
        text: "Quien fue coronado primer emperador de Francia en 1804?",
        textFr: "Qui a ete couronne premier Empereur des Francais en 1804 ?",
        options: [
          "Luis XVI",
          "Carlos de Gaulle",
          "Napoleon Bonaparte",
          "Carlomagno",
        ],
        correctIdx: 2,
        explanation:
          "Napoleon Bonaparte se corono emperador en la catedral de Notre-Dame de Paris el 2 de diciembre de 1804.",
      },
      {
        text: "Que acontecimiento historico se celebra el 14 de julio en Francia?",
        textFr: "Quel evenement historique celebre-t-on le 14 juillet en France ?",
        options: [
          "La firma de la Constitucion",
          "La toma de la Bastilla",
          "El final de la Primera Guerra Mundial",
          "La coronacion de Luis XIV",
        ],
        correctIdx: 1,
        explanation:
          "El 14 de julio conmemora la toma de la Bastilla en 1789, simbolo del fin del absolutismo.",
      },
      {
        text: "En que ano se fundo la V Republica Francesa?",
        textFr: "En quelle annee la Ve Republique francaise a-t-elle ete fondee ?",
        options: ["1946", "1952", "1958", "1962"],
        correctIdx: 2,
        explanation:
          "La V Republica fue fundada en 1958 por Charles de Gaulle, estableciendo el actual sistema semipresidencial.",
      },
      {
        text: "Que reina francesa de origen austriaco fue ejecutada durante la Revolucion?",
        textFr:
          "Quelle reine francaise d'origine autrichienne a ete executee pendant la Revolution ?",
        options: [
          "Catalina de Medicis",
          "Maria Antonieta",
          "Juana de Arco",
          "Ana de Austria",
        ],
        correctIdx: 1,
        explanation:
          "Maria Antonieta, esposa de Luis XVI, fue ejecutada en la guillotina el 16 de octubre de 1793.",
      },
    ],
  },
  {
    weekNumber: 5,
    theme: "Musique",
    title: "La musique francaise a travers les epoques",
    questions: [
      {
        text: "Quien es considerada la 'gorrion' de Paris?",
        textFr: "Qui est surnommee 'la Mome Piaf' ?",
        options: [
          "Dalida",
          "Edith Piaf",
          "Mireille Mathieu",
          "Juliette Greco",
        ],
        correctIdx: 1,
        explanation:
          "Edith Piaf, apodada 'La Mome Piaf' (el gorrion), es una de las cantantes mas emblematicas de Francia, conocida por 'La Vie en Rose' y 'Non, je ne regrette rien'.",
      },
      {
        text: "Que duo frances de musica electronica creo el album 'Random Access Memories'?",
        textFr:
          "Quel duo francais de musique electronique a cree l'album 'Random Access Memories' ?",
        options: ["Air", "Justice", "Daft Punk", "Phoenix"],
        correctIdx: 2,
        explanation:
          "Daft Punk, formado por Thomas Bangalter y Guy-Manuel de Homem-Christo, gano el Grammy a Album del Ano en 2014 con este disco.",
      },
      {
        text: "Que genero musical nacido en Francia mezcla hip-hop con sonidos africanos y caribenos?",
        textFr:
          "Quel genre musical ne en France melange hip-hop avec des sons africains et caribeens ?",
        options: [
          "Chanson francaise",
          "French touch",
          "Rap francais",
          "Zouk",
        ],
        correctIdx: 2,
        explanation:
          "El rap frances tiene una escena muy activa con artistas como MC Solaar, IAM y Stromae, incorporando influencias multiculturales.",
      },
      {
        text: "Que compositor frances escribio 'Bolero', una de las obras mas interpretadas del mundo?",
        textFr:
          "Quel compositeur francais a ecrit 'Bolero', une des oeuvres les plus jouees au monde ?",
        options: [
          "Claude Debussy",
          "Camille Saint-Saens",
          "Maurice Ravel",
          "Hector Berlioz",
        ],
        correctIdx: 2,
        explanation:
          "Maurice Ravel compuso 'Bolero' en 1928. La pieza es famosa por su crescendo continuo sobre un unico tema repetido.",
      },
      {
        text: "Que cantante francobelga es conocido por 'Formidable' y 'Papaoutai'?",
        textFr:
          "Quel chanteur franco-belge est connu pour 'Formidable' et 'Papaoutai' ?",
        options: ["Maitre Gims", "Stromae", "Zaz", "Angele"],
        correctIdx: 1,
        explanation:
          "Stromae (Paul Van Haver) es un artista belga que canta en frances y se ha convertido en un fenomeno musical internacional.",
      },
    ],
  },
  {
    weekNumber: 6,
    theme: "Art",
    title: "L'art francais et ses chefs-d'oeuvre",
    questions: [
      {
        text: "En que museo de Paris se encuentra la Mona Lisa?",
        textFr: "Dans quel musee de Paris se trouve la Joconde ?",
        options: [
          "Musee d'Orsay",
          "Centre Pompidou",
          "Musee du Louvre",
          "Musee Rodin",
        ],
        correctIdx: 2,
        explanation:
          "La Mona Lisa (La Joconde) de Leonardo da Vinci se expone en el Museo del Louvre desde 1797.",
      },
      {
        text: "Que movimiento artistico liderado por Monet nacio en Francia?",
        textFr:
          "Quel mouvement artistique mene par Monet est ne en France ?",
        options: [
          "Cubismo",
          "Impresionismo",
          "Surrealismo",
          "Romanticismo",
        ],
        correctIdx: 1,
        explanation:
          "El Impresionismo nacio en Francia hacia 1870 con pintores como Monet, Renoir, Degas y Cezanne. El nombre proviene del cuadro 'Impression, soleil levant' de Monet.",
      },
      {
        text: "Que escultor frances creo 'El Pensador'?",
        textFr: "Quel sculpteur francais a cree 'Le Penseur' ?",
        options: [
          "Camille Claudel",
          "Auguste Rodin",
          "Alberto Giacometti",
          "Edgar Degas",
        ],
        correctIdx: 1,
        explanation:
          "Auguste Rodin creo 'El Pensador' en 1880. Originalmente formaba parte de la 'Puerta del Infierno'.",
      },
      {
        text: "Que artista postimpresionista se mudo a Tahiti para pintar?",
        textFr:
          "Quel artiste postimpressionniste s'est installe a Tahiti pour peindre ?",
        options: [
          "Henri Matisse",
          "Paul Gauguin",
          "Henri Toulouse-Lautrec",
          "Georges Seurat",
        ],
        correctIdx: 1,
        explanation:
          "Paul Gauguin viajo a Tahiti en 1891 buscando un arte mas primitivo y puro. Alli creo algunas de sus obras mas famosas.",
      },
      {
        text: "Que museo de Paris esta dedicado al arte impresionista?",
        textFr:
          "Quel musee de Paris est consacre a l'art impressionniste ?",
        options: [
          "Musee du Louvre",
          "Musee de l'Orangerie",
          "Musee d'Orsay",
          "Grand Palais",
        ],
        correctIdx: 2,
        explanation:
          "El Musee d'Orsay, instalado en una antigua estacion de tren, alberga la mayor coleccion de arte impresionista y postimpresionista del mundo.",
      },
    ],
  },
  {
    weekNumber: 7,
    theme: "Litterature",
    title: "Les grands ecrivains francais",
    questions: [
      {
        text: "Quien escribio 'Los Miserables'?",
        textFr: "Qui a ecrit 'Les Miserables' ?",
        options: [
          "Emile Zola",
          "Victor Hugo",
          "Gustave Flaubert",
          "Alexandre Dumas",
        ],
        correctIdx: 1,
        explanation:
          "Victor Hugo publico 'Los Miserables' en 1862. La novela es una de las obras mas importantes de la literatura francesa.",
      },
      {
        text: "Que escritor frances creo al personaje de 'El Principito'?",
        textFr:
          "Quel ecrivain francais a cree le personnage du 'Petit Prince' ?",
        options: [
          "Albert Camus",
          "Antoine de Saint-Exupery",
          "Marcel Proust",
          "Jules Verne",
        ],
        correctIdx: 1,
        explanation:
          "Antoine de Saint-Exupery publico 'El Principito' en 1943. Es el libro en frances mas traducido del mundo.",
      },
      {
        text: "Que novela de Proust comienza con una famosa escena de la magdalena?",
        textFr:
          "Quel roman de Proust commence par une celebre scene de la madeleine ?",
        options: [
          "Du cote de chez Swann",
          "Le Temps retrouve",
          "A l'ombre des jeunes filles en fleurs",
          "Sodome et Gomorrhe",
        ],
        correctIdx: 0,
        explanation:
          "'Du cote de chez Swann' (Por el camino de Swann, 1913) es el primer tomo de 'En busca del tiempo perdido' y contiene la celebre escena de la magdalena mojada en te.",
      },
      {
        text: "Que escritora francesa y feminista escribio 'El segundo sexo'?",
        textFr: "Quelle ecrivaine francaise et feministe a ecrit 'Le Deuxieme Sexe' ?",
        options: [
          "Colette",
          "Marguerite Duras",
          "Simone de Beauvoir",
          "George Sand",
        ],
        correctIdx: 2,
        explanation:
          "Simone de Beauvoir publico 'El segundo sexo' en 1949, obra fundacional del feminismo moderno.",
      },
      {
        text: "Quien escribio 'El Conde de Montecristo'?",
        textFr: "Qui a ecrit 'Le Comte de Monte-Cristo' ?",
        options: [
          "Victor Hugo",
          "Honore de Balzac",
          "Alexandre Dumas",
          "Stendhal",
        ],
        correctIdx: 2,
        explanation:
          "Alexandre Dumas publico 'El Conde de Montecristo' entre 1844 y 1846. Es una de las novelas de aventuras mas famosas de todos los tiempos.",
      },
    ],
  },
  {
    weekNumber: 8,
    theme: "Vie quotidienne",
    title: "La vie a la francaise",
    questions: [
      {
        text: "A que hora suelen cenar los franceses?",
        textFr: "A quelle heure les Francais dinent-ils generalement ?",
        options: [
          "Entre las 18h y las 19h",
          "Entre las 19h30 y las 20h30",
          "Entre las 21h y las 22h",
          "Entre las 17h y las 18h",
        ],
        correctIdx: 1,
        explanation:
          "Los franceses suelen cenar entre las 19h30 y las 20h30, mas temprano que en Espana pero mas tarde que en paises anglosajones.",
      },
      {
        text: "Que se dice en Francia al brindar?",
        textFr: "Que dit-on en France quand on trinque ?",
        options: ["Bon appetit !", "Sante !", "A la votre !", "Tchin-tchin !"],
        correctIdx: 3,
        explanation:
          "Aunque 'Sante !' y 'A la votre !' tambien se usan, 'Tchin-tchin !' es la forma mas informal y popular de brindar en Francia.",
      },
      {
        text: "Cuantos besos se dan los franceses al saludarse (en la mayoria de regiones)?",
        textFr:
          "Combien de bises se font les Francais pour se saluer (dans la plupart des regions) ?",
        options: ["Uno", "Dos", "Tres", "Cuatro"],
        correctIdx: 1,
        explanation:
          "En la mayoria de regiones de Francia se dan dos besos (la bise), aunque en el sur pueden ser tres o cuatro.",
      },
      {
        text: "Que es un 'apero' en la cultura francesa?",
        textFr: "Qu'est-ce qu'un 'apero' dans la culture francaise ?",
        options: [
          "El desayuno",
          "Una bebida y aperitivos antes de cenar",
          "La merienda",
          "Un postre especial",
        ],
        correctIdx: 1,
        explanation:
          "El 'apero' (aperitif) es un momento social muy importante en Francia donde se comparten bebidas y aperitivos antes de la comida o la cena.",
      },
      {
        text: "Que dia de la semana los comercios tradicionales suelen cerrar en Francia?",
        textFr:
          "Quel jour de la semaine les commerces traditionnels ferment-ils souvent en France ?",
        options: ["Sabado", "Lunes", "Domingo", "Miercoles"],
        correctIdx: 2,
        explanation:
          "En Francia, muchos comercios tradicionales cierran el domingo. Aunque la ley ha evolucionado, el descanso dominical sigue siendo muy respetado.",
      },
    ],
  },
];
