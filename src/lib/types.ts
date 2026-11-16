import type { Locale } from '@/i18n/routing';

export type { Locale };

/** Texto disponible en ambos locales. */
export type Localized = Record<Locale, string>;

export type ProjectSlug =
  | 'salud-ambiental'
  | 'bacterioscope'
  | 'kingscode'
  | 'nexusmind'
  | 'altus'
  | 'hemovision'
  | 'microservicios-aws';

export type ProjectStatusKind = 'thesis' | 'research' | 'shipped' | 'competition' | 'coursework';

export interface ProjectStatus {
  kind: ProjectStatusKind;
  label: Localized;
}

export interface Metric {
  /** Cifra tal como se imprime en cada idioma (coma o punto decimal). */
  value: Localized;
  label: Localized;
  /** Cómo se obtuvo o cómo se comprueba. */
  note?: Localized;
}

export interface Collaborator {
  /** Solo nombres con autorización registrada. */
  name: string;
  role: Localized;
}

export interface ProjectLink {
  label: Localized;
  href: string;
}

export interface PipelineSource {
  name: string;
  what: Localized;
}

export interface PipelineStage {
  name: Localized;
  detail: Localized;
}

/** Etapas de un flujo de datos, en orden de ejecución. */
export interface Pipeline {
  title: Localized;
  sources: PipelineSource[];
  stages: PipelineStage[];
  output: Localized;
  source: Localized;
  note: Localized;
}

export interface Project {
  slug: ProjectSlug;
  name: Localized;
  /** Peso en el índice; menor = más arriba. */
  order: number;
  timeframe: Localized;
  status: ProjectStatus;
  tagline: Localized;
  role: Localized;
  stack: string[];
  /** Orden fijo de lectura: problema, construido, pendiente. */
  problem: Localized;
  built: Localized;
  pending: Localized;
  /** Diagrama de etapas, cuando el proyecto es un flujo de datos. */
  pipeline?: Pipeline;
  metrics?: Metric[];
  /** De dónde salen las cifras del cuadro. */
  metricsSource?: Localized;
  /** Aclaración con el mismo peso visual que las cifras. */
  disclaimer?: Localized;
  collaborators?: Collaborator[];
  /** null => el repositorio no es público; se dice de forma explícita. */
  repoUrl: string | null;
  links?: ProjectLink[];
}

export interface TimelineEntry {
  date: Localized;
  /** Clave de ordenamiento (YYYYMM). */
  sortKey: number;
  title: Localized;
  detail: Localized;
  tag: Localized;
  /** Enlace público asociado, si existe. */
  href?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  /** Fecha ISO (YYYY-MM-DD) impresa en el certificado. */
  date: string;
  duration?: Localized;
  /** Código o ID de credencial impreso en el certificado. */
  code?: string;
  /** URL pública de verificación, solo si el emisor la ofrece. */
  verifyUrl?: string;
}

export interface StackGroup {
  label: Localized;
  items: string[];
}
