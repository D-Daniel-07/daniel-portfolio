import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';

interface SkillCategory {
  title: string;
  badge: string;
  items: string[];
  description: string;
  stat: string;
  colSpan: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills implements AfterViewInit, OnDestroy {
  @ViewChildren('animatedElement')
  private readonly animatedElements!: QueryList<ElementRef<HTMLElement>>;

  private readonly ngZone = inject(NgZone);

  private observer?: IntersectionObserver;

  readonly bentoCategories: SkillCategory[] = [
    {
      title: 'FRONTEND ARCHITECTURE',
      badge: 'CORE PILLAR',
      items: ['React.js', 'React Native', 'Tailwind CSS', 'Electron.js'],
      description:
        'Specialized in building high-performance client applications, custom component libraries, and immersive desktop/mobile interfaces.',
      stat: '100% RESPONSIVE',
      colSpan: 'span-7',
    },

    {
      title: 'DISTRIBUTED BACKEND',
      badge: 'HIGH CONCURRENCY',
      items: ['Node.js', 'Express.js', 'Spring Boot', 'Docker', 'Redis'],
      description:
        'Engineered RESTful APIs, JWT role-based access control, caching layers, and multi-tenant SaaS backend isolation.',
      stat: '< 40ms LATENCY',
      colSpan: 'span-5',
    },

    {
      title: 'DATA PLATFORMS',
      badge: 'PERSISTENCE',
      items: ['MongoDB Atlas', 'PostgreSQL', 'MySQL'],
      description:
        'Designing resilient relational and document schemas with optimized indexing and transaction isolation.',
      stat: 'ACID & NOSQL',
      colSpan: 'span-5',
    },

    {
      title: 'ALGORITHMS & MACHINE LEARNING',
      badge: 'INTELLIGENCE',
      items: ['C++', 'Python', 'Java', 'scikit-learn', 'OpenAI API'],
      description:
        '1200+ algorithm problems solved. Applied Random Forest classifiers for real-time risk heatmaps and NLP policy analyzers.',
      stat: '1200+ SOLVED',
      colSpan: 'span-7',
    },
  ];

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initializeAnimations();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initializeAnimations(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.animatedElements.forEach((element) => {
        element.nativeElement.classList.add('is-visible');
      });

      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;

          element.classList.add('is-visible');

          this.observer?.unobserve(element);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    this.animatedElements.forEach((element) => {
      this.observer?.observe(element.nativeElement);
    });
  }
}
