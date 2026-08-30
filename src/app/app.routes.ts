import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
];
