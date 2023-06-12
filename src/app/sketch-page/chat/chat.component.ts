import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SketchPageService } from '../sketch-page.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  newMessage = '';

  messages$: Observable<{ username: string; content: string }[]>;

  constructor(private sketchPageService: SketchPageService) {}

  async ngOnInit() {}

  sendMessage() {
    if (this.newMessage) {
      this.sketchPageService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
