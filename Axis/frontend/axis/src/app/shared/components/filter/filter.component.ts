import { NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter1:string = "Filter"
  filterQuerys: string[] = ["Texas", "California"]
}
