import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'medux-auth-layout',
  templateUrl: './auth-layout.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class AuthLayoutComponent {}
