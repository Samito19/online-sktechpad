import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('newMessage') input: ElementRef;

  messages$: Observable<{ username: string; content: string }[]>;

  constructor(private chatService: ChatService) {
    this.chatService.initChatHubConnection();
    this.messages$ = this.chatService.getMessages();
  }

  async ngOnInit(): Promise<void> {}

  sendMessage(newMessage: string) {
    if (newMessage) {
      this.chatService.sendMessage(newMessage);
      this.input.nativeElement.value = '';
    }
  }
}
