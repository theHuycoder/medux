import { Routes } from '@angular/router';
import { canRedirectToDashboardGuard } from '@libs/auth/guards';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
//    canActivate: [canRedirectToDashboardGuard],
    loadChildren: () => import('./auth-manager/auth-manager.module').then(mod => mod.AuthManagerModule),
  },
];
