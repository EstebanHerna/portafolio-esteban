import type { Localized } from '@/lib/types';

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  shortName: string;
  headline: Localized;
  positioning: Localized;
  academic: Localized;
  languages: Localized;
  education: Localized;
  email: string;
  socials: SocialLink[];
}

/** Contacto publico. El telefono personal NO se publica. */
export const profile: Profile = {
  name: 'Esteban Alejandro Hernandez Sulvara',
  shortName: 'Esteban Hernandez',
  headline: {
    es: 'Ingeniero de sistemas y computacion que construye productos de software con machine learning e inteligencia artificial como base.',
    en: 'Systems and computing engineer building software products grounded in machine learning and artificial intelligence.',
  },
  positioning: {
    es: 'Construyo productos de nivel produccion en dominios distintos: salud y biomedicina, movil, cloud y robotica, apoyado en machine learning e inteligencia artificial. Aplico los mismos tests, CI y controles de seguridad que exigiria a un sistema critico, y me importa distinguir lo que esta validado de lo que todavia es una promesa.',
    en: "I build production-grade products across domains: health and biomedicine, mobile, cloud, and robotics, grounded in machine learning and artificial intelligence. I apply the same tests, CI, and security controls I'd demand of a critical system, and I care about telling what's validated apart from what's still a promise.",
  },
  academic: {
    es: 'Ingenieria de Sistemas y Computacion, Universidad de los Andes (Bogota). 8vo semestre, GPA aproximado 3.9/4.0. Graduacion esperada 2027.',
    en: 'Systems and Computing Engineering, Universidad de los Andes (Bogota). 8th semester, GPA approximately 3.9/4.0. Expected graduation 2027.',
  },
  languages: {
    es: 'Espanol (nativo), Ingles (intermedio-avanzado), Aleman (basico).',
    en: 'Spanish (native), English (upper-intermediate), German (basic).',
  },
  education: {
    es: 'Cursos relevantes: Aplicaciones Moviles (ISIS-3510), Robotica Movil y Sistemas Autonomos (ISIS-4826), Machine Learning.',
    en: 'Relevant courses: Mobile Applications (ISIS-3510), Mobile Robotics and Autonomous Systems (ISIS-4826), Machine Learning.',
  },
  email: 'ea.hernandezs1@uniandes.edu.co',
  socials: [
    { label: 'GitHub', href: 'https://github.com/EstebanHerna' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/estebanalejandrohernandez' },
    { label: 'Instagram', href: 'https://instagram.com/esteban.hernna' },
  ],
};
