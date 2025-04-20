import { NgIf } from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BookmarksService} from '../../../core/services/bookmarks.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-resource-header',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './resource-header.component.html',
  styleUrl: './resource-header.component.css',
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
export class ResourceHeaderComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() org: string = '';
  @Input() imgLink: string = '';
  @Input() content: string = '';
  @Input() isBookmarked: boolean = false;
  email: string | null;
  hoverState: string = 'no';

  constructor(
    private bookmarksService: BookmarksService,
    private authService: AuthService,
  ) {
    this.email = this.authService.getUserEmail();
  }

  bookmarkScholarship(id: number, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isBookmarked) {
      this.bookmarksService.bookmarkScholarship(
        this.email as string,
        id
      )
        .subscribe(() => this.isBookmarked = true);
    } else {
      this.bookmarksService.removeBookmarkScholarship(
        this.email as string,
        id
      ).subscribe(() => this.isBookmarked = false);
    }

  }

}
