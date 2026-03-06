import { Examen } from '../types'

export const examen_C2_exemple2: Examen = {
  id: 'C2-exemple2',
  nivel: 'C2',
  diploma: 'DALF',
  modalidad: 'demo',
  ejemplo: 2,
  titulo: 'DALF C2 — Exemple 2',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPRÉHENSION DE L'ORAL ───────────────────────────────
    // At C2, CO is part of "Épreuve individuelle: Compréhension et production orales" (50 pts total).
    // The candidate listens to a ~15 min audio recording twice, takes notes, then prepares a structured
    // oral presentation (compte rendu + point de vue argumenté + débat). We split CO = 25 pts.
    {
      id: 'C2-e2-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 30,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Vous allez entendre deux fois un enregistrement de 15 minutes environ. Vous écoutez une première fois l\'enregistrement. Concentrez-vous sur le document. Vous êtes invité(e) à prendre des notes. Vous avez ensuite 3 minutes de pause. Vous écoutez une seconde fois l\'enregistrement. Vous avez alors une heure pour préparer votre intervention.',
      notasEspeciales: [
        'Préparation : 1 heure après les 2 écoutes',
        'Passation : 30 minutes',
        'L\'usage de dictionnaires monolingues français / français est autorisé.',
      ],

      ejercicios: [
        // ── Exercice 1 : Compte rendu du document sonore ──
        {
          id: 'C2-e2-CO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Compte rendu du document sonore',
          instrucciones:
            'Vous devez présenter, en 5 à 10 minutes, le contenu du document. Vous aurez soin de reprendre l\'ensemble des informations et points de vue exprimés dans un ordre et selon une structure logique et efficace qui faciliteront l\'écoute pour le destinataire.',
          audio: '/examenes/audio/C2/dalf_c2_demo_sujet2.mp3',
          numEscuchas: 2,
          pausaEntreEscuchas: 180,
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e2-CO-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Présentez le contenu du document sonore de manière structurée. Reprenez l\'ensemble des informations et des points de vue exprimés dans un ordre logique et efficace.',
              puntos: 25,
              nota: 'Le thème du document audio porte sur la transmission du savoir et l\'avenir de l\'enseignement. Évaluation orale par un jury.',
              criteriosEvaluacion: [
                { label: 'Présentation et organisation du compte rendu', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Restitution des informations et points de vue', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Fidélité au contenu du document', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Compétence linguistique : lexique et correction', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Compétence linguistique : fluidité et aisance', valores: [0, 1, 2, 3, 4, 5] },
              ],
            },
          ],
        },
      ],
    },

    // ─── COMPRÉHENSION DES ÉCRITS ──────────────────────────────
    // At C2, CE is part of "Épreuve collective: Compréhension et production écrites" (50 pts total).
    // The candidate reads a dossier of ~2000 words (multiple documents) on a theme, then writes a
    // structured text of 700+ words. CE = 25 pts for reading comprehension.
    {
      id: 'C2-e2-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 210,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Lisez les documents du dossier « Robotique : menace ou progrès pour l\'humanité ? ». Ce dossier servira de base à votre production écrite. Votre compréhension des documents sera évaluée à travers la qualité de votre synthèse et de votre argumentation.',
      notasEspeciales: [
        'Durée totale de l\'épreuve collective (CE + PE) : 3 h 30 min',
        'L\'usage de dictionnaires monolingues français / français est autorisé.',
        'Le dossier comporte 8 documents (3 articles + 5 documents iconographiques)',
      ],

      ejercicios: [
        // ── Document 1 ──
        {
          id: 'C2-e2-CE-ex1',
          numero: 1,
          titulo: 'Document 1 — Les robots remplaceront-ils les humains au travail ?',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'Les robots remplaceront-ils les humains au travail ?\n\n' +
            'Table ronde avec Bruno Bonnell, PDG de Robopolis, société française spécialisée dans la robotique personnelle, Richard Castelli, commissaire artistique de l\'exposition « Art robotique » à la Cité des sciences et de l\'industrie à Paris et Brigitte Munier, enseignante-chercheuse.\n\n' +
            'De façon générale, la question des robots suscite à la fois engouement et crainte chez le grand public. Comment analysez-vous ces sentiments ambivalents ? [...]\n\n' +
            'Bruno Bonnell : Le mot « robot » a été inventé par l\'auteur tchèque Karel Capek de la pièce Rossum\'s Universal Robots (R.U.R), jouée en 1920, et qui mettait en scène des hommes décérébrés prenant la place des ouvriers dans les usines. Il vient de la racine slave « robota » qui signifie travail de force. De là sont nés deux mythes : le robot est un humanoïde et le robot va prendre la place de l\'homme. En parallèle, les romans et les films de science-fiction ont présenté des robots, comme les « Transformers » par exemple, aux pouvoirs surhumains. La fascination / répulsion des robots vient du respect qu\'ils inspirent pour exécuter des tâches pénibles et nous simplifier la vie mais qui se mêle à la crainte de les voir prendre le contrôle de nos vies. J\'ai identifié trois peurs fondamentales du robot : la crainte instinctive du métal contre la chair, la crainte sociétale, presque désespérée du robot qui va voler le travail de l\'homme, et, enfin, la crainte identitaire de voir le robot nous dépasser en capacités intellectuelles ou autres. Il faut juste toujours se rappeler qu\'ils sont avant tout des machines savantes et que l\'imagination des auteurs est sans limite. Le train, en son temps, était également craint... [...]\n\n' +
            'Aujourd\'hui ou demain, des robots seront-ils capables de remplacer les hommes au travail ? Deviendront-ils les esclaves de la société post-industrielle ? Quelles tâches pourraient-ils accomplir ? [...]\n\n' +
            'BB : Il n\'y a aucune tâche que les robots ne sauront pas, un jour, exécuter, de la plus fastidieuse à la plus méticuleuse, de la plus répétitive à la plus sophistiquée. Qui aurait pensé qu\'un jour les enfants de dix ans pouvaient avoir le monde dans leurs poches au bout d\'un portable... Les véhicules seront autonomes, plus besoin de chauffeurs, les opérations chirurgicales seront robotisées, les mines seront exploitées par des robots... Mais utiliser le mot esclave revient à considérer qu\'ils sont autre chose que des machines. Leurs capacités de déduction et de connexion sont certes développées, leur force mécanique est puissante, leur précision micrométrique, mais les robots restent des machines au service de l\'homme. Certains métiers vont disparaître, mais d\'autres apparaître. Le maréchal-ferrant et le cocher ont dû se reconvertir. À son essor, l\'industrie de l\'automobile a créé beaucoup plus d\'emplois qu\'elle n\'en a supprimés. Il est important d\'anticiper cette « robolution » et de former les gens à des métiers d\'avenir pour l\'accompagner, sans drame social.\n\n' +
            'Brigitte Munier : [...] L\'image d\'un robot esclave n\'est pas neuve ! Mais on peut aussi imaginer un robot allié ou compagnon, voire amant. Machine intelligente (capable d\'apprentissage), utilisée déjà dans le contexte des loisirs, de l\'éducation, de la médecine, de la police, de l\'armée, de la conquête spatiale, etc., le robot est voué à exécuter toutes les tâches pour lesquelles on voudra, ou pourra, le programmer. [...]\n\n' +
            'Justement, est-ce souhaitable ? Les robots libéreraient-ils les hommes des tâches répétitives pour leur permettre d\'exercer des travaux plus intéressants, voire d\'accomplir le rêve d\'une « société des loisirs » ? Ou bien, au contraire, l\'usage des robots risque-t-il de mener à des licenciements, des disparitions de métiers ou à des déqualifications ?\n\n' +
            'BM : Il appartient à l\'homme de ne pas se laisser intimider ou séduire par la puissance des robots au point de perdre le sens de la spécificité des compétences purement humaines : l\'illogisme apparent propre à l\'émotivité, à la sensibilité et à l\'imagination symbolique rend ces facultés inimitables par des machines, même programmées pour simuler l\'empathie. Ainsi l\'inaltérable patience de robots-instituteurs en Corée du Nord et au Japon convient-elle aux enfants autistes, mais nul ne sait comment évolueront les autres enfants qui n\'apprennent pas à composer avec les humeurs d\'un professeur humain... Cet exemple du philosophe Jean-Michel Besnier indique une voie pour méditer sur la nature des tâches que l\'homme de chair ne saurait confier sans dommages à ses créatures de fer.\n\n' +
            'BB : [...] La robotique va avoir l\'effet dans l\'industrie que l\'informatique a eu dans le service. Il sera nécessaire de faire un effort de pédagogie pour faire adopter ces nouvelles technologies qui se banaliseront. C\'est l\'enjeu de la robolution : changer d\'ère industrielle et par là même changer notre perception d\'un travail forcé pour un travail choisi. [...]\n\n' +
            'Les projets « d\'usines du futur » semblent conçus à partir de et avec la robotique : après l\'entreprise délocalisée... se dirige-t-on vers l\'entreprise déshumanisée ?\n\n' +
            'Richard Castelli : C\'est déjà le cas avec la finance où ce sont des robots-logiciels qui prennent les décisions car ils sont les seuls à pouvoir réagir à la nanoseconde avec l\'inconvénient qu\'ils puissent surréagir avec les résultats que l\'on sait... Pour une entreprise de production de biens, « l\'usine », ce sera toujours la raison économique qui déterminera le pourcentage et le degré d\'automatisation. Paul Andreu, l\'architecte de l\'aéroport de Roissy (du terminal 1 au terminal 2E-K) ainsi que de l\'Opéra de Pékin entre autres, s\'était demandé s\'il devait installer des portes automatiques dans un aéroport qu\'il était en train de concevoir comme le requérait tout aéroport digne de ce nom car, après un rapide calcul à partir des conditions locales, le coût d\'achat et surtout de maintenance d\'une porte automatique revenait plus cher que le salaire d\'un portier qui pouvait nourrir une famille avec... ce que la porte était bien incapable de faire ! C\'est pourquoi, il décida de remplacer les habituelles portes automatiques par des portiers en superbe livrée, ce qui donna un caractère très luxueux à cet aéroport. L\'histoire ne dit pas si, après quelques années, l\'aéroport ne s\'est pas débarrassé des portiers et a laissé le voyageur se débrouiller tout seul ! Pour d\'autres types d\'entreprises, les décisions continueront à nécessiter la présence d\'humains, mais avec probablement pas beaucoup plus de compétences que celles d\'un robot.\n\n' +
            'BB : [...] : Je suis persuadé que la robolution va profondément modifier notre système économique. [...]. En ce qui me concerne, « elle ne nous donnera plus d\'excuses pour ne pas avoir de temps pour l\'autre. »\n\n' +
            'Entretiens croisés réalisés par Anna MUSSO, L\'Humanité des débats',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 2 ──
        {
          id: 'C2-e2-CE-ex2',
          numero: 2,
          titulo: 'Document 2 — Les ouvriers trop chers, remplacés par des robots',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'Les ouvriers trop chers, remplacés par des robots\n\n' +
            'Foxconn, le sous-traitant (...) d\'Apple et d\'autres compagnies high-tech, entend remplacer ses travailleurs par un million de robots. Une véritable nouvelle crise de l\'emploi se profile.\n\n' +
            '10 000 robots sont en train d\'être mis en place dans les (...) usines chinoises de Foxconn pour assembler l\'iPhone 6. (...) Foxconn communique bien sur le fait que les robots vont « aider » les ouvriers et non les « remplacer » ; qu\'ils vont permettre d\'augmenter les cadences. (...)\n\n' +
            'La question qui se pose ici est : est-ce que cette nouvelle révolution industrielle par le numérique, qui pousse bien plus loin l\'automatisation des tâches, ne va pas créer une sérieuse crise de l\'emploi ? Le discours convenu explique que les robots remplacent les tâches pénibles et répétitives et poussent les hommes vers des emplois plus qualifiés, plus gratifiants. Ce qu\'on entend depuis les premiers robots. Lorsque les pompistes ont disparu, que les caissières ont été remplacées par des caisses automatiques... Le million d\'ouvriers chinois en passe de perdre leur emploi ne va pas devenir cadre, créatif ou autre. Il va perdre son emploi car il ambitionne d\'être payé plus de 300 euros par mois et qu\'un robot est plus productif et moins cher.\n\n' +
            'Et qu\'on ne s\'y trompe pas, l\'automatisation permise par le numérique ne touche pas que les emplois les moins qualifiés. Des algorithmes de trading* remplacent parfois avantageusement des traders. Des journalistes sportifs et financiers commencent à être remplacés par des intelligences artificielles aux États-Unis, capables d\'analyser et de présenter des résultats. Et un algorithme a même été nommé au conseil d\'administration d\'une entreprise récemment. C\'est aussi le cas pour les pilotes et chauffeurs, puisque vont débarquer les véhicules qui se dirigent tout seuls. Et on pourrait multiplier les exemples.\n\n' +
            'C\'est bien une crise de l\'emploi vers laquelle on se dirige, et elle nous est promise par Bill Gates* : « La substitution logicielle, qu\'elle concerne les chauffeurs, les serveurs ou les infirmières, progresse. Sur la durée, la technologie va réduire la demande en emplois, particulièrement au bas de l\'échelle des compétences. Dans 20 ans, la demande de main-d\'oeuvre pour beaucoup de compétences sera substantiellement plus faible. Je ne pense pas que ce soit intégré dans le modèle mental des gens. » Car sans emploi, plus de salaire, plus de consommation, et l\'économie s\'écroule. Ce n\'est pas forcément une nouvelle catastrophiste si, d\'ici là, on peut repenser sérieusement notre rapport au travail, au salariat et à la répartition des richesses. Sinon, les hommes ne seront plus seulement en concurrence de « compétitivité » entre eux mais contre les machines, avant un effondrement du système économique.\n\n' +
            'D\'après un article de Pierric MARISSAL, http://www.humanite.fr\n\n' +
            '* trading : Le trading qualifie des opérations d\'achats et de ventes sur les marchés financiers afin de réaliser un profit.\n' +
            '* Bill Gates : informaticien et entrepreneur américain.',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 3 ──
        {
          id: 'C2-e2-CE-ex3',
          numero: 3,
          titulo: 'Document 3 — Robots : les humanoïdes seront-ils bientôt parmi nous ?',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'Robots : les humanoïdes seront-ils bientôt parmi nous ?\nAu salon Innorobo à Lyon, les humanoïdes se multiplient\n\n' +
            '« Je vous présente Romeo. » Après le petit et mignon Nao, Rodolphe Gelin, directeur des recherches de la société parisienne Aldebaran, dévoile un nouveau robot [...]. Du haut de ses 140 cm et avec ses 40 kg, Romeo est pensé comme un assistant pour les personnes en perte d\'autonomie. En effet, il doit aider aux actions simples, proposer une compagnie, et surtout veiller sur les personnes. « Le robot apprend », explique Rodolphe Gelin. « Il analyse toutes les habitudes, mais aussi les expressions sur le visage ou l\'intonation de la voix pour s\'assurer que tout va bien. » [...]\n\n' +
            'Seulement, le robot est encore à l\'état de prototype. « Il faudra encore une dizaine ou une vingtaine d\'années pour passer des prototypes de l\'on voit à des produits consommables satisfaisants », estime Bruno Bonnell, président du syndicat Syrobo et co-organisateur du salon. [...]\n\n' +
            'Vers une humanisation des robots ?\n\n' +
            'Les robots humanoïdes n\'en sont qu\'à leurs balbutiements. Mais un monde où humains et robots se côtoient n\'est pas si lointain. La start-up parisienne Syntheligence présente Lighty, un robot au visage d\'homme pour passer des émotions. Un visage humain est projeté sur un masque de plastique, et il s\'adapte à son interlocuteur (rire, larmes, dédain, gêne, neutre...). [...]\n\n' +
            'Mais gare à ne pas aller trop loin dans l\'humanisation. Le Japonais Hiroshi Ishiguro a ainsi créé son double robotique en latex, baptisé Geminoïd, bluffant de réalisme (aussi bien les cheveux que la peau ou l\'expression des yeux) mais tout aussi dérangeant. Le roboticien japonais Masahiro Mori a ainsi théorisé la « vallée dérangeante » (aussi appelée « vallée de l\'étrange »), une courbe selon laquelle plus le robot paraît humain, plus il suscite de la sympathie jusqu\'au point où la forte ressemblance provoque une forte répulsion.\n\n' +
            '[...] Selon Rodolphe Gelin : « Lors de l\'acquisition d\'un robot, nous passons un pacte avec celui-ci : tu es un objet et tu ne dois pas me mettre en danger. C\'est pourquoi il ne faut pas de doute et que l\'apparence rappelle qu\'il s\'agit bien d\'une machine. » Reste que l\'acceptation des robots évoluera au fil des futures générations, et pourrait même déboucher sur de l\'attachement [...]\n\n' +
            '« Aujourd\'hui, nous magnifions les robots pour faciliter leur future acceptation sociale », relève le psychiatre Serge Tisseron de l\'université Paris-VII, dans le magazine Les dossiers de la Recherche. Mais cette forte empathie peut avoir son revers. Dans la série Real Humans, des hommes tombent amoureux de leur robot. Aux Etats-Unis, des soldats risquent leur vie pour sauver de simples machines. Intégrer les robots à notre quotidien, c\'est bien, à condition de savoir les débrancher de temps en temps ! Qu\'il se rassure, pour l\'heure, Romeo ne dispose que d\'une autonomie d\'une cinquantaine de minutes...\n\n' +
            'Boris MANENTI, envoyé spécial du « Nouvel Observateur » à Lyon',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 4 ──
        {
          id: 'C2-e2-CE-ex4',
          numero: 4,
          titulo: 'Document 4 — Photographie : Nao et Romeo, robots d\'Aldebaran Robotics',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie de Nao et Romeo, les robots grand public made in France de la société parisienne Aldebaran Robotics. Nao est un petit robot humanoïde blanc et bleu d\'environ 58 cm. Romeo est un robot humanoïde plus grand (140 cm), conçu comme assistant pour les personnes en perte d\'autonomie.\n\n' +
            'D\'après http://1.bp.blogspot.com',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 5 ──
        {
          id: 'C2-e2-CE-ex5',
          numero: 5,
          titulo: 'Document 5 — Photographie : Le robot humanoïde « Geminoid-F »',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie montrant le robot humanoïde « Geminoid-F » (à gauche), et la femme qui a servi de modèle pour le concevoir (à droite). Le réalisme est saisissant : le robot reproduit fidèlement les traits du visage, les cheveux et l\'expression de la femme.\n\n' +
            'D\'après http://1.bp.blogspot.com',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 6 ──
        {
          id: 'C2-e2-CE-ex6',
          numero: 6,
          titulo: 'Document 6 — Photographie : ATLAS, robot humanoïde militaire',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie d\'ATLAS : le nouveau robot humanoïde développé par la DARPA (agence du Département de la défense des États-Unis), est capable de reproduire à la quasi-perfection les gestes d\'un être humain, en termes de mobilité et d\'agilité. Il pourrait bientôt remplacer certains soldats sur le terrain, notamment sur des zones accidentées difficiles d\'accès.\n\n' +
            'D\'après http://www.news.com',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 7 ──
        {
          id: 'C2-e2-CE-ex7',
          numero: 7,
          titulo: 'Document 7 — Photographie : Robots chirurgiens',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie montrant une opération chirurgicale assistée par des robots. Plusieurs bras robotiques sont utilisés lors d\'une intervention, avec des chirurgiens supervisants en arrière-plan. La robotique chirurgicale permet une précision micrométrique lors des opérations.\n\n' +
            'D\'après http://www.unicancer.fr',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 8 ──
        {
          id: 'C2-e2-CE-ex8',
          numero: 8,
          titulo: 'Document 8 — Photographie : Bras bioniques',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie montrant des patients équipés de bras bioniques développés par le docteur Todd Kuiken, directeur du Centre de médecine bionique au Rehabilitation Institute of Chicago. Les prothèses permettent aux patients de retrouver une mobilité et une fonctionnalité proches de celles d\'un bras naturel.\n\n' +
            'D\'après http://cache.20minutes.fr',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Synthèse de compréhension (évaluée via la PE) ──
        {
          id: 'C2-e2-CE-ex9',
          numero: 9,
          titulo: 'Évaluation de la compréhension des écrits',
          instrucciones:
            'La compréhension des documents du dossier est évaluée à travers votre production écrite. La qualité de votre synthèse, la pertinence de vos références aux documents et la justesse de votre interprétation seront prises en compte.',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e2-CE-ex9-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Votre compréhension du dossier « Robotique : menace ou progrès pour l\'humanité ? » sera évaluée à travers votre production écrite. Veillez à bien comprendre les enjeux, arguments et points de vue présentés dans les 8 documents avant de rédiger.',
              puntos: 25,
              nota: 'Au DALF C2, la compréhension des écrits est évaluée de manière intégrée avec la production écrite. Les 25 points de CE portent sur la capacité à comprendre, reformuler et exploiter les documents du dossier.',
              criteriosEvaluacion: [
                { label: 'Compréhension et restitution des contenus des documents', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Capacité à identifier les problématiques et points de vue', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Exploitation pertinente des informations du dossier', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Mise en relation et confrontation des documents', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Fidélité et précision dans la reformulation', valores: [0, 1, 2, 3, 4, 5] },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ÉCRITE ──────────────────────────────────────
    // At C2, PE is part of "Épreuve collective: Compréhension et production écrites" (50 pts total).
    // The candidate produces a structured text of 700+ words minimum based on the dossier.
    // PE = 25 pts.
    {
      id: 'C2-e2-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 210,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Production d\'un texte structuré (article, éditorial, rapport, discours...) à partir d\'un dossier de documents d\'environ 2 000 mots. Sujets au choix : traitez un seul des deux sujets. 700 mots minimum. L\'usage de dictionnaires monolingues français / français est autorisé.',
      notasEspeciales: [
        'Durée totale de l\'épreuve collective (CE + PE) : 3 h 30 min',
        'Sujets au choix : traitez un seul des deux sujets',
        '700 mots minimum',
      ],

      ejercicios: [
        {
          id: 'C2-e2-PE-ex1',
          numero: 1,
          titulo: 'Épreuve écrite — Sujet au choix',
          instrucciones:
            'Sujets au choix : traitez un seul des deux sujets.\n\n' +
            'Sujet 1 : En tant qu\'étudiant(e) en sciences technologiques, vous envoyez votre contribution à une revue scientifique francophone qui, en vue d\'un numéro spécial, a lancé un appel à ses lecteurs sur le thème « 2050 : avec la robotique, une société de loisirs ? Quelle place pour les robots dans la société du futur ? Révolution ou menace ? »\n\n' +
            'À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant.\n' +
            '700 mots minimum\n\n' +
            'Sujet 2 : Ancien(ne) employé(e) d\'une société qui a subi une vague massive de licenciements pour cause d\'automatisation, vous décidez d\'envoyer un article à un magazine scientifique francophone qui a posé la question à ses lecteurs : « Les robots domineront-ils un jour les hommes ? Faut-il avoir peur d\'eux ? Votre avis nous intéresse. »\n\n' +
            'À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant.\n' +
            '700 mots minimum',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e2-PE-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Choisissez l\'un des deux sujets et rédigez un texte structuré de 700 mots minimum.\n\n' +
                'Sujet 1 : Contribution à une revue scientifique. Thème : « 2050 : avec la robotique, une société de loisirs ? Quelle place pour les robots dans la société du futur ? Révolution ou menace ? »\n\n' +
                'Sujet 2 : Article pour un magazine scientifique. Thème : « Les robots domineront-ils un jour les hommes ? Faut-il avoir peur d\'eux ? »',
              puntos: 25,
              minPalabras: 700,
              sujetosAlternativos: [
                'Sujet 1 : En tant qu\'étudiant(e) en sciences technologiques, vous envoyez votre contribution à une revue scientifique francophone qui, en vue d\'un numéro spécial, a lancé un appel à ses lecteurs sur le thème « 2050 : avec la robotique, une société de loisirs ? Quelle place pour les robots dans la société du futur ? Révolution ou menace ? » À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant. 700 mots minimum.',
                'Sujet 2 : Ancien(ne) employé(e) d\'une société qui a subi une vague massive de licenciements pour cause d\'automatisation, vous décidez d\'envoyer un article à un magazine scientifique francophone qui a posé la question à ses lecteurs : « Les robots domineront-ils un jour les hommes ? Faut-il avoir peur d\'eux ? Votre avis nous intéresse. » À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant. 700 mots minimum.',
              ],
              criteriosEvaluacion: [
                { label: 'Respect de la consigne et du type de texte demandé', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Capacité à argumenter et à convaincre', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Cohérence et cohésion du texte', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Étendue et maîtrise du vocabulaire', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Étendue et maîtrise des structures grammaticales', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Compétence orthographique et ponctuation', valores: [0, 0.5, 1, 1.5, 2] },
                { label: 'Pertinence des références au dossier', valores: [0, 0.5, 1, 1.5, 2, 2.5, 3] },
                { label: 'Élaboration et originalité de la réflexion', valores: [0, 0.5, 1, 1.5, 2] },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ORALE ──────────────────────────────────────
    // At C2, PO is part of "Épreuve individuelle: Compréhension et production orales" (50 pts total).
    // After the compte rendu (CO), the candidate presents a developed point of view (monologue suivi)
    // then debates with the jury. PO = 25 pts.
    {
      id: 'C2-e2-PO',
      numero: 4,
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 30,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Épreuve en trois parties. Préparation : 1 heure après les 2 écoutes. Passation : 30 minutes. Cette intervention se fera en trois parties : présentation du contenu du document sonore ; développement personnel à partir de la problématique proposée dans la consigne ; débat avec le jury. L\'usage de dictionnaires monolingues français / français est autorisé.',
      notasEspeciales: [
        'La partie 1 (compte rendu) est notée dans la section CO',
        'Les parties 2 et 3 sont notées dans cette section PO',
        'Partie 2 : monologue suivi avec préparation — 10 minutes environ',
        'Partie 3 : exercice en interaction sans préparation — 10 minutes environ',
        'Le jury joue le rôle du modérateur du débat.',
      ],

      ejercicios: [
        // ── Partie 2 : Monologue suivi — Point de vue argumenté ──
        {
          id: 'C2-e2-PO-ex1',
          numero: 1,
          titulo: 'Partie 2 — Monologue suivi : Point de vue argumenté',
          instrucciones:
            'Le jury joue le rôle du modérateur du débat. Sujets au choix. Quel que soit le sujet choisi, vous aurez soin de présenter, en une dizaine de minutes, idées et exemples pour étayer vos propos et d\'organiser votre discours de manière élaborée et fluide avec une structure logique et efficace qui aidera le destinataire à remarquer les points importants.',
          puntuacionTotal: 15,
          preguntas: [
            {
              id: 'C2-e2-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Choisissez l\'un des deux sujets et présentez votre point de vue argumenté pendant environ 10 minutes.',
              puntos: 15,
              sujetosAlternativos: [
                'Sujet 1 : En tant que représentant(e) d\'une association de parents d\'élèves, vous êtes invité(e) à une table ronde sur la transmission du savoir. Vous exposez votre conception d\'une pédagogie réellement efficace pour l\'élève. Vous insistez notamment sur le caractère inadapté de certaines méthodes traditionnelles et la nécessité absolue d\'introduire les nouvelles technologies dans l\'école.',
                'Sujet 2 : En tant que porte-parole du syndicat des enseignants de votre établissement, vous participez à une conférence sur l\'avenir du métier d\'enseignant. Vous présentez ce qui, à votre avis, constitue les fondements de votre métier et les risques auxquels il est confronté. Vous exprimez vos craintes face aux tendances actuelles et proposez des pistes d\'évolution.',
              ],
              criteriosEvaluacion: [
                { label: 'Contenu et développement des idées', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Cohérence et organisation du discours', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Compétence linguistique : lexique, grammaire, prononciation', valores: [0, 1, 2, 3, 4, 5] },
              ],
            },
          ],
        },

        // ── Partie 3 : Débat ──
        {
          id: 'C2-e2-PO-ex2',
          numero: 2,
          titulo: 'Partie 3 — Exercice en interaction : Débat',
          instrucciones:
            'Sans préparation. 10 minutes environ. Dans cette partie, vous débattrez avec le jury. Vous serez amené(e) à défendre, nuancer, préciser votre point de vue et à réagir aux propos de votre interlocuteur.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'C2-e2-PO-ex2-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Débattez avec le jury sur le thème de la transmission du savoir et de l\'avenir de l\'enseignement. Défendez, nuancez et précisez votre point de vue. Réagissez aux propos de votre interlocuteur.',
              puntos: 10,
              criteriosEvaluacion: [
                { label: 'Capacité à interagir et à débattre', valores: [0, 1, 2, 3, 4, 5] },
                { label: 'Capacité à défendre et nuancer son point de vue', valores: [0, 1, 2, 3, 4, 5] },
              ],
            },
          ],
        },
      ],
    },
  ],
}
