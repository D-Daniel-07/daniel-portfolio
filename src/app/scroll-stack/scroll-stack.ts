import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
  input,
  output,
} from '@angular/core';
import Lenis from 'lenis';

@Component({
  selector: 'app-scroll-stack',
  standalone: true,
  templateUrl: './scroll-stack.html',
  styleUrl: './scroll-stack.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollStack implements AfterViewInit, OnDestroy {
  @ViewChild('scroller', { static: true })
  private readonly scrollerRef!: ElementRef<HTMLDivElement>;

  readonly className = input('');
  readonly itemDistance = input(80);
  readonly itemScale = input(0.03);
  readonly itemStackDistance = input(32);
  readonly stackPosition = input('15%');
  readonly scaleEndPosition = input('8%');
  readonly baseScale = input(0.88);
  readonly scaleDuration = input(0.5);
  readonly rotationAmount = input(0);
  readonly blurAmount = input(0);
  readonly useWindowScroll = input(true);

  readonly stackComplete = output<void>();

  private readonly ngZone = inject(NgZone);

  private lenis: Lenis | null = null;
  private animationFrameId: number | null = null;

  private cards: HTMLElement[] = [];
  private initialTops: number[] = [];

  private lastTransforms = new Map<
    number,
    {
      translateY: number;
      scale: number;
      rotation: number;
      blur: number;
    }
  >();

  private stackCompleted = false;
  private isUpdating = false;
  private destroyed = false;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initializeStack();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.lenis?.destroy();
    this.lenis = null;

    this.cards = [];
    this.initialTops = [];
    this.lastTransforms.clear();
    this.stackCompleted = false;
    this.isUpdating = false;
  }

  private initializeStack(): void {
    const host = this.scrollerRef.nativeElement;

    this.cards = Array.from(host.querySelectorAll('.scroll-stack-card')).filter(
      (card): card is HTMLElement =>
        card instanceof HTMLElement && typeof card.getBoundingClientRect === 'function',
    );

    if (!this.cards.length) {
      return;
    }

    /*
     * Record the natural top positions BEFORE
     * applying any transforms.
     */
    this.initialTops = this.cards.map((card) => {
      const rect = card.getBoundingClientRect();

      return rect.top + window.scrollY;
    });

    this.cards.forEach((card, index) => {
      card.style.zIndex = `${index + 1}`;

      if (index < this.cards.length - 1) {
        card.style.marginBottom = `${this.itemDistance()}px`;
      }

      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transformStyle = 'preserve-3d';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    this.setupLenis();
    this.updateCardTransforms();

    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  private readonly handleResize = (): void => {
    if (this.destroyed) {
      return;
    }

    this.initialTops = this.cards.map((card) => {
      const rect = card.getBoundingClientRect();

      return rect.top + window.scrollY;
    });

    this.updateCardTransforms();
  };

  private calculateProgress(scrollTop: number, start: number, end: number): number {
    if (scrollTop < start) {
      return 0;
    }

    if (scrollTop > end) {
      return 1;
    }

    if (end === start) {
      return 1;
    }

    return (scrollTop - start) / (end - start);
  }

  private parsePercentage(value: string | number, containerHeight: number): number {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }

    return typeof value === 'number' ? value : parseFloat(value);
  }

  private getScrollData(): {
    scrollTop: number;
    containerHeight: number;
  } {
    if (this.useWindowScroll()) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = this.scrollerRef.nativeElement;

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }

  private updateCardTransforms(): void {
    if (!this.cards.length || this.isUpdating || this.destroyed) {
      return;
    }

    this.isUpdating = true;

    const { scrollTop, containerHeight } = this.getScrollData();

    const stackPositionPx = this.parsePercentage(this.stackPosition(), containerHeight);

    const scaleEndPositionPx = this.parsePercentage(this.scaleEndPosition(), containerHeight);

    const host = this.scrollerRef.nativeElement;

    const endElement = this.useWindowScroll()
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (host.querySelector('.scroll-stack-end') as HTMLElement | null);

    const endElementTop = endElement ? endElement.getBoundingClientRect().top + window.scrollY : 0;

    this.cards.forEach((card, index) => {
      const cardTop = this.initialTops[index] ?? 0;

      const triggerStart = cardTop - stackPositionPx - this.itemStackDistance() * index;

      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = triggerStart;

      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);

      const targetScale = this.baseScale() + index * this.itemScale();

      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = this.rotationAmount() ? index * this.rotationAmount() * scaleProgress : 0;

      let blur = 0;

      /*
       * Calculate which card is currently
       * at the top of the stack.
       */
      if (this.blurAmount()) {
        let topCardIndex = 0;

        for (let j = 0; j < this.cards.length; j++) {
          const jCardTop = this.initialTops[j] ?? 0;

          const jTriggerStart = jCardTop - stackPositionPx - this.itemStackDistance() * j;

          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (index < topCardIndex) {
          const depth = topCardIndex - index;

          blur = Math.max(0, depth * this.blurAmount());
        }
      }

      let translateY = 0;

      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + this.itemStackDistance() * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + this.itemStackDistance() * index;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,

        scale: Math.round(scale * 1000) / 1000,

        rotation: Math.round(rotation * 100) / 100,

        blur: Math.round(blur * 100) / 100,
      };

      const previous = this.lastTransforms.get(index);

      const hasChanged =
        !previous ||
        Math.abs(previous.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(previous.scale - newTransform.scale) > 0.001 ||
        Math.abs(previous.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(previous.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform =
          `translate3d(0, ${newTransform.translateY}px, 0) ` +
          `scale(${newTransform.scale}) ` +
          `rotate(${newTransform.rotation}deg)`;

        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        this.lastTransforms.set(index, newTransform);
      }

      /*
       * Last card determines when the
       * complete stack has entered the
       * pinned state.
       */
      if (index === this.cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isInView && !this.stackCompleted) {
          this.stackCompleted = true;

          this.ngZone.run(() => {
            this.stackComplete.emit();
          });
        } else if (!isInView && this.stackCompleted) {
          this.stackCompleted = false;
        }
      }
    });

    this.isUpdating = false;
  }

  private setupLenis(): void {
    this.lenis = new Lenis({
      duration: 1.2,

      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,

      wheelMultiplier: 1,

      touchMultiplier: 2,

      infinite: false,
    });

    this.lenis.on('scroll', () => {
      this.updateCardTransforms();
    });

    const raf = (time: number): void => {
      if (this.destroyed) {
        return;
      }

      this.lenis?.raf(time);

      this.animationFrameId = requestAnimationFrame(raf);
    };

    this.animationFrameId = requestAnimationFrame(raf);
  }
}
