import { Examen } from '../types'

export const examen_C1_exemple1: Examen = {
  id: 'C1-exemple1',
  nivel: 'C1',
  diploma: 'DALF',
  modalidad: 'demo',
  ejemplo: 1,
  titulo: 'DALF C1 — Exemple 1',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPREHENSION DE L'ORAL ───────────────────────────────
    {
      id: 'C1-e1-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Comprehension de l'oral",
      duracionMinutos: 40,
      puntuacionTotal: 25,
      instruccionesGenerales:
        "Reponse a des questionnaires de comprehension portant sur des documents enregistres : un document long (entretien, cours, conference...) avec deux ecoutes ; plusieurs brefs documents radiodiffuses (flashs d'information, sondages, spots publicitaires...) avec une ecoute.",
      notasEspeciales: ['Duree maximale des documents : 10 minutes'],

      ejercicios: [
        // ── Premiere Partie : document long (18 points) ──
        {
          id: 'C1-e1-CO-ex1',
          numero: 1,
          titulo: 'Premiere Partie',
          instrucciones:
            "Vous allez entendre deux fois un enregistrement de 6 minutes environ :\n- vous avez tout d'abord 3 minutes pour lire les questions ;\n- puis vous ecoutez une premiere fois l'enregistrement ;\n- vous avez ensuite 3 minutes pour repondre aux questions ;\n- vous ecoutez une seconde fois l'enregistrement ;\n- vous avez encore 5 minutes pour completer vos reponses.\n\nPour repondre aux questions, cochez la bonne reponse ou ecrivez l'information demandee.",
          audio: '/examenes/audio/C1/DALF_C1_DEMO_exo1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 180,
          pausaEntreEscuchas: 180,
          tiempoRespuestaFinal: 300,
          puntuacionTotal: 18,
          preguntas: [
            {
              id: 'C1-e1-CO-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                'Dans cet entretien, la reflexion de Michel Serres porte principalement sur...',
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'les elements qui permettent de quantifier le bonheur.' },
                {
                  letra: 'B',
                  texto:
                    "l'interpretation des statistiques liees au produit national brut.",
                },
                {
                  letra: 'C',
                  texto:
                    "l'utilisation des chiffres du bonheur national brut par les politiques.",
                },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'C1-e1-CO-ex1-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Le journaliste introduit Michel Serres en affirmant que...',
              puntos: 2,
              opciones: [
                { letra: 'A', texto: "les catastrophes font la richesse d'un pays." },
                { letra: 'B', texto: 'le taux du PNB reflete le niveau de bonheur.' },
                { letra: 'C', texto: 'le malheur des uns fait le bonheur des autres.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'C1-e1-CO-ex1-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado:
                "Pour Michel Serres, dans quelle mesure un accident peut-il etre une chance pour l'economie ?",
              puntos: 2,
              respuestaCorrecta:
                "Un accident augmente les richesses d'un pays en faisant travailler les personnes qui interviennent autour de l'accident.",
            },
            {
              id: 'C1-e1-CO-ex1-p4',
              numero: 4,
              tipo: 'reponse-libre',
              enunciado:
                "D'apres Michel Serres, quelle est la relation entre la pollution et le PNB ?",
              puntos: 2,
              respuestaCorrecta:
                "La pollution est une composante economique du PNB qu'elle permet d'augmenter.",
            },
            {
              id: 'C1-e1-CO-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Michel Serres souleve la question de l'equilibre a trouver entre...",
              puntos: 1.5,
              opciones: [
                { letra: 'A', texto: 'la pauvrete et la richesse.' },
                { letra: 'B', texto: 'la pollution et le bien-etre.' },
                { letra: 'C', texto: "les catastrophes et l'economie." },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'C1-e1-CO-ex1-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado:
                "Pour quelle raison Michel Serres pense-t-il qu'il est difficile de mesurer le bonheur ?",
              puntos: 2,
              respuestaCorrecta:
                'La notion de bonheur depend des individus et de la culture.',
            },
            {
              id: 'C1-e1-CO-ex1-p7',
              numero: 7,
              tipo: 'reponse-libre',
              enunciado:
                'Quelle methode Michel Serres propose-t-il pour tenter de chiffrer le bonheur ?',
              puntos: 2,
              respuestaCorrecta:
                'Pour chiffrer le bonheur, il faut inverser la question et donc quantifier le malheur.',
            },
            {
              id: 'C1-e1-CO-ex1-p8',
              numero: 8,
              tipo: 'reponse-libre',
              enunciado:
                "Pour Michel Serres, que doit-on garder a l'esprit lorsque l'on profite de la vie ?",
              puntos: 2,
              respuestaCorrecta:
                "Il faut garder a l'esprit la quantite de malheur que l'on produit chaque fois qu'on se fait plaisir / qu'on profite de la vie.",
            },
            {
              id: 'C1-e1-CO-ex1-p9',
              numero: 9,
              tipo: 'qcm',
              enunciado:
                'Quelle est la position de Michel Serres sur le bonheur national brut ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Il y est oppose.' },
                { letra: 'B', texto: 'Il y est favorable.' },
                { letra: 'C', texto: 'Il y est indifferent.' },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'C1-e1-CO-ex1-p10',
              numero: 10,
              tipo: 'reponse-libre',
              enunciado:
                "Quelle est la conclusion de Michel Serres sur le sujet aborde dans l'emission ?",
              puntos: 2,
              respuestaCorrecta:
                "Le malheur est quantifiable, le bonheur ne l'est pas.",
            },
          ],
        },

        // ── Seconde Partie : documents courts (7 points) ──
        {
          id: 'C1-e1-CO-ex2',
          numero: 2,
          titulo: 'Seconde Partie — Document 1',
          instrucciones:
            "Vous allez entendre une seule fois plusieurs courts extraits radiophoniques. Pour chacun des extraits :\n- vous avez 50 secondes pour lire les questions ;\n- puis vous ecoutez l'enregistrement ;\n- vous avez ensuite 50 secondes pour repondre aux questions.",
          audio: '/examenes/audio/C1/DALF_C1_DEMO_exo2_a.mp3',
          numEscuchas: 1,
          tiempoLecturaPrevia: 50,
          tiempoRespuestaFinal: 50,
          puntuacionTotal: 3,
          preguntas: [
            {
              id: 'C1-e1-CO-ex2-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                "En 1936, les scientifiques s'interessent au coelacanthe, une espece marine...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "qu'ils pensaient disparue." },
                { letra: 'B', texto: "qu'ils esperaient capturer." },
                { letra: 'C', texto: "qu'ils ne connaissaient pas." },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'C1-e1-CO-ex2-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                'Pour quelle raison les chercheurs sont-ils intrigues par cette espece ?',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Elle a une esperance de vie inhabituelle.' },
                {
                  letra: 'B',
                  texto: "Elle a des caracteristiques communes avec l'homme.",
                },
                {
                  letra: 'C',
                  texto:
                    "Elle a des capacites d'adaptation a tous les milieux marins.",
                },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'C1-e1-CO-ex2-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado: 'De nos jours, le coelacanthe est...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'en surete.' },
                { letra: 'B', texto: 'en forte croissance.' },
                { letra: 'C', texto: 'en voie de disparition.' },
              ],
              respuestaCorrecta: 'A',
            },
          ],
        },
        {
          id: 'C1-e1-CO-ex3',
          numero: 3,
          titulo: 'Seconde Partie — Document 2',
          instrucciones:
            "Vous allez entendre une seule fois un court extrait radiophonique :\n- vous avez 50 secondes pour lire les questions ;\n- puis vous ecoutez l'enregistrement ;\n- vous avez ensuite 50 secondes pour repondre aux questions.",
          audio: '/examenes/audio/C1/DALF_C1_DEMO_exo2_b.mp3',
          numEscuchas: 1,
          tiempoLecturaPrevia: 50,
          tiempoRespuestaFinal: 50,
          puntuacionTotal: 4,
          preguntas: [
            {
              id: 'C1-e1-CO-ex3-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado:
                'Le journaliste affirme que la tradition des cartes postales...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'evolue.' },
                { letra: 'B', texto: 'perdure.' },
                { letra: 'C', texto: 'disparait.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'C1-e1-CO-ex3-p2',
              numero: 2,
              tipo: 'qcm',
              enunciado:
                "Quel est l'objectif principal de l'expediteur de la carte postale ?",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'Donner de ses nouvelles.' },
                { letra: 'B', texto: 'Faire plaisir au destinataire.' },
                { letra: 'C', texto: 'Informer sur son lieu de vacances.' },
              ],
              respuestaCorrecta: 'B',
            },
            {
              id: 'C1-e1-CO-ex3-p3',
              numero: 3,
              tipo: 'qcm',
              enunciado:
                "D'apres Jean-Claude Protet, la carte postale sert surtout a...",
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "promouvoir la culture d'une region." },
                { letra: 'B', texto: 'fabriquer des souvenirs memorables.' },
                { letra: 'C', texto: 'transmettre des informations a ses proches.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'C1-e1-CO-ex3-p4',
              numero: 4,
              tipo: 'qcm',
              enunciado:
                'A ce jour, on peut dire que le commerce des cartes postales...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'reste stable.' },
                { letra: 'B', texto: 'est en recul.' },
                { letra: 'C', texto: 'se transforme.' },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },
      ],
    },

    // ─── COMPREHENSION DES ECRITS ──────────────────────────────
    {
      id: 'C1-e1-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Comprehension des ecrits',
      duracionMinutos: 50,
      puntuacionTotal: 25,
      instruccionesGenerales:
        "Lisez le texte puis repondez aux questions en cochant la bonne reponse ou en ecrivant l'information demandee.",

      ejercicios: [
        {
          id: 'C1-e1-CE-ex1',
          numero: 1,
          titulo: 'Comprehension des ecrits',
          instrucciones:
            "Lisez le texte puis repondez aux questions en cochant la bonne reponse ou en ecrivant l'information demandee.",
          texto:
            "Changer de vie, le syndrome du tourisme a la ferme\n\nLeurs parents partaient elever des chevres a la campagne. Les cadres d'aujourd'hui quittent leur entreprise pour ouvrir des maisons d'hotes. Crise de l'age adulte ou choix rationnel ?\n\nPour dissuader ses lyceens de faire les Beaux-arts, l'Ecole du cirque ou de se diriger vers diplome d'arts du spectacle, un proviseur avait coutume de leur raconter cette histoire : \u00ab J'avais deux copains. Ils adoraient tous les deux la montagne. Chaque fin de semaine, ils partaient ensemble en randonnee dans les Alpes. Le bac en poche, le premier d'entre eux choisit d'en faire son metier. Il devint guide de haute montagne. Aujourd'hui, il gagne difficilement le salaire minimum. Les randonneurs sont rares, et souvent mediocres. A mi-parcours, il doit souvent faire demi-tour. Les sommets, il ne les voit jamais. A 40 ans, il est use. Mon second copain fit des etudes de commerce. Il est devenu directeur financier dans une grande entreprise. Chaque vendredi, il s'envole vers les plus beaux sommets d'Europe. Il s'offre les meilleurs guides, gravit les montagnes, s'epanouit... Lequel des deux assouvit le mieux sa passion ? \u00bb Grace a cette anecdote, le proviseur s'enorgueillissait de n'envoyer aucun bachelier vers des filieres bouchees. Seulement voila : depuis trois ans, le proviseur se fait plus discret. Car l'histoire a pris un tour inattendu. Le directeur financier, sans doute moins heureux qu'il l'affichait, a tout abandonne : son travail, son entreprise, sa vie parisienne et son appartement cossu. Il a ouvert un gite de randonneurs en Haute-Savoie. Ses enfants l'ont traite de fou. Lui se declare enfin \u00ab en phase \u00bb avec lui-meme.\n\nCe cas n'est pas isole. Il suffit de se promener dans une campagne francaise pour prendre la mesure du phenomene. Des panneaux \u00ab chambres d'hotes \u00bb ont fleuri partout le long des routes. En vingt ans, leur nombre est passe de 4 500 a plus de 30 000, selon la direction du Tourisme du ministere de l'Emploi, qui ne recense que les maisons d'hotes labellisees par les principales organisations touristiques. Et chaque annee, 2 500 Francais creent un gite rural, une aventure pourtant risquee.\n\nLa fin des parcours lineaires\n\nPlus qu'a un changement de metier, c'est a un changement de vie auquel aspirent ces individus. Citadins pour la plupart, ils ont entre 30 et 50 ans, avec une tendance au rajeunissement ; ils sont \u00ab installes \u00bb sur le plan professionnel, en couple ou seuls. Ils se disent prets a quitter travail et confort, a s'eloigner de leurs amis, a \u00ab gagner moins pour vivre mieux \u00bb. Une fois leur projet abouti, ils parlent de liberte, d'harmonie, de renaissance. En kiosque depuis le 1er mars, le magazine Changer tout resume l'ambition de leur reconversion. \u00ab Nous avions l'intention d'appeler ce journal Changer de vie, revele sa fondatrice. Mais au dernier moment, nous nous sommes rendus compte que ce titre etait deja depose par un producteur de television. \u00bb L'anecdote est revelatrice. Le changement personnel, valorise depuis une trentaine d'annees, serait-il devenu une incantation collective ? Pour la sociologue, auteur de Reconversions professionnelles volontaires, ce mouvement est a la fois individuel et social. Certes, l'individu, actif et volontaire, est le seul initiateur de sa reconversion. Mais la societe, en erigeant en diktat le changement et la \u00ab vocation de soi \u00bb, en fait une experience sociale. Ce phenomene, poursuit la sociologue, resulte a la fois de la crise de l'emploi, qui encourage chacun a etre plus mobile, et d'un bouleversement des valeurs qui cimentent la societe : \u00ab Jusqu'aux annees 1970, le projet de vie des individus etait surtout construit a partir des categories de la famille heureuse, de l'accession a la propriete familiale. Aujourd'hui, il est davantage question de realisation de soi, de quete de l'identite personnelle. \u00bb Le mythe du retour aux sources, l'engouement ecologique, le rejet des transports en commun et des rythmes professionnels epuisants peuvent aussi constituer de puissants ressorts.\n\nL'effet \u00ab autocuiseur \u00bb\n\nSi sept millions de citadins revent de refaire leur vie aux champs, tous ne passent pourtant pas a l'acte. \u00ab Il y a toujours un evenement declencheur \u00bb, constate la directrice de Changer tout. Elle-meme a quitte Paris et son poste de directrice de la redaction d'un magazine tele, il y a neuf ans, pour fonder sa propre agence dans le Gers. \u00ab Mon fils, allergique a la pollution, a fait une crise d'asthme terrible, se souvient-elle. En quinze jours, j'ai tout vendu, et je suis partie m'installer dans le Gers. \u00bb\n\nUne sociologue, qui a realise une enquete qualitative, utilise la metaphore de l'autocuiseur pour caracteriser ce \u00ab scenario de crise \u00bb qui conduit l'individu a une remise a plat de son experience. Une crise survient a l'issue d'une periode de quelques mois, pendant laquelle la pression - professionnelle, familiale ou existentielle - ne cesse de monter. Une dispute avec un patron peut faire \u00ab sauter le couvercle \u00bb. Des evenements prives - separation, naissance, deuil ou probleme de sante - peuvent aussi jouer un role cle dans la reconversion. \u00ab L'importance du changement opere provient de ce que cette crise traverse diverses spheres de la vie, les contamine mutuellement [...]. Ici, tout est mele et accelere \u00bb, souligne la sociologue.\n\nIl n'est guere etonnant, des lors, que la bifurcation professionnelle et le demenagement prennent des allures de \u00ab conversion identitaire \u00bb. Elle oblige a une reflexion sur soi-meme et a un inventaire des possibles. Le sujet negocie avec lui-meme le prix de sa liberte. Cette introspection est un prealable a la planification de son projet, alors vecu comme un choix positif.\n\nLe cout de la liberte\n\nIl reste un mystere : pourquoi l'ouverture d'une chambre d'hotes reste le fantasme premier des Francais qui souhaitent changer de vie ? Il existe apres tout mille manieres de refaire sa vie : partir a l'etranger, faire de l'humanitaire, passer un concours de la fonction publique, se lancer dans une carriere artistique... Dans Changer de vie. Se reconvertir, mode d'emploi, les deux auteures donnent des indices. A partir de recits de vie, elles dissequent les motivations des candidats a la reconversion professionnelle. Elles etablissent cinq categories : se mettre au vert, se mettre a son compte, se consacrer aux autres, vivre sa passion, partir loin. Quelle activite, sinon l'hebergement touristique, permet de conjuguer toutes ces motivations ? Pour se lancer, il est preferable d'avoir quelques finances et un bon carnet d'adresses. Avec une rentabilite de 1 500 a 3 000 euros par chambre et par an, l'aventure tourne parfois court. D'ou un tout nouveau phenomene. Forts des experiences, parfois malheureuses, de leurs aines, certains jeunes anticipent. Dans les ecoles de commerce, dans les couloirs de places financieres, il arrive aujourd'hui de croiser de jeunes adultes de 20 ou 25 ans qui prevoient d'ouvrir une maison d'hotes \u00ab dans une quinzaine d'annees \u00bb. Une crise du milieu de vie en somme, inscrite dans leur plan de carriere.\n\nHeloise LHERETE, Sciences Humaines",
          puntuacionTotal: 25,
          preguntas: [
            {
              id: 'C1-e1-CE-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'Dans ce texte, la journaliste traite...',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: "d'une nouvelle forme de tourisme." },
                { letra: 'B', texto: "d'un nouveau secteur professionnel." },
                { letra: 'C', texto: "d'une nouvelle maniere de se realiser." },
              ],
              respuestaCorrecta: 'C',
            },
            {
              id: 'C1-e1-CE-ex1-p2',
              numero: 2,
              tipo: 'reponse-libre',
              enunciado:
                "Qu'est-ce que le proviseur d'un lycee cherchait a demontrer a ses eleves ?",
              puntos: 2,
              respuestaCorrecta:
                'Il vaut mieux reussir sa vie professionnelle pour assouvir ses passions plutot que de faire de sa passion une carriere.',
            },
            {
              id: 'C1-e1-CE-ex1-p3',
              numero: 3,
              tipo: 'reponse-libre',
              enunciado:
                "D'apres la journaliste, quelle raison a pousse le directeur financier a changer de vie ? Reformulez avec vos propres mots.",
              puntos: 2,
              respuestaCorrecta:
                'Il voulait etre enfin en accord avec lui-meme.',
            },
            {
              id: 'C1-e1-CE-ex1-p4',
              numero: 4,
              tipo: 'vrai-faux',
              enunciado:
                "La journaliste pense que le nombre des chambres d'hotes donne par le ministere est exagere.",
              puntos: 2,
              respuestaCorrecta: false,
              justificacionCorrecta:
                "... ne recense que les maisons d'hotes labellisees par les principales organisations touristiques.",
            },
            {
              id: 'C1-e1-CE-ex1-p5',
              numero: 5,
              tipo: 'qcm',
              enunciado:
                "Quel motif principal pousse les Francais a creer des chambres d'hotes ?",
              puntos: 2,
              opciones: [
                { letra: 'A', texto: 'Le besoin de vivre autrement.' },
                { letra: 'B', texto: "L'envie de mieux gagner leur vie." },
                { letra: 'C', texto: 'Le plaisir de prendre des risques.' },
              ],
              respuestaCorrecta: 'A',
            },
            {
              id: 'C1-e1-CE-ex1-p6',
              numero: 6,
              tipo: 'reponse-libre',
              enunciado:
                "D'apres la fondatrice du magazine Changer tout, quels indices l'ont confortee dans son choix editorial ?",
              puntos: 2,
              respuestaCorrecta:
                "Le premier titre choisi etait deja le titre d'une production televisee. / Son magazine fait echo a un mouvement qui existe depuis une trentaine d'annees.",
            },
            {
              id: 'C1-e1-CE-ex1-p7',
              numero: 7,
              tipo: 'reponse-libre',
              enunciado:
                'Selon la journaliste, quel changement de perspective accompagne le mouvement de societe traite dans cet article ?',
              puntos: 3,
              respuestaCorrecta:
                "On passe d'un mouvement de reconversion individuelle a une injonction sociale.",
            },
            {
              id: 'C1-e1-CE-ex1-p8',
              numero: 8,
              tipo: 'vrai-faux',
              enunciado:
                'Une situation de crise ne facilite pas la reconversion professionnelle.',
              puntos: 2,
              respuestaCorrecta: false,
              justificacionCorrecta:
                "Ce \u00ab scenario de crise \u00bb qui conduit l'individu a une remise a plat de son experience. OU \u00ab La crise de l'emploi encourage chacun a etre plus mobile \u00bb.",
            },
            {
              id: 'C1-e1-CE-ex1-p9',
              numero: 9,
              tipo: 'vrai-faux',
              enunciado:
                'La majeure partie du temps, les Francais se reconvertissent de facon hative et irreflechie.',
              puntos: 2,
              respuestaCorrecta: false,
              justificacionCorrecta:
                "Tous ne passent pourtant pas a l'acte. OU \u00ab Il y a toujours un evenement declencheur \u00bb.",
            },
            {
              id: 'C1-e1-CE-ex1-p10',
              numero: 10,
              tipo: 'vrai-faux',
              enunciado:
                'La reconversion passe necessairement par une quete de soi.',
              puntos: 2,
              respuestaCorrecta: true,
              justificacionCorrecta:
                "Elle oblige a une reflexion sur soi-meme. OU \u00ab Cette introspection est un prealable a la planification de son projet \u00bb.",
            },
            {
              id: 'C1-e1-CE-ex1-p11',
              numero: 11,
              tipo: 'reponse-libre',
              enunciado:
                "Pourquoi l'ouverture de chambres d'hotes est-elle une reconversion si populaire ?",
              puntos: 3,
              respuestaCorrecta:
                "Le fait d'ouvrir une chambre d'hotes repond aux motivations de toutes les categories de personnes qui souhaitent une reconversion professionnelle.",
            },
            {
              id: 'C1-e1-CE-ex1-p12',
              numero: 12,
              tipo: 'qcm',
              enunciado:
                "Pour certains etudiants de commerce ou de finances, ouvrir une chambre d'hotes peut...",
              puntos: 2,
              opciones: [
                { letra: 'A', texto: 'etre la reponse a leurs etudes.' },
                { letra: 'B', texto: 'faire partie de leur projet de vie.' },
                { letra: 'C', texto: "etre l'aboutissement de leur carriere." },
              ],
              respuestaCorrecta: 'B',
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ECRITE ──────────────────────────────────────
    {
      id: 'C1-e1-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production ecrite',
      duracionMinutos: 150,
      puntuacionTotal: 25,
      instruccionesGenerales:
        "Epreuve en deux parties : synthese de documents et essai argumente.",

      ejercicios: [
        // ── Epreuve N 1 : Synthese de documents ──
        {
          id: 'C1-e1-PE-ex1',
          numero: 1,
          titulo: 'Epreuve N\u00b01 : Synthese de documents',
          instrucciones:
            "Vous faites une synthese des documents proposes.\nPour cela, vous degagez les idees et les informations essentielles qu'ils contiennent, vous les regroupez et les classez en fonction du theme commun a tous ces documents, et vous les presentez avec vos propres mots, sous forme d'un nouveau texte suivi et coherent.\n\nAttention :\n- vous devez rediger un texte unique en suivant un ordre qui vous est propre, et non mettre deux resumes bout a bout ;\n- vous ne devez pas introduire d'autres idees ou informations que celles qui se trouvent dans les documents, ni faire de commentaires personnels ;\n- vous pouvez bien entendu reutiliser les \u00ab mots-clefs \u00bb des documents, mais non des phrases ou des passages entiers.",
          texto:
            "Document 1 : La diversite linguistique : un atout pour l'humanite\n\nLorsqu'une culture est assimilee par une autre, la langue menacee subit un processus qui passe generalement par trois etapes. Dans un premier temps, les locuteurs subissent une tres forte pression - politique, sociale ou economique - pour parler la langue dominante. Ce phenomene peut venir d'en haut, sous forme de mesures d'incitation, de recommandations ou de lois, ou bien de la base, par la pression du groupe ou en raison de la necessite economique. La deuxieme phase correspond a une periode de bilinguisme emergent. On maitrise de mieux en mieux la nouvelle langue, tout en etant toujours competent dans l'ancienne. Puis, souvent tres rapidement, le bilinguisme commence a s'estomper, et l'ancienne langue cede le pas a la nouvelle. Cela debouche sur la troisieme phase, au cours de laquelle la jeune generation s'identifie de plus en plus a la nouvelle langue, l'ancienne ayant a ses yeux moins d'interet. Il arrive souvent a ce stade que parents et enfants eprouvent une certaine honte a utiliser l'ancienne langue. Les familles qui continuent de la parler voient diminuer le nombre de leurs interlocuteurs et, le domaine d'usage se retrecissant, cela aboutit a la creation de \u00ab dialectes familiaux \u00bb.\n\nQuel remede a cela ? Dans le cas de beaucoup de langues, il est trop tard pour faire quoi que ce soit, parce que les locuteurs sont soit trop peu nombreux soit trop ages, ou bien parce que la communaute linguistique est trop occupee par ailleurs a essayer de survivre. Mais bien d'autres langues n'en sont pas a ce stade et on peut encore dans bien des cas les revitaliser. Mais il faut pour cela qu'un certain nombre de conditions soient reunies : la communaute elle-meme doit avoir envie de sauver sa langue ; la culture plus vaste dans laquelle elle s'inscrit doit respecter les langues minoritaires ; et il faut des fonds pour financer les cours, le materiel pedagogique et les enseignants.\n\nLa mort d'une langue est-elle vraiment une catastrophe ? [...] La disparition des langues devrait nous preoccuper au meme titre que celle des especes animales ou vegetales. Car cela reduit la diversite de notre planete. Des decennies de sensibilisation a l'ecologie ont fini par nous convaincre que la biodiversite est une bonne chose. La diversite linguistique n'a malheureusement pas beneficie de la meme publicite.\n\nLa diversite occupe une place centrale dans la theorie de l'evolution, car elle permet a une espece de survivre dans des milieux differents et l'uniformisation presente des dangers pour la survie a long terme d'une espece. [...] Si la multiplicite des cultures est une condition necessaire pour un developpement humain reussi, alors la preservation de la diversite linguistique est essentielle, puisque les langues ecrites et orales sont le principal mode de transmission des cultures.\n\nDavid CRYSTAL, Courrier international\n\n\nDocument 2 : 6 000 langues : un patrimoine en danger\n\nL'immense majorite des langues serait-elle condamnee a disparaitre a court terme ? Les linguistes estiment qu'un idiome ne peut survivre qu'a condition de compter au moins 100 000 locuteurs. Or, sur les quelque 6 000 langues qui existent actuellement dans le monde, la moitie compte moins de 10 000 locuteurs et un quart moins de 1 000. Depuis qu'elles se sont diversifiees, au moins 30 000 sont nees et se sont eteintes, souvent sans laisser de trace. A cette tres grande mortalite correspond une duree moyenne de vie relativement courte. Rares sont celles qui, comme le basque, l'egyptien, le chinois, l'hebreu, le grec, le latin, le persan, le sanskrit, le tamoul et quelques autres ont souffle leurs 2 000 bougies.\n\nCe qui est nouveau, en revanche, c'est la vitesse a laquelle elles perissent en ce moment. En remontant dans le temps, on s'apercoit que le declin de la diversite linguistique a ete considerablement accelere par les conquetes colonialistes europeennes qui ont elimine au moins 15 % des langues parlees a l'epoque. [...] La naissance des Etats-nations, dont l'unite territoriale etait etroitement liee a leur homogeneite linguistique, a egalement joue un role decisif dans la consolidation des langues adoptees comme nationales, et la marginalisation des autres. Deployant de gros efforts pour instaurer une langue officielle dans l'education, les medias et l'administration, les gouvernements ont consciemment vise l'elimination des langues minoritaires.\n\nCe processus d'homogeneisation s'est renforce avec l'industrialisation et le progres scientifique, qui ont impose de nouveaux modes de communication, rapides, simples et pratiques. La diversite des langues a ete alors percue comme une entrave aux echanges et a la diffusion du savoir. Le monolinguisme est devenu un ideal. C'est ainsi qu'a la fin du XIXe siecle est nee l'idee d'une langue universelle (on a meme songe a revenir au latin), qui a donne lieu a une proliferation de langues artificielles. Le volapuk a ete la premiere d'entre elles, tandis que l'esperanto a connu le plus vif succes et la plus grande longevite.\n\nPlus pres de nous, l'internationalisation des marches financiers, la diffusion de l'information par les medias electroniques et les autres avatars de la mondialisation ont intensifie la menace qui pesait deja sur les \u00ab petites \u00bb langues. Une langue qui n'est pas employee sur Internet \u00ab n'existe plus \u00bb dans le monde moderne. Elle est hors circuit. Elle est exclue du \u00ab commerce \u00bb.\n\nLe rythme d'extinction des langues a ainsi atteint des proportions sans precedent dans l'histoire : 10 par an a l'echelle mondiale. L'avenir parait encore plus sombre. Selon les pronostics, de 50 a 90 % des langues parlees aujourd'hui mourront au cours de ce siecle. Leur preservation est une affaire urgente.\n\nLes consequences de la disparition des langues sont graves a plus d'un titre. Si nous devenions tous uniformement monolingues, notre cerveau en serait affecte, au point de perdre une partie de notre creativite linguistique innee. Toute tentative de remonter aux origines du langage humain deviendrait impossible et le mystere de la \u00ab premiere langue \u00bb ne serait jamais perce. Par ailleurs, avec la mort de chaque langue, un volet de l'histoire de l'humanite se referme. Les langues ne sont pas seulement le moyen privilegie de communication entre les humains, elles incarnent la vision du monde de leurs locuteurs, leurs imaginaires, leurs facons de vehiculer le savoir. [...] Le danger qui pese sur le multilinguisme est analogue a celui qui concerne la biodiversite. [...] Ainsi, une grande partie des especes vegetales ou animales en peril ne sont connues a l'heure actuelle que par certains peuples, dont les langues s'eteignent. En mourant, elles emportent avec elles tout un savoir traditionnel sur l'environnement. [...]\n\nRanka BJELJAC-BABIC, maitre de conferences a l'Universite de Poitiers (France), www.unesco.org",
          puntuacionTotal: 12.5,
          preguntas: [
            {
              id: 'C1-e1-PE-ex1-p1',
              numero: 1,
              tipo: 'synthese',
              enunciado:
                "Faites une synthese des deux documents proposes sur le theme de la diversite linguistique. Degagez les idees et informations essentielles, regroupez-les et classez-les en fonction du theme commun, et presentez-les avec vos propres mots sous forme d'un nouveau texte suivi et coherent. (200 a 240 mots)",
              puntos: 12.5,
              minPalabras: 200,
              criteriosEvaluacion: [
                {
                  label: 'Respect de la consigne de longueur et de contenu',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Capacite a reperer et a restituer les informations les plus importantes',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                },
                {
                  label: 'Capacite a regrouper les informations et a reformuler',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                },
                {
                  label: 'Competence lexicale / Etendue et maitrise du vocabulaire',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Competence grammaticale / Degre d\'elaboration et correction des phrases',
                  valores: [0, 0.5, 1, 1.5, 2.5],
                },
              ],
            },
          ],
        },

        // ── Epreuve N 2 : Essai argumente ──
        {
          id: 'C1-e1-PE-ex2',
          numero: 2,
          titulo: 'Epreuve N\u00b02 : Essai argumente',
          instrucciones:
            "En lisant un magazine d'actualite, vous apprenez l'existence d'un projet visant a reduire le nombre de langues actuellement enseignees dans le systeme scolaire. Vous ecrivez une lettre ouverte au ministre de l'education pour presenter votre point de vue sur cette question de maniere argumentee. Vous insistez notamment sur les avantages de connaitre differentes langues et sur la necessite d'encourager leur apprentissage dans le systeme educatif.",
          puntuacionTotal: 12.5,
          preguntas: [
            {
              id: 'C1-e1-PE-ex2-p1',
              numero: 1,
              tipo: 'production',
              enunciado:
                "Ecrivez une lettre ouverte au ministre de l'education pour presenter votre point de vue argumente sur un projet visant a reduire le nombre de langues enseignees dans le systeme scolaire. Insistez sur les avantages de connaitre differentes langues et sur la necessite d'encourager leur apprentissage. (250 mots minimum)",
              puntos: 12.5,
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
                  label: 'Capacite a presenter, developper et illustrer un point de vue',
                  valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                },
                {
                  label: 'Coherence et cohesion',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Competence lexicale / Etendue et maitrise du vocabulaire',
                  valores: [0, 0.5, 1, 1.5, 2],
                },
                {
                  label: 'Competence grammaticale / Degre d\'elaboration et correction des phrases',
                  valores: [0, 0.5, 1, 1.5, 2.5],
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ORALE ──────────────────────────────────────
    {
      id: 'C1-e1-PO',
      numero: 4,
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 30,
      puntuacionTotal: 25,
      instruccionesGenerales:
        "Expose a partir de plusieurs documents ecrits, suivi d'une discussion avec le jury. Preparation : 60 minutes. Passation : 30 minutes environ.",
      notasEspeciales: [
        "Le candidat tire au sort deux sujets. Il en choisit un.",
        "Preparation : 1 heure",
        "L'usage de dictionnaires monolingues francais / francais est autorise.",
        "Partie 1 : Expose (8 a 10 minutes) avec preparation",
        "Partie 2 : Entretien (15 a 20 minutes) sans preparation",
      ],

      ejercicios: [
        // ── Partie 1 : Expose ──
        {
          id: 'C1-e1-PO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Expose',
          instrucciones:
            "A partir des documents proposes, vous preparerez un expose sur le theme indique et vous le presenterez au jury. Votre expose presentera une reflexion ordonnee sur ce sujet. Il comportera une introduction et une conclusion et mettra en evidence quelques points importants (3 ou 4 maximum).\n\nAttention : les documents sont une source documentaire pour votre expose. Vous devez pouvoir en exploiter le contenu en y puisant des pistes de reflexion, des informations et des exemples, mais vous devez egalement introduire des commentaires, des idees et des exemples qui vous sont propres afin de construire une veritable reflexion personnelle. En aucun cas vous ne devez vous limiter a un simple compte rendu des documents.",
          puntuacionTotal: 13,
          preguntas: [
            {
              id: 'C1-e1-PO-ex1-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                "Choisissez l'un des deux sujets et preparez un expose structure (introduction, developpement, conclusion).",
              puntos: 13,
              sujetosAlternativos: [
                "SUJET 1 : Le travail est-il nécessaire au bonheur ?\n\nDocument 1 : « Faut-il aimer son travail pour être heureux ? »\nChristilla Pellé Douel, www.psychologies.com\n\nS'épanouir dans sa profession est une aspiration forte pour beaucoup d'entre nous. Mais parce que nous n'exerçons pas le bon métier ou que nous l'exerçons dans de mauvaises conditions, cela n'est pas toujours possible. Quelles sont les vraies raisons de nos frustrations professionnelles ? Et comment remettre le travail à sa juste place ?\n\nAujourd'hui, travailler est une obligation culturelle. « Dans notre société de l'accomplissement personnel, le travail est devenu l'un des principaux vecteurs de la réalisation de soi », confirme le sociologue Vincent de Gaulejac. Au point que même lorsque nous occupons un emploi qui ne nous passionne pas, nous cherchons à y trouver un intérêt. Notre conception du travail est désormais intimement liée à une notion d'enrichissement personnel. « Idéalement, nous aspirons à mettre à profit une part précieuse de nous-mêmes pour en tirer un revenu confortable, constate un journaliste. Cela paraît simple. C'est monstrueusement compliqué. » Car dans la réalité, « ce qu'un employeur attend d'un salarié, ce n'est pas qu'il se fasse plaisir – même s'il l'y encourage –, mais qu'il contribue à la rentabilité de son affaire, l'un n'étant pas toujours compatible avec l'autre », observe Vincent de Gaulejac.\n\n« C'est parce que nous y mettons beaucoup de nous-mêmes que le travail nous expose à la déception », poursuit le sociologue. Exercer le métier de son choix mais dans de mauvaises conditions est un autre motif d'insatisfaction. Françoise, infirmière en hôpital psychiatrique : « On nous demande d'améliorer les relations avec le patient, d'être plus rentable dans le soin, et on supprime des postes. La contradiction est intenable. » Les situations qui engendrent des conflits intérieurs sont nombreuses : ne pas parvenir à équilibrer travail et vie privée (les femmes savent à quel point cet exercice est délicat), se trouver face à un dilemme entre sa mission et ses valeurs... Georges, ancien directeur des ressources humaines dans une entreprise de télécommunications, a ainsi été contraint de procéder à des licenciements qu'il désapprouvait. « J'en ai perdu le sommeil », assure-t-il.\n\n« Ce qui nous réjouit, à la fin d'une journée de travail, c'est d'avoir pu amener une amélioration dans la vie de quelqu'un », affirme un journaliste. « Il ne s'agit pas nécessairement de grands changements. L'industrialisation a rendu plus abstrait ce sentiment d'être utile. Contrairement aux artisans d'autrefois, qui connaissaient leurs clients, les ouvriers, par exemple, ont perdu le bénéfice de connaître ceux qui profitent de leur production... » Pour résumer, aujourd'hui encore, deux conceptions du travail s'affrontent : schématiquement, celle héritée de la classe ouvrière, pour qui travailler n'est qu'un moyen (de nourrir sa famille, de s'offrir du temps libre), et celle héritée des classes moyennes, qui l'envisagent comme une fin en soi, une condition indispensable au bonheur. En ces temps de difficultés économiques, la première vision a tendance à l'emporter, on se réjouit d'avoir du travail ! Un pragmatisme qui n'interdit pas de vouloir améliorer sa situation professionnelle, sans attendre pour autant qu'elle la comble totalement.\n\n« Remettre le travail à sa juste place est vital, certifie une psychanalyste. Il faut accepter le fait que le travail idéal n'existe pas, que la vie professionnelle n'est pas tout et que l'on ne peut pas tout avoir en même temps. » Ce qui manque à notre travail peut et doit être cultivé ailleurs.\n\n\nDocument 2 : « Des vertus de la paresse »\nCatherine Halpern, www.scienceshumaines.com\n\nSynonyme de servitude dans l'Antiquité romaine, le travail est devenu une valeur des sociétés modernes. Et si la paresse nous mettait sur la voie d'une société plus juste favorisant l'épanouissement de chacun ?\n\nLa question de la place du travail dans la société est aujourd'hui plus vive que jamais. Le développement des technologies a permis une augmentation importante de la productivité et a soulagé les hommes de nombreuses tâches ingrates ; pourtant, le travail occupe encore une très large place dans nos existences.\n\nD'après un économiste nord-américain, le travail est sur la pente d'un inexorable déclin. Du fait de l'automatisation et de l'informatisation, une large part des emplois dans tous les secteurs d'activité est amenée à disparaître et à rendre inutile une grande partie de la population active. Face à ce problème social, il préconise de réduire le temps de travail, de repenser la distribution des richesses autrement que sur la base de la production et de développer davantage l'économie sociale et la sphère associative qui œuvrent sur le bien-être d'autrui. Une vision qui rejoint celle de la sociologue française Dominique Méda : elle en appelle à relativiser la place du travail dans nos sociétés au profit des activités sociales et politiques, qui développent l'autonomie et la coopération. La vie humaine ne se résume pas à la production.\n\nTravailler moins, est-ce paresser ? Non, soutient le rédacteur en chef d'un magazine économique qui, chiffres à l'appui, fait état de l'excellente productivité des Français.\n\nEt la réduction du temps de travail est-elle suffisante pour mieux répartir le travail ? N'est-ce pas toute une échelle de valeurs et un mode de vie qu'il convient de construire ? Ne pourrait-on pas concevoir une société où chacun serait libre de choisir de travailler plus ou moins ? Les défenseurs de la décroissance invitent pour leur part à consommer moins, à travailler moins et à réformer en profondeur les modes de vie et notamment notre consommation. Une question de survie, expliquent-ils, pour réduire l'impact écologique et le prélèvement des ressources naturelles, mais aussi une volonté de promouvoir d'autres valeurs : l'altruisme, la coopération, le loisir, etc. Outre que cela favoriserait notre épanouissement, un peu de paresse sauverait-il le monde ? Ce n'est peut-être pas si improbable.",
                "SUJET 2 : L'espèce humaine peut-elle préserver la biodiversité ?\n\nDocument 1 : « Biodiversité : de quoi parle-t-on ? »\nEntretien avec Robert Barbault, Professeur à l'université Paris VI, directeur du département Écologie et gestion de la biodiversité du Muséum national d'histoire naturelle.\nPropos recueillis par Nicolas Journet, Sciences Humaines, Hors-série n°49\n\nLa notion de « biodiversité » a-t-elle un sens précis pour le biologiste ?\n\nLes biologistes ont toujours parlé de « diversité des espèces » et, comme on le sait, la « biodiversité » est apparue comme un concept politique en 1992, à l'issue de la conférence de Rio. Je pense cependant que, d'un point de vue scientifique, il apporte une idée oubliée : celle que l'homme est partie prenante de la biosphère. Cela permet de prendre en considération le rôle de la diversité dans l'évolution des sociétés humaines. Cela a pour conséquence que le sujet concerne non seulement les biologistes, mais aussi les autres spécialistes des sciences de la vie, de l'homme et de la société. C'est un concept qui porte un regard écologique sur le monde et oblige à considérer les interactions entre tous les compartiments du système planétaire, y compris les aspects humains, économiques et sociaux.\n\nY a-t-il des raisons scientifiquement établies pour qu'une telle problématique s'impose maintenant ?\n\nÀ l'échelle des temps géologiques, l'évolution entraîne une augmentation du nombre des espèces vivantes avec, de temps en temps, une grande crise d'extinction. Ces crises sont suivies de nouvelles expansions. Il y a donc une capacité naturelle de la biosphère à produire de la diversité et à faire face à son érosion. D'ailleurs, aucune espèce vivante n'est éternelle. La nature change tout le temps et la diversité est la stratégie qui lui permet de s'adapter au changement. Si l'on considère la période actuelle, on voit cependant qu'une espèce a particulièrement réussi : la nôtre. Elle a envahi la Terre, occupe de plus en plus d'espace, transforme les paysages, morcelle les milieux, détruit les forêts et modifie les climats. Ce phénomène a forcément des conséquences sur l'ensemble du vivant. Dans quelle mesure ? C'est là que la discussion commence. Certains additionnent les bactéries et les éléphants et affirment que 30 000 espèces disparaissent chaque année... C'est très spéculatif, car on ne maîtrise pas le nombre global d'espèces existantes. On peut faire des constats plus mesurés, sur les vertébrés par exemple. Il en existe 50 000 espèces ; en moyenne, une espèce vit cinq millions d'années, de sorte que l'on estime normal le rythme d'une disparition par siècle. Or, pour le XXe siècle, on relève déjà 260 disparitions de vertébrés. Il y a donc eu une accélération du phénomène. De plus, il n'y a pas que les extinctions qui comptent. Si on observe le déclin d'espèces comme les oiseaux communs, c'est que la qualité de leurs milieux de vie se dégrade. L'impact humain sur la diversité est indéniable.\n\nQuelles conséquences cette érosion de la biodiversité peut-elle avoir ?\n\nLe milieu de vie des oiseaux communs est aussi le nôtre. La dégradation des milieux amène des fluctuations brusques. Ces déséquilibres induisent des risques d'épidémie et de proliférations spécifiques. Plus on déséquilibre, plus on oblige à des interventions lourdes. Prenons un exemple : dans les vallées situées près de New-York, l'eau a été potable jusque dans les années 90, puis a cessé de l'être, à cause des pollutions agricoles et de la disparition des filtres naturels. L'assainissement de l'eau entraînait un coût énorme. On a donc décidé de restaurer les conditions antérieures, ce qui a été également coûteux mais dans une moindre mesure, et ne le sera plus à l'avenir. On prend ainsi peu à peu conscience que la protection des milieux est économiquement intéressante. La protection de la biodiversité n'est pas seulement une mesure conservatoire : c'est une condition du développement durable.\n\n\nDocument 2 : « Les espèces naissent, prospèrent puis disparaissent »\nChristian Lévêque, hydrobiologiste, évoque les menaces pesant sur la biodiversité, le rôle de l'être humain et les mesures à mettre en œuvre pour préserver les espèces menacées.\nPropos recueillis par Joël Ignasse, Sciences-et-Avenir.com\n\nQuelles sont les menaces qui pèsent sur la biodiversité ?\n\nOn classe généralement les menaces sur la biodiversité en quatre grandes catégories : la pollution, la destruction d'habitat, la surexploitation et les introductions d'espèces qui peuvent concurrencer les espèces autochtones. Cela est vrai, c'est l'aspect factuel, mais si on regarde un peu plus loin, les raisons de l'érosion de la biodiversité sont dans les comportements sociaux. Ce qui est en cause, c'est le profit à court terme : on exploite le plus vite possible pour faire le plus d'argent rapidement. C'est la corruption qui existe dans tous ces domaines de protection des ressources naturelles. Et c'est la pauvreté : dans les pays les plus démunis, la biodiversité est une source de profit que ce soit par la surexploitation ou par le braconnage. [...]\n\nVous dites que l'être humain est aussi un créateur de biodiversité ?\n\nBien sûr, d'abord nous avons manipulé les plantes pour créer de nouvelles variétés, puis les animaux. Nous générons aussi des conditions propices à l'émergence de nouvelles espèces. La différence réside dans l'échelle de temps : il est bien plus rapide de détruire une espèce que d'en créer une. La mondialisation, le transfert de spécimens d'un continent à l'autre sont autant de facteurs créateurs de biodiversité. On a longtemps cru que, pour qu'une nouvelle espèce apparaisse, il fallait qu'une population soit isolée. Il existe maintenant un autre modèle dans lequel il apparaît que des espèces peuvent évoluer différemment au sein d'un même milieu.\n\nNous avons néanmoins le devoir de préserver la biodiversité mais peut-on sauvegarder toutes les espèces ?\n\nPremièrement, il faut bien dire que l'on ne souhaite pas protéger toute la biodiversité. On cherche, par exemple, à détruire ou à cantonner les micro organismes pathogènes qui représentent également de la biodiversité, compte tenu de leur nombre et de leur omniprésence sur la planète. Ensuite, il me semble impossible de pouvoir protéger toutes les formes de vie actuelles. Nous allons nécessairement devoir faire des choix. Lesquels ? Je dirai qu'un côté affectif fait que nous nous intéressons plus aux vertébrés et aux mammifères. C'est aussi une question de point de vue : quand je pose cette question à mes collègues africains, ils me répondent qu'ils veulent protéger ce qu'ils connaissent et qui leur est utile. Pour moi, par exemple, la disparition des orangs-outans de Bornéo, parce qu'on détruit leur habitat pour planter des palmiers à huile pour faire des agrocarburants, me pose problème.",
              ],
            },
          ],
        },

        // ── Partie 2 : Entretien ──
        {
          id: 'C1-e1-PO-ex2',
          numero: 2,
          titulo: 'Partie 2 — Entretien avec le jury',
          instrucciones:
            'Sans preparation. 15 a 20 minutes.\nLe jury vous posera ensuite quelques questions et s\'entretiendra avec vous a propos du contenu de votre expose.',
          puntuacionTotal: 12,
          preguntas: [
            {
              id: 'C1-e1-PO-ex2-p1',
              numero: 1,
              tipo: 'oral',
              enunciado:
                "Le jury vous pose des questions et s'entretient avec vous a propos du contenu de votre expose. Debattez avec le jury sur le theme choisi.",
              puntos: 12,
            },
          ],
        },
      ],
    },
  ],
}
