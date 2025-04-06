import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  mainTitle : string = 'Redefining the College Application Experience'
  subTitle: string = 'Theres a first step to college applications and we are it. Make you application better starting with us';

  searchQuery: string = ""

}
