import { createAction, props } from '@ngrx/store';

export const receiveMessage = createAction(
  '[Chat Component] ReceiveMessage',
  props<{ username: string; content: string }>()
);

export const setClientId = createAction(
  '[Chat Component] SetClientId',
  props<{ clientId: string }>()
);
