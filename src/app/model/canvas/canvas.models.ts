export interface CanvasConnectionPrereq {
  sketchName: string;
  // Once we have access control
  userId?: string;
}

export interface CanvasDrawing {
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
}
