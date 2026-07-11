import type { TimelineEntry } from '@/lib/types';

/** Linea de tiempo real, cronologica. Datos del CV de Esteban. Sin genericos. */
export const timeline: TimelineEntry[] = [
  {
    date: 'Jun. 2020 - Feb. 2022',
    sortKey: 202006,
    tag: { es: 'Emprendimiento', en: 'Venture' },
    title: { es: 'Respira Seguro', en: 'Respira Seguro' },
    detail: {
      es: 'Director de un emprendimiento propio de comercializacion de productos de higiene durante la pandemia, con proveedor exclusivo e ingresos sostenidos.',
      en: 'Director of a personal venture selling hygiene products during the pandemic, with an exclusive supplier and sustained revenue.',
    },
  },
  {
    date: '2022',
    sortKey: 202212,
    tag: { es: 'Educacion', en: 'Education' },
    title: { es: 'Bachiller, Colegio Cafam', en: 'High school diploma, Colegio Cafam' },
    detail: { es: 'Bogota.', en: 'Bogota.' },
  },
  {
    date: '2023',
    sortKey: 202301,
    tag: { es: 'Educacion', en: 'Education' },
    title: {
      es: 'Ingreso a Ingenieria de Sistemas y Computacion, Uniandes',
      en: 'Started Systems and Computing Engineering, Uniandes',
    },
    detail: { es: 'Universidad de los Andes, Bogota.', en: 'Universidad de los Andes, Bogota.' },
  },
  {
    date: 'Jun. 2024 - Mar. 2025',
    sortKey: 202406,
    tag: { es: 'Docencia', en: 'Teaching' },
    title: {
      es: 'Mentor y tutor academico (Uniandes)',
      en: 'Academic mentor and tutor (Uniandes)',
    },
    detail: {
      es: 'Tutorias individuales y grupales en Python, C, JavaScript y React; estructuras de datos, logica y depuracion.',
      en: 'One-on-one and group tutoring in Python, C, JavaScript, and React; data structures, logic, and debugging.',
    },
  },
  {
    date: 'Oct. 2024 - presente',
    sortKey: 202410,
    tag: { es: 'Comunidad', en: 'Community' },
    title: { es: 'Miembro activo de SinfonIA Uniandes', en: 'Active member of SinfonIA Uniandes' },
    detail: {
      es: 'Lectura de papers, proyectos de Machine Learning y talleres de robotica, NLP y vision computacional.',
      en: 'Paper reading, Machine Learning projects, and robotics, NLP, and computer-vision workshops.',
    },
  },
  {
    date: 'Dic. 2024',
    sortKey: 202412,
    tag: { es: 'Hackathon', en: 'Hackathon' },
    title: { es: 'CaminAI - 3er lugar', en: 'CaminAI - 3rd place' },
    detail: {
      es: 'App web de accesibilidad visual con deteccion de obstaculos en tiempo real y guia por voz. 24h Hackathon Young AI Leaders Bogota, tema "AI for Good", entre +100 participantes y 20 equipos.',
      en: 'Visual-accessibility web app with real-time obstacle detection and voice guidance. 24h Young AI Leaders Bogota hackathon, "AI for Good" theme, among 100+ participants and 20 teams.',
    },
  },
  {
    date: 'Dic. 2024 - Abr. 2025',
    sortKey: 202412.5,
    tag: { es: 'Competencia', en: 'Competition' },
    title: { es: 'NexusMind - AWS AI League', en: 'NexusMind - AWS AI League' },
    detail: {
      es: 'Asistente proactivo de IA sobre Amazon Bedrock y arquitectura serverless. Top 100 de ~1000 equipos.',
      en: 'Proactive AI assistant on Amazon Bedrock with serverless architecture. Top 100 of ~1000 teams.',
    },
  },
  {
    date: 'Ene. 2025 - Jun. 2025',
    sortKey: 202501,
    tag: { es: 'Movil', en: 'Mobile' },
    title: { es: 'UniMarket (ISIS-3510)', en: 'UniMarket (ISIS-3510)' },
    detail: {
      es: 'App Android con MVVM, mensajeria en tiempo real y deteccion de campus por formula de Haversine (radio 600 m); backend NestJS y JWT por Interceptor.',
      en: 'Android app with MVVM, real-time messaging, and campus detection via the Haversine formula (600 m radius); NestJS backend and JWT via Interceptor.',
    },
  },
  {
    date: 'Mar. 2025 - May. 2025',
    sortKey: 202503,
    tag: { es: 'Robotica', en: 'Robotics' },
    title: { es: 'Planificador A* con ROS2 (ISIS-4826)', en: 'A* planner with ROS2 (ISIS-4826)' },
    detail: {
      es: 'A* sobre C-space inflado, simplificacion Theta* y nodo ROS2 con relocalizacion por LiDAR; analisis comparativo Swarm-SLAM vs Kimera-Multi.',
      en: 'A* over an inflated C-space, Theta* simplification, and a ROS2 node with LiDAR relocalization; comparative analysis of Swarm-SLAM vs Kimera-Multi.',
    },
  },
  {
    date: '2025',
    sortKey: 202505,
    tag: { es: 'Machine Learning', en: 'Machine Learning' },
    title: { es: 'Pipeline de clasificacion de texto', en: 'Text-classification pipeline' },
    detail: {
      es: 'TF-IDF con Logistic Regression y LinearSVC; correccion de overfitting y data leakage en 5 iteraciones de submission.',
      en: 'TF-IDF with Logistic Regression and LinearSVC; fixed overfitting and data leakage across 5 submission iterations.',
    },
  },
  {
    date: '2025',
    sortKey: 202506,
    tag: { es: 'Hackathon', en: 'Hackathon' },
    title: { es: 'RepoTwin (IBM Bob, lablab.ai)', en: 'RepoTwin (IBM Bob, lablab.ai)' },
    detail: {
      es: 'Propuesta de "gemelo digital" de repositorios con Shadow PR para simular el impacto de un cambio de codigo antes de implementarlo.',
      en: 'A "digital twin" for repositories with a Shadow PR that simulates the impact of a code change before implementing it.',
    },
  },
  {
    date: 'Jun. 2025 - presente',
    sortKey: 202507,
    tag: { es: 'Comunidad', en: 'Community' },
    title: {
      es: 'Miembro activo de Codelab (Uniandes)',
      en: 'Active member of Codelab (Uniandes)',
    },
    detail: {
      es: 'Proyectos colaborativos de software con mentoria de profesores y buenas practicas.',
      en: 'Collaborative software projects with faculty mentorship and best practices.',
    },
  },
  {
    date: '2026',
    sortKey: 202601,
    tag: { es: 'Investigacion', en: 'Research' },
    title: {
      es: 'BIDIC 2026, HemoVision y BacterioScope',
      en: 'BIDIC 2026, HemoVision and BacterioScope',
    },
    detail: {
      es: 'Giro de BioPatch a BacterioScope, arranque de HemoVision y propuesta de tesis de Astrid Berena Herrera.',
      en: 'Pivot from BioPatch to BacterioScope, start of HemoVision, and Astrid Berena Herrera thesis proposal.',
    },
  },
  {
    date: '05 Jul. 2026',
    sortKey: 202607,
    tag: { es: 'Certificaciones', en: 'Certifications' },
    title: {
      es: 'Cuatro certificaciones de Codigo Facilito',
      en: 'Four Codigo Facilito certifications',
    },
    detail: {
      es: 'GitHub a fondo, C Profesional, Power BI y fundamentos de SQL.',
      en: 'GitHub in depth, Professional C, Power BI, and SQL fundamentals.',
    },
  },
];

export const timelineChrono = [...timeline].sort((a, b) => a.sortKey - b.sortKey);
export const timelineReverse = [...timeline].sort((a, b) => b.sortKey - a.sortKey);
