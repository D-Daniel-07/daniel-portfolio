import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Experience } from '../experience/experience';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Projects, Skills, Experience],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-projects></app-projects>
    <app-skills></app-skills>
    <app-experience></app-experience>
  `,
})
export class Home {}
