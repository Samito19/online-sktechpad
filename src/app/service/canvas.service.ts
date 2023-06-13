import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import p5 from 'p5';
import { Observable } from 'rxjs';
import { sendDrawingToHub } from '../action/canvas.actions';
import { CanvasDrawing } from '../view/canvas.view';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  clientId: string;
  s: p5;
  canvas: p5;

  constructor(
    private http: HttpClient,
    private store: Store<{
      clientId: string;
    }>
  ) {
    // this.store
    //   .select('clientId')
    //   .subscribe((clientId) => (this.clientId = clientId));
  }

  init = (id: string) => {
    this.canvas = new p5(this.sketch);
  };

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
        const payload = CanvasDrawing.getFromP5(this.s);

        this.store.dispatch(sendDrawingToHub(payload));
      }
    }
  };

  handleOtherRealTimeDrawings = (payload: CanvasDrawing) => {
    const { mouseX, mouseY, pmouseX, pmouseY } = payload;
    this.s.line(mouseX, mouseY, pmouseX, pmouseY);
  };

  //TODO Extract to canvas api service - this returned object can be saved in a state object using a reducer that handles getPrevDrawingsSuccess
  getPrevDrawings(): Observable<number[][]> {
    return this.http.get<number[][]>('http://localhost:5212/getDrawings');
  }

  clearCanvas() {
    this.http.get<any>('http://localhost:5212/clearDrawings');
  }
}
