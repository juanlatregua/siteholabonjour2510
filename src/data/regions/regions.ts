export interface RegionVocab {
  french: string;
  spanish: string;
  context: string;
}

export interface FunFact {
  title: string;
  content: string;
}

export interface RegionQuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
}

export interface Region {
  name: string;
  slug: string;
  capital: string;
  description: string; // in Spanish
  descriptionFr: string; // in French
  population: string;
  specialties: string[]; // food/drink specialties
  vocab: RegionVocab[];
  funFacts: FunFact[];
  quiz: RegionQuizQuestion[];
  color: string; // hex color for map
}

export const regions: Region[] = [
  {
    name: "Ile-de-France",
    slug: "ile-de-france",
    capital: "Paris",
    description:
      "La region capital de Francia, hogar de Paris, la Ciudad de la Luz. Centro politico, economico y cultural del pais, con monumentos iconicos como la Torre Eiffel, el Louvre y Notre-Dame. Es la region mas poblada de Francia y un destino imprescindible para todo estudiante de frances.",
    descriptionFr:
      "La region capitale de la France, berceau de Paris, la Ville Lumiere. Centre politique, economique et culturel du pays, avec des monuments emblematiques comme la tour Eiffel, le Louvre et Notre-Dame. C'est la region la plus peuplee de France et une destination incontournable.",
    population: "12,3 millones",
    specialties: [
      "Croque-monsieur",
      "Paris-Brest",
      "Brie de Meaux",
      "Flan parisien",
    ],
    vocab: [
      {
        french: "le metro",
        spanish: "el metro",
        context: "Je prends le metro pour aller au travail.",
      },
      {
        french: "un arrondissement",
        spanish: "un distrito",
        context: "Paris est divise en vingt arrondissements.",
      },
      {
        french: "la banlieue",
        spanish: "los suburbios",
        context: "Beaucoup de gens vivent en banlieue et travaillent a Paris.",
      },
      {
        french: "un musee",
        spanish: "un museo",
        context: "Le Louvre est le musee le plus visite au monde.",
      },
      {
        french: "une terrasse",
        spanish: "una terraza",
        context: "On s'assoit en terrasse pour boire un cafe.",
      },
      {
        french: "un bouquiniste",
        spanish: "un librero de viejo",
        context: "Les bouquinistes vendent des livres le long de la Seine.",
      },
    ],
    funFacts: [
      {
        title: "La Torre Eiffel crece",
        content:
          "La Torre Eiffel puede crecer hasta 15 cm en verano debido a la expansion termica del metal.",
      },
      {
        title: "El metro de Paris",
        content:
          "El metro de Paris tiene 16 lineas y mas de 300 estaciones, siendo uno de los mas densos del mundo.",
      },
      {
        title: "La ciudad subterranea",
        content:
          "Bajo Paris hay mas de 300 km de tuneles que forman las famosas catacumbas, donde descansan los restos de millones de personas.",
      },
    ],
    quiz: [
      {
        question: "Cual es el museo mas visitado del mundo, ubicado en Paris?",
        options: ["Musee d'Orsay", "Le Louvre", "Centre Pompidou", "Musee Rodin"],
        correctIdx: 1,
      },
      {
        question: "Cuantos arrondissements tiene Paris?",
        options: ["10", "15", "20", "25"],
        correctIdx: 2,
      },
      {
        question: "Como se dice 'metro' en frances?",
        options: ["le train", "le metro", "le bus", "le tramway"],
        correctIdx: 1,
      },
    ],
    color: "#2d5f8a",
  },
  {
    name: "Auvergne-Rhone-Alpes",
    slug: "auvergne-rhone-alpes",
    capital: "Lyon",
    description:
      "Region de contrastes entre volcanes y altas montanas. Lyon, su capital, es considerada la capital gastronomica de Francia. Aqui se encuentran los Alpes franceses con estaciones de esqui de fama mundial como Chamonix, y la cadena de volcanes de Auvernia.",
    descriptionFr:
      "Region de contrastes entre volcans et hautes montagnes. Lyon, sa capitale, est consideree comme la capitale gastronomique de la France. On y trouve les Alpes francaises avec des stations de ski mondialement connues comme Chamonix, et la chaine des volcans d'Auvergne.",
    population: "8,1 millones",
    specialties: [
      "Quenelle de brochet",
      "Saucisson de Lyon",
      "Saint-Marcellin",
      "Tarte aux pralines",
    ],
    vocab: [
      {
        french: "la montagne",
        spanish: "la montana",
        context: "Les Alpes sont les plus hautes montagnes de France.",
      },
      {
        french: "un volcan",
        spanish: "un volcan",
        context: "La chaine des Puys compte plus de quatre-vingts volcans.",
      },
      {
        french: "une station de ski",
        spanish: "una estacion de esqui",
        context: "Chamonix est une station de ski celebre.",
      },
      {
        french: "un bouchon",
        spanish: "un restaurante tipico lionees",
        context: "On mange tres bien dans les bouchons lyonnais.",
      },
      {
        french: "la gastronomie",
        spanish: "la gastronomia",
        context: "Lyon est la capitale de la gastronomie francaise.",
      },
    ],
    funFacts: [
      {
        title: "Capital gastronomica",
        content:
          "Lyon tiene la mayor densidad de restaurantes por habitante en Francia y es cuna de Paul Bocuse, padre de la nouvelle cuisine.",
      },
      {
        title: "Mont Blanc",
        content:
          "El Mont Blanc, en los Alpes, es la montana mas alta de Europa occidental con 4.807 metros.",
      },
      {
        title: "Volcanes dormidos",
        content:
          "La cadena de volcanes de Auvernia (Chaine des Puys) es Patrimonio Mundial de la UNESCO y sus volcanes estan dormidos desde hace unos 6.000 anos.",
      },
    ],
    quiz: [
      {
        question: "Cual es la capital gastronomica de Francia?",
        options: ["Paris", "Lyon", "Bordeaux", "Marseille"],
        correctIdx: 1,
      },
      {
        question: "Que es un 'bouchon' en Lyon?",
        options: [
          "Un corcho de botella",
          "Un atasco de trafico",
          "Un restaurante tipico liones",
          "Un tipo de pan",
        ],
        correctIdx: 2,
      },
      {
        question: "Cual es la montana mas alta de los Alpes franceses?",
        options: [
          "Mont Ventoux",
          "Puy de Dome",
          "Mont Blanc",
          "Aiguille du Midi",
        ],
        correctIdx: 2,
      },
    ],
    color: "#722f37",
  },
  {
    name: "Bourgogne-Franche-Comte",
    slug: "bourgogne-franche-comte",
    capital: "Dijon",
    description:
      "Tierra de vinos legendarios y mostaza. La Borgona es famosa por sus vinedos, clasificados como Patrimonio de la UNESCO, y su rica tradicion culinaria. Dijon, la capital, es conocida mundialmente por su mostaza. La region tambien alberga el Jura, con sus paisajes montanosos.",
    descriptionFr:
      "Terre de vins legendaires et de moutarde. La Bourgogne est celebre pour ses vignobles, classes au patrimoine mondial de l'UNESCO, et sa riche tradition culinaire. Dijon, la capitale, est mondialement connue pour sa moutarde. La region abrite aussi le Jura et ses paysages montagneux.",
    population: "2,8 millones",
    specialties: [
      "Boeuf bourguignon",
      "Escargots de Bourgogne",
      "Moutarde de Dijon",
      "Epoisses",
      "Vin de Bourgogne",
    ],
    vocab: [
      {
        french: "le vignoble",
        spanish: "el vinedo",
        context: "Les vignobles de Bourgogne produisent des vins exceptionnels.",
      },
      {
        french: "la moutarde",
        spanish: "la mostaza",
        context: "La moutarde de Dijon est connue dans le monde entier.",
      },
      {
        french: "un escargot",
        spanish: "un caracol",
        context: "Les escargots de Bourgogne sont un plat traditionnel.",
      },
      {
        french: "une degustation",
        spanish: "una degustacion",
        context: "On peut faire une degustation de vins dans les caves.",
      },
      {
        french: "le patrimoine",
        spanish: "el patrimonio",
        context: "Les climats de Bourgogne sont inscrits au patrimoine mondial.",
      },
    ],
    funFacts: [
      {
        title: "Climats de Borgona",
        content:
          "Los 'climats' de Borgona son parcelas de vinedos con condiciones unicas, reconocidas por la UNESCO. Hay mas de 1.200 climats diferentes.",
      },
      {
        title: "Los Duques de Borgona",
        content:
          "En la Edad Media, los Duques de Borgona rivalizaban en poder y riqueza con los reyes de Francia. Su palacio en Dijon es hoy el Museo de Bellas Artes.",
      },
      {
        title: "Escargots",
        content:
          "Francia consume alrededor de 30.000 toneladas de caracoles al ano, y la receta mas famosa es la de los escargots de Bourgogne, con mantequilla, ajo y perejil.",
      },
    ],
    quiz: [
      {
        question: "Por que producto es mundialmente famosa Dijon?",
        options: ["El vino", "La mostaza", "El queso", "El pan"],
        correctIdx: 1,
      },
      {
        question: "Como se dice 'vinedo' en frances?",
        options: ["le vin", "la vigne", "le vignoble", "le raisin"],
        correctIdx: 2,
      },
      {
        question: "Que son los 'climats' de Borgona?",
        options: [
          "Las condiciones meteorologicas",
          "Parcelas de vinedos unicas",
          "Tipos de uva",
          "Festivales locales",
        ],
        correctIdx: 1,
      },
    ],
    color: "#8B4513",
  },
  {
    name: "Bretagne",
    slug: "bretagne",
    capital: "Rennes",
    description:
      "Peninsula en el extremo noroeste de Francia, con una fuerte identidad cultural celta. Bretana es famosa por sus costas espectaculares, sus crepes y galettes, y su herencia bretona unica. La region tiene su propia lengua (el breton) y tradiciones musicales vibrantes.",
    descriptionFr:
      "Peninsule a l'extreme nord-ouest de la France, avec une forte identite culturelle celte. La Bretagne est celebre pour ses cotes spectaculaires, ses crepes et galettes, et son heritage breton unique. La region a sa propre langue (le breton) et des traditions musicales vibrantes.",
    population: "3,4 millones",
    specialties: [
      "Crepes et galettes",
      "Kouign-amann",
      "Cidre breton",
      "Fruits de mer",
      "Far breton",
    ],
    vocab: [
      {
        french: "une crepe",
        spanish: "una crepa",
        context: "En Bretagne, on mange des crepes avec du cidre.",
      },
      {
        french: "une galette",
        spanish: "una galette (crepa de trigo sarraceno)",
        context: "La galette bretonne est faite avec de la farine de sarrasin.",
      },
      {
        french: "le cidre",
        spanish: "la sidra",
        context: "Le cidre est la boisson traditionnelle de Bretagne.",
      },
      {
        french: "la maree",
        spanish: "la marea",
        context: "Les marees sont tres fortes sur les cotes bretonnes.",
      },
      {
        french: "un phare",
        spanish: "un faro",
        context: "Il y a de nombreux phares le long de la cote bretonne.",
      },
    ],
    funFacts: [
      {
        title: "Las mareas de Mont-Saint-Michel",
        content:
          "La bahia de Mont-Saint-Michel, en la frontera de Bretana y Normandia, tiene las mareas mas grandes de Europa continental, con diferencias de hasta 15 metros.",
      },
      {
        title: "Lengua bretona",
        content:
          "El breton es una lengua celta, emparentada con el gales y el cornualles. Aun hoy, unas 200.000 personas lo hablan.",
      },
      {
        title: "Costa de granito rosa",
        content:
          "La Cote de Granit Rose es un tramo de costa unico en el mundo donde las rocas tienen un color rosa natural debido a su composicion mineral.",
      },
    ],
    quiz: [
      {
        question: "Cual es la bebida tradicional de Bretana?",
        options: ["El vino", "La cerveza", "La sidra", "El champan"],
        correctIdx: 2,
      },
      {
        question:
          "Con que harina se hace la galette bretonne?",
        options: [
          "Harina de trigo",
          "Harina de trigo sarraceno",
          "Harina de maiz",
          "Harina de centeno",
        ],
        correctIdx: 1,
      },
      {
        question: "A que familia linguistica pertenece el breton?",
        options: ["Romance", "Germanica", "Celta", "Escandinava"],
        correctIdx: 2,
      },
    ],
    color: "#1a5276",
  },
  {
    name: "Centre-Val de Loire",
    slug: "centre-val-de-loire",
    capital: "Orleans",
    description:
      "El jardin de Francia, famoso por sus majestuosos castillos del Loira. Esta region alberga mas de 300 chateaux, incluyendo Chambord, Chenonceau y Amboise. El valle del Loira, Patrimonio de la UNESCO, es conocido por sus vinos, sus jardines y su frances considerado el mas puro del pais.",
    descriptionFr:
      "Le jardin de la France, celebre pour ses majestueux chateaux de la Loire. Cette region abrite plus de 300 chateaux, dont Chambord, Chenonceau et Amboise. La vallee de la Loire, patrimoine mondial de l'UNESCO, est connue pour ses vins, ses jardins et son francais considere comme le plus pur du pays.",
    population: "2,6 millones",
    specialties: [
      "Tarte Tatin",
      "Rillettes de Tours",
      "Vins de Loire (Sancerre, Vouvray)",
      "Pithiviers",
    ],
    vocab: [
      {
        french: "un chateau",
        spanish: "un castillo",
        context: "Le chateau de Chambord est le plus grand chateau de la Loire.",
      },
      {
        french: "un jardin",
        spanish: "un jardin",
        context: "Les jardins de Villandry sont magnifiques.",
      },
      {
        french: "la Renaissance",
        spanish: "el Renacimiento",
        context: "Les chateaux de la Loire datent de la Renaissance.",
      },
      {
        french: "un fleuve",
        spanish: "un rio (grande)",
        context: "La Loire est le plus long fleuve de France.",
      },
      {
        french: "une vendange",
        spanish: "una vendimia",
        context: "Les vendanges ont lieu en automne dans la vallee de la Loire.",
      },
    ],
    funFacts: [
      {
        title: "El frances mas puro",
        content:
          "Se dice que en Touraine (Tours) se habla el frances mas puro y sin acento regional, razon por la cual muchos estudiantes eligen esta zona para aprender frances.",
      },
      {
        title: "Chambord",
        content:
          "El Chateau de Chambord tiene 440 habitaciones, 365 chimeneas y una escalera de doble helice atribuida a Leonardo da Vinci.",
      },
      {
        title: "El rio mas largo",
        content:
          "El Loira es el rio mas largo de Francia con 1.012 km. Es el ultimo gran rio salvaje de Europa, sin presas importantes.",
      },
    ],
    quiz: [
      {
        question: "Cual es el rio mas largo de Francia?",
        options: ["El Sena", "El Rodano", "El Loira", "El Garona"],
        correctIdx: 2,
      },
      {
        question: "Como se dice 'castillo' en frances?",
        options: ["un palais", "un chateau", "une forteresse", "un manoir"],
        correctIdx: 1,
      },
      {
        question: "Que famoso inventor habria disenado la escalera de Chambord?",
        options: [
          "Miguel Angel",
          "Leonardo da Vinci",
          "Rafael",
          "Gustave Eiffel",
        ],
        correctIdx: 1,
      },
    ],
    color: "#27ae60",
  },
  {
    name: "Corse",
    slug: "corse",
    capital: "Ajaccio",
    description:
      "La Isla de la Belleza, una isla mediterranea con montanas espectaculares y playas paradisiacas. Corcega tiene una cultura unica que mezcla influencias francesas e italianas. Es la cuna de Napoleon Bonaparte y ofrece paisajes que van desde cumbres nevadas hasta aguas turquesas.",
    descriptionFr:
      "L'Ile de Beaute, une ile mediterraneenne aux montagnes spectaculaires et aux plages paradisiaques. La Corse possede une culture unique melant influences francaises et italiennes. C'est le berceau de Napoleon Bonaparte et elle offre des paysages allant des sommets enneiges aux eaux turquoise.",
    population: "350.000",
    specialties: [
      "Brocciu (queso corso)",
      "Figatellu (embutido)",
      "Fiadone (tarta de brocciu)",
      "Vins corses",
      "Chataignes (castanas)",
    ],
    vocab: [
      {
        french: "une ile",
        spanish: "una isla",
        context: "La Corse est la plus grande ile francaise de Mediterranee.",
      },
      {
        french: "le maquis",
        spanish: "el matorral mediterraneo",
        context: "Le maquis corse est un paysage typique de l'ile.",
      },
      {
        french: "une plage",
        spanish: "una playa",
        context: "Les plages de Corse ont une eau cristalline.",
      },
      {
        french: "un sentier",
        spanish: "un sendero",
        context: "Le GR20 est le sentier de randonnee le plus difficile d'Europe.",
      },
      {
        french: "le berceau",
        spanish: "la cuna",
        context: "Ajaccio est le berceau de Napoleon Bonaparte.",
      },
    ],
    funFacts: [
      {
        title: "Napoleon Bonaparte",
        content:
          "Napoleon nacio en Ajaccio en 1769, apenas un ano despues de que Francia comprara Corcega a Genova. Su casa natal es hoy un museo.",
      },
      {
        title: "El GR20",
        content:
          "El GR20 es una ruta de senderismo de 180 km que atraviesa Corcega de norte a sur. Esta considerado el sendero de gran recorrido mas dificil de Europa.",
      },
      {
        title: "Reserva natural de Scandola",
        content:
          "La Reserva de Scandola, Patrimonio de la UNESCO, es una de las reservas naturales marinas y terrestres mas bellas del Mediterraneo.",
      },
    ],
    quiz: [
      {
        question: "Quien nacio en Ajaccio, capital de Corcega?",
        options: [
          "Victor Hugo",
          "Napoleon Bonaparte",
          "Louis XIV",
          "Charles de Gaulle",
        ],
        correctIdx: 1,
      },
      {
        question: "Como se llama el sendero de senderismo mas famoso de Corcega?",
        options: [
          "Camino de Santiago",
          "Tour du Mont Blanc",
          "GR20",
          "Sentier des Douaniers",
        ],
        correctIdx: 2,
      },
      {
        question: "Como se dice 'isla' en frances?",
        options: ["une plage", "un ilot", "une ile", "un continent"],
        correctIdx: 2,
      },
    ],
    color: "#e67e22",
  },
  {
    name: "Grand Est",
    slug: "grand-est",
    capital: "Strasbourg",
    description:
      "Region fronteriza con Alemania, Belgica, Luxemburgo y Suiza. Estrasburgo, su capital, es sede del Parlamento Europeo. La region combina la cultura alsaciana con influencias germanicas, famosa por sus vinos de Alsacia, su arquitectura de entramado de madera y sus mercados navidenos.",
    descriptionFr:
      "Region frontaliere avec l'Allemagne, la Belgique, le Luxembourg et la Suisse. Strasbourg, sa capitale, est le siege du Parlement europeen. La region combine la culture alsacienne avec des influences germaniques, celebre pour ses vins d'Alsace, son architecture a colombages et ses marches de Noel.",
    population: "5,6 millones",
    specialties: [
      "Choucroute garnie",
      "Flammekueche (tarte flambee)",
      "Kougelhopf",
      "Vins d'Alsace (Riesling, Gewurztraminer)",
      "Bretzel",
    ],
    vocab: [
      {
        french: "une frontiere",
        spanish: "una frontera",
        context: "Strasbourg est situee pres de la frontiere allemande.",
      },
      {
        french: "le Parlement europeen",
        spanish: "el Parlamento Europeo",
        context: "Le Parlement europeen siege a Strasbourg.",
      },
      {
        french: "un marche de Noel",
        spanish: "un mercado navideno",
        context: "Les marches de Noel de Strasbourg sont les plus anciens de France.",
      },
      {
        french: "les colombages",
        spanish: "el entramado de madera",
        context: "Les maisons a colombages sont typiques de l'Alsace.",
      },
      {
        french: "le vignoble",
        spanish: "el vinedo",
        context: "La route des vins d'Alsace traverse de nombreux vignobles.",
      },
    ],
    funFacts: [
      {
        title: "Mercados navidenos",
        content:
          "El mercado navideno de Estrasburgo, el Christkindelsmaerik, existe desde 1570 y es el mas antiguo de Francia.",
      },
      {
        title: "Capital europea",
        content:
          "Estrasburgo alberga el Parlamento Europeo, el Consejo de Europa y el Tribunal Europeo de Derechos Humanos, siendo una verdadera capital europea.",
      },
      {
        title: "Champan",
        content:
          "La subregion de Champagne, ahora parte del Grand Est, es la unica zona del mundo donde se puede producir legitimamente champan.",
      },
    ],
    quiz: [
      {
        question: "Que institucion europea tiene su sede en Estrasburgo?",
        options: [
          "La Comision Europea",
          "El Parlamento Europeo",
          "El Banco Central Europeo",
          "La OTAN",
        ],
        correctIdx: 1,
      },
      {
        question: "Como se llama la tarta tipica alsaciana similar a una pizza?",
        options: ["Quiche lorraine", "Flammekueche", "Pissaladiere", "Tarte Tatin"],
        correctIdx: 1,
      },
      {
        question: "Desde que ano existe el mercado navideno de Estrasburgo?",
        options: ["1570", "1720", "1850", "1920"],
        correctIdx: 0,
      },
    ],
    color: "#5b2c6f",
  },
  {
    name: "Hauts-de-France",
    slug: "hauts-de-france",
    capital: "Lille",
    description:
      "Region del norte de Francia, fronteriza con Belgica. Lille, su capital, es una ciudad vibrante con una rica herencia industrial reconvertida en cultura. La region es conocida por su hospitalidad, su gastronomia reconfortante y sitios historicos de las dos guerras mundiales.",
    descriptionFr:
      "Region du nord de la France, frontaliere avec la Belgique. Lille, sa capitale, est une ville vibrante avec un riche heritage industriel reconverti en culture. La region est connue pour son hospitalite, sa gastronomie reconfortante et ses sites historiques des deux guerres mondiales.",
    population: "6,0 millones",
    specialties: [
      "Moules-frites",
      "Carbonnade flamande",
      "Maroilles",
      "Welsh",
      "Gaufres",
    ],
    vocab: [
      {
        french: "la biere",
        spanish: "la cerveza",
        context: "Le Nord est une grande region de production de biere.",
      },
      {
        french: "une braderie",
        spanish: "un mercadillo",
        context: "La Braderie de Lille est le plus grand marche aux puces d'Europe.",
      },
      {
        french: "un beffroi",
        spanish: "un campanario",
        context: "Les beffrois du Nord sont classes au patrimoine mondial.",
      },
      {
        french: "la mine",
        spanish: "la mina",
        context: "Le bassin minier du Nord est un ancien site d'extraction du charbon.",
      },
      {
        french: "l'accueil",
        spanish: "la acogida / hospitalidad",
        context: "Les gens du Nord sont connus pour leur accueil chaleureux.",
      },
    ],
    funFacts: [
      {
        title: "La Braderie de Lille",
        content:
          "La Braderie de Lille es el mercadillo mas grande de Europa. Se celebra el primer fin de semana de septiembre y atrae a mas de 2 millones de visitantes.",
      },
      {
        title: "Los campanarios",
        content:
          "23 campanarios (beffrois) del norte de Francia estan inscritos en el Patrimonio Mundial de la UNESCO como simbolos de libertades civicas.",
      },
      {
        title: "Trincheras de la Primera Guerra Mundial",
        content:
          "La region alberga numerosos sitios de memoria de la Primera Guerra Mundial, incluyendo Vimy Ridge y los campos de batalla del Somme.",
      },
    ],
    quiz: [
      {
        question: "Cual es el plato mas emblematico del norte de Francia?",
        options: [
          "Bouillabaisse",
          "Moules-frites",
          "Cassoulet",
          "Ratatouille",
        ],
        correctIdx: 1,
      },
      {
        question: "Como se dice 'cerveza' en frances?",
        options: ["le vin", "le cidre", "la biere", "le jus"],
        correctIdx: 2,
      },
      {
        question: "Que evento anual en Lille es el mercadillo mas grande de Europa?",
        options: [
          "La Fete de la Musique",
          "La Braderie",
          "Le Carnaval",
          "Le Marche de Noel",
        ],
        correctIdx: 1,
      },
    ],
    color: "#2e86c1",
  },
  {
    name: "Normandie",
    slug: "normandie",
    capital: "Rouen",
    description:
      "Tierra de historia, desde los vikingos hasta el Dia D. Normandia es famosa por sus acantilados de Etretat, el Mont-Saint-Michel, sus quesos (Camembert, Pont-l'Eveque) y su sidra. Las playas del desembarco del 6 de junio de 1944 son lugares de peregrinacion historica.",
    descriptionFr:
      "Terre d'histoire, des Vikings au jour J. La Normandie est celebre pour ses falaises d'Etretat, le Mont-Saint-Michel, ses fromages (Camembert, Pont-l'Eveque) et son cidre. Les plages du debarquement du 6 juin 1944 sont des lieux de pelerinage historique.",
    population: "3,3 millones",
    specialties: [
      "Camembert",
      "Calvados",
      "Cidre normand",
      "Tarte aux pommes normande",
      "Tripes a la mode de Caen",
    ],
    vocab: [
      {
        french: "une falaise",
        spanish: "un acantilado",
        context: "Les falaises d'Etretat sont spectaculaires.",
      },
      {
        french: "le debarquement",
        spanish: "el desembarco",
        context: "Le debarquement de Normandie a eu lieu le 6 juin 1944.",
      },
      {
        french: "un pommier",
        spanish: "un manzano",
        context: "Les vergers de pommiers sont typiques du paysage normand.",
      },
      {
        french: "la maree haute",
        spanish: "la marea alta",
        context: "A maree haute, le Mont-Saint-Michel est entoure par la mer.",
      },
      {
        french: "un fromage",
        spanish: "un queso",
        context: "Le Camembert est le fromage normand le plus connu.",
      },
    ],
    funFacts: [
      {
        title: "Mont-Saint-Michel",
        content:
          "El Mont-Saint-Michel recibe mas de 3 millones de visitantes al ano. Durante la marea alta, queda completamente rodeado por el mar.",
      },
      {
        title: "Dia D",
        content:
          "El 6 de junio de 1944, mas de 150.000 soldados aliados desembarcaron en cinco playas de Normandia: Utah, Omaha, Gold, Juno y Sword.",
      },
      {
        title: "Los impresionistas",
        content:
          "Los acantilados de Etretat y la costa normanda inspiraron a pintores impresionistas como Monet, quien pinto la catedral de Rouen mas de 30 veces.",
      },
    ],
    quiz: [
      {
        question: "En que fecha tuvo lugar el desembarco de Normandia?",
        options: [
          "6 de junio de 1940",
          "6 de junio de 1944",
          "8 de mayo de 1945",
          "14 de julio de 1944",
        ],
        correctIdx: 1,
      },
      {
        question: "Que famoso queso es originario de Normandia?",
        options: ["Roquefort", "Comte", "Camembert", "Brie"],
        correctIdx: 2,
      },
      {
        question: "Como se dice 'acantilado' en frances?",
        options: ["une montagne", "une colline", "une falaise", "une plaine"],
        correctIdx: 2,
      },
    ],
    color: "#196f3d",
  },
  {
    name: "Nouvelle-Aquitaine",
    slug: "nouvelle-aquitaine",
    capital: "Bordeaux",
    description:
      "La region mas grande de Francia metropolitana, famosa por sus vinos de Burdeos, las playas del Atlantico y la dulzura de vivir. Desde las olas de Biarritz hasta los vinedos de Saint-Emilion, pasando por la Dordona y sus castillos, es una tierra de contrastes y placeres.",
    descriptionFr:
      "La plus grande region de France metropolitaine, celebre pour ses vins de Bordeaux, les plages de l'Atlantique et la douceur de vivre. Des vagues de Biarritz aux vignobles de Saint-Emilion, en passant par la Dordogne et ses chateaux, c'est une terre de contrastes et de plaisirs.",
    population: "6,0 millones",
    specialties: [
      "Vins de Bordeaux",
      "Caneles",
      "Foie gras",
      "Huitres du bassin d'Arcachon",
      "Gateau basque",
    ],
    vocab: [
      {
        french: "le vin",
        spanish: "el vino",
        context: "Les vins de Bordeaux sont parmi les meilleurs au monde.",
      },
      {
        french: "une huitre",
        spanish: "una ostra",
        context: "Les huitres du bassin d'Arcachon sont delicieuses.",
      },
      {
        french: "le surf",
        spanish: "el surf",
        context: "Biarritz est la capitale europeenne du surf.",
      },
      {
        french: "la dune",
        spanish: "la duna",
        context: "La dune du Pilat est la plus haute dune d'Europe.",
      },
      {
        french: "une vague",
        spanish: "una ola",
        context: "Les vagues de la cote atlantique attirent les surfeurs.",
      },
    ],
    funFacts: [
      {
        title: "La Duna de Pilat",
        content:
          "La Duna de Pilat es la duna de arena mas alta de Europa, con mas de 100 metros de altura. Se mueve varios metros hacia el interior cada ano.",
      },
      {
        title: "Vinos de Burdeos",
        content:
          "La region de Burdeos tiene mas de 7.000 chateaux vinicolas y produce alrededor de 700 millones de botellas de vino al ano.",
      },
      {
        title: "Lascaux",
        content:
          "Las cuevas de Lascaux en la Dordona contienen pinturas rupestres de 17.000 anos de antiguedad, consideradas la 'Capilla Sixtina de la Prehistoria'.",
      },
    ],
    quiz: [
      {
        question: "Cual es la duna de arena mas alta de Europa?",
        options: [
          "Duna de Bolonia",
          "Duna de Pilat",
          "Duna de Arcachon",
          "Duna de Biarritz",
        ],
        correctIdx: 1,
      },
      {
        question: "Como se dice 'ostra' en frances?",
        options: ["un crabe", "un homard", "une moule", "une huitre"],
        correctIdx: 3,
      },
      {
        question: "Que famosas cuevas con arte rupestre se encuentran en esta region?",
        options: ["Altamira", "Lascaux", "Chauvet", "Cosquer"],
        correctIdx: 1,
      },
    ],
    color: "#7d3c98",
  },
  {
    name: "Occitanie",
    slug: "occitanie",
    capital: "Toulouse",
    description:
      "Region del sur con dos caras: la costa mediterranea y los Pirineos. Toulouse, la Ciudad Rosa por el color de sus ladrillos, es capital de la industria aeronautica europea (Airbus). La region alberga Carcassonne, el Canal du Midi y una rica herencia occitana y catara.",
    descriptionFr:
      "Region du sud aux deux visages : la cote mediterraneenne et les Pyrenees. Toulouse, la Ville Rose pour la couleur de ses briques, est la capitale de l'industrie aeronautique europeenne (Airbus). La region abrite Carcassonne, le Canal du Midi et un riche heritage occitan et cathare.",
    population: "5,9 millones",
    specialties: [
      "Cassoulet",
      "Roquefort",
      "Saucisse de Toulouse",
      "Fougasse",
      "Violette de Toulouse",
    ],
    vocab: [
      {
        french: "un avion",
        spanish: "un avion",
        context: "Airbus fabrique des avions a Toulouse.",
      },
      {
        french: "la brique",
        spanish: "el ladrillo",
        context: "Toulouse est appelee la Ville Rose a cause de ses briques roses.",
      },
      {
        french: "un canal",
        spanish: "un canal",
        context: "Le Canal du Midi relie la Garonne a la Mediterranee.",
      },
      {
        french: "une citadelle",
        spanish: "una ciudadela",
        context: "La cite de Carcassonne est la plus grande citadelle d'Europe.",
      },
      {
        french: "les Pyrenees",
        spanish: "los Pirineos",
        context: "Les Pyrenees forment la frontiere naturelle entre la France et l'Espagne.",
      },
    ],
    funFacts: [
      {
        title: "Airbus",
        content:
          "Toulouse es la sede de Airbus y donde se ensamblan los aviones mas grandes del mundo, incluido el A380. Se puede visitar la linea de ensamblaje.",
      },
      {
        title: "Carcassonne",
        content:
          "La ciudad amurallada de Carcassonne es la fortaleza medieval mejor conservada de Europa, con 52 torres y 3 km de murallas dobles.",
      },
      {
        title: "Canal du Midi",
        content:
          "El Canal du Midi, Patrimonio de la UNESCO, fue construido en el siglo XVII y conecta el Atlantico con el Mediterraneo a lo largo de 240 km.",
      },
    ],
    quiz: [
      {
        question: "Por que se llama a Toulouse la 'Ville Rose'?",
        options: [
          "Por sus flores",
          "Por el color de sus ladrillos",
          "Por sus atardeceres",
          "Por un festival de rosas",
        ],
        correctIdx: 1,
      },
      {
        question: "Que empresa aeronautica tiene su sede en Toulouse?",
        options: ["Boeing", "Airbus", "Embraer", "Dassault"],
        correctIdx: 1,
      },
      {
        question: "Como se dice 'avion' en frances?",
        options: ["un helicoptere", "un avion", "un planeur", "un jet"],
        correctIdx: 1,
      },
    ],
    color: "#c0392b",
  },
  {
    name: "Pays de la Loire",
    slug: "pays-de-la-loire",
    capital: "Nantes",
    description:
      "Region atlantica con una capital creativa y dinamica. Nantes, antigua capital de los duques de Bretana, destaca por su innovacion artistica, como Les Machines de l'Ile. La region combina costa atlantica, vinedos de Muscadet y una calidad de vida envidiable.",
    descriptionFr:
      "Region atlantique avec une capitale creative et dynamique. Nantes, ancienne capitale des ducs de Bretagne, se distingue par son innovation artistique, comme Les Machines de l'Ile. La region combine cote atlantique, vignobles de Muscadet et une qualite de vie enviable.",
    population: "3,8 millones",
    specialties: [
      "Muscadet (vino blanco)",
      "Beurre blanc nantais",
      "Sel de Guerande",
      "Brioche vendeenne",
      "Berlingots nantais",
    ],
    vocab: [
      {
        french: "le sel",
        spanish: "la sal",
        context: "Le sel de Guerande est recolte a la main par les paludiers.",
      },
      {
        french: "un marais salant",
        spanish: "una salina",
        context: "Les marais salants de Guerande produisent un sel renomme.",
      },
      {
        french: "une machine",
        spanish: "una maquina",
        context: "Les Machines de l'Ile sont des creatures mecaniques geantes.",
      },
      {
        french: "un port",
        spanish: "un puerto",
        context: "Nantes etait autrefois un grand port maritime.",
      },
      {
        french: "la cote",
        spanish: "la costa",
        context: "La cote atlantique offre de belles plages.",
      },
    ],
    funFacts: [
      {
        title: "Las Maquinas de la Isla",
        content:
          "Les Machines de l'Ile en Nantes incluyen un elefante mecanico gigante de 12 metros de alto que pasea a visitantes, inspirado en Jules Verne, nacido en Nantes.",
      },
      {
        title: "Sal de Guerande",
        content:
          "La sal de Guerande se cosecha artesanalmente desde la epoca romana. La flor de sal, la capa mas fina, es un producto gastronomico de lujo.",
      },
      {
        title: "Le Mans y las 24 horas",
        content:
          "La carrera de las 24 Horas de Le Mans es la competicion de resistencia automovilistica mas antigua y prestigiosa del mundo, celebrada desde 1923.",
      },
    ],
    quiz: [
      {
        question: "Que famoso escritor de ciencia ficcion nacio en Nantes?",
        options: [
          "Victor Hugo",
          "Jules Verne",
          "Alexandre Dumas",
          "Emile Zola",
        ],
        correctIdx: 1,
      },
      {
        question: "Como se dice 'sal' en frances?",
        options: ["le sucre", "le poivre", "le sel", "la farine"],
        correctIdx: 2,
      },
      {
        question: "Que famosa carrera de coches se celebra en Le Mans?",
        options: [
          "Grand Prix de Monaco",
          "Rally de Montecarlo",
          "24 Horas de Le Mans",
          "Tour de France",
        ],
        correctIdx: 2,
      },
    ],
    color: "#45b39d",
  },
  {
    name: "Provence-Alpes-Cote d'Azur",
    slug: "provence-alpes-cote-d-azur",
    capital: "Marseille",
    description:
      "El sur luminoso de Francia: lavanda, sol y Mediterraneo. Desde los campos de lavanda de la Provenza hasta el glamour de la Costa Azul (Cannes, Niza, Saint-Tropez), pasando por Marsella, la ciudad mas antigua de Francia. Tierra de petanca, pastis y mercados coloridos.",
    descriptionFr:
      "Le sud lumineux de la France : lavande, soleil et Mediterranee. Des champs de lavande de la Provence au glamour de la Cote d'Azur (Cannes, Nice, Saint-Tropez), en passant par Marseille, la plus ancienne ville de France. Terre de petanque, de pastis et de marches colores.",
    population: "5,1 millones",
    specialties: [
      "Bouillabaisse",
      "Ratatouille",
      "Pastis",
      "Navettes de Marseille",
      "Socca nicoise",
      "Calissons d'Aix",
    ],
    vocab: [
      {
        french: "la lavande",
        spanish: "la lavanda",
        context: "Les champs de lavande fleurissent en ete en Provence.",
      },
      {
        french: "la petanque",
        spanish: "la petanca",
        context: "On joue a la petanque sur les places des villages provencaux.",
      },
      {
        french: "un marche",
        spanish: "un mercado",
        context: "Les marches provencaux sont pleins de couleurs et de saveurs.",
      },
      {
        french: "le soleil",
        spanish: "el sol",
        context: "La Provence beneficie de plus de 300 jours de soleil par an.",
      },
      {
        french: "un calanque",
        spanish: "una cala (acantilado con entrada de mar)",
        context: "Les calanques de Marseille sont un parc national magnifique.",
      },
      {
        french: "le mistral",
        spanish: "el mistral (viento fuerte del norte)",
        context: "Le mistral est un vent froid qui souffle dans la vallee du Rhone.",
      },
    ],
    funFacts: [
      {
        title: "Marsella, la mas antigua",
        content:
          "Marsella fue fundada por navegantes griegos en el 600 a.C., lo que la convierte en la ciudad mas antigua de Francia.",
      },
      {
        title: "Festival de Cannes",
        content:
          "El Festival de Cine de Cannes, creado en 1946, es el festival cinematografico mas prestigioso del mundo. La Palme d'Or es su maximo galardon.",
      },
      {
        title: "300 dias de sol",
        content:
          "La Provenza disfruta de mas de 300 dias de sol al ano, lo que explica por que artistas como Van Gogh, Cezanne y Matisse se instalaron aqui.",
      },
    ],
    quiz: [
      {
        question: "Cual es la ciudad mas antigua de Francia?",
        options: ["Paris", "Lyon", "Marseille", "Niza"],
        correctIdx: 2,
      },
      {
        question: "Como se dice 'lavanda' en frances?",
        options: ["la rose", "la lavande", "le thym", "le romarin"],
        correctIdx: 1,
      },
      {
        question: "Que prestigioso festival de cine se celebra en la Costa Azul?",
        options: [
          "Festival de Venecia",
          "Festival de Berlin",
          "Festival de Cannes",
          "Festival de San Sebastian",
        ],
        correctIdx: 2,
      },
    ],
    color: "#f39c12",
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
