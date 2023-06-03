import { createAction, props } from '@ngrx/store';

export const receiveMessage = createAction(
  '[Chat Component] ReceiveMessage',
  props<{ message: string }>()
);
