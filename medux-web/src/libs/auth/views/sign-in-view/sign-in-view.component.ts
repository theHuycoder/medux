import { Component } from '@angular/core';
import { SignInComponent } from '../../features/sign-in/sign-in.component';

@Component({
  selector: 'medux-sign-in-view',
  template: `
    <div class="w-1/2 mx-auto flex items-center justify-center h-full">
      <div class="flex-1">
        <medux-sign-in></medux-sign-in>
      </div>
    </div>
  `,
  standalone: true,
  imports: [SignInComponent],
})
export class SignInViewComponent {}
