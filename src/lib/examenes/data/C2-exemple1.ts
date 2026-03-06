import { Examen } from '../types'

export const examen_C2_exemple1: Examen = {
  id: 'C2-exemple1',
  nivel: 'C2',
  diploma: 'DALF',
  modalidad: 'demo',
  ejemplo: 1,
  titulo: 'DALF C2 — Exemple 1',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPRÉHENSION DE L'ORAL ───────────────────────────────
    // At C2, CO is part of "Épreuve individuelle: Compréhension et production orales" (50 pts total).
    // The candidate listens to a ~15 min audio recording twice, takes notes, then prepares a structured
    // oral presentation (compte rendu + point de vue argumenté + débat). We split CO = 25 pts.
    // The CO component is evaluated through the oral compte rendu of the audio content.
    {
      id: 'C2-e1-CO',
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
          id: 'C2-e1-CO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Compte rendu du document sonore',
          instrucciones:
            'Vous devez présenter, en 5 à 10 minutes, le contenu du document. Vous aurez soin de reprendre l\'ensemble des informations et points de vue exprimés dans un ordre et selon une structure logique et efficace qui faciliteront l\'écoute pour le destinataire.',
          audio: '/examenes/audio/C2/dalf_c2_demo_sujet1.mp3',
          numEscuchas: 2,
          pausaEntreEscuchas: 180,
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e1-CO-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Présentez le contenu du document sonore de manière structurée. Reprenez l\'ensemble des informations et des points de vue exprimés dans un ordre logique et efficace.',
              puntos: 25,
              nota: 'Le thème du document audio porte sur l\'évolution des relations patient-médecin. Évaluation orale par un jury.',
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
    // structured text of 700+ words. We split CE = 25 pts for reading comprehension.
    // The CE component is evaluated implicitly through how well the candidate uses/synthesizes the dossier documents.
    {
      id: 'C2-e1-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 210,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Lisez les documents du dossier « Bâtir l\'école du XXIe siècle ». Ce dossier servira de base à votre production écrite. Votre compréhension des documents sera évaluée à travers la qualité de votre synthèse et de votre argumentation.',
      notasEspeciales: [
        'Durée totale de l\'épreuve collective (CE + PE) : 3 h 30 min',
        'L\'usage de dictionnaires monolingues français / français est autorisé.',
        'Le dossier comporte 7 documents (3 articles + 4 documents iconographiques)',
      ],

      ejercicios: [
        // ── Document 1 ──
        {
          id: 'C2-e1-CE-ex1',
          numero: 1,
          titulo: 'Document 1 — Faut-il enseigner l\'informatique à l\'école primaire ? Et comment ?',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'Faut-il enseigner l\'informatique à l\'école primaire ? Et comment ?\n\n' +
            'La question n\'est plus de savoir s\'il faut apprendre l\'informatique et son langage, mais de savoir comment, pour quels usages, et à quelle étape du cursus le faire. [...]\n\n' +
            'Un curseur qu\'on a du mal à placer\n\n' +
            'L\'apprentissage du code, et plus largement d\'une culture générale du numérique, à l\'école est une mesure réclamée depuis longtemps par l\'Académie des sciences, soutenue par des acteurs qui comptent dans le secteur numérique. [...] Selon un sondage publié en mai dernier par BVA (société française de sondages) et le Syntec Numérique (fédération professionnelle du secteur informatique) favorable à la mesure, 87 % des Français seraient même d\'accord pour que la programmation informatique soit enseignée à l\'école (24 % à partir du primaire, 41 % à partir du collège).\n\n' +
            'Mais cette initiative suscite par ailleurs de nombreuses réticences. On entend souvent l\'argument selon lequel on n\'a pas besoin de connaître la mécanique pour apprendre à conduire. Le nombre insuffisant de professeurs formés est également un frein pour beaucoup d\'adversaires de cette mesure, qui la jugent inapplicable. Entre ceux qui ne jurent que par l\'introduction de l\'informatique dans l\'enseignement obligatoire, et ceux qui ont peur que l\'on veuille transformer le primaire en une grande école d\'informatique, il existe pourtant des pistes pour initier les enseignants et favoriser un passage du périscolaire au scolaire, sans avoir à attendre une réforme du socle commun* qui prendra des années. L\'action de la fondation La Main à la pâte, qui oeuvre depuis près de 20 ans pour enseigner la science différemment à l\'école, est un exemple dont on pourrait s\'inspirer.\n\n' +
            'La Main à la pâte, au service de la science à l\'école depuis 20 ans\n\n' +
            'La Fondation La Main à la pâte a été créée en 2011, dans la continuité de l\'opération du même nom lancée en 1995 par l\'Académie des sciences à l\'initiative du prix Nobel de physique, Georges Charpak. Cette action avait pour objectif, dès l\'origine, d\'aider les professeurs à enseigner la science et la technologie en mettant en oeuvre une pédagogie privilégiant l\'expérimentation, la discussion, une pratique active et collective. L\'idée était de stimuler chez les élèves l\'esprit scientifique et les capacités d\'expression, de favoriser leur compréhension du monde, et de leur permettre de mieux jouer leur rôle de citoyen en proposant des projets pédagogiques orientés vers des questions de société (éducation à la santé, au développement durable...). Chacun de ces projets touche en moyenne 10 000 classes. Un beau succès.\n\n' +
            'Une des originalités de la fondation est d\'impliquer la communauté scientifique dans la création des ressources pédagogiques, l\'accompagnement des classes et la formation continue des enseignants. « Ce qui n\'a l\'air de rien mais constituait une véritable révolution de palais à l\'époque, au ministère de l\'éducation nationale », confie David Wilgenbus, responsable du secteur production de ressources à La Main à la pâte. Un enseignement fondé sur l\'expérimentation et la pratique, des objectifs d\'apprentissage transversaux, des actions tournées en priorité vers la formation continue des enseignants, menées en collaboration avec la communauté scientifique et professionnelle : le travail de défrichage réalisé par la fondation dans le domaine des sciences pourrait s\'appliquer parfaitement à la problématique de l\'enseignement de la culture informatique.\n\n' +
            'Un premier programme dans deux ans\n\n' +
            'À vrai dire, La Main à la pâte a déjà commencé à réfléchir à la question. Depuis un peu plus de trois ans, elle a commencé à s\'intéresser à l\'enseignement des mathématiques en lien avec les sciences et la technologie, et, depuis deux ans, aux sciences cognitives, sous l\'angle de l\'éducation à la santé. En partenariat avec l\'INPES (Institut National de Prévention et d\'Éducation pour la Santé), elle a mis en place un programme sur l\'addiction aux écrans, qui aborde le fonctionnement du cerveau, à la limite des neurosciences. Il a rencontré un grand succès dans les écoles. Plusieurs milliers de classes ont participé à ce projet. « On s\'est alors dit que le terrain commençait à être favorable pour l\'informatique », raconte David Wilgenbus. « Le numérique est un pan de la science. Ce ne sont pas des mathématiques appliquées, ni juste de la programmation, ni de l\'électronique. » Un projet sortira dans deux ans, en partenariat avec l\'INRIA (Institut National de Recherche en Informatique et en Automatique). En attendant, de petites formations d\'initiation à l\'algorithmique et au langage informatique ont été réalisées pour les professeurs des écoles et des collèges, les inspecteurs et les formateurs d\'IUFM (Institut Universitaire de Formation des Maîtres).\n\n' +
            'Le but n\'est pas de fabriquer une génération d\'ingénieurs informaticiens\n\n' +
            '« Le but n\'est pas de fabriquer une génération d\'ingénieurs informaticiens, explique David Wilgenbus. Notre pays a intérêt à développer la culture technique et scientifique. Nous vivons dans un monde interconnecté, mais rares sont les personnes qui comprennent comment ça marche. Une conséquence, par exemple, est de ne pas connaître les risques que l\'on encourt, notamment en termes de protection des données. L\'idée est aussi de ne pas être passif dans ses usages de la technologie. Une machine, ça se contrôle, ça obéit à des instructions. Mais trop de gens sont encore désarmés face aux ordinateurs. » Il s\'agit vraiment d\'introduire l\'informatique dans la culture générale. « À l\'école, on apprend plein de choses qui ne servent à rien dans la vie de tous les jours mais qui fondent une culture et un référentiel commun. La science en fait partie. »\n\n' +
            'Un enseignement scolaire pour créer des liens entre les matières\n\n' +
            'À cet égard, l\'apprentissage du code, qui plus est en périscolaire, est limitatif. « L\'avantage d\'un enseignement à l\'école, ce sont les liens avec les autres matières, les ponts que sont capables de faire les professeurs. Étudier la différence entre un langage naturel et un langage informatique, c\'est intéressant quand on enseigne le français. Pareil pour les mathématiques », poursuit David Wilgenbus. Cette notion est très importante. Etymologiquement, l\'intelligence, c\'est la capacité à faire des liens. [...]\n\n' +
            'Par Raphaële KARAYAN, L\'Express\n\n' +
            '* socle commun : le socle commun de connaissances et de compétences présente tout ce qu\'un élève doit savoir à la fin de la scolarité obligatoire.',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 2 ──
        {
          id: 'C2-e1-CE-ex2',
          numero: 2,
          titulo: 'Document 2 — L\'école doit s\'adapter au XXIe siècle',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'L\'école doit s\'adapter au XXIe siècle\n\n' +
            'Du fait de la progression démographique et du développement des classes moyennes dans le monde, les systèmes éducatifs vont devoir former, d\'ici à 2050, autant d\'étudiants que durant toute l\'histoire de l\'humanité réunie. D\'ici là, « l\'infosphère » continuera son expansion vertigineuse ; la masse de connaissances double déjà tous les deux ans. Il est donc grand temps d\'anticiper et de repenser la valeur ajoutée de l\'enseignement futur. L\'éducation est censée préparer la jeune génération à l\'avenir. Mais le fait-elle encore ? Imparfaitement, en tout cas. Une preuve en est que deux millions d\'emplois en Europe, nécessitant des compétences scientifiques et technologiques, ne sont pas pourvus ; rien que dans le secteur informatique, il manque cent mille programmeurs. [...]\n\n' +
            'Pour de multiples raisons, l\'éducation s\'est focalisée sur la spécialisation. Or la grande majorité des jeunes n\'auront pas « un » emploi mais « des » emplois tout au long de leur vie, surtout si l\'on considère l\'accélération des technologies et le fait que les enfants qui terminent leurs études maintenant ne seront à la retraite qu\'après 2070. Même à l\'université, les études sont trop focalisées et seuls 5 % des étudiants qui ont un doctorat occuperont une fonction académique. Les autres seront-ils pour autant formés à un métier ? On en doute. Trop se spécialiser dans un environnement qui change sans cesse, c\'est comme rouler vite avec des oeillères. [...]\n\n' +
            'Dorénavant, il faut que l\'enseignement s\'intéresse à plusieurs disciplines à la fois. Même si l\'on admet que l\'innovation sera au rendez-vous, à la croisée des technologies – les nano-, bio-, info-, neuro-,... – on oublie encore qu\'il faut être capable d\'intégrer en même temps les aspects sociétaux, culturels et autres. Alors pourquoi ne pas commencer dès l\'école ? Par exemple, l\'énergie, la santé, les transports ou le climat peuvent être des thèmes de synthèse intégrant la géographie, l\'histoire, la chimie, les mathématiques, la physique... tout en étant déclinés sous l\'aspect culturel, artistique, juridique, politique ou économique.\n\n' +
            'Pour pallier le manque de compétences transversales, la créativité dans les salles de classe de tous âges pourrait être le fait des élèves eux-mêmes, en devenant des « proconsommateurs » – producteurs et consommateurs – de connaissances. Ceci pourrait donner lieu à des jeux interactifs, qui sont un excellent moyen de mémorisation. Cela permettrait enfin de donner plus de sens – comme un lien avec la vie de tous les jours – à des matières qui peuvent être rédhibitoires. En effet, il n\'y a pas seulement un problème de contenu, il y a aussi la façon d\'enseigner et la motivation d\'une finalité. [...]\n\n' +
            'La gestion de la complexité sera bien le défi majeur du XXIe siècle. Si l\'éducation préparait à « un » avenir, il faudra qu\'elle prépare dès à présent à « des » avenirs. [...] Qu\'en est-il en effet d\'une société du savoir si elle n\'est pas savante ?\n\n' +
            'Par Didier SCHMITT (conseiller scientifique auprès du président de la Commission européenne), Le Monde.fr',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 3 ──
        {
          id: 'C2-e1-CE-ex3',
          numero: 3,
          titulo: 'Document 3 — L\'école ne peut plus être ce qu\'elle a été',
          instrucciones: 'Lisez attentivement ce document et prenez des notes en vue de la production écrite.',
          texto:
            'L\'école ne peut plus être ce qu\'elle a été\n\n' +
            'On ne peut plus repenser le contenu d\'une culture scolaire commune en se référant à ce qui existe ou a existé. Nous vivons dans un univers bouleversé par les révolutions scientifiques et technologiques, par de nouvelles pratiques culturelles. L\'évolution du monde nous oblige à nous ouvrir à une multitude de cultures et de visions. Nous devons nous envisager autant comme citoyens du monde que comme héritiers d\'une vieille nation. L\'évolution de la famille et ses conséquences sur l\'éducation des enfants participent également de ce renouvellement. Il faut prendre la mesure de ces bouleversements pour repenser les contenus scolaires, les manières de les enseigner et de les apprendre. « Lire, écrire, compter » ne sont plus les seuls apprentissages indispensables. Nous devons apprendre une multitude de langages : scientifiques tels le numérique, les langues étrangères, les langages des sons et des images, le langage du corps. Communiquer et penser dans tant de langages impose à l\'individu contemporain d\'entrer dans des systèmes et des réseaux qu\'il doit comprendre et hiérarchiser. Il doit en même temps acquérir des automatismes de lecture et de production d\'oraux, d\'écrits, d\'images ou de gestes. L\'école doit former les enfants à se séparer de leur comportement d\'usagers pour leur faire adopter une position distanciée qui les aidera à considérer ces langages comme des objets et des véhicules du savoir. C\'est ce décentrage que notre système éducatif ne parvient pas à transmettre aux nombreux élèves en échec.\n\n' +
            'Par Denis PAGET, L\'Humanité',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 4 ──
        {
          id: 'C2-e1-CE-ex4',
          numero: 4,
          titulo: 'Document 4 — Photographie : élèves avec tablettes',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie montrant des élèves dans une salle de classe, tenant des tablettes numériques devant leur visage. L\'image illustre l\'intégration des nouvelles technologies dans l\'éducation.\n\n' +
            'D\'après clionautes.org',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 5 ──
        {
          id: 'C2-e1-CE-ex5',
          numero: 5,
          titulo: 'Document 5 — Dessin humoristique : informatique et enseignement',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Dessin humoristique de Mart. Un enfant présente fièrement son ordinateur dernier cri : « Écran LCD panoramique 26 pouces », « Internet haut débit download 3000 Ko/s », « Clavier et souris laser sans fil », « Pentium 4, 3.1 GHz », « Son stéréo 5.1 Surround ». Puis il conclut : « Ça va révolutionner l\'enseignement des maths ! » Sur l\'écran, on voit simplement : 2 + 2 =, 5 + 7 =, 6 + 5 =, 8 + 3 =.\n\n' +
            'D\'après resonance-info-math2-miblog',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 6 ──
        {
          id: 'C2-e1-CE-ex6',
          numero: 6,
          titulo: 'Document 6 — Photographie : « L\'école coûte trop cher ? Essayez donc l\'ignorance »',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Photographie d\'une manifestation. Une personne brandit une pancarte en forme d\'ardoise d\'école sur laquelle est écrit : « L\'école coûte trop cher ? Essayez donc l\'ignorance ! »\n\n' +
            'D\'après doublecasquette3.eklablog.com',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Document 7 ──
        {
          id: 'C2-e1-CE-ex7',
          numero: 7,
          titulo: 'Document 7 — Infographie : Apprendre avant le numérique vs. Apprendre à l\'ère numérique',
          instrucciones: 'Observez ce document iconographique.',
          texto:
            '[Document iconographique] Infographie comparative en deux colonnes :\n\n' +
            'APPRENDRE AVANT LE NUMÉRIQUE :\n' +
            '- UN CADRE SPATIO-TEMPOREL STRUCTURÉ : Les temps de l\'apprentissage sont marqués par l\'unité de temps et de lieu comme à l\'école, influencée par un modèle industriel du XIXe siècle.\n' +
            '- UN RAPPORT AU SAVOIR CENTRÉ : L\'autorité du savoir est entre les mains de l\'enseignant qui détient la vérité et la transmet. Son autorité relève de l\'expertise et de la reconnaissance qu\'on lui porte. Le livre et le manuel en sont les artefacts.\n' +
            '- UNE PENSÉE LINÉAIRE : La pensée s\'organise selon un schéma linéaire d\'après un modèle hérité des démonstrations antiques. L\'apprentissage est structuré, programmé et communiqué. L\'apprenant doit gérer le flot qu\'on lui déverse.\n' +
            '- DES RÉFÉRENCES THÉORIQUES DISPERSÉES : On s\'appuie sur des cadres théoriques divers et même parfois opposés pour concevoir les apprentissages.\n\n' +
            'APPRENDRE À L\'ÈRE NUMÉRIQUE :\n' +
            '- UN SCHÉMA SPATIO-TEMPOREL ÉCLATÉ : Apprendre peut se faire n\'importe où et n\'importe quand par le biais des outils modernes et des réseaux de télécommunications. On peut dès lors envisager un apprentissage flexible.\n' +
            '- UN RAPPORT AU SAVOIR POLYCENTRIQUE : Il faut aujourd\'hui articuler des autorités dispersées voire en concurrence. On navigue entre des autorités multiples basées sur la recommandation. Les écrans et les moteurs de recherche sont des artefacts.\n' +
            '- UNE PENSÉE RÉTICULAIRE : La pensée s\'envisage en réseaux pour aborder la complexité du monde selon l\'influence de la systémique. Apprendre revient à se confronter à l\'imprévu et à l\'altérité. L\'apprenant doit gérer le flux qu\'il traverse.\n' +
            '- DES RÉFÉRENCES THÉORIQUES GLOBALES ET INTÉGRÉES : On s\'appuie sur des cadres théoriques qui s\'articulent pour concevoir un écosystème qui favorise l\'apprenance.\n\n' +
            'D\'après cultivoo.com',
          puntuacionTotal: 0,
          preguntas: [],
        },

        // ── Synthèse de compréhension (évaluée via la PE) ──
        {
          id: 'C2-e1-CE-ex8',
          numero: 8,
          titulo: 'Évaluation de la compréhension des écrits',
          instrucciones:
            'La compréhension des documents du dossier est évaluée à travers votre production écrite. La qualité de votre synthèse, la pertinence de vos références aux documents et la justesse de votre interprétation seront prises en compte.',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e1-CE-ex8-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Votre compréhension du dossier « Bâtir l\'école du XXIe siècle » sera évaluée à travers votre production écrite. Veillez à bien comprendre les enjeux, arguments et points de vue présentés dans les 7 documents avant de rédiger.',
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
      id: 'C2-e1-PE',
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
          id: 'C2-e1-PE-ex1',
          numero: 1,
          titulo: 'Épreuve écrite — Sujet au choix',
          instrucciones:
            'Sujets au choix : traitez un seul des deux sujets.\n\n' +
            'Sujet 1 : Vous rédigez un article pour le bulletin de l\'association des parents d\'élèves dont vous faites partie. Vous reconnaissez qu\'au XXIe siècle, l\'école doit s\'ouvrir aux technologies de l\'information et de la communication (TIC) et préparer les futurs citoyens à s\'en servir efficacement. Cependant, vous craignez que ceci ne se fasse au détriment de l\'enseignement de certains savoirs et de certaines valeurs et, surtout, pour des raisons financières.\n\n' +
            'À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant.\n' +
            '700 mots minimum\n\n' +
            'Sujet 2 : Vous rédigez un article pour le dossier Les nouvelles valeurs de l\'école, publié par votre université. Vous êtes convaincu(e) que l\'ouverture de l\'école aux nouvelles technologies est une priorité indéniable. Certes, le rôle de l\'école n\'est pas de former des techniciens, mais ce siècle est marqué par de profonds changements. L\'école doit en tenir compte au moment de repenser ses priorités.\n\n' +
            'À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant.\n' +
            '700 mots minimum',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C2-e1-PE-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Choisissez l\'un des deux sujets et rédigez un texte structuré de 700 mots minimum.\n\n' +
                'Sujet 1 : Article pour le bulletin de l\'association des parents d\'élèves. Thème : l\'école doit s\'ouvrir aux TIC mais vous craignez que ceci ne se fasse au détriment de certains savoirs et valeurs, et pour des raisons financières.\n\n' +
                'Sujet 2 : Article pour le dossier « Les nouvelles valeurs de l\'école » de votre université. Thème : l\'ouverture de l\'école aux nouvelles technologies est une priorité indéniable.',
              puntos: 25,
              minPalabras: 700,
              sujetosAlternativos: [
                'Sujet 1 : Vous rédigez un article pour le bulletin de l\'association des parents d\'élèves dont vous faites partie. Vous reconnaissez qu\'au XXIe siècle, l\'école doit s\'ouvrir aux technologies de l\'information et de la communication (TIC) et préparer les futurs citoyens à s\'en servir efficacement. Cependant, vous craignez que ceci ne se fasse au détriment de l\'enseignement de certains savoirs et de certaines valeurs et, surtout, pour des raisons financières. À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant. 700 mots minimum.',
                'Sujet 2 : Vous rédigez un article pour le dossier Les nouvelles valeurs de l\'école, publié par votre université. Vous êtes convaincu(e) que l\'ouverture de l\'école aux nouvelles technologies est une priorité indéniable. Certes, le rôle de l\'école n\'est pas de former des techniciens, mais ce siècle est marqué par de profonds changements. L\'école doit en tenir compte au moment de repenser ses priorités. À l\'aide du dossier joint et d\'arguments personnels, vous rédigez un texte structuré dans lequel vous prenez clairement position sur la question et proposez des solutions concrètes, en adoptant un style approprié et convaincant. 700 mots minimum.',
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
      id: 'C2-e1-PO',
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
      ],

      ejercicios: [
        // ── Partie 2 : Monologue suivi — Point de vue argumenté ──
        {
          id: 'C2-e1-PO-ex1',
          numero: 1,
          titulo: 'Partie 2 — Monologue suivi : Point de vue argumenté',
          instrucciones:
            'Le jury tient le rôle du journaliste de l\'émission de radio à laquelle vous avez assisté. Sujets au choix. Quel que soit le sujet choisi, vous aurez soin de présenter, en une dizaine de minutes, idées et exemples pour étayer vos propos et d\'organiser votre discours de manière élaborée et fluide avec une structure logique et efficace qui aidera le destinataire à remarquer les points importants.',
          puntuacionTotal: 15,
          preguntas: [
            {
              id: 'C2-e1-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Choisissez l\'un des deux sujets et présentez votre point de vue argumenté pendant environ 10 minutes.',
              puntos: 15,
              sujetosAlternativos: [
                'Sujet 1 : En tant que citoyen, vous prenez part à l\'émission de radio dont le thème est l\'évolution des relations patient-médecin. Vous êtes d\'accord avec Luc Perino sur le fait que la médecine moderne affecte les relations entre les médecins et les patients. Mais vous pensez que, même si tout progrès scientifique suscite des inconvénients, ceux-ci sont mineurs par rapport aux avantages qu\'ils procurent, qu\'il s\'agisse de médecine ou d\'autres domaines. Vous argumentez dans ce sens en vous appuyant sur des exemples.',
                'Sujet 2 : En tant que citoyen, vous prenez part à l\'émission de radio dont le thème est l\'évolution des relations patient-médecin. Vous pensez qu\'il est inévitable que la relation patient-médecin évolue et que ceci ne soit pas seulement dû à des pressions financières. Et même si l\'avancée des sciences en général est étroitement liée aux enjeux économiques, cela ne vous apparaît pas comme étant négatif. Vous argumentez dans ce sens en vous appuyant sur des exemples.',
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
          id: 'C2-e1-PO-ex2',
          numero: 2,
          titulo: 'Partie 3 — Exercice en interaction : Débat',
          instrucciones:
            'Sans préparation. 10 minutes environ. Dans cette partie, vous débattrez avec le jury. Vous serez amené(e) à défendre, nuancer, préciser votre point de vue et à réagir aux propos de votre interlocuteur.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'C2-e1-PO-ex2-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Débattez avec le jury sur le thème de l\'évolution des relations patient-médecin. Défendez, nuancez et précisez votre point de vue. Réagissez aux propos de votre interlocuteur.',
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
