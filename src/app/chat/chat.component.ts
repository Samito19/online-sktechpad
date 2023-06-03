import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, of } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages$: Observable<string[]>;

  constructor(private chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    this.chatService.initChatHubConnection().then((res) => console.log(res));
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage() {
    this.chatService.sendMessage();
  }
}
