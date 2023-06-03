import { createReducer, on } from '@ngrx/store';
import { receiveMessage } from './chat.actions';

export const initialState: string[] = [];

export const messagesReducer = createReducer(
  initialState,
  on(receiveMessage, (state, { message }) => [...state, message])
);
