import type { TimelineEntry } from '@/lib/types';

/** Trayectoria verificada contra jobpilot/profile. Fechas tal como figuran allí. */
export const timeline: TimelineEntry[] = [
  {
    date: { es: 'Jun. 2020 - feb. 2022', en: 'Jun 2020 - Feb 2022' },
    sortKey: 202006,
    tag: { es: 'Emprendimiento', en: 'Venture' },
    title: {
      es: 'Fundador y director de proyecto, Respira Seguro',
      en: 'Founder and project director, Respira Seguro',
    },
    detail: {
      es: 'Emprendimiento de tapabocas y productos de higiene.',
      en: 'Venture selling face masks and hygiene products.',
    },
  },
  {
    date: { es: '2023', en: '2023' },
    sortKey: 202301,
    tag: { es: 'Formación', en: 'Education' },
    title: {
      es: 'Ingreso a Ingeniería de Sistemas y Computación',
      en: 'Started Systems and Computing Engineering',
    },
    detail: {
      es: 'Universidad de los Andes, Bogotá.',
      en: 'Universidad de los Andes, Bogotá.',
    },
  },
  {
    date: { es: 'Jun. 2024 - mar. 2025', en: 'Jun 2024 - Mar 2025' },
    sortKey: 202406,
    tag: { es: 'Docencia', en: 'Teaching' },
    title: {
      es: 'Tutor académico, Universidad de los Andes',
      en: 'Academic tutor, Universidad de los Andes',
    },
    detail: {
      es: 'Tutorías en Python, C, JavaScript y React: estructuras de datos, lógica y depuración.',
      en: 'Tutoring in Python, C, JavaScript and React: data structures, logic and debugging.',
    },
  },
  {
    date: { es: 'Ene. - jun. 2025', en: 'Jan - Jun 2025' },
    sortKey: 202501,
    tag: { es: 'Curso', en: 'Coursework' },
    title: {
      es: 'UniMarket, marketplace Android para el campus',
      en: 'UniMarket, Android campus marketplace',
    },
    detail: {
      es: 'Mensajería en tiempo real, detección de campus con la fórmula de Haversine y registro de analítica sobre NestJS; JWT con patrón Interceptor y StateFlow en Jetpack Compose.',
      en: 'Real-time messaging, campus detection with the Haversine formula and analytics logging over NestJS; JWT with the Interceptor pattern and StateFlow in Jetpack Compose.',
    },
    href: 'https://github.com/ISIS3510-MobileApps-Group42-202610/group-42-general',
  },
  {
    date: { es: 'Mar. - may. 2025', en: 'Mar - May 2025' },
    sortKey: 202503,
    tag: { es: 'Curso', en: 'Coursework' },
    title: {
      es: 'Planificador de rutas A* con ROS2',
      en: 'A* path planner with ROS2',
    },
    detail: {
      es: 'A* sobre espacio de configuración inflado con simplificación Theta*, control proporcional y relocalización con LiDAR en un robot MentorPi; análisis comparativo de Swarm-SLAM y Kimera-Multi.',
      en: 'A* over an inflated configuration space with Theta* simplification, proportional control and LiDAR relocalization on a MentorPi robot; comparative analysis of Swarm-SLAM and Kimera-Multi.',
    },
  },
  {
    date: { es: 'Jun. 2025 - actual', en: 'Jun 2025 - present' },
    sortKey: 202506,
    tag: { es: 'Comunidad', en: 'Community' },
    title: {
      es: 'Líder entrante de rama y proyectos, Codelab Uniandes',
      en: 'Incoming branch and projects lead, Codelab Uniandes',
    },
    detail: {
      es: 'Proyectos colaborativos de software con mentores y profesores.',
      en: 'Collaborative software projects with mentors and faculty.',
    },
  },
  {
    date: { es: 'Ago. 2025 - jun. 2026', en: 'Aug 2025 - Jun 2026' },
    sortKey: 202508,
    tag: { es: 'Comunidad', en: 'Community' },
    title: {
      es: 'Miembro activo, SinfonIA Uniandes',
      en: 'Active member, SinfonIA Uniandes',
    },
    detail: {
      es: 'Comunidad de inteligencia artificial: sesiones técnicas, lectura de artículos y talleres de machine learning, NLP y visión por computador.',
      en: 'Artificial intelligence community: technical sessions, paper reading and workshops on machine learning, NLP and computer vision.',
    },
  },
  {
    date: { es: 'Dic. 2025', en: 'Dec 2025' },
    sortKey: 202512,
    tag: { es: 'Hackathon', en: 'Hackathon' },
    title: {
      es: 'CaminAI, tercer lugar en Young AI Leaders Bogotá',
      en: 'CaminAI, third place at Young AI Leaders Bogotá',
    },
    detail: {
      es: 'App de guía por voz para personas con discapacidad visual. Tercer lugar entre 20 equipos.',
      en: 'Voice guidance app for people with visual impairment. Third place among 20 teams.',
    },
    href: 'https://github.com/EstebanHerna/CAMIN_AI',
  },
  {
    date: { es: 'Dic. 2025 - mar. 2026', en: 'Dec 2025 - Mar 2026' },
    sortKey: 202512.5,
    tag: { es: 'Competencia', en: 'Competition' },
    title: {
      es: 'NexusMind, semifinalista en AWS 10,000 AIdeas',
      en: 'NexusMind, semifinalist in AWS 10,000 AIdeas',
    },
    detail: {
      es: 'Líder del equipo. Asistente con Amazon Bedrock y backend serverless.',
      en: 'Team lead. Assistant on Amazon Bedrock with a serverless backend.',
    },
    href: 'https://builder.aws.com/content/38SQ3tZeTgflU2LA1ntBJ9fMjHS/aideas-nexusmind-the-cognitive-load-balancer-for-modern-work',
  },
  {
    date: { es: '2026', en: '2026' },
    sortKey: 202601,
    tag: { es: 'Investigación', en: 'Research' },
    title: {
      es: 'BacterioScope, seleccionado para el Biodiscovery Design Innovation Challenge 2026',
      en: 'BacterioScope, selected for the Biodiscovery Design Innovation Challenge 2026',
    },
    detail: {
      es: 'Fundador y líder de un equipo de 4 personas.',
      en: 'Founder and lead of a team of 4.',
    },
    href: 'https://github.com/EstebanHerna/bacterioscope',
  },
  {
    date: { es: '2026', en: '2026' },
    sortKey: 202602,
    tag: { es: 'Formación', en: 'Education' },
    title: {
      es: 'Electivas de la Maestría en Ingeniería de Software (MISO)',
      en: "Master's in Software Engineering (MISO) electives",
    },
    detail: {
      es: 'Diseño y Construcción de APIs, y DevOps, cursadas durante el pregrado.',
      en: 'API Design and Construction, and DevOps, taken during the undergraduate degree.',
    },
  },
  {
    date: { es: 'Abr. 2026 - actual', en: 'Apr 2026 - present' },
    sortKey: 202604,
    tag: { es: 'Competencia', en: 'Competition' },
    title: { es: 'Cofundador y CTO, Altus', en: 'Co-founder and CTO, Altus' },
    detail: {
      es: 'Concepto de scoring crediticio con datos alternativos. Participé con el equipo en el Cornell EMC2 Mark Mobius Pitch Competition 2026.',
      en: 'Alternative-data credit scoring concept. Took part with the team in the Cornell EMC2 Mark Mobius Pitch Competition 2026.',
    },
    href: 'https://github.com/EstebanHerna/altusmaintain',
  },
  {
    date: { es: 'Ago. 2026 - actual', en: 'Aug 2026 - present' },
    sortKey: 202608,
    tag: { es: 'Práctica', en: 'Internship' },
    title: {
      es: 'Practicante de Ingeniería de Sistemas',
      en: 'Systems Engineering intern',
    },
    detail: {
      es: 'Vinculación formativa en el Ministerio de Salud y Protección Social. Allí construí el flujo reproducible de salud ambiental, que también es mi proyecto de grado.',
      en: 'Internship at the Colombian Ministry of Health and Social Protection. There I built the reproducible environmental health workflow, which is also my undergraduate thesis.',
    },
  },
  {
    date: { es: 'Sep. - oct. 2026', en: 'Sep - Oct 2026' },
    sortKey: 202609,
    tag: { es: 'Certificación', en: 'Certification' },
    title: {
      es: 'Dos certificados del NVIDIA Deep Learning Institute',
      en: 'Two NVIDIA Deep Learning Institute certificates',
    },
    detail: {
      es: 'Rapid Application Development with Large Language Models y Applications of AI for Anomaly Detection.',
      en: 'Rapid Application Development with Large Language Models and Applications of AI for Anomaly Detection.',
    },
  },
  {
    date: { es: 'Sep. - oct. 2026', en: 'Sep - Oct 2026' },
    sortKey: 202609.5,
    tag: { es: 'Hackathon', en: 'Hackathon' },
    title: { es: 'KingsCode, AI Week 2026', en: 'KingsCode, AI Week 2026' },
    detail: {
      es: 'Sistema RAG sobre derecho colombiano con Qwen3-8B y verificación de citas.',
      en: 'RAG system on Colombian law with Qwen3-8B and citation checks.',
    },
    href: 'https://github.com/IngSeb0/KingsCodeNvidia',
  },
  {
    date: { es: '2025 - 2026', en: '2025 - 2026' },
    sortKey: 202510,
    tag: { es: 'Hackathon', en: 'Hackathon' },
    title: { es: 'Otros hackatones', en: 'Other hackathons' },
    detail: {
      es: 'RepoTwin (IBM Bob, lablab.ai), Nebius x NVIDIA Global AI Hackathon 2026 y Nodi x Lovable.',
      en: 'RepoTwin (IBM Bob, lablab.ai), Nebius x NVIDIA Global AI Hackathon 2026 and Nodi x Lovable.',
    },
  },
];

export const timelineChrono = [...timeline].sort((a, b) => a.sortKey - b.sortKey);
export const timelineReverse = [...timeline].sort((a, b) => b.sortKey - a.sortKey);
