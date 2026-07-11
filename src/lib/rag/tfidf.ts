import { tokenize } from './tokenize';

/**
 * TF-IDF + coseno en TypeScript puro. Reimplementa la esencia del retrieval del
 * baseline local de rag-portafolio (TfidfVectorizer 1-2 gramas, sublinear_tf,
 * smooth_idf, norma L2; coseno = producto punto sobre vectores normalizados),
 * sin scikit-learn, sin numpy, sin API keys. Determinista.
 */
export interface RankedDoc {
  /** Indice del documento en el arreglo original. */
  index: number;
  /** Similitud coseno en [0, 1]. */
  score: number;
}

export class TfidfIndex {
  private vocab = new Map<string, number>();
  private idf: number[] = [];
  private docVectors: Map<number, number>[] = [];

  constructor(texts: string[]) {
    this.fit(texts);
  }

  private fit(texts: string[]): void {
    const n = texts.length;
    const docTokens = texts.map(tokenize);

    // Frecuencia de documento por termino.
    const df = new Map<string, number>();
    for (const tokens of docTokens) {
      for (const term of new Set(tokens)) {
        df.set(term, (df.get(term) ?? 0) + 1);
      }
    }

    // Vocabulario + IDF suavizado: ln((1 + n) / (1 + df)) + 1 (smooth_idf de sklearn).
    let idx = 0;
    for (const [term, d] of df) {
      this.vocab.set(term, idx);
      this.idf[idx] = Math.log((1 + n) / (1 + d)) + 1;
      idx++;
    }

    this.docVectors = docTokens.map((tokens) => this.vectorize(tokens));
  }

  /** tf sublineal (1 + ln tf) * idf, normalizado L2. Terminos fuera de vocab se ignoran. */
  private vectorize(tokens: string[]): Map<number, number> {
    const counts = new Map<number, number>();
    for (const token of tokens) {
      const vi = this.vocab.get(token);
      if (vi === undefined) continue;
      counts.set(vi, (counts.get(vi) ?? 0) + 1);
    }

    const vec = new Map<number, number>();
    let norm = 0;
    for (const [vi, count] of counts) {
      const weight = (1 + Math.log(count)) * (this.idf[vi] ?? 0);
      vec.set(vi, weight);
      norm += weight * weight;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [vi, weight] of vec) {
      vec.set(vi, weight / norm);
    }
    return vec;
  }

  /** Recupera los top-k documentos por coseno con la consulta. */
  query(text: string, k = 30): RankedDoc[] {
    const qvec = this.vectorize(tokenize(text));
    if (qvec.size === 0) return [];

    const ranked: RankedDoc[] = [];
    for (let index = 0; index < this.docVectors.length; index++) {
      const dvec = this.docVectors[index];
      if (!dvec) continue;
      // Se itera el vector mas pequeno y se consulta el mayor: mismo coseno, menos trabajo.
      const smaller = qvec.size < dvec.size ? qvec : dvec;
      const larger = qvec.size < dvec.size ? dvec : qvec;
      let score = 0;
      for (const [vi, weight] of smaller) {
        const other = larger.get(vi);
        if (other) score += weight * other;
      }
      if (score > 0) ranked.push({ index, score });
    }

    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, k);
  }
}
