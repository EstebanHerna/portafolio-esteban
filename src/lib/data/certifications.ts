import type { Certification } from '@/lib/types';

/**
 * Certificaciones con soporte en PDF. Fechas, duraciones y códigos copiados de cada
 * certificado. Orden: NVIDIA, Google, Código Facilito, CITI.
 * verifyUrl solo aparece cuando el emisor publica una página de verificación.
 */
export const certifications: Certification[] = [
  {
    name: 'Rapid Application Development with Large Language Models (LLMs)',
    issuer: 'NVIDIA Deep Learning Institute',
    date: '2026-09-30',
    code: 'kY9m6YZSR7mp0olCjgvEUA',
  },
  {
    name: 'Applications of AI for Anomaly Detection',
    issuer: 'NVIDIA Deep Learning Institute',
    date: '2026-10-01',
    code: '56G4MvNtTAyMVqAySrv8SQ',
  },
  {
    name: 'Prompt Design in Vertex AI (Skill Badge)',
    issuer: 'Google Cloud',
    date: '2026-07-08',
  },
  {
    name: 'Gemini Academy para Universitarios 2026',
    issuer: 'Google',
    date: '2026-09-08',
    duration: { es: '2 h', en: '2 h' },
  },
  {
    name: 'Bootcamp Desarrollo de software basado en agentes con Kiro',
    issuer: 'Código Facilito',
    date: '2026-07-18',
    duration: { es: '12 semanas', en: '12 weeks' },
  },
  {
    name: 'Fundamentos de Ingeniero IA con Python',
    issuer: 'Código Facilito',
    date: '2026-08-19',
    duration: { es: '12 semanas', en: '12 weeks' },
  },
  {
    name: 'Tu primer RAG: haz que la IA entienda tus datos',
    issuer: 'Código Facilito',
    date: '2026-08-19',
    duration: { es: '1 h 53 min', en: '1 h 53 min' },
    code: 'c7adbb6a-1568-4cf6-b9ba-1af1c9d5051d',
    verifyUrl: 'https://codigofacilito.com/certificados/c7adbb6a-1568-4cf6-b9ba-1af1c9d5051d',
  },
  {
    name: 'LangChain, el framework de IA para desarrolladores',
    issuer: 'Código Facilito',
    date: '2026-08-19',
    duration: { es: '34 min', en: '34 min' },
    code: '5d6932a5-2fbf-4aed-aa88-5b52919439d9',
    verifyUrl: 'https://codigofacilito.com/certificados/5d6932a5-2fbf-4aed-aa88-5b52919439d9',
  },
  {
    name: 'Cómo consumir la API de OpenAI',
    issuer: 'Código Facilito',
    date: '2026-08-12',
    duration: { es: '37 min', en: '37 min' },
    code: '1545afd7-b970-4bbd-b70f-c06fffe47a5b',
    verifyUrl: 'https://codigofacilito.com/certificados/1545afd7-b970-4bbd-b70f-c06fffe47a5b',
  },
  {
    name: 'Fundamentos de SQL',
    issuer: 'Código Facilito',
    date: '2026-07-05',
    duration: { es: '1 h 35 min', en: '1 h 35 min' },
    code: 'a1361327-ff1a-4235-8c27-f3a36430b470',
    verifyUrl: 'https://codigofacilito.com/certificados/a1361327-ff1a-4235-8c27-f3a36430b470',
  },
  {
    name: 'Power BI',
    issuer: 'Código Facilito',
    date: '2026-07-05',
    duration: { es: '2 h 26 min', en: '2 h 26 min' },
    code: '15d908ba-9193-440c-a6e3-651ac49b0f7b',
    verifyUrl: 'https://codigofacilito.com/certificados/15d908ba-9193-440c-a6e3-651ac49b0f7b',
  },
  {
    name: 'Curso a fondo de GitHub',
    issuer: 'Código Facilito',
    date: '2026-07-05',
    duration: { es: '3 h 3 min', en: '3 h 3 min' },
    code: '7912a545-78eb-4564-bc83-537d2f78ca05',
    verifyUrl: 'https://codigofacilito.com/certificados/7912a545-78eb-4564-bc83-537d2f78ca05',
  },
  {
    name: 'C Profesional',
    issuer: 'Código Facilito',
    date: '2026-07-05',
    duration: { es: '2 h 23 min', en: '2 h 23 min' },
    code: '970d0e02-97bd-4db7-9dd3-2976f2671c58',
    verifyUrl: 'https://codigofacilito.com/certificados/970d0e02-97bd-4db7-9dd3-2976f2671c58',
  },
  {
    name: 'Ética de la investigación (SBE)',
    issuer: 'CITI Program',
    date: '2026-08-26',
    code: '79067740',
  },
];
