import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SharedDataService } from '../../../core/services/shared-data.service';

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
  private pageSubscription!: Subscription;

  constructor(private authService: AuthService, private sharedDataService: SharedDataService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn.subscribe(
      // State changes every time user logs in or out
      loggedIn => {
        this.userLoggedIn = loggedIn;
        this.accountButtonText = 'Sign In';
      }
    );

    // Subscribe to page changes
    this.pageSubscription = this.sharedDataService.currentPage.subscribe(
      page => {
        // Update accountButtonText if user navigates to sign-in page
        if (page === 'sign-in') {
          this.accountButtonText = 'Sign Up';
        }
      }
    );
  }

  updateAccountButtonText(): void {
    // Reset accountButtonText if user navigates away from sign-in page
    if (!this.router.url.includes('sign-in')) {
      this.accountButtonText = 'Sign In';
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  @Output() openMyAccountEvent = new EventEmitter<void>();

  openMyAccount() {
    this.openMyAccountEvent.emit(); // Emit an event to parent
  }
}