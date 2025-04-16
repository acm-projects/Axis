// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Session {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  gpa: string;
  satScore: string;
  actScore: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'user';
  // Use a BehaviorSubject to track authentication state if needed
  private authState = new BehaviorSubject<boolean>(this.checkSession());
  isLoggedIn = this.authState.asObservable();

  constructor() {}

  private checkSession(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  // Save the session data (token + account details) after login
  saveSession(session: Session): void {
    localStorage.setItem(this.userKey, JSON.stringify(session));
    this.authState.next(true);
  }

  // Retrieve the session data
  getSession(): Session | null {
    const session = localStorage.getItem(this.userKey);
    return session ? JSON.parse(session) : null;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.authState.next(false);
  }

  // For convenience, a getter to retrieve the email/primary key
  getUserEmail(): string | null {
    const session = this.getSession();
    return session?.email || null;
  }
}
