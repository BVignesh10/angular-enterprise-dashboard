import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    const success = this.authService.login(
      this.username,
      this.password
    );

    if (success) {
      alert('Login successful! Demo token stored.');
      this.router.navigate(['/dashboard']); // Dashboard navigation
    } else {
      alert('Invalid username or password');
    }
  }

  // New Sign Up action
  onSignUp(): void {
    alert('Sign Up page is under backend integration! (Backend work)');
  }

  // New Forgot Password action
  onForgotPassword(): void {
    alert('Password reset link will be sent to registered email! (Backend work)');
  }
}