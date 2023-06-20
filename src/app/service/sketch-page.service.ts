import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPrevMessages, sendChatMessage } from '../action/chat.actions';
import {
  connectToCanvasByName,
  connectToSketchChatroom,
} from '../action/sketch.actions';
import { ApiUrls } from '../model/network/api-urls';
import { UserMessageDto } from '../model/network/user.model';
import {
  selectSketchPageStateMessages,
  selectSketchPageStateNewDrawing,
} from '../selector/sketch-page.selectors';
import { SketchPageState } from '../state/sketch-page.state';
import { CanvasDrawing } from '../view/canvas.view';

@Injectable()
export class SketchPageService {
  sketchName: string;
  messages$: Observable<UserMessageDto[]>;
  newDrawing$: Observable<CanvasDrawing | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<SketchPageState>,
    private http: HttpClient
  ) {
    this.messages$ = this.store.pipe(select(selectSketchPageStateMessages));
    this.newDrawing$ = this.store.pipe(select(selectSketchPageStateNewDrawing));
  }

  init = () => {
    const sketchName = this.route.children[0].snapshot.params['sketchId'] ?? 0;
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
  };

  sendMessage(messageContent: string) {
    const newUserMessageDto: UserMessageDto = {
      username: 'Samsoumite',
      content: messageContent,
    };
    this.store.dispatch(sendChatMessage(newUserMessageDto));
  }
}
