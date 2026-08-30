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
      title: 'PolicyGuard AI',
      category: 'AI / LEGAL-TECH PLATFORM',

      description:
        'AI-powered platform engineered for automated privacy policy analysis and legal contract auditing across web, desktop, and mobile. Implements NLP extraction, real-time risk alert detection, and generative risk score intelligence.',

      githubUrl: 'https://github.com/lohithadamisetti123',

      tech: [
        'React.js',
        'React Native',
        'Electron.js',
        'Node.js',
        'Express.js',
        'MongoDB Atlas',
        'OpenAI API',
        'Prompt Eng',
        'NLP',
        'Docker',
        'JWT',
      ],

      metrics: [
        {
          label: 'PLATFORMS',
          value: 'Web, Mobile, Desktop',
        },
        {
          label: 'ENGINE',
          value: 'OpenAI NLP / GPT',
        },
        {
          label: 'PIPELINE',
          value: 'Automated Scoring',
        },
      ],
    },

    {
      number: '02',
      title: 'Software Release Risk Heatmap',
      category: 'MACHINE LEARNING / DEV PLATFORM',

      description:
        'Full-stack predictive release management platform utilizing Machine Learning. Implements a trained Random Forest classifier to categorize release stability from Low to Critical risk, rendered over a live interactive team heatmap.',

      githubUrl: 'https://github.com/lohithadamisetti123',

      tech: [
        'React.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'scikit-learn',
        'PostgreSQL',
        'Tailwind CSS',
        'REST APIs',
        'JWT',
      ],

      metrics: [
        {
          label: 'MODEL',
          value: 'Random Forest',
        },
        {
          label: 'ACCURACY',
          value: 'High Precision',
        },
        {
          label: 'DASHBOARD',
          value: 'Live Risk Heatmap',
        },
      ],
    },

    {
      number: '03',
      title: 'Multi-Tenant SaaS Platform',
      category: 'CLOUD / DISTRIBUTED SYSTEM',

      description:
        'Enterprise-grade multi-tenant platform built for unified management of teams, projects, and execution lifecycles. Architected with strict tenant data isolation, granular Role-Based Access Control (RBAC), and containerized deployments.',

      githubUrl: 'https://github.com/lohithadamisetti123',

      tech: ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'Docker', 'JWT', 'RBAC', 'REST APIs'],

      metrics: [
        {
          label: 'ARCHITECTURE',
          value: 'Multi-Tenant',
        },
        {
          label: 'SECURITY',
          value: 'RBAC Isolation',
        },
        {
          label: 'CONTAINERS',
          value: 'Docker Compose',
        },
      ],
    },

    {
      number: '04',
      title: 'Payment Gateway with Hosted Checkout',
      category: 'FINTECH / PAYMENT SYSTEMS',

      description:
        'End-to-end hosted payment gateway infrastructure supporting seamless merchant order generation, multi-currency processing, and secure consumer checkout via UPI and Cards with webhook transaction verification.',

      githubUrl: 'https://github.com/lohithadamisetti123',

      tech: [
        'Node.js',
        'Spring Boot',
        'PostgreSQL',
        'React',
        'Docker',
        'REST APIs',
        'UPI / Card Integrations',
      ],

      metrics: [
        {
          label: 'PROTOCOLS',
          value: 'UPI & Cards',
        },
        {
          label: 'BACKEND',
          value: 'Spring Boot + Node',
        },
        {
          label: 'DATABASE',
          value: 'ACID PostgreSQL',
        },
      ],
    },
  ];
}
