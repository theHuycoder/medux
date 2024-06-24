import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@libs/auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    component: AuthLayoutComponent,
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadComponent: () => import('@libs/auth').then((m) => m.SignInViewComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('@libs/auth').then((m) => m.SignUpViewComponent),
      },
    ],
  },
];
