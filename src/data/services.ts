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
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Contenido digital interactivo',
    description:
      'Diseñamos material didáctico dinámico que incrementa la retención y participación de los usuarios.',
    icon: 'mouse-pointer-2',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Simuladores educativos',
    description:
      'Desarrollamos entornos virtuales de práctica para capacitar en tareas críticas sin riesgos.',
    icon: 'cpu',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Software a medida',
    description:
      'Soluciones tecnológicas personalizadas para resolver los retos específicos de tu negocio.',
    icon: 'code-2',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Implementación LMS',
    description:
      'Configuración y despliegue de sistemas de gestión de aprendizaje (Moodle, Canvas, etc.).',
    icon: 'layout',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Capacitación empresarial',
    description:
      'Estrategias digitales completas para elevar el nivel técnico y blando de tu equipo.',
    icon: 'briefcase',
    color: 'bg-rose-50 text-rose-600',
  },
];
