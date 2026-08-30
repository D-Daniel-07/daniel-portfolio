import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./hero/hero').then((m) => m.Hero),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.AboutComponent),
  },
];
