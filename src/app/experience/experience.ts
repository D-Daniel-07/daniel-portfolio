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
      year: 'MAY - JUN 2026',
      title: 'FULL STACK & MOBILE INTERN',
      organization: 'TECHNICAL HUB PVT LTD',
      description:
        'Engineered cross-platform mobile and responsive web applications utilizing React Native and modern full-stack workflows.',
    },
    {
      id: '02',
      year: '2026 MILESTONE',
      title: 'TOP 100 NATIONAL TEAM',
      organization: 'MYNTRA WEFORSHE HACKERRAMP',
      description:
        'Ranked among the Top 100 nationwide teams while maintaining Department Topper status (9.07 CGPA) in Data Science.',
    },
    {
      id: '03',
      year: 'MAY - JUN 2025',
      title: 'FULL STACK TRAINEE',
      organization: 'TECHNICAL HUB PVT LTD',
      description:
        'Trained in modern full-stack architecture, developing and deploying end-to-end interactive responsive web platforms.',
    },
    {
      id: '04',
      year: '2023 - 2027',
      title: 'B.TECH IN DATA SCIENCE',
      organization: 'ADITYA COLLEGE OF ENGINEERING',
      description:
        'Specializing in Machine Learning and System Design. Solved 1200+ algorithm challenges across LeetCode, CodeChef, and GeeksforGeeks.',
    },
    {
      id: '05',
      year: '2021 - 2023',
      title: 'HIGHER SECONDARY (MPC)',
      organization: 'SRI CHAITANYA JUNIOR COLLEGE',
      description:
        'Completed specialized coursework in Mathematics, Physics, and Chemistry with 90.60% aggregate excellence.',
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
