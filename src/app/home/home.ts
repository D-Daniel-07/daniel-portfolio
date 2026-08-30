import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Projects],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-projects></app-projects>
  `,
})
export class Home {}
