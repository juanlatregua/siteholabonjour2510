export interface EnlaceUtil {
  name: string;
  url: string;
  description: string;
  category: string;
}

export const enlacesUtiles: EnlaceUtil[] = [
  // Medios y práctica
  {
    name: "TV5Monde",
    url: "https://apprendre.tv5monde.com",
    description:
      "Ejercicios de francés con vídeos de actualidad, reportajes y documentales.",
    category: "Medios y práctica",
  },
  {
    name: "RFI Savoirs",
    url: "https://savoirs.rfi.fr",
    description:
      "Recursos pedagógicos basados en emisiones de Radio France Internationale.",
    category: "Medios y práctica",
  },
  {
    name: "France 24",
    url: "https://www.france24.com/fr/",
    description:
      "Canal de noticias en francés con subtítulos disponibles.",
    category: "Medios y práctica",
  },
  // Exámenes oficiales
  {
    name: "France Éducation International",
    url: "https://www.france-education-international.fr",
    description:
      "Organismo oficial que gestiona los exámenes DELF y DALF. Ejemplos de examen y calendario.",
    category: "Exámenes oficiales",
  },
  {
    name: "Institut Français de España",
    url: "https://www.institutfrancais.es",
    description:
      "Centros de examen DELF/DALF en España. Convocatorias y matriculación.",
    category: "Exámenes oficiales",
  },
  {
    name: "Alliance Française",
    url: "https://www.fondation-alliancefr.org",
    description:
      "Red mundial de centros de lengua francesa con cursos y certificaciones.",
    category: "Exámenes oficiales",
  },
  // Diccionarios y gramática
  {
    name: "Le Robert",
    url: "https://dictionnaire.lerobert.com",
    description:
      "Diccionario de referencia de la lengua francesa con definiciones, sinónimos y conjugaciones.",
    category: "Diccionarios y gramática",
  },
  {
    name: "Larousse",
    url: "https://www.larousse.fr/dictionnaires/francais",
    description:
      "Diccionario enciclopédico francés con recursos lingüísticos.",
    category: "Diccionarios y gramática",
  },
  {
    name: "Bescherelle",
    url: "https://bescherelle.com",
    description:
      "Referencia de conjugación francesa y herramientas gramaticales.",
    category: "Diccionarios y gramática",
  },
  {
    name: "WordReference FR-ES",
    url: "https://www.wordreference.com/fres/",
    description:
      "Diccionario bilingüe francés-español con foros de discusión.",
    category: "Diccionarios y gramática",
  },
  // Cultura
  {
    name: "Culturethèque",
    url: "https://www.culturetheque.com",
    description:
      "Biblioteca digital de la cultura francesa: libros, prensa, música y cine.",
    category: "Cultura",
  },
  {
    name: "Podcast Français Facile",
    url: "https://www.podcastfrancaisfacile.com",
    description:
      "Podcasts graduados por nivel con transcripciones y ejercicios.",
    category: "Cultura",
  },
];
