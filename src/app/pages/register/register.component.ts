import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
  this.error = '';
  this.success = '';

  if (!this.isValidEmail(this.email)) {
    this.error = 'Please enter a valid email address.';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.error = 'Passwords do not match.';
    return;
  }

  this.auth.register(this.email, this.password).subscribe({
    next: () => {
      this.success = 'Account created! Redirecting to login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: () => {
      this.error = 'Registration failed. Email may already exist.';
    }
  });
}


  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
