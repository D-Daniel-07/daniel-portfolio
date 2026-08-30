import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">Portfolio</p>
        <h1>Hi, I’m Daniel.</h1>
        <p class="subtitle">
          I build thoughtful digital experiences that blend design and modern web technology.
        </p>
        <button type="button" class="about-button" routerLink="/about">About</button>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .hero {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%);
      color: #f8fafc;
      padding: 2rem;
    }

    .hero__content {
      max-width: 620px;
      text-align: center;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      font-size: 0.75rem;
      opacity: 0.8;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: clamp(2.5rem, 6vw, 5rem);
      line-height: 1.1;
      margin: 0 0 1rem;
    }

    .subtitle {
      font-size: 1.1rem;
      line-height: 1.7;
      max-width: 560px;
      margin: 0 auto 2rem;
      opacity: 0.85;
    }

    .about-button {
      background: #f8fafc;
      color: #0f172a;
      border: none;
      border-radius: 999px;
      padding: 0.9rem 1.8rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
    }

    .about-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.28);
    }
  `,
})
export class HeroComponent {}
