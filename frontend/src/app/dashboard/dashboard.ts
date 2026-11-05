import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  currentTheme: 'light' | 'dark' | 'default' = 'default';
  isThemeMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleThemeMenu(): void {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
  }

  setTheme(theme: 'light' | 'dark' | 'default'): void {
    this.currentTheme = theme;
    this.isThemeMenuOpen = false; // Theme select chesaka menu auto close avtundi
  }

  logout(): void {
    this.authService.logout();
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}