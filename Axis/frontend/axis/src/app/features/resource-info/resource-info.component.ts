import { Component } from '@angular/core';
//import { ResourceResponse, Resource } from "../../core/models/resource.model"
import { AssetCardComponent } from '../../shared/components/asset-card/asset-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-resource-info',
  imports: [AssetCardComponent, NgFor],
  templateUrl: './resource-info.component.html',
  styleUrl: './resource-info.component.css'
})



export class ResourceInfoComponent{
  l = [1,2,3,4]

}