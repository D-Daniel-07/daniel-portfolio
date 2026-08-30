import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="about">
      <div class="card">
        <p class="eyebrow">About</p>
        <h2>Designer, developer, problem-solver.</h2>
        <p>
          I’m a frontend engineer focused on creating polished, user-centered experiences.
          I enjoy turning complex ideas into clear, accessible interfaces that feel effortless.
        </p>
        <button type="button" class="back-button" routerLink="/">Back home</button>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .about {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f8fafc;
      color: #0f172a;
      padding: 2rem;
    }

    .card {
      max-width: 640px;
      background: #ffffff;
      border-radius: 1.5rem;
      padding: 2.5rem;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.18rem;
      font-size: 0.76rem;
      color: #475569;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 1rem;
      line-height: 1.2;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
      margin: 0 0 1.5rem;
    }

    .back-button {
      background: #0f172a;
      color: #f8fafc;
      border: none;
      border-radius: 999px;
      padding: 0.85rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
    }
  `,
})
export class AboutComponent {}
