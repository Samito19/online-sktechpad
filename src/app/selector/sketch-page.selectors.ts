import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SketchPageState } from '../state/sketch-page.state';

export const getSketchPageState =
  createFeatureSelector<SketchPageState>('sketchPageState');

export const selectSketchPageStateMessages = createSelector(
  getSketchPageState,
  (state: SketchPageState) => state.messages
);

export const selectSketchPageStateNewDrawing = createSelector(
  getSketchPageState,
  (state: SketchPageState) => state.canvas.latestDrawing
);

export const selectToggledTool = createSelector(
  getSketchPageState,
  (state: SketchPageState) => state.canvas.toggledTool
);

export const selectSketchPagePenWidth = createSelector(
  getSketchPageState,
  (state: SketchPageState) => state.canvas.penWidth
);
