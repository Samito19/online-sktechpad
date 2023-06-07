import { SignalRService } from '../../signalr.service';
import { Injectable } from '@angular/core';
import { receiveMessage, setClientId } from './chat.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: Observable<{ username: string; content: string }[]>;
  clientId: string;
  connection: signalR.HubConnection;

  constructor(
    private store: Store<{
      messages: { username: string; content: string }[];
      clientId: string;
    }>,
    private signalRService: SignalRService
  ) {
    this.messages$ = store.select('messages');
    store
      .select('clientId')
      .subscribe((clientId) => (this.clientId = clientId));
  }

  async initChatHubConnection() {
    this.connection = await this.signalRService.Connect('chat');
    this.store.dispatch(
      setClientId({ clientId: this.connection.connectionId! })
    );
    this.connection.on(
      'messageReceived',
      (username: string, content: string) => {
        this.store.dispatch(receiveMessage({ username, content }));
      }
    );
  }

  connecToChatRoom(sketchName: string) {
    this.connection.invoke('AddToSketchChatGroup', sketchName);
  }

  getMessages(): Observable<{ username: string; content: string }[]> {
    return this.messages$;
  }

  getClientId(): string {
    return this.clientId;
  }

  sendMessage(sketchId: string, newMessage: string) {
    this.connection.invoke('newMessage', sketchId, this.clientId, newMessage);
  }
}
