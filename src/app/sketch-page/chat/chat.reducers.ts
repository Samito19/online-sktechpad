import { createReducer, on } from '@ngrx/store';
import { receiveMessage, setClientId } from './chat.actions';

export const initialMessagesState: { username: string; content: string }[] = [];
export const initialClientId: string = '';

export const messagesReducer = createReducer(
  initialMessagesState,
  on(receiveMessage, (state, { username, content }) => [
    ...state,
    { username, content },
  ])
);

export const clientIdReducer = createReducer(
  initialClientId,
  on(setClientId, (state, { clientId }) => clientId)
);
