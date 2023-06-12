import { createAction, props } from '@ngrx/store';
import { UserMessageDto } from '../model/network/user.model';

export enum ChatActions {
  getChatMessage = `[Chat Actions] get chat message`,
  sendChatMessage = `[Chat Actions] send chat message`,
}
export const getChatMessage = createAction(
  ChatActions.getChatMessage,
  props<UserMessageDto>()
);
export const sendChatMessage = createAction(
  ChatActions.sendChatMessage,
  props<UserMessageDto>()
);
