import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  accountButtonText: string = 'Sign In';
  dropdownToggle: boolean = false;

  userLoggedIn: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn.subscribe(
      loggedIn => {
        this.userLoggedIn = loggedIn;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.authSubscription.unsubscribe();
  }
}
