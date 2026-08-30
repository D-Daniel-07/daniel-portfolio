import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience implements AfterViewInit, OnDestroy {
  @ViewChild('experienceSection', { static: true })
  private readonly experienceSection!: ElementRef<HTMLElement>;

  @ViewChild('timeline', { static: true })
  private readonly timeline!: ElementRef<HTMLElement>;

  readonly journey: RouteStop[] = [
    {
      id: '01',
      year: '2024 - PRESENT',
      title: 'SOFTWARE DEVELOPER',
      organization: 'UST',
      description:
        'Developing enterprise-grade banking applications using Angular, TypeScript, RxJS, NgRx, and REST APIs. Building scalable UI architectures, reusable components, and high-performance customer-facing workflows across multiple banking platforms.',
    },

    {
      id: '02',
      year: '2023 - 2024',
      title: 'SOFTWARE DEVELOPMENT INTERN',
      organization: 'MOONRAFT INNOVATION LABS',
      description:
        'Contributed to real-world software development projects, building responsive web interfaces and gaining hands-on experience with modern frontend engineering, application architecture, and collaborative development practices.',
    },

    {
      id: '03',
      year: '2020 - 2024',
      title: 'B.TECH IN ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
      organization: 'KARPAGAM INSTITUTE OF TECHNOLOGY',
      description:
        'Completed a B.Tech specializing in Artificial Intelligence and Data Science, developing a strong foundation in software engineering, algorithms, machine learning, data structures, and application development.',
    },

    {
      id: '04',
      year: '2018 - 2020',
      title: 'HIGHER SECONDARY EDUCATION',
      organization: 'BEULA MATRICULATION & HIGHER SECONDARY SCHOOL',
      description:
        'Completed higher secondary education with a focus on mathematics and science, building the analytical and problem-solving foundation that led to a career in software engineering and technology.',
    },
  ];

  private readonly ngZone = inject(NgZone);

  private animationFrameId: number | null = null;

  private observer?: IntersectionObserver;

  private destroyed = false;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initializeAnimations();
      this.updateTimeline();
      this.addScrollListener();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.observer?.disconnect();

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);
  }

  private initializeAnimations(): void {
    const section = this.experienceSection.nativeElement;

    const animatedElements = section.querySelectorAll<HTMLElement>('[data-animate]');

    if (typeof IntersectionObserver === 'undefined') {
      animatedElements.forEach((element) => {
        element.classList.add('is-visible');
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
        rootMargin: '0px 0px -50px 0px',
      },
    );

    animatedElements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  private addScrollListener(): void {
    window.addEventListener('scroll', this.handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', this.handleResize, {
      passive: true,
    });
  }

  private readonly handleScroll = (): void => {
    if (this.destroyed) {
      return;
    }

    if (this.animationFrameId !== null) {
      return;
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;

      this.updateTimeline();
    });
  };

  private readonly handleResize = (): void => {
    if (this.destroyed) {
      return;
    }

    this.updateTimeline();
  };

  private updateTimeline(): void {
    const section = this.experienceSection.nativeElement;

    const timeline = this.timeline.nativeElement;

    const goldLine = timeline.querySelector<HTMLElement>('.gold-track');

    if (!goldLine) {
      return;
    }

    const rect = section.getBoundingClientRect();

    const sectionTop = rect.top + window.scrollY;

    const sectionHeight = section.offsetHeight;

    const viewportHeight = window.innerHeight;

    const scrollTop = window.scrollY;

    /*
     * Equivalent to the React:
     *
     * useScroll({
     *   target: containerRef,
     *   offset: ['start 70%', 'end 90%']
     * })
     *
     * The animation begins when the section
     * reaches approximately 70% of viewport
     * and finishes when the section reaches
     * approximately 90% from the bottom.
     */

    const start = sectionTop - viewportHeight * 0.7;

    const end = sectionTop + sectionHeight - viewportHeight * 0.9;

    let progress = 0;

    if (end > start) {
      progress = (scrollTop - start) / (end - start);
    }

    progress = Math.max(0, Math.min(1, progress));

    goldLine.style.height = `${progress * 100}%`;
  }
}
