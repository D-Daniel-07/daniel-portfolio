import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScrollStack } from '../scroll-stack/scroll-stack';

interface ProjectMetric {
  label: string;
  value: string;
}

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  tech: string[];
  metrics: ProjectMetric[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollStack],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects: Project[] = [
    {
      number: '01',
      title: 'STANDARD BANK',
      category: 'ENTERPRISE BANKING',

      description:
        'Enterprise banking applications developed and enhanced across multiple countries. Built and maintained lending, registration, query management, and CIF modification workflows while delivering reusable Angular components, efficient state management, and high-performance user experiences.',

      githubUrl: 'https://github.com/D-Daniel-07',

      tech: [
        'ANGULAR',
        'TYPESCRIPT',
        'NGRX',
        'RXJS',
        'REACTIVE FORMS',
        'CHANGE DETECTION',
        'REST APIs',
        'SCSS',
        'JEST',
        'CYPRESS',
      ],

      metrics: [
        {
          label: 'DOMAIN',
          value: 'Enterprise Banking',
        },
        {
          label: 'ARCHITECTURE',
          value: 'Reusable Components',
        },
        {
          label: 'EFFICIENCY',
          value: '40% Faster Development',
        },
      ],
    },

    {
      number: '02',
      title: 'E-STORE APPLICATION',
      category: 'E-COMMERCE / FRONTEND',

      description:
        'A scalable responsive e-commerce web application focused on modern UI/UX and maintainable frontend architecture. Implemented Signal Store for application-wide state management and developed reusable components to improve development efficiency and scalability.',

      githubUrl: 'https://github.com/D-Daniel-07',

      tech: [
        'ANGULAR',
        'TYPESCRIPT',
        'SIGNAL STORE',
        'JAVASCRIPT',
        'HTML',
        'CSS',
        'SCSS',
        'RESPONSIVE UI',
        'REUSABLE COMPONENTS',
      ],

      metrics: [
        {
          label: 'FOCUS',
          value: 'Responsive UI/UX',
        },
        {
          label: 'STATE',
          value: 'Signal Store',
        },
        {
          label: 'ARCHITECTURE',
          value: 'Reusable Components',
        },
      ],
    },
  ];
}
