import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  signIn() : void {
    this.http.post('http://localhost:8080/auth/login',
      {
        username: this.username,
        password: this.password
      },
    ).subscribe((response: any) => {
      console.log('Response: ' + JSON.stringify(response));
      this.authService.saveSession({
        id: response.id,
        token: response.token
      });
      this.router.navigate(['/']);
    });
  }
}
