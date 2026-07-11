/**
 * Tokenizacion equivalente a la del baseline local de rag-portafolio:
 * minusculas, sin acentos, 1-2 gramas. Sin dependencias.
 */

// Rango de marcas diacriticas combinantes U+0300 a U+036F (construido sin
// literales combinantes para no depender de la codificacion del archivo).
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  'g',
);

/** Minusculas y sin diacriticos (equivalente a strip_accents="unicode"). */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase();
}

/**
 * Unigramas (>= 2 caracteres, como el token_pattern por defecto de sklearn) mas
 * bigramas de tokens consecutivos. Devuelve la lista de terminos (ngram_range 1-2).
 */
export function tokenize(text: string): string[] {
  const words = (normalize(text).match(/[a-z0-9]+/g) ?? []).filter((w) => w.length >= 2);
  const grams: string[] = [...words];
  for (let i = 0; i < words.length - 1; i++) {
    grams.push(`${words[i]} ${words[i + 1]}`);
  }
  return grams;
}
