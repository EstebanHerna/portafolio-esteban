import type { Localized } from '@/lib/types';

export interface ProcessNode {
  id: string;
  index: number;
  label: Localized;
  summary: Localized;
  /** Evidencia real de la construccion de HemoVision. Nada de relleno. */
  evidence: Localized[];
}

/**
 * El flujo agentico de cuatro etapas con el que se construyo este mismo portafolio
 * y HemoVision. Contenido verificable, no decorativo.
 */
export const processNodes: ProcessNode[] = [
  {
    id: 'planning',
    index: 0,
    label: { es: 'Planeacion', en: 'Planning' },
    summary: {
      es: 'Onboarding, decisiones de arquitectura, mandato visual y de seguridad, cerrados por escrito antes de tocar codigo.',
      en: 'Onboarding, architecture decisions, and visual and security mandates, closed in writing before touching code.',
    },
    evidence: [
      {
        es: 'Posicionamiento y audiencias definidos en una sola frase.',
        en: 'Positioning and audiences defined in a single sentence.',
      },
      {
        es: 'Registro de riesgos con responsable por cada vacio.',
        en: 'Risk log with an owner for each gap.',
      },
      {
        es: 'Stack y tokens de diseno fijados sin ambiguedad.',
        en: 'Stack and design tokens fixed with no ambiguity.',
      },
    ],
  },
  {
    id: 'spec',
    index: 1,
    label: { es: 'Especificacion', en: 'Specification' },
    summary: {
      es: 'Requisitos en formato historia + criterios verificables, disenados para que ninguna etapa siguiente adivine.',
      en: 'Requirements as user stories plus verifiable criteria, designed so no later stage has to guess.',
    },
    evidence: [
      {
        es: 'Historias con clausulas CUANDO / EL SISTEMA DEBE.',
        en: 'Stories with WHEN / THE SYSTEM SHALL clauses.',
      },
      {
        es: 'Presupuesto de rendimiento y accesibilidad explicito.',
        en: 'Explicit performance and accessibility budget.',
      },
      {
        es: 'Tareas numeradas con su historia asociada.',
        en: 'Numbered tasks each mapped to a story.',
      },
    ],
  },
  {
    id: 'implementation',
    index: 2,
    label: { es: 'Implementacion', en: 'Implementation' },
    summary: {
      es: 'Ejecucion por hitos verificados. Mismo rigor que HemoVision: cada commit pasa su gate antes de continuar.',
      en: 'Milestone-by-milestone execution. Same rigor as HemoVision: every commit passes its gate before moving on.',
    },
    evidence: [
      { es: 'HemoVision: 97% de cobertura de pruebas.', en: 'HemoVision: 97% test coverage.' },
      {
        es: 'CI en tres versiones de Python (3.10 a 3.12).',
        en: 'CI across three Python versions (3.10-3.12).',
      },
      {
        es: 'SBOM CycloneDX y gitleaks sin hallazgos.',
        en: 'CycloneDX SBOM and gitleaks with no findings.',
      },
    ],
  },
  {
    id: 'review',
    index: 3,
    label: { es: 'Revision', en: 'Review' },
    summary: {
      es: 'Auditoria final antes de publicar: cabeceras, secretos, Lighthouse, enlaces y accesibilidad, todo documentado.',
      en: 'Final audit before shipping: headers, secrets, Lighthouse, links, and accessibility, all documented.',
    },
    evidence: [
      {
        es: 'Cabeceras de seguridad verificadas en cada respuesta.',
        en: 'Security headers verified on every response.',
      },
      {
        es: 'Historial de git escaneado, cero secretos.',
        en: 'Git history scanned, zero secrets.',
      },
      {
        es: 'Diff mostrado antes de cualquier cambio publico.',
        en: 'Diff shown before any public change.',
      },
    ],
  },
];
