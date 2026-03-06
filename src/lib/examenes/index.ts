import { Examen, Nivel } from './types'
import { CONFIG_NIVELES } from './config-niveles'

// ── Todos los niveles ───────────────────────────────────────────────────────
import { examen_A1_exemple1 } from './data/A1-exemple1'
import { examen_A1_exemple2 } from './data/A1-exemple2'
import { examen_A2_exemple1 } from './data/A2-exemple1'
import { examen_A2_exemple2 } from './data/A2-exemple2'
import { examen_B1_exemple1 } from './data/B1-exemple1'
import { examen_B1_exemple2 } from './data/B1-exemple2'
import { examen_B2_exemple1 } from './data/B2-exemple1'
import { examen_B2_exemple2 } from './data/B2-exemple2'
import { examen_C1_exemple1 } from './data/C1-exemple1'
import { examen_C1_exemple2 } from './data/C1-exemple2'
import { examen_C2_exemple1 } from './data/C2-exemple1'
import { examen_C2_exemple2 } from './data/C2-exemple2'

// ── Registro completo ─────────────────────────────────────────────────────────
const TODOS_LOS_EXAMENES: Examen[] = [
  examen_A1_exemple1,
  examen_A1_exemple2,
  examen_A2_exemple1,
  examen_A2_exemple2,
  examen_B1_exemple1,
  examen_B1_exemple2,
  examen_B2_exemple1,
  examen_B2_exemple2,
  examen_C1_exemple1,
  examen_C1_exemple2,
  examen_C2_exemple1,
  examen_C2_exemple2,
]

// ── API pública ───────────────────────────────────────────────────────────────

/** Obtiene un examen concreto por nivel y número de ejemplo */
export function getExamen(nivel: Nivel, ejemplo: 1 | 2): Examen | undefined {
  return TODOS_LOS_EXAMENES.find(e => e.nivel === nivel && e.ejemplo === ejemplo)
}

/** Todos los exámenes de un nivel */
export function getExamenesPorNivel(nivel: Nivel): Examen[] {
  return TODOS_LOS_EXAMENES.filter(e => e.nivel === nivel)
}

/** Niveles que tienen datos reales (secciones no vacías) */
export function getNivelesDisponibles(): Nivel[] {
  return TODOS_LOS_EXAMENES
    .filter(e => e.secciones.length > 0)
    .map(e => e.nivel)
    .filter((v, i, a) => a.indexOf(v) === i) as Nivel[]
}

/** True si el examen tiene archivos de audio en la sección CO */
export function tieneAudio(nivel: Nivel, ejemplo: 1 | 2): boolean {
  const examen = getExamen(nivel, ejemplo)
  if (!examen) return false
  const co = examen.secciones.find(s => s.codigo === 'CO')
  return co?.ejercicios.some(ej => !!ej.audio) ?? false
}

/** True si el examen tiene datos suficientes para mostrarse */
export function examenDisponible(nivel: Nivel, ejemplo: 1 | 2): boolean {
  const examen = getExamen(nivel, ejemplo)
  return (examen?.secciones.length ?? 0) > 0
}

/** Todos los exámenes disponibles (con datos) agrupados por nivel */
export function getExamenesDisponiblesPorNivel(): Record<Nivel, Examen[]> {
  const result = {} as Record<Nivel, Examen[]>
  const niveles: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  for (const nivel of niveles) {
    result[nivel] = TODOS_LOS_EXAMENES.filter(
      e => e.nivel === nivel && e.secciones.length > 0
    )
  }
  return result
}

/** Check if a nivel has legacy exam pages (/examen-delf-a1) */
export function isLegacyExam(nivel: string): boolean {
  const lower = nivel.toLowerCase()
  return lower === 'a1'
}

export { CONFIG_NIVELES }
export type { Examen, Nivel }
