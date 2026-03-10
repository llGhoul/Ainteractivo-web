/**
 * Razones para elegirnos: datos y tipo para la sección "¿Por qué elegirnos?".
 */
export interface WhyUsItem {
  title: string;
  description: string;
  icon: string;
}

export const whyUs: WhyUsItem[] = [
  {
    title: 'Experiencia en EdTech',
    description:
      'Años transformando procesos pedagógicos a través de herramientas digitales avanzadas.',
    icon: 'history',
  },
  {
    title: 'Soluciones Personalizadas',
    description:
      'No creemos en plantillas genéricas; cada proyecto es diseñado desde cero para tus necesidades.',
    icon: 'settings',
  },
  {
    title: 'Innovación Tecnológica',
    description:
      'Aplicamos IA, simulaciones 3D y las últimas tendencias para mantenerte a la vanguardia.',
    icon: 'rocket',
  },
  {
    title: 'Cumplimiento y Calidad',
    description:
      'Entregas a tiempo bajo los más altos estándares de desarrollo de software internacional.',
    icon: 'check-circle',
  },
];
