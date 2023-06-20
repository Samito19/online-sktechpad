import { getChatMessage, getPrevMessages } from './../action/chat.actions';
import { createReducer, on } from '@ngrx/store';
import {
  changePenWidth,
  receiveRealTimeDrawings,
} from '../action/canvas.actions';
import { SketchPageState, initialPageState } from '../state/sketch-page.state';
import { connectToCanvasByName } from '../action/sketch.actions';

export const sketchPageState = createReducer(
  initialPageState,
  on(connectToCanvasByName, SketchPageState.handlesSketchName),
  on(receiveRealTimeDrawings, SketchPageState.handlesDrawEvent),
  on(changePenWidth, SketchPageState.handlesPenWidthChange),
  on(getChatMessage, SketchPageState.handlesNewMessageEvent),
  on(getPrevMessages, SketchPageState.handlesPrevMessagesEvent)
);
