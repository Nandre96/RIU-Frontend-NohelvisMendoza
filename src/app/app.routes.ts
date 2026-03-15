import { Routes } from '@angular/router';
import { SuperHeroDetail } from './heroes/components/super-hero-detail/super-hero-detail';
import { SuperHeroForm } from './heroes/components/super-hero-form/super-hero-form';
import { SuperHeroList } from './heroes/components/super-hero-list/super-hero-list';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    children: [
      { path: '', loadComponent: () => SuperHeroList },
      { path: 'new', loadComponent: () => SuperHeroForm },
      { path: ':slug', loadComponent: () => SuperHeroDetail },
      { path: ':id/edit', loadComponent: () => SuperHeroForm },
    ],
  },
  { path: '**', redirectTo: 'heroes' },
];
