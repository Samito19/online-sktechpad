export interface CanvasConnectionPrereq {
  sketchName: string;
  // Once we have access control
  userId?: string;
}

import p5 from 'p5';

interface ICanvasDrawing {
  penWidth: number;
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
}

interface CanvasDrawingPosition {
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
}

export class CanvasDrawing implements ICanvasDrawing {
  penWidth: number = 1;
  mouseX: number = 0;
  mouseY: number = 0;
  pmouseX: number = 0;
  pmouseY: number = 0;

  static getPosition(s: p5): CanvasDrawingPosition {
    return {
      mouseX: Math.ceil(s.mouseX),
      mouseY: Math.ceil(s.mouseY),
      pmouseX: Math.ceil(s.pmouseX),
      pmouseY: Math.ceil(s.pmouseY),
    };
  }
}
