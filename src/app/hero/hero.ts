import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface NavItem {
  name: string;
  href: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly router = inject(Router);
  private isScrollingToAbout = false;

  readonly cursorX = signal(-100);
  readonly cursorY = signal(-100);
  readonly isHovered = signal(false);
  readonly showCursor = signal(false);

  readonly navItems: NavItem[] = [
    { name: 'ABO', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: 'skills' },
    { name: 'EXPERIENCE', href: 'experience' },
    { name: 'CONTACT', href: 'contact' },
  ];

  handleNavClick(item: NavItem, event?: MouseEvent): void {
    if (!item.href.startsWith('#')) {
      return;
    }

    event?.preventDefault();

    const sectionId = item.href.replace('#', '');
    const section = document.getElementById(sectionId) as HTMLElement | null;

    if (!section) {
      return;
    }

    window.history.pushState(null, '', item.href);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit(): void {
    this.showCursor.set(true);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
  }

  setHoverState(value: boolean): void {
    this.isHovered.set(value);
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (event.deltaY <= 0 || this.isScrollingToAbout) {
      return;
    }

    const heroSection = document.querySelector('app-hero') as HTMLElement | null;
    const aboutSection = document.getElementById('about');

    if (!heroSection || !aboutSection) {
      return;
    }

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (window.scrollY >= heroBottom - window.innerHeight) {
      return;
    }

    event.preventDefault();
    this.isScrollingToAbout = true;
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      this.isScrollingToAbout = false;
    }, 1200);
  }

  scrollToAbout(): void {
    const aboutSection = document.getElementById('about');

    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.router.navigateByUrl('/about');
  }

  get cursorLeft(): string {
    return `${this.cursorX() - (this.isHovered() ? 24 : 5)}px`;
  }

  get cursorTop(): string {
    return `${this.cursorY() - (this.isHovered() ? 24 : 5)}px`;
  }

  get cursorSize(): string {
    return `${this.isHovered() ? 48 : 10}px`;
  }

  get cursorBackground(): string {
    return this.isHovered() ? 'rgba(212, 175, 55, 0.1)' : 'rgba(235, 215, 195, 0.95)';
  }
}
