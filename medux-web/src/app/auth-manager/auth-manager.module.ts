import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './auth-manager.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthManagerModule {
}
