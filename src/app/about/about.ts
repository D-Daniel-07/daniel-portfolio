import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

interface Stat {
  value: string;
  label: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly isCardHovered = signal(false);

  readonly rotateX = signal(0);
  readonly rotateY = signal(0);

  readonly spotlightX = signal(200);
  readonly spotlightY = signal(200);

  readonly stats: Stat[] = [
    {
      value: '2+',
      label: 'Years of Experience',
    },
    {
      value: 'Angular',
      label: 'Proficiency',
      highlight: true,
    },
    {
      value: '500+',
      label: 'DSA Problems Solved',
    },
    {
      value: '8.03',
      label: 'CGPA',
      highlight: true,
    },
  ];

  onCardMouseMove(event: MouseEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    this.rotateX.set(y * -32);
    this.rotateY.set(x * 32);

    this.spotlightX.set(event.clientX - rect.left);
    this.spotlightY.set(event.clientY - rect.top);
  }

  onCardMouseEnter(): void {
    this.isCardHovered.set(true);
  }

  onCardMouseLeave(): void {
    this.isCardHovered.set(false);

    this.rotateX.set(0);
    this.rotateY.set(0);
  }

  get cardTransform(): string {
    return `
      perspective(1400px)
      rotateX(${this.rotateX()}deg)
      rotateY(${this.rotateY()}deg)
    `;
  }

  get spotlightBackground(): string {
    return `
      radial-gradient(
        circle 240px at
        ${this.spotlightX()}px
        ${this.spotlightY()}px,
        rgba(255, 255, 255, 0.35),
        rgba(212, 175, 55, 0.18),
        transparent 80%
      )
    `;
  }
}
