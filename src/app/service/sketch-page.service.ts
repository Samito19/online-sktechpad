import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getPrevMessages, sendChatMessage } from '../action/chat.actions';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../action/sketch.actions';
import { CanvasService } from './canvas.service';
import { SketchPageState } from '../state/sketch-page.state';
import { HttpClient } from '@angular/common/http';
import { UserMessageDto } from '../model/network/user.model';
import { ApiUrls } from '../model/network/api-urls';
import { selectSketchPageStateMessages } from '../selector/sketch-page.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class SketchPageService {
  sketchName: string;
  messages$: Observable<UserMessageDto[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SketchPageState>,
    private canvasService: CanvasService,
    private http: HttpClient
  ) {}

  init = () => {
    const sketchName = this.route.children[0].snapshot.params['sketchId'] ?? 0;
    this.messages$ = this.store.pipe(select(selectSketchPageStateMessages));

    this.sketchName = sketchName;
    this.store.dispatch(
      connectToCanvasByName({
        sketchName,
      })
    );
    this.store.dispatch(
      connectToSketchChatroom({
        sketchName,
      })
    );
    this.http
      .get<UserMessageDto[]>(ApiUrls.GetMessages + sketchName)
      .subscribe((prevMessages) =>
        this.store.dispatch(getPrevMessages({ prevMessages }))
      );
    this.canvasService.init(sketchName);
  };

  disconnect = () => {
    this.canvasService.disconnect();
  };

  sendMessage(messageContent: string) {
    this.store.dispatch(
      sendChatMessage({
        sketchName: this.sketchName,
        username: 'Samsoumite',
        content: messageContent,
      })
    );
  }
}
