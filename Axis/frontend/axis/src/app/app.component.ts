import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAccountComponent } from './features/user-account/user-account.component';
import { AuthService } from './core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, UserAccountComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'axis';
  showMyAccountPage : boolean = false

  constructor (private authService : AuthService) {}

  openMyAccount(): void {
    this.showMyAccountPage = true;
  }
  closeMyAccount(): void {
    this.showMyAccountPage = false;
  }  
}
