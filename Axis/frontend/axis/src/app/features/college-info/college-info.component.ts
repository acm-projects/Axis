import { Component } from '@angular/core';
import { College } from '../../core/models/college.model';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../core/services/shared-data.service';
import {HttpClient} from '@angular/common/http';
import {Location, NgClass} from '@angular/common';

@Component({
  selector: 'app-college-info',
  imports: [NgClass],
  templateUrl: './college-info.component.html',
  styleUrl: './college-info.component.css',
  standalone: true
})
export class CollegeInfoComponent {
  college: College | undefined;

  constructor(private http: HttpClient,
              private sharedDataService: SharedDataService,
              private route: ActivatedRoute,
              private location: Location
  ) {
    let storedCollege = this.sharedDataService.getCollege(parseInt(<string>this.route.snapshot.paramMap.get('id')));
    if (storedCollege) {
      this.college = storedCollege;
    }
    else {
      this.http.get<College>(`http://localhost:8080/api/colleges/searchByID/`
        + parseInt(<string>this.route.snapshot.paramMap.get('id'))).subscribe({
        next: (response: any) => {
          this.college = response;
          if (this.college) {
            this.sharedDataService.saveCollege(this.college);
          }
        },
        error: error => {
          console.log('Failed to retrieve college');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  protected readonly Number = Number;
}
