import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./heroes/components/super-hero-list/super-hero-list').then(
            (m) => m.SuperHeroList,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./heroes/components/super-hero-form/super-hero-form').then(
            (m) => m.SuperHeroForm,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./heroes/components/super-hero-detail/super-hero-detail').then(
            (m) => m.SuperHeroDetail,
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./heroes/components/super-hero-form/super-hero-form').then(
            (m) => m.SuperHeroForm,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'heroes' },
];
