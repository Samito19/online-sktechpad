import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { CanvasService } from './canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  canvas: p5;
  stringCanvas: string = '';

  constructor(private canvasService: CanvasService) {
    this.canvasService.initCanvasHubConnection();
  }

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
            this.canvasService.sendCanvas(
              s.mouseX,
              s.mouseY,
              s.pmouseX,
              s.pmouseY
            );
            console.log('Sending...');
          }
        }
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          this.canvasService.clearCanvas();
          window.location.reload();
        }
      };
    };
    this.canvas = new p5(sketch);

    this.canvasService
      .getPrevDrawings()
      .subscribe((drawings: any) =>
        drawings.forEach((drawing: number[]) =>
          this.canvas.line(drawing[0], drawing[1], drawing[2], drawing[3])
        )
      );

    this.canvasService
      .getOtherDrawings()
      .subscribe((postions: any) =>
        this.canvas.line(postions[0], postions[1], postions[2], postions[3])
      );
  }
}
