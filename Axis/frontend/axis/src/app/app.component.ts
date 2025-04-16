import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAccountComponent } from './features/user-account/user-account.component';
import { AuthService } from './core/services/auth.service';
import { NgIf } from '@angular/common';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, UserAccountComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'axis';
  showMyAccountPage: boolean = false;
  isLight = false;

  constructor(private authService: AuthService, private themeService: ThemeService) {}

  openMyAccount(): void {
    this.showMyAccountPage = true;
  }

  closeMyAccount(): void {
    this.showMyAccountPage = false;
  }

  ngOnInit() {
    this.themeService.loadInitial();
    this.themeService.isLight$.subscribe(value => this.isLight = value);
  }
}
