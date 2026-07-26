import type { Certification } from '@/lib/types';

/** Certificaciones verificadas (PDF de Codigo Facilito y badge de Google Cloud). */
export const certifications: Certification[] = [
  {
    name: 'Curso a fondo de GitHub',
    issuer: 'Codigo Facilito',
    date: '2026-07-05',
    duration: '3h 3m',
    code: '7912a545-78eb-4564-bc83-537d2f78ca05',
    verifyUrl: 'https://codigofacilito.com/certificados/7912a545-78eb-4564-bc83-537d2f78ca05',
  },
  {
    name: 'Curso de C Profesional',
    issuer: 'Codigo Facilito',
    date: '2026-07-05',
    duration: '2h 23m',
    code: '970d0e02-97bd-4db7-9dd3-2976f2671c58',
    verifyUrl: 'https://codigofacilito.com/certificados/970d0e02-97bd-4db7-9dd3-2976f2671c58',
  },
  {
    name: 'Curso de Power BI',
    issuer: 'Codigo Facilito',
    date: '2026-07-05',
    duration: '2h 26m',
    code: '15d908ba-9193-440c-a6e3-651ac49b0f7b',
    verifyUrl: 'https://codigofacilito.com/certificados/15d908ba-9193-440c-a6e3-651ac49b0f7b',
  },
  {
    name: 'Curso de fundamentos de SQL en 1 hora',
    issuer: 'Codigo Facilito',
    date: '2026-07-05',
    duration: '1h 35m',
    code: 'a1361327-ff1a-4235-8c27-f3a36430b470',
    verifyUrl: 'https://codigofacilito.com/certificados/a1361327-ff1a-4235-8c27-f3a36430b470',
  },
  {
    name: 'Prompt Design in Vertex AI (Skill Badge)',
    issuer: 'Google Cloud',
    date: '2026-07-08',
  },
  {
    // Pendiente de confirmar por Esteban: nombre exacto impreso, fecha y URL de verificacion.
    name: 'Bootcamp de Desarrollo con Kiro',
    issuer: 'Kiro (AWS)',
    date: null,
  },
];
