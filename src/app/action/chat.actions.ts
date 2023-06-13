import { createAction, props } from '@ngrx/store';
import { IUserMessageDto } from '../model/network/user.model';

export enum ChatActions {
  getChatMessage = `[Chat Actions] get chat message`,
  sendChatMessage = `[Chat Actions] send chat message`,
}
export const getChatMessage = createAction(
  ChatActions.getChatMessage,
  props<IUserMessageDto>()
);
export const sendChatMessage = createAction(
  ChatActions.sendChatMessage,
  props<IUserMessageDto>()
);
