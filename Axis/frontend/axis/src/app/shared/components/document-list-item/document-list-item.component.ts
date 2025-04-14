import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-document-card',
  imports: [NgIf, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.css',
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
export class DocumentCardComponent implements OnInit {
  @Input() document!: {
    student_email: string;
    college_id: number;
    filename: string;
    fileUrl: string;
  };

  ngOnInit() {
    console.log(this.document);
    console.log('Document URL:', this.document.fileUrl);
  }
}
