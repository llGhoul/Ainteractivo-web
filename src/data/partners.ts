/**
 * Aliados y clientes: logos importados para optimización en build.
 */
import type { ImageMetadata } from 'astro';
import logoClaro from '../assets/images/Claro.webp';
import logoEducatec from '../assets/images/Educatec.webp';
import logoRegistraduria from '../assets/images/La_Registraduria_Nacional.webp';
import logoTalentoTech from '../assets/images/TalentoTech.webp';

export interface Partner {
  slug: string;
  name: string;
  logo: ImageMetadata;
  alt: string;
  /** Enlace al caso de estudio en /proyectos cuando aplica */
  projectSlug?: string;
}

export const partners: Partner[] = [
  {
    slug: 'claro',
    name: 'Claro',
    logo: logoClaro,
    alt: 'Logo de Claro — aliado de Aprendizaje Interactivo',
    projectSlug: 'universidad-claro',
  },
  {
    slug: 'registraduria',
    name: 'Registraduría Nacional del Estado Civil',
    logo: logoRegistraduria,
    alt: 'Logo de la Registraduría Nacional del Estado Civil — aliado de Aprendizaje Interactivo',
    projectSlug: 'registraduria-nacional',
  },
  {
    slug: 'talento-tech',
    name: 'Talento Tech',
    logo: logoTalentoTech,
    alt: 'Logo de Talento Tech — aliado de Aprendizaje Interactivo',
  },
  {
    slug: 'educatec',
    name: 'Educatec',
    logo: logoEducatec,
    alt: 'Logo de Educatec — aliado de Aprendizaje Interactivo',
  },
];

export const partnersWithCaseStudy = partners.filter((p) => p.projectSlug);
