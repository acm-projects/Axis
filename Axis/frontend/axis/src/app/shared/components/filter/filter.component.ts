import { CommonModule, NgFor, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SearchPipe} from '../../pipes/search.pipe';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, NgFor, NgIf, CommonModule, SearchPipe, RouterLink, RouterLinkActive],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  standalone: true,
})
export class FilterComponent {
  @Input() name: string = "";
  @Input() type: string = "";
  expanded: boolean = false;

  searchInput: string = "";

  dropdownToggle: boolean = false;
  @Input() dropdownValues: string[] = [];
  filteredDropdownValues: string[] = [];

  @Input() rangeSymbol: string = "";
  minValueInput: number = 0;
  maxValueInput: number = 0;

  @Input() checkboxValues: {value: string, status: boolean}[] = [];

  @Output() filteredValues: EventEmitter<any> = new EventEmitter();

  removeQuery(index: number):void {
    this.filteredDropdownValues.splice(index, 1)
  }

  addFilteredDropdownValue(value: string): void {
    if (!this.filteredDropdownValues.includes(value)) {
      this.filteredDropdownValues.push(value);
    }
    this.update();
  }

  update(): void {
    switch (this.type) {
      case 'dropdown': {
        this.filteredValues.emit(this.filteredDropdownValues);
        break;
      }
      case 'range': {
        this.filteredValues.emit({min: this.minValueInput, max: this.maxValueInput});
        break;
      }
      case 'checkbox': {
        this.filteredValues.emit(this.checkboxValues);
        break;
      }
    }
  }

  reset(): void {
    switch (this.type) {
      case 'dropdown': {
        this.filteredDropdownValues = [];
        break;
      }
      case 'range': {
        this.minValueInput = 0;
        this.maxValueInput = 0;
        break;
      }
      case 'checkbox': {
        this.checkboxValues.forEach(value => value.status = false);
        break;
      }
    }
    this.update();
  }

  protected readonly length = length;
  protected readonly console = console;
}
