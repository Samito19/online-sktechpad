import { SignlarRService } from './../signlar.service';
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
    private signlarRService: SignlarRService
  ) {
    this.messages$ = store.select('messages');
    store
      .select('clientId')
      .subscribe((clientId) => (this.clientId = clientId));
  }

  async initChatHubConnection() {
    this.connection = await this.signlarRService.Connect('hub');
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

  getMessages(): Observable<{ username: string; content: string }[]> {
    return this.messages$;
  }

  getClientId(): string {
    return this.clientId;
  }

  sendMessage(newMessage: string) {
    this.connection.send('newMessage', this.clientId, newMessage);
  }
}
