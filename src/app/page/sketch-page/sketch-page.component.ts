import { Component, OnDestroy, OnInit } from '@angular/core';
import { SketchPageService } from '../../service/sketch-page.service';

@Component({
  selector: 'app-sketch-page',
  templateUrl: './sketch-page.component.html',
  styleUrls: ['./sketch-page.component.scss'],
})
export class SketchPageComponent implements OnInit, OnDestroy {
  constructor(public SketchPageService: SketchPageService) {}
  ngOnInit() {
    this.SketchPageService.init();
  }

  ngOnDestroy() {
    this.SketchPageService.disconnect();
  }
}
