import { createAction, props } from '@ngrx/store';
import {
  CanvasConnectionPrereq,
  CanvasDrawing,
} from 'src/app/interfaces/canvas/canvas.interfaces';

export enum CanvasActions {
  connectToCanvasByName = `[Canvas Actions] connect to canvas by name`,
  drawOtherRealTimeDrawings = `[Canvas Actions] receive other real time drawings`,
}
export const connectToCanvasByName = createAction(
  CanvasActions.connectToCanvasByName,
  props<CanvasConnectionPrereq>()
);

export const drawOtherRealTimeDrawings = createAction(
  CanvasActions.drawOtherRealTimeDrawings,
  props<CanvasDrawing>()
);
