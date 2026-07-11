import type { StackGroup } from '@/lib/types';

/** Stack tecnico agrupado. Prioriza lo defendible en entrevista. */
export const stack: StackGroup[] = [
  {
    label: { es: 'Lenguajes', en: 'Languages' },
    items: ['Python', 'Java', 'Kotlin', 'JavaScript/TypeScript', 'C', 'C++', 'SQL'],
  },
  {
    label: { es: 'Movil', en: 'Mobile' },
    items: ['Android (Kotlin)', 'Jetpack Compose', 'MVVM', 'StateFlow', 'Retrofit'],
  },
  {
    label: { es: 'Backend', en: 'Backend' },
    items: ['NestJS', 'Spring Boot', 'FastAPI', 'Django', 'Node.js', 'REST APIs'],
  },
  {
    label: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'Angular', 'HTML/CSS'],
  },
  {
    label: { es: 'Cloud e IA generativa', en: 'Cloud and generative AI' },
    items: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'EventBridge', 'Amazon Bedrock', 'Vercel'],
  },
  {
    label: { es: 'Machine Learning', en: 'Machine Learning' },
    items: ['TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'TF-IDF'],
  },
  {
    label: { es: 'Robotica', en: 'Robotics' },
    items: ['ROS', 'ROS2', 'SLAM (Swarm-SLAM, Kimera-Multi)', 'A*', 'Theta*'],
  },
  {
    label: { es: 'Bases de datos', en: 'Databases' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
  },
  {
    label: { es: 'DevOps', en: 'DevOps' },
    items: ['Git', 'GitHub', 'Docker', 'Nginx', 'CI/CD'],
  },
];
