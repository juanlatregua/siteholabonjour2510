import { Examen } from '../types'

export const examen_B2_exemple1: Examen = {
  id: 'B2-exemple1',
  nivel: 'B2',
  diploma: 'DELF',
  modalidad: 'demo',
  ejemplo: 1,
  titulo: 'DELF B2 — Exemple 1',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPRÉHENSION DE L'ORAL ───────────────────────────────
    {
      id: 'B2-e1-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 30,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Vous allez écouter plusieurs documents. Pour répondre aux questions, cochez la bonne réponse.',
      notasEspeciales: ['Durée maximale de l\'ensemble des documents : 15 min'],

      ejercicios: [
        // ── Exercice 1 : émission radio (sport matinal) ──
        {
          id: 'B2-e1-CO-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            'Vous allez écouter 2 fois un document. Vous écoutez une émission à la radio. Lisez les questions, écoutez le document puis répondez.',
          audio: '/examenes/audio/B2/delf-b2-tp-coll-exemple1-exercice1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 60,
          pausaEntreEscuchas: 180,
          tiempoRespuestaFinal: 120,
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B2-e1-CO-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "D'après le journaliste, on trouve souvent sur les réseaux sociaux des articles sur...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "l'intérêt de la course à pied." },
                { letra: 'B', texto: 'les avantages du sport matinal.' },
                { letra: 'C', texto: 'le style de vie des sportifs professionnels.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CO-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Selon le document, il est...',
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'bénéfique' },
                { letra: 'B', texto: 'dangereux' },
                { letra: 'C', texto: 'impossible' },
              ],
              respuestaCorrecta: 'B',
              nota: '... de modifier notre rythme de sommeil.',
            },
            {
              id: 'B2-e1-CO-ex1-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Quel rythme de vie adoptent les sportifs professionnels ?',
              puntos: 2,
              opciones: [
                { letra: 'A', texto: 'Ils se lèvent très tôt.' },
                { letra: 'B', texto: 'Ils dorment beaucoup.' },
                { letra: 'C', texto: "Ils font une sieste l'après-midi." },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CO-ex1-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "D'après le journaliste, les personnes qui se couchent tard sont plus...",
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'actives' },
                { letra: 'B', texto: 'fatiguées' },
                { letra: 'C', texto: 'détendues' },
              ],
              respuestaCorrecta: 'A',
              nota: '... le soir.',
            },
            {
              id: 'B2-e1-CO-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Il est socialement bien vu de se lever tôt car cela permettrait d'être plus...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'efficace.' },
                { letra: 'B', texto: 'ponctuel.' },
                { letra: 'C', texto: 'en forme.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CO-ex1-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Faire du sport le matin est considéré comme un luxe car...',
              puntos: 2.5,
              opciones: [
                { letra: 'A', texto: 'tous les emplois ne le permettent pas.' },
                { letra: 'B', texto: 'la vie de famille est parfois contraignante.' },
                { letra: 'C', texto: "on ne peut pas toujours en faire près de chez soi." },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CO-ex1-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                'La pratique du sport en fin de journée est avantageuse car elle permet...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "d'être de meilleure humeur." },
                { letra: 'B', texto: "de s'endormir plus facilement." },
                { letra: 'C', texto: 'de mieux se concentrer le lendemain.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },

        // ── Exercice 2 : émission radio (bureaux Google / Sanofi) ──
        {
          id: 'B2-e1-CO-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones:
            'Vous allez écouter 2 fois un document. Vous écoutez une émission à la radio. Lisez les questions. Écoutez le document puis répondez.',
          audio: '/examenes/audio/B2/delf-b2-tp-coll-exemple1-exercice2.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 60,
          pausaEntreEscuchas: 180,
          tiempoRespuestaFinal: 120,
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B2-e1-CO-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "L'entreprise américaine Google a lancé l'idée d'une nouvelle...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'forme de réunion au travail.' },
                { letra: 'B', texto: "manière d'utiliser les bureaux." },
                { letra: 'C', texto: 'organisation du travail à distance.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CO-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                "Dans l'entreprise Sanofi, la nouvelle organisation concerne...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'uniquement les chefs.' },
                { letra: 'B', texto: 'les chefs et les employés.' },
                { letra: 'C', texto: 'uniquement les employés.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CO-ex2-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: "Quel est l'objectif principal de cette organisation ?",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "Limiter les retards et l'absentéisme." },
                { letra: 'B', texto: "Améliorer l'utilisation des espaces de travail." },
                { letra: 'C', texto: 'Créer des salles de réunion supplémentaires.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CO-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Du fait de cette organisation, les employés...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'rentrent parfois travailler chez eux.' },
                { letra: 'B', texto: 'louent des espaces pour travailler tranquillement.' },
                {
                  letra: 'C',
                  texto: "organisent leurs rendez-vous à l'extérieur de l'entreprise.",
                },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CO-ex2-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado: 'Chez les employés, cette organisation peut...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'entraîner des conflits.' },
                { letra: 'B', texto: 'être source de fatigue.' },
                { letra: 'C', texto: 'diminuer la productivité.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CO-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Comment les employés les plus âgés réagissent-ils à ce système ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "Ils protestent et refusent de l'adopter." },
                {
                  letra: 'B',
                  texto: "Ils s'adaptent même si ça ne leur plaît pas.",
                },
                {
                  letra: 'C',
                  texto: "Ils s'inquiètent pour leur avenir professionnel.",
                },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e1-CO-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado: 'La journaliste estime que les hôtels de travail...',
              puntos: 2.5,
              opciones: [
                { letra: 'A', texto: 'facilitent la mise en place du travail à distance.' },
                {
                  letra: 'B',
                  texto: "renforcent les capacités d'adaptation des salariés.",
                },
                {
                  letra: 'C',
                  texto:
                    'favorisent la confusion entre vie privée et vie professionnelle.',
                },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },

        // ── Exercice 3 : 3 documents courts (1 seule écoute) ──
        {
          id: 'B2-e1-CO-ex3',
          numero: 3,
          titulo: 'Exercice 3',
          instrucciones:
            'Vous allez écouter 1 fois 3 documents. Lisez les questions. Écoutez le document puis répondez.',
          audio: '/examenes/audio/B2/delf-b2-tp-coll-exemple1-exercice3.mp3',
          numEscuchas: 1,
          tiempoLecturaPrevia: 60,
          tiempoRespuestaFinal: 180,
          puntuacionTotal: 7,
          preguntas: [
            // Document 1 : presse jeunesse
            {
              id: 'B2-e1-CO-ex3-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "Qu'est-ce qu'on constate dans l'évolution de la presse jeunesse actuellement ?",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'Il y a plus de titres pour tous les âges.' },
                { letra: 'B', texto: 'Il y a plus de magazines de divertissement.' },
                {
                  letra: 'C',
                  texto: "Il y a plus d'importance donnée à l'information.",
                },
              ],
              respuestaCorrecta: 'C',
              nota: 'Document 1',
            },
            {
              id: 'B2-e1-CO-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Selon Elsa Maudet, les nouveaux types de magazine vont...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "encourager l'écriture" },
                { letra: 'B', texto: 'promouvoir la lecture' },
                { letra: 'C', texto: "favoriser la réflexion sur l'actualité" },
              ],
              respuestaCorrecta: 'C',
              nota: '... chez les jeunes. (Document 1)',
            },
            // Document 2 : jeux de société
            {
              id: 'B2-e1-CO-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado:
                "Pour l'intervenant, les jeux de société permettent d'être...",
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'plus efficace au travail.' },
                { letra: 'B', texto: 'plus proche des autres.' },
                { letra: 'C', texto: 'plus calme au quotidien.' },
              ],
              respuestaCorrecta: 'B',
              nota: 'Document 2',
            },
            {
              id: 'B2-e1-CO-ex3-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "D'après l'intervenant, chez les plus jeunes, les jeux de société favorisent principalement...",
              puntos: 2,
              opciones: [
                { letra: 'A', texto: 'leur intégration sociale.' },
                { letra: 'B', texto: 'leur sensation de bien-être.' },
                { letra: 'C', texto: 'leur capacité de raisonnement.' },
              ],
              respuestaCorrecta: 'C',
              nota: 'Document 2',
            },
            // Document 3 : robot émotionnel
            {
              id: 'B2-e1-CO-ex3-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Selon l'intervenante, un robot émotionnel est capable...",
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: "d'interpréter les émotions." },
                { letra: 'B', texto: 'de provoquer des émotions.' },
                { letra: 'C', texto: 'de manifester des émotions.' },
              ],
              respuestaCorrecta: 'B',
              nota: 'Document 3',
            },
            {
              id: 'B2-e1-CO-ex3-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado:
                'Dans quel domaine les robots sont-ils bénéfiques pour les enfants ?',
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'La mobilité.' },
                { letra: 'B', texto: "L'apprentissage." },
                { letra: 'C', texto: 'La communication.' },
              ],
              respuestaCorrecta: 'B',
              nota: 'Document 3',
            },
          ],
        },
      ],
    },

    // ─── COMPRÉHENSION DES ÉCRITS ──────────────────────────────
    {
      id: 'B2-e1-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Répondez aux questions en cochant la bonne réponse.',

      ejercicios: [
        // ── Exercice 1 : texte informatif/argumentatif — téléphone portable au collège ──
        {
          id: 'B2-e1-CE-ex1',
          numero: 1,
          titulo: 'Exercice 1 — Comprendre un texte informatif ou argumentatif',
          instrucciones:
            "Dans un magazine d'actualité francophone, vous lisez un article sur le téléphone portable à l'école. Pour répondre aux questions, cochez la bonne réponse.",
          texto:
            "L'interdiction du téléphone portable au collège\n\nSelon une étude, les élèves qui fréquentent des écoles où le téléphone est interdit ont de meilleurs résultats que les autres. Dernièrement, le ministre de l'éducation nationale a souhaité durcir l'interdiction des téléphones portables au collège qui existe déjà, mais qui, en pratique, n'est pas suffisamment appliquée parce qu'aucune sanction n'est prévue.\n\nOn semble oublier que le personnel en milieu scolaire applique déjà cette mesure, comme le rappelle Lysiane Gervais, secrétaire nationale du SNPDEN-Unsa : « Dans 97 % des collèges, l'utilisation du portable est interdite. Cela fonctionne plus ou moins bien. Si un élève utilise son téléphone ou s'il sonne en cours, l'appareil est confisqué et remis aux parents ». Elle ajoute qu'une interdiction totale est « impossible à gérer. Quand on est sur le terrain, on s'en rend bien compte. »\n\nDe plus, les élèves ont des téléphones portables au collège car ils sont équipés par leurs parents qui veulent pouvoir joindre leur enfant après la classe, parce que ça les rassure. Selon le responsable d'une fédération de parents d'élèves, il y aurait autant de parents favorables à l'interdiction des téléphones portables qu'à leur autorisation. C'est pourquoi les modalités de cette interdiction doivent être discutées avec les familles.\n\nCatherine Nave-Bekhti, secrétaire générale du Sgen-CFDT, juge cette nouvelle interdiction inutile. « Ajouter de l'interdiction à l'interdiction ne dit pas comment on règle le problème. Tous les collèges ne sont pas équipés de casiers ». Cela nécessite des équipements et suffisamment de place. « L'autre élément est que certains enseignants développent un usage pédagogique des outils numériques. Un autre inconvénient à cette interdiction est le risque de priver les adolescents d'un apprentissage sur l'utilisation raisonnée d'Internet et des réseaux sociaux. Les enseignants font réfléchir leurs élèves quant à leur utilisation du numérique, aux conséquences de ce qu'ils y écrivent, au droit à l'image et au respect de l'autre. Les outils numériques contribuent à la formation des élèves. On aurait préféré une réflexion collective sur la place du numérique à l'école plutôt que de découvrir que le sujet serait à nouveau relancé, sans dialogue. Le ministère devrait ouvrir le débat à tous les acteurs de l'école. »\n\nPour certains enseignants, le débat dépasse celui de l'école : « Je parle des écrans avec les ados, je valorise la lecture de livres, mais le véritable problème c'est ce qui se passe à la maison » s'inquiète Jean-Thomas Giovannoni, professeur d'anglais, qui a lui-même grandi sans télévision. « Il faut que les parents apprennent à leurs enfants à garder une distance avec les écrans. »\n\nD'après Céline HUSSONNOIS-ALAYA, www.bmftv.com",
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B2-e1-CE-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "Une enquête montre que l'usage du téléphone portable à l'école a des conséquences négatives sur...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'la concentration' },
                { letra: 'B', texto: 'le niveau scolaire' },
                { letra: 'C', texto: 'les relations sociales' },
              ],
              respuestaCorrecta: 'B',
              nota: '... des jeunes.',
            },
            {
              id: 'B2-e1-CE-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                "Selon Lysiane Gervais, dans l'intérêt des jeunes, il faudrait...",
              puntos: 2.5,
              opciones: [
                { letra: 'A', texto: 'autoriser pleinement' },
                { letra: 'B', texto: 'tolérer sous conditions' },
                { letra: 'C', texto: 'interdire complètement' },
              ],
              respuestaCorrecta: 'B',
              nota: "... le téléphone à l'école.",
            },
            {
              id: 'B2-e1-CE-ex1-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Les parents seraient...',
              puntos: 2.5,
              opciones: [
                { letra: 'A', texto: 'très opposés à' },
                { letra: 'B', texto: 'plutôt partagés sur' },
                { letra: 'C', texto: 'globalement favorables à' },
              ],
              respuestaCorrecta: 'B',
              nota: "... l'utilisation du téléphone par les élèves à l'école.",
            },
            {
              id: 'B2-e1-CE-ex1-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "Pour Catherine Nave-Bekhti, interdire le portable à l'école est difficile par manque...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'de personnel.' },
                { letra: 'B', texto: 'de volonté politique.' },
                { letra: 'C', texto: 'de moyens matériels.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e1-CE-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Selon Catherine Nave-Bekhti, interdire le portable à l'école...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'serait un obstacle aux libertés individuelles.' },
                {
                  letra: 'B',
                  texto:
                    "priverait les élèves d'une éducation aux usages d'Internet.",
                },
                {
                  letra: 'C',
                  texto:
                    'empêcherait les élèves de développer des relations sociales.',
                },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CE-ex1-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado:
                "Pour Catherine Nave-Bekhti, la question du numérique à l'école est...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'peu discutée.' },
                { letra: 'B', texto: 'déjà dépassée.' },
                { letra: 'C', texto: 'trop médiatisée.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex1-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                "Pour Jean-Thomas Giovannoni, la question de l'usage du téléphone chez les jeunes relève principalement de la responsabilité...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: "de l'école." },
                { letra: 'B', texto: 'de la famille.' },
                { letra: 'C', texto: 'des jeunes eux-mêmes.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },

        // ── Exercice 2 : texte informatif/argumentatif — aller au travail à vélo ──
        {
          id: 'B2-e1-CE-ex2',
          numero: 2,
          titulo: 'Exercice 2 — Comprendre un texte informatif ou argumentatif',
          instrucciones:
            "Vous allez souvent au travail à vélo. Vous vous intéressez à cet article publié dans un journal francophone. Pour répondre aux questions, cochez la bonne réponse.",
          texto:
            "Aller au travail à vélo ?\n\n« Il faut arrêter de considérer que le vélo est un sujet mineur. » L'appel est de la ministre des transports, lors d'un congrès sur les transports non polluants. À cette occasion, a été annoncé un grand plan vélo destiné à faire décoller enfin ce mode de transport, notamment grâce à « l'indemnité kilométrique » : ce dispositif autorise l'employeur à dédommager ses salariés se rendant au travail à vélo (environ 0,25 euro par kilomètre parcouru).\n\n« Une indemnité versée aux cyclistes utilisant leur vélo pour se rendre au travail permet de réduire le coût d'achat du vélo et de participer aux frais d'entretien », précise Olivier Schneider, président de la FUB qui invite à ne pas voir le dispositif comme un privilège donné aux cyclistes, mais comme une façon de mettre le vélo sur un pied d'égalité avec les autres modes de transport. L'employeur a en effet déjà obligation de prendre en charge la moitié de l'abonnement aux transports en commun de ses salariés. Il a également la possibilité de verser des indemnités kilométriques à ceux qui utilisent leur véhicule personnel pour se rendre au travail.\n\nLe problème, c'est que cette indemnité vélo n'est pas obligatoire et que « moins de 1 % des actifs français travaillent pour une structure qui la propose à ses employés », pointe un rapport d'associations. Car là où elle est appliquée, cette indemnité a produit d'excellents résultats. « Elle entraîne dans l'entreprise ou la collectivité une augmentation de la part prise par le vélo dans les différents modes de transport de 125 % après un an », affirmait récemment l'Ademe.\n\n« Cette indemnité devrait être obligatoire dans toutes les entreprises et collectivités où des salariés la demandent, explique Yoann Rouillac, président d'un groupe de travail sur le vélo. Il n'y a là rien d'impossible, estime un député, 75 % des déplacements domicile-travail font aujourd'hui moins de 5 km et 70 % de ces trajets sont faits aujourd'hui en voiture. » Pourtant, sur cette distance, le vélo est le mode de transport le plus performant en milieu urbain et semi-urbain. Le député invite également à prendre en considération les nombreux avantages du vélo sur l'écologie et ses bienfaits sur la santé des salariés qui sont plus en forme. Ainsi, ils gagnent en efficacité et l'employeur en profite.\n\nUne étude récente montre cependant que les cyclistes sont d'abord demandeurs de plus de sécurité et de stationnements vélo, aux abords des gares en particulier. « La prise en compte de ces exigences nécessitera de construire de nouvelles infrastructures, explique Olivier Schneider. Il faut le faire, mais ça prendra du temps. »\n\nD'après Fabrice POULIQUEN, www.20minutes.fr",
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B2-e1-CE-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "L'indemnité kilométrique pour le vélo est financée par...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'les mairies.' },
                { letra: 'B', texto: 'les entreprises.' },
                { letra: 'C', texto: 'le gouvernement.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CE-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                "Pour Olivier Schneider, l'indemnité offerte aux usagers du vélo va...",
              puntos: 2.5,
              opciones: [
                {
                  letra: 'A',
                  texto: "réduire considérablement l'utilisation des",
                },
                {
                  letra: 'B',
                  texto: 'donner au vélo une place comparable aux',
                },
                {
                  letra: 'C',
                  texto: 'rendre le vélo plus avantageux financièrement que les',
                },
              ],
              respuestaCorrecta: 'B',
              nota: '... autres modes de transport.',
            },
            {
              id: 'B2-e1-CE-ex2-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado:
                "D'après le texte, l'indemnité kilométrique pour le vélo est encore peu pratiquée car elle est...",
              puntos: 2.5,
              opciones: [
                { letra: 'A', texto: 'facultative.' },
                { letra: 'B', texto: 'peu connue.' },
                { letra: 'C', texto: 'mal financée.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                "Dans les entreprises qui la mettent en place, l'indemnité kilométrique pour le vélo a des effets...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'positifs.' },
                { letra: 'B', texto: 'modérés.' },
                { letra: 'C', texto: 'décevants.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex2-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                'Le moyen de transport le plus efficace pour se rendre au travail en ville serait actuellement...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'le vélo.' },
                { letra: 'B', texto: 'la voiture.' },
                { letra: 'C', texto: 'les transports en commun.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado:
                "Selon le député, l'usage du vélo permettrait aux employés d'être...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'plus ponctuels.' },
                { letra: 'B', texto: 'plus productifs.' },
                { letra: 'C', texto: 'plus coopératifs.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CE-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                "Selon Olivier Schneider, les cyclistes attendent aujourd'hui...",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'de nouvelles règles de circulation.' },
                { letra: 'B', texto: 'des aides financières plus importantes.' },
                { letra: 'C', texto: 'des installations plus adaptées aux vélos.' },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },

        // ── Exercice 3 : comprendre le point de vue — adaptations de livres au cinéma ──
        {
          id: 'B2-e1-CE-ex3',
          numero: 3,
          titulo: 'Exercice 3 — Comprendre le point de vue d\'un locuteur francophone',
          instrucciones:
            'Vous lisez l\'opinion de ces trois personnes sur un forum français dont le sujet est « Adaptations de livres au cinéma : pour ou contre ? ». À quelle personne associez-vous chaque point de vue ? Pour chaque affirmation, cochez la bonne réponse.',
          texto:
            "Luc\nLorsqu'un cinéaste adapte un livre au cinéma, il donne sa propre vision de ce livre. Cela peut être perçu comme étant très réducteur ! Mais cette vision peut aussi être très différente de celle que nous nous étions faite pendant notre lecture. Elle peut donc ouvrir d'autres réflexions et finalement devenir très enrichissante. De plus, je dirais que l'adaptation cinématographique peut donner envie de lire le livre à des gens qui ne s'intéressent pas à la lecture d'habitude. Contrairement aux personnes qui vont au cinéma pour voir l'adaptation de leur roman préféré, moi, je fais l'inverse : la plupart des livres que je lis aujourd'hui, je les ai découverts à travers les films que j'ai beaucoup aimés au cinéma.\n\nSacha\nMême si on adore un livre, il faut, je pense, accepter que certains passages du livre soient coupés ou modifiés, car le travail d'écriture est complètement différent du travail d'adaptation cinématographique. En effet, il y a des éléments qu'on ne pourrait pas mettre dans un film pour des questions techniques. Et puis, que faut-il juger : un film par rapport au livre, ou tout simplement le film pour ce qu'il est ? Le but d'une adaptation est d'en faire quelque chose de différent. Pour ma part, je préfère parfois voir des changements, que de voir de simples « copier-coller » qui respectent trop le livre, mais qui, au final, rendent le film inintéressant, sans originalité.\n\nMarjorie\nJe n'aime pas trop quand j'apprends qu'un livre que j'ai adoré se retrouvera au cinéma. J'ai l'impression de perdre le monde imaginaire que je me suis créé. Selon moi, une adaptation a beaucoup plus de chances de nous décevoir que de nous plaire. On peut donner plein d'exemples : détails du livre éliminés dans le film, changements concernant l'intrigue, acteurs qui ne correspondent pas à l'image des personnages qu'on s'était faite pendant la lecture...\n\nÀ chaque fois, je suis déçue, je n'arrête pas de critiquer les différences entre le livre et le film. Et puis, dans l'adaptation cinématographique, l'histoire dure beaucoup moins longtemps que dans le roman. Rien ne vaut un bon livre !",
          puntuacionTotal: 7,
          preguntas: [
            {
              id: 'B2-e1-CE-ex3-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                'Il est injuste de comparer un roman à son adaptation cinématographique.',
              puntos: 2,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CE-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Les films adaptés de romans peuvent encourager les gens à lire.',
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado:
                'Un cinéaste qui adapte un livre au cinéma doit forcément prendre de la distance par rapport au livre.',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B2-e1-CE-ex3-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                'Il est plus plaisant de lire un roman que de voir son adaptation cinématographique.',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B2-e1-CE-ex3-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Les films adaptés de romans sont l'interprétation personnelle des cinéastes.",
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B2-e1-CE-ex3-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado:
                "Les adaptations cinématographiques détruisent l'image fictive donnée par les oeuvres littéraires.",
              puntos: 0.5,
              opciones: [
                { letra: 'A', texto: 'Luc.' },
                { letra: 'B', texto: 'Sacha.' },
                { letra: 'C', texto: 'Marjorie.' },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ÉCRITE ──────────────────────────────────────
    {
      id: 'B2-e1-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 60,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Prise de position personnelle argumentée (contribution à un débat, lettre formelle, article critique...).',

      ejercicios: [
        {
          id: 'B2-e1-PE-ex1',
          numero: 1,
          titulo: 'Exercice — Lettre formelle argumentative',
          instrucciones:
            "Vous vivez en France dans une zone piétonne du centre-ville. Le maire de votre ville a décidé d'ouvrir certaines des rues de cette zone à la circulation des autobus pendant la journée. Comme représentant(e) de votre immeuble, vous écrivez une lettre au maire pour contester cette décision en justifiant votre point de vue.",
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B2-e1-PE-ex1-p1',
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
      id: 'B2-e1-PO',
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
          id: 'B2-e1-PO-ex1',
          numero: 1,
          titulo: "Présentation et défense d'un point de vue",
          instrucciones:
            "Vous dégagerez le problème soulevé par le document ci-dessous. Vous présenterez votre opinion sur le sujet de manière argumentée, et si nécessaire, vous la défendrez au cours du débat avec l'examinateur.",
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B2-e1-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                "Dégagez le problème soulevé par le document. Présentez votre opinion de manière argumentée et défendez-la au cours du débat avec l'examinateur.",
              puntos: 25,
              sujetosAlternativos: [
                "Sujet 1 : Le télétravail — De plus en plus d'entreprises proposent le télétravail à leurs salariés. Certains y voient un progrès, d'autres une source d'isolement. Qu'en pensez-vous ?",
                "Sujet 2 : Les réseaux sociaux et la démocratie — Les réseaux sociaux sont-ils un outil au service de la démocratie ou représentent-ils un danger pour la qualité du débat public ?",
              ],
            },
          ],
        },
      ],
    },
  ],
}
