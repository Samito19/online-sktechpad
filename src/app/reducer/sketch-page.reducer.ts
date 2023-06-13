import { createReducer, on } from '@ngrx/store';
import { receiveRealTimeDrawings } from '../action/canvas.actions';
import { SketchPageState, initialPageState } from '../state/sketch-page.state';

export const sketchPageState = createReducer(
  initialPageState,
  on(receiveRealTimeDrawings, SketchPageState.handlesDrawEvent)
);
