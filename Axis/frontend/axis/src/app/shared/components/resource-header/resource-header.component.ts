import { NgIf } from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-resource-header',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './resource-header.component.html',
  styleUrl: './resource-header.component.css',
  standalone: true,
  animations: [
    trigger('cardHover', [
      state('yes', style({
        opacity: 0.5,
        transform: 'translateY(-0.5px)'
      })),
      state('no', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('no => yes', [
        animate('{{ timing }} {{ delay }} ease-out')
      ], {
        params: {
          timing: '0.25s',
          delay: '0s'
        }
      }),
      transition('yes => no', [
        animate('{{ timing }} ease-in')
      ], {
        params: {
          timing: '0.25s'
        }
      })
    ]),
]
})
export class ResourceHeaderComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() org: string = '';
  @Input() imgLink: string = '';
  @Input() content: string = '';
  bookMarked: boolean = false;
  hoverState: string = 'no';


}
