import { Examen } from '../types'

export const examen_B2_exemple2: Examen = {
  id: 'B2-exemple2',
  nivel: 'B2',
  diploma: 'DELF',
  modalidad: 'demo',
  ejemplo: 2,
  titulo: 'DELF B2 — Exemple 2',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPRÉHENSION DE L'ORAL ───────────────────────────────
    {
      id: 'B2-e2-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 30,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Vous allez écouter plusieurs documents. Pour répondre aux questions, cochez la bonne réponse ou écrivez l\'information demandée.',
      notasEspeciales: ['Durée maximale de l\'ensemble des documents : 8 min'],

      ejercicios: [
        // ── Exercice 1 : interview professeur Drancourt (téléphones portables hôpital) — 18 pts ──
        {
          id: 'B2-e2-CO-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            "Vous allez entendre deux fois un enregistrement de 5 minutes environ. Vous avez tout d'abord 1 minute pour lire les questions. Puis vous écoutez une première fois l'enregistrement. Vous avez ensuite 3 minutes pour répondre aux questions. Vous écoutez une seconde fois l'enregistrement. Vous avez encore 5 minutes pour compléter vos réponses. Pour répondre aux questions, cochez la bonne réponse ou écrivez l'information demandée. Lisez les questions, écoutez le document puis répondez.",
          audio: '/examenes/audio/B2/delf-b2-tp-coll-exemple2-exercice1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 60,
          pausaEntreEscuchas: 180,
          tiempoRespuestaFinal: 300,
          puntuacionTotal: 18,
          preguntas: [
            {
              id: 'B2-e2-CO-ex1-p1',
              numero: 1,
              tipo: 'reponse-libre',
              enunciado: "Qu'enseigne le professeur Michel Drancourt ?",
              puntos: 1,
              respuestaCorrecta: 'La microbiologie.',
            },
            {
              id: 'B2-e2-CO-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Michel Drancourt...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: "propose de conduire une étude" },
                { letra: 'B', texto: "confirme les résultats d'une étude" },
                { letra: 'C', texto: "conteste la méthodologie d'une étude" },
              ],
              respuestaCorrecta: 'B',
              nota: '... sur les téléphones portables.',
            },
            {
              id: 'B2-e2-CO-ex1-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado:
                "D'après Michel Drancourt, quel problème pose le téléphone portable à l'hôpital ?",
              puntos: 1.5,
              respuestaCorrecta:
                "Il peut être responsable d'infections (nosocomiales). Il peut transmettre des infections aux patients. Il peut être contaminé avec des bactéries/virus.",
            },
            {
              id: 'B2-e2-CO-ex1-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "Pour quelle raison aucune étude sur les téléphones portables n'a été faite ?",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "Ils n'avaient soulevé aucun soupçon." },
                { letra: 'B', texto: 'Ils étaient indispensables pour les médecins.' },
                { letra: 'C', texto: "Ils n'étaient pas fréquents dans les hôpitaux." },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CO-ex1-p5',
              numero: 5,
              tipo: 'reponse-libre',
              enunciado:
                'Citez deux autres objets qui ont servi pour le même type de recherche.',
              puntos: 1,
              respuestaCorrecta:
                'Deux réponses parmi : appareils de prise de tension, thermomètres, ordinateurs, claviers d\'ordinateurs.',
            },
            {
              id: 'B2-e2-CO-ex1-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado: "Qu'est-ce qui surprend la journaliste ?",
              puntos: 2,
              respuestaCorrecta:
                "Qu'une partie du personnel médical ne se désinfecte pas automatiquement les mains. Que tous les soignants ne se lavent pas systématiquement les mains après chaque acte médical.",
            },
            {
              id: 'B2-e2-CO-ex1-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado: "Michel Drancourt considère qu'il est indispensable de...",
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto: "se laver systématiquement les mains à l'eau et au savon.",
                },
                {
                  letra: 'B',
                  texto:
                    'se désinfecter les mains avec une solution hydro-alcoolique.',
                },
                {
                  letra: 'C',
                  texto:
                    'se laver et, en plus, se désinfecter avec une solution hydro-alcoolique.',
                },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e2-CO-ex1-p8',
              numero: 8,
              tipo: 'qcm',
              enunciado: 'Selon Michel Drancourt...',
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto:
                    'la majorité des patients ne se désinfecte pas les mains.',
                },
                {
                  letra: 'B',
                  texto:
                    'la totalité des hôpitaux dispose de solutions hydro-alcooliques.',
                },
                {
                  letra: 'C',
                  texto:
                    'la majorité des médecins se désinfecte régulièrement les mains.',
                },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e2-CO-ex1-p9',
              numero: 9,
              tipo: 'reponse-libre',
              enunciado:
                'Sur quoi portent les critiques du professeur Drancourt ?',
              puntos: 1.5,
              respuestaCorrecta:
                "Les téléphones portables et les pratiques d'hygiène.",
            },
            {
              id: 'B2-e2-CO-ex1-p10',
              numero: 10,
              tipo: 'reponse-libre',
              enunciado:
                "Quel est, selon le professeur Drancourt, le rôle des médias dans le renforcement de l'hygiène ?",
              puntos: 1.5,
              respuestaCorrecta:
                "La diffusion de l'information. La communication.",
            },
            {
              id: 'B2-e2-CO-ex1-p11',
              numero: 11,
              tipo: 'reponse-libre',
              enunciado: 'Que suggère la journaliste aux patients ?',
              puntos: 2,
              respuestaCorrecta:
                'Que les patients exigent que le personnel médical se désinfecte les mains.',
            },
            {
              id: 'B2-e2-CO-ex1-p12',
              numero: 12,
              tipo: 'qcm',
              enunciado: 'Michel Drancourt propose...',
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto:
                    "d'interdire totalement l'utilisation du portable dans les hôpitaux.",
                },
                {
                  letra: 'B',
                  texto:
                    "d'autoriser l'utilisation du portable pour les médecins uniquement.",
                },
                {
                  letra: 'C',
                  texto:
                    "de réduire l'utilisation du portable par les médecins et les patients.",
                },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CO-ex1-p13',
              numero: 13,
              tipo: 'reponse-libre',
              enunciado: 'Quelle est la conclusion de Michel Drancourt ?',
              puntos: 2,
              respuestaCorrecta:
                "Que la présence des téléphones portables dans les hôpitaux est irréversible mais qu'on peut limiter leur utilisation. Qu'il faut trouver un point raisonnable / un juste milieu.",
            },
          ],
        },

        // ── Exercice 2 : don du sang — 7 pts ──
        {
          id: 'B2-e2-CO-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones:
            "Vous allez entendre une seule fois un enregistrement de 1 minute 30 à 2 minutes. Vous avez tout d'abord 1 minute pour lire les questions. Après l'enregistrement, vous avez 3 minutes pour répondre aux questions. Pour répondre aux questions, cochez la bonne réponse ou écrivez l'information demandée. Lisez les questions, écoutez le document puis répondez.",
          audio: '/examenes/audio/B2/delf-b2-tp-coll-exemple2-exercice2.mp3',
          numEscuchas: 1,
          tiempoLecturaPrevia: 60,
          tiempoRespuestaFinal: 180,
          puntuacionTotal: 7,
          preguntas: [
            {
              id: 'B2-e2-CO-ex2-p1',
              numero: 1,
              tipo: 'reponse-libre',
              enunciado: 'À quelle occasion cette émission a-t-elle été diffusée ?',
              puntos: 1,
              respuestaCorrecta: 'La Journée mondiale du don du sang.',
            },
            {
              id: 'B2-e2-CO-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                "L'objectif de l'Établissement français du sang est...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "d'éviter la propagation de maladies." },
                { letra: 'B', texto: 'de changer les règles du don de sang.' },
                { letra: 'C', texto: "d'éveiller la conscience de la population." },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CO-ex2-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: "L'homme interviewé donne...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'parce que son sang est rare.' },
                { letra: 'B', texto: "parce qu'il a besoin d'argent." },
                { letra: 'C', texto: "parce qu'il veut être solidaire." },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CO-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "D'après le Docteur Charpentier, durant l'opération, le nombre de donneurs va être...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'plus important' },
                { letra: 'B', texto: 'aussi important' },
                { letra: 'C', texto: 'moins important' },
              ],
              respuestaCorrecta: 'A',
              nota: "... que le reste de l'année.",
            },
            {
              id: 'B2-e2-CO-ex2-p5',
              numero: 5,
              tipo: 'reponse-libre',
              enunciado:
                "Combien de malades ont bénéficié de dons de sang l'année dernière ?",
              puntos: 1,
              respuestaCorrecta: 'Un million.',
            },
            {
              id: 'B2-e2-CO-ex2-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado:
                'Mentionnez une branche de la médecine pour laquelle le don de sang est important.',
              puntos: 1,
              respuestaCorrecta:
                "Au choix : l'accidentologie ou la chirurgie cardiaque.",
            },
            {
              id: 'B2-e2-CO-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                'Parmi les personnes suivantes, qui serait accepté comme donneur ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Paul, retraité, 72 ans, 63 kilos.' },
                { letra: 'B', texto: 'Anne, employée, 34 ans, 51 kilos.' },
                { letra: 'C', texto: 'Marise, étudiante, 17 ans, 53 kilos.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },
      ],
    },

    // ─── COMPRÉHENSION DES ÉCRITS ──────────────────────────────
    {
      id: 'B2-e2-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Pour répondre aux questions, cochez la bonne réponse ou écrivez l\'information demandée.',

      ejercicios: [
        // ── Exercice 1 : texte informatif — déchets électroniques (13 pts) ──
        {
          id: 'B2-e2-CE-ex1',
          numero: 1,
          titulo: 'Exercice 1 — Comprendre un texte informatif',
          instrucciones:
            'Répondez aux questions.',
          texto:
            "En France, les déchets électroniques des entreprises seront recyclés\n\nDepuis 2006, les particuliers français peuvent recycler des déchets d'équipements électriques et électroniques grâce à la reprise « un pour un ». Le concept est simple : chaque ménage peut déposer son appareil hors d'usage contre l'achat d'un neuf chez le même distributeur.\n\nBientôt, ce sera au tour des entreprises de bénéficier d'une telle possibilité, qui devrait permettre de collecter et de recycler près de 70 000 tonnes de déchets professionnels.\n\nMis en place par l'éco-organisme Récylum, ce dispositif intéresse en premier lieu les entreprises du bâtiment, mais aussi les industries et les collectivités territoriales, qui détiennent du matériel (alarmes incendie, caméras de surveillance...) qui ne fonctionne plus. À terme, plus de 300 déchetteries professionnelles collecteront gratuitement ces déchets qui seront ensuite transportés dans des centres de traitement où ils suivront le même circuit que les déchets ménagers : destruction, dépollution, puis réutilisation dans la fabrication de nouveaux équipements électroniques.\n\nPour le directeur de Récylum, Hervé Grimaud, ce n'est pas le recyclage de ces déchets qui posait problème mais la collecte de ces déchets jusqu'à présent. « L'immense majorité des déchets professionnels sont mêlés aux gravats ou aux emballages, et enterrés dans le sol faute d'être isolés en vue de leur traitement », affirme-t-il.\n\nLes 120 entreprises partenaires chargées du financement de la filière paieront près de 100 euros la tonne de déchets, en fonction des équipements mis sur le marché. C'est le principe de responsabilité du producteur, initié par la directive européenne de 2003, qui leur impose de prendre en charge la fin de vie de leurs appareils. Un principe qui concerne déjà de nombreux produits tels que les emballages, les textiles et les pneus.\n\nEnjeu\n\nAu-delà de la pression réglementaire, les entreprises qui s'engagent dans le recyclage des déchets professionnels s'inquiètent de la diminution des matières premières qui entrent dans la composition de ces appareils : des métaux rares, du cuivre, du fer... « Aujourd'hui, pour produire la même quantité de minerai de fer, il faut extraire deux fois plus de terre qu'il y a vingt ans », remarque le directeur de Récylum. Les appareils pouvant être recyclés à 85 % de leur poids environ, l'enjeu est important. Enfin, les producteurs s'inquiètent de la pollution que peuvent entraîner ces équipements qui contiennent parfois des substances dangereuses.\n\nEn 2007, moins de 8 % des déchets des entreprises ont fait l'objet d'une collecte sélective. Un résultat largement inférieur à celui des déchets ménagers, qui forment la grande majorité des quelque 2 millions de tonnes de déchets électroniques produits chaque année en France, selon l'Agence de l'environnement et de la maîtrise de l'énergie (Ademe).\n\nDominique Mignon, directrice de développement à Éco-Systèmes (le principal des quatre éco-organismes de gestion des déchets d'équipements électriques et électroniques), attribue ce retard aux dates fixées par la législation : « Les producteurs doivent prendre en charge uniquement les déchets des appareils vendus à partir du 13 août 2005. Or, aujourd'hui, ces appareils commencent à peine à arriver en fin de vie. Beaucoup d'entreprises ont donc attendu ce moment pour se préparer réellement à les traiter. »\n\nD'après Angela BOLIS, Le Monde",
          puntuacionTotal: 13,
          preguntas: [
            {
              id: 'B2-e2-CE-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'Dans le texte, il est surtout question...',
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto:
                    "d'un nouveau projet d'élimination de déchets électroniques.",
                },
                {
                  letra: 'B',
                  texto:
                    'des difficultés des Français pour éliminer les déchets électroniques.',
                },
                {
                  letra: 'C',
                  texto:
                    "de la mise en place d'une nouvelle taxe sur les déchets électroniques.",
                },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e2-CE-ex1-p2',
              numero: 2,
              tipo: 'vrai-faux',
              enunciado:
                "Le projet décrit dans le document concerne seulement les pièces d'ordinateur.",
              puntos: 1.5,
              respuestaCorrecta: false,
              justificacionCorrecta:
                '« ... matériel (alarmes incendie, caméras de surveillance...) qui ne fonctionne plus ».',
            },
            {
              id: 'B2-e2-CE-ex1-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado:
                'En quoi consiste le processus de recyclage ? (citez les 3 étapes)',
              puntos: 1.5,
              respuestaCorrecta:
                'Destruction / dépollution / réutilisation dans la fabrication de nouveaux équipements électroniques.',
            },
            {
              id: 'B2-e2-CE-ex1-p4',
              numero: 4,
              tipo: 'vrai-faux',
              enunciado:
                "Jusqu'à présent, les déchets des entreprises étaient mélangés à d'autres matériaux, ce qui empêchait le recyclage.",
              puntos: 1.5,
              respuestaCorrecta: true,
              justificacionCorrecta:
                "« L'immense majorité des déchets professionnels sont mêlés aux gravats ou aux emballages ».",
            },
            {
              id: 'B2-e2-CE-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado: 'Le coût du recyclage est assumé par...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "l'État." },
                { letra: 'B', texto: 'le producteur.' },
                { letra: 'C', texto: 'le consommateur.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e2-CE-ex1-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado:
                "Expliquez avec vos propres mots l'objectif du principe de responsabilité élargie.",
              puntos: 2,
              respuestaCorrecta:
                "Le fabricant d'un appareil doit prendre en charge la fin de vie de cet appareil.",
            },
            {
              id: 'B2-e2-CE-ex1-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                'Les entreprises considèrent que le recyclage est important parce que...',
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto: 'le gouvernement leur donne des subventions.',
                },
                {
                  letra: 'B',
                  texto: "les déchets s'accumulent dans leurs entrepôts.",
                },
                {
                  letra: 'C',
                  texto: 'les matières premières sont difficiles à obtenir.',
                },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CE-ex1-p8',
              numero: 8,
              tipo: 'vrai-faux',
              enunciado:
                'La totalité des pièces des appareils peut être recyclée.',
              puntos: 1.5,
              respuestaCorrecta: false,
              justificacionCorrecta:
                '« Les appareils pouvant être recyclés à 85 % de leur poids environ ».',
            },
            {
              id: 'B2-e2-CE-ex1-p9',
              numero: 9,
              tipo: 'qcm',
              enunciado:
                'Actuellement en France, les déchets électroniques recyclés proviennent...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'surtout des foyers.' },
                { letra: 'B', texto: 'surtout des entreprises.' },
                { letra: 'C', texto: 'autant des foyers que des entreprises.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e2-CE-ex1-p10',
              numero: 10,
              tipo: 'qcm',
              enunciado:
                "Les appareils peuvent bénéficier du programme décrit dans le texte à condition d'avoir été...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'jetés' },
                { letra: 'B', texto: 'produits' },
                { letra: 'C', texto: 'commercialisés' },
              ],
              respuestaCorrecta: 'C',
              nota: '... après 2005.',
            },
          ],
        },

        // ── Exercice 2 : texte argumentatif — les nouveaux pères (12 pts) ──
        {
          id: 'B2-e2-CE-ex2',
          numero: 2,
          titulo: 'Exercice 2 — Comprendre un texte argumentatif',
          instrucciones:
            'Répondez aux questions.',
          texto:
            "Les nouveaux pères ne sont pas des gens « fabuleux »\n\nIl n'y a hélas aucune contestation possible : aujourd'hui encore, et partout dans le monde, les mères passent beaucoup plus de temps que les pères à prendre soin de leurs enfants. Pour autant, cette généralité avérée ne doit pas masquer le fait que certains hommes (encore trop peu nombreux) ont décidé de prendre leur paternité à bras le corps et de s'occuper mieux de leurs enfants afin de renverser la tendance et de vivre autant que possible sur un pied d'égalité avec la mère de leur progéniture.\n\nOn les appelle les « nouveaux pères ». Une appellation introduite en 1972, très pratique à utiliser dans le cadre des magazines télévisés ou des hebdomadaires de société, puisqu'en deux mots tout est dit. Le « nouveau père » est un « père moderne », qui change des couches, raconte des histoires, concocte des purées carotte – avocat – céleri. De nombreux reportages s'arrêtent sur ces pères-là, posant sur eux un regard fait de bienveillance, d'admiration et d'étonnement. On s'inquiète même pour eux : les nouveaux pères en font-ils trop ?\n\nStop : tout d'abord, figurez-vous que les vrais « nouveaux pères » n'ont aucune envie d'être appelés comme cela. Ce sont des pères, point final. Ils s'occupent de leurs enfants parce qu'ils en ont envie, parce qu'ils aiment ça, et surtout parce qu'ils ne voient absolument pas pourquoi ils devraient laisser la mère se débrouiller avec les rendez-vous chez le pédiatre, les réunions à l'école, les promenades au square du coin.\n\nComme tout le monde, le « nouveau père » n'a rien contre un compliment de temps en temps. C'est comme un sucre, ça ragaillardit et ça donne le courage et l'énergie d'en faire toujours plus. On peut montrer le « nouveau père » en exemple à destination d'autres pères moins impliqués, mais sans en faire ni un objet de curiosité ni un héros absolu auquel il faudrait dresser une statue. Tant qu'on affirmera aux « nouveaux pères » qu'ils sont des gens fabuleux, on ne fera pas avancer la cause.\n\nOr, il y a eu des pères modernes avant la génération actuelle. Il faut justement que le phénomène dure, qu'il s'étende, qu'il ne soit pas un feu de paille mais qu'il contamine peu à peu de plus en plus de pères prenant enfin conscience qu'il est absolument nécessaire et totalement normal de s'occuper de leurs enfants 50 % du temps. Et pas que pour jouer au ballon ou aller manger une glace... Car il n'y a rien de plus irritant que les prétendus pères idéaux qui s'occupent de leurs enfants dans les moments les plus cools, donnant sur les photos une impression d'harmonie. À proscrire également : les hypocrites qui portent leurs enfants en écharpe pour donner une image positive de leur conception de la paternité mais ne font guère que ça, estimant avoir fait leur part une fois rentrés à la maison.\n\nBref, tant que le partage équitable de l'éducation des enfants ne sera pas considéré comme une normalité, tant que les enfants seront considérés comme de charmants accessoires destinés à se faire bien voir (« regardez-moi, regardez-moi, je suis un papa moderne »), tant que n'importe quel passant chantera les louanges du père un tant soit peu actif, la partie ne sera pas gagnée !\n\nD'après Thomas MESSIAS, http://www.slate.fr",
          puntuacionTotal: 12,
          preguntas: [
            {
              id: 'B2-e2-CE-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'Ce texte a pour but...',
              puntos: 1,
              opciones: [
                {
                  letra: 'A',
                  texto:
                    "d'analyser le fait que les pères s'éloignent souvent de leurs enfants.",
                },
                {
                  letra: 'B',
                  texto:
                    'de défendre le fait que les pères assument moins leur rôle que les mères.',
                },
                {
                  letra: 'C',
                  texto:
                    'de normaliser le fait que les pères se dédient de plus en plus à leurs enfants.',
                },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CE-ex2-p2',
              numero: 2,
              tipo: 'vrai-faux',
              enunciado:
                'Il existe un intérêt des médias concernant le phénomène des « nouveaux pères ».',
              puntos: 1.5,
              respuestaCorrecta: true,
              justificacionCorrecta:
                '« De nombreux reportages s\'arrêtent sur ces pères-là, posant sur eux un regard fait de bienveillance, d\'admiration et d\'étonnement ».',
            },
            {
              id: 'B2-e2-CE-ex2-p3',
              numero: 3,
              tipo: 'vrai-faux',
              enunciado:
                "L'auteur est en désaccord avec le titre attribué par les médias aux pères attentifs à leurs enfants.",
              puntos: 1.5,
              respuestaCorrecta: true,
              justificacionCorrecta:
                '« Stop : tout d\'abord, figurez-vous que les vrais « nouveaux pères » n\'ont aucune envie d\'être appelés comme cela. Ce sont des pères, point final ».',
            },
            {
              id: 'B2-e2-CE-ex2-p4',
              numero: 4,
              tipo: 'vrai-faux',
              enunciado:
                "Les pères subissent des pressions sociales qui les poussent à s'occuper de leurs enfants.",
              puntos: 1.5,
              respuestaCorrecta: false,
              justificacionCorrecta:
                "« Ils s'occupent de leurs enfants parce qu'ils en ont envie, parce qu'ils aiment ça ».",
            },
            {
              id: 'B2-e2-CE-ex2-p5',
              numero: 5,
              tipo: 'reponse-libre',
              enunciado:
                "Selon l'auteur, quel est le problème lié à la survalorisation du comportement des pères ?",
              puntos: 1,
              respuestaCorrecta:
                "Plus on fera croire aux pères qui s'occupent de leurs enfants qu'ils font quelque chose d'extraordinaire, moins cette situation se normalisera. S'occuper de leurs enfants pour les pères est considéré encore comme une situation extraordinaire et empêche sa normalisation.",
            },
            {
              id: 'B2-e2-CE-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado:
                "L'auteur estime que, pour les pères, passer du temps avec leurs enfants doit être envisagé comme...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'une action positive.' },
                { letra: 'B', texto: 'une activité ludique.' },
                { letra: 'C', texto: 'une activité prioritaire.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e2-CE-ex2-p7',
              numero: 7,
              tipo: 'reponse-libre',
              enunciado:
                "Quels sont les deux types de conduites paternelles dénoncées par l'auteur ?",
              puntos: 1,
              respuestaCorrecta:
                "Les pères qui ne s'occupent de leurs enfants que pendant les bons moments. Les pères qui se servent de leurs enfants pour donner une bonne image.",
            },
            {
              id: 'B2-e2-CE-ex2-p8',
              numero: 8,
              tipo: 'qcm',
              enunciado:
                "Lors de sa conclusion, que revendique l'auteur ?",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Un changement de mentalité de la société.' },
                { letra: 'B', texto: 'Une stabilité familiale pour tous les enfants.' },
                { letra: 'C', texto: 'Une évolution générale des droits paternels.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e2-CE-ex2-p9',
              numero: 9,
              tipo: 'qcm',
              enunciado: 'Quel est le ton de cet article ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Moqueur.' },
                { letra: 'B', texto: 'Passionné.' },
                { letra: 'C', texto: 'Polémique.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e2-CE-ex2-p10',
              numero: 10,
              tipo: 'reponse-libre',
              enunciado:
                "Expliquez avec vos propres mots le titre choisi par l'auteur :",
              puntos: 1.5,
              respuestaCorrecta:
                "Les pères qui s'occupent de leurs enfants ne sont pas des êtres extraordinaires. Ils font ce qu'il est normal de faire en tant que parent.",
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ÉCRITE ──────────────────────────────────────
    {
      id: 'B2-e2-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Prise de position personnelle argumentée (contribution à un débat, lettre formelle, article critique...).',

      ejercicios: [
        {
          id: 'B2-e2-PE-ex1',
          numero: 1,
          titulo: 'Exercice — Lettre formelle argumentative',
          instrucciones:
            "Vous vivez en France dans une zone piétonne du centre-ville. Le maire de votre ville a décidé d'ouvrir certaines des rues de cette zone à la circulation des autobus pendant la journée. En tant que représentant(e) de votre immeuble, vous écrivez une lettre au maire pour contester cette décision en justifiant votre point de vue.",
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B2-e2-PE-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                "Écrivez une lettre au maire pour contester la décision d'ouvrir les rues piétonnes à la circulation des autobus. Justifiez votre point de vue.",
              puntos: 25,
              minPalabras: 250,
              criteriosEvaluacion: [
                {
                  label: 'Respect de la consigne',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Correction sociolinguistique',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Capacité à présenter des faits',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                },
                {
                  label: 'Capacité à argumenter une prise de position',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                },
                {
                  label: 'Cohérence et cohésion',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                },
                {
                  label: 'Étendue du vocabulaire',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Maîtrise du vocabulaire',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Maîtrise de l\'orthographe',
                  valores: [0, 0.5, 1],
                },
                {
                  label: 'Étendue et maîtrise des structures grammaticales',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ORALE ──────────────────────────────────────
    {
      id: 'B2-e2-PO',
      numero: 4,
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 20,
      puntuacionTotal: 25,
      instruccionesGenerales:
        "Présentation et défense d'un point de vue à partir d'un court document déclencheur. Préparation : 30 minutes. Passation : 20 minutes environ.",
      notasEspeciales: [
        'Le candidat tire au sort deux sujets et en choisit un.',
        'Préparation : 30 minutes.',
        'Passation : 20 minutes environ.',
        "Le candidat dégage le thème soulevé par le document et présente son opinion sous la forme d'un exposé personnel de 3 minutes environ.",
        "L'examinateur peut ensuite poser des questions pour approfondir.",
      ],

      ejercicios: [
        {
          id: 'B2-e2-PO-ex1',
          numero: 1,
          titulo: "Présentation et défense d'un point de vue",
          instrucciones:
            "Vous dégagerez le problème soulevé par le document ci-dessous. Vous présenterez votre opinion sur le sujet de manière argumentée, et si nécessaire, vous la défendrez au cours du débat avec l'examinateur.",
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B2-e2-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                "Dégagez le problème soulevé par le document. Présentez votre opinion de manière argumentée et défendez-la au cours du débat avec l'examinateur.",
              puntos: 25,
              sujetosAlternativos: [
                "Sujet 1 : L'hygiène à l'hôpital — Les téléphones portables sont omniprésents dans les hôpitaux, tant chez les patients que chez le personnel médical. Faut-il limiter leur usage dans les établissements de santé pour des raisons d'hygiène ?",
                "Sujet 2 : Le recyclage des déchets électroniques — Chaque année, des millions de tonnes de déchets électroniques sont produits. Comment encourager les entreprises et les particuliers à mieux recycler leurs équipements ?",
              ],
            },
          ],
        },
      ],
    },
  ],
}
