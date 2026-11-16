import type { Project } from '@/lib/types';

/**
 * Contenido verificado contra jobpilot/profile. Sin cifras inventadas.
 * Reglas fijas (las cubre tests/content.test.ts):
 *  - Salud ambiental: se presenta como proyecto de grado; la entidad va en el detalle.
 *  - BacterioScope: investigación en curso; la brecha de exactitud se declara. Solo Paula Becerra citada.
 *  - HemoVision: aclaración de datos sintéticos con el mismo peso que las cifras.
 *  - Altus: concepto de competencia. Sin cifras, sin cartas, no desplegado; participó (no fue seleccionado) en Cornell EMC2.
 *  - NexusMind y MISO: en pasado y sin enlaces en vivo (la cuenta de AWS se cerró).
 *  - NexusMind: semifinalista en AWS 10,000 AIdeas (dic. 2025 - mar. 2026).
 */
export const projects: Project[] = [
  {
    slug: 'salud-ambiental',
    name: {
      es: 'Flujo reproducible de salud ambiental',
      en: 'Reproducible environmental health workflow',
    },
    order: 1,
    timeframe: { es: 'Ago. 2026 - actual', en: 'Aug 2026 - present' },
    status: {
      kind: 'thesis',
      label: { es: 'Proyecto de grado en curso', en: 'Undergraduate thesis in progress' },
    },
    tagline: {
      es: 'Flujo de datos con Apache Airflow que integra cuatro fuentes oficiales y produce el análisis de salud ambiental del agua para los 1.121 municipios de Colombia en menos de 17 minutos.',
      en: "Apache Airflow data workflow that integrates four official sources and produces the drinking-water environmental health analysis for Colombia's 1,121 municipalities in under 17 minutes.",
    },
    role: {
      es: 'Autor. Proyecto de grado en la Universidad de los Andes, desarrollado durante la práctica en el Ministerio de Salud y Protección Social.',
      en: 'Author. Undergraduate thesis at Universidad de los Andes, developed during an internship at the Colombian Ministry of Health and Social Protection.',
    },
    stack: [
      'Python',
      'Apache Airflow',
      'pandas',
      'GeoPandas',
      'PySAL',
      'SciPy',
      'statsmodels',
      'pytest',
      'WSL2',
    ],
    problem: {
      es: 'El análisis de situación de salud ambiental del componente agua se hacía a mano y tomaba semanas. Los datos los publican cuatro entidades en formatos distintos: vigilancia epidemiológica (INS-SIVIGILA), calidad del agua (IRCA), coberturas de acueducto y alcantarillado, y pobreza y población (DANE). No quedaba registro de qué archivos se usaron ni forma de reconstruir una cifra ya publicada.',
      en: 'The environmental health situation analysis for the water component was done by hand and took weeks. Four agencies publish the data in different formats: epidemiological surveillance (INS-SIVIGILA), water quality (IRCA), water and sewer coverage, and poverty and population (DANE). There was no record of which files were used and no way to rebuild a published figure.',
    },
    built: {
      es: 'Un flujo en Python orquestado con Apache Airflow. Integra las cuatro fuentes en una tabla por municipio y año y calcula tasas por 100.000 habitantes sobre una sola población oficial. Cada fuente tiene reglas de validación, cada archivo deja su huella y cada ejecución queda registrada, de modo que cualquier cifra publicada se puede reconstruir y cada entidad recibe la lista de errores de sus datos. Sobre esa tabla corre el análisis descriptivo, de correlación y espacial (GeoPandas, PySAL). El flujo está cubierto con pytest y se entregó con ficha técnica y manual de usuario.',
      en: 'A Python workflow orchestrated with Apache Airflow. It joins the four sources into one table per municipality and year and computes rates per 100,000 inhabitants over a single official population. Every source has validation rules, every file leaves a fingerprint and every run is logged, so any published figure can be rebuilt and each agency receives the list of errors in its data. Descriptive, correlation and spatial analysis (GeoPandas, PySAL) run on that table. The workflow is covered with pytest and was delivered with a technical sheet and a user manual.',
    },
    pending: {
      es: 'El repositorio es privado y los datos de la entidad no son públicos, así que aquí se muestran las cifras de ejecución y no los resultados del análisis. La sustentación del proyecto de grado es en 2027-1.',
      en: "The repository is private and the agency's data is not public, so this page shows run figures and not analysis results. The thesis defense is in the first term of 2027.",
    },
    pipeline: {
      title: {
        es: 'Etapas del flujo, de los archivos fuente al análisis',
        en: 'Workflow stages, from source files to analysis',
      },
      sources: [
        {
          name: 'INS-SIVIGILA',
          what: { es: 'Vigilancia epidemiológica', en: 'Epidemiological surveillance' },
        },
        { name: 'IRCA', what: { es: 'Calidad del agua', en: 'Water quality' } },
        {
          name: 'Coberturas',
          what: { es: 'Acueducto y alcantarillado', en: 'Water and sewer service' },
        },
        { name: 'DANE', what: { es: 'Pobreza y población', en: 'Poverty and population' } },
      ],
      stages: [
        {
          name: { es: 'Validación por fuente', en: 'Per-source validation' },
          detail: {
            es: 'Cada archivo pasa las reglas de su fuente. Cada entidad recibe la lista de errores de sus datos.',
            en: "Every file goes through its source's rules. Each agency receives the list of errors in its data.",
          },
        },
        {
          name: { es: 'Trazabilidad', en: 'Traceability' },
          detail: {
            es: 'Se guarda la huella de cada archivo y el registro de cada ejecución.',
            en: 'The fingerprint of every file and the log of every run are stored.',
          },
        },
        {
          name: { es: 'Integración', en: 'Integration' },
          detail: {
            es: 'Las cuatro fuentes se unen en una tabla por municipio y año.',
            en: 'The four sources are joined into one table per municipality and year.',
          },
        },
        {
          name: { es: 'Tasas', en: 'Rates' },
          detail: {
            es: 'Tasas por 100.000 habitantes sobre una sola población oficial.',
            en: 'Rates per 100,000 inhabitants over a single official population.',
          },
        },
        {
          name: { es: 'Análisis', en: 'Analysis' },
          detail: {
            es: 'Descriptivo, de correlación y espacial (GeoPandas, PySAL).',
            en: 'Descriptive, correlation and spatial (GeoPandas, PySAL).',
          },
        },
      ],
      output: {
        es: '1.121 municipios analizados en menos de 17 minutos, con cada cifra reconstruible.',
        en: '1,121 municipalities analyzed in under 17 minutes, with every figure rebuildable.',
      },
      source: {
        es: 'descripción del flujo en el proyecto de grado, 2026.',
        en: 'workflow description in the undergraduate thesis, 2026.',
      },
      note: {
        es: 'Apache Airflow orquesta las etapas en este orden. El diagrama resume el flujo; no muestra cada tarea.',
        en: 'Apache Airflow orchestrates the stages in this order. The diagram summarizes the workflow; it does not show every task.',
      },
    },
    metrics: [
      {
        value: { es: '1.121', en: '1,121' },
        label: {
          es: 'Municipios procesados por ejecución',
          en: 'Municipalities processed per run',
        },
        note: {
          es: 'Todos los municipios del país, en una tabla por municipio y año.',
          en: 'Every municipality in the country, in one table per municipality and year.',
        },
      },
      {
        value: { es: '< 17 min', en: '< 17 min' },
        label: { es: 'Duración de la ejecución nacional', en: 'Full national run time' },
        note: {
          es: 'El mismo análisis hecho a mano tomaba semanas.',
          en: 'The same analysis done by hand took weeks.',
        },
      },
      {
        value: { es: '4', en: '4' },
        label: { es: 'Entidades fuente integradas', en: 'Source agencies integrated' },
        note: {
          es: 'INS-SIVIGILA, IRCA, coberturas de acueducto y alcantarillado, DANE.',
          en: 'INS-SIVIGILA, IRCA, water and sewer coverage, DANE.',
        },
      },
      {
        value: { es: '7 / 6', en: '7 / 6' },
        label: {
          es: 'Municipios y departamentos verificados',
          en: 'Municipalities and departments checked',
        },
        note: {
          es: 'Resultados comparados contra un cálculo independiente.',
          en: 'Results compared against an independent calculation.',
        },
      },
      {
        value: { es: 'más de 11,8 a 8,71 GB', en: 'over 11.8 to 8.71 GB' },
        label: {
          es: 'Pico de memoria del análisis espacial',
          en: 'Peak memory of the spatial analysis',
        },
        note: {
          es: 'Ajustando el paralelismo, sin cambiar los resultados.',
          en: 'By tuning parallelism, with unchanged results.',
        },
      },
    ],
    metricsSource: {
      es: 'registros de ejecución del flujo, 2026. Repositorio privado.',
      en: 'workflow run logs, 2026. Private repository.',
    },
    collaborators: [
      {
        name: 'Aurelio Vivas',
        role: {
          es: 'Asesor (Argonne National Laboratory)',
          en: 'Advisor (Argonne National Laboratory)',
        },
      },
      { name: 'Harold Castro', role: { es: 'Asesor (Uniandes)', en: 'Advisor (Uniandes)' } },
    ],
    repoUrl: null,
  },
  {
    slug: 'bacterioscope',
    name: { es: 'BacterioScope', en: 'BacterioScope' },
    order: 2,
    timeframe: { es: '2026 - actual', en: '2026 - present' },
    status: {
      kind: 'research',
      label: { es: 'Investigación en curso', en: 'Ongoing research' },
    },
    tagline: {
      es: 'Sistema de código abierto que, a partir de la foto de un antibiograma Kirby-Bauer, mide cada zona de inhibición y entrega el reporte de sensibilidad.',
      en: 'Open-source system that takes a photo of a Kirby-Bauer antibiogram, measures each inhibition zone and returns the susceptibility report.',
    },
    role: {
      es: 'Fundador y líder del proyecto. Equipo de 4 personas: microbiología, interfaz y datos, y una asesora docente.',
      en: 'Founder and project lead. Team of 4: microbiology, interface and data, and a faculty advisor.',
    },
    stack: ['Python', 'OpenCV', 'YOLOv8', 'FastAPI', 'Streamlit', 'Docker', 'GitHub Actions'],
    problem: {
      es: 'Leer a mano los antibiogramas por difusión en disco (Kirby-Bauer) es lento y cambia de un operador a otro. De esa lectura depende saber si una bacteria es sensible o resistente a un antibiótico.',
      en: 'Reading disk-diffusion antibiograms (Kirby-Bauer) by hand is slow and varies from one operator to the next. That reading decides whether a bacterium is susceptible or resistant to an antibiotic.',
    },
    built: {
      es: 'Un sistema que recibe la foto de la placa, mide cada zona de inhibición con visión por computador (OpenCV) y entrega el reporte S/I/R según CLSI M100 (2023). Tiene una API en FastAPI, una demo en Streamlit, imagen de Docker e integración continua con ruff, mypy, bandit y gitleaks. Se validó contra 225 aislados clínicos de un conjunto público (Dryad/UZH) con un módulo que sigue la norma ISO 20776-2. Fue seleccionado para el Biodiscovery Design Innovation Challenge 2026.',
      en: 'A system that takes the plate photo, measures each inhibition zone with computer vision (OpenCV) and returns the S/I/R report per CLSI M100 (2023). It has a FastAPI service, a Streamlit demo, a Docker image and continuous integration with ruff, mypy, bandit and gitleaks. It was validated against 225 clinical isolates from a public dataset (Dryad/UZH) with a module that follows ISO 20776-2. It was selected for the Biodiscovery Design Innovation Challenge 2026.',
    },
    pending: {
      es: 'La exactitud todavía no alcanza la meta de 90%. La brecha está documentada en el repositorio con sus cifras y no se presenta como desempeño clínico: es investigación, no un producto validado.',
      en: 'Accuracy does not yet reach the 90% target. The gap is documented in the repository with its figures and is not presented as clinical performance: this is research, not a validated product.',
    },
    collaborators: [
      {
        name: 'Paula Becerra',
        role: { es: 'Microbiología (sublíder)', en: 'Microbiology (co-lead)' },
      },
    ],
    repoUrl: 'https://github.com/EstebanHerna/bacterioscope',
  },
  {
    slug: 'kingscode',
    name: { es: 'KingsCode', en: 'KingsCode' },
    order: 3,
    timeframe: { es: 'Sep. - oct. 2026', en: 'Sep - Oct 2026' },
    status: {
      kind: 'competition',
      label: { es: 'Hackathon AI Week 2026', en: 'AI Week 2026 hackathon' },
    },
    tagline: {
      es: 'Preguntas y respuestas sobre derecho colombiano con un modelo abierto de 8.000 millones de parámetros y verificación de cada norma citada.',
      en: 'Question answering on Colombian law with an open 8-billion-parameter model and a check on every cited law.',
    },
    role: {
      es: 'Coautor, equipo de 2: corpus, recuperación y verificación.',
      en: 'Co-author, team of 2: corpus, retrieval and verification.',
    },
    stack: ['Python', 'Qwen3-8B', 'RAG', 'BM25', 'Embeddings'],
    problem: {
      es: 'Un modelo de lenguaje pequeño que responde sobre derecho tiende a citar normas que no existen o que no respaldan la respuesta. El reto del hackathon era responder bien con un modelo abierto y un corpus propio.',
      en: 'A small language model answering legal questions tends to cite laws that do not exist or do not support the answer. The hackathon challenge was to answer well with an open model and an own corpus.',
    },
    built: {
      es: 'Un sistema RAG con Qwen3-8B sobre un corpus propio de 172 documentos oficiales. La búsqueda es híbrida (BM25 y embeddings), un grafo normativo relaciona las normas entre sí y un verificador elimina toda norma citada que no tenga respaldo en los pasajes recuperados.',
      en: 'A RAG system with Qwen3-8B over an own corpus of 172 official documents. Retrieval is hybrid (BM25 and embeddings), a graph links laws to each other and a verifier removes every cited law that is not backed by the retrieved passages.',
    },
    pending: {
      es: 'El puntaje corresponde a las preguntas de muestra del hackathon, no al resultado oficial de la competencia.',
      en: 'The score is for the hackathon sample questions, not the official competition result.',
    },
    metrics: [
      {
        value: { es: '26,6 a ~39 / 50', en: '26.6 to ~39 / 50' },
        label: { es: 'Puntaje en las preguntas de muestra', en: 'Score on the sample questions' },
        note: {
          es: 'Antes y después de la búsqueda híbrida, el grafo y el verificador.',
          en: 'Before and after hybrid retrieval, the graph and the verifier.',
        },
      },
      {
        value: { es: '172', en: '172' },
        label: { es: 'Documentos oficiales en el corpus', en: 'Official documents in the corpus' },
        note: {
          es: 'Reunidos por el equipo a partir de fuentes oficiales.',
          en: 'Gathered by the team from official sources.',
        },
      },
    ],
    metricsSource: {
      es: 'evaluación del equipo sobre las preguntas de muestra, 2026.',
      en: "the team's evaluation on the sample questions, 2026.",
    },
    collaborators: [
      {
        name: 'Luis Sebastián Contreras',
        role: { es: 'Coautor', en: 'Co-author' },
      },
    ],
    repoUrl: 'https://github.com/IngSeb0/KingsCodeNvidia',
  },
  {
    slug: 'nexusmind',
    name: { es: 'NexusMind', en: 'NexusMind' },
    order: 4,
    timeframe: { es: 'Dic. 2025 - mar. 2026', en: 'Dec 2025 - Mar 2026' },
    status: {
      kind: 'competition',
      label: { es: 'Semifinalista, AWS 10,000 AIdeas', en: 'Semifinalist, AWS 10,000 AIdeas' },
    },
    tagline: {
      es: 'Asistente que arma un resumen antes de cada reunión a partir del correo y el calendario.',
      en: 'Assistant that builds a briefing before each meeting from email and calendar.',
    },
    role: { es: 'Líder del equipo.', en: 'Team lead.' },
    stack: [
      'Amazon Bedrock',
      'AWS Lambda',
      'Amazon DynamoDB',
      'Amazon EventBridge',
      'API Gateway',
      'React',
    ],
    problem: {
      es: 'Preparar una reunión exige buscar a mano el contexto disperso entre correos y eventos del calendario.',
      en: 'Preparing for a meeting means manually gathering context scattered across emails and calendar events.',
    },
    built: {
      es: 'Un sistema que leía Gmail y Google Calendar y generaba el resumen previo a cada reunión con Amazon Bedrock (Claude 3 Haiku). El backend era serverless: 9 funciones Lambda con EventBridge, DynamoDB y API Gateway. El frontend se hizo en React.',
      en: 'A system that read Gmail and Google Calendar and generated the pre-meeting briefing with Amazon Bedrock (Claude 3 Haiku). The backend was serverless: 9 Lambda functions with EventBridge, DynamoDB and API Gateway. The frontend was built in React.',
    },
    pending: {
      es: 'Proyecto de competencia cerrado. Llegó a semifinales; no tuvo usuarios en producción.',
      en: 'Closed competition project. It reached the semifinals; it had no production users.',
    },
    repoUrl: 'https://github.com/EstebanHerna/Aws_idea',
    links: [
      {
        label: { es: 'Artículo en AWS Builder Center', en: 'Article on AWS Builder Center' },
        href: 'https://builder.aws.com/content/38SQ3tZeTgflU2LA1ntBJ9fMjHS/aideas-nexusmind-the-cognitive-load-balancer-for-modern-work',
      },
    ],
  },
  {
    slug: 'altus',
    name: { es: 'Altus', en: 'Altus' },
    order: 5,
    timeframe: { es: 'Abr. 2026 - actual', en: 'Apr 2026 - present' },
    status: {
      kind: 'competition',
      label: { es: 'Concepto, proyecto de competencia', en: 'Concept, competition project' },
    },
    tagline: {
      es: 'Concepto de una API de scoring crediticio que usaría datos alternativos para evaluar a personas sin historial en los burós.',
      en: 'Concept for a credit scoring API that would use alternative data to assess people with no bureau history.',
    },
    role: { es: 'Cofundador y CTO.', en: 'Co-founder and CTO.' },
    stack: [],
    problem: {
      es: 'Los burós necesitan historial crediticio para calcular un puntaje. Quien nunca ha tenido crédito formal queda sin evaluación, aunque pague a tiempo sus servicios.',
      en: 'Bureaus need credit history to compute a score. Someone who has never had formal credit goes unassessed, even if they pay their bills on time.',
    },
    built: {
      es: 'Todavía un concepto, no un producto. La propuesta es una API que recibe datos alternativos (móviles, servicios, comercio electrónico, telecomunicaciones) y devuelve un puntaje de crédito con los factores que lo explican. Participé con el equipo en el Cornell EMC2 Mark Mobius Pitch Competition 2026.',
      en: 'Still a concept, not a product. The proposal is an API that takes alternative data (mobile, utilities, e-commerce, telecom) and returns a credit score with the factors that explain it. I took part with the team in the Cornell EMC2 Mark Mobius Pitch Competition 2026.',
    },
    pending: {
      es: 'Casi todo: construir el motor, desplegarlo, validarlo con una metodología y un conjunto de prueba documentados, y cumplir la protección de datos personales. No está desplegado y no tiene clientes.',
      en: 'Almost everything: building the engine, deploying it, validating it with a documented methodology and test set, and complying with personal data protection. It is not deployed and has no customers.',
    },
    disclaimer: {
      es: 'Esta página no publica cifras de exactitud ni de tracción porque no existen. Las proyecciones de mercado y financieras del pitch son estimaciones, no resultados.',
      en: 'This page publishes no accuracy or traction figures because there are none. The market and financial projections in the pitch are estimates, not results.',
    },
    repoUrl: 'https://github.com/EstebanHerna/altusmaintain',
  },
  {
    slug: 'hemovision',
    name: { es: 'HemoVision', en: 'HemoVision' },
    order: 6,
    timeframe: { es: '2026', en: '2026' },
    status: {
      kind: 'research',
      label: { es: 'Fase 0, datos sintéticos', en: 'Phase 0, synthetic data' },
    },
    tagline: {
      es: 'Detección temprana de crecimiento bacteriano en hemocultivos a partir de series de fotos: turbidez, textura y color.',
      en: 'Early detection of bacterial growth in blood cultures from photo series: turbidity, texture and color.',
    },
    role: { es: 'Autor único.', en: 'Sole author.' },
    stack: ['Python', 'scikit-learn', 'FastAPI', 'pytest', 'hypothesis', 'CodeQL'],
    problem: {
      es: 'Un hemocultivo positivo se nota cuando el medio se enturbia. El proyecto explora si esa señal se puede detectar antes midiendo turbidez, textura y color en fotos tomadas en serie.',
      en: 'A positive blood culture shows when the medium turns cloudy. The project explores whether that signal can be caught earlier by measuring turbidity, texture and color in serial photos.',
    },
    built: {
      es: 'Un clasificador Random Forest y SVM servido con FastAPI, probado de extremo a extremo sobre un conjunto sintético de 40 viales. El peso del proyecto está en la ingeniería: 97% de cobertura de pruebas, análisis estático con CodeQL, auditoría de dependencias con pip-audit y fuzzing con hypothesis.',
      en: 'A Random Forest and SVM classifier served with FastAPI, tested end to end on a synthetic set of 40 vials. The weight of the project is in the engineering: 97% test coverage, static analysis with CodeQL, dependency auditing with pip-audit and fuzzing with hypothesis.',
    },
    pending: {
      es: 'Fase 1: captura real en laboratorio. Hasta entonces no existe ninguna medida de desempeño clínico.',
      en: 'Phase 1: real laboratory capture. Until then there is no measure of clinical performance.',
    },
    metrics: [
      {
        value: { es: '1,000', en: '1.000' },
        label: {
          es: 'Exactitud sobre el conjunto sintético',
          en: 'Accuracy on the synthetic set',
        },
        note: {
          es: 'Ver la aclaración: las clases son separables por construcción.',
          en: 'See the note: the classes are separable by construction.',
        },
      },
      {
        value: { es: '97%', en: '97%' },
        label: { es: 'Cobertura de pruebas', en: 'Test coverage' },
        note: {
          es: 'Reportada por la suite de pruebas del repositorio.',
          en: "Reported by the repository's test suite.",
        },
      },
      {
        value: { es: '40', en: '40' },
        label: { es: 'Viales del conjunto sintético', en: 'Vials in the synthetic set' },
        note: {
          es: 'Generados por simulación; no son muestras reales.',
          en: 'Generated by simulation; they are not real samples.',
        },
      },
    ],
    metricsSource: {
      es: 'RESULTS.md del repositorio.',
      en: 'RESULTS.md in the repository.',
    },
    disclaimer: {
      es: 'La exactitud de 1,000 es la esperable porque las clases del conjunto sintético son separables por construcción. NO representa desempeño clínico. La validación con muestras reales de laboratorio está pendiente.',
      en: 'The 1.000 accuracy is what you would expect because the classes in the synthetic set are separable by construction. It does NOT represent clinical performance. Validation with real laboratory samples is pending.',
    },
    repoUrl: 'https://github.com/EstebanHerna/hemovision',
    links: [
      {
        label: { es: 'RESULTS.md', en: 'RESULTS.md' },
        href: 'https://github.com/EstebanHerna/hemovision/blob/main/RESULTS.md',
      },
    ],
  },
  {
    slug: 'microservicios-aws',
    name: { es: 'Microservicios y DevOps en AWS', en: 'Microservices and DevOps on AWS' },
    order: 7,
    timeframe: { es: '2026', en: '2026' },
    status: {
      kind: 'coursework',
      label: { es: 'Cursos de maestría (MISO)', en: "Master's courses (MISO)" },
    },
    tagline: {
      es: 'Modernización de un monolito de crédito con el patrón Strangler Fig y un microservicio con integración y despliegue continuos en AWS.',
      en: 'Strangler Fig modernization of a lending monolith and a microservice with continuous integration and delivery on AWS.',
    },
    role: {
      es: 'Líder del microservicio de Simulación en un equipo de 4.',
      en: 'Lead of the Simulation microservice in a team of 4.',
    },
    stack: [
      'OpenAPI',
      'Prism',
      'k6',
      'Flask',
      'PostgreSQL',
      'Amazon RDS',
      'Elastic Beanstalk',
      'CodeBuild',
      'CodePipeline',
      'ECS Fargate',
      'Docker',
    ],
    problem: {
      es: 'Dos ejercicios de las electivas de la Maestría en Ingeniería de Software: extraer servicios de un monolito de crédito sin detener la operación, y desplegar y actualizar un servicio sin pasos manuales.',
      en: "Two exercises from Master's in Software Engineering electives: extracting services from a lending monolith without stopping operations, and deploying and updating a service with no manual steps.",
    },
    built: {
      es: 'Para el monolito: definimos un contrato OpenAPI compartido, montamos un servidor de prueba con Prism e hicimos pruebas de carga con k6 sobre el microservicio de Simulación, que lideré. Para el despliegue, en el proyecto DevopsKings: desplegué un microservicio REST en Flask con PostgreSQL (Amazon RDS) en Elastic Beanstalk, con integración continua en CodeBuild y CodePipeline y entrega continua en ECS Fargate.',
      en: 'For the monolith: we defined a shared OpenAPI contract, set up a Prism mock server and ran k6 load tests on the Simulation microservice, which I led. For delivery, in the DevopsKings project: I deployed a REST microservice in Flask with PostgreSQL (Amazon RDS) on Elastic Beanstalk, with continuous integration in CodeBuild and CodePipeline and continuous delivery on ECS Fargate.',
    },
    pending: {
      es: 'Son proyectos académicos y el banco es ficticio. Los repositorios pertenecen a los cursos y no son públicos.',
      en: 'These are academic projects and the bank is fictional. The repositories belong to the courses and are not public.',
    },
    repoUrl: null,
  },
];

export const projectsByOrder = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
