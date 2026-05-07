/**
 * Servicios ofrecidos: datos y tipo para la sección de servicios.
 */
export interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const services: Service[] = [
  {
    title: 'Desarrollo de plataformas educativas',
    description:
      'Creamos ecosistemas digitales de aprendizaje robustos y escalables para cualquier nivel educativo.',
    icon: 'monitor',
    color: 'bg-[#F8C16D]/20 text-[#EE7601]',
  },
  {
    title: 'Contenido digital interactivo',
    description:
      'Diseñamos material didáctico dinámico que incrementa la retención y participación de los usuarios.',
    icon: 'mouse-pointer-2',
    color: 'bg-[#EE7601]/15 text-[#EE7601]',
  },
  {
    title: 'Simuladores educativos',
    description:
      'Desarrollamos entornos virtuales de práctica para capacitar en tareas críticas sin riesgos.',
    icon: 'cpu',
    color: 'bg-[#595B5B]/20 text-[#595B5B]',
  },
  {
    title: 'Software a medida',
    description:
      'Soluciones tecnológicas personalizadas para resolver los retos específicos de tu negocio.',
    icon: 'code-2',
    color: 'bg-[#1C1D1D]/10 text-[#1C1D1D]',
  },
  {
    title: 'Implementación LMS',
    description:
      'Configuración y despliegue de sistemas de gestión de aprendizaje (Moodle, Canvas, etc.).',
    icon: 'layout',
    color: 'bg-[#F8C16D]/15 text-[#1C1D1D]',
  },
  {
    title: 'Capacitación empresarial',
    description:
      'Estrategias digitales completas para elevar el nivel técnico y blando de tu equipo.',
    icon: 'briefcase',
    color: 'bg-[#595B5B]/15 text-[#EE7601]',
  },
];
