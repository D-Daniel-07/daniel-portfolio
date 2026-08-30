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
      title: 'ANGULAR ARCHITECTURE',
      badge: 'CORE PILLAR',
      items: ['Angular', 'TypeScript', 'Angular CLI', 'Angular Material', 'SCSS'],
      description:
        'Building scalable enterprise applications with reusable Angular components, maintainable architecture, and modern frontend engineering practices.',
      stat: '2+ YEARS',
      colSpan: 'span-7',
    },

    {
      title: 'STATE & DATA FLOW',
      badge: 'APPLICATION CORE',
      items: ['NgRx', 'RxJS', 'Signal Store', 'REST APIs', 'Dataflow'],
      description:
        'Designing efficient application data flows and state management solutions while integrating REST APIs for reliable and maintainable user experiences.',
      stat: '20% DATA EFFICIENCY',
      colSpan: 'span-5',
    },

    {
      title: 'PERFORMANCE ENGINEERING',
      badge: 'OPTIMIZATION',
      items: [
        'Lazy Loading',
        'Change Detection',
        'Reusable Components',
        'Performance',
        'Responsive UI',
      ],
      description:
        'Focused on improving application responsiveness through optimized component design, lazy loading, efficient data handling, and modern Angular techniques.',
      stat: '15% LOAD TIME',
      colSpan: 'span-5',
    },

    {
      title: 'QUALITY & DELIVERY',
      badge: 'ENGINEERING',
      items: ['Jest', 'Cypress', 'Unit Testing', 'Git', 'GitLab', 'JIRA'],
      description:
        'Delivering reliable frontend solutions through structured testing, version control, collaborative development, and proactive debugging across enterprise applications.',
      stat: 'PRODUCTION READY',
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
