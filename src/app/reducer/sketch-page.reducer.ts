import { createReducer, on } from '@ngrx/store';
import { drawOtherRealTimeDrawings } from '../action/canvas.actions';
import { SketchPageState, initialPageState } from '../state/sketch-page.state';

export const sketchPageState = createReducer(
  initialPageState,
  on(drawOtherRealTimeDrawings, SketchPageState.handlesDrawEvent)
);
