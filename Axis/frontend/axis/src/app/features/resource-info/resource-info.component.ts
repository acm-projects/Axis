import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedDataService} from '../../core/services/shared-data.service';
import {ActivatedRoute} from '@angular/router';
import {Scholarship} from '../../core/models/scholarship.model';
//import { ResourceResponse, Resource } from "../../core/models/resource.model"

@Component({
  selector: 'app-resource-info',
  imports: [],
  templateUrl: './resource-info.component.html',
  styleUrl: './resource-info.component.css'
})
export class ResourceInfoComponent {
  scholarship: Scholarship | undefined;

  constructor(private http: HttpClient, private sharedDataService: SharedDataService, private route: ActivatedRoute) {
    let storedScholarship = this.sharedDataService.getScholarship(parseInt(<string>this.route.snapshot.paramMap.get('id')));
    if (storedScholarship) {
      this.scholarship = storedScholarship;
    }
    else {
      this.http.get<Scholarship>(`http://localhost:8080/api/scholarships/searchByID/`
        + parseInt(<string>this.route.snapshot.paramMap.get('id'))).subscribe({
        next: (response: any) => {
          this.scholarship = response;
          if (this.scholarship) {
            this.sharedDataService.saveScholarship(this.scholarship);
          }
        },
        error: error => {
          console.log('Failed to retrieve scholarship');
        }
      });
    }
  }
}
