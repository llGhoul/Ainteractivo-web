/**
 * Casos de proyecto basados en el portafolio institucional 2025.
 */
import type { ImageMetadata } from 'astro';
import logoClaro from '../assets/images/Claro.webp';
import logoRegistraduria from '../assets/images/La_Registraduria_Nacional.webp';

export interface Project {
  slug: string;
  title: string;
  client: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  /** Logo del cliente cuando está disponible */
  clientLogo?: ImageMetadata;
  featured: boolean;
  icon: string;
}

export const projects: Project[] = [
  {
    slug: 'universidad-claro',
    title: 'Universidad Claro',
    client: 'Claro',
    period: 'Capacitación continua · varios años',
    summary:
      'Contenidos interactivos para la inducción y reinducción de trabajadores, con acompañamiento durante tres años consecutivos.',
    highlights: [
      'Inducción y reinducción de colaboradores',
      'Contenidos interactivos de alto engagement',
      'Relación de largo plazo con el cliente',
    ],
    tags: ['E-learning', 'Capacitación corporativa', 'Contenido interactivo'],
    clientLogo: logoClaro,
    featured: true,
    icon: 'graduation-cap',
  },
  {
    slug: 'registraduria-nacional',
    title: 'Formación ciudadana a nivel nacional',
    client: 'Registraduría Nacional del Estado Civil',
    period: '2022 – 2023',
    summary:
      'Cursos virtuales autónomos para dos estrategias de formación ciudadana: Escuela de Formación Virtual de la RNEC (2022) e i-electo (2023).',
    highlights: [
      'Alcance nacional en modalidad virtual',
      'Escuela de Formación Virtual RNEC (2022)',
      'Plataforma i-electo para formación electoral (2023)',
    ],
    tags: ['Cursos virtuales', 'Gobierno', 'Formación ciudadana'],
    clientLogo: logoRegistraduria,
    featured: true,
    icon: 'landmark',
  },
  {
    slug: 'cultura-del-agua',
    title: 'Cultura del Agua',
    client: 'Programa sectorial',
    period: 'E-learning adaptable',
    summary:
      'Contenidos e-learning según tipologías adaptables, con línea gráfica propia, tipos de navegación y estrategias didácticas online y offline.',
    highlights: [
      'Tipologías de contenido flexibles',
      'Línea gráfica y navegación personalizada',
      'Estrategias pedagógicas online y offline',
    ],
    tags: ['E-learning', 'Contenido a la medida', 'Diseño instruccional'],
    featured: true,
    icon: 'droplets',
  },
  {
    slug: 'contraloria-rotorr',
    title: 'Rotorr — Motor de Innovación',
    client: 'Contraloría General de la República',
    period: 'Cursos autónomos',
    summary:
      'Cursos virtuales autónomos para funcionarios sobre temáticas de la Industria 4.0, dentro del ecosistema Rotorr.',
    highlights: [
      'Formación en Industria 4.0',
      'Modalidad autónoma para funcionarios públicos',
      'Innovación en el sector público',
    ],
    tags: ['Gobierno', 'Industria 4.0', 'Cursos virtuales'],
    featured: false,
    icon: 'cog',
  },
  {
    slug: 'ciudad-bolivar',
    title: 'Participación y acceso a la justicia',
    client: 'Localidad de Ciudad Bolívar',
    period: 'Presencial, virtual e híbrido',
    summary:
      'Microcursos y diplomados en modalidades presencial, virtual e híbrida para los proyectos Acceso a la Justicia en Ciudad Bolívar y Participación Ciudadana.',
    highlights: [
      'Microcursos y diplomados combinados',
      'Formación en justicia y participación ciudadana',
      'Modalidades presencial, virtual e híbrida',
    ],
    tags: ['Educación territorial', 'Diplomados', 'Modalidad híbrida'],
    featured: false,
    icon: 'users',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
