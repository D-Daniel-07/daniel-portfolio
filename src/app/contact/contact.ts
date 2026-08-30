import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection', { static: true })
  private readonly contactSection!: ElementRef<HTMLElement>;

  readonly currentYear = new Date().getFullYear();

  readonly formData = signal({
    name: '',
    email: '',
    message: '',
  });

  readonly sent = signal(false);

  private readonly elementRef = inject(ElementRef);

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  updateName(value: string): void {
    this.formData.update((data) => ({
      ...data,
      name: value,
    }));
  }

  updateEmail(value: string): void {
    this.formData.update((data) => ({
      ...data,
      email: value,
    }));
  }

  updateMessage(value: string): void {
    this.formData.update((data) => ({
      ...data,
      message: value,
    }));
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.sent.set(true);
  }

  private initializeAnimations(): void {
    const section = this.contactSection.nativeElement;

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
}
