import { Component } from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAccountComponent } from './features/user-account/user-account.component';
import { AuthService } from './core/services/auth.service';
import { NgIf } from '@angular/common';
import { ThemeService } from './theme.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';
import {SplineViewerComponent} from './shared/spline-viewer/spline-viewer.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, UserAccountComponent, NgIf, SplineViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  animations: [
    trigger('routeFadeAnimation', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('500ms ease', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0 }),
            animate('500ms ease', style({ opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})


export class AppComponent {
  title = 'axis';
  showMyAccountPage: boolean = false;
  isLight = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private contexts: ChildrenOutletContexts
  ) {}

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

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.routeConfig?.path;
  }

}
