import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SharedDataService } from '../../../core/services/shared-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ThemeService} from '../../../theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  animations: [
    trigger('linkHover', [
      state('yes', style({
        opacity: 0.5,
        transform: 'translateY(-0.5px)'
      })),
      state('no', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('no => yes', [
        animate('{{ timing }} {{ delay }} ease-out')
      ], {
        params: {
          timing: '0.15s',
          delay: '0s'
        }
      }),
      transition('yes => no', [
        animate('{{ timing }} ease-in')
      ], {
        params: {
          timing: '0.15s'
        }
      })
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  dropdownToggle: boolean = false;
  hoverStateDiscover: string = 'no';
  hoverStateResources: string = 'no';
  hoverStateMyAccount: string = 'no';
  isLight = false;

  userLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  private pageSubscription!: Subscription;

  constructor(private authService: AuthService,
              private sharedDataService: SharedDataService,
              private router: Router,
              private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn.subscribe(
      // State changes every time user logs in or out
      loggedIn => {
        this.userLoggedIn = loggedIn;
      }
    );



    this.themeService.isLight$.subscribe(value => this.isLight = value);
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

  toggleTheme() {
    this.themeService.toggle();
  }
}
