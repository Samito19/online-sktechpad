import { Component, OnInit } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  canvas: p5;
  ngOnInit(): void {
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(600, 600);
        canvas2.parent('canvas-sketch');
        s.background(255);
        s.strokeWeight(5);
        s.stroke(s.color(148, 0, 211));
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          }
        }
      };
    };
    this.canvas = new p5(sketch);
  }
}
