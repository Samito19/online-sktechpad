export interface IUserMessageDto {
  username: string;
  content: string;
}

export class UserMessageDto implements IUserMessageDto {
  username: string = '';
  content: string = '';
}

export interface PrevUserMessagesActionPayload {
  prevMessages: UserMessageDto[];
}
