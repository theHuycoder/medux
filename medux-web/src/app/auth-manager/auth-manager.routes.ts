import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@libs/auth';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
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
