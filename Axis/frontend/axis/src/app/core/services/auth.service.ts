import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures the service is a singleton
})
export class AuthService {
  private userKey = 'user'; // Key for storing user data in localStorage

  constructor() {}

  // Save user session (after login)
  saveSession(user: { id: string; token: string }): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Get current user session
  getSession(): { id: string; token: string } | null {
    const session = localStorage.getItem(this.userKey);
    return session ? JSON.parse(session) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getSession();
  }

  // Log out user
  logout(): void {
    localStorage.removeItem(this.userKey);
  }
}
