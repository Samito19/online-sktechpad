import { SignlarRService } from './../signlar.service';
import { Injectable } from '@angular/core';
import { receiveMessage } from './chat.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: Observable<string[]>;
  connection: signalR.HubConnection;

  constructor(
    private store: Store<{ messages: string[] }>,
    private signlarRService: SignlarRService
  ) {
    this.messages$ = store.select('messages');
  }

  async initChatHubConnection() {
    this.connection = await this.signlarRService.Connect('hub');
    this.connection.on(
      'messageReceived',
      (username: string, message: string) => {
        this.store.dispatch(receiveMessage({ message }));
      }
    );
  }

  getMessages(): Observable<string[]> {
    return this.messages$;
  }

  sendMessage() {
    this.connection.send('newMessage', 1001, 'test');
  }
}
