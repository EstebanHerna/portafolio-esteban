import type { Locale } from '@/i18n/routing';
import { projectsByOrder } from '@/lib/data/projects';
import { timelineChrono } from '@/lib/data/timeline';
import { stack } from '@/lib/data/stack';
import { certifications } from '@/lib/data/certifications';

/** Tipos de contenido que se pueden explorar. */
export type DocType = 'project' | 'milestone' | 'stack' | 'cert';

/** Documento buscable: `text` alimenta el indice; el resto renderiza la tarjeta. */
export interface SearchDoc {
  id: string;
  type: DocType;
  title: string;
  subtitle: string;
  tags: string[];
  /** Ruta interna a la seccion detallada, o null si no aplica. */
  href: string | null;
  /** Texto concatenado que se indexa (no se muestra crudo). */
  text: string;
}

/**
 * Construye el corpus buscable a partir del contenido tipado ya existente
 * (proyectos, trayectoria, stack, certificaciones) para el locale dado. No lee
 * archivos ni llama a ningun servicio: es una proyeccion de los datos del sitio.
 */
export function buildCorpus(locale: Locale): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const p of projectsByOrder) {
    docs.push({
      id: `project:${p.slug}`,
      type: 'project',
      title: p.name,
      subtitle: p.tagline[locale],
      tags: [p.status.label[locale], ...p.stack.slice(0, 4)],
      href: `/proyectos/${p.slug}`,
      text: [
        p.name,
        p.tagline[locale],
        p.role[locale],
        p.problem[locale],
        p.built[locale],
        p.pending[locale],
        p.status.label[locale],
        ...p.stack,
      ].join(' '),
    });
  }

  for (const e of timelineChrono) {
    docs.push({
      id: `milestone:${e.sortKey}`,
      type: 'milestone',
      title: e.title[locale],
      subtitle: e.detail[locale],
      tags: [e.tag[locale], e.date],
      href: '/trayectoria',
      text: [e.title[locale], e.detail[locale], e.tag[locale], e.date].join(' '),
    });
  }

  for (const group of stack) {
    for (const item of group.items) {
      docs.push({
        id: `stack:${group.label.en}:${item}`,
        type: 'stack',
        title: item,
        subtitle: group.label[locale],
        tags: [group.label[locale]],
        href: '/sobre-mi',
        text: [item, group.label[locale], group.label.en].join(' '),
      });
    }
  }

  for (const c of certifications) {
    docs.push({
      id: `cert:${c.name}`,
      type: 'cert',
      title: c.name,
      subtitle: c.issuer,
      tags: [c.issuer, ...(c.date ? [c.date.slice(0, 4)] : [])],
      href: '/sobre-mi',
      text: [c.name, c.issuer].join(' '),
    });
  }

  return docs;
}
