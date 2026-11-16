import type { Localized } from '@/lib/types';

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  /** Titular vigente. El Ministerio no aparece aquí. */
  headline: Localized;
  tools: string;
  positioning: Localized;
  about: Localized;
  degree: Localized;
  graduation: Localized;
  availability: Localized;
  languages: Localized;
  courses: Localized;
  location: string;
  email: string;
  cv: Record<'es' | 'en', string>;
  socials: SocialLink[];
}

/** Contacto público. El teléfono NO se publica en el sitio. */
export const profile: Profile = {
  name: 'Esteban Alejandro Hernández Sulvara',
  shortName: 'Esteban Hernández',
  headline: {
    es: 'Ingeniería de datos e IA aplicada',
    en: 'Data engineering and applied AI',
  },
  tools: 'Python, SQL, Apache Airflow, AWS',
  positioning: {
    es: 'Construyo flujos de datos que se pueden volver a ejecutar y análisis que se pueden comprobar. Mi proyecto de grado integra cuatro fuentes oficiales y procesa los 1.121 municipios de Colombia en menos de 17 minutos; antes ese análisis se hacía a mano y tomaba semanas.',
    en: "I build data workflows that can be re-run and analyses that can be checked. My undergraduate thesis integrates four official sources and processes Colombia's 1,121 municipalities in under 17 minutes; that analysis used to be done by hand and took weeks.",
  },
  about: {
    es: 'Estoy en el último semestre de Ingeniería de Sistemas y Computación en la Universidad de los Andes. Trabajo sobre todo con datos: integrarlos, validarlos, analizarlos y dejar registro de cómo se obtuvo cada cifra. Alrededor de eso he construido servicios de backend en Python y despliegues en AWS, y proyectos de visión por computador y de modelos de lenguaje. En cada proyecto separo lo que está comprobado de lo que todavía falta por validar.',
    en: 'I am in my final term of Systems and Computing Engineering at Universidad de los Andes. I work mostly with data: integrating it, validating it, analyzing it and keeping a record of how each figure was obtained. Around that I have built Python backend services and AWS deployments, and computer vision and language model projects. In every project I separate what has been checked from what still needs validation.',
  },
  degree: {
    es: 'Ingeniería de Sistemas y Computación, Universidad de los Andes (Bogotá). Promedio 3,9/5,0.',
    en: 'Systems and Computing Engineering, Universidad de los Andes (Bogotá). GPA 3.9/5.0.',
  },
  graduation: { es: 'Grado: 2027-1', en: 'Graduation: first term of 2027' },
  availability: {
    es: 'Disponible desde febrero de 2027 para roles junior o trainee de datos, IA aplicada y backend, en Colombia o remoto para Latinoamérica.',
    en: 'Available from February 2027 for junior or trainee roles in data, applied AI and backend, in Colombia or remote for Latin America.',
  },
  languages: {
    es: 'Español (nativo). Inglés B2.',
    en: 'Spanish (native). English B2.',
  },
  courses: {
    es: 'Machine Learning, Inteligencia Artificial, Aplicaciones Móviles, Robótica Móvil y Sistemas Autónomos. Electivas de la Maestría en Ingeniería de Software (MISO): Diseño y Construcción de APIs, DevOps.',
    en: "Machine Learning, Artificial Intelligence, Mobile Applications, Mobile Robotics and Autonomous Systems. Master's in Software Engineering (MISO) electives: API Design and Construction, DevOps.",
  },
  location: 'Bogotá, Colombia',
  email: 'esteban.hernna@gmail.com',
  cv: {
    es: '/cv/CV_Esteban_Hernandez_Diseno_ES.pdf',
    en: '/cv/CV_Esteban_Hernandez_Diseno_EN.pdf',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/EstebanHerna' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/estebanalejandrohernandez' },
  ],
};
