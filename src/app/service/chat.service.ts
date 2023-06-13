import { SignalRService } from '../signalr.service';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SketchPageState } from '../state/sketch-page.state';
import { UserMessageDto } from '../model/network/user.model';
import { selectSketchPageStateMessages } from '../selector/sketch-page.selectors';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messages$: Observable<UserMessageDto[]>;
  constructor(private store: Store<SketchPageState>) {}

  init() {
    this.messages$ = this.store.select(selectSketchPageStateMessages);
  }
}
