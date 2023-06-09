import { createReducer, on } from '@ngrx/store';
import { drawOtherRealTimeDrawings } from '../sketch-page/canvas/canvas-component.actions';
import { CanvasDrawing } from '../interfaces/canvas/canvas.interfaces';

export const initialState: CanvasDrawing = {
  mouseX: 0,
  mouseY: 0,
  pmouseX: 0,
  pmouseY: 0,
};

export const newDrawingReducer = createReducer(
  initialState,
  on(drawOtherRealTimeDrawings, (state, newDrawing) => newDrawing)
);
