import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../../core/services/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { Scholarship } from '../../core/models/scholarship.model';

@Component({
  selector: 'app-resource-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css'],
})
export class ResourceInfoComponent implements OnInit {
  scholarship: Scholarship | undefined;
  isOpen: boolean = false;

  abbreviatedMonths: { [key: string]: string } = {
    'January': 'Jan',
    'February': 'Feb',
    'March': 'Mar',
    'April': 'Apr',
    'May': 'May',
    'June': 'Jun',
    'July': 'Jul',
    'August': 'Aug',
    'September': 'Sep',
    'October': 'Oct',
    'November': 'Nov',
    'December': 'Dec',
  };

  formattedOpenDate: { day: string; month: string; year: string } | null = null;
  formattedCloseDate: { day: string; month: string; year: string } | null = null;

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam);
      const storedScholarship = this.sharedDataService.getScholarship(id);
      if (storedScholarship) {
        this.scholarship = storedScholarship;
      } else {
        this.http.get<Scholarship>(
          `http://localhost:8080/api/scholarships/searchByID/${id}`
        ).subscribe({
          next: (response: Scholarship) => {
            this.scholarship = response;
            this.sharedDataService.saveScholarship(response);
          },
          error: error => {
            console.error('Failed to retrieve scholarship', error);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    if (this.scholarship?.openDate && this.scholarship?.closeDate) {
      const now = new Date();
      const open = new Date(this.scholarship.openDate);
      const close = new Date(this.scholarship.closeDate);
      this.isOpen = now >= open && now <= close;
    }

    if (this.scholarship?.openDate) {
      const date = new Date(this.scholarship.openDate);
      this.formattedOpenDate = {
        day: date.getDate().toString(),
        month: this.abbreviatedMonths[date.toLocaleString('default', { month: 'long' })],
        year: date.getFullYear().toString(),
      };
    }

    if (this.scholarship?.closeDate) {
      const date = new Date(this.scholarship.closeDate);
      this.formattedCloseDate = {
        day: date.getDate().toString(),
        month: this.abbreviatedMonths[date.toLocaleString('default', { month: 'long' })],
        year: date.getFullYear().toString(),
      };
    }
  }
}
