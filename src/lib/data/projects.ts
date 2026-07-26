import type { Project } from '@/lib/types';

/**
 * Contenido verificado. Sin metricas inventadas.
 * Reglas fijas:
 *  - BacterioScope: investigacion en curso, nunca producto terminado. Solo Paula Becerra citada.
 *  - HemoVision: disclaimer de datos sinteticos intacto y con el mismo peso que las metricas.
 *  - Altus: venture real; separa lo construido (MVP) de lo proyectado (mercado/finanzas) via disclaimer.
 *  - repoUrl null => no se renderiza boton "ver repositorio".
 */
export const projects: Project[] = [
  {
    slug: 'bacterioscope',
    name: 'BacterioScope',
    order: 1,
    featured: true,
    timeframe: '2026 - presente',
    status: {
      kind: 'research',
      label: { es: 'Investigacion en curso', en: 'Ongoing research' },
    },
    tagline: {
      es: 'Vision por computador para medir halos de inhibicion en antibiogramas Kirby-Bauer, aplicada a resistencia antimicrobiana.',
      en: 'Computer vision to measure inhibition zones in Kirby-Bauer antibiograms, applied to antimicrobial resistance.',
    },
    role: {
      es: 'Lider de sistemas e IA.',
      en: 'Systems and AI lead.',
    },
    stack: ['Computer Vision', 'Python', 'Kirby-Bauer', 'Investigacion aplicada'],
    problem: {
      es: 'La lectura manual de antibiogramas por difusion en disco (Kirby-Bauer) para medir halos de inhibicion es lenta y presenta variabilidad entre operadores. El proyecto explora vision por computador para asistir esa medicion en el contexto de resistencia antimicrobiana.',
      en: 'Manual reading of disk-diffusion antibiograms (Kirby-Bauer) to measure inhibition zones is slow and shows operator-to-operator variability. The project explores computer vision to assist that measurement in the antimicrobial-resistance context.',
    },
    built: {
      es: 'Paper cientifico en redaccion (espanol, APA 7). El proyecto nacio del BIDIC 2026 (Biodiscovery Design Innovation Challenge, Uniandes / Nodo de Innovacion), tras descartar la propuesta original (BioPatch) por inelegibilidad. Un piloto esta planeado en la Fundacion Santa Fe de Bogota; ese piloto se describe como planeado, sin comprometer a la institucion.',
      en: 'Scientific paper in progress (Spanish, APA 7). The project emerged from BIDIC 2026 (Biodiscovery Design Innovation Challenge, Uniandes / Innovation Node), after the original proposal (BioPatch) was ruled ineligible. A pilot is planned at Fundacion Santa Fe de Bogota; that pilot is described as planned, without committing the institution.',
    },
    pending: {
      es: 'Captura de datos reales y medicion de desempeno. No existen metricas clinicas todavia, y eso se declara de forma explicita: es investigacion, no un producto validado.',
      en: 'Real data capture and performance measurement. No clinical metrics exist yet, and that is stated explicitly: this is research, not a validated product.',
    },
    collaborators: [
      {
        name: 'Paula Becerra',
        role: { es: 'Microbiologia (sub-lider).', en: 'Microbiology (co-lead).' },
      },
    ],
    repoUrl: 'https://github.com/EstebanHerna/bacterioscope',
  },
  {
    slug: 'hemovision',
    name: 'HemoVision',
    order: 2,
    featured: true,
    timeframe: '2026',
    status: {
      kind: 'shipped',
      label: {
        es: 'Pipeline validado (datos sinteticos)',
        en: 'Validated pipeline (synthetic data)',
      },
    },
    tagline: {
      es: 'Deteccion visual temprana de crecimiento bacteriano en hemocultivos por analisis de turbidez, textura GLCM y desplazamiento de tono en series temporales.',
      en: 'Early visual detection of bacterial growth in blood cultures via turbidity, GLCM texture, and hue-shift analysis across time-series photographs.',
    },
    role: {
      es: 'Autor unico: pipeline de vision, servicio, pruebas, CI y seguridad.',
      en: 'Sole author: vision pipeline, service, tests, CI, and security.',
    },
    stack: ['Python', 'scikit-learn', 'FastAPI', 'Streamlit', 'Docker', 'CodeQL'],
    problem: {
      es: 'Detectar de forma temprana el crecimiento bacteriano en hemocultivos a partir de fotografias seriadas, midiendo turbidez, textura (GLCM) y desplazamiento de tono a lo largo del tiempo.',
      en: 'Detect bacterial growth in blood cultures early from serial photographs, measuring turbidity, texture (GLCM), and hue shift over time.',
    },
    built: {
      es: 'Clasificador Random Forest / SVM, servicio FastAPI y demo en Streamlit. Validado end-to-end sobre un dataset sintetico de 40 viales, con accuracy 1.000 en holdout y validacion cruzada 5-fold. Ingenieria verificable: cobertura de pruebas del 97%; CI con ruff, mypy (Python 3.10 a 3.12), bandit, pip-audit y CodeQL; rate limiting de 30 req/min por IP; CORS explicito; cabeceras de seguridad HTTP; SBOM CycloneDX; historial de git escaneado con gitleaks sin hallazgos; fuzzing con hypothesis que encontro y cerro dos rutas de error reales.',
      en: 'Random Forest / SVM classifier, FastAPI service, and Streamlit demo. Validated end-to-end on a synthetic dataset of 40 vials, with accuracy 1.000 on holdout and 5-fold cross-validation. Verifiable engineering: 97% test coverage; CI with ruff, mypy (Python 3.10-3.12), bandit, pip-audit, and CodeQL; 30 req/min per-IP rate limiting; explicit CORS; HTTP security headers; CycloneDX SBOM; git history scanned with gitleaks with no findings; hypothesis fuzzing that found and closed two real error paths.',
    },
    pending: {
      es: 'Fase 1: captura real de laboratorio con cepas ATCC. El protocolo experimental ya esta redactado y la ejecucion esta pendiente.',
      en: 'Phase 1: real lab capture with ATCC strains. The experimental protocol is already written and execution is pending.',
    },
    metrics: [
      {
        value: '1.000',
        label: { es: 'Accuracy (holdout y CV 5-fold)', en: 'Accuracy (holdout and 5-fold CV)' },
      },
      { value: '97%', label: { es: 'Cobertura de pruebas', en: 'Test coverage' } },
      { value: '30/min', label: { es: 'Rate limit por IP', en: 'Per-IP rate limit' } },
      { value: '40', label: { es: 'Viales (dataset sintetico)', en: 'Vials (synthetic dataset)' } },
    ],
    disclaimer: {
      es: 'El accuracy de 1.000 es esperable porque las clases del dataset sintetico son separables por construccion. NO representa desempeno clinico. La validacion con laboratorio real (Fase 1, cepas ATCC) tiene protocolo redactado y esta pendiente de ejecucion.',
      en: 'The 1.000 accuracy is expected because the synthetic dataset classes are separable by construction. It does NOT represent clinical performance. Real-lab validation (Phase 1, ATCC strains) has a written protocol and is pending execution.',
    },
    repoUrl: 'https://github.com/EstebanHerna/hemovision',
    links: [
      {
        label: { es: 'Ver RESULTS.md', en: 'View RESULTS.md' },
        href: 'https://github.com/EstebanHerna/hemovision/blob/main/RESULTS.md',
      },
    ],
  },
  {
    slug: 'nexusmind',
    name: 'NexusMind',
    order: 3,
    featured: false,
    timeframe: 'Dic. 2024 - Abr. 2025',
    status: {
      kind: 'competition',
      label: { es: 'AWS AI League - Top 100 de ~1000', en: 'AWS AI League - Top 100 of ~1000' },
    },
    tagline: {
      es: 'Asistente proactivo de IA que sintetiza contexto de Gmail y Google Calendar para entregar briefings automaticos antes de cada reunion.',
      en: 'Proactive AI assistant that synthesizes Gmail and Google Calendar context to deliver automatic briefings before each meeting.',
    },
    role: {
      es: 'Diseno e implementacion del frontend e integracion; arquitectura serverless.',
      en: 'Frontend design and implementation plus integration; serverless architecture.',
    },
    stack: ['React', 'Amazon Bedrock', 'AWS Lambda', 'DynamoDB', 'EventBridge'],
    problem: {
      es: 'Reducir la preparacion manual de reuniones sintetizando automaticamente el contexto disperso en correo y calendario.',
      en: 'Reduce manual meeting prep by automatically synthesizing context scattered across email and calendar.',
    },
    built: {
      es: 'Frontend en React e integracion con Amazon Bedrock (Claude 3 Haiku). Arquitectura sobre 9 funciones AWS Lambda, DynamoDB y EventBridge, desplegada en AWS us-east-1. Se resolvieron errores criticos de persistencia en DynamoDB. Resultado: Top 100 de ~1000 equipos en AWS AI League (Builders 10,000 AIdeas).',
      en: 'React frontend and Amazon Bedrock (Claude 3 Haiku) integration. Architecture over 9 AWS Lambda functions, DynamoDB, and EventBridge, deployed in AWS us-east-1. Critical DynamoDB persistence bugs were resolved. Result: Top 100 of ~1000 teams in AWS AI League (Builders 10,000 AIdeas).',
    },
    pending: {
      es: 'Proyecto de competencia cerrado. Sirve como evidencia de arquitectura cloud serverless e IA generativa aplicada.',
      en: 'Closed competition project. It stands as evidence of serverless cloud architecture and applied generative AI.',
    },
    repoUrl: 'https://github.com/EstebanHerna/Aws_idea',
  },
  {
    slug: 'altus',
    name: 'Altus',
    order: 4,
    featured: false,
    timeframe: '2025 - presente',
    status: {
      kind: 'shipped',
      label: { es: 'MVP desplegado - venture activo', en: 'Deployed MVP - active venture' },
    },
    tagline: {
      es: 'API de inteligencia crediticia que da identidad de credito a los adultos no bancarizados de Latinoamerica a partir de datos alternativos.',
      en: 'Credit-intelligence API that gives a credit identity to unbanked adults in Latin America from alternative data.',
    },
    role: {
      es: 'Cofundador y CTO: arquitectura, modelos de ML e infraestructura serverless en AWS.',
      en: 'Co-founder and CTO: architecture, ML models, and serverless AWS infrastructure.',
    },
    stack: ['REST API', 'AWS Lambda', 'Machine Learning', 'Python', 'Node.js'],
    problem: {
      es: 'Los buros tradicionales exigen historial crediticio previo para generar un score, dejando fuera a unos 160 millones de adultos en LATAM sin historial formal (trabajadores informales, primeros prestatarios). Las fintechs terminan sobre-rechazando clientes solventes o asumiendo perdidas.',
      en: 'Traditional bureaus require prior credit history to produce a score, excluding roughly 160 million adults in LATAM with no formal history (informal workers, first-time borrowers). Fintechs end up over-rejecting solvent customers or absorbing losses.',
    },
    built: {
      es: 'MVP de un motor de scoring que consume datos alternativos (movil, servicios, e-commerce, telecom y senales conductuales) y devuelve por API un score, nivel de riesgo, factores explicables y un flag de fraude. Validacion interna sobre ~1,200 perfiles con ~78% de precision frente a un baseline de buro (~61%), y un dataset propietario de ~8,500 perfiles con un laboratorio de investigacion de Uniandes. Arquitectura serverless en AWS Lambda. Dos cartas de intencion (LOI) de piloto y carta de apoyo de iNNpulsa Colombia; seleccionado para el Cornell EMC2 Mark Mobius Pitch 2026.',
      en: 'MVP of a scoring engine that ingests alternative data (mobile, utilities, e-commerce, telecom, and behavioral signals) and returns via API a score, risk level, explainable factors, and a fraud flag. Internal validation on ~1,200 profiles with ~78% accuracy against a bureau baseline (~61%), plus a proprietary dataset of ~8,500 profiles with a Uniandes research lab. Serverless architecture on AWS Lambda. Two pilot letters of intent (LOI) and a support letter from iNNpulsa Colombia; selected for the Cornell EMC2 Mark Mobius Pitch 2026.',
    },
    pending: {
      es: 'Validacion independiente y en produccion del modelo, con la metodologia y el conjunto de prueba documentados. Cumplimiento de privacidad y habeas data (SIC Colombia) por tratar datos personales y crediticios. Formalizar pilotos y equipo. Las proyecciones de mercado y financieras del pitch son estimaciones, no resultados.',
      en: 'Independent and production validation of the model, with documented methodology and test set. Privacy and data-protection compliance (SIC Colombia) since it handles personal and credit data. Formalizing pilots and team. The pitch market and financial projections are estimates, not results.',
    },
    metrics: [
      {
        value: '~1,200',
        label: { es: 'Perfiles evaluados (MVP)', en: 'Profiles evaluated (MVP)' },
      },
      {
        value: '~78%',
        label: {
          es: 'Precision en validacion interna (vs ~61% baseline de buro)',
          en: 'Accuracy in internal validation (vs ~61% bureau baseline)',
        },
      },
      { value: '2', label: { es: 'Cartas de intencion de piloto', en: 'Pilot letters of intent' } },
      {
        value: '~8,500',
        label: { es: 'Perfiles en dataset propietario', en: 'Profiles in proprietary dataset' },
      },
    ],
    disclaimer: {
      es: 'Las cifras de traccion (perfiles y ~78%) son resultados de etapa MVP en validacion interna; su base de prueba aun debe documentarse de forma auditable. El tamano de mercado, las proyecciones financieras y ratios como LTV:CAC son proyecciones de pitch, NO resultados realizados. Altus trata datos personales y crediticios, por lo que el cumplimiento de privacidad es un requisito activo, no opcional.',
      en: 'Traction figures (profiles and ~78%) are MVP-stage internal-validation results; their test basis still needs auditable documentation. Market size, financial projections, and ratios like LTV:CAC are pitch projections, NOT realized results. Altus handles personal and credit data, so privacy compliance is an active requirement, not optional.',
    },
    repoUrl: 'https://github.com/EstebanHerna/altusmaintain',
    links: [
      {
        label: { es: 'Ver el pitch (sitio)', en: 'View the pitch (site)' },
        href: 'https://altusmaintain.lovable.app/',
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const projectsByOrder = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
