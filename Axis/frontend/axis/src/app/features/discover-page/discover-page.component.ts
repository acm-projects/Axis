import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { NgFor } from '@angular/common';
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';

@Component({
  selector: 'app-discover-page',
  imports: [FilterComponent, NgFor, AssetCardComponent],
  templateUrl: './discover-page.component.html',
  styleUrl: './discover-page.component.css'
})
export class DiscoverPageComponent {
  colleges:any[] = ["","","","","","","","","","","",""]
}
