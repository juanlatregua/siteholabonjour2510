export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  level: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  heroEmoji: string;
  sections: { heading: string; content: string }[];
}

export const blogPosts: BlogPost[] = [
  // ─── Article 1: DELF B2 ───────────────────────────────────────────────
  {
    slug: "como-aprobar-delf-b2",
    title: "Cómo aprobar el DELF B2 a la primera",
    description:
      "Consejos prácticos de examinadoras DELF para aprobar el B2. Estructura del examen, trucos por destreza y plan de estudio.",
    category: "delf-dalf",
    categoryLabel: "DELF/DALF",
    level: "B1-B2",
    author: "Equipo HolaBonjour",
    publishedAt: "2026-03-01",
    readingMinutes: 10,
    heroEmoji: "🎯",
    sections: [
      {
        heading: "¿Qué es el DELF B2 y por qué es tan importante?",
        content: `<p>El <strong>DELF B2</strong> (<em>Diplôme d'Études en Langue Française</em>) es el diploma oficial de francés expedido por el Ministerio de Educación de Francia. El nivel B2 del Marco Común Europeo de Referencia certifica que eres un <strong>usuario independiente</strong>: puedes argumentar, negociar y expresar matices con soltura.</p>
<p>¿Por qué es tan demandado? Porque el B2 es el nivel mínimo que exigen la mayoría de <strong>universidades francesas</strong> para matricularte, así como muchas empresas internacionales para puestos bilingües. Además, el diploma <strong>no caduca nunca</strong>, a diferencia de otros certificados como el TCF.</p>
<p>En HolaBonjour, nuestras profesoras son <strong>examinadoras oficiales DELF/DALF</strong>, así que conocen de primera mano los criterios de corrección y los errores más habituales. En este artículo compartimos todo lo que necesitas saber para aprobar a la primera.</p>`,
      },
      {
        heading: "Estructura del examen DELF B2",
        content: `<p>El examen consta de <strong>cuatro pruebas</strong>, cada una valorada sobre 25 puntos (total: 100). Para aprobar necesitas un mínimo de <strong>50 puntos</strong> en total y al menos <strong>5 puntos en cada prueba</strong>.</p>
<ul>
  <li><strong>Comprensión oral</strong> (compréhension de l'oral): 30 minutos. Dos escuchas de documentos sonoros con preguntas.</li>
  <li><strong>Comprensión escrita</strong> (compréhension des écrits): 1 hora. Dos textos largos con preguntas de análisis.</li>
  <li><strong>Producción escrita</strong> (production écrite): 1 hora. Redacción argumentativa de 250 palabras mínimo (carta formal, artículo de opinión, etc.).</li>
  <li><strong>Producción oral</strong> (production orale): 20 minutos de preparación + 20 minutos de prueba. Monólogo argumentado a partir de un documento + debate con el tribunal.</li>
</ul>
<p>Es fundamental que conozcas la estructura antes de empezar a prepararte: saber qué te van a pedir elimina gran parte del estrés del día del examen.</p>`,
      },
      {
        heading: "Comprensión oral: trucos para no perder puntos",
        content: `<p>La comprensión oral es la prueba que más nervios genera. Aquí van nuestros consejos de examinadoras:</p>
<ul>
  <li><strong>Lee las preguntas antes de la escucha.</strong> Tienes unos segundos para leerlas: úsalos para subrayar las palabras clave y anticipar el tema.</li>
  <li><strong>No intentes entender cada palabra.</strong> Busca la <em>idea general</em> en la primera escucha y los <em>detalles</em> en la segunda.</li>
  <li><strong>Atención a los conectores orales.</strong> Palabras como <em>en revanche</em>, <em>pourtant</em>, <em>d'ailleurs</em> señalan giros argumentativos y son pistas de respuesta.</li>
  <li><strong>Practica con France Inter y France Culture.</strong> Los audios del DELF suelen ser extractos de radio. Escucha podcasts franceses de actualidad a diario, aunque solo sean 10 minutos.</li>
  <li><strong>Toma notas con abreviaturas.</strong> No escribas frases completas: usa flechas, símbolos y palabras clave.</li>
</ul>
<p>Un error común: dejar respuestas en blanco. En la comprensión oral <strong>no se penaliza</strong> la respuesta incorrecta, así que siempre es mejor arriesgar.</p>`,
      },
      {
        heading: "Comprensión escrita: estrategia de lectura",
        content: `<p>En la comprensión escrita tienes una hora para dos textos. La clave es gestionar bien el tiempo:</p>
<ul>
  <li><strong>Lectura rápida primero</strong> (2-3 minutos por texto): identifica el tema, el tipo de texto (artículo, editorial, carta) y la tesis del autor.</li>
  <li><strong>Lee las preguntas</strong> antes de la segunda lectura detallada. Así sabrás qué buscar.</li>
  <li><strong>Subraya las respuestas en el texto.</strong> Los correctores valoran que tus respuestas estén <em>justificadas con elementos del texto</em>.</li>
  <li><strong>Cuidado con las reformulaciones.</strong> Las respuestas correctas rara vez usan las mismas palabras que el texto: busca sinónimos y paráfrasis.</li>
  <li><strong>No copies frases enteras del texto.</strong> Reformula con tus propias palabras para demostrar comprensión real.</li>
</ul>
<p>Dedica aproximadamente <strong>30 minutos a cada texto</strong>. Si un texto te resulta más difícil, empieza por el otro para asegurar puntos.</p>`,
      },
      {
        heading: "Producción escrita: la estructura que los correctores esperan",
        content: `<p>La producción escrita del B2 pide un <strong>texto argumentativo</strong>: carta formal, artículo de opinión, correo de reclamación, etc. Debe tener <strong>al menos 250 palabras</strong> (pero no más de 300-320).</p>
<p>La estructura ideal sigue el modelo francés clásico:</p>
<ul>
  <li><strong>Introduction:</strong> presenta el tema y anuncia tu plan. Ejemplo: <em>«La question de... soulève un vif débat. Nous examinerons d'abord... puis...»</em></li>
  <li><strong>Développement:</strong> dos o tres párrafos con argumentos claros. Cada párrafo = una idea + un ejemplo.</li>
  <li><strong>Conclusion:</strong> síntesis y posible apertura. <em>«En définitive... Il serait intéressant de se demander si...»</em></li>
</ul>
<p>Los <strong>conectores lógicos</strong> son imprescindibles para el B2. Memoriza estos:</p>
<ul>
  <li><strong>Oposición:</strong> <em>cependant, néanmoins, en revanche, toutefois, certes... mais</em></li>
  <li><strong>Causa:</strong> <em>en effet, car, puisque, étant donné que</em></li>
  <li><strong>Consecuencia:</strong> <em>par conséquent, c'est pourquoi, de ce fait, ainsi</em></li>
  <li><strong>Adición:</strong> <em>de plus, en outre, par ailleurs, qui plus est</em></li>
  <li><strong>Conclusión:</strong> <em>en définitive, en somme, pour conclure, tout compte fait</em></li>
</ul>
<blockquote>Consejo de examinadora: la letra <strong>no importa</strong> tanto como la estructura. Un texto bien organizado con conectores adecuados siempre puntúa más que un texto «bonito» pero desordenado.</blockquote>`,
      },
      {
        heading: "Producción oral: el monólogo argumentado",
        content: `<p>La prueba oral tiene dos partes: un <strong>monólogo argumentado</strong> (unos 10 minutos) a partir de un documento corto, y un <strong>debate</strong> con el examinador.</p>
<p>Durante los 20 minutos de preparación:</p>
<ul>
  <li>Identifica la <strong>problemática</strong> del documento (la pregunta central que plantea).</li>
  <li>Anota <strong>2-3 argumentos a favor y 2-3 en contra</strong>, con ejemplos de tu experiencia o de la actualidad.</li>
  <li>Prepara una <strong>introducción clara</strong>: presenta el documento, el tema y tu plan.</li>
</ul>
<p>Durante el monólogo:</p>
<ul>
  <li><strong>No leas tus notas.</strong> Úsalas como guía, pero mantén el contacto visual con el examinador.</li>
  <li><strong>Habla con naturalidad.</strong> No intentes usar un vocabulario que no domines: es mejor ser claro que rebuscado.</li>
  <li><strong>Gestiona el tiempo.</strong> Si tu monólogo dura menos de 5 minutos, es demasiado corto. Practica en casa con cronómetro.</li>
</ul>
<p>En el debate, el examinador te hará preguntas para que profundices o defiendas tu posición. <strong>No tengas miedo de defender tu opinión</strong>: los correctores valoran la capacidad de argumentar, no que estés de acuerdo con ellos.</p>`,
      },
      {
        heading: "Plan de estudio: 3 a 6 meses antes del examen",
        content: `<p>Un plan realista para preparar el DELF B2 con <strong>clases individuales</strong> y estudio autónomo:</p>
<ul>
  <li><strong>6 meses antes:</strong> Haz nuestro <a href="/test-de-nivel">test de nivel</a> para evaluar tu punto de partida. Si estás en un B1 sólido, 6 meses son suficientes con 2 clases semanales.</li>
  <li><strong>Meses 6-4:</strong> Refuerza gramática (subjuntivo, hipótesis, conectores) y amplía vocabulario temático (medioambiente, educación, tecnología, sociedad).</li>
  <li><strong>Meses 4-2:</strong> Empieza a hacer <strong>exámenes completos cronometrados</strong>. Corrige con tu profesora cada prueba. Identifica tus puntos débiles.</li>
  <li><strong>Últimos 2 meses:</strong> Simula el examen en condiciones reales. Practica la producción oral con tu profesora de HolaBonjour, que como examinadora DELF te dará <em>feedback</em> exactamente igual al del examen real.</li>
  <li><strong>Última semana:</strong> No estudies contenido nuevo. Repasa tus conectores, tus notas y descansa bien.</li>
</ul>
<p>Consulta también nuestra <a href="/recursos/guia-delf-dalf">Guía completa DELF/DALF</a> para más detalles sobre cada nivel.</p>`,
      },
      {
        heading: "Errores frecuentes que debes evitar",
        content: `<p>Después de años corrigiendo exámenes DELF B2, estos son los errores que vemos una y otra vez:</p>
<ul>
  <li><strong>No respetar el formato pedido.</strong> Si te piden una carta formal, necesitas encabezado, fórmula de tratamiento (<em>Madame, Monsieur</em>) y fórmula de despedida (<em>Veuillez agréer...</em>).</li>
  <li><strong>Escribir demasiado.</strong> Más de 320 palabras no suma puntos y sí multiplica los errores gramaticales.</li>
  <li><strong>Usar español disfrazado de francés.</strong> Los <em>faux amis</em> son una trampa constante: <em>actuellement</em> no significa «actualmente» (sino «en este momento»), <em>assister</em> no significa «asistir» (sino «presenciar»).</li>
  <li><strong>No practicar la oral con un nativo.</strong> La producción oral es la prueba donde más alumnos fallan por falta de práctica real. Una clase individual por Zoom de 55 minutos a la semana marca una diferencia enorme.</li>
  <li><strong>Estudiar solo con libros.</strong> El DELF evalúa comunicación real, no conocimientos teóricos. Combina manual + audios + conversación.</li>
</ul>
<p>Si quieres prepararte con examinadoras oficiales que conocen los criterios de corrección por dentro, escríbenos por <strong>WhatsApp al 685 070 304</strong>. Nuestras clases son individuales, de 55 minutos, por Zoom, y se adaptan 100 % a tu nivel y objetivos.</p>`,
      },
    ],
  },

  // ─── Article 2: Passé composé vs Imparfait ────────────────────────────
  {
    slug: "passe-compose-vs-imparfait",
    title: "Passé composé vs Imparfait: la guía definitiva",
    description:
      "Aprende a distinguir el passé composé del imparfait con ejemplos claros, trucos y ejercicios prácticos.",
    category: "gramatica",
    categoryLabel: "Gramática",
    level: "A2-B1",
    author: "Equipo HolaBonjour",
    publishedAt: "2026-03-01",
    readingMinutes: 8,
    heroEmoji: "📝",
    sections: [
      {
        heading: "La gran pregunta: ¿cuándo usar cada uno?",
        content: `<p>Si hay un tema que quita el sueño a los estudiantes de francés, es la diferencia entre el <strong>passé composé</strong> y el <strong>imparfait</strong>. En español tenemos una distinción similar (pretérito indefinido vs. pretérito imperfecto), pero los matices no siempre coinciden.</p>
<p>La regla de oro se resume con una metáfora:</p>
<blockquote><strong>El imparfait es una película;</strong> el passé composé es una fotografía.</blockquote>
<ul>
  <li>El <strong>imparfait</strong> describe <em>el decorado, el fondo, lo que estaba pasando</em>: situaciones, descripciones, hábitos, estados de ánimo.</li>
  <li>El <strong>passé composé</strong> cuenta <em>lo que ocurrió</em>: acciones puntuales, terminadas, que hacen avanzar la historia.</li>
</ul>
<p>Ejemplo: <em>Il <strong>pleuvait</strong> (imparfait: decorado) quand je <strong>suis sorti</strong> (passé composé: acción puntual).</em> — Llovía cuando salí.</p>`,
      },
      {
        heading: "Formación del passé composé",
        content: `<p>El passé composé se forma con un <strong>auxiliar conjugado en presente</strong> (<em>avoir</em> o <em>être</em>) + el <strong>participio pasado</strong> del verbo.</p>
<p><strong>Con <em>avoir</em></strong> (la mayoría de los verbos):</p>
<ul>
  <li><em>J'<strong>ai mangé</strong></em> (he comido / comí)</li>
  <li><em>Tu <strong>as fini</strong></em> (has terminado / terminaste)</li>
  <li><em>Elle <strong>a vu</strong></em> (ha visto / vio)</li>
</ul>
<p><strong>Con <em>être</em></strong> (verbos de movimiento, pronominales y los 14 verbos de la «casa de être»):</p>
<ul>
  <li><em>Je <strong>suis allé(e)</strong></em> (he ido / fui)</li>
  <li><em>Elle <strong>est partie</strong></em> (se ha ido / se fue)</li>
  <li><em>Nous <strong>nous sommes levés</strong></em> (nos hemos levantado / nos levantamos)</li>
</ul>
<p>Los 14 verbos que se conjugan con <em>être</em> son: <em>aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner, passer</em> (en sentido intransitivo). Un truco mnemotécnico clásico es la <strong>«casa de être»</strong>, donde cada habitación representa un verbo de movimiento.</p>
<p><strong>Ojo:</strong> con <em>être</em>, el participio concuerda en género y número con el sujeto: <em>Elles <strong>sont arrivées</strong></em>.</p>`,
      },
      {
        heading: "Formación del imparfait",
        content: `<p>El imparfait es mucho más regular y, por tanto, más fácil de conjugar:</p>
<ul>
  <li>Toma la raíz de la <strong>primera persona del plural del presente</strong> (<em>nous</em>): <em>nous parlons → parl-</em>, <em>nous finissons → finiss-</em></li>
  <li>Añade las terminaciones: <strong>-ais, -ais, -ait, -ions, -iez, -aient</strong></li>
</ul>
<p>Ejemplo completo con <em>parler</em>:</p>
<ul>
  <li><em>je parlais, tu parlais, il/elle parlait</em></li>
  <li><em>nous parlions, vous parliez, ils/elles parlaient</em></li>
</ul>
<p>La única excepción es <strong><em>être</em></strong>, cuya raíz es <em>ét-</em>: <em>j'étais, tu étais, il était, nous étions, vous étiez, ils étaient</em>.</p>
<p>Fíjate en que las terminaciones <em>-ais, -ais, -ait</em> y <em>-aient</em> suenan exactamente igual: <strong>[ɛ]</strong>. Esto es importante en la comprensión oral del DELF.</p>`,
      },
      {
        heading: "Palabras señal: pistas temporales",
        content: `<p>Algunas expresiones de tiempo son una pista clara del tiempo verbal que debes usar:</p>
<p><strong>Señales de passé composé</strong> (acción puntual, terminada):</p>
<ul>
  <li><em>hier</em> (ayer), <em>l'année dernière</em> (el año pasado)</li>
  <li><em>soudain, tout à coup</em> (de repente)</li>
  <li><em>d'abord... ensuite... enfin</em> (primero... luego... por último)</li>
  <li><em>une fois, deux fois</em> (una vez, dos veces)</li>
  <li><em>pendant deux heures</em> (durante dos horas — duración cerrada)</li>
</ul>
<p><strong>Señales de imparfait</strong> (descripción, hábito, estado):</p>
<ul>
  <li><em>d'habitude, habituellement</em> (habitualmente)</li>
  <li><em>tous les jours, chaque matin</em> (todos los días, cada mañana)</li>
  <li><em>souvent, toujours, parfois</em> (a menudo, siempre, a veces)</li>
  <li><em>quand j'étais petit(e)</em> (cuando era pequeño/a)</li>
  <li><em>il faisait beau, il y avait</em> (hacía buen tiempo, había — descripción)</li>
</ul>
<blockquote>Cuidado: estas palabras son <strong>pistas</strong>, no reglas absolutas. El contexto siempre manda.</blockquote>`,
      },
      {
        heading: "Ejemplos en contexto: una historia completa",
        content: `<p>Veamos cómo funcionan juntos en un relato real:</p>
<blockquote>
<em>Ce matin-là, il <strong>faisait</strong> froid et le ciel <strong>était</strong> gris.</em> (Imparfait: decorado, descripción)<br>
<em>Marie <strong>dormait</strong> encore quand le réveil <strong>a sonné</strong>.</em> (Imparfait: acción en curso; PC: acción puntual que interrumpe)<br>
<em>Elle <strong>s'est levée</strong>, <strong>a pris</strong> une douche et <strong>a préparé</strong> son café.</em> (PC: cadena de acciones puntuales)<br>
<em>Pendant qu'elle <strong>buvait</strong> son café, elle <strong>pensait</strong> à sa réunion.</em> (Imparfait: acciones simultáneas de fondo)<br>
<em>Soudain, son téléphone <strong>a sonné</strong> : c'<strong>était</strong> son patron.</em> (PC: acción repentina; Imparfait: identificación/descripción)
</blockquote>
<p>Fíjate en el patrón: el imparfait pinta la escena; el passé composé la hace avanzar con eventos concretos.</p>`,
      },
      {
        heading: "Errores típicos de hispanohablantes",
        content: `<p>El español y el francés comparten la distinción indefinido/imperfecto, pero hay trampas:</p>
<ul>
  <li><strong>«Estuve enfermo» → en francés es imparfait.</strong> En español usamos el indefinido para estados con duración cerrada (<em>estuve enfermo tres días</em>), pero en francés los estados se expresan casi siempre en imparfait: <em>J'<strong>étais</strong> malade pendant trois jours</em>.</li>
  <li><strong>«Siempre» no siempre es imparfait.</strong> <em>J'ai <strong>toujours</strong> aimé le chocolat</em> (passé composé) es correcto cuando hablas de toda tu vida hasta ahora. Pero <em>je mangeais <strong>toujours</strong> à 13 h</em> (imparfait) describe un hábito pasado.</li>
  <li><strong>Confundir «era/fue» con «était/a été».</strong> <em>C'<strong>était</strong> un bon film</em> (descripción) vs. <em>Ça <strong>a été</strong> une surprise</em> (reacción puntual).</li>
  <li><strong>Olvidar la concordancia con <em>être</em>.</strong> <em>Elle est allé<strong>e</strong></em>, no <em>elle est allé</em>.</li>
</ul>`,
      },
      {
        heading: "Ejercicios con solución",
        content: `<p>Completa con passé composé o imparfait. Las soluciones están más abajo.</p>
<p><strong>1.</strong> Quand j'_______ (être) enfant, je _______ (jouer) dans le jardin tous les jours.</p>
<p><strong>2.</strong> Hier, nous _______ (aller) au cinéma et nous _______ (voir) un film formidable.</p>
<p><strong>3.</strong> Il _______ (pleuvoir) quand Marie _______ (sortir) de chez elle.</p>
<p><strong>4.</strong> Avant, il _______ (fumer) beaucoup, mais un jour il _______ (décider) d'arrêter.</p>
<p><strong>5.</strong> Les enfants _______ (dormir) quand le téléphone _______ (sonner).</p>
<p><strong>Soluciones:</strong></p>
<ul>
  <li>1. <em>étais</em> (imparfait: época) / <em>jouais</em> (imparfait: hábito)</li>
  <li>2. <em>sommes allés</em> (PC: acción puntual) / <em>avons vu</em> (PC: acción puntual)</li>
  <li>3. <em>pleuvait</em> (imparfait: decorado) / <em>est sortie</em> (PC: acción puntual)</li>
  <li>4. <em>fumait</em> (imparfait: hábito) / <em>a décidé</em> (PC: acción puntual que cambia la situación)</li>
  <li>5. <em>dormaient</em> (imparfait: acción en curso) / <em>a sonné</em> (PC: interrupción)</li>
</ul>
<p>Si quieres practicar la gramática francesa con una profesora nativa que te corrija en tiempo real, nuestras clases individuales de 55 minutos por Zoom son la forma más eficaz. Escríbenos por <strong>WhatsApp al 685 070 304</strong>.</p>`,
      },
    ],
  },

  // ─── Article 3: Expresiones francesas con comida ──────────────────────
  {
    slug: "expresiones-francesas-comida",
    title: "25 expresiones francesas con comida",
    description:
      "Descubre 25 expresiones francesas con alimentos: significado, traducción y ejemplos de uso real.",
    category: "expresiones",
    categoryLabel: "Expresiones",
    level: "A2-C1",
    author: "Equipo HolaBonjour",
    publishedAt: "2026-03-01",
    readingMinutes: 7,
    heroEmoji: "🍽️",
    sections: [
      {
        heading: "¿Por qué los franceses hablan tanto de comida?",
        content: `<p>La gastronomía es una parte fundamental de la cultura francesa. Tanto, que el idioma está repleto de expresiones idiomáticas basadas en alimentos. Estas expresiones aparecen en conversaciones cotidianas, en películas y en los exámenes DELF, así que dominarlas te dará un nivel de naturalidad que los libros de texto rara vez ofrecen.</p>
<p>Hemos seleccionado <strong>25 expresiones reales</strong> organizadas por temas. Para cada una encontrarás: la expresión en francés, su traducción literal, su significado real y un ejemplo de uso.</p>`,
      },
      {
        heading: "Frutas y verduras",
        content: `<ul>
  <li><strong>Avoir la banane</strong> — Literal: «tener la banana». Significa: <em>tener una gran sonrisa, estar radiante</em>. Ejemplo: <em>Regarde Sophie, elle a la banane aujourd'hui !</em> (Mira a Sophie, hoy está radiante).</li>
  <li><strong>Avoir la pêche</strong> — Literal: «tener el melocotón». Significa: <em>estar lleno de energía</em>. Ejemplo: <em>Malgré le lundi, j'ai la pêche !</em> (A pesar de ser lunes, estoy lleno de energía).</li>
  <li><strong>Tomber dans les pommes</strong> — Literal: «caer en las manzanas». Significa: <em>desmayarse</em>. Ejemplo: <em>Il faisait tellement chaud qu'elle est tombée dans les pommes.</em></li>
  <li><strong>Raconter des salades</strong> — Literal: «contar ensaladas». Significa: <em>contar mentiras, irse por las ramas</em>. Ejemplo: <em>Arrête de raconter des salades, dis-moi la vérité !</em></li>
  <li><strong>Les carottes sont cuites</strong> — Literal: «las zanahorias están cocidas». Significa: <em>ya no hay nada que hacer, es demasiado tarde</em>. Ejemplo: <em>On a perdu 4-0 à la mi-temps : les carottes sont cuites.</em></li>
  <li><strong>Mi-figue, mi-raisin</strong> — Literal: «mitad higo, mitad uva». Significa: <em>ni bien ni mal, ambiguo</em>. Ejemplo: <em>Son accueil a été mi-figue, mi-raisin.</em> (Su recibimiento fue tibio).</li>
  <li><strong>Avoir un cœur d'artichaut</strong> — Literal: «tener corazón de alcachofa». Significa: <em>enamorarse fácilmente</em>. Ejemplo: <em>Paul tombe amoureux chaque semaine, il a un cœur d'artichaut.</em></li>
</ul>`,
      },
      {
        heading: "Pan, queso y lácteos",
        content: `<ul>
  <li><strong>Avoir du pain sur la planche</strong> — Literal: «tener pan sobre la tabla». Significa: <em>tener mucho trabajo por delante</em>. Ejemplo: <em>Avec ce projet, on a du pain sur la planche.</em></li>
  <li><strong>Long comme un jour sans pain</strong> — Literal: «largo como un día sin pan». Significa: <em>interminable, eterno</em>. Ejemplo: <em>Cette réunion a été longue comme un jour sans pain.</em></li>
  <li><strong>En faire tout un fromage</strong> — Literal: «hacer de ello todo un queso». Significa: <em>exagerar, hacer una montaña de un grano de arena</em>. Ejemplo: <em>Ce n'est qu'une petite erreur, n'en fais pas tout un fromage !</em></li>
  <li><strong>Mettre du beurre dans les épinards</strong> — Literal: «poner mantequilla en las espinacas». Significa: <em>mejorar la situación económica, ganar un extra</em>. Ejemplo: <em>Ce travail à mi-temps met du beurre dans les épinards.</em></li>
  <li><strong>Faire son beurre</strong> — Literal: «hacer su mantequilla». Significa: <em>ganar mucho dinero (a veces de forma dudosa)</em>. Ejemplo: <em>Il a fait son beurre avec la revente de billets.</em></li>
</ul>`,
      },
      {
        heading: "Especias, sal y condimentos",
        content: `<ul>
  <li><strong>Mettre son grain de sel</strong> — Literal: «poner su grano de sal». Significa: <em>entrometerse, dar su opinión sin que nadie se la pida</em>. Ejemplo: <em>Il faut toujours qu'il mette son grain de sel dans les conversations.</em></li>
  <li><strong>Ne pas être dans son assiette</strong> — Literal: «no estar en su plato». Significa: <em>no encontrarse bien, estar indispuesto</em>. Ejemplo: <em>Tu as l'air fatigué, tu n'es pas dans ton assiette ?</em></li>
  <li><strong>La moutarde lui monte au nez</strong> — Literal: «la mostaza le sube a la nariz». Significa: <em>empezar a enfadarse</em>. Ejemplo: <em>Quand il a vu la facture, la moutarde lui est montée au nez.</em></li>
  <li><strong>C'est pas de la tarte</strong> — Literal: «no es tarta». Significa: <em>no es nada fácil</em>. Ejemplo: <em>Cet examen de maths, c'est pas de la tarte !</em></li>
</ul>`,
      },
      {
        heading: "Dulces y postres",
        content: `<ul>
  <li><strong>La cerise sur le gâteau</strong> — Literal: «la cereza sobre el pastel». Significa: <em>la guinda del pastel, el colmo</em>. Puede ser positivo o irónico. Ejemplo: <em>Et la cerise sur le gâteau, ils nous ont fait payer le parking !</em></li>
  <li><strong>Sucrer les fraises</strong> — Literal: «azucarar las fresas». Significa: <em>temblar de vejez, chochear</em>. Ejemplo: <em>Mon grand-père commence à sucrer les fraises.</em></li>
  <li><strong>Être tarte</strong> — Literal: «ser tarta». Significa: <em>ser tonto, boba</em>. Ejemplo: <em>Qu'est-ce qu'il est tarte, celui-là !</em></li>
  <li><strong>Rouler quelqu'un dans la farine</strong> — Literal: «envolver a alguien en harina». Significa: <em>engañar a alguien</em>. Ejemplo: <em>Le vendeur m'a roulé dans la farine avec cette voiture d'occasion.</em></li>
</ul>`,
      },
      {
        heading: "Agua, vino y bebidas",
        content: `<ul>
  <li><strong>Boire du petit-lait</strong> — Literal: «beber suero de leche». Significa: <em>disfrutar con un halago o una buena noticia</em>. Ejemplo: <em>Quand le professeur l'a félicité, il buvait du petit-lait.</em></li>
  <li><strong>Se noyer dans un verre d'eau</strong> — Literal: «ahogarse en un vaso de agua». Significa: <em>agobiarse por cosas insignificantes</em>. Ejemplo: <em>Calme-toi, tu te noies dans un verre d'eau.</em></li>
  <li><strong>C'est la fin des haricots</strong> — Literal: «es el fin de las judías». Significa: <em>es el colmo, ya no queda nada</em>. Ejemplo: <em>S'ils ferment cette école, c'est la fin des haricots !</em></li>
  <li><strong>Couper la poire en deux</strong> — Literal: «cortar la pera por la mitad». Significa: <em>llegar a un acuerdo, dividir las cosas a partes iguales</em>. Ejemplo: <em>Pour le prix, on a coupé la poire en deux.</em></li>
  <li><strong>Ramener sa fraise</strong> — Literal: «traer su fresa». Significa: <em>aparecer sin ser invitado, meterse donde no le llaman</em>. Ejemplo: <em>Personne ne t'a invité, arrête de ramener ta fraise !</em></li>
</ul>`,
      },
      {
        heading: "¿Cómo memorizar estas expresiones?",
        content: `<p>Aprender expresiones idiomáticas de memoria no funciona. Aquí van tres estrategias que usamos en nuestras clases:</p>
<ul>
  <li><strong>Contexto, contexto, contexto.</strong> Cada vez que aprendas una expresión, escribe una frase personal con ella. Si la vinculas a tu vida, la recordarás.</li>
  <li><strong>Agrupa por imagen mental.</strong> Las expresiones de esta lista son perfectas para agrupar: imagina una cocina donde «la mostaza sube a la nariz» de alguien que «no está en su plato» y que «se ahoga en un vaso de agua». Cuanto más absurda sea la imagen, mejor la recordarás.</li>
  <li><strong>Úsalas en conversación.</strong> En nuestras clases individuales por Zoom, nuestras profesoras nativas integran estas expresiones en contextos de conversación real. Es la forma más natural de fijarlas.</li>
</ul>
<p>¿Quieres descubrir más expresiones y practicarlas con una profesora nativa? Escríbenos por <strong>WhatsApp al 685 070 304</strong> y te contamos cómo funcionan nuestras clases.</p>`,
      },
    ],
  },

  // ─── Article 4: 10 costumbres francesas ────────────────────────────────
  {
    slug: "costumbres-francesas",
    title: "10 costumbres francesas que te sorprenderán",
    description:
      "Descubre 10 costumbres francesas que sorprenden a los españoles: la bise, los horarios, el vouvoiement y más.",
    category: "cultura",
    categoryLabel: "Cultura",
    level: "Todos",
    author: "Equipo HolaBonjour",
    publishedAt: "2026-03-01",
    readingMinutes: 9,
    heroEmoji: "🇫🇷",
    sections: [
      {
        heading: "La cultura francesa más allá de los tópicos",
        content: `<p>Francia y España son países vecinos, pero sus costumbres pueden ser sorprendentemente diferentes. Cuando empiezas a aprender francés y a interactuar con franceses, te encuentras con hábitos que no esperabas.</p>
<p>En este artículo repasamos <strong>10 costumbres francesas</strong> que suelen sorprender a los españoles. Entenderlas te ayudará no solo a evitar malentendidos culturales, sino también a comprender mejor el idioma: la lengua y la cultura son inseparables.</p>`,
      },
      {
        heading: "1. La bise: el arte del beso de saludo",
        content: `<p>En España nos damos dos besos al saludar (siempre empezando por la derecha). En Francia también existe <em>la bise</em>, pero las reglas cambian según la región: pueden ser <strong>uno, dos, tres o incluso cuatro besos</strong>, y se empieza por la izquierda en algunas zonas.</p>
<p>En París lo habitual son <strong>dos besos</strong>. En el sur de Francia, tres. En algunas zonas del norte, cuatro. Para un español recién llegado a Francia, la duda de «¿cuántos besos?» puede provocar momentos bastante incómodos.</p>
<p>Tras la pandemia, muchos franceses han reducido la bise en el entorno laboral y optan por un saludo verbal o un gesto de mano. Pero entre amigos y familia, <em>la bise</em> sigue viva.</p>`,
      },
      {
        heading: "2. Les repas: la sacralidad de las comidas",
        content: `<p>En Francia, las comidas son casi un <strong>ritual sagrado</strong>. El almuerzo (<em>le déjeuner</em>) se toma generalmente entre las <strong>12:00 y las 13:30</strong>, y la cena (<em>le dîner</em>) entre las <strong>19:00 y las 20:30</strong>. Mucho antes que en España.</p>
<p>Pero lo más llamativo no es el horario, sino la estructura: incluso una comida sencilla puede tener <em>entrée</em> (entrante), <em>plat principal</em> (plato principal), <em>fromage</em> (queso) y <em>dessert</em>. Picar entre horas (<em>grignoter</em>) está mal visto.</p>
<p>En las empresas francesas, la pausa del almuerzo suele ser de <strong>una hora como mínimo</strong>, y muchos empleados comen juntos en el comedor o en un restaurante cercano. La comida es un momento social, no un trámite.</p>`,
      },
      {
        heading: "3. Le vouvoiement: usted todavía existe",
        content: `<p>En España, el «usted» se ha ido perdiendo: tuteamos al médico, al jefe e incluso a desconocidos en muchas situaciones. En Francia, el <em>vouvoiement</em> (uso de <em>vous</em>) sigue siendo <strong>muy importante</strong>.</p>
<p>Se usa <em>vous</em> con desconocidos, con personas mayores, en el ámbito laboral (al menos al principio) y en cualquier situación formal. Tutear (<em>tutoyer</em>) a alguien sin que te haya dado permiso se considera <strong>una falta de respeto</strong>.</p>
<p>A veces se produce el momento mágico en que alguien dice: <em>«On peut se tutoyer ?»</em> (¿Podemos tutearnos?). Hasta que eso ocurra, mantén el <em>vous</em>. En la duda, <em>vouvoyez</em>.</p>`,
      },
      {
        heading: "4. La grève: la huelga como derecho fundamental",
        content: `<p>Francia es famosa por sus huelgas (<em>les grèves</em>). Trenes parados, manifestaciones en las calles, bloqueos de refinerías... Para un español puede parecer excesivo, pero para los franceses <strong>la huelga es un derecho constitucional</strong> que forma parte de su identidad social.</p>
<p>El origen está en la Revolución Francesa y en una larga tradición de lucha obrera. Los sindicatos franceses son muy activos y la población en general respeta el derecho a la huelga, aunque les complique la vida.</p>
<p>Consejo práctico: si viajas a Francia, consulta siempre el estado del transporte público antes de salir. Una <em>grève SNCF</em> (huelga de trenes) puede dejarte tirado en la estación.</p>`,
      },
      {
        heading: "5. Les vacances: cinco semanas y bien aprovechadas",
        content: `<p>Los franceses disfrutan de <strong>cinco semanas de vacaciones pagadas</strong> al año por ley (25 días laborables), frente a las cuatro semanas que marca el mínimo legal en España (22 días). Además, muchos convenios colectivos amplían esta cifra con los llamados <em>RTT</em> (reducción de jornada), que pueden sumar hasta 10 días más.</p>
<p>El mes de agosto es sagrado: muchos negocios cierran directamente durante <strong>todo el mes</strong>. París se vacía y las ciudades del sur se llenan. No intentes hacer gestiones administrativas en agosto en Francia.</p>
<p>La frase <em>«Bonnes vacances !»</em> se escucha constantemente en julio. Y si alguien te dice <em>«Tu pars où en vacances ?»</em> (¿Adónde te vas de vacaciones?), es una pregunta social tan habitual como «¿Qué tal?».</p>`,
      },
      {
        heading: "6. La baguette y 7. L'apéro",
        content: `<p><strong>La baguette:</strong> No es un tópico, es realidad pura. Los franceses compran baguette <strong>a diario</strong> (a veces dos veces al día: para el almuerzo y para la cena). Una baguette que no sea del día es inaceptable. En cada barrio hay al menos una <em>boulangerie</em>, y los franceses suelen tener «su» panadería favorita.</p>
<p>En 2022, la baguette fue declarada <strong>Patrimonio Cultural Inmaterial de la Humanidad</strong> por la UNESCO. No es poca cosa.</p>
<p><strong>L'apéro:</strong> El aperitivo (<em>l'apéritif</em>, abreviado <em>l'apéro</em>) es una institución social en Francia. Es ese momento antes de la comida o la cena donde te reúnes con amigos o familia para tomar algo: una copa de vino, una cerveza, y siempre acompañado de algo para picar (<em>des chips, des olives, du saucisson, du fromage</em>).</p>
<p>El apéro puede durar desde 20 minutos hasta varias horas. Es un momento de convivencia que los franceses cuidan mucho. La frase <em>«On se fait un apéro ?»</em> es la invitación social más frecuente en Francia.</p>`,
      },
      {
        heading: "8. Le dimanche, 9. Les ponts y 10. La rentrée",
        content: `<p><strong>Le dimanche</strong> (el domingo): En Francia, la mayoría de las tiendas están <strong>cerradas los domingos</strong>. Los supermercados abren solo por la mañana (si abren). Es una tradición muy arraigada, y aunque ha habido debates sobre la liberalización, los franceses valoran su domingo como un día de descanso real.</p>
<p><strong>Les ponts</strong> (los puentes): Cuando un festivo cae en jueves o martes, los franceses <em>«font le pont»</em>: se toman el viernes o el lunes libre para hacer un puente de cuatro días. Es una práctica tan habitual que las empresas la planifican con antelación. Mayo es el mes estrella de los puentes, con el 1 de mayo, el 8 de mayo y la Ascensión.</p>
<p><strong>La rentrée</strong>: Este concepto no tiene traducción directa al español. <em>La rentrée</em> es el regreso tras las vacaciones de verano, normalmente <strong>la primera semana de septiembre</strong>. No se limita al colegio: hay <em>rentrée littéraire</em> (temporada de publicación de novelas), <em>rentrée politique</em> (vuelta de la actividad política) y <em>rentrée</em> en general. Es el auténtico «año nuevo» francés, cuando todo vuelve a empezar.</p>
<p>Comprender estas costumbres te ayuda a entender la mentalidad francesa y, por extensión, su idioma. La lengua está viva y refleja la cultura. Si quieres descubrir más sobre la cultura francesa mientras aprendes el idioma con profesoras nativas, escríbenos por <strong>WhatsApp al 685 070 304</strong>.</p>`,
      },
    ],
  },

  // ─── Article 5: Faux amis español-francés ─────────────────────────────
  {
    slug: "faux-amis-espanol-frances",
    title: "Faux amis español-francés: 30 palabras trampa",
    description:
      "Los 30 falsos amigos más peligrosos entre español y francés. No confundas embarazada con embarrassée.",
    category: "gramatica",
    categoryLabel: "Gramática",
    level: "A1-B2",
    author: "Equipo HolaBonjour",
    publishedAt: "2026-03-01",
    readingMinutes: 8,
    heroEmoji: "⚠️",
    sections: [
      {
        heading: "¿Qué son los faux amis?",
        content: `<p>Los <strong><em>faux amis</em></strong> (falsos amigos) son palabras que se parecen en dos idiomas pero tienen significados diferentes. Entre el español y el francés, que comparten raíces latinas, los falsos amigos son especialmente <strong>peligrosos</strong> porque las palabras se parecen tanto que te fías de ellas... y caes en la trampa.</p>
<p>En este artículo hemos reunido los <strong>30 falsos amigos más comunes</strong> entre español y francés. Para cada uno indicamos: la palabra en español, la palabra francesa «trampa» (la que parece significar lo mismo pero no), su significado real en francés, y la palabra francesa correcta que deberías usar.</p>
<p>Algunos de estos errores pueden provocar situaciones realmente embarazosas (y ya verás que «embarazoso» es precisamente uno de ellos).</p>`,
      },
      {
        heading: "Falsos amigos del cuerpo y la salud",
        content: `<ul>
  <li><strong>Embarazada</strong> → Parece: <em>embarrassée</em>. Pero <em>embarrassée</em> significa <strong>avergonzada, incómoda</strong>. La palabra correcta para «embarazada» es <strong><em>enceinte</em></strong>. Imagina decirle a alguien: <em>«Je suis embarrassée»</em> pensando que dices «estoy embarazada». Momento incómodo garantizado.</li>
  <li><strong>Constipado</strong> → Parece: <em>constipé(e)</em>. Pero <em>constipé</em> significa <strong>estreñido</strong>. Para decir «estoy constipado» (resfriado), di: <strong><em>enrhumé(e)</em></strong>. Otra confusión potencialmente incómoda en la consulta del médico.</li>
  <li><strong>Blesser</strong> → En español parece «besar». Pero <em>blesser</em> significa <strong>herir, hacer daño</strong>. Para «besar», di: <strong><em>embrasser</em></strong>. Y cuidado: <em>embrasser</em> antiguamente significaba «abrazar», así que también puede significar eso según el contexto.</li>
  <li><strong>Cara</strong> → Parece: <em>cara</em>. Pero en francés no existe esta palabra para «rostro». La palabra francesa es <strong><em>visage</em></strong>. Y <em>cher/chère</em> es como se dice «caro/a» (de precio).</li>
</ul>`,
      },
      {
        heading: "Falsos amigos de la vida cotidiana",
        content: `<ul>
  <li><strong>Éxito</strong> → Parece: <em>exit</em> / <em>la sortie</em>. Pero cuidado, no confundas: <em>la sortie</em> significa <strong>la salida</strong>. «Éxito» en francés es <strong><em>le succès</em></strong>.</li>
  <li><strong>Largo</strong> → Parece: <em>large</em>. Pero <em>large</em> significa <strong>ancho</strong>. «Largo» en francés es <strong><em>long</em></strong>. Error muy frecuente: <em>«La rue est large»</em> no significa que la calle sea larga, sino ancha.</li>
  <li><strong>Carpeta</strong> → Parece: <em>la carpette</em>. Pero <em>la carpette</em> es <strong>una alfombrilla pequeña</strong>. «Carpeta» en francés es <strong><em>le dossier</em></strong> o <strong><em>la chemise</em></strong> (la funda de cartón).</li>
  <li><strong>Collar</strong> → Parece: <em>le collier</em>. Aquí hay matiz: <em>le collier</em> sí significa <strong>collar (joya)</strong>, pero también <strong>collar de perro</strong>. En este caso no es un falso amigo completo, pero puede causar confusión de registro.</li>
  <li><strong>Sopa</strong> → Parece: <em>la soupe</em>. En realidad, <em>la soupe</em> sí existe y significa <strong>sopa</strong>, pero en francés formal el término es <strong><em>le potage</em></strong>. <em>Soupe</em> se considera más coloquial y puede referirse específicamente a una sopa espesa de verduras.</li>
</ul>`,
      },
      {
        heading: "Falsos amigos de acciones y verbos",
        content: `<ul>
  <li><strong>Recordar</strong> → Parece: <em>recorder</em>. Pero <em>recorder</em> significa <strong>volver a grabar</strong>. «Recordar» en francés es <strong><em>se souvenir de</em></strong> o <strong><em>se rappeler</em></strong>.</li>
  <li><strong>Atender</strong> → Parece: <em>attendre</em>. Pero <em>attendre</em> significa <strong>esperar</strong>. «Atender» (a un cliente, en una tienda) en francés es <strong><em>servir</em></strong> o <strong><em>s'occuper de</em></strong>.</li>
  <li><strong>Quitar</strong> → Parece: <em>quitter</em>. Pero <em>quitter</em> significa <strong>abandonar, dejar, irse de un lugar</strong>. «Quitar» (algo de un sitio) en francés es <strong><em>enlever</em></strong>.</li>
  <li><strong>Contestar</strong> → Parece: <em>contester</em>. Pero <em>contester</em> significa <strong>protestar, impugnar, discutir</strong>. «Contestar» (responder) en francés es <strong><em>répondre</em></strong>.</li>
  <li><strong>Asistir</strong> → Parece: <em>assister</em>. Pero <em>assister à</em> significa <strong>presenciar, estar presente en</strong>. «Asistir» (ayudar) se dice <strong><em>aider</em></strong>. <em>J'ai assisté au concert</em> = estuve en el concierto (no lo ayudé).</li>
  <li><strong>Intentar</strong> → Parece: <em>intenter</em>. Pero <em>intenter</em> es un término jurídico que significa <strong>interponer (una demanda)</strong>. «Intentar» en francés es <strong><em>essayer</em></strong> o <strong><em>tenter</em></strong>.</li>
</ul>`,
      },
      {
        heading: "Falsos amigos de adjetivos y descripciones",
        content: `<ul>
  <li><strong>Gracioso</strong> → Parece: <em>gracieux/gracieuse</em>. Pero <em>gracieux</em> significa <strong>elegante, grácil</strong>. «Gracioso» (divertido) en francés es <strong><em>drôle</em></strong> o <strong><em>amusant(e)</em></strong>.</li>
  <li><strong>Sensible</strong> → Parece: <em>sensible</em>. Pero <em>sensible</em> en francés significa <strong>sensible</strong> (que siente mucho). Hasta aquí coinciden. Pero <em>sensé(e)</em> significa <strong>sensato</strong>. La confusión está en que en español «sensible» y «sensato» son cosas distintas, y en francés también, pero con palabras cruzadas.</li>
  <li><strong>Actualmente</strong> → Parece: <em>actuellement</em>. Y <em>actuellement</em> sí significa <strong>actualmente, en este momento</strong>. Sin embargo, muchos estudiantes confunden <em>actuellement</em> con <em>en fait</em> (de hecho). No son lo mismo.</li>
  <li><strong>Bizarro</strong> → Parece: <em>bizarre</em>. En este caso, <em>bizarre</em> significa <strong>extraño, raro</strong>, que es un sentido parecido al español coloquial. Pero en español clásico, «bizarro» significa <strong>valiente, gallardo</strong>. Según el registro, puede ser un falso amigo.</li>
  <li><strong>Precioso</strong> → Parece: <em>précieux/précieuse</em>. Pero <em>précieux</em> significa <strong>valioso, preciado</strong> (de valor), no necesariamente «bonito». Para decir «precioso» (bonito), usa <strong><em>magnifique</em></strong>, <strong><em>superbe</em></strong> o <strong><em>très joli(e)</em></strong>.</li>
</ul>`,
      },
      {
        heading: "Más falsos amigos peligrosos",
        content: `<ul>
  <li><strong>Subir</strong> → Parece: <em>subir</em>. Pero <em>subir</em> en francés significa <strong>sufrir, padecer</strong>. «Subir» (ir hacia arriba) en francés es <strong><em>monter</em></strong>.</li>
  <li><strong>Taller</strong> → Parece: <em>taller</em>. No existe como tal en francés. En cambio, <em>un atelier</em> es un <strong>taller</strong>. Y <em>la taille</em> significa <strong>la talla, la cintura o el tamaño</strong>.</li>
  <li><strong>Conductor</strong> → Parece: <em>le conducteur</em>. En este caso sí coinciden: <em>le conducteur</em> significa <strong>conductor</strong>. Pero <em>le chauffeur</em> también existe y significa <strong>chófer o conductor profesional</strong>. No es un falso amigo puro, pero es una distinción útil.</li>
  <li><strong>Habitación</strong> → Parece: <em>l'habitation</em>. Pero <em>l'habitation</em> significa <strong>vivienda, residencia</strong> (el edificio entero). «Habitación» (cuarto) en francés es <strong><em>la chambre</em></strong> (dormitorio) o <strong><em>la pièce</em></strong> (habitación genérica).</li>
  <li><strong>Idioma</strong> → Parece: <em>un idiome</em>. Pero <em>un idiome</em> es un término lingüístico técnico que significa <strong>idioma o dialecto</strong> en sentido académico. En el uso cotidiano, «idioma» en francés es <strong><em>une langue</em></strong>.</li>
  <li><strong>Ropa</strong> → Parece: <em>la robe</em>. Pero <em>la robe</em> significa <strong>vestido</strong> (una prenda específica). «Ropa» en general en francés es <strong><em>les vêtements</em></strong>.</li>
</ul>`,
      },
      {
        heading: "Cómo evitar los falsos amigos",
        content: `<p>Los falsos amigos son una de las trampas más persistentes del aprendizaje del francés. Aquí van algunos consejos para evitarlos:</p>
<ul>
  <li><strong>No traduzcas palabra por palabra.</strong> El hecho de que una palabra se parezca al español no significa que signifique lo mismo. Ante la duda, busca en un diccionario fiable como <em>WordReference</em> o <em>Le Robert</em>.</li>
  <li><strong>Haz una lista personalizada.</strong> Anota cada falso amigo que encuentres en tus lecturas o clases. Revísala periódicamente.</li>
  <li><strong>Aprende las palabras en contexto.</strong> En vez de memorizar «<em>attendre</em> = esperar», memoriza una frase completa: <em>«J'attends le bus depuis 20 minutes»</em>.</li>
  <li><strong>Practica con un nativo.</strong> Un profesor nativo te corregirá en el acto cuando uses un falso amigo. En nuestras clases individuales de 55 minutos por Zoom, nuestras profesoras francesas nativas (y examinadoras DELF/DALF) están atentas a estos errores.</li>
</ul>
<p>¿Quieres trabajar los falsos amigos y otros errores típicos de hispanohablantes con una profesora nativa? Haz nuestro <a href="/test-de-nivel">test de nivel</a> y escríbenos por <strong>WhatsApp al 685 070 304</strong> para empezar.</p>`,
      },
    ],
  },

  // ─── Article 6: Cuánto cuesta preparar DELF/DALF ──────────────────────
  {
    slug: "cuanto-cuesta-preparar-delf-dalf",
    title: "¿Cuánto cuesta preparar el DELF o el DALF en 2026?",
    description:
      "Guía completa de costes: academias, plataformas online, clases particulares y simulacros gratuitos.",
    category: "delf-dalf",
    categoryLabel: "DELF/DALF",
    level: "Todos",
    author: "Isabelle Guitton",
    publishedAt: "2026-03-07",
    readingMinutes: 8,
    heroEmoji: "💶",
    sections: [
      {
        heading: "Simulacros gratuitos: el punto de partida",
        content: `<p>Antes de gastar un solo euro, lo primero que deberías hacer es evaluar tu nivel real. Muchos candidatos se matriculan en un nivel incorrecto — demasiado alto o demasiado bajo — y pierden tiempo y dinero.</p>
<p>En HolaBonjour ofrecemos <a href="/examenes">simulacros gratuitos de examen DELF/DALF</a> que reproducen las condiciones reales del examen: tiempos, audios oficiales, tipos de preguntas y corrección automática para las destrezas de comprensión. Es la forma más eficaz de saber dónde estás antes de invertir en preparación.</p>
<p>Hacer un simulacro completo te permite identificar tu destreza más débil (normalmente la Production écrite o la Production orale) y concentrar tu inversión justo ahí, en lugar de pagar por un curso genérico que repasa todo por igual.</p>`,
      },
      {
        heading: "Clases particulares: de 25€ a 60€/hora",
        content: `<p>El rango de precios de las clases particulares de francés varía mucho según el perfil del profesor:</p>
<ul>
  <li><strong>Profesor generalista (25-35€/h):</strong> Profesores de francés con experiencia general. Válido para mejorar tu nivel, pero no están especializados en la estructura específica del DELF o DALF.</li>
  <li><strong>Préparateur especializado (35-60€/h):</strong> Profesores que conocen a fondo las rúbricas de evaluación de France Éducation International. Saben exactamente qué buscan los examinadores y cómo ganar puntos en cada destreza.</li>
</ul>
<p>La diferencia entre un profesor genérico y un <em>préparateur</em> especializado es comparable a la diferencia entre un médico de cabecera y un especialista: ambos son buenos, pero cuando necesitas aprobar un examen concreto, el especialista te ahorra meses de preparación.</p>
<p>En HolaBonjour, Isabelle Guitton ha preparado alumnos desde B1 hasta C2 con un <strong>100% de aprobados</strong>. Sus clases son de 55 minutos por Zoom a 35€/clase en pack de 4.</p>`,
      },
      {
        heading: "Academias presenciales: 300€ a 800€ por curso",
        content: `<p>Las academias presenciales suelen ofrecer cursos intensivos de 2-3 meses con clases grupales de 6-12 alumnos. Los precios oscilan entre 300€ y 800€ por curso, dependiendo de la ciudad y la duración.</p>
<p><strong>Ventaja:</strong> disciplina de horario fijo y contacto presencial con compañeros. <strong>Limitación:</strong> el ritmo es el del grupo, no el tuyo. Si tu comprensión oral es fuerte pero tu producción escrita es débil, igualmente dedicarás el mismo tiempo a ambas.</p>
<p>Además, muchas academias usan profesores que no son examinadores oficiales, lo que significa que no conocen de primera mano los criterios reales de corrección. Pregunta siempre si el profesor tiene habilitación de France Éducation International.</p>`,
      },
      {
        heading: "Plataformas online: desde gratis hasta 200€",
        content: `<p>Las plataformas online de preparación DELF/DALF han crecido mucho en los últimos años. El rango va desde contenido gratuito (vídeos de YouTube, blogs con consejos) hasta plataformas de pago con ejercicios interactivos y tutorías (100-200€ por acceso trimestral).</p>
<p>Lo importante es no confundir «contenido de francés general» con «preparación específica al examen». Un vídeo que explica el subjuntivo no te prepara para escribir una <em>lettre formelle</em> bajo presión de tiempo con los criterios FEI.</p>
<p>Lo ideal es combinar una plataforma con ejercicios específicos y clases con un préparateur que pueda corregir tus producciones escritas y orales con las rúbricas reales.</p>`,
      },
      {
        heading: "¿Cuánto necesito para aprobar el DELF B2?",
        content: `<p>La respuesta honesta: <strong>depende de tu nivel actual</strong>. Un alumno que parte de un B1 sólido puede estar listo en 8-12 semanas con 2 clases semanales. Uno que parte de un A2 necesitará al menos 4-6 meses.</p>
<p>Por eso, la inversión más rentable que puedes hacer es una <strong>sesión de diagnóstico</strong> con un préparateur especializado. En 55 minutos, Isabelle evalúa tu nivel real en las 4 destrezas y te dice exactamente cuántas sesiones necesitas y dónde concentrar tu esfuerzo.</p>
<p>La sesión de diagnóstico en HolaBonjour cuesta <strong>25€</strong> — y si luego contratas un pack de clases, se descuenta del primer pack.</p>
<p style="text-align:center;margin-top:1.5rem;"><a href="/contratar?producto=diagnostico" style="background:#E50046;color:#fff;padding:0.7rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600;">Reservar sesión diagnóstico — 25€</a></p>`,
      },
    ],
  },

  // ─── Article 7: DELF B2 para funcionarios ──────────────────────────────
  {
    slug: "delf-b2-funcionarios-oposiciones",
    title: "DELF B2 para funcionarios: puntos en oposiciones con el francés",
    description:
      "Cómo conseguir el DELF B2 para sumar puntos en oposiciones. Requisitos, plazos y plan de preparación.",
    category: "delf-dalf",
    categoryLabel: "DELF/DALF",
    level: "B1-B2",
    author: "Isabelle Guitton",
    publishedAt: "2026-03-07",
    readingMinutes: 9,
    heroEmoji: "🏛️",
    sections: [
      {
        heading: "¿Qué es el DELF B2 y por qué lo piden las oposiciones?",
        content: `<p>El <strong>DELF B2</strong> es un diploma oficial de francés expedido por el Ministerio de Educación de Francia a través de France Éducation International. A diferencia de otros certificados, <strong>no caduca nunca</strong>, lo que lo convierte en una inversión a largo plazo para cualquier opositor.</p>
<p>Las convocatorias de oposiciones en España valoran los idiomas como mérito puntuable. Un DELF B2 suele aportar entre <strong>1 y 2 puntos</strong> en el baremo de méritos, lo que puede marcar la diferencia entre conseguir la plaza o quedarse en lista de espera. Esto aplica a cuerpos como maestros, profesores de secundaria, administrativos del Estado, diplomáticos y muchos más.</p>
<p>El nivel B2 certifica que eres un <strong>usuario independiente</strong>: puedes argumentar, expresar matices y defender un punto de vista con soltura. Es el nivel más demandado en convocatorias públicas, porque demuestra competencia real — no solo conocimiento básico.</p>`,
      },
      {
        heading: "¿Cuándo se celebran los exámenes DELF en España?",
        content: `<p>Los exámenes DELF/DALF se celebran en varias convocatorias al año en centros acreditados por la Embajada de Francia en España (Instituto Francés y Alianza Francesa, principalmente). Las fechas habituales son:</p>
<ul>
  <li><strong>Febrero-marzo:</strong> convocatoria de invierno</li>
  <li><strong>Mayo-junio:</strong> convocatoria de primavera (la más popular)</li>
  <li><strong>Octubre-noviembre:</strong> convocatoria de otoño</li>
</ul>
<p>La inscripción suele cerrar <strong>6-8 semanas antes</strong> del examen. Es fundamental planificar con antelación, sobre todo si tu oposición tiene fecha fija y necesitas tener el diploma antes.</p>
<p>Consulta nuestro <a href="/calendario-examenes">calendario de exámenes DELF/DALF actualizado</a> con fechas, centros de examen y plazos de inscripción en España.</p>`,
      },
      {
        heading: "¿Cuánto tiempo necesito para prepararme?",
        content: `<p>Depende de tu nivel actual. Aquí tienes una estimación realista basada en nuestra experiencia con cientos de candidatos:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="border-bottom:2px solid #e5e7eb;">
      <th style="text-align:left;padding:0.5rem;">Nivel actual</th>
      <th style="text-align:left;padding:0.5rem;">Tiempo estimado</th>
      <th style="text-align:left;padding:0.5rem;">Clases recomendadas</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;">A2</td>
      <td style="padding:0.5rem;">6-9 meses</td>
      <td style="padding:0.5rem;">2-3 clases/semana</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;">B1</td>
      <td style="padding:0.5rem;">3-5 meses</td>
      <td style="padding:0.5rem;">2 clases/semana</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;">B2 parcial</td>
      <td style="padding:0.5rem;">1-2 meses</td>
      <td style="padding:0.5rem;">1-2 clases/semana</td>
    </tr>
  </tbody>
</table>
<p>Estas estimaciones asumen que también trabajas por tu cuenta entre clases: lectura, escucha de podcasts, ejercicios de escritura, etc.</p>`,
      },
      {
        heading: "El punto crítico: la Production écrite",
        content: `<p>Según estadísticas de France Éducation International, <strong>la producción escrita es la destreza donde más candidatos pierden puntos</strong>. En el B2, se pide redactar un texto argumentativo de al menos 250 palabras (carta formal, artículo de opinión, correo de reclamación) con una estructura clara y conectores lógicos.</p>
<p>Los errores más frecuentes:</p>
<ul>
  <li>No respetar el formato solicitado (escribir una carta cuando se pide un artículo)</li>
  <li>Argumentación débil o sin ejemplos concretos</li>
  <li>Falta de conectores: <em>en revanche, par ailleurs, en définitive</em></li>
  <li>Errores gramaticales recurrentes: concordancia, subjuntivo, relativos</li>
</ul>
<p>La buena noticia: la producción escrita es la destreza que más mejora con práctica y corrección. Nuestra <a href="/correccion-ia">corrección con inteligencia artificial</a> evalúa tus textos con las rúbricas oficiales FEI y te da feedback inmediato sobre cada criterio.</p>`,
      },
      {
        heading: "Plan de preparación en 8 semanas",
        content: `<p>Si ya tienes un nivel B1 sólido, aquí tienes un plan realista de 8 semanas para el B2:</p>
<ul>
  <li><strong>Semanas 1-2:</strong> Diagnóstico + foco en comprensión oral. Escucha diaria de France Inter (15 min). 1 simulacro CO.</li>
  <li><strong>Semanas 3-4:</strong> Comprensión escrita. Lectura de artículos Le Monde/Courrier International. Técnica de análisis de textos argumentativos.</li>
  <li><strong>Semanas 5-6:</strong> Producción escrita intensiva. 2 textos/semana con corrección. Memorización de conectores y estructuras.</li>
  <li><strong>Semanas 7-8:</strong> Producción oral + simulacros completos. Práctica de monólogo argumentado + debate con tu préparatrice.</li>
</ul>
<p>Empieza con un simulacro completo para saber dónde estás:</p>
<p style="text-align:center;margin-top:1.5rem;"><a href="/examenes/b2/1" style="background:#E50046;color:#fff;padding:0.7rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600;">Hacer simulacro DELF B2 gratuito</a></p>`,
      },
    ],
  },

  // ─── Article 8: Diferencia DELF DALF ──────────────────────────────────
  {
    slug: "diferencia-delf-dalf",
    title: "DELF o DALF: ¿cuál necesitas y en qué se diferencian?",
    description:
      "Diferencias entre DELF y DALF: niveles, estructura, quién los necesita y cómo elegir el certificado correcto.",
    category: "delf-dalf",
    categoryLabel: "DELF/DALF",
    level: "Todos",
    author: "Isabelle Guitton",
    publishedAt: "2026-03-07",
    readingMinutes: 7,
    heroEmoji: "📜",
    sections: [
      {
        heading: "¿Qué es el DELF? (niveles A1-B2)",
        content: `<p>El <strong>DELF</strong> (<em>Diplôme d'Études en Langue Française</em>) es un diploma oficial de francés expedido por el Ministerio de Educación Nacional de Francia. Cubre los cuatro primeros niveles del Marco Común Europeo de Referencia (MCER):</p>
<ul>
  <li><strong>DELF A1:</strong> Usuario elemental. Puede presentarse, hacer preguntas sencillas y entender instrucciones básicas.</li>
  <li><strong>DELF A2:</strong> Usuario elemental avanzado. Puede describir su entorno, hacer compras y entender conversaciones cotidianas.</li>
  <li><strong>DELF B1:</strong> Usuario independiente. Puede expresar opiniones, contar experiencias y desenvolverse en viajes.</li>
  <li><strong>DELF B2:</strong> Usuario independiente avanzado. Puede argumentar, debatir y redactar textos complejos. Es el nivel más demandado para universidades y oposiciones.</li>
</ul>
<p>Cada diploma es independiente: puedes presentarte directamente al nivel que quieras, sin haber obtenido los anteriores. Y una vez aprobado, <strong>no caduca nunca</strong>.</p>`,
      },
      {
        heading: "¿Qué es el DALF? (niveles C1-C2)",
        content: `<p>El <strong>DALF</strong> (<em>Diplôme Approfondi de Langue Française</em>) certifica los niveles avanzados C1 y C2:</p>
<ul>
  <li><strong>DALF C1:</strong> Usuario competente. Puede expresarse con fluidez y espontaneidad, utilizar la lengua con fines académicos y profesionales, y producir textos claros y bien estructurados sobre temas complejos.</li>
  <li><strong>DALF C2:</strong> Dominio. Se acerca al nivel de un hablante nativo educado. Puede resumir y sintetizar información de múltiples fuentes y argumentar con matices sutiles.</li>
</ul>
<p>El DALF C1 es el nivel que exigen la mayoría de programas de máster y doctorado en universidades francesas. El DALF C2, más raro, es necesario para ciertos puestos académicos, de traducción o de diplomacia.</p>
<p>Al igual que el DELF, el DALF <strong>no caduca nunca</strong> y cada nivel puede obtenerse de forma independiente.</p>`,
      },
      {
        heading: "Tabla comparativa DELF vs DALF",
        content: `<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
  <thead>
    <tr style="border-bottom:2px solid #e5e7eb;">
      <th style="text-align:left;padding:0.5rem;"></th>
      <th style="text-align:left;padding:0.5rem;">DELF</th>
      <th style="text-align:left;padding:0.5rem;">DALF</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Niveles</td>
      <td style="padding:0.5rem;">A1, A2, B1, B2</td>
      <td style="padding:0.5rem;">C1, C2</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Caducidad</td>
      <td style="padding:0.5rem;">No caduca</td>
      <td style="padding:0.5rem;">No caduca</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Pruebas</td>
      <td style="padding:0.5rem;">CO + CE + PE + PO (4 pruebas separadas)</td>
      <td style="padding:0.5rem;">C1: 4 pruebas. C2: 2 pruebas combinadas</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Puntuación</td>
      <td style="padding:0.5rem;">100 puntos (mín. 50 para aprobar)</td>
      <td style="padding:0.5rem;">100 puntos (mín. 50 para aprobar)</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Duración total</td>
      <td style="padding:0.5rem;">A1: 1h20 → B2: 2h30</td>
      <td style="padding:0.5rem;">C1: 4h → C2: 3h30</td>
    </tr>
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:0.5rem;font-weight:600;">Uso habitual</td>
      <td style="padding:0.5rem;">Universidades, oposiciones, CV</td>
      <td style="padding:0.5rem;">Másteres, doctorados, puestos académicos</td>
    </tr>
  </tbody>
</table>`,
      },
      {
        heading: "¿Cuál necesito yo? Casos de uso concretos",
        content: `<p>Aquí tienes los casos más habituales que vemos en HolaBonjour:</p>
<ul>
  <li><strong>Oposiciones en España:</strong> DELF B2 (la mayoría de convocatorias puntúan a partir de B2).</li>
  <li><strong>Universidad en Francia (grado):</strong> DELF B2 (requisito mínimo en la mayoría de universidades).</li>
  <li><strong>Máster o doctorado en Francia:</strong> DALF C1 (algunas universidades aceptan B2, pero C1 es lo habitual).</li>
  <li><strong>Trabajo en empresa francófona:</strong> Depende del puesto. B2 para puestos operativos, C1 para dirección o comunicación.</li>
  <li><strong>Emigrar a Canadá (Quebec):</strong> DELF B2 mínimo para la mayoría de programas de inmigración.</li>
  <li><strong>Satisfacción personal / reto:</strong> El nivel que tú quieras. Muchos de nuestros alumnos se presentan al C2 simplemente porque quieren demostrar su dominio.</li>
</ul>`,
      },
      {
        heading: "¿Puedo presentarme directamente al nivel que quiero?",
        content: `<p><strong>Sí.</strong> No necesitas tener el DELF A1 para presentarte al B2, ni el B2 para presentarte al C1. Cada diploma es completamente independiente. Puedes matricularte directamente en el nivel que consideres apropiado.</p>
<p>Dicho esto, presentarte a un nivel demasiado alto supone un riesgo real de suspenso (y perder la tasa de inscripción, que ronda los 100-150€ dependiendo del nivel). Por eso es fundamental saber cuál es tu nivel real antes de inscribirte.</p>`,
      },
      {
        heading: "¿Cómo sé cuál es mi nivel real?",
        content: `<p>Hay dos formas fiables de evaluar tu nivel:</p>
<ol>
  <li><strong>Simulacro de examen:</strong> Haz un examen completo en condiciones reales. En HolaBonjour ofrecemos <a href="/examenes">simulacros gratuitos</a> para todos los niveles con corrección automática de las destrezas de comprensión.</li>
  <li><strong>Test de nivel online:</strong> Nuestro <a href="/test-de-nivel">test de nivel</a> evalúa tu gramática, vocabulario y comprensión en 15-20 minutos y te da una estimación de tu nivel MCER.</li>
</ol>
<p>Si tienes dudas entre dos niveles (por ejemplo, «no sé si soy B1 fuerte o B2 débil»), la mejor opción es una sesión de diagnóstico con una préparatrice especializada. En 55 minutos, Isabelle evalúa tus 4 destrezas y te recomienda el nivel exacto al que deberías presentarte.</p>`,
      },
    ],
  },
];
