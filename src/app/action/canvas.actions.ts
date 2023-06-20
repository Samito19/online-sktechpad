import { createAction, props } from '@ngrx/store';
import { CanvasDrawing } from 'src/app/model/canvas/canvas.models';

export enum CanvasActions {
  drawOtherRealTimeDrawings = `[Canvas Actions] receive other real time drawings`,
  sendDrawingToHub = `[Canvas Actions] send user drawing to Hub`,
  changePenWidth = `[Canvas Actions] change pen width`,
}
export const sendDrawingToHub = createAction(
  CanvasActions.sendDrawingToHub,
  props<CanvasDrawing>()
);

export const receiveRealTimeDrawings = createAction(
  CanvasActions.drawOtherRealTimeDrawings,
  props<CanvasDrawing>()
);

export const changePenWidth = createAction(
  CanvasActions.changePenWidth,
  props<{ width: number }>()
);
