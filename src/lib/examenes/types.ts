export type Nivel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type Diploma = 'DELF' | 'DALF'
export type Modalidad = 'demo' | 'completo'
export type CodigoSeccion = 'CO' | 'CE' | 'PE' | 'PO'

export type TipoPregunta =
  | 'qcm'
  | 'vrai-faux'
  | 'reponse-libre'
  | 'grille'
  | 'production'
  | 'synthese'
  | 'oral'

export interface OpcionQCM {
  letra: 'A' | 'B' | 'C' | 'D'
  texto: string
}

export interface CriterioGrille {
  id: string
  label: string
}

export interface OpcionGrille {
  id: string
  label: string
}

export interface Pregunta {
  id: string
  numero: number
  tipo: TipoPregunta
  enunciado: string
  puntos: number
  // QCM
  opciones?: OpcionQCM[]
  respuestaCorrecta?: string | boolean
  // Vrai-faux
  justificacionCorrecta?: string
  // Grille
  criterios?: CriterioGrille[]
  opcionesGrille?: OpcionGrille[]
  respuestasGrille?: Record<string, Record<string, boolean>>
  opcionCorrectaGrille?: string
  // Production
  minPalabras?: number
  criteriosEvaluacion?: { label: string; valores: number[] }[]
  // Imagen (CO ejercicios de dibujos)
  esImagen?: boolean
  descripcionImagen?: string
  imageUrl?: string
  // PO: sujetos alternativos
  sujetosAlternativos?: string[]
  // Contexto adicional
  nota?: string
}

export interface Ejercicio {
  id: string
  numero: number
  titulo: string
  instrucciones: string
  texto?: string
  audio?: string
  numEscuchas?: number
  tiempoLecturaPrevia?: number   // segundos antes del audio
  pausaEntreEscuchas?: number
  tiempoRespuestaFinal?: number  // segundos después última escucha
  preguntas: Pregunta[]
  puntuacionTotal: number
}

export interface SeccionExamen {
  id: string
  numero: 1 | 2 | 3 | 4
  codigo: CodigoSeccion
  titulo: string
  duracionMinutos: number
  puntuacionTotal: number
  instruccionesGenerales: string
  ejercicios: Ejercicio[]
  notasEspeciales?: string[]
}

export interface Examen {
  id: string
  nivel: Nivel
  diploma: Diploma
  modalidad: Modalidad
  ejemplo: 1 | 2
  titulo: string
  secciones: SeccionExamen[]
  puntuacionMinPorSeccion: number  // siempre 5
  puntuacionMinTotal: number       // siempre 50
}

export interface ConfigNivel {
  nivel: Nivel
  diploma: Diploma
  descripcion: string
  descripcionEs: string
  colorClase: string
  duracionTotalMinutos: number
  secciones: {
    codigo: CodigoSeccion
    titulo: string
    duracion: number
    descripcionCorta: string
  }[]
}

export interface RespuestaCandidat {
  preguntaId: string
  respuesta: string | boolean | null
  justificacion?: string
  respuestasGrille?: Record<string, Record<string, boolean>>
  opcionGrille?: string
  // PE: texto libre
  texto?: string
  numPalabras?: number
  // PO: grabación audio
  audioUrl?: string
  transcripcion?: string
}

export interface ResultadoPregunta {
  preguntaId: string
  correcta: boolean
  puntuacionObtenida: number
  puntuacionMaxima: number
  respuestaDada: string | boolean | null
  respuestaCorrecta?: string | boolean
}

export interface ResultadoEjercicio {
  ejercicioId: string
  puntuacionObtenida: number
  puntuacionMaxima: number
  preguntas: ResultadoPregunta[]
}

export interface ResultadoSeccion {
  codigo: CodigoSeccion
  puntuacionObtenida: number
  puntuacionMaxima: number
  aprobado: boolean
  ejercicios: ResultadoEjercicio[]
  requiereCorrector: boolean
}

export interface ResultadoExamen {
  examenId: string
  fechaRealizacion: Date
  secciones: ResultadoSeccion[]
  puntuacionTotal: number
  aprobado: boolean
}
