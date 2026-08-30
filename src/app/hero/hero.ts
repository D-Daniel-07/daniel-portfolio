import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  readonly cursorX = signal(-100);
  readonly cursorY = signal(-100);
  readonly isHovered = signal(false);
  readonly showCursor = signal(false);

  readonly navItems: NavItem[] = [
    { name: 'ABO', href: 'about' },
    { name: 'PROJECTS', href: 'projects' },
    { name: 'SKILLS', href: 'skills' },
    { name: 'EXPERIENCE', href: 'experience' },
    { name: 'CONTACT', href: 'contact' },
  ];

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
