import type { Locale } from '@/i18n/routing';

export type { Locale };

/** Texto disponible en ambos locales. */
export type Localized = Record<Locale, string>;

export type ProjectSlug = 'bacterioscope' | 'hemovision' | 'nexusmind' | 'altus';

export type ProjectStatusKind = 'research' | 'shipped' | 'competition';

export interface ProjectStatus {
  kind: ProjectStatusKind;
  label: Localized;
}

export interface Metric {
  /** Valor mostrado en monoespaciada (dato duro). */
  value: string;
  label: Localized;
}

export interface Collaborator {
  /** Solo nombres con autorizacion registrada. */
  name: string;
  role: Localized;
}

export interface ProjectLink {
  label: Localized;
  href: string;
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  /** Peso en el indice; menor = mas arriba. */
  order: number;
  featured: boolean;
  timeframe: string;
  status: ProjectStatus;
  tagline: Localized;
  role: Localized;
  stack: string[];
  /** Orden fijo de lectura: problema, construido, pendiente. */
  problem: Localized;
  built: Localized;
  pending: Localized;
  metrics?: Metric[];
  /** Disclaimer con el mismo peso visual que las metricas. */
  disclaimer?: Localized;
  collaborators?: Collaborator[];
  /** null => el repositorio no es publico; no se muestra boton. */
  repoUrl?: string | null;
  links?: ProjectLink[];
}

export interface TimelineEntry {
  /** Fecha o rango tal como Esteban lo reporto. */
  date: string;
  /** Clave de ordenamiento aproximada (YYYYMM). */
  sortKey: number;
  title: Localized;
  detail: Localized;
  tag: Localized;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string | null;
  duration?: string;
  code?: string;
}

export interface StackGroup {
  label: Localized;
  items: string[];
}
