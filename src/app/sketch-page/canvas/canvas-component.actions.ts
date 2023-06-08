import { createAction, props } from '@ngrx/store';

export interface CanvasConnectionPrereq {
  canvasName: string;
  // Once we have access control
  userId?: string;
}
export enum CanvasActions {
  connectCanvasName = `[Canvas Actions] connect to canvas by name`,
}
export const connectCanvasName = createAction(
  CanvasActions.connectCanvasName,
  props<CanvasConnectionPrereq>()
);
