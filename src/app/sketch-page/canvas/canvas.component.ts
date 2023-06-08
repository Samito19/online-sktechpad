import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import p5 from 'p5';
import { connectCanvasName } from './canvas-component.actions';
import { CanvasComponentService } from './canvas.component.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestory {
  canvas: p5;
  stringCanvas: string = '';
  sub$ = of("something we want")
  subscription?: Subscription;
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
    this.subscription = this.sub$.subscribe(r => console.log(r))
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
  private _drawingUpdateHandler = (drawings: any): void =>
    drawings.forEach((drawing: number[]) =>
      this.canvas.line(drawing[0], drawing[1], drawing[2], drawing[3])
    );
  private _handleOtherDrawings = (postions: any) =>
    this.canvas.line(postions[0], postions[1], postions[2], postions[3]);
}
