import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter1:string = "Filter"
  filterQuerys: string[] = ["Texas", "California","Texas", "California", ""]
  dropDown: boolean = false

  toggleDropDown():void {
    this.dropDown = !this.dropDown
  }

  removeQuery(index: number):void {
    this.filterQuerys.splice(index, 1)
  }

  
}
