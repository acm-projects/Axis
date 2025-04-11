import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../core/services/shared-data.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  standalone: true
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;

  invalidCredentials: boolean;

  constructor(private http: HttpClient, private authService: AuthService,
              private sharedDataService: SharedDataService, private router: Router) {
    this.email = '';
    this.password = '';
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.sharedDataService.setCurrentPage('sign-in');
  }

  signIn() : void {
    this.http.post('http://localhost:8080/api/auth/login',
      {
        email: this.email,
        password: this.password
      }
    ).subscribe({
      next: (response: any) => {
        this.authService.saveSession({
          email: this.email,
          token: response.token
        });
        this.router.navigate(['/']); // Redirect to home page
      },
      error: error => {
        this.invalidCredentials = true;
      }
    });
  }
}
