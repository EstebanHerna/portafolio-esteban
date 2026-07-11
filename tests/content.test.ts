import { describe, it, expect } from 'vitest';
import { projects, getProject } from '@/lib/data/projects';
import { ContactSchema } from '@/lib/contact-schema';

describe('reglas de contenido no negociables', () => {
  it('HemoVision conserva el disclaimer de datos sinteticos con texto real', () => {
    const hv = getProject('hemovision');
    expect(hv?.disclaimer).toBeDefined();
    expect(hv?.disclaimer?.es).toMatch(/sintetico/i);
    expect(hv?.disclaimer?.es).toMatch(/NO representa desempeno clinico/);
  });

  it('BacterioScope es investigacion en curso y sin metricas clinicas', () => {
    const bs = getProject('bacterioscope');
    expect(bs?.status.kind).toBe('research');
    expect(bs?.metrics).toBeUndefined();
  });

  it('BacterioScope solo nombra colaboradores autorizados (Paula Becerra)', () => {
    const bs = getProject('bacterioscope');
    const names = (bs?.collaborators ?? []).map((c) => c.name);
    expect(names).toEqual(['Paula Becerra']);
  });

  it('Altus no inventa stack', () => {
    const altus = getProject('altus');
    expect(altus?.stack).toHaveLength(0);
  });

  it('cada proyecto tiene contenido bilingue en los campos clave', () => {
    for (const p of projects) {
      for (const field of [p.tagline, p.problem, p.built, p.pending] as const) {
        expect(field.es.length).toBeGreaterThan(0);
        expect(field.en.length).toBeGreaterThan(0);
      }
    }
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
