import { NgIf } from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-resource-header',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './resource-header.component.html',
  styleUrl: './resource-header.component.css',
  standalone: true,
})
export class ResourceHeaderComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() org: string = '';
  @Input() imgLink: string = '';
  @Input() content: string = '';
  bookMarked: boolean = false;

}
