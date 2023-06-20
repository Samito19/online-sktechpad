import { TypedAction } from '@ngrx/store/src/models';
import { CanvasActions } from '../action/canvas.actions';
import { ChatActions } from '../action/chat.actions';
import {
  PrevUserMessagesActionPayload,
  UserMessageDto,
} from '../model/network/user.model';
import { CanvasDrawing } from '../view/canvas.view';
import { HubConnectionPrereq } from '../model/hub/hub.models';

export class SketchPageState {
  messages: UserMessageDto[] = [];
  clientId: string;
  newDrawing: CanvasDrawing | null = null;

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
    state: any,
    actionPayload: CanvasDrawing &
      TypedAction<CanvasActions.drawOtherRealTimeDrawings>
  ) => {
    return {
      ...state,
      newDrawing: { ...actionPayload },
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
  newDrawing: null,
  messages: [],
  clientId: '',
};
