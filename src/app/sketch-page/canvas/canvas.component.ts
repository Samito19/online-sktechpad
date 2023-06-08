import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import p5 from 'p5';
import { connectCanvasName } from './canvas-component.actions';
import { CanvasComponentService } from './canvas.component.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  canvas: p5;

  constructor(
    private store: Store,
    private canvasComponentService: CanvasComponentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const param = this.route.snapshot.paramMap.get('sketchId')!;
    this.store.dispatch(
      connectCanvasName({
        canvasName: param,
      })
    );
    this.canvasComponentService.init(param);
  }

  private _drawingUpdateHandler = (drawings: any): void =>
    drawings.forEach((drawing: number[]) =>
      this.canvas.line(drawing[0], drawing[1], drawing[2], drawing[3])
    );
  private _handleOtherDrawings = (postions: any) =>
    this.canvas.line(postions[0], postions[1], postions[2], postions[3]);
}
