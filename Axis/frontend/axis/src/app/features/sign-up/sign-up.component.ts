import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective } from 'ngx-mask'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  invalidDetails: boolean;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.invalidDetails = false;
  }

  signUp() : void {
    this.http.post('http://localhost:8080/api/auth/register',
      {
        first_name: this.firstName,
        last_name: this.lastName,
        phone_number: this.phoneNumber,
        email: this.email,
        password: this.password
      }
    ).subscribe({
      next: (signUpResponse: any) => {

        this.http.post('http://localhost:8080/api/auth/login',
          {
            email: this.email,
            password: this.password
          }
        ).subscribe((loginResponse: any) => {
            this.authService.saveSession({
              email: this.email,
              token: loginResponse.token
            });
            this.router.navigate(['/']); // Redirect to home page
          });


      },
      error: error => {
        this.invalidDetails = true;
      }
    });
  }
}
