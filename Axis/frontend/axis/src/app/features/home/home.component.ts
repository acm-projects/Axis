import { Component, AfterViewInit, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Application } from '@splinetool/runtime';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import {SplineViewerComponent} from '../../shared/spline-viewer/spline-viewer.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, SplineViewerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-5px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('{{ timing }} {{ delay }} ease-out')
      ], {
        params: {
          timing: '1s',
          delay: '0s'
        }
      })
    ])
  ]
})
export class HomeComponent implements AfterViewInit, OnInit{

  titleVisible = false;

  mainTitle : string = 'Redefining the College Application Experience'
  subTitle: string = `There's a first step to college applications, and we are it. Make your application better, starting with us.`;

  searchQuery: string = "";

  ngAfterViewInit(): void {
    setTimeout(() => {
      const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
      if (canvas) {
        const spline = new Application(canvas);
        spline.load('https://prod.spline.design/roTJhEAdR-cSHpoa/scene.splinecode');
      }
    });
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.titleVisible = true;
    });
  }




}
