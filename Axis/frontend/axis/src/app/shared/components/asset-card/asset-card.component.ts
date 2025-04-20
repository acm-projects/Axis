import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../../core/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {BookmarksService} from '../../../core/services/bookmarks.service';

@Component({
  selector: 'app-asset-card',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.css',
  standalone: true,
  host: {
    '[@fadeInStagger]': 'true'
  },
  animations: [
    trigger('cardHover', [
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
          timing: '0.25s',
          delay: '0s'
        }
      }),
      transition('yes => no', [
        animate('{{ timing }} ease-in')
      ], {
        params: {
          timing: '0.25s'
        }
      })
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  ]
})
export class AssetCardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() imgLink: string = '';
  @Input() isBookmarked: boolean = false;
  email: string | null = null;
  hoverState: string = 'no';


  constructor(
    private authService: AuthService,
    private bookmarksService: BookmarksService
) {
    this.email = this.authService.getUserEmail();
  }

  isFallbackCollegeLogo(link: string): boolean {
    return link.includes('Default-bf-illus-school')
  }

  bookmarkCollege(id: number, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isBookmarked) {
      this.bookmarksService.bookmarkCollege(
        this.email as string,
        id
      ).subscribe(() => this.isBookmarked = true);
    } else {
      this.bookmarksService.removeBookmarkCollege(
        this.email as string,
        id
      ).subscribe(() => this.isBookmarked = false);
    }
  }
}
