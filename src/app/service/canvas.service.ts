import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import p5 from 'p5';
import { Observable, Subscription } from 'rxjs';
import { sendDrawingToHub } from '../action/canvas.actions';
import { CanvasDrawing } from '../view/canvas.view';
import { SketchPageService } from './sketch-page.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  newDrawing$: Observable<CanvasDrawing | null>;
  newDrawingSubscription: Subscription;
  s: p5;
  canvas: p5;

  constructor(
    private http: HttpClient,
    private store: Store,
    private sketchPageService: SketchPageService
  ) {
    this.newDrawing$ = this.sketchPageService.newDrawing$;
  }

  init = () => {
    this.canvas = new p5(this.sketch);
    this.getPrevDrawings();
    this.newDrawingSubscription = this.newDrawing$.subscribe(
      (drawingPayload: CanvasDrawing | null) => {
        if (drawingPayload) {
          this.handleOtherRealTimeDrawings(drawingPayload);
        }
      }
    );
  };

  disconnect = () => {
    this.newDrawingSubscription.unsubscribe();
  };

  sketch = (s: p5) => {
    this.handleSetup(s);
  };

  handleSetup = (s: p5) => {
    this.s = s;
    this.s.setup = () => {
      let canvas2 = this.s.createCanvas(
        this.s.windowWidth,
        this.s.windowHeight
      );
      canvas2.parent('canvas-sketch');
      canvas2.style;
      this.s.strokeWeight(5);
      this.s.stroke(this.s.color(148, 0, 211));
    };

    this.s.draw = this.handleDraw;
  };

  handleDraw = () => {
    if (this.s.mouseIsPressed && this.s.mouseButton === this.s.LEFT) {
      const mouseX = Math.round(this.s.mouseX);
      const pmouseX = Math.round(this.s.pmouseX);
      const mouseY = Math.round(this.s.mouseY);
      const pmouseY = Math.round(this.s.pmouseY);

      if (mouseX != pmouseX || mouseY != pmouseY) {
        this.s.line(mouseX, mouseY, pmouseX, pmouseY);
        const newDrawing = CanvasDrawing.getFromP5(this.s);
        this.store.dispatch(sendDrawingToHub(newDrawing));
      }
    }
  };

  handleOtherRealTimeDrawings = (payload: CanvasDrawing) => {
    const { mouseX, mouseY, pmouseX, pmouseY } = payload;
    this.s.line(mouseX, mouseY, pmouseX, pmouseY);
  };

  //TODO Extract to canvas api service - this returned object can be saved in a state object using a reducer that handles getPrevDrawingsSuccess
  getPrevDrawings() {
    this.http
      .get<any>(
        `http://localhost:5212/getDrawings/${this.sketchPageService.sketchName}`
      )
      .subscribe((userDrawings) => {
        userDrawings.forEach((user: any) => {
          user['drawings'].forEach((drawing: any) => {
            console.log(drawing);
            this.handleOtherRealTimeDrawings(drawing);
          });
        });
      });
  }

  clearCanvas() {
    this.http.get<any>('http://localhost:5212/clearDrawings');
  }
}
