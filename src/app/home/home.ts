import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';
import { Experience } from '../experience/experience';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Projects, Skills, Experience, Contact],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-projects></app-projects>
    <app-skills></app-skills>
    <app-experience></app-experience>
    <app-contact></app-contact>
  `,
})
export class Home {}
