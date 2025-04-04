import { Component } from '@angular/core';
import { College } from '../../core/models/college.model';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../core/services/shared-data.service';

@Component({
  selector: 'app-college-info',
  imports: [],
  templateUrl: './college-info.component.html',
  styleUrl: './college-info.component.css'
})
export class CollegeInfoComponent {
  college: College | undefined;

  constructor (private route: ActivatedRoute, private sharedDataService: SharedDataService) {
    this.college = this.sharedDataService.getCollege(parseInt(<string>this.route.snapshot.paramMap.get('id')));
    console.log(this.college);
  }
}
