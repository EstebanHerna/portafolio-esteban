import type { StackGroup } from '@/lib/types';

/**
 * Herramientas por área, tomadas de jobpilot/profile. Solo lo defendible en entrevista.
 * Kubernetes queda fuera (decisión del 15 nov. 2026): se usa Docker y ECS Fargate.
 */
export const stack: StackGroup[] = [
  {
    label: { es: 'Lenguajes', en: 'Languages' },
    items: ['Python', 'SQL', 'Java', 'Kotlin', 'TypeScript', 'JavaScript', 'C'],
  },
  {
    label: { es: 'Ingeniería de datos', en: 'Data engineering' },
    items: ['Apache Airflow', 'ETL', 'Validación de datos', 'Trazabilidad', 'Modelado de datos'],
  },
  {
    label: { es: 'Análisis de datos', en: 'Data analysis' },
    items: [
      'pandas',
      'NumPy',
      'SciPy',
      'statsmodels',
      'GeoPandas',
      'PySAL',
      'Matplotlib',
      'Power BI',
    ],
  },
  {
    label: { es: 'IA y aprendizaje automático', en: 'AI and machine learning' },
    items: [
      'scikit-learn',
      'OpenCV',
      'YOLOv8',
      'XGBoost',
      'RAG',
      'LangChain',
      'Amazon Bedrock',
      'OpenAI API',
    ],
  },
  {
    label: { es: 'Backend', en: 'Backend' },
    items: ['FastAPI', 'Flask', 'NestJS', 'Spring Boot', 'Django', 'APIs REST', 'OpenAPI'],
  },
  {
    label: { es: 'Nube y DevOps', en: 'Cloud and DevOps' },
    items: [
      'Docker',
      'ECS Fargate',
      'Elastic Beanstalk',
      'CodePipeline',
      'AWS Lambda',
      'Amazon DynamoDB',
      'GitHub Actions',
    ],
  },
  {
    label: { es: 'Bases de datos', en: 'Databases' },
    items: ['PostgreSQL', 'MongoDB', 'Amazon DynamoDB', 'Firebase'],
  },
  {
    label: { es: 'Calidad de software', en: 'Software quality' },
    items: ['pytest', 'Cobertura de pruebas', 'Pruebas de carga', 'Análisis estático'],
  },
];
