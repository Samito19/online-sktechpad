import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SketchPageService } from '../sketch-page.service';
import { UserMessageDto } from 'src/app/model/network/user.model';
import { SketchPageState } from 'src/app/state/sketch-page.state';
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
  constructor(
    private store: Store<SketchPageState>,
    private sketchPageService: SketchPageService
  ) {}

  ngOnInit() {
    this.messages$ = this.store.pipe(select(selectSketchPageStateMessages));
  }

  sendMessage() {
    if (this.newMessage) {
      this.sketchPageService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
