import { Component, inject, OnInit } from '@angular/core';
import { SupertokensService } from '@libs/shared/ds-core-ang';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'medux-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
})
export class SignUpComponent implements OnInit {
  private authService = inject(SupertokensService);
  private fb = inject(FormBuilder);
  public signUpForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  submitSignUpForm() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { email, password } = this.signUpForm.value;

    this.authService.postEmailPasswordSignUp(email, password).subscribe(console.log);
  }

  private initForm() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      {
        validator: this.passwordMatchingValidator,
      },
    );
  }

  private passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notMatched: true };
  };
}
