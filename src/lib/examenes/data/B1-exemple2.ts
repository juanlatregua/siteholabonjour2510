import { Examen } from '../types'

export const examen_B1_exemple2: Examen = {
  id: 'B1-exemple2',
  nivel: 'B1',
  diploma: 'DELF',
  modalidad: 'demo',
  ejemplo: 2,
  titulo: 'DELF B1 — Exemple 2',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPREHENSION DE L'ORAL ───────────────────────────────
    {
      id: 'B1-e2-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Comprehension de l'oral",
      duracionMinutos: 25,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Vous allez entendre trois enregistrements, correspondant a trois documents differents. Pour le premier et le deuxieme document, vous avez :\n- 30 secondes pour lire les questions ;\n- une premiere ecoute, puis 30 secondes de pause pour repondre aux questions ;\n- une seconde ecoute, puis 1 minute de pause pour completer vos reponses.\nPour repondre aux questions, cochez la bonne reponse ou ecrivez l\'information demandee.',
      notasEspeciales: ['Duree maximale de l\'ensemble des documents : 6 min'],

      ejercicios: [
        // ── Exercice 1 : conversation vacances de Charlotte (6 pts) ──
        {
          id: 'B1-e2-CO-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            'Lisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple2-exercice1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 30,
          tiempoRespuestaFinal: 60,
          puntuacionTotal: 6,
          preguntas: [
            {
              id: 'B1-e2-CO-ex1-p1',
              numero: 1,
              tipo: 'reponse-libre',
              enunciado: 'Qu\'est-ce que Charlotte a pense de ses vacances ?',
              puntos: 1,
              respuestaCorrecta: 'C\'etait nul ! / Elle n\'a pas aime ses vacances.',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CO-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'L\'un des problemes a l\'hotel etait que :',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'la chambre etait trop petite.' },
                { letra: 'B', texto: 'sa chambre n\'etait pas reservee.' },
                { letra: 'C', texto: 'il n\'y avait pas de salle de bain dans la chambre.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'B1-e2-CO-ex1-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'Ce que Charlotte a aime, c\'est...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'la taille de la piscine.' },
                { letra: 'B', texto: 'la nourriture du restaurant.' },
                { letra: 'C', texto: 'la gentillesse des autres voyageurs.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CO-ex1-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado: 'Le personnel de l\'hotel n\'etait pas...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'aimable.' },
                { letra: 'B', texto: 'nombreux.' },
                { letra: 'C', texto: 'experimente.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CO-ex1-p5',
              numero: 5,
              tipo: 'reponse-libre',
              enunciado: 'Qui avait organise les vacances de Charlotte ?',
              puntos: 1,
              respuestaCorrecta: 'Une agence de voyages.',
            },
            {
              id: 'B1-e2-CO-ex1-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'Paul est d\'accord pour...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'passer ses prochaines vacances avec Charlotte.' },
                { letra: 'B', texto: 'aider Charlotte a organiser ses prochaines vacances.' },
                { letra: 'C', texto: 'preter sa maison a Charlotte pour les prochaines vacances.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },

        // ── Exercice 2 : radio — don d'objets sur Internet (8 pts) ──
        {
          id: 'B1-e2-CO-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones:
            'Lisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple2-exercice2.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 30,
          tiempoRespuestaFinal: 60,
          puntuacionTotal: 8,
          preguntas: [
            {
              id: 'B1-e2-CO-ex2-p1',
              numero: 1,
              tipo: 'reponse-libre',
              enunciado: 'De quelle sorte de site parle le journaliste ?',
              puntos: 1.5,
              respuestaCorrecta: 'Des sites pour donner des objets.',
            },
            {
              id: 'B1-e2-CO-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Quels objets recherche-t-on particulierement pour les enfants sur ces sites ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Des jouets.' },
                { letra: 'B', texto: 'Des tablettes.' },
                { letra: 'C', texto: 'Des vetements.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e2-CO-ex2-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado: 'Que faut-il faire pour donner un objet sur le site Consoblog.com ?',
              puntos: 1.5,
              respuestaCorrecta: 'Il faut passer une petite annonce.',
            },
            {
              id: 'B1-e2-CO-ex2-p4',
              numero: 4,
              tipo: 'reponse-libre',
              enunciado: 'Pour quelle raison principale donne-t-on ?',
              puntos: 2,
              respuestaCorrecta:
                'Parce qu\'on a envie de donner / Par generosite / Par solidarite / Pour rendre service aux autres.',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CO-ex2-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                'Le don des objets sur Internet rencontre beaucoup de succes aupres...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'des jeunes.' },
                { letra: 'B', texto: 'des retraites.' },
                { letra: 'C', texto: 'des femmes au foyer.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e2-CO-ex2-p6',
              numero: 6,
              tipo: 'qcm',
              enunciado: 'La qualite du service du site Consoblog.com est garantie par...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'la precision des descriptions des objets offerts.' },
                { letra: 'B', texto: 'l\'obligation de publier des photos dans les annonces.' },
                { letra: 'C', texto: 'les notes mises par les personnes qui recuperent les objets.' },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },

        // ── Exercice 3 : radio — consommation et prix (11 pts) ──
        {
          id: 'B1-e2-CO-ex3',
          numero: 3,
          titulo: 'Exercice 3',
          instrucciones:
            'Vous avez une minute pour lire les questions ci-dessous. Puis, vous entendez un document une premiere fois. Ensuite, vous avez trois minutes pour repondre aux questions. Vous ecoutez une seconde fois le document. Apres la seconde ecoute, vous avez encore deux minutes pour completer vos reponses.\nLisez les questions. Ecoutez le document puis repondez.',
          audio: '/examenes/audio/B1/delf-b1-tp-coll-exemple2-exercice3.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 60,
          pausaEntreEscuchas: 180,
          tiempoRespuestaFinal: 120,
          puntuacionTotal: 11,
          preguntas: [
            {
              id: 'B1-e2-CO-ex3-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'Cette emission vise a...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'informer les commercants.' },
                { letra: 'B', texto: 'critiquer les achats en ligne.' },
                { letra: 'C', texto: 'conseiller les consommateurs.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CO-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado: 'Thierry Sagnier constate qu\'Internet permet au consommateur...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'de devenir lui-meme vendeur.' },
                { letra: 'B', texto: 'd\'acheter sans perdre de temps.' },
                { letra: 'C', texto: 'de beneficier de services gratuits.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CO-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado:
                'Que pense Thierry Sagnier des commercants qui vendent a moitie prix ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Ils mettent des prix trop eleves a l\'origine.' },
                { letra: 'B', texto: 'Ils preferent vendre sans benefices que ne pas vendre.' },
                { letra: 'C', texto: 'Ils donnent une mauvaise image de la qualite des produits.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'B1-e2-CO-ex3-p4',
              numero: 4,
              tipo: 'reponse-libre',
              enunciado:
                'Pourquoi, selon Thierry Sagnier, certains articles sont-ils vendus chers ?',
              puntos: 2,
              respuestaCorrecta:
                'Les vendeurs veulent etre surs de gagner de l\'argent.',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CO-ex3-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                'Thierry Sagnier donne un exemple de produit finance par la publicite. Lequel ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Les concerts publics.' },
                { letra: 'B', texto: 'Les films sur Internet.' },
                { letra: 'C', texto: 'Les journaux gratuits.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CO-ex3-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado: 'Que font certains restaurants pour attirer les clients ?',
              puntos: 2,
              respuestaCorrecta: 'Ils offrent le repas (aux enfants).',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CO-ex3-p7',
              numero: 7,
              tipo: 'reponse-libre',
              enunciado:
                'Selon Thierry Sagnier, pourquoi les supermarches offrent-ils des produits gratuits a leurs clients ?',
              puntos: 2,
              respuestaCorrecta:
                'Pour faire revenir les clients et pouvoir leur vendre ensuite n\'importe quoi a n\'importe quel prix.',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CO-ex3-p8',
              numero: 8,
              tipo: 'qcm',
              enunciado:
                'Que pense Thierry Sagnier des offres gratuites des supermarches ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Il faut en profiter.' },
                { letra: 'B', texto: 'Il faut etre prudent.' },
                { letra: 'C', texto: 'Il faut s\'assurer de la qualite du produit.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },
      ],
    },

    // ─── COMPREHENSION DES ECRITS ──────────────────────────────
    {
      id: 'B1-e2-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Comprehension des ecrits',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Pour repondre aux questions, cochez la bonne reponse ou ecrivez l\'information demandee.',

      ejercicios: [
        // ── Exercice 1 : activites touristiques — grille (10 pts) ──
        {
          id: 'B1-e2-CE-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones:
            'Vous etes en vacances en France. Vous vous interessez aux curiosites de la region.\n- Vous etes libre vendredi apres-midi de 14 h a 17 h.\n- Vous voulez depenser 10 EUR au maximum.\n- Comme il pleut, vous ne voulez pas faire de visite a l\'exterieur.\nIndiquez d\'une croix si le critere correspond ou non a vos exigences.',
          texto:
            'Collection de plantes rares du jardin botanique (1)\nDans ce jardin botanique, vous pourrez decouvrir des plantes a parfum, medicinales, aromatiques et industrielles. Ce veritable musee vegetal presente une collection de plus de 1 200 especes sauvages et cultivees, qui comprend les varietes les plus menacees en France. La promenade pedagogique et interactive dans les differents jardins (medieval, tropical, especes odorantes et protegees) fera appel a tous vos sens et vous expliquera les vertus et les utilisations des plantes.\nOuvert du lundi au samedi, de 10 h a 18 h.\nEntree libre.\n\nMusee des Beaux-arts (2)\nVenez decouvrir les salles de ce petit musee qui abrite une collection de peintures et de meubles de grande valeur, tant artistique qu\'historique. Plus que faire une visite, le promeneur remontera le temps et decouvrira ainsi une partie de l\'histoire de la region.\nLe musee est ouvert du lundi au jeudi de 10 h a 12 h et de 14 h a 17 h, et le vendredi de 10 h a 20 h.\nTarif : adulte 3,5 EUR ; gratuit pour les moins de 18 ans et les etudiants sur presentation de leur carte.\n\nSeance de relaxation en piscine (3)\nFermez les yeux, ne pensez plus a rien et oubliez la fatigue de la semaine. Pour ne plus penser au froid, a la pluie ou a vos problemes, rien de mieux qu\'une seance de relaxation en piscine chauffee. L\'activite est proposee par des professionnels du sport. La seance dure environ 1 h.\nVendredi et samedi apres-midi de 14 h a 18 h.\nTarif : 10 EUR / heure.\n- Bonnet de bain obligatoire.\n- Seul le maillot de bain traditionnel est autorise.\n- Acces aux vestiaires exclusivement pieds nus.\nTemperature de l\'eau : 28 deg / 29 deg\n\nCentre historique (4)\nLa meilleure maniere de decouvrir le centre historique, c\'est de se promener dans ses rues pittoresques. Vous decouvrirez des facades surprenantes et des petites places romantiques.\nL\'office du tourisme propose des visites guidees les vendredis apres-midi de 13 h a 17 h. La duree de la visite est de 1 h 30 (cout : 15 EUR).\nPour les visites avec un guide, tres demandees, il faut s\'inscrire a l\'office du tourisme.',
          puntuacionTotal: 10,
          preguntas: [
            // Collection de plantes rares (1): 5 criteres
            {
              id: 'B1-e2-CE-ex1-p1',
              numero: 1,
              tipo: 'vrai-faux',
              enunciado: 'Collection de plantes rares — Interet touristique',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p2',
              numero: 2,
              tipo: 'vrai-faux',
              enunciado: 'Collection de plantes rares — Jour (vendredi)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p3',
              numero: 3,
              tipo: 'vrai-faux',
              enunciado: 'Collection de plantes rares — Heures d\'ouverture (14h-17h)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p4',
              numero: 4,
              tipo: 'vrai-faux',
              enunciado: 'Collection de plantes rares — Prix (10 EUR max)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p5',
              numero: 5,
              tipo: 'vrai-faux',
              enunciado: 'Collection de plantes rares — Lieu couvert',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            // Musee des Beaux-arts (2): 5 criteres
            {
              id: 'B1-e2-CE-ex1-p6',
              numero: 6,
              tipo: 'vrai-faux',
              enunciado: 'Musee des Beaux-arts — Interet touristique',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p7',
              numero: 7,
              tipo: 'vrai-faux',
              enunciado: 'Musee des Beaux-arts — Jour (vendredi)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p8',
              numero: 8,
              tipo: 'vrai-faux',
              enunciado: 'Musee des Beaux-arts — Heures d\'ouverture (14h-17h)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p9',
              numero: 9,
              tipo: 'vrai-faux',
              enunciado: 'Musee des Beaux-arts — Prix (10 EUR max)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p10',
              numero: 10,
              tipo: 'vrai-faux',
              enunciado: 'Musee des Beaux-arts — Lieu couvert',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            // Piscine municipale (3): 5 criteres
            {
              id: 'B1-e2-CE-ex1-p11',
              numero: 11,
              tipo: 'vrai-faux',
              enunciado: 'Piscine municipale — Interet touristique',
              puntos: 0.5,
              respuestaCorrecta: true,
              nota: 'La relaxation en piscine chauffee est une activite de loisir touristique.',
            },
            {
              id: 'B1-e2-CE-ex1-p12',
              numero: 12,
              tipo: 'vrai-faux',
              enunciado: 'Piscine municipale — Jour (vendredi)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p13',
              numero: 13,
              tipo: 'vrai-faux',
              enunciado: 'Piscine municipale — Heures d\'ouverture (14h-17h)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p14',
              numero: 14,
              tipo: 'vrai-faux',
              enunciado: 'Piscine municipale — Prix (10 EUR max)',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p15',
              numero: 15,
              tipo: 'vrai-faux',
              enunciado: 'Piscine municipale — Lieu couvert',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            // Centre historique (4): 5 criteres
            {
              id: 'B1-e2-CE-ex1-p16',
              numero: 16,
              tipo: 'vrai-faux',
              enunciado: 'Centre historique — Interet touristique',
              puntos: 0.5,
              respuestaCorrecta: true,
            },
            {
              id: 'B1-e2-CE-ex1-p17',
              numero: 17,
              tipo: 'vrai-faux',
              enunciado: 'Centre historique — Jour (vendredi)',
              puntos: 0.5,
              respuestaCorrecta: false,
              nota: 'La visite guidee est le vendredi mais coute 15 EUR, au-dela du budget.',
            },
            {
              id: 'B1-e2-CE-ex1-p18',
              numero: 18,
              tipo: 'vrai-faux',
              enunciado: 'Centre historique — Heures d\'ouverture (14h-17h)',
              puntos: 0.5,
              respuestaCorrecta: false,
              nota: 'La visite guidee est de 13h a 17h, mais coute 15 EUR.',
            },
            {
              id: 'B1-e2-CE-ex1-p19',
              numero: 19,
              tipo: 'vrai-faux',
              enunciado: 'Centre historique — Prix (10 EUR max)',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
            {
              id: 'B1-e2-CE-ex1-p20',
              numero: 20,
              tipo: 'vrai-faux',
              enunciado: 'Centre historique — Lieu couvert',
              puntos: 0.5,
              respuestaCorrecta: false,
            },
          ],
        },

        // ── Exercice 2 : article accents journalistes (15 pts) ──
        {
          id: 'B1-e2-CE-ex2',
          numero: 2,
          titulo: 'Exercice 2',
          instrucciones: 'Vous lisez cet article.',
          texto:
            'UNE VOIX POUR LES ACCENTS\n\nA la radio, le journaliste Jean-Michel Aphatie a conserve les intonations de son Pays basque natal, dans le Sud de la France. Une exception, dans un paysage audiovisuel ou il y a beaucoup de regles.\n\nPeut-on evoquer des sujets serieux avec un accent du Sud de la France ? Faire de la philosophie avec des intonations alsaciennes* ? Developper une pensee profonde en parlant comme les gens du Nord ?\n\nLongtemps, la France a repondu non. Le seul « beau parler » etait celui des elites* parisiennes et ceux qui revaient de s\'elever socialement devaient l\'adopter.\n\nJean-Michel Aphatie est une exception. Avant lui, les journalistes qui avaient garde l\'accent du Midi presentaient le rugby, la meteo ou les specialites regionales, au nom d\'une loi tres stricte : « On n\'accepte pas a la Comedie-Francaise* que les comediens parlent avec un accent regional », disait, voila dix ans, le president de France Television Xavier Gouyou-Beauchamps. « Il est difficile d\'imaginer un accent trop fort pour presenter un journal national. »\n\nM. Aphatie a ete le premier a animer une emission dite « serieuse » a la radio puis a la television. L\'entree du journaliste basque dans le monde audiovisuel n\'avait donc rien d\'evident.\n\n« J\'ai longtemps travaille en presse ecrite, indique-t-il. C\'est en representant mon journal, Le Parisien, a l\'emission Res Publica, a la radio, que j\'ai rencontre Jean-Luc Hess, qui dirigeait alors la station. En 1999, il m\'a propose de devenir chef du service politique. »\n\nCurieusement, l\'actuel president du groupe Radio-France ne se souvient pas du debat apres l\'arrivee de M. Aphatie : « Son arrivee n\'a pas ete critiquee, car il etait evident que Jean-Michel Aphatie avait beaucoup de presence a la radio. Son accent est si naturel que cela n\'a pose aucun probleme. »\n\nSon passage a Radio Luxembourg, en 2003, a ete bien moins facile. Noel Couedel, alors directeur de l\'information, raconte : « Dans l\'equipe de direction, j\'etais le seul a defendre sa candidature. Personne ne discutait ses grandes qualites professionnelles. » Mais d\'autres n\'etaient pas d\'accord : « Son accent est tellement fort que l\'auditeur va oublier ce qu\'il dit » ; « La politique est un sujet trop serieux pour etre confie a une intonation aussi chantante* », etc.\n\nA la fin, Philippe Labro, alors vice-president de la station de radio, a explique : « Il y a deux possibilites : soit son accent lui permettra d\'etre connu et ce sera tres bien. Soit on le trouvera ridicule et ce sera une catastrophe. Selon moi, le risque est trop grand pour qu\'on le prenne. »\n\n« J\'ai vraiment du beaucoup insister pour etre choisi ! », rapporte Jean-Michel Aphatie. Puis il precise : « Je n\'ai jamais cherche a corriger ou a accentuer mon accent. Je mets tous mes efforts et toute mon energie exclusivement dans le travail. »\n\nD\'apres Michel FELTIN, L\'Express\n\n* alsacienne : qui vient d\'Alsace.\n* elite : groupe considere comme le meilleur d\'une societe.\n* La Comedie-Francaise est un theatre parisien. Depuis 1680, on y joue des pieces classiques.\n* intonation chantante : dans le Sud de la France, l\'intonation est differente de celle consideree comme standard.',
          puntuacionTotal: 15,
          preguntas: [
            {
              id: 'B1-e2-CE-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'L\'auteur de l\'article...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'critique la facon de parler de certains journalistes.' },
                { letra: 'B', texto: 'recommande que les journalistes parlent sans accent.' },
                { letra: 'C', texto: 'constate que certains journalistes parlent avec un accent.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CE-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Autrefois, prononcer le francais comme un Parisien etait un avantage car c\'etait plus facile pour...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'devenir professeur.' },
                { letra: 'B', texto: 'se faire comprendre.' },
                { letra: 'C', texto: 'reussir dans la societe.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CE-ex2-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado: 'En quoi Jean-Michel Aphatie est-il un journaliste original ?',
              puntos: 2,
              respuestaCorrecta:
                'Il parle avec un accent basque OU du Sud de la France.',
              nota: 'Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CE-ex2-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                'Autrefois, les journalistes de radio qui parlaient avec un accent regional...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'etaient surtout specialises en politique.' },
                { letra: 'B', texto: 'devaient prendre des cours de prononciation.' },
                { letra: 'C', texto: 'commentaient en general des sujets peu serieux.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CE-ex2-p5',
              numero: 5,
              tipo: 'vrai-faux',
              enunciado:
                'J.M. Aphatie a ecrit des articles pour le journal Le Parisien.',
              puntos: 1.5,
              respuestaCorrecta: true,
              justificacionCorrecta:
                '« J\'ai longtemps travaille en presse ecrite... C\'est en representant mon journal, Le Parisien ».',
              nota: '1,5 point si le choix V/F et la justification sont corrects, sinon aucun point ne sera attribue.',
            },
            {
              id: 'B1-e2-CE-ex2-p6',
              numero: 6,
              tipo: 'vrai-faux',
              enunciado:
                'Il a ete facile, pour J.M. Aphatie, d\'entrer a Radio-France.',
              puntos: 1.5,
              respuestaCorrecta: true,
              justificacionCorrecta:
                '« L\'actuel president du groupe Radio-France ne se souvient pas du debat autour de l\'arrivee de M. Aphatie. Elle n\'a pas ete critiquee ».',
              nota: '1,5 point si le choix V/F et la justification sont corrects, sinon aucun point ne sera attribue.',
            },
            {
              id: 'B1-e2-CE-ex2-p7',
              numero: 7,
              tipo: 'qcm',
              enunciado:
                'A Radio Luxembourg, le directeur de l\'information trouvait que l\'accent de J.M. Aphatie etait...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'trop fort.' },
                { letra: 'B', texto: 'amusant.' },
                { letra: 'C', texto: 'acceptable.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'B1-e2-CE-ex2-p8',
              numero: 8,
              tipo: 'reponse-libre',
              enunciado:
                'Expliquez pourquoi, selon certaines personnes, avoir une intonation chantante pose probleme quand on est journaliste de radio.',
              puntos: 2,
              respuestaCorrecta:
                'L\'auditeur va oublier ce que dit le journaliste / Ca ne fait pas assez serieux.',
              nota: 'Plusieurs reponses possibles. Ou toute formulation de ce type.',
            },
            {
              id: 'B1-e2-CE-ex2-p9',
              numero: 9,
              tipo: 'vrai-faux',
              enunciado:
                'P. Labro considere que la maniere de prononcer le francais n\'a aucune importance pour un journaliste de radio.',
              puntos: 1.5,
              respuestaCorrecta: false,
              justificacionCorrecta:
                '« Le risque est trop grand pour qu\'on le prenne. »',
              nota: '1,5 point si le choix V/F et la justification sont corrects, sinon aucun point ne sera attribue.',
            },
            {
              id: 'B1-e2-CE-ex2-p10',
              numero: 10,
              tipo: 'vrai-faux',
              enunciado: 'J.M. Aphatie a cherche a modifier sa maniere de parler.',
              puntos: 1.5,
              respuestaCorrecta: false,
              justificacionCorrecta:
                '« Je n\'ai jamais cherche a corriger ou a accentuer mon accent. »',
              nota: '1,5 point si le choix V/F et la justification sont corrects, sinon aucun point ne sera attribue.',
            },
            {
              id: 'B1-e2-CE-ex2-p11',
              numero: 11,
              tipo: 'qcm',
              enunciado:
                'La principale qualite professionnelle de Jean-Michel Aphatie est :',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'son talent pour ecrire.' },
                { letra: 'B', texto: 'sa connaissance du sport.' },
                { letra: 'C', texto: 'sa grande capacite de travail.' },
              ],
              respuestaCorrecta: 'C',
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ECRITE ──────────────────────────────────────
    {
      id: 'B1-e2-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production ecrite',
      duracionMinutos: 45,
      puntuacionTotal: 25,
      instruccionesGenerales:
        'Expression d\'une attitude personnelle sur un theme general (essai, courrier, article...).',

      ejercicios: [
        {
          id: 'B1-e2-PE-ex1',
          numero: 1,
          titulo: 'Essai — Repondre a un mail',
          instrucciones:
            'Vous recevez ce mail de Louisa, une amie francaise :\n\n« Salut,\nMon entreprise me propose de quitter Brest pour aller travailler a New York. C\'est une bonne nouvelle, mais comment je vais faire dans une si grande ville alors que j\'adore la nature ? Il y a aussi les problemes de la langue, du logement, des amis... Je me sens un peu perdue. Tu en penses quoi ?\nA tres vite !\nLouisa »\n\nVous repondez a Louisa. Vous lui donnez votre opinion en lui donnant des exemples d\'experiences diverses.',
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'B1-e2-PE-ex1-p1',
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
      id: 'B1-e2-PO',
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
          id: 'B1-e2-PO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Entretien dirige',
          instrucciones:
            'Sans preparation. 2 a 3 minutes environ.\nObjectif : parler de soi, de ses activites, de ses centres d\'interet, parler de son passe, de son present et de ses projets.\nL\'examinateur pose des questions.',
          puntuacionTotal: 5,
          preguntas: [
            {
              id: 'B1-e2-PO-ex1-p1',
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
          id: 'B1-e2-PO-ex2',
          numero: 2,
          titulo: 'Partie 2 — Exercice en interaction',
          instrucciones:
            'Sans preparation. 3 a 4 minutes.\nObjectif : faire face a une situation inhabituelle de la vie courante.\nVous tirez au sort deux sujets et vous en choisissez un. Vous jouez le role qui vous est indique.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'B1-e2-PO-ex2-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Choisissez un sujet et jouez la scene avec l\'examinateur.',
              puntos: 10,
              sujetosAlternativos: [
                'DEMENAGEMENT — Vous avez accepte un nouveau travail dans une autre ville. Vous devez convaincre votre meilleur(e) ami(e) de vous aider a demenager le week-end prochain. L\'examinateur joue le role de votre ami(e).',
                'CADEAU D\'ANNIVERSAIRE — L\'anniversaire de votre mere approche. Vous proposez a votre frere/soeur d\'organiser une fete surprise et de lui offrir un cadeau commun. L\'examinateur joue le role de votre frere/soeur.',
                'ASSOCIATION — Vous etes benevole dans une association. Vous essayez de convaincre un(e) ami(e) de rejoindre votre association. L\'examinateur joue le role de votre ami(e).',
                'SPORT — Vous voulez vous inscrire a un nouveau sport mais votre conjoint(e) pense que ce n\'est pas raisonnable (manque de temps, cout...). Vous essayez de le/la convaincre. L\'examinateur joue le role du/de la conjoint(e).',
              ],
            },
          ],
        },
        {
          id: 'B1-e2-PO-ex3',
          numero: 3,
          titulo: 'Partie 3 — Expression d\'un point de vue',
          instrucciones:
            'Avec preparation (10 minutes). 5 a 7 minutes.\nObjectif : exprimer son point de vue a partir d\'un document declencheur.\nVous tirez au sort deux sujets et vous en choisissez un. Vous degagez le theme du document puis vous presentez votre opinion de maniere claire et argumentee. L\'examinateur peut vous poser quelques questions.',
          puntuacionTotal: 10,
          preguntas: [
            {
              id: 'B1-e2-PO-ex3-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                'Degagez le theme du document puis presentez votre opinion de maniere argumentee. L\'examinateur pourra vous poser quelques questions.',
              puntos: 10,
              sujetosAlternativos: [
                'LA VIE EN VILLE — De plus en plus de personnes quittent la ville pour s\'installer a la campagne. Quels sont les avantages et les inconvenients de la vie en ville ? Et de la vie a la campagne ? Donnez votre point de vue.',
                'L\'APPRENTISSAGE DES LANGUES — On dit que les enfants apprennent les langues plus facilement que les adultes. Etes-vous d\'accord ? Comment peut-on ameliorer l\'apprentissage des langues etrangeres ? Donnez votre avis.',
                'LE TOURISME RESPONSABLE — Le tourisme de masse est souvent critique pour ses consequences sur l\'environnement et la vie locale. Que pensez-vous du tourisme responsable ? Est-il possible de voyager sans nuire ? Argumentez.',
                'L\'ACHAT EN LIGNE — Acheter sur Internet est devenu tres courant. Quels sont les avantages et les risques des achats en ligne ? Preferez-vous acheter en magasin ou sur Internet ? Expliquez votre point de vue.',
              ],
            },
          ],
        },
      ],
    },
  ],
}
