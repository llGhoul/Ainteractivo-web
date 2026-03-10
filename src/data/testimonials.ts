/**
 * Testimonios de clientes: datos y tipo para la sección de testimonios.
 */
export interface Testimonial {
  text: string;
  author: string;
  position: string;
}

export const testimonials: Testimonial[] = [
  {
    text: 'Excelente empresa para el desarrollo de plataformas, contenido digital, simuladores y software. Son muy profesionales y generan valor a nuestro trabajo.',
    author: 'Director de Innovación',
    position: 'Institución Educativa Superior',
  },
  {
    text: 'Excelente compañía y excelentes profesionales en temas educativos. Entienden perfectamente el puente entre pedagogía y tecnología.',
    author: 'Gerente de RRHH',
    position: 'Corporación Tecnológica',
  },
  {
    text: 'Su capacidad para crear simuladores complejos nos ha permitido ahorrar costos significativos en nuestra capacitación técnica.',
    author: 'Operaciones Latam',
    position: 'Sector Industrial',
  },
];
