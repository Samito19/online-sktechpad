import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('newMessage') input: ElementRef;

  messages$: Observable<{ username: string; content: string }[]>;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.messages$ = this.chatService.getMessages();
  }

  async ngOnInit() {
    await this.chatService.initChatHubConnection();
    this.chatService.connecToChatRoom(
      this.route.snapshot.paramMap.get('sketchId')!
    );
  }

  sendMessage(newMessage: string) {
    if (newMessage) {
      this.chatService.sendMessage(
        this.route.snapshot.paramMap.get('sketchId')!,
        newMessage
      );
      this.input.nativeElement.value = '';
    }
  }
}
