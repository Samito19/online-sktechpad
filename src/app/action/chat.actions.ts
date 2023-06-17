import { createAction, props } from '@ngrx/store';
import {
  PrevUserMessagesActionPayload,
  UserMessageDto,
} from '../model/network/user.model';

export enum ChatActions {
  getPrevMessages = `[Chat Actions] get previous chat messages from server`,
  getChatMessage = `[Chat Actions] get chat message`,
  sendChatMessage = `[Chat Actions] send chat message`,
}

export const getPrevMessages = createAction(
  ChatActions.getPrevMessages,
  props<PrevUserMessagesActionPayload>()
);
export const getChatMessage = createAction(
  ChatActions.getChatMessage,
  props<UserMessageDto>()
);
export const sendChatMessage = createAction(
  ChatActions.sendChatMessage,
  props<UserMessageDto>()
);
