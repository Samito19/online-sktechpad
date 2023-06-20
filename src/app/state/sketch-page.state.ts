import { TypedAction } from '@ngrx/store/src/models';
import { CanvasActions } from '../action/canvas.actions';
import { ChatActions } from '../action/chat.actions';
import {
  PrevUserMessagesActionPayload,
  UserMessageDto,
} from '../model/network/user.model';
import { CanvasDrawing } from '../model/canvas/canvas.models';
import { HubConnectionPrereq } from '../model/hub/hub.models';

class Canvas {
  latestDrawing: CanvasDrawing | null = null;
  allDrawings: CanvasDrawing[] = [];
  penWidth: number = 1;
}

export class SketchPageState {
  messages: UserMessageDto[] = [];
  clientId: string;
  canvas: Canvas = { latestDrawing: null, allDrawings: [], penWidth: 1 };

  static handlesSketchName = (
    state: any,
    actionPayload: HubConnectionPrereq
  ) => {
    return {
      ...state,
      sketchName: actionPayload.sketchName,
    };
  };

  static handlesDrawEvent = (
    state: SketchPageState,
    actionPayload: CanvasDrawing &
      TypedAction<CanvasActions.drawOtherRealTimeDrawings>
  ) => {
    return {
      ...state,
      canvas: {
        ...state.canvas,
        allDrawings: [...state.canvas.allDrawings, { ...actionPayload }],
        latestDrawing: { ...actionPayload },
      },
    };
  };

  static handlesPenWidthChange = (
    state: SketchPageState,
    actionPayload: { width: number } & TypedAction<CanvasActions.changePenWidth>
  ) => {
    return {
      ...state,
      canvas: {
        ...state.canvas,
        penWidth: actionPayload.width,
      },
    };
  };

  static handlesNewMessageEvent = (
    state: any,
    actionPayload: UserMessageDto & TypedAction<ChatActions.getChatMessage>
  ) => {
    return {
      ...state,
      messages: [...state.messages, actionPayload],
    };
  };

  static handlesPrevMessagesEvent = (
    state: any,
    actionPayload: PrevUserMessagesActionPayload &
      TypedAction<ChatActions.getPrevMessages>
  ) => {
    return {
      ...state,
      messages: [...state.messages, ...actionPayload.prevMessages],
    };
  };
}

export const initialPageState: SketchPageState = {
  messages: [],
  clientId: '',
  canvas: new Canvas(),
};
