import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SketchPageService } from '../../../service/sketch-page.service';
import { UserMessageDto } from 'src/app/model/network/user.model';
import { Store, select } from '@ngrx/store';
import { selectSketchPageStateMessages } from 'src/app/selector/sketch-page.selectors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  newMessage = '';
  messages$: Observable<UserMessageDto[]>;
  constructor(private sketchPageService: SketchPageService) {}

  ngOnInit() {
    this.messages$ = this.sketchPageService.messages$;
  }

  sendMessage() {
    if (this.newMessage) {
      this.sketchPageService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
