import { getChatMessage, getPrevMessages } from './../action/chat.actions';
import { createReducer, on } from '@ngrx/store';
import { receiveRealTimeDrawings } from '../action/canvas.actions';
import { SketchPageState, initialPageState } from '../state/sketch-page.state';
import { connectToCanvasByName } from '../action/sketch.actions';

export const sketchPageState = createReducer(
  initialPageState,
  on(receiveRealTimeDrawings, SketchPageState.handlesDrawEvent),
  on(getChatMessage, SketchPageState.handlesNewMessageEvent),
  on(getPrevMessages, SketchPageState.handlesPrevMessagesEvent),
  on(connectToCanvasByName, SketchPageState.handlesSketchName)
);
