import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-asset-card',
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.css',
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
    ])
  ]
})
export class AssetCardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() info: string = '';
  @Input() imgLink: string = '';
  bookMarked: boolean = false;
  hoverState: string = 'no';


  isFallbackCollegeLogo(link: string): boolean {
    return link.includes('Default-bf-illus-school')
  }


}
