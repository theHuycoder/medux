import { Component, inject } from '@angular/core';
import { SupertokensService } from '@libs/shared/ds-core-ang';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'medux-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SignInComponent {
  private authService = inject(SupertokensService);
  private fb = inject(FormBuilder);
  signInForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  onSignIn() {
    if (this.signInForm.invalid) {
      return;
    }
    const { email, password } = this.signInForm.value;
    this.authService.postEmailPasswordSignIn(email as string, password as string).subscribe(console.log);
  }
}
