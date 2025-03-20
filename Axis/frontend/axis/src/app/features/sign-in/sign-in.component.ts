import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  invalidCredentials: boolean;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.invalidCredentials = false;
  }

  ngOnInit(): void {



  }

  signIn() : void {
    this.http.post('http://localhost:8080/auth/login',
      {
        email: this.email,
        password: this.password
      },
    ).subscribe({
      next: (response: any) => {
        console.log('Response: ' + JSON.stringify(response));
        this.authService.saveSession({
          id: response.id,
          token: response.token
        });
        this.router.navigate(['/']);
      },
      error: error => {
        this.email = '';
        this.password = '';
        this.invalidCredentials = true;
      }
    });
  }
}
