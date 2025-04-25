import { Component } from '@angular/core';
import { ResourceHeaderComponent } from '../../shared/components/resource-header/resource-header.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import {NgClass, NgFor} from '@angular/common';
import {Scholarship} from '../../core/models/scholarship.model';
import {HttpClient} from '@angular/common/http';
import {SharedDataService} from '../../core/services/shared-data.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-resources-page',
  imports: [ResourceHeaderComponent, FilterComponent, NgFor, RouterLink, NgClass, FormsModule],
  templateUrl: './resources-page.component.html',
  styleUrl: './resources-page.component.css',
  standalone: true
})
export class ResourcesPageComponent {
  page: number;
  lastPage: number = 0;
  pageButtons: number[] = [];
  scholarshipsPerPage: number;
  scholarships: Scholarship[] = [];
  baseURL: string = 'http://localhost:8080/api/scholarships';
  locations: string[] = ['Australia', 'Canada', 'New Zealand', 'United States of America', 'Austria', 'Belgium',
    'Germany', 'Italy', 'Luxembourg', 'Poland', 'Switzerland', 'France', 'Bolivia (Plurinational State of)',
    'Brazil', 'China', 'Ecuador', 'India', 'Indonesia', 'Peru', 'Spain', 'Sri Lanka', 'Viet Nam', 'Afghanistan',
    'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'Cyprus',
    'Georgia', 'Hong Kong', 'Iran (Islamic Republic of)', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan',
    `Korea (Democratic People's Republic of)`, 'Korea (Republic of)', 'Kuwait', 'Kyrgyzstan',
    `Lao People's Democratic Republic`, 'Lebanon', 'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar',
    'Nepal', 'Oman', 'Pakistan', 'Palestine', 'State of', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore',
    'Syrian Arab Republic', 'Taiwan', 'Province of China', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Türkiye',
    'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Yemen', 'Anguilla', 'Antigua and Barbuda', 'Aruba',
    'Bahamas', 'Barbados', 'Bonaire', 'Sint Eustatius and Saba', 'Cayman Islands', 'Cuba', 'Curaçao', 'Dominica',
    'Dominican Republic', 'Grenada', 'Guadeloupe', 'Haiti', 'Jamaica', 'Martinique', 'Montserrat',
    'Saint Barthélemy', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)',
    'Saint Vincent and the Grenadines', 'Sint Maarten (Dutch part)', 'Trinidad and Tobago',
    'Turks and Caicos Islands', 'Virgin Islands (British)', 'Mexico', 'Argentina', 'Egypt', 'Chile', 'Colombia',
    'Palau', 'Panama', 'Paraguay', 'Greece', 'Finland', 'Lithuania', 'Belize', 'Costa Rica', 'El Salvador',
    'Guatemala', 'Honduras', 'Nicaragua', 'French Guiana', 'Guyana', 'Suriname', 'Uruguay',
    'Venezuela (Bolivarian Republic of)', 'United Kingdom of Great Britain and Northern Ireland',
    'Marshall Islands', 'Micronesia (Federated States of)', 'Ireland'];
  statuses: {value: string, status: boolean}[] = [{value: 'Open', status: false}, {value: 'Closed', status: false}];
  searchInput: string = "";
  locationFilters: string[] = [];
  amountFilter: {min: number, max: number} = {min: 0, max: 0};
  checkboxFilters: {value: string, status: boolean}[] = [];

  constructor(private http: HttpClient, private sharedDataService: SharedDataService, private route: ActivatedRoute) {
    this.page = parseInt(<string>this.route.snapshot.queryParamMap.get('page'));
    this.scholarshipsPerPage = 12;
    this.loadPage(this.page);   // Load first page

    // Store last page
    this.http.get<number>(`${this.baseURL}/total`).subscribe(
      (response: number) => {
        this.lastPage = Math.ceil(response / this.scholarshipsPerPage);
      }
    );
  }

  loadPage(page: number): void {
    let url: string = `${this.baseURL}/searchByPage/${page}/${this.scholarshipsPerPage}`;
    let filterParams: string[] = [];
    if (this.searchInput.length > 0)
    {
      filterParams.push(`keyword=${this.searchInput}`);
    }
    if (this.locationFilters.length > 0)
    {
      filterParams.push(`location=${this.locationFilters.join(',')}`);
    }
    if (this.amountFilter.max > 0)
    {
      filterParams.push(`amountRange=${this.amountFilter.min},${this.amountFilter.max}`);
    }
    // if (this.annualTuitionFilter.max > 0)
    // {
    //   filterParams.push(`tuitionRange=${this.annualTuitionFilter.min},${this.annualTuitionFilter.max}`);
    // }
    if (filterParams.length > 0) {
      url = `${this.baseURL}/searchByFilters/${page}/${this.scholarshipsPerPage}?${filterParams.join('&')}`;
    }

    this.http.get<Scholarship>(url).subscribe({
      next: (response: any) => {
        this.scholarships = response;
        for (let scholarship of this.scholarships) {
          this.sharedDataService.saveScholarship(scholarship);
        }
        this.updatePageButtons(page);
      },
      error: error => {
        console.log('Failed to retrieve scholarships');
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
