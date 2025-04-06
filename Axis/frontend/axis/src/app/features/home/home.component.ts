import { Component, AfterViewInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Application } from '@splinetool/runtime';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{


  mainTitle : string = 'Redefining the College Application Experience'
  subTitle: string = 'Theres a first step to college applications and we are it. Make you application better starting with us';

  searchQuery: string = "";

  ngAfterViewInit(): void {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/roTJhEAdR-cSHpoa/scene.splinecode');
  }
}
