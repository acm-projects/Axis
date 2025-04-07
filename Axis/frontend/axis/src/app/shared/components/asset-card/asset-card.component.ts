import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-asset-card',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.css',
  standalone: true

})
export class AssetCardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() imgLink: string = '';
  bookMarked: boolean = false;

  isFallbackCollegeLogo(link: string): boolean {
    return link.includes('Default-bf-illus-school')
  }


}
