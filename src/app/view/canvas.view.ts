import p5 from 'p5';

interface ICanvasDrawing {
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
}

export class CanvasDrawing implements ICanvasDrawing {
  mouseX: number = 0;
  mouseY: number = 0;
  pmouseX: number = 0;
  pmouseY: number = 0;

  static getFromP5(s: p5): CanvasDrawing {
    return {
      mouseX: Math.ceil(s.mouseX),
      mouseY: Math.ceil(s.mouseY),
      pmouseX: Math.ceil(s.pmouseX),
      pmouseY: Math.ceil(s.pmouseY),
    };
  }
}
