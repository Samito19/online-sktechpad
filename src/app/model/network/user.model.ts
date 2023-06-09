export interface IUserMessageDto {
  username: string;
  content: string;
}

export class UserMessageDto implements IUserMessageDto {
  sketchName?: string = '';
  username: string = '';
  content: string = '';
}
