import { Component } from '@angular/core';
import { SignUpComponent } from '../../features/sign-up/sign-up.component';

@Component({
  selector: 'medux-sign-up-view',
  template: `
    <div class="w-1/2 mx-auto flex items-center justify-center h-full">
      <div class="flex-1">
        <medux-sign-up></medux-sign-up>
      </div>
    </div>
  `,
  standalone: true,
  imports: [SignUpComponent],
})
export class SignUpViewComponent {}
