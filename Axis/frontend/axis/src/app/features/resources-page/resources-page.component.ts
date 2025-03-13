import { Component } from '@angular/core';
import { ResourceHeaderComponent } from '../../shared/components/resource-header/resource-header.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { NgFor, NgIf } from '@angular/common';
import { range } from 'rxjs';

@Component({
  selector: 'app-resources-page',
  imports: [ResourceHeaderComponent, FilterComponent, NgFor],
  templateUrl: './resources-page.component.html',
  styleUrl: './resources-page.component.css'
})
export class ResourcesPageComponent {
  resources: any[] = []
  constructor() {
    for (let i = 0; i < 7; i++) {
      this.resources.push({
        img: "",
        title: `Resource ${i + 1}`,
        info: "Location",
        content: "blah blah bllaaaah..."
      });
    }
  }
 
}
