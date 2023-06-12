import { createAction, props } from '@ngrx/store';
import { HubConnectionPrereq } from '../model/hub/hub.models';

export enum SketchActions {
  connectToCanvasByName = `[Sketch Actions] connect to canvas by name`,
  connectToSketchChatroom = `[Sketch Action connect to sketch chat room by name`,
}
export const connectToCanvasByName = createAction(
  SketchActions.connectToCanvasByName,
  props<HubConnectionPrereq>()
);

export const connectToSketchChatroom = createAction(
  SketchActions.connectToSketchChatroom,
  props<HubConnectionPrereq>()
);
