import { TypedAction } from '@ngrx/store/src/models';
import { CanvasActions } from '../action/canvas.actions';
import { ChatActions } from '../action/chat.actions';
import { UserMessageDto } from '../model/network/user.model';
import { CanvasDrawing } from '../view/canvas.view';

export class SketchPageState {
  messages: UserMessageDto[] = [];
  clientId: string;
  newDrawing: CanvasDrawing | null = null;

  static handlesDrawEvent = (
    state: any,
    a: CanvasDrawing & TypedAction<CanvasActions.drawOtherRealTimeDrawings>
  ) => {
    return {
      ...state,
      newDrawing: a,
    };
  };

  static handlesNewMessageEvent = (
    state: any,
    a: UserMessageDto & TypedAction<ChatActions.getChatMessage>
  ) => {
    return {
      ...state,
      messages: [...state.messages, a],
    };
  };
}

export const initialPageState: SketchPageState = {
  newDrawing: null,
  messages: [{ username: 'Samsoumite', content: 'test' }],
  clientId: '',
};
