import { Component } from '@angular/core';
import { ResourceHeaderComponent } from '../../shared/components/resource-header/resource-header.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import {NgClass, NgFor} from '@angular/common';
import {Scholarship} from '../../core/models/scholarship.model';
import {HttpClient} from '@angular/common/http';
import {SharedDataService} from '../../core/services/shared-data.service';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-resources-page',
  imports: [ResourceHeaderComponent, FilterComponent, NgFor, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './resources-page.component.html',
  styleUrl: './resources-page.component.css'
})
export class ResourcesPageComponent {
  page: number;
  lastPage: number = 0;
  pageButtons: number[] = [];
  scholarshipsPerPage: number;
  scholarships: Scholarship[] = [];
  baseURL: string = 'http://localhost:8080/api/scholarships';

  constructor(private http: HttpClient, private sharedDataService: SharedDataService, private route: ActivatedRoute) {
    this.page = parseInt(<string>this.route.snapshot.queryParamMap.get('page'));
    this.scholarshipsPerPage = 8;
    this.loadPage(this.page);   // Load first page

    // Store last page
    this.http.get<number>(`${this.baseURL}/total`).subscribe(
      (response: number) => {
        this.lastPage = Math.ceil(response / this.scholarshipsPerPage);
      }
    );
  }

  loadPage(page: number): void {
    this.http.get<Scholarship>(`${this.baseURL}/searchByPage/${page}/${this.scholarshipsPerPage}`).subscribe({
      next: (response: any) => {
        this.scholarships = response;
        for (let scholarship of this.scholarships) {
          this.sharedDataService.saveScholarship(scholarship);
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

  // handleSearch(event:any) {
  //   event.preventDefault(); // Prevents page reload
  //   //const searchValue = document.getElementById('searchInput').value;
  //   //console.log('Search submitted:', searchValue);
  // }

}
