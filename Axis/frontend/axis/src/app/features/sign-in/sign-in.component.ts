import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  signIn() : void {
    // console.log('email: ' + this.email + ', password: ' + this.password);

    /*
      TODO: Validate email and password
            Make HTTP request to backend to sign-in
    */
  }
}
