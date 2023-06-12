import { Component, OnInit } from '@angular/core';
import { SketchPageService } from './sketch-page.service';

@Component({
  selector: 'app-sketch-page',
  templateUrl: './sketch-page.component.html',
  styleUrls: ['./sketch-page.component.scss'],
})
export class SketchPageComponent implements OnInit {
  constructor(public SketchPageService: SketchPageService) {}
  ngOnInit() {
    this.SketchPageService.init();
  }
}
