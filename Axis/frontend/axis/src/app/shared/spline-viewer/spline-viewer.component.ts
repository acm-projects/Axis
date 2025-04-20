import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-spline-viewer',
  templateUrl: './spline-viewer.component.html',
  styleUrls: ['./spline-viewer.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SplineViewerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
