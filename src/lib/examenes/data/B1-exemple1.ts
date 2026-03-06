import { Examen } from '../types'

export const examen_B1_exemple1: Examen = {
  id: 'B1-exemple1',
  nivel: 'B1',
  diploma: 'DELF',
  modalidad: 'demo',
  ejemplo: 1,
  titulo: 'DELF B1 — Exemple 1',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPREHENSION DE L'ORAL ───────────────────────────────
    {
      id: 'B1-e1-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Comprehension de l'oral",
      duracionMinutos: 25,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Vous allez ecouter plusieurs documents. Il y a 2 ecoutes. Avant chaque ecoute, vous entendez le son suivant. Pour repondre aux questions, cochez la bonne reponse.',
      notasEspeciales: ['Duree maximale de l\'ensemble des documents : 6 min'],

      ejercicios: [
        // ── Exercice 1 : conversation (7 pts) ──
        {
          id: 'B1-e1-CO-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            'Vous ecoutez une conversation. Lisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple1-exercice1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 30,
          tiempoRespuestaFinal: 30,
          puntuacionTotal: 7,
          preguntas: [
            {
              id: 'B1-e1-CO-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'Qu\'est-ce que Celia va feter ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Son diplome.' },
                { letra: 'B', texto: 'Son mariage.' },
                { letra: 'C', texto: 'Son anniversaire.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CO-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Il y aura seulement quelques amis a la fete parce que...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'la maison est petite.' },
                { letra: 'B', texto: 'beaucoup ne sont pas disponibles.' },
                { letra: 'C', texto: 'Celia veut avoir le temps de discuter avec chacun.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CO-ex1-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Lilian va arriver un peu plus tard parce qu\'il...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'va manger chez ses parents.' },
                { letra: 'B', texto: 'doit s\'occuper de ses enfants.' },
                { letra: 'C', texto: 'travaille une partie du week-end.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CO-ex1-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Lilian accepte de venir a la fete parce qu\'il...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'adore la montagne.' },
                { letra: 'B', texto: 'est tres proche de Celia.' },
                { letra: 'C', texto: 'souhaite decouvrir la region.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado: 'Le repas de la fete sera prepare par...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Celia.' },
                { letra: 'B', texto: 'tout le monde.' },
                { letra: 'C', texto: 'un restaurateur.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex1-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Pour sa fete, Celia espere...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'qu\'il fera beau.' },
                { letra: 'B', texto: 'qu\'elle aura un beau cadeau.' },
                { letra: 'C', texto: 'que tous ses amis viendront.' },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },

        // ── Exercice 2 : radio — association malvoyants (9 pts) ──
        {
          id: 'B1-e1-CO-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones:
            'Vous ecoutez la radio. Lisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple1-exercice2.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 30,
          tiempoRespuestaFinal: 30,
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B1-e1-CO-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                'Grace a Un regard pour toi, les personnes malvoyantes peuvent acheter leurs vetements...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'accompagnees par un benevole.' },
                { letra: 'B', texto: 'dans des magasins specialises.' },
                { letra: 'C', texto: 'sur le site internet de l\'association.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Hayette trouve que les employes des magasins sont trop...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'curieux.' },
                { letra: 'B', texto: 'occupes.' },
                { letra: 'C', texto: 'desagreables.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex2-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Grace a l\'association, Hayette...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'a de nouveaux amis.' },
                { letra: 'B', texto: 's\'habille de maniere differente.' },
                { letra: 'C', texto: 'depense moins d\'argent pour s\'habiller.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Les collegues d\'Hayette...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'lui donnent des conseils.' },
                { letra: 'B', texto: 'sont surpris par sa facon de s\'habiller.' },
                { letra: 'C', texto: 'veulent savoir ou elle trouve ses vetements.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CO-ex2-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado: 'Pour les malvoyants, les vetements permettent de...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'developper la confiance en soi.' },
                { letra: 'B', texto: 's\'integrer professionnellement.' },
                { letra: 'C', texto: 'discuter de la mode avec leurs amis.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Quel appel lance Hayette ?',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'Elle a besoin de personnes pour l\'aider.' },
                { letra: 'B', texto: 'Elle invite les malvoyants a la contacter.' },
                { letra: 'C', texto: 'Elle recherche un local pour l\'association.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado: 'Quand ils entrent dans l\'association, les benevoles doivent...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'assister a une presentation de la responsable.' },
                { letra: 'B', texto: 'participer a une reunion avec d\'autres membres.' },
                { letra: 'C', texto: 'avoir un rendez-vous telephonique avec un malvoyant.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },

        // ── Exercice 3 : radio — Baluchon cuisine (9 pts) ──
        {
          id: 'B1-e1-CO-ex3',
          numero: 3,
          titulo: 'Exercice 3',
          instrucciones:
            'Vous ecoutez la radio. Lisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple1-exercice3.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 30,
          tiempoRespuestaFinal: 30,
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B1-e1-CO-ex3-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'La societe Baluchon...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'apporte des repas dans les entreprises.' },
                { letra: 'B', texto: 'propose des cours de cuisine aux salaries.' },
                { letra: 'C', texto: 'livre des produits dans les restaurations collectives.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Selon Francois Dechy, le temps que les gens prennent pour manger...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'diminue.' },
                { letra: 'B', texto: 'est stable.' },
                { letra: 'C', texto: 'augmente.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Selon Francois Dechy, le moment du dejeuner est important pour...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'mieux travailler.' },
                { letra: 'B', texto: 'rester en bonne sante.' },
                { letra: 'C', texto: 'rencontrer ses collegues.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex3-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Francois Dechy veut proposer un service...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'rapide.' },
                { letra: 'B', texto: 'biologique.' },
                { letra: 'C', texto: 'bon marche.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex3-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado: 'Francois Dechy travaille avec...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'de jeunes etudiants.' },
                { letra: 'B', texto: 'des personnes en difficulte.' },
                { letra: 'C', texto: 'des diplomes de la restauration.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CO-ex3-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Baluchon est une entreprise qui propose aussi...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'des formations professionnalisantes.' },
                { letra: 'B', texto: 'des rencontres avec de grands cuisiniers.' },
                { letra: 'C', texto: 'des cours de lecture et de mathematiques.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CO-ex3-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado: 'Quel est l\'avantage de la cuisine pretee par la mairie ? Elle est...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'bien situee.' },
                { letra: 'B', texto: 'tres grande.' },
                { letra: 'C', texto: 'toute equipee.' },
              ],
              respuestaCorrecta: 'A',
            },
          ],
        },
      ],
    },

    // ─── COMPREHENSION DES ECRITS ──────────────────────────────
    {
      id: 'B1-e1-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Comprehension des ecrits',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Repondez aux questions en cochant la bonne reponse ou en ecrivant l\'information demandee.',

      ejercicios: [
        // ── Exercice 1 : restaurants a Lyon — grille OUI/NON (8 pts) ──
        {
          id: 'B1-e1-CE-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            'Vous travaillez a Lyon. Vous devez organiser un repas d\'affaires avec des clients etrangers. Vous cherchez un restaurant qui correspond a vos criteres :\n- cuisine de la region de Lyon ;\n- certains de vos clients ne mangent ni poisson, ni viande ;\n- endroit calme ;\n- service de qualite.\nVous comparez ces annonces. Pour chaque annonce, cochez OUI si cela correspond au critere ou NON si cela ne correspond pas.',
          texto:
            'Au Balcon\nDepuis la salle panoramique de ce restaurant, la vue sur la ville de Lyon est magnifique. C\'est le cadre ideal pour un diner romantique, mais c\'est aussi un endroit tranquille pour les repas d\'affaires. La cuisine est classique et a base de produits regionaux. Le menu « tout legumes » est tres apprecie des personnes qui ne mangent ni viande, ni poisson. Le menu « tradition » permet de gouter d\'excellents produits, comme la truite saumonee, le gateau de legumes ou le dessert au chocolat. Les serveurs sont mal organises, c\'est dommage.\n\nLe Bonheur dans l\'assiette\nDans cet etablissement bien connu du centre de Lyon, on nous propose une cuisine gourmande pour un excellent rapport qualite-prix. C\'est une tres bonne adresse pour les amateurs de viande et de charcuterie. Si vous ne mangez que des legumes, ce restaurant n\'est pas pour vous ! Le chef cuisine des specialites de la region lyonnaise avec des produits de saison. On passe un agreable moment dans ce restaurant meme si l\'ambiance est un peu trop bruyante. Un lieu plutot reserve aux repas en famille ou entre amis. Les serveurs sont sympas et tres attentionnes.\n\nLe Lyon exotique\nLa cuisine proposee par Luis, un jeune cuisinier bresilien, est authentique et 100 % faite maison. Deux types de plats sont proposes : des plats typiques de Lyon et des plats de son pays d\'origine. Au menu : saucisson lyonnais mais aussi gratin de patates douces ou plats de legumes colores. C\'est delicieux de l\'entree jusqu\'au dessert. En salle, les serveurs sont souriants mais peu efficaces. Si le soleil de Rio arrive jusqu\'a Lyon, vous pourrez deguster votre repas en terrasse en ecoutant de la samba. Un lieu un peu trop bruyant surtout en fin de semaine.\n\nLe Piano\nLes deux jeunes cuisiniers du Piano travaillent exclusivement avec des produits frais. Vous pourrez decouvrir leur cuisine gourmande et naturelle a travers les meilleures recettes lyonnaises. Le menu est imagine chaque jour en fonction de ce que les chefs trouvent au marche de Lyon. Ils vous feront gouter, par exemple, du boudin noir aux pommes ou la celebre saucisse de Lyon. Il n\'y a cependant pas de plats de legumes a la carte. Le service est tres professionnel, les serveurs savent conseiller les clients. Le restaurant possede un petit salon calme pour les reunions et les diners prives.',
          puntuacionTotal: 8,
          preguntas: [
            // Au Balcon: 4 criteres
            {
              id: 'B1-e1-CE-ex1-p1',
              numero: 1,
              tipo: 'vrai-faux',
              enunciado: 'Au Balcon — Cuisine regionale',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p2',
              numero: 2,
              tipo: 'vrai-faux',
              enunciado: 'Au Balcon — Menus sans viande ni poisson',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p3',
              numero: 3,
              tipo: 'vrai-faux',
              enunciado: 'Au Balcon — Lieu calme',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p4',
              numero: 4,
              tipo: 'vrai-faux',
              enunciado: 'Au Balcon — Service de qualite',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            // Le Bonheur dans l'assiette: 4 criteres
            {
              id: 'B1-e1-CE-ex1-p5',
              numero: 5,
              tipo: 'vrai-faux',
              enunciado: 'Le Bonheur dans l\'assiette — Cuisine regionale',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p6',
              numero: 6,
              tipo: 'vrai-faux',
              enunciado: 'Le Bonheur dans l\'assiette — Menus sans viande ni poisson',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex1-p7',
              numero: 7,
              tipo: 'vrai-faux',
              enunciado: 'Le Bonheur dans l\'assiette — Lieu calme',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex1-p8',
              numero: 8,
              tipo: 'vrai-faux',
              enunciado: 'Le Bonheur dans l\'assiette — Service de qualite',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            // Le Lyon exotique: 4 criteres
            {
              id: 'B1-e1-CE-ex1-p9',
              numero: 9,
              tipo: 'vrai-faux',
              enunciado: 'Le Lyon exotique — Cuisine regionale',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p10',
              numero: 10,
              tipo: 'vrai-faux',
              enunciado: 'Le Lyon exotique — Menus sans viande ni poisson',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p11',
              numero: 11,
              tipo: 'vrai-faux',
              enunciado: 'Le Lyon exotique — Lieu calme',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex1-p12',
              numero: 12,
              tipo: 'vrai-faux',
              enunciado: 'Le Lyon exotique — Service de qualite',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            // Le Piano: 4 criteres
            {
              id: 'B1-e1-CE-ex1-p13',
              numero: 13,
              tipo: 'vrai-faux',
              enunciado: 'Le Piano — Cuisine regionale',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p14',
              numero: 14,
              tipo: 'vrai-faux',
              enunciado: 'Le Piano — Menus sans viande ni poisson',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex1-p15',
              numero: 15,
              tipo: 'vrai-faux',
              enunciado: 'Le Piano — Lieu calme',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex1-p16',
              numero: 16,
              tipo: 'vrai-faux',
              enunciado: 'Le Piano — Service de qualite',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
          ],
        },

        // ── Exercice 2 : article bilinguisme enfants (8 pts) ──
        {
          id: 'B1-e1-CE-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones: 'Vous lisez cet article sur Internet.',
          texto:
            'PARLER DEUX LANGUES EST-IL UN ATOUT OU UN HANDICAP POUR LES ENFANTS ?\n\nEn France, un enfant sur cinq nait dans un foyer bilingue. Il n\'y a pas beaucoup de differences dans le developpement du langage entre un enfant bilingue et un enfant monolingue. « A 24 mois, les enfants connaissent une cinquantaine de mots, souligne Barbara Abdelilah-Bauer, linguiste. Pour les enfants bilingues, ces mots sont partages entre les deux langues. » Cette situation pourrait laisser croire qu\'il y a un retard dans l\'apprentissage d\'une des deux langues, mais « quand on etudie le vocabulaire des enfants bilingues et monolingues a trois ans, on trouve le meme nombre de mots, en moyenne. »\n\nChaque famille a sa propre experience du bilinguisme. Ainsi, Johanna, qui est irlandaise et vit a Nantes, temoigne : « En France, si je parle anglais a mon fils, Mathias, il me repond plutot en francais. Ce n\'est qu\'en Irlande, la ou vit ma famille, et au bout de quelques semaines, qu\'il fait des phrases en anglais. Lorsqu\'il m\'arrive de me facher contre mon fils, j\'utilise spontanement ma langue maternelle. Je regrette tout de suite apres car j\'ai peur qu\'il associe la langue anglaise a quelque chose de desagreable. »\n\nIbsen est danois. Pour lui, parler sa langue maternelle avec ses filles, c\'est surtout transmettre quelque chose de la culture danoise. « Je leur apprends des chansons en danois et elles regardent aussi des dessins animes en danois. Mais dans leur vie quotidienne, comme a l\'ecole ou avec leurs copains, c\'est clair, c\'est le francais qui l\'emporte. Ce n\'est pas vraiment pas simple de transmettre sa langue lorsqu\'on n\'est pas dans son pays d\'origine ! »\n\nBarbara Abdelilah-Bauer evoque un autre point : « Encore aujourd\'hui, certains pensent qu\'un enfant eleve dans deux langues differentes reussit moins bien a l\'ecole. » Ce qui est faux. De plus, les langues n\'ont pas la meme image dans la societe. « Malheureusement, on voit souvent la capacite a parler anglais comme une force, mais pas forcement d\'autres langues, regrette Barbara Abdelilah-Bauer. Je recois par exemple des couples franco-espagnols qui n\'ont qu\'une envie : que leur enfant apprenne l\'anglais. »\n\nD\'apres Oihana GABRIEL, www.20minutes.fr',
          puntuacionTotal: 8,
          preguntas: [
            {
              id: 'B1-e1-CE-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                'Selon Barbara Abdelilah-Bauer, vers 3 ans, les enfants bilingues...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'ont tendance a melanger les deux langues.' },
                { letra: 'B', texto: 'apprennent plus rapidement des mots dans les deux langues.' },
                { letra: 'C', texto: 'possedent autant de vocabulaire que les enfants monolingues.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CE-ex2-p2',
              numero: 2,
              tipo: 'vrai-faux',
              enunciado:
                'En Irlande, le fils de Johanna a besoin de temps pour communiquer en anglais avec sa famille.',
              puntos: 1,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex2-p3',
              numero: 3,
              tipo: 'vrai-faux',
              enunciado:
                'Johanna parle plus naturellement l\'anglais quand elle est en colere contre son fils.',
              puntos: 1,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Les filles d\'Ibsen utilisent le danois quand elles...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'discutent en famille.' },
                { letra: 'B', texto: 'jouent avec leurs amis.' },
                { letra: 'C', texto: 'chantent avec leur pere.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CE-ex2-p5',
              numero: 5,
              tipo: 'vrai-faux',
              enunciado:
                'Au quotidien, il est facile et naturel pour Ibsen de parler danois a ses filles.',
              puntos: 1,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Certaines personnes pensent que les enfants bilingues...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'apprennent moins vite' },
                { letra: 'B', texto: 'ont de moins bons resultats     ... a l\'ecole.' },
                { letra: 'C', texto: 'communiquent moins facilement' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CE-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado: 'Barbara Abdelilah-Bauer regrette que...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'l\'enseignement des langues soit peu varie.' },
                { letra: 'B', texto: 'la societe donne trop d\'importance a l\'anglais.' },
                { letra: 'C', texto: 'les enfants bilingues soient aussi peu accompagnes.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },

        // ── Exercice 3 : article locations saisonnieres (9 pts) ──
        {
          id: 'B1-e1-CE-ex3',
          numero: 3,
          titulo: 'Exercice 3',
          instrucciones: 'Vous lisez cet article dans un magazine.',
          texto:
            'L\'IMPACT DES LOCATIONS SAISONNIERES SUR L\'IMMOBILIER\n\nC\'est un fait inquietant qu\'on constate dans toutes les capitales europeennes : les touristes sejournent de plus en plus dans des appartements loues sur des sites internet. Laurent Lopez, directeur d\'hotel, est directement concerne : « notre chiffre d\'affaire baisse de 10 % chaque annee depuis 3 ans. » En parallele, ce nouveau mode d\'hebergement a provoque une augmentation du prix du metre carre. Ainsi, a Barcelone, le quartier historique se vide peu a peu de ses habitants qui, pour des raisons economiques, preferent demenager en banlieue. Aujourd\'hui, le quartier ne compte plus que 15 624 residents a l\'annee alors qu\'ils etaient 27 470 en 2006.\n\nPar ailleurs, Yolande, qui habite a Paris, nous explique que son quotidien est devenu tres difficile en raison des locations saisonnieres : « Les arrivees et departs a n\'importe quelle heure de la journee, les fetes toute la nuit, les groupes de touristes qui envahissent le hall de l\'immeuble avec leurs valises... On ne se sent plus chez soi. Nous ne voulions pas d\'ascenseur, mais un voisin qui loue son appartement en voulait absolument un pour attirer les touristes. Ca nous a donc coute de l\'argent. J\'ai ete me plaindre a la mairie mais ca n\'a servi a rien ! »\n\nLe marche de la location saisonniere peut rapporter beaucoup d\'argent : en moyenne 350 EUR supplementaires par mois pour les proprietaires de logements loues sur les sites internet de locations saisonnieres a Amsterdam. Dans cette ville, tout comme a Paris et Londres, les autorites ont deja decide de mettre en place des regles pour limiter la duree de location. Les sites internet de locations saisonnieres protestent et affirment que les problemes de logement existaient deja avant leur arrivee.\n\nPour les habitants des quartiers historiques, la vie n\'est plus la meme : les rues pleines de touristes perdent peu a peu leurs magasins de quartier. Fini les boutiques d\'autrefois, adieu les voisins qu\'on connait bien. Maintenant, les rues se remplissent de restaurants chics, de boutiques de souvenirs et de valises a roulettes.\n\nD\'apres Anne MAUREL, www.partenaire-europeen.fr\n\n* location saisonniere : mode d\'hebergement touristique de courte duree.',
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'B1-e1-CE-ex3-p1',
              numero: 1,
              tipo: 'vrai-faux',
              enunciado: 'En Europe, les reservations dans les hotels ont fortement augmente.',
              puntos: 1,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e1-CE-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'A Barcelone, les habitants quittent le centre-ville car les logements sont trop...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'chers.' },
                { letra: 'B', texto: 'petits.' },
                { letra: 'C', texto: 'bruyants.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e1-CE-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Yolande trouve que les locations saisonnieres...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'donnent une mauvaise image de la ville.' },
                { letra: 'B', texto: 'ne lui rapportent pas suffisamment d\'argent.' },
                { letra: 'C', texto: 'provoquent trop de passage dans son immeuble.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CE-ex3-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Pour quelle raison Yolande est-elle en colere ? Parce que...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'les touristes ne la saluent pas.' },
                { letra: 'B', texto: 'les depenses de l\'immeuble ont augmente.' },
                { letra: 'C', texto: 'la mairie autorise trop de locations saisonnieres.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e1-CE-ex3-p5',
              numero: 5,
              tipo: 'vrai-faux',
              enunciado:
                'D\'apres les sites internet de locations saisonnieres, les difficultes a se loger en centre-ville ne sont pas nouvelles.',
              puntos: 1,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e1-CE-ex3-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Les habitants des centres-villes regrettent...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'l\'absence de solidarite des voisins.' },
                { letra: 'B', texto: 'le manque d\'education des touristes.' },
                { letra: 'C', texto: 'la disparition des commerces de proximite.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e1-CE-ex3-p7',
              numero: 7,
              tipo: 'vrai-faux',
              enunciado:
                'En sejournant dans les centres-villes, les touristes ont acces a une vie de quartier traditionnelle.',
              puntos: 1,
              respuestaCorrecta: false,
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ECRITE ──────────────────────────────────────
    {
      id: 'B1-e1-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production ecrite',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Epreuve portant sur l\'expression ecrite d\'un point de vue personnel sur un theme general (essai, courrier, article...).',

      ejercicios: [
        {
          id: 'B1-e1-PE-ex1',
          numero: 1,
          titulo: 'Essai — Repondre a un mail',
          instrucciones:
            'Vous recevez ce mail de Louisa, une amie francaise :\n\n« Salut,\nMon entreprise me propose de quitter Brest pour aller travailler a New York. C\'est une bonne nouvelle, mais comment je vais faire dans une si grande ville alors que j\'adore la nature ? Il y a aussi les problemes de la langue, du logement, des amis... Je me sens un peu perdue. Tu en penses quoi ?\nA tres vite !\nLouisa »\n\nVous repondez a Louisa. Vous lui donnez votre opinion en lui donnant des exemples d\'experiences diverses.',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B1-e1-PE-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                'Repondez a Louisa. Donnez-lui votre opinion en lui donnant des exemples d\'experiences diverses. 160 mots minimum.',
              puntos: 25,
              minPalabras: 160,
              criteriosEvaluacion: [
                {
                  label: 'Respect de la consigne',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Capacite a presenter des faits',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                },
                {
                  label: 'Capacite a exprimer sa pensee',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                },
                {
                  label: 'Coherence et cohesion',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                },
                {
                  label: 'Competence lexicale / orthographe lexicale',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
                },
                {
                  label: 'Competence grammaticale / orthographe grammaticale',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ORALE ──────────────────────────────────────
    {
      id: 'B1-e1-PO',
      numero: 4,
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 15,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'L\'epreuve comporte trois parties. Elle dure environ 15 minutes. Preparation : 10 minutes (ne concerne que la 3e partie de l\'epreuve).',
      notasEspeciales: [
        'Partie 1 : entretien dirige — sans preparation — 2 a 3 minutes',
        'Partie 2 : exercice en interaction — sans preparation — 3 a 4 minutes',
        'Partie 3 : expression d\'un point de vue a partir d\'un document declencheur — avec preparation (10 min) — 5 a 7 minutes',
      ],

      ejercicios: [
        {
          id: 'B1-e1-PO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Entretien dirige',
          instrucciones:
            'Sans preparation. 2 a 3 minutes environ.\nObjectif : parler de soi, de ses activites, de ses centres d\'interet, parler de son passe, de son present et de ses projets.\nL\'examinateur pose des questions.',
          puntuacionTotal: 5,
          preguntas: [
            {
              id: 'B1-e1-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Presentez-vous : parlez de votre famille, de vos activites, de vos centres d\'interet. Parlez de votre passe, de votre present et de vos projets.',
              puntos: 5,
              sujetosAlternativos: [
                'Presentez-vous. Quel est votre parcours ?',
                'Quels sont vos centres d\'interet ?',
                'Quels sont vos projets pour l\'avenir ?',
                'Parlez-moi de votre vie quotidienne.',
                'Qu\'est-ce qui est important pour vous dans la vie ?',
              ],
            },
          ],
        },
        {
          id: 'B1-e1-PO-ex2',
          numero: 2,
          titulo: 'Partie 2 — Exercice en interaction',
          instrucciones:
            'Sans preparation. 3 a 4 minutes.\nObjectif : faire face a une situation inhabituelle de la vie courante.\nVous tirez au sort deux sujets et vous en choisissez un. Vous jouez le role qui vous est indique.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'B1-e1-PO-ex2-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Choisissez un sujet et jouez la scene avec l\'examinateur.',
              puntos: 10,
              sujetosAlternativos: [
                'VOISINAGE — Votre voisin organise une fete tous les samedis soirs et fait beaucoup de bruit. Vous allez le voir pour lui expliquer le probleme et trouver une solution ensemble. L\'examinateur joue le role du voisin.',
                'VOYAGE — Vous avez reserve un hotel pour vos vacances mais quand vous arrivez, la chambre ne correspond pas a la description du site internet. Vous allez a la reception pour expliquer le probleme et demander une solution. L\'examinateur joue le role du receptionniste.',
                'TRAVAIL — Votre entreprise veut vous envoyer travailler dans une autre ville. Vous ne voulez pas demenager. Vous allez voir votre directeur pour lui expliquer votre situation et proposer des alternatives. L\'examinateur joue le role du directeur.',
                'COLOCATION — Vous vivez en colocation. Votre colocataire ne fait jamais le menage et laisse la cuisine sale. Vous decidez de lui en parler pour trouver une solution. L\'examinateur joue le role du colocataire.',
              ],
            },
          ],
        },
        {
          id: 'B1-e1-PO-ex3',
          numero: 3,
          titulo: 'Partie 3 — Expression d\'un point de vue',
          instrucciones:
            'Avec preparation (10 minutes). 5 a 7 minutes.\nObjectif : exprimer son point de vue a partir d\'un document declencheur.\nVous tirez au sort deux sujets et vous en choisissez un. Vous degagez le theme du document puis vous presentez votre opinion de maniere claire et argumentee. L\'examinateur peut vous poser quelques questions.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'B1-e1-PO-ex3-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Degagez le theme du document puis presentez votre opinion de maniere argumentee. L\'examinateur pourra vous poser quelques questions.',
              puntos: 10,
              sujetosAlternativos: [
                'LE TELETRAVAIL — De plus en plus d\'entreprises proposent a leurs employes de travailler depuis chez eux. Pensez-vous que le teletravail soit une bonne chose ? Quels sont les avantages et les inconvenients ? Donnez votre point de vue.',
                'LES RESEAUX SOCIAUX — Les reseaux sociaux font partie de notre vie quotidienne. Pensez-vous qu\'ils nous rapprochent ou qu\'ils nous eloignent les uns des autres ? Argumentez votre point de vue.',
                'L\'ALIMENTATION BIO — De plus en plus de personnes consomment des produits biologiques. Est-ce une mode ou un veritable choix de vie ? Donnez votre avis en vous appuyant sur des exemples concrets.',
                'LES VACANCES ECOLOGIQUES — Certaines personnes choisissent de ne plus prendre l\'avion pour reduire leur impact ecologique. Que pensez-vous de cette initiative ? Est-ce realiste ? Argumentez.',
              ],
            },
          ],
        },
      ],
    },
  ],
}
