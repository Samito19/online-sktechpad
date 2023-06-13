import { TypedAction } from '@ngrx/store/src/models';
import { CanvasDrawing } from '../view/canvas.view';
import { IUserMessageDto } from '../model/network/user.model';
import { CanvasActions } from '../action/canvas.actions';

export class SketchPageState {
  messages: IUserMessageDto[] = [];
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
}

export const initialPageState: SketchPageState = {
  newDrawing: null,
  messages: [],
  clientId: '',
};
