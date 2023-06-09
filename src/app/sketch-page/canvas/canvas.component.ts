import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import p5 from 'p5';
import { connectToCanvasByName } from './canvas-component.actions';
import { CanvasComponentService } from './canvas.component.service';
import { CanvasDrawing } from 'src/app/interfaces/canvas/canvas.interfaces';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  canvas: p5;

  constructor(
    private store: Store<{ newDrawing: CanvasDrawing }>,
    private canvasComponentService: CanvasComponentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const param = this.route.snapshot.paramMap.get('sketchId')!;
    this.store.dispatch(
      connectToCanvasByName({
        canvasName: param,
      })
    );
    this.canvasComponentService.init(param);
  }

  ngOnDestroy() {
    this.canvasComponentService.disconnect();
  }
}
