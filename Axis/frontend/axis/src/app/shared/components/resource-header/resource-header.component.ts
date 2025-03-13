import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resource-header',
  imports: [NgIf],
  templateUrl: './resource-header.component.html',
  styleUrl: './resource-header.component.css'
})
export class ResourceHeaderComponent {
  bookMarked:boolean = false;
  toggleBookmark():void {
    this.bookMarked = !this.bookMarked
  }
}
