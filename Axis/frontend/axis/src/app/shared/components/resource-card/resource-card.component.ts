import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resource-card',
  imports: [NgIf],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css'
})
export class ResourceCardComponent {

  //http://www.w3.org/2000/svg
  bookMarked:boolean = false;
  toggleBookmark():void {
    this.bookMarked = !this.bookMarked
  }
}
