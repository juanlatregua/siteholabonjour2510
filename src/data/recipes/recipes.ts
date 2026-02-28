export interface Ingredient {
  french: string;
  spanish: string;
  quantity: string;
}

export interface RecipeStep {
  french: string;
  spanish: string;
}

export interface RecipeVersion {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  instructions: string;
}

export interface RecipeQuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
}

export interface Recipe {
  title: string;
  slug: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Facil" | "Intermedio" | "Avanzado";
  ingredients: Ingredient[];
  steps: RecipeStep[];
  versions: RecipeVersion[];
  quiz: RecipeQuizQuestion[];
  culturalNote: string;
}

export const recipes: Recipe[] = [
  // 1. Crepes - Facil
  {
    title: "Crepes",
    slug: "crepes",
    image: "/images/recipes/crepes.jpg",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 8,
    difficulty: "Facil",
    ingredients: [
      { french: "farine", spanish: "harina", quantity: "250g" },
      { french: "oeufs", spanish: "huevos", quantity: "4" },
      { french: "lait", spanish: "leche", quantity: "500ml" },
      { french: "beurre fondu", spanish: "mantequilla derretida", quantity: "50g" },
      { french: "sucre", spanish: "azucar", quantity: "2 cucharadas" },
      { french: "sel", spanish: "sal", quantity: "1 pizca" },
    ],
    steps: [
      { french: "Melangez la farine et les oeufs.", spanish: "Mezcla la harina y los huevos." },
      { french: "Ajoutez le lait petit a petit.", spanish: "Anade la leche poco a poco." },
      { french: "Ajoutez le beurre fondu et le sucre.", spanish: "Anade la mantequilla derretida y el azucar." },
      { french: "Laissez reposer la pate 30 minutes.", spanish: "Deja reposar la masa 30 minutos." },
      { french: "Faites cuire les crepes dans une poele chaude.", spanish: "Cocina las crepes en una sarten caliente." },
    ],
    versions: [
      { level: "A1", instructions: "Les crepes sont faciles. On melange la farine, les oeufs et le lait. On fait cuire dans une poele. On peut mettre du sucre ou du Nutella." },
      { level: "B1", instructions: "Pour reussir des crepes parfaites, il faut d'abord tamiser la farine dans un grand saladier. Cassez les oeufs au centre et melangez energiquement avec un fouet. Incorporez le lait progressivement pour eviter les grumeaux. Ajoutez le beurre fondu et une pincee de sel. Laissez reposer la pate au refrigerateur pendant au moins 30 minutes. Faites chauffer une poele antiadhesive, versez une louche de pate et faites cuire chaque cote environ une minute." },
    ],
    quiz: [
      { question: "Cuanto tiempo debe reposar la masa de crepes?", options: ["10 minutos", "30 minutos", "1 hora", "No necesita reposo"], correctIdx: 1 },
      { question: "Que significa 'farine' en espanol?", options: ["Harina", "Azucar", "Leche", "Mantequilla"], correctIdx: 0 },
      { question: "Cuantos huevos se necesitan para esta receta?", options: ["2", "3", "4", "6"], correctIdx: 2 },
    ],
    culturalNote: "Las crepes son originarias de Bretana y se celebran cada 2 de febrero en la Chandeleur. Segun la tradicion, hay que voltear la crepe con la mano derecha mientras se sostiene una moneda en la izquierda para atraer la prosperidad.",
  },
  // 2. Quiche Lorraine - Facil
  {
    title: "Quiche Lorraine",
    slug: "quiche-lorraine",
    image: "/images/recipes/quiche-lorraine.jpg",
    prepTime: "20 min",
    cookTime: "35 min",
    servings: 6,
    difficulty: "Facil",
    ingredients: [
      { french: "pate brisee", spanish: "masa quebrada", quantity: "1 lamina" },
      { french: "lardons", spanish: "taquitos de bacon", quantity: "200g" },
      { french: "oeufs", spanish: "huevos", quantity: "3" },
      { french: "creme fraiche", spanish: "nata espesa", quantity: "200ml" },
      { french: "lait", spanish: "leche", quantity: "100ml" },
      { french: "fromage rape", spanish: "queso rallado", quantity: "100g" },
      { french: "sel et poivre", spanish: "sal y pimienta", quantity: "al gusto" },
      { french: "noix de muscade", spanish: "nuez moscada", quantity: "1 pizca" },
    ],
    steps: [
      { french: "Prechauffez le four a 180 degres.", spanish: "Precalienta el horno a 180 grados." },
      { french: "Etalez la pate dans un moule a tarte.", spanish: "Extiende la masa en un molde para tarta." },
      { french: "Faites revenir les lardons a la poele.", spanish: "Saltea los taquitos de bacon en la sarten." },
      { french: "Melangez les oeufs, la creme et le lait.", spanish: "Mezcla los huevos, la nata y la leche." },
      { french: "Disposez les lardons sur la pate.", spanish: "Coloca los taquitos de bacon sobre la masa." },
      { french: "Versez le melange d'oeufs et ajoutez le fromage.", spanish: "Vierte la mezcla de huevos y anade el queso." },
      { french: "Enfournez pendant 35 minutes.", spanish: "Hornea durante 35 minutos." },
    ],
    versions: [
      { level: "A2", instructions: "La quiche Lorraine est une tarte salee. On utilise une pate, des lardons, des oeufs et de la creme. On met tout dans un moule et on fait cuire au four. C'est tres bon chaud ou froid." },
      { level: "B1", instructions: "La quiche Lorraine est l'une des recettes les plus emblematiques de la cuisine francaise. Pour la preparer, commencez par etaler une pate brisee dans un moule beurre. Faites revenir les lardons jusqu'a ce qu'ils soient dores. Dans un saladier, fouettez les oeufs avec la creme fraiche, le lait, une pincee de noix de muscade, du sel et du poivre. Repartissez les lardons sur le fond de tarte, versez l'appareil et parsemez de fromage rape. Enfournez a 180 degres pendant 35 minutes jusqu'a ce que la quiche soit bien doree." },
    ],
    quiz: [
      { question: "A que temperatura se hornea la quiche Lorraine?", options: ["150 grados", "180 grados", "200 grados", "220 grados"], correctIdx: 1 },
      { question: "Que significa 'lardons' en espanol?", options: ["Tocino", "Taquitos de bacon", "Jamon", "Salchichas"], correctIdx: 1 },
      { question: "De que region francesa es originaria la quiche?", options: ["Bretana", "Provenza", "Lorena", "Normandia"], correctIdx: 2 },
    ],
    culturalNote: "La quiche Lorraine es originaria de la region de Lorena, en el noreste de Francia. La receta original no lleva queso: solo lardons, huevos y nata. El queso fue anadido despues y genera debate entre los puristas. La palabra 'quiche' proviene del aleman 'Kuchen' (pastel).",
  },
  // 3. Ratatouille - Intermedio
  {
    title: "Ratatouille",
    slug: "ratatouille",
    image: "/images/recipes/ratatouille.jpg",
    prepTime: "25 min",
    cookTime: "45 min",
    servings: 4,
    difficulty: "Intermedio",
    ingredients: [
      { french: "aubergine", spanish: "berenjena", quantity: "2" },
      { french: "courgettes", spanish: "calabacines", quantity: "2" },
      { french: "poivron rouge", spanish: "pimiento rojo", quantity: "1" },
      { french: "poivron jaune", spanish: "pimiento amarillo", quantity: "1" },
      { french: "tomates", spanish: "tomates", quantity: "4" },
      { french: "oignon", spanish: "cebolla", quantity: "1" },
      { french: "ail", spanish: "ajo", quantity: "3 dientes" },
      { french: "huile d'olive", spanish: "aceite de oliva", quantity: "4 cucharadas" },
      { french: "herbes de Provence", spanish: "hierbas provenzales", quantity: "2 cucharaditas" },
      { french: "sel et poivre", spanish: "sal y pimienta", quantity: "al gusto" },
    ],
    steps: [
      { french: "Coupez tous les legumes en petits cubes.", spanish: "Corta todas las verduras en cubos pequenos." },
      { french: "Faites revenir l'oignon et l'ail dans l'huile d'olive.", spanish: "Sofrie la cebolla y el ajo en aceite de oliva." },
      { french: "Ajoutez les poivrons et faites cuire 5 minutes.", spanish: "Anade los pimientos y cocina 5 minutos." },
      { french: "Ajoutez les aubergines et les courgettes.", spanish: "Anade las berenjenas y los calabacines." },
      { french: "Ajoutez les tomates et les herbes de Provence.", spanish: "Anade los tomates y las hierbas provenzales." },
      { french: "Laissez mijoter a feu doux pendant 30 minutes.", spanish: "Deja cocinar a fuego lento durante 30 minutos." },
      { french: "Assaisonnez avec sel et poivre.", spanish: "Sazona con sal y pimienta." },
    ],
    versions: [
      { level: "B1", instructions: "La ratatouille est un plat traditionnel de Provence. On coupe des legumes: aubergines, courgettes, poivrons, tomates et oignons. On fait cuire l'oignon et l'ail dans l'huile d'olive, puis on ajoute les autres legumes un par un. On assaisonne avec des herbes de Provence et on laisse mijoter pendant 30 minutes. C'est un plat vegetarien tres sain et delicieux." },
      { level: "B2", instructions: "La ratatouille nicoise est un ragoout de legumes provencal dont l'origine remonte au XVIIIe siecle. Pour obtenir un resultat optimal, il convient de faire revenir chaque legume separement afin de preserver sa texture et sa saveur individuelles. Commencez par l'oignon et l'ail que vous ferez suer doucement, puis ajoutez successivement les poivrons, les aubergines et les courgettes. Les tomates, concassees et epepinees, viendront en dernier pour creer une sauce naturelle. L'assaisonnement aux herbes de Provence est indispensable. Le secret reside dans une cuisson lente et patiente qui permet aux saveurs de se marier harmonieusement." },
    ],
    quiz: [
      { question: "De que region francesa es originaria la ratatouille?", options: ["Bretana", "Alsacia", "Provenza", "Normandia"], correctIdx: 2 },
      { question: "Que significa 'courgettes' en espanol?", options: ["Berenjenas", "Calabacines", "Pimientos", "Pepinos"], correctIdx: 1 },
      { question: "Cuanto tiempo debe cocinarse a fuego lento?", options: ["10 minutos", "20 minutos", "30 minutos", "1 hora"], correctIdx: 2 },
    ],
    culturalNote: "La ratatouille es un plato humilde de origen provenzal que se popularizo mundialmente gracias a la pelicula de Pixar. En realidad, los chefs franceses consideran que la verdadera ratatouille debe cocinarse lentamente y cada verdura por separado para respetar sus tiempos de coccion. Es un plato tipico de verano cuando las verduras estan en su mejor momento.",
  },
  // 4. Soupe a l'oignon - Facil
  {
    title: "Soupe a l'oignon",
    slug: "soupe-a-loignon",
    image: "/images/recipes/soupe-oignon.jpg",
    prepTime: "15 min",
    cookTime: "40 min",
    servings: 4,
    difficulty: "Facil",
    ingredients: [
      { french: "oignons", spanish: "cebollas", quantity: "6 grandes" },
      { french: "beurre", spanish: "mantequilla", quantity: "50g" },
      { french: "farine", spanish: "harina", quantity: "1 cucharada" },
      { french: "bouillon de boeuf", spanish: "caldo de ternera", quantity: "1 litro" },
      { french: "vin blanc", spanish: "vino blanco", quantity: "150ml" },
      { french: "pain de campagne", spanish: "pan de pueblo", quantity: "4 rebanadas" },
      { french: "fromage gruyere", spanish: "queso gruyere", quantity: "150g" },
      { french: "sel et poivre", spanish: "sal y pimienta", quantity: "al gusto" },
    ],
    steps: [
      { french: "Emincez les oignons finement.", spanish: "Corta las cebollas en rodajas finas." },
      { french: "Faites fondre le beurre et faites revenir les oignons 20 minutes.", spanish: "Derrite la mantequilla y sofrie las cebollas 20 minutos." },
      { french: "Ajoutez la farine et melangez.", spanish: "Anade la harina y mezcla." },
      { french: "Versez le vin blanc et laissez reduire.", spanish: "Vierte el vino blanco y deja reducir." },
      { french: "Ajoutez le bouillon et laissez mijoter 15 minutes.", spanish: "Anade el caldo y deja cocinar 15 minutos." },
      { french: "Versez la soupe dans des bols, ajoutez le pain et le fromage.", spanish: "Vierte la sopa en boles, anade el pan y el queso." },
      { french: "Faites gratiner au four quelques minutes.", spanish: "Gratina en el horno unos minutos." },
    ],
    versions: [
      { level: "A2", instructions: "La soupe a l'oignon est une soupe francaise tres connue. On coupe beaucoup d'oignons et on les fait cuire dans du beurre. On ajoute du bouillon. Apres, on met du pain et du fromage sur la soupe et on fait gratiner au four. C'est chaud et delicieux." },
      { level: "B1", instructions: "La soupe a l'oignon gratinee est un classique de la gastronomie francaise, particulierement appreciee en hiver. La cle de la recette reside dans la caramelisation patiente des oignons. Emincez-les finement et faites-les revenir dans du beurre a feu moyen pendant au moins 20 minutes, en remuant regulierement. La farine apporte de l'epaisseur, tandis que le vin blanc deglace les sucs de cuisson. Apres avoir ajoute le bouillon, laissez mijoter pour concentrer les saveurs. Servez dans des bols allant au four, couvrez de pain et de gruyere rape, puis gratinez sous le grill jusqu'a obtenir une croute doree et bouillonnante." },
    ],
    quiz: [
      { question: "Cuanto tiempo se sofrien las cebollas?", options: ["5 minutos", "10 minutos", "20 minutos", "30 minutos"], correctIdx: 2 },
      { question: "Que queso se usa para gratinar la sopa?", options: ["Camembert", "Brie", "Gruyere", "Roquefort"], correctIdx: 2 },
      { question: "Que significa 'oignon' en espanol?", options: ["Ajo", "Puerro", "Cebolla", "Chalota"], correctIdx: 2 },
    ],
    culturalNote: "La soupe a l'oignon es considerada un plato reconfortante de la cocina popular francesa. Antiguamente, se servia en Les Halles de Paris a los trabajadores del mercado en las madrugadas frias. Tambien es famosa como remedio tras una noche de fiesta. Luis XV habria inventado una version al tener solo cebollas, mantequilla y champan disponibles.",
  },
  // 5. Tarte Tatin - Intermedio
  {
    title: "Tarte Tatin",
    slug: "tarte-tatin",
    image: "/images/recipes/tarte-tatin.jpg",
    prepTime: "20 min",
    cookTime: "35 min",
    servings: 6,
    difficulty: "Intermedio",
    ingredients: [
      { french: "pommes", spanish: "manzanas", quantity: "6" },
      { french: "pate feuilletee", spanish: "masa de hojaldre", quantity: "1 lamina" },
      { french: "beurre", spanish: "mantequilla", quantity: "80g" },
      { french: "sucre", spanish: "azucar", quantity: "150g" },
      { french: "jus de citron", spanish: "zumo de limon", quantity: "1 cucharada" },
      { french: "vanille", spanish: "vainilla", quantity: "1 cucharadita" },
    ],
    steps: [
      { french: "Prechauffez le four a 190 degres.", spanish: "Precalienta el horno a 190 grados." },
      { french: "Pelez et coupez les pommes en quartiers.", spanish: "Pela y corta las manzanas en cuartos." },
      { french: "Faites fondre le beurre et le sucre dans une poele allant au four.", spanish: "Derrite la mantequilla y el azucar en una sarten apta para horno." },
      { french: "Laissez carameliser jusqu'a obtenir une couleur doree.", spanish: "Deja caramelizar hasta obtener un color dorado." },
      { french: "Disposez les pommes sur le caramel.", spanish: "Coloca las manzanas sobre el caramelo." },
      { french: "Couvrez avec la pate feuilletee en repliant les bords.", spanish: "Cubre con la masa de hojaldre doblando los bordes." },
      { french: "Enfournez pendant 30 minutes.", spanish: "Hornea durante 30 minutos." },
      { french: "Retournez la tarte sur un plat de service.", spanish: "Voltea la tarta sobre una fuente de servir." },
    ],
    versions: [
      { level: "B1", instructions: "La tarte Tatin est une tarte aux pommes speciale. Elle est faite a l'envers! On commence par le caramel et les pommes dans la poele, puis on met la pate par-dessus. Apres la cuisson au four, on retourne la tarte. Les pommes sont caramelisees et tres bonnes. C'est un dessert qui a ete invente par accident par les soeurs Tatin." },
      { level: "B2", instructions: "La tarte Tatin constitue l'un des desserts les plus celebres du patrimoine culinaire francais. Sa preparation requiert une maitrise certaine de la caramelisation. Faites fondre le beurre avec le sucre dans une poele en fonte allant au four, en surveillant attentivement la coloration du caramel. Disposez les quartiers de pommes en rosace serree sur le caramel dore. L'ajout d'un filet de citron et de vanille sublimera les saveurs. Recouvrez le tout d'un disque de pate feuilletee en prenant soin de bien rentrer les bords. Apres 30 minutes de cuisson, le moment crucial arrive: le demoulage. Placez un plat sur la poele et retournez d'un geste assure. Le resultat doit reveler des pommes fondantes et lustrees de caramel." },
    ],
    quiz: [
      { question: "Cual es la particularidad de la tarte Tatin?", options: ["Se hace sin azucar", "Se cocina al reves", "Lleva crema pastelera", "Se sirve fria"], correctIdx: 1 },
      { question: "Que significa 'pommes' en espanol?", options: ["Peras", "Melocotones", "Manzanas", "Ciruelas"], correctIdx: 2 },
      { question: "Quien invento la tarte Tatin?", options: ["Un chef de Paris", "Las hermanas Tatin", "El rey Luis XIV", "Un pastelero de Lyon"], correctIdx: 1 },
    ],
    culturalNote: "La tarte Tatin fue supuestamente creada por accidente en la decada de 1880 por las hermanas Stephanie y Caroline Tatin en su hotel-restaurante en Lamotte-Beuvron. Stephanie olvido poner la masa debajo de las manzanas y decidio ponerla encima y voltear la tarta al sacarla. El resultado fue tan delicioso que se convirtio en un clasico de la pasteleria francesa.",
  },
  // 6. Boeuf Bourguignon - Avanzado
  {
    title: "Boeuf Bourguignon",
    slug: "boeuf-bourguignon",
    image: "/images/recipes/boeuf-bourguignon.jpg",
    prepTime: "30 min",
    cookTime: "3 horas",
    servings: 6,
    difficulty: "Avanzado",
    ingredients: [
      { french: "boeuf a braiser", spanish: "ternera para guisar", quantity: "1 kg" },
      { french: "vin rouge de Bourgogne", spanish: "vino tinto de Borgona", quantity: "750ml" },
      { french: "carottes", spanish: "zanahorias", quantity: "3" },
      { french: "oignons", spanish: "cebollas", quantity: "2" },
      { french: "lardons", spanish: "taquitos de bacon", quantity: "150g" },
      { french: "champignons", spanish: "champinones", quantity: "250g" },
      { french: "bouquet garni", spanish: "ramillete de hierbas aromaticas", quantity: "1" },
      { french: "ail", spanish: "ajo", quantity: "2 dientes" },
      { french: "farine", spanish: "harina", quantity: "2 cucharadas" },
      { french: "concentre de tomate", spanish: "concentrado de tomate", quantity: "2 cucharadas" },
      { french: "beurre", spanish: "mantequilla", quantity: "30g" },
      { french: "sel et poivre", spanish: "sal y pimienta", quantity: "al gusto" },
    ],
    steps: [
      { french: "Coupez la viande en gros morceaux et faites-la mariner dans le vin rouge.", spanish: "Corta la carne en trozos grandes y marinala en el vino tinto." },
      { french: "Egouttez la viande et sechez-la. Reservez la marinade.", spanish: "Escurre la carne y secala. Reserva la marinada." },
      { french: "Faites dorer la viande dans le beurre a feu vif.", spanish: "Dora la carne en la mantequilla a fuego alto." },
      { french: "Ajoutez les lardons, les oignons et les carottes.", spanish: "Anade los taquitos de bacon, las cebollas y las zanahorias." },
      { french: "Saupoudrez de farine et ajoutez le concentre de tomate.", spanish: "Espolvorea con harina y anade el concentrado de tomate." },
      { french: "Versez la marinade et le bouquet garni.", spanish: "Vierte la marinada y el ramillete de hierbas." },
      { french: "Laissez mijoter a feu doux pendant 2h30.", spanish: "Deja cocinar a fuego lento durante 2h30." },
      { french: "Ajoutez les champignons 30 minutes avant la fin.", spanish: "Anade los champinones 30 minutos antes del final." },
    ],
    versions: [
      { level: "B2", instructions: "Le boeuf bourguignon est un plat emblematique de la Bourgogne. Cette recette traditionnelle necessite une longue cuisson pour attendrir la viande et developper les saveurs. La marinade dans le vin rouge est une etape essentielle. On fait d'abord dorer la viande pour creer une croute savoureuse, puis on ajoute les legumes et le vin. Le bouquet garni parfume le tout pendant la cuisson de presque trois heures. Les champignons sont ajoutes a la fin pour garder leur texture." },
      { level: "C1", instructions: "Le boeuf bourguignon incarne l'essence meme de la gastronomie terroir bourguignonne. Ce plat requiert une orchestration minutieuse de techniques culinaires fondamentales. La marinade prealable de la viande dans un vin rouge charnu, idealement un Bourgogne, permet non seulement d'attendrir les fibres musculaires mais egalement d'impregner la piece de saveurs profondes. Le saisissement a haute temperature de la viande provoque la reaction de Maillard, conferant ces notes complexes de torrefaction. L'incorporation progressive des garnitures aromatiques, le deglacage au vin et la cuisson prolongee a fremiessement transforment cette preparation rustique en un mets d'une elegance remarquable. Le bouquet garni, traditionellement compose de thym, laurier et persil, constitue la signature olfactive de ce classique." },
    ],
    quiz: [
      { question: "De que region francesa es originario el boeuf bourguignon?", options: ["Provenza", "Alsacia", "Borgona", "Normandia"], correctIdx: 2 },
      { question: "Cuanto tiempo de coccion lenta necesita este plato?", options: ["1 hora", "2h30", "4 horas", "30 minutos"], correctIdx: 1 },
      { question: "Que significa 'champignons' en espanol?", options: ["Zanahorias", "Cebollas", "Champinones", "Patatas"], correctIdx: 2 },
    ],
    culturalNote: "El boeuf bourguignon fue elevado a la alta cocina por Auguste Escoffier a principios del siglo XX, pero sus origenes son humildes: los campesinos borgoones cocinaban las partes duras de la ternera lentamente en vino tinto local. Julia Child popularizo este plato en Estados Unidos con su libro 'Mastering the Art of French Cooking' en 1961.",
  },
  // 7. Coq au Vin - Avanzado
  {
    title: "Coq au Vin",
    slug: "coq-au-vin",
    image: "/images/recipes/coq-au-vin.jpg",
    prepTime: "30 min",
    cookTime: "2 horas",
    servings: 4,
    difficulty: "Avanzado",
    ingredients: [
      { french: "poulet", spanish: "pollo", quantity: "1 entero, troceado" },
      { french: "vin rouge", spanish: "vino tinto", quantity: "750ml" },
      { french: "lardons", spanish: "taquitos de bacon", quantity: "150g" },
      { french: "petits oignons", spanish: "cebollitas", quantity: "12" },
      { french: "champignons", spanish: "champinones", quantity: "250g" },
      { french: "carottes", spanish: "zanahorias", quantity: "2" },
      { french: "ail", spanish: "ajo", quantity: "3 dientes" },
      { french: "bouquet garni", spanish: "ramillete de hierbas", quantity: "1" },
      { french: "cognac", spanish: "conac", quantity: "50ml" },
      { french: "farine", spanish: "harina", quantity: "2 cucharadas" },
      { french: "beurre", spanish: "mantequilla", quantity: "40g" },
    ],
    steps: [
      { french: "Faites mariner le poulet dans le vin rouge toute la nuit.", spanish: "Marina el pollo en el vino tinto toda la noche." },
      { french: "Egouttez le poulet et sechez-le. Reservez la marinade.", spanish: "Escurre el pollo y secalo. Reserva la marinada." },
      { french: "Faites dorer le poulet dans le beurre.", spanish: "Dora el pollo en la mantequilla." },
      { french: "Flambez avec le cognac.", spanish: "Flambea con el conac." },
      { french: "Ajoutez les lardons, les oignons, l'ail et les carottes.", spanish: "Anade los taquitos de bacon, las cebollitas, el ajo y las zanahorias." },
      { french: "Saupoudrez de farine et versez la marinade.", spanish: "Espolvorea con harina y vierte la marinada." },
      { french: "Ajoutez le bouquet garni et laissez mijoter 1h30.", spanish: "Anade el ramillete de hierbas y deja cocinar 1h30." },
      { french: "Ajoutez les champignons et cuisez encore 30 minutes.", spanish: "Anade los champinones y cocina 30 minutos mas." },
    ],
    versions: [
      { level: "B2", instructions: "Le coq au vin est un plat paysan devenu un grand classique de la gastronomie francaise. Traditionnellement, on utilisait un vieux coq dont la chair etait dure et necessitait une longue cuisson dans le vin. Aujourd'hui, on utilise generalement du poulet. La marinade au vin rouge est fondamentale pour parfumer la viande. Le flambage au cognac apporte une touche d'elegance. La cuisson lente permet a tous les ingredients de se fondre harmonieusement. Ce plat se bonifie lorsqu'il est rechauffe le lendemain." },
      { level: "C1", instructions: "Le coq au vin represente un archetype de la cuisine bourgeoise francaise, ou la transformation alchimique d'ingredients modestes en un plat d'exception temoigne du genie culinaire hexagonal. La marinade prolongee dans un vin rouge corpulent constitue la pierre angulaire de la recette, assurant une penetration en profondeur des tanins et des aromes. Le flambage au cognac, au-dela de son aspect spectaculaire, contribue a l'elaboration d'un fond de saveurs intenses par la caramelisation des sucres de l'alcool. La garniture aromatique, composee de petits oignons grelots, de lardons et de champignons, forme la trilogie classique qui definit ce plat. La liaison finale, realisee avec un beurre manie, confere a la sauce cette onctuosite veloutee caracteristique qui nappe delicatement chaque morceau de volaille." },
    ],
    quiz: [
      { question: "Cuanto tiempo debe marinarse el pollo?", options: ["1 hora", "4 horas", "Toda la noche", "30 minutos"], correctIdx: 2 },
      { question: "Que significan 'petits oignons' en espanol?", options: ["Ajos", "Puerros", "Cebollitas", "Chalotas"], correctIdx: 2 },
      { question: "Con que se flambea el pollo?", options: ["Vino blanco", "Conac", "Whisky", "Armagnac"], correctIdx: 1 },
    ],
    culturalNote: "El coq au vin es uno de los platos mas antiguos de Francia y esta ligado a una leyenda: se dice que el lider galo Vercingetorix envio un gallo (simbolo de Francia) a Julio Cesar como desafio. Cesar lo cocino en vino como respuesta. Historicamente, este plato usaba gallos viejos y duros que necesitaban horas de coccion. Cada region tiene su version: en Alsacia se usa Riesling, en el Jura vin jaune.",
  },
  // 8. Creme Brulee - Facil
  {
    title: "Creme Brulee",
    slug: "creme-brulee",
    image: "/images/recipes/creme-brulee.jpg",
    prepTime: "15 min",
    cookTime: "45 min",
    servings: 4,
    difficulty: "Facil",
    ingredients: [
      { french: "creme liquide", spanish: "nata liquida", quantity: "500ml" },
      { french: "jaunes d'oeufs", spanish: "yemas de huevo", quantity: "5" },
      { french: "sucre", spanish: "azucar", quantity: "100g" },
      { french: "gousse de vanille", spanish: "vaina de vainilla", quantity: "1" },
      { french: "sucre cassonade", spanish: "azucar moreno", quantity: "4 cucharadas" },
    ],
    steps: [
      { french: "Prechauffez le four a 150 degres.", spanish: "Precalienta el horno a 150 grados." },
      { french: "Fendez la gousse de vanille et grattez les graines.", spanish: "Abre la vaina de vainilla y raspa las semillas." },
      { french: "Faites chauffer la creme avec la vanille.", spanish: "Calienta la nata con la vainilla." },
      { french: "Fouettez les jaunes d'oeufs avec le sucre.", spanish: "Bate las yemas de huevo con el azucar." },
      { french: "Versez la creme chaude sur les oeufs en melangeant.", spanish: "Vierte la nata caliente sobre los huevos mezclando." },
      { french: "Repartissez dans des ramequins et cuisez au bain-marie 45 minutes.", spanish: "Reparte en ramequines y cocina al bano maria 45 minutos." },
      { french: "Laissez refroidir, saupoudrez de cassonade et caramelisez au chalumeau.", spanish: "Deja enfriar, espolvorea con azucar moreno y carameliza con un soplete." },
    ],
    versions: [
      { level: "A2", instructions: "La creme brulee est un dessert francais delicieux. On melange de la creme, des oeufs et du sucre avec de la vanille. On fait cuire au four dans de petits pots. Apres, on met du sucre sur le dessus et on le fait bruler avec un chalumeau. Le dessus est croquant et l'interieur est cremeux." },
      { level: "B1", instructions: "La creme brulee est l'un des desserts les plus populaires des restaurants francais. Sa preparation est plus simple qu'il n'y parait. Il faut d'abord infuser la creme avec une gousse de vanille fendue. Ensuite, on prepare un appareil en fouettant les jaunes d'oeufs avec le sucre jusqu'a obtenir un melange blanchatre. On incorpore delicatement la creme chaude. La cuisson se fait au bain-marie dans un four doux pendant 45 minutes. Le dessert doit trembler legerement au centre. Apres plusieurs heures au refrigerateur, saupoudrez de cassonade et caramelisez a l'aide d'un chalumeau. Le contraste entre le caramel craquant et la creme onctueuse est divin." },
    ],
    quiz: [
      { question: "A que temperatura se hornea la creme brulee?", options: ["120 grados", "150 grados", "180 grados", "200 grados"], correctIdx: 1 },
      { question: "Que significa 'jaunes d'oeufs' en espanol?", options: ["Claras de huevo", "Huevos enteros", "Yemas de huevo", "Huevos cocidos"], correctIdx: 2 },
      { question: "Que se usa para caramelizar la parte superior?", options: ["El horno", "Un soplete", "Una sarten", "Un microondas"], correctIdx: 1 },
    ],
    culturalNote: "El origen de la creme brulee es disputado entre Francia, Inglaterra y Espana (donde existe la crema catalana). La version francesa clasica se atribuye a Francois Massialot, chef de cocina del duque de Orleans, que publico la receta en 1691. El ritual de romper la capa de caramelo crujiente con la cuchara es parte esencial de la experiencia gastronomica.",
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}
