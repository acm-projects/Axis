// src/app/features/sign-up/sign-up.component.ts

import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],  // changed from styleUrl to styleUrls and as an array
  standalone: true
})
export class SignUpComponent {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  invalidDetails: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.invalidDetails = false;
  }

  signUp(): void {
    // First, register the user:
    this.http.post('http://localhost:8080/api/auth/register', {
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (signUpResponse: any) => {
        this.http.post('http://localhost:8080/api/auth/login', {
          email: this.email,
          password: this.password
        }).subscribe({
          next: (response: any) => {
            // Save the session from the login response
            this.authService.saveSession({
              email: response.account.email,
              token: response.token,
              firstName: response.account.first_name, // converting snake_case to camelCase
              lastName: response.account.last_name,
              phoneNumber: response.account.phone_number,
              gpa: response.account.gpa,
              satScore: response.account.sat_score,
              actScore: response.account.act_score
            });
            // Navigate to the home page (or account page) after successful login
            this.router.navigate(['/']);
          },
          error: err => {
            console.error("🚫 Login failed after registration", err);
            this.invalidDetails = true;
          }
        });
      },
      error: error => {
        console.error("🚫 Registration failed", error);
        this.invalidDetails = true;
      }
    });
  }
}
