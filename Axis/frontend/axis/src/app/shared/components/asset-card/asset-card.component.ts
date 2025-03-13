import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-card',
  imports: [NgIf],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.css'
})
export class AssetCardComponent {

  bookMarked:boolean = false;
  toggleBookmark():void {
    this.bookMarked = !this.bookMarked
  }
}
