import { describe, it, expect } from 'vitest';
import { tokenize } from '@/lib/rag/tokenize';
import { TfidfIndex } from '@/lib/rag/tfidf';
import { buildCorpus } from '@/lib/rag/corpus';

describe('tokenizacion', () => {
  it('quita acentos y baja a minusculas', () => {
    expect(tokenize('Visión por Computador')).toContain('vision');
  });

  it('genera bigramas de tokens consecutivos', () => {
    expect(tokenize('rate limiting')).toContain('rate limiting');
  });

  it('descarta tokens de un solo caracter', () => {
    expect(tokenize('a de la')).not.toContain('a');
  });
});

describe('indice TF-IDF (retrieval)', () => {
  const docs = [
    'HemoVision vision por computador turbidez hemocultivos FastAPI Python',
    'BacterioScope antibiogramas Kirby-Bauer resistencia antimicrobiana vision por computador',
    'NexusMind asistente proactivo AWS Lambda Bedrock DynamoDB serverless',
  ];
  const index = new TfidfIndex(docs);

  it('devuelve resultados relevantes ordenados por coseno', () => {
    const hits = index.query('vision por computador');
    expect(hits.length).toBeGreaterThan(0);
    // Los dos primeros deben ser los proyectos de vision por computador (0 y 1).
    expect([hits[0].index, hits[1].index].sort()).toEqual([0, 1]);
    expect(hits[0].score).toBeGreaterThan(0);
  });

  it('discrimina por termino especifico', () => {
    const hits = index.query('AWS Bedrock serverless');
    expect(hits[0].index).toBe(2);
  });

  it('devuelve vacio cuando ningun termino esta en el vocabulario', () => {
    expect(index.query('xyzzy qwerty')).toEqual([]);
  });

  it('es determinista', () => {
    expect(index.query('vision')).toEqual(index.query('vision'));
  });
});

describe('corpus del sitio', () => {
  it('proyecta los datos tipados a documentos buscables', () => {
    const corpus = buildCorpus('es');
    expect(corpus.length).toBeGreaterThan(0);
    for (const doc of corpus) {
      expect(doc.text.length).toBeGreaterThan(0);
      expect(doc.title.length).toBeGreaterThan(0);
    }
    expect(corpus.some((d) => d.type === 'project')).toBe(true);
    expect(corpus.some((d) => d.type === 'milestone')).toBe(true);
    expect(corpus.some((d) => d.type === 'stack')).toBe(true);
    expect(corpus.some((d) => d.type === 'cert')).toBe(true);
  });

  it('recupera el proyecto correcto por terminos especificos', () => {
    const corpus = buildCorpus('es');
    const index = new TfidfIndex(corpus.map((d) => d.text));

    // "turbidez" y "hemocultivos" son propios de HemoVision.
    const hemo = index.query('turbidez hemocultivos');
    expect(corpus[hemo[0].index].id).toBe('project:hemovision');

    // "kirby-bauer" y "antibiogramas" son propios de BacterioScope.
    const bacterio = index.query('antibiogramas kirby bauer');
    expect(corpus[bacterio[0].index].id).toBe('project:bacterioscope');
  });
});
