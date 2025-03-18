import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures the service is a singleton
})
export class AuthService {
  private userKey = 'user'; // Key for storing user data in localStorage

  // BehaviorSubject to track auth state
  private authState = new BehaviorSubject<boolean>(this.checkSession());
  isLoggedIn = this.authState.asObservable();

  constructor() {}

  // Check if user session exists
  private checkSession(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  // Save user session (after login)
  saveSession(user: {id: string; token: string}): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.authState.next(true); // Notify subscribers
  }

  // Get user session
  getSession(): {id: string; token: string} | null {
    const session = localStorage.getItem(this.userKey);
    return session ? JSON.parse(session) : null;
  }

  // Log out user
  logout(): void {
    localStorage.removeItem(this.userKey);
    this.authState.next(false); // Notify subscribers
  }
}
