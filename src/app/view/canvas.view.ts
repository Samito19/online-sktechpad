import p5 from 'p5';

export class CanvasDrawing {
  mouseX: number = 0;
  mouseY: number = 0;
  pmouseX: number = 0;
  pmouseY: number = 0;

  static getFromP5(s: p5): CanvasDrawing {
    return {
      mouseX: s.mouseX,
      mouseY: s.mouseY,
      pmouseX: s.pmouseX,
      pmouseY: s.pmouseY,
    };
  }
}
