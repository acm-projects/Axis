import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../core/services/shared-data.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
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

  signIn(): void {
    this.http.post('http://localhost:8080/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response && response.account) {
          this.authService.saveSession({
            email: response.account.email,             // Ensure backend returns this field
            token: response.token,
            firstName: response.account.first_name,      // Convert snake_case to camelCase here
            lastName: response.account.last_name,
            phoneNumber: response.account.phone_number,
            gpa: response.account.gpa,
            satScore: response.account.sat_score,
            actScore: response.account.act_score
          });
          this.router.navigate(['/account']);
        } else {
          console.error('Login response did not contain account details.');
          this.invalidCredentials = true;
        }
      },
      error: error => {
        console.error("Login failed:", error);
        this.invalidCredentials = true;
      }
    });
  }

}
