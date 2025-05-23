import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';
import { College } from '../../core/models/college.model';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../../core/services/shared-data.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {FormsModule} from '@angular/forms';
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
  imports: [FilterComponent, NgFor, NgIf, AssetCardComponent, NgClass, RouterLink, RouterLinkActive, FormsModule],
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
  locations: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia', 'American Samoa', 'Guam', 'Northern Mariana Islands',
    'Puerto Rico', 'United States Minor Outlying Islands', 'Virgin Islands, U.S.'];
  searchInput: string = "";
  locationFilters: string[] = [];
  acceptanceRateFilter: {min: number, max: number} = {min: 0, max: 0};
  annualTuitionFilter: {min: number, max: number} = {min: 0, max: 0};
  email: string | null;
  bookmarks: any = [];
  isLoaded = false;
  ivyLeagueIds: number[] = [2789, 42, 346, 3384, 3446, 1474, 417, 3861, 3322, 944, 2226, 3228, 584 , 472, 691, 569];
  isInitialLoad: boolean = true;

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private bookmarkService: BookmarksService,
    private authService: AuthService
  ) {
    this.page = parseInt(<string>this.route.snapshot.queryParamMap.get('page'));
    this.collegesPerPage = 12;
    if (this.page === 1) {
      this.loadIvyLeagueColleges();
    } else {
      this.loadPage(this.page);
      this.isInitialLoad = false;
    }
    this.email = this.authService.getUserEmail()


    // Store last page
    this.http.get<number>(`${this.baseURL}/total`).subscribe(
      (response: number) => {
        this.lastPage = Math.ceil(response / this.collegesPerPage);
      }

    );
  }

  loadIvyLeagueColleges(): void {
    const requests = this.ivyLeagueIds.map(id =>
      this.http.get<College>(`${this.baseURL}/searchByID/${id}`)
    );

    Promise.all(requests.map(req => req.toPromise()))
      .then(results => {
        this.colleges = results.filter((college): college is College => college !== undefined);
        for (let college of this.colleges) {
          this.sharedDataService.saveCollege(college);
        }
        this.applyBookmarks();
        setTimeout(() => this.isLoaded = true);
      })
      .catch(error => {
        console.log('Failed to retrieve Ivy League colleges:', error);
        this.isLoaded = true;
      });
  }


  loadPage(page: number): void {
    this.isInitialLoad = false
    let url: string = `${this.baseURL}/searchByPage/${page}/${this.collegesPerPage}`;
    let filterParams: string[] = [];
    if (this.searchInput.length > 0)
    {
      filterParams.push(`keyword=${this.searchInput}`);
    }
    if (this.locationFilters.length > 0)
    {
      filterParams.push(`location=${this.locationFilters.join(',')}`);
    }
    if (this.acceptanceRateFilter.max > 0)
    {
      filterParams.push(`acceptanceRateRange=${this.acceptanceRateFilter.min},${this.acceptanceRateFilter.max}`);
    }
    if (this.annualTuitionFilter.max > 0)
    {
      filterParams.push(`tuitionRange=${this.annualTuitionFilter.min},${this.annualTuitionFilter.max}`);
    }
    if (filterParams.length > 0) {
      url = `${this.baseURL}/searchByFilters/${page}/${this.collegesPerPage}?${filterParams.join('&')}`;
    }

    this.http.get<College>(url).subscribe({
      next: (response: any) => {
        this.isLoaded = false;
        this.colleges = response;
        for (let college of this.colleges) {
          this.sharedDataService.saveCollege(college);
        }
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

  resetFilters(): void {
    this.locationFilters = [];
    this.acceptanceRateFilter.min = 0;
    this.acceptanceRateFilter.max = 0;
    this.annualTuitionFilter.min = 0;
    this.annualTuitionFilter.max = 0;
  }

  updatePageButtons(page: number): void {
    this.pageButtons[0] = Math.ceil(page / 3) * 3 - 2;
    this.pageButtons[1] = Math.ceil(page / 3) * 3 - 1;
    this.pageButtons[2] = Math.ceil(page / 3) * 3;
    this.page = page;
  }
}
