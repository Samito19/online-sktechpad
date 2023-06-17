import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanvasService } from 'src/app/service/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  constructor(private canvasService: CanvasService) {}

  ngOnInit() {
    this.canvasService.init();
  }

  ngOnDestroy() {
    this.canvasService.disconnect();
  }
}
