import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';
import { College } from '../../core/models/college.model';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../../core/services/shared-data.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {BookmarksService} from '../../core/services/bookmarks.service';
import {AuthService} from '../../core/services/auth.service';
import {Bookmark} from '../../core/models/bookmark.model';
import {
  trigger,
  transition,
  query,
  stagger, animateChild
} from '@angular/animations';


@Component({
  selector: 'app-discover-page',
  imports: [FilterComponent, NgFor, NgIf, AssetCardComponent, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './discover-page.component.html',
  styleUrl: './discover-page.component.css',
  standalone: true,
  animations: [
    trigger('listStagger', [
      transition(':enter', [
        query('@fadeInStagger', [
          stagger(55, animateChild())
        ], { optional: true })
      ])
    ])
  ]

})
export class DiscoverPageComponent {
  page: number;
  lastPage: number = 0;
  pageButtons: number[] = [];
  collegesPerPage: number;
  colleges: College[] = [];
  baseURL: string = 'http://localhost:8080/api/colleges';
  email: string | null;
  bookmarks: any = [];
  isLoaded = false;



  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private bookmarkService: BookmarksService,
    private authService: AuthService
) {
    this.page = parseInt(<string>this.route.snapshot.queryParamMap.get('page'));
    this.collegesPerPage = 12;
    this.loadPage(this.page);
    this.email = this.authService.getUserEmail()


    // Store last page
    this.http.get<number>(`${this.baseURL}/total`).subscribe(
      (response: number) => {
        this.lastPage = Math.ceil(response / this.collegesPerPage);
      }

    );
  }

  loadPage(page: number): void {
    this.isLoaded = false;
    this.http.get<College[]>(`${this.baseURL}/searchByPage/${page}/${this.collegesPerPage}`).subscribe({
      next: (response: any) => {
        this.colleges = response;
        this.updatePageButtons(page);
        this.applyBookmarks();
        setTimeout(() => this.isLoaded = true);
      },
      error: error => {
        console.log('Failed to retrieve colleges: ' + String(error));
        this.isLoaded = true;
      },
    });
  }


  private applyBookmarks() {
    if (!this.email || !this.colleges.length) return;
    this.bookmarkService.getCollegeBookmarks(this.email)
      .subscribe((raw: Bookmark[]) => {
        const ids = new Set(raw.map(b => b.id));
        this.colleges.forEach(c =>
          c.isBookmarked = ids.has(c.college_id)
        );
      });
  }


  updatePageButtons(page: number): void {
    this.pageButtons[0] = Math.ceil(page / 3) * 3 - 2;
    this.pageButtons[1] = Math.ceil(page / 3) * 3 - 1;
    this.pageButtons[2] = Math.ceil(page / 3) * 3;
    this.page = page;
  }


}
