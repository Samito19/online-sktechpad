import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import p5 from 'p5';

@Injectable()
export class CanvasComponentService {
  s: p5;
  canvas: p5;
  sketchName: string;
  constructor(private canvasService: CanvasService) {}
  init = (sketchName: string) => {
    this.sketchName = sketchName
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
      this.canvasService.clearCanvas();
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
        this.canvasService.sendCanvas(
          this.sketchName,
          this.s.mouseX,
          this.s.mouseY,
          this.s.pmouseX,
          this.s.pmouseY
        );
      }
    }
  };
}
