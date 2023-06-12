import { SketchPageService } from './../sketch-page.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import p5 from 'p5';
import { Observable, Subscription } from 'rxjs';
import { CanvasDrawing } from 'src/app/model/canvas/canvas.models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  s: p5;
  canvas: p5;
  newDrawings$: Observable<CanvasDrawing>;
  newDrawingsSubscription: Subscription;

  constructor(private sketchPageService: SketchPageService) {
    // this.newDrawings$ = this.sketchPageService.receiveDrawing();
  }

  ngOnInit() {
    this.canvas = new p5(this.sketch);
    // this.newDrawingsSubscription = this.newDrawings$.subscribe((newDrawing) => {
    //   if (newDrawing) {
    //     this._handleRealTimeOtherDrawings(newDrawing);
    //   }
    // });
  }

  ngOnDestroy() {
    this.newDrawingsSubscription.unsubscribe();
  }

  sketch = (s: p5) => {
    this.handleSetup(s);
  };

  handleSetup = (s: p5) => {
    this.s = s;
    this.s.setup = () => {
      let canvas2 = this.s.createCanvas(
        this.s.windowWidth - this.s.windowWidth * 0.35,
        this.s.windowHeight - this.s.windowHeight * 0.1
      );
      canvas2.parent('canvas-sketch');
      this.s.background(255);
      this.s.strokeWeight(5);
      this.s.stroke(this.s.color(148, 0, 211));
    };

    this.s.draw = this.handleDraw;
    this.s.keyPressed = this.handleKeyPressed;
  };

  handleKeyPressed = () => {
    if (this.s.key === 'c') {
      //this.canvasService.clearCanvas();
      window.location.reload();
    }
  };

  handleDraw = () => {
    if (this.s.mouseIsPressed) {
      if (this.s.mouseButton === this.s.LEFT) {
        this.s.line(
          this.s.mouseX,
          this.s.mouseY,
          this.s.pmouseX,
          this.s.pmouseY
        );
        this.sketchPageService.sendDrawing({
          mouseX: this.s.mouseX,
          mouseY: this.s.mouseY,
          pmouseX: this.s.pmouseX,
          pmouseY: this.s.pmouseY,
        });
      }
    }
  };

  // private _drawingUpdateHandler = (drawings: any): void =>
  //   drawings.forEach((drawing: number[]) =>
  //     this.canvas.line(drawing[0], drawing[1], drawing[2], drawing[3])
  //   );

  _handleRealTimeOtherDrawings = (newDrawing: CanvasDrawing) => {
    this.s?.line(
      newDrawing.mouseX,
      newDrawing.mouseY,
      newDrawing.pmouseX,
      newDrawing.pmouseY
    );
  };
}
