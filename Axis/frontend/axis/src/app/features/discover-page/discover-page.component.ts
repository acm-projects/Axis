import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { NgClass, NgFor } from '@angular/common';
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';
import { College } from '../../core/models/college.model';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../../core/services/shared-data.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-discover-page',
  imports: [FilterComponent, NgFor, AssetCardComponent, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './discover-page.component.html',
  styleUrl: './discover-page.component.css'
})
export class DiscoverPageComponent {
  page: number;
  lastPage: number = 0;
  pageButtons: number[] = [];
  collegesPerPage: number;
  colleges: College[] = [];
  baseURL: string = 'http://localhost:8080/api/colleges';

  constructor(private http: HttpClient, private sharedDataService: SharedDataService, private route: ActivatedRoute) {
    this.page = parseInt(<string>this.route.snapshot.queryParamMap.get('page'));
    this.collegesPerPage = 12;
    this.loadPage(this.page);   // Load first page

    // Store last page
    this.http.get<number>(`${this.baseURL}/total`).subscribe(
      (response: number) => {
        this.lastPage = Math.ceil(response / this.collegesPerPage);
      }
    );
  }

  loadPage(page: number): void {
    this.http.get<College>(`${this.baseURL}/searchByPage/${page}/${this.collegesPerPage}`).subscribe({
      next: (response: any) => {
        this.colleges = response;
        for (let college of this.colleges) {
          this.sharedDataService.saveCollege(college);
        }
        this.updatePageButtons(page);
      },
      error: error => {
        console.log('Failed to retrieve colleges');
      }
    });
  }

  updatePageButtons(page: number): void {
    this.pageButtons[0] = Math.ceil(page / 3) * 3 - 2;
    this.pageButtons[1] = Math.ceil(page / 3) * 3 - 1;
    this.pageButtons[2] = Math.ceil(page / 3) * 3;
    this.page = page;
  }
}
