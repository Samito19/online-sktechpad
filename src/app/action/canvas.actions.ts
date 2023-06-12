import { createAction, props } from '@ngrx/store';
import { CanvasDrawing } from 'src/app/model/canvas/canvas.models';

export enum CanvasActions {
  drawOtherRealTimeDrawings = `[Canvas Actions] receive other real time drawings`,
  sendDrawingToHub = `[Canvas Actions] send user drawing to Hub`,
}
export const sendDrawingToHub = createAction(
  CanvasActions.sendDrawingToHub,
  props<CanvasDrawing>()
);

export const drawOtherRealTimeDrawings = createAction(
  CanvasActions.drawOtherRealTimeDrawings,
  props<CanvasDrawing>()
);
