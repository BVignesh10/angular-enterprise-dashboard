
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  // Demo login
  login(username: string, password: string): boolean {

    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem(this.TOKEN_KEY, 'demo-token-123');
      return true;
    }

    return false;
  }

  // Get stored token
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Check whether user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Logout user
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
