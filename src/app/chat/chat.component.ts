import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages$: Observable<{ username: string; content: string }[]>;

  constructor(private chatService: ChatService) {
    this.chatService.initChatHubConnection();
    this.messages$ = this.chatService.getMessages();
  }

  async ngOnInit(): Promise<void> {}

  sendMessage() {
    this.chatService.sendMessage();
  }
}
