import { Component } from '@angular/core';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';
import { NgClass, NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [FilterComponent, AssetCardComponent, NgFor, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  assets:any[] = ["","","","","","","",""]


  selected: string = "all"
  toggleSelected (s:string) :void {
    this.selected = s
  }
}
