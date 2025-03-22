import { Component } from '@angular/core';

@Component({
  selector: 'app-college-info',
  imports: [],
  templateUrl: './college-info.component.html',
  styleUrl: './college-info.component.css'
})
export class CollegeInfoComponent {
  collegeData: any = {
    name: "University of Texas at Dallas",
    location: "Richardson, Texas",
    imgLink: "https://www.utdallas.edu/files/2024/04/campus-mall-drone-shot-spring-2023-f9da6375e486abef.jpg",
    logoLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCRpY-NdpbvS_fCQVl83Hw02zowSklHipwA&s",
    population: 30000,
    acceptence: 65,
    tution: 65000,
    graduation: 62,
    description: ""
  }

  constructor () {
    this.collegeData.description = `The University of Texas at Dallas (UTD or UT Dallas) is a public research university in Richardson, Texas, United States. It is the northernmost institution of the University of Texas System. It was initially founded in 1961 as a private research arm of Texas Instruments. The university is classified among 'R1: Doctoral Universities – Very high research activity'. It is associated with four Nobel Prizes and has members of the National Academy of Sciences and National Academy of Engineering on its faculty with research projects including the areas of Space Science, Bioengineering, Cybersecurity, Nanotechnology, and Behavioral and Brain Sciences. UT Dallas offers more than 140 academic programs across its seven schools and hosts more than 50 research centers and institutes.`
    this.collegeData.description += this.collegeData.description
    this.collegeData.description += this.collegeData.description
    this.collegeData.description += this.collegeData.description
  }
}
