import { describe, it, expect } from 'vitest';
import { projects, projectsByOrder, getProject } from '@/lib/data/projects';
import { profile } from '@/lib/data/profile';
import { stack } from '@/lib/data/stack';
import { certifications } from '@/lib/data/certifications';
import { timeline } from '@/lib/data/timeline';
import { ContactSchema } from '@/lib/contact-schema';
import { formatDate, formatDecimal, formatInt } from '@/lib/format';

describe('reglas de contenido no negociables', () => {
  it('el orden de proyectos es el acordado', () => {
    expect(projectsByOrder.map((p) => p.slug)).toEqual([
      'salud-ambiental',
      'bacterioscope',
      'kingscode',
      'nexusmind',
      'altus',
      'hemovision',
      'microservicios-aws',
    ]);
  });

  it('el titular y la portada no nombran al Ministerio', () => {
    const cover = [
      profile.headline.es,
      profile.headline.en,
      profile.positioning.es,
      profile.positioning.en,
    ];
    for (const text of cover) {
      expect(text).not.toMatch(/ministerio|ministry/i);
    }
    const thesis = getProject('salud-ambiental');
    expect(thesis?.name.es).not.toMatch(/ministerio/i);
    expect(thesis?.tagline.es).not.toMatch(/ministerio/i);
  });

  it('HemoVision conserva la aclaracion de datos sinteticos', () => {
    const hv = getProject('hemovision');
    expect(hv?.disclaimer?.es).toMatch(/sintético/i);
    expect(hv?.disclaimer?.es).toMatch(/NO representa desempeño clínico/);
    expect(hv?.disclaimer?.en).toMatch(/NOT represent clinical performance/);
  });

  it('BacterioScope es investigacion en curso, sin cifras clinicas y declara la brecha', () => {
    const bs = getProject('bacterioscope');
    expect(bs?.status.kind).toBe('research');
    expect(bs?.metrics).toBeUndefined();
    expect(bs?.pending.es).toMatch(/90%/);
  });

  it('BacterioScope solo nombra a Paula Becerra', () => {
    const names = (getProject('bacterioscope')?.collaborators ?? []).map((c) => c.name);
    expect(names).toEqual(['Paula Becerra']);
  });

  it('Altus es un concepto: sin cifras, sin cartas, sin producto desplegado y sin seleccion en Cornell', () => {
    const altus = getProject('altus');
    expect(altus?.metrics).toBeUndefined();
    expect(altus?.status.kind).toBe('competition');
    expect(altus?.disclaimer?.es).toMatch(/proyecciones/i);
    const entry = timeline.find((t) => t.title.es.includes('Altus'));
    const text = JSON.stringify([altus, entry]);
    expect(text).not.toMatch(
      /78|61%|1[.,]200|8[.,]500|iNNpulsa|cartas? de intenci|letters? of intent/i,
    );
    expect(text).not.toMatch(/seleccionad|selected|finalist|Emprendimiento activo|Active venture/i);
    expect(text).not.toMatch(/AWS Lambda|serverless/i);
    expect(text).toMatch(/Particip/);
    expect(altus?.pending.es).toMatch(/No está desplegado/);
  });

  it('NexusMind y los microservicios de MISO van en pasado, sin aclarar el estado de AWS', () => {
    const nm = getProject('nexusmind');
    const ms = getProject('microservicios-aws');
    expect(nm?.built.es).toMatch(/leía|generaba/);
    expect(nm?.built.es).not.toMatch(/ que lee | es serverless/);
    expect(ms?.built.es).toMatch(/DevopsKings/);
    expect(ms?.built.es).toMatch(/desplegué/);
    // Decisión del 16 nov. 2026: el sitio no aclara que los despliegues en AWS no están activos.
    expect(JSON.stringify([nm, ms])).not.toMatch(/ya no est[aá]n? activ|no longer running/i);
    expect(JSON.stringify([nm, ms, getProject('altus')])).not.toMatch(/Kubernetes|k8s/i);
  });

  it('NexusMind figura como semifinalista de AWS 10,000 AIdeas', () => {
    const nm = getProject('nexusmind');
    expect(nm?.status.label.es).toMatch(/Semifinalista, AWS 10,000 AIdeas/);
    expect(JSON.stringify(nm)).not.toMatch(/AI League|Top 100/);
  });

  it('el stack no lista lo que no se puede defender', () => {
    const items = stack.flatMap((g) => g.items);
    for (const banned of ['C++', 'MySQL', 'Angular', 'Nginx', 'Kubernetes']) {
      expect(items).not.toContain(banned);
    }
    expect(items).toContain('Apache Airflow');
  });

  it('las certificaciones abren con NVIDIA y no incluyen la que no tiene certificado', () => {
    expect(certifications[0]?.issuer).toMatch(/NVIDIA/);
    expect(certifications.map((c) => c.name)).not.toContain('Introduction to Generative AI');
    for (const c of certifications) expect(c.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('el correo publico es el personal', () => {
    expect(profile.email).toBe('esteban.hernna@gmail.com');
  });

  it('todo el contenido existe en ambos idiomas', () => {
    for (const p of projects) {
      for (const field of [p.name, p.tagline, p.role, p.problem, p.built, p.pending, p.timeframe]) {
        expect(field.es.length).toBeGreaterThan(0);
        expect(field.en.length).toBeGreaterThan(0);
      }
    }
    for (const e of timeline) {
      for (const field of [e.date, e.title, e.detail, e.tag]) {
        expect(field.es.length).toBeGreaterThan(0);
        expect(field.en.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('formato de cifras y fechas', () => {
  it('usa el separador de miles de cada idioma', () => {
    expect(formatInt(1121, 'es')).toBe('1.121');
    expect(formatInt(1121, 'en')).toBe('1,121');
  });

  it('usa coma decimal en espanol', () => {
    expect(formatDecimal(8.71, 'es', 2)).toBe('8,71');
    expect(formatDecimal(8.71, 'en', 2)).toBe('8.71');
  });

  it('no corre la fecha un dia por la zona horaria', () => {
    expect(formatDate('2026-07-05', 'en')).toMatch(/Jul 5, 2026/);
  });
});

describe('validacion del formulario de contacto', () => {
  it('acepta una entrada valida con honeypot vacio', () => {
    const r = ContactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hola',
      company: '',
    });
    expect(r.success).toBe(true);
  });

  it('rechaza correo invalido', () => {
    const r = ContactSchema.safeParse({ name: 'Ada', email: 'no', message: 'Hola' });
    expect(r.success).toBe(false);
  });

  it('rechaza honeypot con contenido (bot)', () => {
    const r = ContactSchema.safeParse({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'spam',
      company: 'ACME',
    });
    expect(r.success).toBe(false);
  });
});
